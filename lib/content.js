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
  "¡Hola! Soy eme 🩵 tu guía digital y voy a acompañarte a reconocer cómo estás y a poner en relación las distintas dimensiones de tu bienestar.",
];

export const PRIVACIDAD =
  "Lo que compartas conmigo es confidencial y está protegido. Solo lo uso para acompañar tu proceso, y tú decides qué contarme. 🌱";

export const MAS_INFO =
  "Puedo acompañarte con prácticas cortas de meditación y respiración, conversar contigo cuando necesites hablar y mostrarte tu avance. ¿Seguimos?";

export const CONTINUAR_INICIO =
  "El primer paso rompe la inercia y marca el inicio del camino. Estoy convencida de que tu compromiso enriquecerá tu proceso.";

// Definiciones tomadas del guion de la Semana 1 (Tierra).
export const ESTADOS_DEF = {
  Amplitud:
    "La amplitud es la capacidad de ver más allá del círculo de la experiencia o entorno inmediato, cambiando de perspectiva cuando es necesario, para encontrar oportunidades, ideas, información o recursos.",
  Confianza:
    "La confianza es una actitud general de fe en el futuro y en la capacidad para enfrentar lo que venga, a pesar de los desafíos y la incertidumbre.",
  Seguridad:
    "La seguridad es la experiencia subjetiva de sentirse libre de amenazas, peligros o riesgos inminentes; proviene de la percepción de estar protegido y en control en diversos aspectos de la vida.",
};

