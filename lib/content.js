// Contenido de la demo. Todo el texto de práctica es ilustrativo: se reemplaza
// por la biblioteca propia de Sentido EME cuando exista (ver README).

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const PILARES = {
  estabilidad: {
    nombre: "Estabilidad",
    elemento: "Tierra",
    lema: "lo que sostiene y equilibra",
    estados: ["Amplitud", "Confianza", "Seguridad", "Optimismo", "Flexibilidad"],
    hue: 32,
  },
  plenitud: {
    nombre: "Plenitud",
    elemento: "Fuego",
    lema: "lo que expande y conecta",
    estados: ["Apertura", "Calidez", "Entrega", "Entusiasmo"],
    hue: 12,
  },
  crecimiento: {
    nombre: "Crecimiento",
    elemento: "Madera",
    lema: "lo que genera y avanza",
    estados: ["Decisión", "Coraje", "Dedicación", "Perseverancia"],
    hue: 130,
  },
  integracion: {
    nombre: "Integración",
    elemento: "Agua",
    lema: "lo que comprende y conserva",
    estados: ["Profundidad", "Valentía", "Adaptación"],
    hue: 205,
  },
  claridad: {
    nombre: "Claridad",
    elemento: "Metal",
    lema: "lo que condensa y discierne",
    estados: ["Imparcialidad", "Templanza", "Sensatez"],
    hue: 250,
  },
};

export const ORDEN_PILARES = ["estabilidad", "plenitud", "crecimiento", "integracion", "claridad"];

// Preguntas de ejemplo del Anexo 3 del Índice EME (el índice real tiene 25).
export const PREGUNTAS = [
  { pilar: "estabilidad", texto: "¿Sientes agotamiento o nerviosismo?" },
  { pilar: "plenitud", texto: "¿Te cuesta considerar puntos de vista distintos al tuyo?" },
  { pilar: "crecimiento", texto: "¿Sientes desesperanza o que nada te importa?" },
  { pilar: "integracion", texto: "¿Evitas compartir tus sentimientos y permitir que las personas te conozcan?" },
  { pilar: "claridad", texto: "¿Sientes que tus pensamientos se aceleran y se atropellan en tu cabeza?" },
];

// Nunca = 3 ... Todo el tiempo = 0
export const RESPUESTAS = [
  { label: "Nunca", valor: 3 },
  { label: "A veces", valor: 2 },
  { label: "Casi siempre", valor: 1 },
  { label: "Todo el tiempo", valor: 0 },
];

export const BIENVENIDA = [
  "Hola. Soy eme, el acompañamiento de bienestar de Sentido EME. Soy una inteligencia artificial y estoy aquí para caminar contigo a tu ritmo.",
  "Hola, te habla eme. Soy una inteligencia artificial de Sentido EME, pensada para acompañarte en tu bienestar día a día.",
];

export const PRIVACIDAD =
  "Lo que hablemos es tuyo. Tu empresa solo ve resultados de grupos, nunca lo que me cuentas tú. Si alguna vez notara que necesitas apoyo de una persona, te lo diría con claridad y te ayudaría a llegar a ella.";

