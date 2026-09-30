import { clasificarLocal, RESPUESTAS_RESPALDO, pick } from "../../../lib/content";

export const runtime = "nodejs";

// Límites de uso. En memoria: sirven como freno razonable para una demo,
// pero se reinician cuando Vercel reinicia la función. El freno definitivo
// es el límite de gasto que se configura en la consola de Anthropic.
const IP_LIMIT = Number(process.env.DEMO_IP_LIMIT || 12);
const GLOBAL_LIMIT = Number(process.env.DEMO_GLOBAL_LIMIT || 300);
const MAX_CHARS = 500;

const store = globalThis.__emeStore || (globalThis.__emeStore = { day: "", global: 0, ips: new Map() });

function today() {
  return new Date().toISOString().slice(0, 10);
}

function allow(ip) {
  const d = today();
  if (store.day !== d) {
    store.day = d;
    store.global = 0;
    store.ips = new Map();
  }
  const n = store.ips.get(ip) || 0;
  if (n >= IP_LIMIT || store.global >= GLOBAL_LIMIT) return false;
  store.ips.set(ip, n + 1);
  store.global += 1;
  return true;
}

const SYSTEM = `Eres eme, el acompañamiento de bienestar de Sentido EME (Colombia). Eres una inteligencia artificial y lo dices si te lo preguntan.
Voz: cercana, tranquila, rigurosa sin ser técnica, esperanzadora sin ser ingenua. Español latinoamericano neutro, trato de "tú".
Reglas:
- Responde en 2 a 4 frases cortas. Reconoce lo que la persona siente antes de proponer nada.
- Nunca uses la palabra "diagnóstico" ni nombres de trastornos. Habla de lo que la persona vive con palabras cotidianas.
- No des consejos médicos ni prometas curas. No uses frases como "tu mejor versión".
- No uses emojis. No cierres con preguntas retóricas.
- Si hay señales de riesgo (idea de hacerse daño o de no querer vivir), no intentes resolverlo tú: reconoce con calidez y orienta a hablar con una persona.
Responde SOLO con un objeto JSON válido, sin texto extra ni bloques de código:
{"respuesta": "<tu mensaje>", "camino": "tormenta|calma|perdida", "riesgo": true|false}
Criterio de camino: "tormenta" si hay agitación, estrés, ansiedad, agotamiento o rabia; "calma" si la persona busca pausa o bajar el ritmo; "perdida" si hay duelo, ausencia o algo que terminó.`;

function fallback(texto, motivo) {
  const c = clasificarLocal(texto);
  return {
    respuesta: pick(RESPUESTAS_RESPALDO[c.camino]),
    camino: c.camino,
    riesgo: c.riesgo,
    origen: "respaldo",
    motivo,
  };
}

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {}
  const texto = String(body.texto || "").slice(0, MAX_CHARS).trim();
  const nombre = String(body.nombre || "").slice(0, 40).trim();
  const ruta = String(body.ruta || "").slice(0, 40).trim();
  if (!texto) return Response.json(fallback("", "vacío"));

  const local = clasificarLocal(texto);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json(fallback(texto, "sin-clave"));

  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  if (!allow(ip)) return Response.json(fallback(texto, "limite"));

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  const contexto = `${nombre ? `La persona se llama ${nombre}. ` : ""}${ruta ? `Su ruta empieza por el pilar ${ruta}. ` : ""}`;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        system: SYSTEM,
        messages: [{ role: "user", content: `${contexto}Mensaje de la persona: """${texto}"""` }],
      }),
    });
    clearTimeout(t);
    if (!r.ok) return Response.json(fallback(texto, `api-${r.status}`));
    const data = await r.json();
    const raw = (data.content || []).map((b) => b.text || "").join("").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : raw);
    const camino = ["tormenta", "calma", "perdida"].includes(parsed.camino) ? parsed.camino : local.camino;
    const respuesta = String(parsed.respuesta || "").trim();
    if (!respuesta) return Response.json(fallback(texto, "vacia"));
    return Response.json({
      respuesta,
      camino,
      riesgo: Boolean(parsed.riesgo) || local.riesgo,
      origen: "claude",
    });
  } catch (e) {
    return Response.json(fallback(texto, "error"));
  }
}
