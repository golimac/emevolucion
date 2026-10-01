# emevolucion

Demo de concepto del acompañamiento permanente de Sentido EME (eme): una conversación tipo mensajería, solo teléfono, con las cinco escenas del concepto (llegada, Índice EME, ruta a la medida, escucha con Pulso y avance).

## Qué hace

- Interacción híbrida: botones de respuesta rápida y texto libre.
- Contenido prefabricado con variantes al azar (`lib/content.js`).
- Dos puntos donde habla Claude: la escucha compasiva (`app/api/chat/route.js`: responde como eme, elige la práctica complementaria y detecta riesgo) y la escritura en vivo de la meditación y la respiración (`app/api/practica/route.js`). Sin clave, límite agotado o fallo de la API, usa respuestas de respaldo y la demo sigue funcionando.
- La práctica se escribe en el chat palabra por palabra antes de llegar como audio. El panel lateral tiene "Detrás de escena" (con un botón para ver la práctica con otro estado) y "Lo que eme va aprendiendo" (memoria visible).
- Regla de producto: la persona nunca ve nombres internos (pilar, ruta, camino, Pulso, Índice). Solo ve su estado elegido, en negrita, y "prácticas complementarias".
- Audios e imágenes propios: ver `public/media/LEEME.md`.
- Tarjetas "Detrás de escena": muestran cómo eme caracteriza a la persona, sugiere la ruta, personaliza y "genera" cada pieza (simulado). Se ocultan con el botón ◐ del encabezado.
- Panel lateral "Qué estás viendo" con el elemento del concepto en pantalla (en teléfono, botón `i`).

Los textos de práctica y las cinco preguntas del Índice son ilustrativos (el Índice real tiene 25). El pilar de la ruta se calcula con la pregunta de menor puntaje, asumiendo que las cinco preguntas de ejemplo siguen el orden de los pilares.

## Publicar en Vercel (sin experiencia previa)

1. Entra a vercel.com y crea una cuenta con "Continue with GitHub".
2. Pulsa **Add New… > Project** y elige el repositorio `emevolucion`. Vercel detecta Next.js solo.
3. Antes de pulsar **Deploy**, abre **Environment Variables** y agrega:
   - `ANTHROPIC_API_KEY` = tu clave de Anthropic (se crea en console.anthropic.com > API Keys).
   - Opcionales: `ANTHROPIC_MODEL` (por defecto `claude-sonnet-5-5`), `DEMO_IP_LIMIT` (llamadas por persona al día, 24) y `DEMO_GLOBAL_LIMIT` (llamadas totales al día, 600). Cada sesión usa 3 llamadas.
4. Pulsa **Deploy**. En un par de minutos tienes un enlace público para compartir.
5. Cada vez que subas cambios (audios, imágenes, textos) al repositorio, Vercel republica solo.

## Control de gasto

Los límites por persona y por día viven en memoria: frenan abusos normales, pero se reinician cuando Vercel reinicia la función. El freno definitivo es el tope de gasto mensual que se configura en console.anthropic.com (Settings > Limits). Recomendado: fijarlo antes de compartir el enlace.

## Correr en local

```
npm install
ANTHROPIC_API_KEY=tu_clave npm run dev
```

Sin la clave, la demo funciona con respuestas de respaldo.

## Dónde está cada cosa

- `app/Demo.js`: el flujo completo (`start()`), los mensajes, el panel lateral y las ayudas (`say`, `ask`, `choose`, `bts`, `aprende`, `generar`).
- `lib/content.js`: todos los textos, estados, preguntas, prácticas de respaldo y notas del panel.
- `lib/limite.js`: topes de uso compartidos por las dos rutas de la API.
- `app/api/chat/route.js` y `app/api/practica/route.js`: llamadas a Claude.
- `app/Art.js`, `app/globals.css`: ilustraciones generadas y estilos.