// Prácticas de la ruta, por pilar. {estado} se reemplaza por el estado elegido.
// Textos ilustrativos escritos con la voz de eme; se reemplazan por la biblioteca propia.
export const PRACTICAS_RUTA = {
  estabilidad: {
    meditacion: [
      "Encuentra una postura cómoda y cierra los ojos. Imagina un bosque al atardecer. Bajo tus pies, la tierra guarda humedad y calma. Deja que tus raíces se hundan, poco a poco, y siente cómo crece en ti la {estado}. 🌱",
      "Respira y siente el peso de tu cuerpo. Imagina una semilla en tierra fértil: no hace ruido, no tiene prisa. Con cada exhalación la tierra la sostiene un poco más. Así puede crecer tu {estado}.",
    ],
    respiracion: [
      "Inhala despacio, llevando el aire hasta el centro de tu cuerpo. Exhala y suelta. Otra vez, sintiendo que el suelo te sostiene. Al final, repite en voz audible: Desde mi centro yo puedo sostenerme.",
      "Respira profundo y lleva la atención al abdomen, como una luz dorada que se expande. Exhala largo. Cinco veces. Cierra diciendo en voz audible: Confío en la sabiduría de mi cuerpo.",
    ],
  },
  plenitud: {
    meditacion: [
      "Cierra los ojos y lleva la atención al centro del pecho. Imagina una luz cálida que crece con cada respiración y llega hasta tus manos. Deja que se expanda tu {estado}. ✨",
      "Recuerda a alguien que te hizo la vida más fácil esta semana. Siente cómo fue ese momento y deja que el calor se quede contigo. Así se cultiva la {estado}.",
    ],
    respiracion: [
      "Inhala abriendo el pecho, como quien recibe. Exhala ofreciendo. Repite lentamente cinco veces. Cierra diciendo en voz audible: Abro mi corazón a lo que hoy puedo dar.",
      "Inhala calor y exhala gratitud. Sigue este ritmo un minuto. Al terminar, di en voz audible: Estoy presente, ahora y aquí, con lo que soy.",
    ],
  },
  crecimiento: {
    meditacion: [
      "Cierra los ojos e imagina un brote que atraviesa la tierra hacia la luz. No se apura, pero no se detiene. Piensa en un paso pequeño que puedes dar hoy y siente cómo se despierta tu {estado}. 🌱",
      "Respira y observa una rama joven que se estira. Cada día crece un poco. Deja que esa constancia se instale en ti: tu {estado}, un paso a la vez.",
    ],
    respiracion: [
      "Inhala como quien toma impulso; exhala como quien da un paso. Cinco veces. Cierra diciendo en voz audible: Doy hoy el paso que me corresponde.",
      "Respira profundo y siente la energía subir desde los pies. Exhala largo. Al final, di en voz audible: Cada día crezco un poco más.",
    ],
  },
  integracion: {
    meditacion: [
      "Cierra los ojos e imagina el agua de un río que rodea las piedras sin pelear con ellas. Piensa en algo que hoy te cuesta aceptar y mira cómo podrías rodearlo. Ahí vive la {estado}. 💧",
      "Respira y baja hacia lo profundo, como el agua que llega al fondo del lago. Pregúntate qué es lo que de verdad te importa. Deja que llegue la primera respuesta, sin corregirla. Esa es tu {estado}.",
    ],
    respiracion: [
      "Inhala en calma y exhala como quien suelta una corriente. Cinco veces, sin forzar. Cierra diciendo en voz audible: Actúo en coherencia con lo que soy.",
      "Respira lento, sintiendo cómo el aire se mueve como una ola. Al terminar, di en voz audible: Confío en el fluir de mi vida.",
    ],
  },
  claridad: {
    meditacion: [
      "Deja las manos sobre las piernas y mira un punto fijo. Cuenta cinco respiraciones largas. Cada pensamiento que aparezca, deja que pase como una nube. Queda lo esencial: tu {estado}. 🌤️",
      "Cierra los ojos e imagina un cielo despejado en la mañana. Todo se ve con nitidez. Elige una sola prioridad para hoy y quédate con ella. Eso es {estado}.",
    ],
    respiracion: [
      "Inhala aire fresco y claro. Exhala lo que ya no necesitas. Cinco veces. Cierra diciendo en voz audible: Veo con claridad lo que es esencial.",
      "Respira y siente cómo el aire ordena tu pecho. Exhala largo. Al final, di en voz audible: Hay paz en mi mente.",
    ],
  },
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
// Adaptadas de las respuestas predefinidas de escucha compasiva del guion de la Semana 1.
export const RESPUESTAS_RESPALDO = {
  tormenta: [
    "Es completamente normal tener momentos en los que te sientes mal. El camino hacia el bienestar no es lineal, y estos momentos no son un signo de fracaso: son una oportunidad para mirar más de cerca lo que sucede en tu interior.\nSé amable contigo mientras lo haces.",
    "El malestar que sientes tiene un propósito: es una señal de que algo en tu vida quizás necesita más atención o cuidado.\nNo te exijas una transformación instantánea. Ocuparte de esto no es debilidad, es fortaleza y autoconsciencia.",
  ],
  calma: [
    "Estar en un punto intermedio puede ser un regalo, un momento para pausar y observar con mayor claridad tu camino.\nCada ajuste, por pequeño que sea, abre la puerta a un mayor equilibrio.",
    "Es normal sentirse en un punto neutral, ni muy bien ni muy mal. Es un buen momento para reconocer lo que te ha funcionado hasta ahora y reforzarlo.",
  ],
  perdida: [
    "En los momentos en los que te sientes mal, es fundamental decirte la verdad a ti y a quienes te rodean sobre lo que está sucediendo. No subestimes el poder de tu red de apoyo: cuentas con más apoyo del que crees.",
    "Permítete recibir apoyo. Hablar y conectarte con los demás es un acto de valentía que te ayudará a recuperar tu equilibrio.",
  ],
};

export const DERIVACION = [
  "Por la situación actual, es importante que activemos la ruta de atención de crisis para asegurarnos de que recibas el apoyo necesario de manera adecuada y oportuna.",
  "Esto nos permitirá abordar de forma inmediata lo que está ocurriendo, con el respaldo profesional que puede marcar la diferencia. Si estás en peligro o piensas en hacerte daño, llama ya a la línea de emergencias 123 (Colombia) o busca a alguien de confianza que pueda estar contigo en este momento.",
  "Es un paso importante para tu bienestar, y estaremos aquí para acompañarte en todo el proceso. 🩵",
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
  const positivas = ["bien", "content", "feliz", "tranquil", "agradec", "motivad", "en paz", "mejor"];
  const sentimiento = best > 0 || riesgo ? "malestar" : positivas.some((w) => t.includes(w)) ? "bienestar" : "neutro";
  return { camino, riesgo, sentimiento };
}

// Notas del panel lateral: qué elemento del concepto se está viendo.
export const NOTAS = {
  llegada: {
    titulo: "Llegada",
    texto: "eme se presenta como guía digital (término provisional), habla de la privacidad y la protección de la información, y pide el consentimiento de la persona. Nada de esto requiere descargar una aplicación: vive en el canal que la persona ya usa.",
  },
  indice: {
    titulo: "Índice EME de Bienestar",
    texto: "El Índice se responde dentro de la conversación, de a poco (directamente o de forma conversacional). Aquí se muestran tres preguntas de ejemplo; el cuestionario actual tiene 25. Las opciones de frecuencia son las indicadas en el cuestionario.",
  },
  ruta: {
    titulo: "Ruta a la medida",
    texto: "El pilar con menor puntaje define por dónde empieza la ruta personal. La persona elige el estado que quiere cultivar: la personalización es una elección, no una asignación. El termómetro (1 a 10) es autopercepción del estado elegido, separado del Índice, y se toma antes y después de la práctica.",
  },
  practica: {
    titulo: "Práctica de la ruta",
    texto: "Cada práctica llega con meditación, imagen única y respiración, como en el guion de la Semana 1. Los contenidos son propios de Sentido EME y viven en su propia biblioteca; aquí se usan textos ilustrativos.",
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
    texto: "Ante una señal de riesgo, eme deja de acompañar sola y activa la ruta de atención de crisis: si la persona llegó por una empresa, se deriva a la persona encargada que la empresa definió; si es un usuario particular, se le sugieren recursos. En la demo no se envía ninguna alerta.",
  },
  avance: {
    titulo: "Avance",
    texto: "La persona ve su recorrido: prácticas, ruta y caminos. Los datos de esta tarjeta son de esta sesión de demo. Las empresas ven solo agregados de grupos (mínimo 5 personas para promedios y 10 para escucha agregada).",
  },
};
