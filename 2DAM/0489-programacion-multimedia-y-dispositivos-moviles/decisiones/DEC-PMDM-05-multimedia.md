# DEC-PMDM-05 · Librerías multimedia

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD07 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Desarrolla programas que integran contenidos multimedia analizando y empleando las tecnologías y librerías específicas.» Fuente: RD 405/2023, anexo I, MP0489, RA3 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Criterios a) a h).

> «Arquitectura del API utilizado. Fuentes de datos multimedia. Clases. Procesamiento de objetos multimedia. Clases. Estados, métodos y eventos. Reproducción de objetos multimedia. […] Animación de objetos.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Utilización de librerías multimedia integradas»

## Alternativas evaluadas

| Criterio | A. Jetpack Media3 (ExoPlayer, Transformer) + CameraX + `MediaRecorder` + animaciones de Compose | B. APIs del framework: `MediaPlayer`, Camera2, `MediaCodec` | C. JavaFX Media (escritorio) |
|---|---|---|---|
| C1 Normativa | ✅ Cubre la captura (CameraX, `MediaRecorder`), la conversión (Transformer, `Bitmap.compress`), el procesamiento, los eventos (`Player.Listener`, `PlaybackException`), la reproducción y las animaciones | ✅ Lo cubre, con más complejidad | ➖ No captura desde la cámara de forma nativa. La conversión de formatos es limitada |
| C2 Aplicabilidad profesional | ✅ Media3 es la librería recomendada para reproducción en Android ([developer.android.com/media/media3](https://developer.android.com/media/media3)) y CameraX la recomendada para cámara ([CameraX](https://developer.android.com/media/camera/camerax)) | ➖ Bajo nivel, se usa en casos especiales | ➖ Poco uso actual (valoración propia) |
| C3 Disponibilidad y coste | ✅ Gratuito | ✅ | ✅ |
| C5 Vigencia y soporte | ✅ Media3 sustituye a ExoPlayer 2 y a MediaSession *compat* | ➖ `MediaPlayer` se mantiene, pero no evoluciona | ➖ |
| C6 Recursos didácticos | ✅ Guías y ejemplos oficiales | ✅ Material antiguo abundante | ➖ |
| C7 Continuidad curricular | ✅ Continúa la app del bloque 1 (hito 5). Las animaciones enlazan con MP0488 | ✅ | ✅ Enlaza con JavaFX de MP0488 |
| C8 Viabilidad en el aula | ✅ El emulador tiene cámara virtual y micrófono | ➖ Camera2 es largo de enseñar | ✅ |

## Decisión

**A.** Se elige por C1 (cubre los ocho CE en la misma app), C2 y C5 (recomendación oficial y vigencia) y C7 (continuidad del proyecto). `MediaPlayer` se ve en una comparativa breve y `SoundPool` para los efectos cortos.

## Consecuencias

- Hacen falta los permisos `CAMERA` y `RECORD_AUDIO`. Para elegir imágenes de la galería se usa el *Photo Picker*, que no necesita permiso.
- `PlayerView` y `PreviewView` son Vistas. Se usan con `AndroidView` o con los nuevos componentes de Compose de Media3 y CameraX, cuando sean estables.
- **Plan B:** en Flutter, `camera`, `video_player`/`just_audio`, `record`. En escritorio, JavaFX Media.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Android Developers: Media3, CameraX (enlaces de la tabla), consultados el 2026-10-27.
