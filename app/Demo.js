"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ElementArt, CaminoArt, Thermometer } from "./Art";
import {
  PILARES, ORDEN_PILARES, PREGUNTAS, RESPUESTAS, BIENVENIDA, PRIVACIDAD, MAS_INFO, PRACTICAS_RUTA,
  CAMINOS, PRACTICAS_PULSO, PRACTICAS_PULSO_ORDEN, DERIVACION, NOTAS, CONTINUAR_INICIO, ESTADOS_DEF, pick, shuffle,
} from "../lib/content";

const rnd = () => Math.floor(Math.random() * 1e9);

// Cada mención de "eme" (minúscula) va en negrilla dentro de los mensajes del bot.
function Rich({ text }) {
  return String(text).split(/(\*\*[^*]+\*\*|\beme\b)/).map((part, i) =>
    part === "eme" ? <strong key={i}>eme</strong> : /^\*\*[^*]+\*\*$/.test(part) ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

// Título con aparición letra por letra (solo opacidad y desenfoque, sin cambiar color ni tamaño).
function Letras({ texto }) {
  let n = 0;
  return texto.split(" ").map((w, wi) => (
    <span key={wi}>
      {wi > 0 && " "}
      <span className="pal" aria-hidden="true">
        {Array.from(w).map((ch, ci) => (
          <span key={ci} className="let" style={{ animationDelay: `${n++ * 35}ms` }}>{ch}</span>
        ))}
      </span>
    </span>
  ));
}

function Waveform({ seed, progress }) {
  const bars = [];
  let s = seed || 7;
  for (let i = 0; i < 30; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const h = 5 + (s % 100) / 100 * 17;
    bars.push(<span key={i} className={"bar" + (i / 30 < progress ? " on" : "")} style={{ height: h }} />);
  }
  return <div className="wave">{bars}</div>;
}

function Voice({ m }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const audio = useRef(null);
  const timer = useRef(null);
  const dur = m.dur || 20;

  useEffect(() => () => { clearInterval(timer.current); audio.current?.pause(); }, []);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      clearInterval(timer.current);
      audio.current?.pause();
      return;
    }
    setPlaying(true);
    if (m.src) {
      if (!audio.current) {
        audio.current = new Audio(m.src);
        audio.current.ontimeupdate = () => setProgress(audio.current.currentTime / (audio.current.duration || 1));
        audio.current.onended = () => { setPlaying(false); setProgress(0); };
      }
      audio.current.play().catch(() => setPlaying(false));
    } else {
      let t = progress * dur;
      timer.current = setInterval(() => {
        t += 0.25;
        setProgress(Math.min(t / dur, 1));
        if (t >= dur) { clearInterval(timer.current); setPlaying(false); setProgress(0); }
      }, 250);
    }
  };

  return (
    <div className="voice">
      <div className="voice-row">
        <button className="play" onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="2" width="3.6" height="12" rx="1" fill="currentColor" /><rect x="9.4" y="2" width="3.6" height="12" rx="1" fill="currentColor" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="currentColor" /></svg>
          )}
        </button>
        <Waveform seed={m.seed} progress={progress} />
        <span className="dur">0:{String(dur).padStart(2, "0")}</span>
      </div>
      <button className="link" onClick={() => setOpen(!open)}>{open ? "Ocultar texto" : "Ver texto"}</button>
      {!m.src && <span className="tiny"> · demo sin audio real</span>}
      {open && <p className="transcript"><Rich text={m.transcript} /></p>}
    </div>
  );
}

function Avance({ d }) {
  return (
    <div className="card">
      <div className="card-title">Tu avance{d.nombre ? `, ${d.nombre}` : ""}</div>
      <div className="row"><span>Estado que cultivas</span><b>{d.estado}</b></div>
      <div className="row"><span>Prácticas hoy</span><b>{d.practicas}</b></div>
      <div className="row"><span>Días de práctica</span><b>1</b></div>
      <div className="row"><span>Prácticas complementarias</span><b>{d.caminos.length}</b></div>
      <div className="row"><span>Termómetro (1 a 10)</span><b>{d.t1} → {d.t2}</b></div>
      <div className="card-foot">Datos de esta sesión de demo. Tu reporte de recorrido llegará más adelante.</div>
    </div>
  );
}

