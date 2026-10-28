# UD07 · Programación multimedia

> **Bloque MP0489_22 · Programación multimedia y de juegos.**
> Decisión relacionada: [DEC-PMDM-05](../../decisiones/DEC-PMDM-05-multimedia.md).

| Duración orientativa | RA trabajados |
|---|---|
| 22 h | RA3 (CE a-h) · RA2.j (refuerzo: permisos de cámara y micrófono) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA3.a | Se han analizado entornos de desarrollo multimedia. | RD 405/2023, anexo I, MP0489, RA3.a | P7 (apartado del informe) · D7 |
| RA3.b | Se han reconocido las clases que permiten la captura, procesamiento y almacenamiento de datos multimedia. | RD 405/2023, anexo I, MP0489, RA3.b | P7 (captura de foto y audio y almacenamiento) |
| RA3.c | Se han utilizado clases para la conversión de datos multimedia de un formato a otro. | RD 405/2023, anexo I, MP0489, RA3.c | P7 (JPEG → WebP; vídeo a MP4 H.264) |
| RA3.d | Se han utilizado clases para procesar datos multimedia. | RD 405/2023, anexo I, MP0489, RA3.d | P7 (redimensionado y filtros) |
| RA3.e | Se han utilizado clases para el control de eventos, tipos de media y excepciones, entre otros. | RD 405/2023, anexo I, MP0489, RA3.e | P7 (listeners, MIME, excepciones) · D7 |
| RA3.f | Se han utilizado clases para la creación y control de animaciones. | RD 405/2023, anexo I, MP0489, RA3.f | P7 (tres animaciones de distinto tipo) |
| RA3.g | Se han utilizado clases para reproducir contenidos multimedia. | RD 405/2023, anexo I, MP0489, RA3.g | P7 (reproductor de audio y vídeo) |
| RA3.h | Se han depurado y documentado los programas desarrollados. | RD 405/2023, anexo I, MP0489, RA3.h | P7 (registro de depuración + documentación técnica) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Explicar los conceptos de formato, contenedor, códec, tasa de bits y resolución, y analizar entornos y APIs multimedia.
2. Capturar fotos y audio, elegir contenido de la galería y almacenarlo correctamente.
3. Procesar y convertir imágenes, audio y vídeo entre formatos.
4. Reproducir audio y vídeo controlando estados, eventos y errores.
5. Crear y controlar animaciones en la interfaz.
6. Depurar y documentar componentes multimedia.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Utilización de librerías multimedia integradas».

- Conceptos sobre aplicaciones multimedia.
- Arquitectura del API utilizado.
- Fuentes de datos multimedia. Clases.
- Procesamiento de objetos multimedia. Clases. Estados, métodos y eventos.
- Reproducción de objetos multimedia. Clases. Estados, métodos y eventos.
- Animación de objetos.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Conceptos sobre aplicaciones multimedia

| Concepto | Qué es | Ejemplos |
|---|---|---|
| Contenedor | Fichero que agrupa pistas y metadatos | MP4, WebM, Matroska (MKV), Ogg, M4A |
| Códec | Algoritmo que comprime y descomprime una pista | Vídeo: H.264/AVC, H.265/HEVC, VP9, AV1 · Audio: AAC, Opus, MP3, FLAC |
| Tipo MIME | Identificador del tipo de contenido | `video/mp4`, `audio/mp4a-latm`, `image/webp` |
| Imagen | Formatos con o sin pérdida | JPEG (con pérdida), PNG (sin pérdida), WebP, AVIF y HEIF (con o sin pérdida) |
| Parámetros | Calidad frente a tamaño | Resolución, *frame rate*, tasa de bits, frecuencia de muestreo (44,1/48 kHz), canales |