// Prácticas de la ruta, por pilar. {estado} se reemplaza por el estado elegido.
export const PRACTICAS_RUTA = {
  estabilidad: [
    {
      titulo: "Raíces",
      texto: "Siéntate con la espalda apoyada y los pies firmes en el suelo. Durante un minuto, siente el peso de tu cuerpo entregándose a la silla. Con cada exhalación, suelta un poco más. Al terminar, di en voz baja: hoy elijo {estado}.",
    },
    {
      titulo: "Base",
      texto: "Apoya una mano en el pecho y otra en el abdomen. Respira lento tres veces, notando cómo se mueve el cuerpo. Piensa en un lugar donde te has sentido a salvo y quédate ahí unos segundos. Lleva esa sensación a tu próxima hora de trabajo: {estado}.",
    },
  ],
  plenitud: [
    {
      titulo: "Gratitud pequeña",
      texto: "Recuerda a una persona que te hizo la vida un poco más fácil esta semana. Tómate un minuto para sentir cómo fue ese momento. Hoy puedes agradecerle con un mensaje de una línea. Así se cultiva la {estado}.",
    },
    {
      titulo: "Calor de cercanía",
      texto: "Cierra los ojos y lleva la atención al centro del pecho. Imagina una luz cálida que crece con cada respiración. Deja que llegue hasta las manos. Ofrece hoy un gesto de {estado} a alguien de tu equipo.",
    },
  ],
  crecimiento: [
    {
      titulo: "Un paso",
      texto: "Piensa en algo que llevas tiempo posponiendo. Escoge el paso más pequeño posible, tan pequeño que dé casi risa. Respira, siente el impulso en el cuerpo y dalo hoy. Eso es {estado} en acción.",
    },
    {
      titulo: "Semilla",
      texto: "Imagina una semilla que empieza a abrirse dentro de ti. No necesita prisa, solo constancia. Nombra una cosa que quieres aprender este mes y dedícale diez minutos hoy. La {estado} se construye así.",
    },
  ],
  integracion: [
    {
      titulo: "Hondo",
      texto: "Haz una pausa y pregúntate qué es lo que de verdad te importa en este momento de tu vida. No busques la respuesta perfecta; deja que llegue la primera. Respira con ella un minuto. Hoy actúa una vez en coherencia con eso: {estado}.",
    },
    {
      titulo: "Corriente",
      texto: "Imagina el agua de un río que rodea las piedras sin pelear con ellas. Piensa en algo que hoy te cuesta aceptar y mira cómo podrías rodearlo en lugar de empujarlo. Respira. Eso es {estado}.",
    },
  ],
  claridad: [
    {
      titulo: "Espacio",
      texto: "Deja las manos sobre las piernas y mira un punto fijo. Cuenta cinco respiraciones largas. Cada vez que aparezca un pensamiento, deja que pase como una nube. Después elige una sola prioridad para hoy. Eso es {estado}.",
    },
    {
      titulo: "Lo esencial",
      texto: "Escribe o piensa en todo lo que tienes pendiente. Ahora tacha mentalmente lo que no es para hoy. Quédate con lo esencial y respira sobre eso. Decide con {estado} qué va primero.",
    },
  ],
};

export const CAMINOS = {
  tormenta: {
    nombre: "Tormenta",
    frase: "cuando todo se agita por dentro",
    hue: 240,
  },
  calma: {
    nombre: "Calma",
    frase: "cuando quieres bajar el ritmo y recuperar el centro",
    hue: 170,
  },
  perdida: {
    nombre: "Pérdida",
    frase: "cuando algo o alguien ya no está y duele",
    hue: 300,
  },
};