function Proc({ m }) {
  return (
    <div className="proc">
      <span className="ring" />
      <span className="ptxt" key={m.paso}>{m.pasos[m.paso || 0]}</span>
    </div>
  );
}

function Detalle({ d }) {
  if (!d) return null;
  return (
    <div key={d.id} className={"det" + (d.alerta ? " alerta" : "")}>
      <div className="det-tag"><span className={"dot" + (d.listo ? " off" : "")} />Detrás de escena</div>
      <div className="det-title">{d.titulo}</div>
      {d.explica && <p className="det-exp">{d.explica}</p>}
      <ul className="det-steps">
        {d.pasos.map((p, i) => {
          if (!(d.listo || i <= d.paso)) return null;
          const ok = d.listo || i < d.paso;
          return <li key={i} className={ok ? "ok" : "run"}><span className="mark">{ok ? "✓" : ""}</span>{p}</li>;
        })}
      </ul>
      {d.barras && (d.listo || d.paso >= 1) && (
        <div className="bars">
          {d.barras.map((b, i) => (
            <div className={"brow" + (b.destacado ? " hi" : "")} key={i}>
              <span className="bl">{b.label}</span>
              <span className="bt"><span className="bf" style={{ width: (b.valor / b.max) * 100 + "%" }} /></span>
              <span className="bv">{b.valor}/{b.max}</span>
            </div>
          ))}
        </div>
      )}
      {d.listo && d.resultado && <div className="det-res">{d.resultado}</div>}
      {d.listo && d.nota && <div className="det-note">{d.nota}</div>}
    </div>
  );
}

function Bubble({ m }) {
  if (m.from === "bts") return <div className="msg eme"><Proc m={m} /></div>;
  if (m.from === "user") return <div className="msg user"><div className="bubble">{m.text}</div></div>;
  return (
    <div className="msg eme">
      {m.type === "text" && <div className="bubble"><Rich text={m.text} /></div>}
      {m.type === "voice" && <div className="bubble wide"><Voice m={m} /></div>}
      {m.type === "image" && (
        <div className="bubble img reveal">
          {m.src ? <img src={m.src} alt={m.caption || "Imagen"} style={{ width: "100%", borderRadius: 10, display: "block" }} />
            : m.camino ? <CaminoArt camino={m.camino} hue={m.hue} seed={m.seed} /> : <ElementArt pilar={m.pilar} hue={m.hue} seed={m.seed} />}
          {m.caption && <div className="cap">{m.caption}</div>}
        </div>
      )}
      {m.type === "thermo" && <div className="bubble wide"><Thermometer valor={m.valor} etiqueta={m.etiqueta} /></div>}
      {m.type === "avance" && <Avance d={m.data} />}
    </div>
  );
}