- **Compresión con pérdida y sin pérdida.** Codificar varias veces con pérdida degrada el resultado.
- **Decodificación por hardware:** el móvil decodifica H.264/H.265 con hardware dedicado, lo que ahorra batería frente a la decodificación por software. Es otra limitación de RA1.a.
- **Formatos compatibles con Android:** hay una tabla oficial en la documentación ([Supported media formats](https://developer.android.com/media/platform/supported-formats)).

### 2. Entornos de desarrollo multimedia y arquitectura del API (RA3.a)

| Entorno o herramienta | Uso |
|---|---|
| Android Studio + **Jetpack Media3** + **CameraX** | Apps móviles con captura, edición y reproducción |
| FFmpeg / ffprobe | Línea de comandos: inspeccionar, convertir y procesar cualquier formato |
| Audacity, GIMP/Krita, Blender, OBS | Edición de audio, imagen, 3D y captura de pantalla para crear recursos |
| Web Media APIs (`<video>`, MediaRecorder, Web Audio) | Multimedia en el navegador (DAW) |
| JavaFX Media | Escritorio en Java (MP0488) |
| Godot / Unity (audio, animación) | Juegos (UD08-UD10) |

**Arquitectura de Media3:**

```
            MediaItem (URI + metadatos)
                    │
 Player (interfaz) ─┴─ ExoPlayer ── MediaSource ── Extractor (MP4, WebM…) ── Renderers (decodificadores de audio y vídeo)
     │                                    └── TrackSelector (elige pistas y calidad)
     ├── Player.Listener (estados y eventos)
     ├── PlayerView / componentes Compose de media3-ui-compose
     └── MediaSession + MediaSessionService (controles del sistema, reproducción en segundo plano)

 Transformer (edición y transcodificación) ── EditedMediaItem ── Effects (audio y vídeo) ── Composition
```

**CameraX** se organiza en **casos de uso** (*use cases*): `Preview`, `ImageCapture`, `VideoCapture` e `ImageAnalysis`. Se vinculan al ciclo de vida, con `LifecycleCameraController` o con `ProcessCameraProvider`.

### 3. Fuentes de datos: captura y almacenamiento (RA3.b)

**Elegir de la galería sin permisos** con el *Photo Picker*:

```kotlin
val selector = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
    uri?.let(onImagenElegida)
}
Button(onClick = { selector.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) }) {
    Text("Elegir foto")
}
```

**Cámara con CameraX.** Requiere el permiso `CAMERA` en tiempo de ejecución.

```kotlin
@Composable
fun CamaraScreen(onFoto: (File) -> Unit) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current          // androidx.lifecycle.compose
    val controller = remember {
        LifecycleCameraController(context).apply { setEnabledUseCases(CameraController.IMAGE_CAPTURE) }
    }
    LaunchedEffect(lifecycleOwner) { controller.bindToLifecycle(lifecycleOwner) }

    Box(Modifier.fillMaxSize()) {
        AndroidView(factory = { PreviewView(it).apply { this.controller = controller } }, modifier = Modifier.fillMaxSize())
        Button(
            onClick = {
                val fichero = File(context.filesDir, "obs_${System.currentTimeMillis()}.jpg")
                controller.takePicture(
                    ImageCapture.OutputFileOptions.Builder(fichero).build(),
                    ContextCompat.getMainExecutor(context),
                    object : ImageCapture.OnImageSavedCallback {
                        override fun onImageSaved(r: ImageCapture.OutputFileResults) = onFoto(fichero)
                        override fun onError(e: ImageCaptureException) =
                            Log.e("Camara", "Error de captura (${e.imageCaptureError})", e)
                    },
                )
            },
            modifier = Modifier.align(Alignment.BottomCenter).padding(24.dp),
        ) { Text("Hacer foto") }
    }
}
```

**Audio con `MediaRecorder`.** Requiere el permiso `RECORD_AUDIO`.

```kotlin
class GrabadoraAudio(private val context: Context) {
    private var recorder: MediaRecorder? = null

    fun iniciar(destino: File) {
        recorder = (if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) MediaRecorder(context)
                    else @Suppress("DEPRECATION") MediaRecorder()).apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)   // contenedor .m4a
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)      // códec
            setAudioEncodingBitRate(128_000)
            setAudioSamplingRate(44_100)
            setOutputFile(destino.absolutePath)
            prepare()                                            // puede lanzar IOException
            start()
        }
    }

    fun detener() {
        try { recorder?.stop() } catch (e: RuntimeException) {   // se detuvo sin datos
            Log.w("Grabadora", "Grabación vacía, se descarta", e)
        } finally { recorder?.release(); recorder = null }
    }
}
```

`MediaRecorder` tiene una **máquina de estados**: *Initial → Initialized → DataSourceConfigured → Prepared → Recording → Released*. Si se llama a un método en el estado incorrecto, lanza `IllegalStateException`.

**Almacenamiento:**

- `filesDir` para los ficheros privados de la app. En Room se guarda solo la ruta, nunca el binario.
- `MediaStore` si el usuario quiere el fichero en su galería (ver la UD04).

### 4. Conversión entre formatos (RA3.c)

**Imagen: JPEG → WebP, redimensionada.** `ImageDecoder` necesita API 28 o superior; en API 26-27 se usa `BitmapFactory` con `inSampleSize`.

```kotlin
suspend fun convertirAWebp(context: Context, origen: Uri, destino: File, calidad: Int = 80) =
    withContext(Dispatchers.IO) {
        val fuente = ImageDecoder.createSource(context.contentResolver, origen)
        val bitmap = ImageDecoder.decodeBitmap(fuente) { decoder, info, _ ->
            val escala = 1600f / maxOf(info.size.width, info.size.height)
            if (escala < 1f) decoder.setTargetSize((info.size.width * escala).toInt(), (info.size.height * escala).toInt())
        }
        val formato = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) Bitmap.CompressFormat.WEBP_LOSSY
                      else @Suppress("DEPRECATION") Bitmap.CompressFormat.WEBP
        destino.outputStream().use { out -> check(bitmap.compress(formato, calidad, out)) { "No se pudo codificar" } }
        destino.length()   // devuelve el tamaño para compararlo con el original
    }
```

**Vídeo: cualquier formato compatible → MP4 (H.264 + AAC) a 720p, con Media3 Transformer.** Hay que crearlo y usarlo desde el hilo principal.

```kotlin
fun transcodificar(context: Context, entrada: Uri, salida: File, onFin: (Result<File>) -> Unit) {
    val transformer = Transformer.Builder(context)
        .setVideoMimeType(MimeTypes.VIDEO_H264)
        .setAudioMimeType(MimeTypes.AUDIO_AAC)
        .addListener(object : Transformer.Listener {
            override fun onCompleted(composition: Composition, exportResult: ExportResult) =
                onFin(Result.success(salida))
            override fun onError(composition: Composition, exportResult: ExportResult, exportException: ExportException) =
                onFin(Result.failure(exportException))
        })
        .build()

    val editado = EditedMediaItem.Builder(MediaItem.fromUri(entrada))
        .setEffects(Effects(/* audioProcessors = */ emptyList(), /* videoEffects = */ listOf(Presentation.createForHeight(720))))
        .build()
    transformer.start(editado, salida.absolutePath)
}
```

- `EditedMediaItem.Builder(...).setRemoveVideo(true)` extrae solo el audio.
- El progreso se consulta con `transformer.getProgress(progressHolder)`.
- **Comparación con FFmpeg:** `ffmpeg -i entrada.mov -c:v libx264 -c:a aac -vf scale=-2:720 salida.mp4`, y `ffprobe` para comprobar el resultado.

### 5. Procesamiento de datos multimedia (RA3.d)

- **Imágenes:**
  - redimensionar (`setTargetSize`, `Bitmap.createScaledBitmap`);
  - rotar según el EXIF (`androidx.exifinterface`);
  - recortar;
  - filtros de color.
- **Filtros en Compose:** se aplican sin modificar el fichero, solo en pantalla.

```kotlin
val blancoYNegro = ColorFilter.colorMatrix(ColorMatrix().apply { setToSaturation(0f) })
Image(bitmap = bmp.asImageBitmap(), contentDescription = obs.titulo, colorFilter = if (bn) blancoYNegro else null)
```

- **Para guardar el filtro** se dibuja el `Bitmap` en un `android.graphics.Canvas` con un `Paint` que lleve un `ColorMatrixColorFilter`, y después se comprime.
- **Vídeo:** efectos de Transformer, por ejemplo `RgbFilter.createGrayscaleFilter()`, `ScaleAndRotateTransformation` y recorte por tiempo con `MediaItem.ClippingConfiguration`.
- **Análisis en vivo:** el caso de uso `ImageAnalysis` de CameraX entrega fotogramas para procesarlos (luminosidad media, códigos QR con ML Kit como ampliación).

### 6. Eventos, tipos de media y excepciones (RA3.e)

| Componente | Eventos y estados | Excepciones o errores |
|---|---|---|
| ExoPlayer | `onPlaybackStateChanged` (`STATE_IDLE`, `STATE_BUFFERING`, `STATE_READY`, `STATE_ENDED`), `onIsPlayingChanged`, `onMediaItemTransition` | `onPlayerError(PlaybackException)` con `errorCode`/`errorCodeName` (red, formato no compatible, decodificador) |
| CameraX | `OnImageSavedCallback`, estado de la cámara (`cameraInfo.cameraState`) | `ImageCaptureException` (`imageCaptureError`) |
| MediaRecorder | `setOnInfoListener` (duración o tamaño máximo), `setOnErrorListener` | `IllegalStateException`, `IOException`, `RuntimeException` en `stop()` |
| Transformer | `onCompleted`, progreso | `ExportException` (`errorCode`) |

- **Tipos de media:** se comprueban antes de procesar.
  - `contentResolver.getType(uri)` devuelve el MIME.
  - `MimeTypes.isVideo(mime)` y `isAudio(mime)`.
  - Se rechazan con un mensaje los tipos no compatibles.
- **Foco de audio:** ExoPlayer lo gestiona si se usa `setAudioAttributes(attrs, /* handleAudioFocus = */ true)`. Así la app se pausa durante una llamada o cuando suena otra app.

### 7. Reproducción de contenidos multimedia (RA3.g)

```kotlin
@Composable
fun Reproductor(uri: Uri, esVideo: Boolean) {
    val context = LocalContext.current
    val player = remember { ExoPlayer.Builder(context).build() }
    var estado by remember { mutableStateOf("Inactivo") }

    DisposableEffect(player) {
        val listener = object : Player.Listener {
            override fun onPlaybackStateChanged(s: Int) {
                estado = when (s) {
                    Player.STATE_BUFFERING -> "Cargando…"
                    Player.STATE_READY -> "Listo"
                    Player.STATE_ENDED -> "Terminado"
                    else -> "Inactivo"
                }
            }
            override fun onPlayerError(error: PlaybackException) { estado = "Error: ${error.errorCodeName}" }
        }
        player.addListener(listener)
        onDispose { player.removeListener(listener); player.release() }   // liberar SIEMPRE
    }
    LaunchedEffect(uri) { player.setMediaItem(MediaItem.fromUri(uri)); player.prepare() }

    Column {
        if (esVideo) {
            AndroidView(factory = { PlayerView(it).apply { this.player = player } },
                modifier = Modifier.fillMaxWidth().aspectRatio(16f / 9f))
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { if (player.isPlaying) player.pause() else player.play() }) {
                Icon(Icons.Default.PlayArrow, contentDescription = "Reproducir o pausar")
            }
            Text(estado)
        }
    }
}
```

- **Efectos cortos de sonido:** `SoundPool`, con baja latencia. Por ejemplo, un «clic» al guardar una observación.
- **Reproducción en segundo plano:** `MediaSessionService` con los controles en la notificación y la pantalla de bloqueo (ampliación).
- **Streaming:** el mismo `MediaItem.fromUri("https://…")`, también con HLS o DASH añadiendo sus módulos.
- `media3-ui-compose` ofrece componentes nativos de Compose (`PlayerSurface` y otros) como alternativa a `PlayerView`.

### 8. Animación de objetos (RA3.f)

| API de Compose | Para qué |
|---|---|
| `animate*AsState` (`animateFloatAsState`, `animateColorAsState`, `animateDpAsState`) | Animar un valor cuando cambia el estado |
| `AnimatedVisibility` / `AnimatedContent` | Aparecer y desaparecer, o cambiar de contenido con transición |
| `updateTransition` | Varias propiedades coordinadas según un estado |
| `rememberInfiniteTransition` | Animaciones en bucle (pulso de «grabando») |
| `Animatable` | Control imperativo desde corrutinas (`animateTo`, `snapTo`, `stop`), por ejemplo siguiendo un gesto |
| `SharedTransitionLayout` | Elementos compartidos entre pantallas (lista → detalle) |

```kotlin
@Composable
fun BotonGrabar(grabando: Boolean, onClick: () -> Unit) {
    val escala by animateFloatAsState(if (grabando) 1.2f else 1f, animationSpec = spring(dampingRatio = 0.4f), label = "escala")
    val pulso = rememberInfiniteTransition(label = "pulso")
    val alfa by pulso.animateFloat(1f, 0.3f, infiniteRepeatable(tween(700), RepeatMode.Reverse), label = "alfa")
    FloatingActionButton(
        onClick = onClick,
        containerColor = if (grabando) Color.Red.copy(alpha = alfa) else MaterialTheme.colorScheme.primaryContainer,
        modifier = Modifier.graphicsLayer(scaleX = escala, scaleY = escala),
    ) { Icon(Icons.Default.Mic, contentDescription = if (grabando) "Detener" else "Grabar nota de voz") }
}
```

> `Icons.Default.Mic` está en `material-icons-extended`, no en los iconos básicos. Para no añadir esa dependencia, que es grande, se puede importar el icono de *Material Symbols* como vector (`painterResource(R.drawable.ic_mic)`).

- **Control de animaciones:** las *specs* `tween`, `spring` y `keyframes`, *easing*, duración, repetición y cancelación (al lanzar otra animación sobre el mismo `Animatable`, la anterior se cancela).
- **Accesibilidad:** hay que respetar el ajuste del sistema de reducir animaciones.
- **Alternativas:** `ObjectAnimator`/`MotionLayout` con Vistas y **Lottie** para animaciones vectoriales exportadas desde After Effects.

### 9. Depuración y documentación (RA3.h)

- **Logcat:** se filtra por etiqueta y nivel.
- **`EventLogger` de Media3** registra cada evento del reproductor: `player.addAnalyticsListener(EventLogger())`.
- **Profiler de memoria:** los `Bitmap` grandes son la causa típica de `OutOfMemoryError`. Por eso hay que decodificar a tamaño reducido.
- **Device Explorer** de Android Studio permite descargar los ficheros generados y examinarlos con `ffprobe` (códec, tasa de bits, duración).
- **Documentación:**
  - KDoc de las clases multimedia;
  - tabla de formatos que acepta y genera la app;
  - diagrama de estados del reproductor y de la grabadora;
  - registro de errores encontrados y cómo se resolvieron.

> **Alternativa:**
> - En **Flutter**: `camera`, `image_picker`, `record`, `just_audio`/`video_player`, `ffmpeg_kit` (hay que comprobar su mantenimiento) y animaciones implícitas y explícitas.
> - En escritorio, **JavaFX** (`Media`, `MediaPlayer`, `MediaView`, `Timeline`).

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Laboratorio de formatos.** Con `ffprobe`, analizar tres vídeos y tres audios (contenedor, códec, tasa de bits) y convertir uno con FFmpeg. Comparar tamaños y calidad.
- **A2. Mapa de APIs.** Dibujar la arquitectura de Media3 y de CameraX y comparar con `MediaPlayer` y Camera2: qué resuelve cada capa.
- **A3. Cámara mínima.** CameraX con vista previa y captura, con la petición del permiso `CAMERA`.
- **A4. Grabadora.** Grabar, detener y reproducir una nota de voz. Provocar a propósito un `IllegalStateException` y gestionarlo.
- **A5. Conversor.** JPEG → WebP con varias calidades. Tabla de tamaño frente a calidad percibida.
- **A6. Animaciones.** Las seis APIs de la tabla de la sección 8 en una pantalla de demostración.
- **A7. Reproductor con EventLogger.** Reproducir un vídeo remoto, cortar la red y analizar en Logcat la secuencia de estados y el error.

### Práctica evaluable

**P7 · Hito 5 del «Observaciones de campo»: módulo multimedia.** Se hace en equipo, con PR revisados y CI.

> **Conexión con el mundo real:** las apps de campo (inspecciones, peritajes, ciencia ciudadana) capturan fotos, audio y vídeo, los comprimen para ahorrar datos y almacenamiento y los reproducen sin conexión. Es el tipo de funcionalidad que el cliente ficticio pide para la versión 1.1.

- **Foto** de la observación con CameraX o Photo Picker. Se convierte a **WebP** redimensionado y se muestra el ahorro de tamaño (RA3.b, c).
- **Filtro** aplicable a la foto (blanco y negro u otro), con vista previa y opción de guardarlo (RA3.d).
- **Nota de voz** con `MediaRecorder` y **reproductor** con ExoPlayer que muestra estados y errores (RA3.b, e, g).
- **Vídeo corto opcional:** se elige de la galería y se transcodifica a MP4 H.264 a 720p con Transformer (RA3.c). En equipos de 3 personas es obligatorio.
- **Tres animaciones** de tipos distintos (por ejemplo, botón de grabación, transición de la lista al detalle y aparición de un panel) (RA3.f).
- **Informe técnico** con:
  - análisis comparativo de dos entornos o APIs multimedia (RA3.a);
  - tabla de formatos;
  - diagramas de estados;
  - registro de depuración con al menos tres incidencias resueltas (RA3.h).
- **Entregables:** *release* `v1.1.0` y defensa oral individual (D7).

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA3.a | Compara con criterio dos entornos o APIs (arquitectura, formatos, licencia, uso) y justifica la elección | Describe los entornos sin una comparación profunda | No analiza entornos |
| RA3.b | Captura foto y audio, con permisos, y los guarda correctamente (fichero privado + ruta en Room) | Captura una de las dos o el almacenamiento es mejorable | No hay captura |
| RA3.c | Hace conversiones correctas (WebP y, si procede, MP4 H.264) y las verifica con datos (tamaño, `ffprobe`) | Hace una conversión que funciona, sin verificar | No hay conversión |
| RA3.d | El procesamiento de imagen o vídeo es útil, eficiente (fuera del hilo principal, tamaño reducido) y se puede guardar | El procesamiento es solo visual o poco eficiente | No hay procesamiento |
| RA3.e | Tiene *listeners* de estado y error, comprueba el tipo MIME y gestiona todas las excepciones con mensajes al usuario | Gestiona algunos eventos o excepciones | La app se cierra ante errores de multimedia |
| RA3.f | Tiene tres animaciones de distinto tipo bien integradas y controladas (interrupción, accesibilidad) | Tiene dos animaciones, o son poco controladas | Una o ninguna |
| RA3.g | La reproducción es correcta, con controles, estado visible, liberación del reproductor y foco de audio | Reproduce, pero no libera recursos o no tiene controles | No reproduce |
| RA3.h | Registro de depuración real, documentación técnica completa y KDoc | Documentación parcial | No hay depuración ni documentación |

**D7 (defensa oral, 20 % de RA3):** preguntas sobre la arquitectura de las APIs, los estados del reproductor o la grabadora y la gestión de excepciones.

## Recursos

- **Documentación oficial:**
  - [Jetpack Media3](https://developer.android.com/media/media3)
  - [ExoPlayer](https://developer.android.com/media/media3/exoplayer)
  - [Media3 Transformer](https://developer.android.com/media/media3/transformer)
  - [CameraX](https://developer.android.com/media/camera/camerax)
  - [Photo Picker](https://developer.android.com/training/data-storage/shared/photopicker)
  - [MediaRecorder](https://developer.android.com/media/platform/mediarecorder)
  - [SoundPool](https://developer.android.com/reference/android/media/SoundPool)
  - [Formatos compatibles](https://developer.android.com/media/platform/supported-formats)
  - [Animaciones en Compose](https://developer.android.com/develop/ui/compose/animation/introduction)
  - [FFmpeg](https://ffmpeg.org/documentation.html)
- **Codelabs y ejemplos:** [Animar elementos en Compose](https://developer.android.com/codelabs/jetpack-compose-animation) · [Media3 ejemplos](https://github.com/androidx/media/tree/release/demos) · [CameraX ejemplos](https://github.com/android/camera-samples)
- **Herramientas:** FFmpeg/ffprobe, Audacity, Device Explorer, Profiler, cámara virtual del emulador.
