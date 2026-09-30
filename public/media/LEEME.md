# Tus propios audios e imágenes

1. Sube los archivos a esta carpeta (`public/media`).
2. Anótalos en `manifest.json`. Si una clave tiene varios archivos, la demo elige uno al azar.

Ejemplo:

```json
{
  "imagenes": {
    "estabilidad": ["/media/estabilidad-1.png", "/media/estabilidad-2.png"],
    "pulso-tormenta": ["/media/tormenta-1.png"]
  },
  "audios": {
    "meditacion-estabilidad": ["/media/meditacion-estabilidad-1.mp3"],
    "respiracion-estabilidad": ["/media/respiracion-estabilidad-1.mp3"],
    "pulso-respirar": ["/media/respirar-1.mp3"]
  }
}
```

Claves de imágenes: `estabilidad`, `plenitud`, `crecimiento`, `integracion`, `claridad`, `pulso-tormenta`, `pulso-calma`, `pulso-perdida`.
Claves de audios: `meditacion-<pilar>` y `respiracion-<pilar>` (con estabilidad, plenitud, crecimiento, integracion o claridad), más `pulso-respirar`, `pulso-soltar` y `pulso-escuchar`.

Lo que no tenga archivo usa una imagen generada o una nota de voz simulada con su texto.
