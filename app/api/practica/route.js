import { allow } from "../../../lib/limite";

export const runtime = "nodejs";

const IMAGENERIA = {
  estabilidad: "raíces, suelo firme, un bosque o una semilla en tierra fértil",
  plenitud: "luz cálida, el calor del sol, el centro del pecho, la gratitud",
  crecimiento: "un brote, una rama joven, un paso a la vez, la luz que se alcanza",
  integracion: "el agua de un río, una ola, la profundidad de un lago",
  claridad: "un cielo despejado, aire fresco, nubes que pasan, nitidez",
};

const SYSTEM = `Eres eme, la guía digital de bienestar de Sentido EME (Colombia). Escribes la práctica de hoy para una persona concreta, con trato de "tú" y español latinoamericano neutro, en una voz cálida, serena e invitadora. El texto será leído en voz alta por una voz suave.
Reglas generales:
- Devuelve SOLO el texto de la práctica, sin título, sin comillas y sin explicaciones.
- Nombra el estado que la persona eligió de forma natural y una sola vez, en minúsculas.
- Si tienes su nombre, úsalo una vez al inicio.
- Nunca menciones pilares, rutas, caminos, "Pulso", el Índice ni elementos por su nombre técnico. Puedes usar la imagen natural que se te indique.
- Nada de diagnósticos, consejos médicos, promesas de cura, productividad ni "tu mejor versión".
- Como máximo un emoji suave al final, o ninguno.
Si la práctica es una MEDITACIÓN:
- De 55 a 80 palabras, en 4 a 6 frases.
- Es contemplativa: invita a cerrar los ojos, sostiene una imagen natural, avanza despacio y no cuenta respiraciones.
- Cierra dejando que el estado crezca en la persona.
Si la práctica es una RESPIRACIÓN:
- De 35 a 55 palabras, en 3 a 5 frases cortas.
- Es una instrucción del cuerpo: ritmo de inhalar y exhalar, cuántas veces y cómo (por ejemplo "cinco veces", "exhala largo").
- Termina con "Cierra diciendo en voz audible:" y una afirmación breve en primera persona que exprese el estado.
Si el termómetro inicial es 4 o menos, suaviza y acompaña más. Si es 8 o más, invita a profundizar y sostener.`;

export async function POST(req) {
  let b = {};
  try {
    b = await req.json();
  } catch {}
  const tipo = b.tipo === "respiracion" ? "respiracion" : "meditacion";
  const estado = String(b.estado || "").slice(0, 40).trim();
  const nombre = String(b.nombre || "").slice(0, 40).trim();
  const pilar = String(b.pilar || "").slice(0, 20);
  const t1 = Math.min(10, Math.max(1, parseInt(b.t1, 10) || 5));
  const vacio = (motivo) => Response.json({ texto: null, origen: "respaldo", motivo });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !estado) return vacio("sin-clave");
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  if (!allow(ip)) return vacio("limite");

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  const prompt = `Práctica: ${tipo === "meditacion" ? "MEDITACIÓN" : "RESPIRACIÓN"}.
Estado elegido: ${estado}.
Termómetro inicial: ${t1} de 10.
${nombre ? `Nombre: ${nombre}.\n` : ""}Imagen natural sugerida: ${IMAGENERIA[pilar] || "la naturaleza"}.`;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, max_tokens: 350, system: SYSTEM, messages: [{ role: "user", content: prompt }] }),
    });
    clearTimeout(t);
    if (!r.ok) return vacio(`api-${r.status}`);
    const data = await r.json();
    const texto = (data.content || []).map((x) => x.text || "").join("").trim().replace(/^["«]|["»]$/g, "");
    if (!texto) return vacio("vacia");
    return Response.json({ texto, origen: "claude" });
  } catch {
    return vacio("error");
  }
}
