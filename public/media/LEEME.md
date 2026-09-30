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
    "ruta-estabilidad": ["/media/ruta-estabilidad-1.mp3"],
    "pulso-respirar": ["/media/respirar-1.mp3"]
  }
}
```

Claves de imágenes: `estabilidad`, `plenitud`, `crecimiento`, `integracion`, `claridad`, `pulso-tormenta`, `pulso-calma`, `pulso-perdida`.
Claves de audios: `ruta-estabilidad`, `ruta-plenitud`, `ruta-crecimiento`, `ruta-integracion`, `ruta-claridad`, `pulso-respirar`, `pulso-soltar`, `pulso-escuchar`.

Lo que no tenga archivo usa una imagen generada o una nota de voz simulada con su texto.
