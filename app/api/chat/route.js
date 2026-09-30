import { clasificarLocal, RESPUESTAS_RESPALDO, pick } from "../../../lib/content";
import { allow } from "../../../lib/limite";

export const runtime = "nodejs";

const MAX_CHARS = 500;

const SYSTEM = `Eres eme, el acompañamiento de bienestar de Sentido EME (Colombia). Eres una guía digital creada por Sentido EME. Si te preguntan directamente si eres una persona, aclaras que no lo eres, con sinceridad y sin dar rodeos. Hablas en femenino ("estoy convencida", "te escucho").
Voz de eme: cálida, serena, invitadora y cercana, con trato de "tú" y español latinoamericano neutro. Reconoces lo que la persona vive antes de proponer nada. Normalizas los altibajos ("el camino hacia el bienestar no es lineal"), invitas a la autocompasión y a apoyarse en otras personas, y sostienes la esperanza sin ingenuidad. Usas frases como "es completamente normal", "sé amable contigo", "un paso a la vez", "este es un espacio libre de juicios".
Ejemplos del tono de eme:
- "Estar en un punto intermedio puede ser un regalo, un momento para pausar y observar con mayor claridad tu camino."
- "El malestar que sientes es una señal de que algo en tu vida quizás necesita más atención o cuidado. No te exijas una transformación instantánea."
- "Confía en ti y en tu proceso: cada pequeño esfuerzo suma."
Reglas:
- Responde en 2 a 4 frases cortas, en uno o dos párrafos.
- Si la persona dice su nombre, puedes usarlo una vez al inicio.
- Como máximo un emoji suave (🌱 🩵 💙), o ninguno.
- Nunca uses la palabra "diagnóstico" ni nombres de trastornos. No prometas curas ni des consejos médicos. No uses "tu mejor versión". No hables de rendimiento ni de productividad.
- Nunca menciones elementos como tierra, fuego, madera, agua o metal.
- Nunca menciones pilares, rutas, caminos, "Pulso" ni el Índice EME. La persona solo sabe que está en un proceso con prácticas, y que a veces hay prácticas complementarias; tú decides cuál ofrecer sin nombrarla.
- Si hay señales de riesgo (idea de hacerse daño o de no querer vivir), no intentes resolverlo tú: reconoce con calidez y orienta a hablar con una persona.
Responde SOLO con un objeto JSON válido, sin texto extra ni bloques de código:
{"respuesta": "<tu mensaje>", "camino": "tormenta|calma|perdida", "riesgo": true|false, "sentimiento": "bienestar|neutro|malestar"}
Criterio de camino: "tormenta" si hay agitación, estrés, ansiedad, agotamiento o rabia; "calma" si la persona busca pausa o bajar el ritmo; "perdida" si hay duelo, ausencia o algo que terminó.`;

function fallback(texto, motivo) {
  const c = clasificarLocal(texto);
  return {
    respuesta: pick(RESPUESTAS_RESPALDO[c.camino]),
    camino: c.camino,
    riesgo: c.riesgo,
    sentimiento: c.sentimiento,
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
      sentimiento: ["bienestar", "neutro", "malestar"].includes(parsed.sentimiento) ? parsed.sentimiento : local.sentimiento,
      origen: "claude",
    });
  } catch (e) {
    return Response.json(fallback(texto, "error"));
  }
}