export default function Demo() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [choices, setChoices] = useState(null);
  const [note, setNote] = useState("llegada");
  const [showNote, setShowNote] = useState(false);
  const [btsOn, setBtsOn] = useState(true);
  const [panel, setPanel] = useState(null);
  const btsRef = useRef(true);
  const [draft, setDraft] = useState("");
  const [manifest, setManifest] = useState({});
  const run = useRef(0);
  const idc = useRef(0);
  const resolver = useRef(null);
  const scroller = useRef(null);
  const manifestRef = useRef({});

  useEffect(() => {
    fetch("/media/manifest.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({})).then((m) => {
      manifestRef.current = m || {};
      setManifest(m || {});
      start();
    });
    return () => { run.current++; };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, choices]);

  const media = (kind, key) => {
    const list = manifestRef.current?.[kind]?.[key];
    return Array.isArray(list) && list.length ? pick(list) : null;
  };

  const start = useCallback(async () => {
    const my = ++run.current;
    setMessages([]); setChoices(null); setTyping(false); setDraft(""); setNote("llegada"); setPanel(null);
    const alive = () => { if (run.current !== my) throw new Error("cancel"); };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms)).then(alive);
    const push = (m) => { alive(); setMessages((x) => [...x, { id: ++idc.current, from: "eme", ...m }]); };
    // Ritmo de mensajería real: la espera crece con el largo del mensaje.
    const say = async (m, wait = 800) => {
      if (typeof m === "string") m = { type: "text", text: m };
      const len = m.type === "text" ? m.text.length : m.type === "voice" ? 60 : 30;
      wait = (Math.min(1600 + len * 26, 5200) + Math.min(wait, 1500) * 0.4) * 0.5;
      setTyping(true);
      await sleep(wait);
      setTyping(false);
      push(m);
      await sleep(450);
    };
    const scene = (k) => { setNote(k); };
    const bts = async (d) => {
      if (!btsRef.current) return;
      alive();
      // El panel solo se lee en pantallas anchas; en celular no se espera.
      const wide = typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches;
      const id = ++idc.current;
      setMessages((x) => [...x, { id, from: "bts", type: "proc", pasos: d.pasos, paso: 0 }]);
      setPanel({ ...d, id, paso: 0, listo: false });
      for (let i = 0; i < d.pasos.length; i++) {
        setMessages((x) => x.map((m) => (m.id === id ? { ...m, paso: i } : m)));
        setPanel((p) => (p ? { ...p, paso: i } : p));
        await sleep(wide ? 1500 : 900);
      }
      setPanel((p) => (p ? { ...p, paso: d.pasos.length, listo: true } : p));
      setMessages((x) => x.filter((m) => m.id !== id));
      if (wide) await ask({ options: [{ label: "Continuar", value: "ok" }] });
      else await sleep(600);
      alive();
    };
    const said = (text) => { alive(); setMessages((x) => [...x, { id: ++idc.current, from: "user", text }]); };
    const ask = (cfg) => new Promise((resolve) => {
      setChoices(cfg);
      resolver.current = (v) => { setChoices(null); resolve(v); };
    });
    const choose = async (cfg) => {
      const v = await ask(cfg);
      alive();
      said(v.label);
      await sleep(350);
      return v;
    };
    const voiceMsg = (text, key) => ({
      type: "voice", transcript: text, seed: rnd(), src: key ? media("audios", key) : null,
      dur: Math.max(12, Math.min(59, Math.round(text.split(/\s+/).length / 2.3))),
    });

    const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
    let nombre = "";
    const A = (t) => (nombre ? `${nombre}, ${t}` : cap(t));
    const askThermo = async (prompt) => {
      await say(prompt, 1000);
      for (;;) {
        const v = await ask({ options: [], text: true, placeholder: "Escribe un número del 1 al 10" });
        said(v.text);
        await sleep(300);
        const n = parseInt(v.text, 10);
        if (n >= 1 && n <= 10) return n;
        await say("Escribe un número del 1 al 10, por favor. 🌡️", 600);
      }
    };

    try {
      // ---- 1. Llegada
      scene("llegada");
      await say(pick(BIENVENIDA), 900);
      await say(PRIVACIDAD, 1300);
      let ok = false;
      let contado = false;
      while (!ok) {
        const opts = contado
          ? [{ label: "¡Sí, adelante!", value: "si" }]
          : [{ label: "¡Sí, adelante!", value: "si" }, { label: "Cuéntame más", value: "mas" }];
        const v = await choose({ options: opts });
        if (v.value === "si") ok = true;
        else { contado = true; await say(MAS_INFO, 1300); }
      }
      await say("¿Cómo te gustaría que te llame?");
      const nv = await ask({ options: [{ label: "Prefiero no decirlo", value: "skip" }], text: true, placeholder: "Escribe un nombre o apodo" });
      if (nv.text) { nombre = nv.text.slice(0, 24); said(nombre); } else said(nv.label);
      await sleep(350);
      await say(`Me alegra que estés aquí${nombre ? ", " + nombre : ""}. Vamos a empezar por reconocer cómo estás hoy, para que todo lo que sigue parta de ahí. 🌱`, 1300);

      // ---- 2. Índice EME
      scene("indice");
      await say(A("vamos con calma y de a poco. Te haré tres preguntas sobre cómo te sientes."), 1100);
      await say("Elige la opción que más se parezca a tu experiencia. Cualquier respuesta sirve para guiar tu proceso. 🌱", 1100);
      const preguntas = shuffle(PREGUNTAS).slice(0, 3);
      const conectores = ["Empecemos por aquí:", "Sigamos con esta:", "Y para cerrar:"];
      const puntajes = [];
      for (const [qi, q] of preguntas.entries()) {
        await say(`${conectores[qi]}\n${q.texto}`, 800);
        const v = await choose({ options: RESPUESTAS.map((r) => ({ label: r.label, value: r.valor })), style: "list" });
        puntajes.push({ pilar: q.pilar, valor: v.value });
      }
      {
        const suma = puntajes.reduce((a, b) => a + b.valor, 0);
        const idx = suma / puntajes.length;
        const pct = Math.round((idx / 3) * 100);
        const est = pct <= 20 ? "Crisis" : pct <= 40 ? "Aflicción" : pct <= 70 ? "Incomodidad" : "Bienestar";
        await bts({
          titulo: "Caracterizando a la persona",
        explica: "Mientras la persona responde, eme procesa sus respuestas por dentro. Estos cálculos no se le muestran en el chat: la persona solo vive la conversación.",
          pasos: ["Sumando el puntaje de cada respuesta", "Calculando el Índice EME (lectura parcial)", "Ubicando el estado y el porcentaje de bienestar"],
          barras: puntajes.map((p) => ({ label: PILARES[p.pilar].nombre, valor: p.valor, max: 3 })),
          resultado: `Índice ${idx.toFixed(2)} de 3 · ${pct}% de bienestar · ${est}`,
          nota: "Demo con 3 preguntas de ejemplo. En el producto son 25 y la lectura es completa.",
        });
      }
      await say("Gracias por responder con honestidad. Ya tengo una primera imagen de cómo estás. 🌱", 900);

      // ---- 3. Ruta a la medida
      scene("ruta");
      const menor = puntajes.reduce((a, b) => (b.valor < a.valor ? b : a), puntajes[0]);
      const empatados = puntajes.filter((p) => p.valor === menor.valor).map((p) => p.pilar);
      const pilarId = ORDEN_PILARES.find((p) => empatados.includes(p));
      const P = PILARES[pilarId];
      await bts({
        titulo: "Sugiriendo la ruta a la medida",
        explica: "Con esos puntajes, eme decide por qué pilar sugerir empezar. La persona recibe una sugerencia en palabras y conserva la decisión de su estado.",
        pasos: [
          "Buscando el pilar con menor puntaje",
          empatados.length > 1 ? "Hay empate: se desempata siguiendo el ciclo de los pilares" : null,
          `Ruta sugerida: comenzar por ${P.nombre}`,
        ].filter(Boolean),
        barras: puntajes.map((p) => ({ label: PILARES[p.pilar].nombre, valor: p.valor, max: 3, destacado: p.pilar === pilarId })),
        resultado: "La sugerencia es un punto de partida: la persona decide el estado que quiere cultivar.",
      });
      await say("Con lo que me cuentas, ya tengo una propuesta para comenzar tu proceso.", 1400);
      await say("Ahora elige el estado que quieres fortalecer, alcanzar, o que consideres más importante para tu momento actual. Cualquiera que elijas será una herramienta útil en tu proceso.", 1400);
      const estados = pilarId === "estabilidad" ? ["Amplitud", "Confianza", "Seguridad"] : shuffle(P.estados).slice(0, 3);
      let estado;
      for (;;) {
        const ev = await choose({ options: estados.map((e) => ({ label: e, value: e })) });
        estado = ev.value;
        if (!ESTADOS_DEF[estado]) break;
        await say(ESTADOS_DEF[estado], 1400);
        await say("¿Deseas continuar con este estado o quieres cambiarlo?", 700);
        const c = await choose({ options: [{ label: "Continuar", value: "ok" }, { label: "Quiero cambiarlo", value: "cambiar" }] });
        if (c.value === "ok") break;
        await say("Claro, elige de nuevo el que más te llame.", 600);
      }
      const t1 = await askThermo(`Ahora imagina que tienes un «termómetro interno». ¿Qué grado de 1 a 10 mostraría en tu **${estado.toLowerCase()}**? (siendo 1 muy poco, y 10 muy alto) 🌡️`);
      await say({ type: "thermo", valor: t1, etiqueta: estado }, 500);
      await say("¡Gracias por reconocerlo! Es importante saber cómo inicias.", 800);
      await bts({
        titulo: "Personalizando la práctica de hoy",
        explica: "eme cruza el estado elegido con el termómetro para ajustar la intensidad de la práctica de hoy.",
        pasos: [
          `Estado elegido: ${estado}`,
          `Termómetro inicial: ${t1} de 10`,
          t1 <= 4 ? "Punto de partida bajo: práctica suave y muy acompañada" : t1 <= 7 ? "Punto medio: práctica de intensidad media" : "Punto alto: práctica para sostener y profundizar",
        ],
        resultado: "Cada práctica se ajusta a cómo llega la persona ese día.",
      });

      scene("practica");
      const prM = pick(PRACTICAS_RUTA[pilarId].meditacion).replaceAll("{estado}", estado.toLowerCase());
      const prR = pick(PRACTICAS_RUTA[pilarId].respiracion);
      await say(A(`al empezar tu rutina con esta pausa guiada preparas el terreno para sembrar y cultivar la semilla de tu **${estado.toLowerCase()}** 🌱\nEscucha. Si puedes hazlo con audífonos 🎧`), 1200);
      await choose({ options: [{ label: "¡Comencemos!", value: "ok" }] });
      await bts({
        titulo: "Generando la meditación",
        explica: "eme prepara una meditación para esta persona, a partir de su estado y de cómo llegó hoy.",
        pasos: ["Leyendo el estado y el termómetro", "Eligiendo la metáfora y la música del día", "Escribiendo el guion de la meditación", "Sintetizando la voz de eme"],
        nota: "Simulado: en la demo la pieza sale de variantes preparadas o de tus propios archivos.",
      });
      await say(voiceMsg(prM, `meditacion-${pilarId}`), 900);
      await say("Cuando lo desees, toca el siguiente botón para que pasemos al ejercicio de respiración. 😮‍💨", 900);
      await choose({ options: [{ label: "Continuar", value: "ok" }] });
      await bts({
        titulo: "Generando la imagen del día",
        explica: "eme prepara una imagen propia para el estado elegido: la persona nunca recibe una imagen genérica.",
        pasos: ["Traduciendo el estado en imagen", "Componiendo colores y formas únicas"],
        nota: "Simulado: la imagen de la demo es una composición generada al momento.",
      });
      await say({ type: "image", pilar: pilarId, hue: P.hue, seed: rnd(), src: media("imagenes", pilarId), caption: estado }, 900);
      await say("Observa la imagen de hoy con toda tu atención durante un minuto. Guárdala en tu mente y en tu corazón mientras escuchas el próximo audio. 🎧", 1100);
      await choose({ options: [{ label: "Continuar", value: "ok" }] });
      await bts({
        titulo: "Generando la respiración",
        explica: "eme selecciona la respiración del día y su afirmación de cierre.",
        pasos: ["Tomando el día de la semana", "Eligiendo la afirmación de cierre", "Sintetizando la voz de eme"],
        nota: "Simulado: en la demo sale de variantes preparadas o de tus propios archivos.",
      });
      await say(voiceMsg(prR, `respiracion-${pilarId}`), 900);
      await say("Cuando termines avísame para continuar.", 700);
      await choose({ options: [{ label: "Continuar", value: "ok" }] });
      let practicas = 2;

      const t2 = await askThermo(`${A(`cuando seleccionaste tu **${estado.toLowerCase()}**, me contaste que en un termómetro de 1 a 10 te identificabas con un ${t1}.`)}\n\n¿Sientes que, después de las prácticas realizadas, tu percepción ha cambiado?\n\nEscribe en ese mismo rango de 1 a 10, cómo notas ahora tu **${estado.toLowerCase()}**.`);
      await say({ type: "thermo", valor: t2, etiqueta: estado }, 500);
      await say(`Gracias${nombre ? ", " + nombre : ""}, reconocer el efecto de estas prácticas te ayuda a ser constante en tu proceso.`, 900);

      // ---- 4. Escucha compasiva y Pulso
      scene("escucha");
      const caminosHechos = [];
      const recorrer = async (camino) => {
        scene("pulso");
        const C = CAMINOS[camino];
        await bts({
          titulo: `Armando el camino: ${C.nombre}`,
          explica: "eme arma el camino combinando tres prácticas cortas según lo que la persona escribió.",
          pasos: [`Camino elegido: ${C.nombre}`, "Combinando tres prácticas: respirar, soltar y escuchar", "Ajustando el ritmo a lo que escribió"],
          nota: "Pulso registra que se recorrió el camino, sin medir el bienestar.",
        });
        await say({ type: "image", camino, hue: C.hue, seed: rnd(), src: media("imagenes", `pulso-${camino}`), caption: null }, 800);
        for (let i = 0; i < PRACTICAS_PULSO_ORDEN.length; i++) {
          const pp = PRACTICAS_PULSO_ORDEN[i];
          await say(`${i + 1} de 3 · ${pp.titulo}`, 600);
          await say(voiceMsg(pick(PRACTICAS_PULSO[camino][pp.id]), `pulso-${pp.id}`), 800);
          await say("Avísame cuando quieras continuar.", 600);
          const s = await choose({ options: [{ label: "Listo", value: "ok" }, { label: "Saltar", value: "skip" }] });
          if (s.value === "ok") practicas++;
        }
        caminosHechos.push(C.nombre);
        await say("Quedó registrada esta práctica en tu proceso. Solo queda como rastro tuyo; no mide cómo estás.", 1100);
      };

      await say(A("poner en palabras lo que sientes puede ayudarte a comprender mejor lo que te pasa e identificar tus necesidades."), 1200);
      await say("¿Te gustaría compartirlo?", 700);
      const sh = await choose({ options: [{ label: "¡Sí!", value: "si" }, { label: "No, continuemos", value: "no" }] });
      let riesgo = false;

      if (sh.value === "si") {
        await say("Este es un espacio libre de juicios. Escribe lo que dirían tus emociones si pudieran hablar. ✏️", 1000);
        const cv = await ask({
          options: [{ label: "Hoy me siento sin energía", value: "ejemplo" }],
          text: true, placeholder: "Escribe cómo te sientes",
        });
        const contenido = cv.text || "Hoy me siento sin energía";
        said(contenido);
        setTyping(true);
        let res;
        try {
          const r = await fetch("/api/chat", {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ texto: contenido, nombre, ruta: P.nombre }),
          });
          res = await r.json();
        } catch {
          res = { respuesta: "Gracias por contármelo. Estoy aquí contigo.", camino: "tormenta", riesgo: false };
        }
        alive();
        setTyping(false);
        const partes = String(res.respuesta).split(/\n+/).filter(Boolean);
        riesgo = Boolean(res.riesgo);
        await bts({
          titulo: "Leyendo lo que la persona escribió",
        explica: "eme lee el tono y las señales del mensaje para decidir cómo responder y qué camino de Pulso ofrecer. La persona solo ve la respuesta.",
          pasos: ["Leyendo el mensaje", "Detectando el tono emocional", "Revisando señales de riesgo", riesgo ? "Señal de riesgo detectada" : "Sin señales de riesgo", riesgo ? "Preparando la derivación a una persona" : "Eligiendo un camino de Pulso"],
          resultado: `Tono: ${res.sentimiento || "neutro"} · ${riesgo ? "Riesgo: derivar a una persona" : `Riesgo: sin señales · Camino: ${CAMINOS[res.camino]?.nombre || "Tormenta"}`}`,
          alerta: riesgo,
        });
        if (!(riesgo && res.origen === "respaldo")) for (const p of partes) await say(p, 700);

        if (riesgo) {
          scene("riesgo");
          for (const d of DERIVACION) await say(d, 1300);
          await choose({ options: [{ label: "Entendido", value: "ok" }] });
        } else {
          scene("pulso");
          const camino = res.camino;
          await say("Gracias por contármelo. Para acompañar lo que estás viviendo hoy, te propongo una práctica complementaria de tres momentos cortos: respirar, soltar y escuchar. Es un paréntesis dentro de tu proceso.", 1300);
          const v = await choose({ options: [{ label: "Empezar", value: "go" }, { label: "Ahora no", value: "no" }] });
          if (v.value === "go") await recorrer(camino);
          else await say("De acuerdo. Cuando lo necesites, cuéntame cómo te sientes y te acompaño.", 700);
        }
      } else {
        await say(`Muy bien${nombre ? " " + nombre : ""}.`, 600);
        scene("pulso");
        await say("Cuando quieras, escríbeme cómo te sientes y te acompaño con una práctica para ese momento.", 1300);
      }

      // ---- 5. Avance
      scene("avance");
      await say(`Cuando aparezca el cansancio, un pensamiento inquieto o malestar, puedes volver a estos ejercicios y sostener tu **${estado.toLowerCase()}**.\n\n✨ Escucha la meditación\n🌱 Haz la respiración\n🖼️ Enfoca tu atención en la imagen`, 1400);
      await bts({
        titulo: "Actualizando la ruta",
        explica: "eme guarda el registro de hoy y prepara la continuación de la ruta para mañana.",
        pasos: ["Guardando el registro de hoy", `Comparando el termómetro: ${t1} → ${t2} (${t2 - t1 >= 0 ? "+" : ""}${t2 - t1})`, "Preparando la práctica de mañana"],
        resultado: "Mañana la ruta continúa desde cómo terminaste hoy.",
      });
      await say("Te muestro tu recorrido de hoy.", 800);
      await say({ type: "avance", data: { nombre, pilar: P.nombre, estado, practicas, caminos: caminosHechos, t1, t2 } }, 900);
      await say("¡Gracias por dedicarte este tiempo de calidad! Te espero en la noche 🌚", 900);
      await say("eme está contigo. 🩵", 700);
      await choose({ options: [{ label: "Volver a empezar", value: "again" }] });
      start();
    } catch (e) {
      if (e.message !== "cancel") { console.error(e); setTyping(false); }
    }
  }, []);

  const onChoice = (opt) => resolver.current && resolver.current({ label: opt.label, value: opt.value });
  const onSend = (e) => {
    e.preventDefault();
    const t = draft.trim();
    if (!t || !choices?.text || !resolver.current) return;
    setDraft("");
    resolver.current({ label: t, text: t, value: "text" });
  };

  const N = NOTAS[note];

  return (
    <div className="stage">
      <div className="phone">
        <header className="top">
          <div className="avatar">e</div>
          <div className="who"><b>eme</b><span>guía digital · Sentido EME</span></div>
          <button className="ic" onClick={() => start()} aria-label="Reiniciar demo" title="Reiniciar">↺</button>
          <button className={"ic" + (btsOn ? " on" : "")} onClick={() => { btsRef.current = !btsOn; setBtsOn(!btsOn); }} aria-label="Detrás de escena" title="Ver cómo piensa eme">◐</button>
          <button className="ic info" onClick={() => setShowNote(!showNote)} aria-label="Qué estás viendo" title="Qué estás viendo">i</button>
        </header>
        {showNote && (
          <div className="sheet" onClick={() => setShowNote(false)}>
            <b>{N.titulo}</b>
            <p>{N.texto}</p>
            <Detalle d={panel} />
          </div>
        )}
        <div className="chat" ref={scroller}>
          <div className="day">Demo · hoy</div>
          {messages.map((m) => <Bubble key={m.id} m={m} />)}
          {typing && <div className="msg eme"><div className="bubble typing"><i /><i /><i /></div></div>}
        </div>
        <div className="bottom">
          {choices && (
            <div className={"choices " + (choices.style === "list" ? "list" : "")}>
              {choices.options.map((o) => (
                <button key={o.label} className="chip" onClick={() => onChoice(o)}>{o.label}</button>
              ))}
            </div>
          )}
          <form className="input" onSubmit={onSend}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={!choices?.text}
              maxLength={400}
              placeholder={choices?.text ? choices.placeholder || "Escribe aquí" : choices ? "Elige una opción" : "…"}
            />
            <button type="submit" disabled={!choices?.text || !draft.trim()} aria-label="Enviar">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 20.5 21 12 3 3.5v6.7l11 1.8-11 1.8z" fill="currentColor" /></svg>
            </button>
          </form>
        </div>
      </div>
      <aside className="side">
        <div className="tag">Qué estás viendo</div>
        <h2 key={note} className="titulo-nota" aria-label={N.titulo}><Letras texto={N.titulo} /></h2>
        <p>{N.texto}</p>
        <Detalle d={panel} />
        <div className="foot">Demo de concepto. Los contenidos son ilustrativos; el diseño final usa la biblioteca propia de Sentido EME.</div>
      </aside>
    </div>
  );
}