export const PRACTICAS_PULSO = {
  tormenta: {
    respirar: [
      "Inhala por la nariz contando cuatro. Exhala por la boca contando seis, como quien apaga una vela despacio. Repite cinco veces. No hace falta que la tormenta se detenga; solo que tu respiración vaya un poco más lenta que ella.",
      "Pon los pies en el suelo. Inhala hondo y suelta el aire con un suspiro largo. Otra vez. Y otra. Con cada suspiro, los hombros bajan un poco. Cinco veces.",
    ],
    soltar: [
      "Aprieta los puños con fuerza durante cinco segundos. Ahora ábrelos y deja las manos sueltas. Haz lo mismo con los hombros y con la mandíbula. La tensión también es una forma de cuidarte, y también se puede soltar.",
      "Mueve los hombros en círculos hacia atrás, lento. Sacude las manos como si se secaran. Deja que el cuerpo suelte lo que no necesita cargar ahora.",
    ],
    escuchar: [
      "Pregúntate: ¿qué es lo más fuerte que estoy sintiendo ahora mismo? Ponle un nombre, sin explicarlo. Solo nómbralo. Ese nombre ya es un pequeño refugio.",
      "Escucha lo que hay dentro sin corregirlo. Si la mente dice mucho, deja que hable. Tú eres el cielo, no la tormenta.",
    ],
  },
  calma: {
    respirar: [
      "Inhala en cuatro y exhala en cuatro, como el mar que va y viene. Cinco veces. Con cada vuelta, el cuerpo aprende que puede detenerse.",
      "Respira por la nariz, lento. En la pausa entre inhalar y exhalar, quédate un instante. Ahí vive la calma. Cinco respiraciones.",
    ],
    soltar: [
      "Recorre el cuerpo con la atención, de la cabeza a los pies. Donde encuentres tensión, exhala hacia ese lugar. No hay prisa.",
      "Deja caer la frente, el ceño, la lengua. Deja que los ojos descansen. Suelta un poco más de lo que crees necesario.",
    ],
    escuchar: [
      "Escucha los sonidos de donde estás, uno por uno, desde el más lejano hasta el más cercano. Sin juzgarlos. Solo escuchar.",
      "Cierra los ojos y escucha tu propia respiración. Si te distraes, vuelve con suavidad. Cada regreso es la práctica.",
    ],
  },
  perdida: {
    respirar: [
      "Pon una mano en el pecho. Respira despacio, sintiendo el calor de tu mano. Lo que sientes tiene sentido. Solo respira con ello, sin apurarte.",
      "Inhala lento y, al exhalar, deja salir un suspiro. No intentes sentirte mejor. Solo acompáñate. Cinco veces.",
    ],
    soltar: [
      "Si hay lágrimas, pueden estar. Si no, también está bien. Deja los hombros caer y el cuerpo apoyarse en lo que lo sostiene. No tienes que sostenerlo todo sin apoyo.",
      "Nombra en voz baja lo que se fue. Dile, con tus palabras, lo que te habría gustado decir. No hay una manera correcta de hacerlo.",
    ],
    escuchar: [
      "Pregúntate qué necesitas hoy: descanso, compañía, silencio. Escoge una sola cosa y date permiso de pedirla o dártela.",
      "Recuerda una cosa buena que esa persona o ese momento te dejó. Puede ser pequeña. Llévala contigo un rato.",
    ],
  },
};

export const PRACTICAS_PULSO_ORDEN = [
  { id: "respirar", titulo: "Respirar" },
  { id: "soltar", titulo: "Soltar" },
  { id: "escuchar", titulo: "Escuchar" },
];

// Respuestas de respaldo cuando no hay API o se agotó el límite.
export const RESPUESTAS_RESPALDO = {
  tormenta: [
    "Gracias por contármelo. Suena como si por dentro hubiera mucho movimiento y poco espacio. Eso pasa, y se puede acompañar paso a paso.",
    "Te leo. Cuando todo se agita, lo primero es darle un poco de suelo al cuerpo. Vamos con calma.",
  ],
  calma: [
    "Gracias por decírmelo. Parece que hoy el cuerpo te pide bajar el ritmo. Podemos hacerlo juntos, sin prisa.",
    "Te escucho. A veces lo mejor que podemos hacer es detenernos un momento y recuperar el centro.",
  ],
  perdida: [
    "Lo siento. Lo que cuentas pesa, y tiene sentido que duela. No tienes que resolverlo ahora; podemos acompañarlo con cuidado.",
    "Gracias por confiármelo. Cuando algo se va, el cuerpo también lo siente. Aquí estoy contigo.",
  ],
};

export const DERIVACION = [
  "Lo que me cuentas es importante, y creo que mereces hablar con una persona ahora, no solo conmigo.",
  "Si estás en peligro o piensas en hacerte daño, llama ya a la línea de emergencias 123 (Colombia) o busca a alguien de confianza que pueda estar contigo en este momento.",
  "Puedes escribirme lo que quieras, pero hoy lo más valioso es que una persona te acompañe.",
];

// Palabras clave para detección de riesgo (respaldo y refuerzo del modelo).
export const RIESGO_PALABRAS = [
  "suicid", "matarme", "quitarme la vida", "no quiero vivir", "no quiero seguir viviendo",
  "acabar con todo", "hacerme daño", "lastimarme", "desaparecer para siempre", "mejor muerto", "mejor muerta",
];

export const CAMINO_PALABRAS = {
  perdida: ["murió", "murio", "falleció", "fallecio", "perdí", "perdi", "despid", "terminó", "termino con", "separ", "duelo", "extraño a", "extrano a", "ya no está", "ya no esta"],
  tormenta: ["agotad", "ansios", "nervios", "estres", "estrés", "agobi", "abruma", "angusti", "pánico", "panico", "rabia", "furios", "no puedo más", "no puedo mas", "cansad"],
  calma: ["tranquil", "descans", "pausa", "paz", "respirar", "bajar el ritmo", "relaj"],
};

export function clasificarLocal(texto) {
  const t = (texto || "").toLowerCase();
  const riesgo = RIESGO_PALABRAS.some((p) => t.includes(p));
  let camino = "tormenta";
  let best = 0;
  for (const [c, palabras] of Object.entries(CAMINO_PALABRAS)) {
    const n = palabras.filter((p) => t.includes(p)).length;
    if (n > best) { best = n; camino = c; }
  }
  return { camino, riesgo };
}

// Notas del panel lateral: qué elemento del concepto se está viendo.
export const NOTAS = {
  llegada: {
    titulo: "Llegada",
    texto: "eme se presenta como inteligencia artificial, explica cómo cuida lo que la persona cuenta y pide su consentimiento. Nada de esto requiere descargar una aplicación: vive en el canal que la persona ya usa.",
  },
  indice: {
    titulo: "Índice EME",
    texto: "El Índice se responde dentro de la conversación, de a poco. Aquí se muestran tres preguntas de ejemplo del Anexo 3; el índice completo tiene 25. Las cuatro opciones de frecuencia son fijas por diseño del instrumento (la regla de máximo tres opciones aplica a las decisiones de la persona).",
  },
  ruta: {
    titulo: "Ruta a la medida",
    texto: "El pilar con menor puntaje define por dónde empieza la ruta personal. La persona elige el estado que quiere cultivar: la personalización es una elección, no una asignación. El termómetro es autopercepción, separado del Índice.",
  },
  practica: {
    titulo: "Práctica de la ruta",
    texto: "Cada práctica llega con una imagen única y una nota de voz. Los contenidos son propios de Sentido EME y viven en su propia biblioteca; aquí se usan textos ilustrativos.",
  },
  escucha: {
    titulo: "Escucha compasiva",
    texto: "La persona escribe con sus palabras. eme responde con calidez, y en segundo plano lee el tono y detecta señales de riesgo. Nada de esto es visible para la persona como un análisis.",
  },
  pulso: {
    titulo: "Pulso: el momento",
    texto: "Pulso ofrece caminos cortos para el momento que se está viviendo: tormenta, calma o pérdida. Cada uno se recorre con tres prácticas: respirar, soltar y escuchar. Registra que se recorrió, sin medir el bienestar.",
  },
  riesgo: {
    titulo: "Derivación",
    texto: "Ante una señal de riesgo, eme deja de acompañar sola y orienta hacia una persona. En una empresa contratante, además, se alertaría a la persona encargada definida por la empresa. En la demo no se envía ninguna alerta.",
  },
  avance: {
    titulo: "Avance",
    texto: "La persona ve su recorrido: prácticas, ruta y caminos. Los datos de esta tarjeta son de esta sesión de demo. Las empresas ven solo agregados de grupos (mínimo 5 personas para promedios y 10 para escucha agregada).",
  },
};
