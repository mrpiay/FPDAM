# UD06 · Interfaces naturales de usuario

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 24 h · ≈ 29 sesiones de 50 min (estimación; semanas 21–25) | RA2 (a–f, principal) |

> Este RA es **nuevo en el RD 405/2023** y no lo cubre el material elaborado para el RD 450/2010. La justificación de las tecnologías (Vosk en Java; MediaPipe, Teachable Machine y AR.js en web) está en [DEC-DI-03](../../decisiones/DEC-DI-03-interfaces-naturales.md).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.a | Se han identificado las herramientas disponibles para el aprendizaje automático relacionadas con las interfaces de usuario. | [RD 405/2023, anexo I, 0488, RA2.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | A1 (comparativa) y prueba práctica en aula del 2.º trimestre; P6 (justificación) |
| RA2.b | Se ha creado una interfaz natural de usuario utilizando las herramientas disponibles. | [RD 405/2023, anexo I, 0488, RA2.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P6: modelo propio entrenado con Teachable Machine e integrado en una interfaz |
| RA2.c | Se ha utilizado el reconocimiento de voz para implementar acciones en las interfaces naturales de usuario. | [RD 405/2023, anexo I, 0488, RA2.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P6: órdenes de voz con Vosk en el gestor de taller |
| RA2.d | Se ha incorporado la detección del movimiento del cuerpo para implementar acciones en las interfaces naturales de usuario. | [RD 405/2023, anexo I, 0488, RA2.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P6: acción disparada por una postura o un movimiento (MediaPipe Pose) |
| RA2.e | Se han integrado elementos de detección de partes del cuerpo para implementar acciones en las interfaces naturales de usuario. | [RD 405/2023, anexo I, 0488, RA2.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P6: gestos de mano (MediaPipe Gesture Recognizer / Hand Landmarker) o rasgos faciales |
| RA2.f | Se ha integrado la realidad aumentada en los interfaces de usuario. | [RD 405/2023, anexo I, 0488, RA2.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P6: escena de RA con marcador (AR.js + A-Frame) enlazada a datos del gestor de taller |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Generación de interfaces naturales de usuario», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Herramientas para el aprendizaje automático. Entrenamiento.
- Interfaces naturales. Tipos.
- Voz y Habla. Reconocimiento.
- Partes y movimientos del cuerpo. Detección.
- Realidad aumentada.

> **[Normativo]** Prospectiva relacionada: «El consumo generalizado de dispositivos inteligentes, el auge de la inteligencia artificial (IA) y la realidad aumentada…». Fuente: RD 405/2023, art. segundo, apdo. cuatro (art. 8.l del RD 450/2010) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Clasificar los tipos de interfaces naturales y valorar cuándo aportan valor y cuándo no.
2. Explicar el ciclo básico del aprendizaje automático supervisado (datos, etiquetas, entrenamiento, validación e inferencia) e identificar las herramientas disponibles.
3. Entrenar un clasificador con una herramienta visual (Teachable Machine) y usarlo desde una interfaz.
4. Implementar órdenes de voz sin conexión en una aplicación Java.
5. Detectar manos, gestos, postura corporal y rasgos faciales con MediaPipe, y traducirlos en acciones.
6. Integrar una escena de realidad aumentada con marcador en una interfaz web.
7. Aplicar criterios de privacidad (RGPD) y accesibilidad a las interfaces naturales.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Interfaces naturales: tipos y criterios

Una **interfaz natural de usuario** (NUI) aprovecha capacidades humanas cotidianas (hablar, gesticular, moverse, mirar) en lugar de dispositivos intermedios como el teclado o el ratón.

| Tipo | Entrada | Ejemplo profesional |
|---|---|---|
| Voz | Habla → texto → intención | Dictado, órdenes con manos ocupadas (taller, quirófano, almacén) |
| Gestos de mano | Cámara → puntos clave de la mano → gesto | Pasar páginas sin tocar la pantalla (entornos sucios o estériles) |
| Cuerpo y postura | Cámara → esqueleto | Ejercicio físico guiado, ergonomía, control a distancia |
| Cara | Cámara → puntos faciales y expresiones | Accesibilidad (control con parpadeos o con la cabeza), filtros de vídeo |
| Táctil multitáctil | Pantalla | Quioscos, tabletas |
| Realidad aumentada | Cámara + seguimiento → contenido superpuesto | Instrucciones de mantenimiento sobre la máquina, catálogo 3D |

Criterios de diseño específicos:

- **Retroalimentación inmediata:** mostrar qué se ha reconocido («He entendido: *nuevo cliente*»).
- **Tolerancia a errores:** umbral de confianza, confirmación de las acciones destructivas y forma fácil de cancelar.
- **Descubribilidad:** listar las órdenes o gestos disponibles. Las NUI no son autoexplicativas.
- **Alternativa siempre disponible:** la NUI complementa al teclado y al ratón, nunca los sustituye. Esto conecta con la accesibilidad de la UD02.
- **Fatiga:** evitar gestos sostenidos o con los brazos en alto durante mucho tiempo.

**Privacidad.** La imagen y la voz que permiten identificar a una persona son datos personales, y los datos biométricos tratados para identificarla son una categoría especial según el RGPD ([Reglamento (UE) 2016/679, art. 9](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)). Por eso, en esta unidad todo se procesa **en local** (navegador o JVM), no se guardan grabaciones y se informa antes de activar la cámara o el micrófono.

### 2. Aprendizaje automático para interfaces (RA2.a)

Conceptos mínimos:

- **Aprendizaje supervisado:** se aprende una función entrada → etiqueta a partir de ejemplos etiquetados. Para estas interfaces basta con la **clasificación**: qué gesto es, qué palabra es.
- **Conjuntos de entrenamiento y validación**, **sobreajuste** (memoriza en lugar de generalizar), **matriz de confusión**, **precisión por clase**.
- **Transferencia de aprendizaje:** se parte de un modelo preentrenado y solo se reentrena la última capa. Así basta con decenas de ejemplos por clase, que es lo que hace Teachable Machine.
- **Inferencia en el dispositivo** (*on-device*): el modelo se ejecuta en local (WebAssembly/WebGL en el navegador o nativo). Ofrece privacidad, latencia baja y funciona sin conexión.

| Herramienta | Tipo | Uso en la unidad |
|---|---|---|
| **Teachable Machine** (Google) | Entrenamiento visual en el navegador (imagen, sonido, pose) y exportación a TensorFlow.js | Modelo propio (RA2.b) |
| **MediaPipe Tasks** (Google AI Edge) | Modelos preentrenados de manos, gestos, pose y cara para web, Android y Python. **MediaPipe Model Maker** permite personalizarlos | Detección de cuerpo (RA2.d/e) |
| **Vosk** (Alpha Cephei) | Reconocimiento de voz sin conexión, con modelos para castellano, *bindings* Java y Python | Voz en el gestor de taller (RA2.c) |
| **Web Speech API** | Reconocimiento de voz del navegador. En algunos navegadores el audio se procesa en servidores externos | Alternativa |
| **Whisper / whisper.cpp** | Transcripción general de alta calidad, sin conexión, más pesada | Ampliación |
| **TensorFlow.js / ONNX Runtime** | Ejecutar modelos propios | Contexto |
| Servicios en la nube (Azure AI, Google Cloud) | API de voz y visión de pago por uso | Contexto (coste y privacidad) |

### 3. Modelo propio con Teachable Machine (RA2.a, b)

1. En [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/), proyecto de **imagen** (o de pose): crear clases, por ejemplo «Llave inglesa», «Destornillador» y «Nada», que es la clase de fondo, siempre necesaria.
2. Capturar 50–100 ejemplos por clase con variedad de fondo, luz y ángulo.
3. Entrenar y probar en vivo. Si una clase falla, añadir ejemplos de esa situación concreta.
4. Exportar a **TensorFlow.js** (descarga: `model.json`, `metadata.json` y `weights.bin`) y servir los ficheros desde el proyecto.

Uso desde una página. Las URL exactas de las librerías las da el propio fragmento de exportación de Teachable Machine:

```js
// tmImage lo proporciona la librería @teachablemachine/image
const RUTA = "./modelo/";
const modelo = await tmImage.load(RUTA + "model.json", RUTA + "metadata.json");
const webcam = new tmImage.Webcam(224, 224, true);   // ancho, alto, espejo
await webcam.setup();                                 // pide permiso de cámara
await webcam.play();
document.querySelector("#camara").appendChild(webcam.canvas);

async function bucle() {
  webcam.update();
  const predicciones = await modelo.predict(webcam.canvas);  // [{className, probability}, ...]
  const mejor = predicciones.reduce((a, b) => (a.probability > b.probability ? a : b));
  if (mejor.probability > 0.9 && mejor.className !== "Nada") {
    mostrar(`Herramienta detectada: ${mejor.className}`);
  }
  requestAnimationFrame(bucle);
}
requestAnimationFrame(bucle);
```

### 4. Reconocimiento de voz en el gestor de taller con Vosk (RA2.c)

Las órdenes de voz se dan con una **gramática cerrada**: limitar el vocabulario a las órdenes válidas mejora mucho la precisión y evita falsos positivos.

```xml
<dependency>
  <groupId>com.alphacephei</groupId>
  <artifactId>vosk</artifactId>
  <version>0.3.45</version>
</dependency>
```

Se descarga un modelo pequeño de castellano (por ejemplo, `vosk-model-small-es-0.42`, de unos 40 MB) desde la página de modelos de Vosk y se coloca en la carpeta de datos de la aplicación.

```java
public class ServicioVoz {
    private static final String GRAMATICA =
        "[\"nuevo cliente\", \"buscar\", \"órdenes abiertas\", \"generar informe\", \"cancelar\", \"[unk]\"]";
    private final Path rutaModelo;
    private volatile boolean escuchando;

    public ServicioVoz(Path rutaModelo) { this.rutaModelo = rutaModelo; }

    /** Escucha en un hilo propio y entrega cada orden reconocida en el hilo de JavaFX. */
    public void iniciar(Consumer<String> alReconocer) {
        escuchando = true;
        Thread hilo = new Thread(() -> {
            LibVosk.setLogLevel(LogLevel.WARNINGS);
            AudioFormat formato = new AudioFormat(16000f, 16, 1, true, false); // 16 kHz, 16 bits, mono
            try (Model modelo = new Model(rutaModelo.toString());
                 Recognizer rec = new Recognizer(modelo, 16000f, GRAMATICA);
                 TargetDataLine mic = AudioSystem.getTargetDataLine(formato)) {
                mic.open(formato);
                mic.start();
                byte[] buffer = new byte[4096];
                while (escuchando) {
                    int n = mic.read(buffer, 0, buffer.length);
                    if (rec.acceptWaveForm(buffer, n)) {               // fin de frase detectado
                        String texto = extraerTexto(rec.getResult());  // {"text" : "nuevo cliente"}
                        if (!texto.isBlank() && !texto.equals("[unk]")) {
                            Platform.runLater(() -> alReconocer.accept(texto));
                        }
                    }
                }
            } catch (IOException | LineUnavailableException e) {
                Platform.runLater(() -> alReconocer.accept("#error"));
            }
        }, "voz");
        hilo.setDaemon(true);
        hilo.start();
    }

    public void detener() { escuchando = false; }

    private static String extraerTexto(String json) {
        Matcher m = Pattern.compile("\"text\"\\s*:\\s*\"([^\"]*)\"").matcher(json);
        return m.find() ? m.group(1) : "";
    }
}
```

En la vista principal:

```java
servicioVoz.iniciar(orden -> {
    lblVoz.setText("He entendido: «" + orden + "»");          // retroalimentación visible
    switch (orden) {
        case "nuevo cliente"     -> vm.nuevoCliente();
        case "buscar"            -> txtFiltro.requestFocus();
        case "órdenes abiertas"  -> navegacion.mostrarOrdenes(EstadoOrden.ABIERTA);
        case "generar informe"   -> navegacion.mostrarInformes();
        case "cancelar"          -> cerrarDialogoActivo();
        case "#error"            -> lblVoz.setText("No se puede usar el micrófono. Revisa los permisos o usa el teclado.");
        default                  -> { }
    }
});
```

Buenas prácticas: un botón o atajo (por ejemplo, Ctrl+M) para activar y desactivar la escucha, un indicador visible de «escuchando» y **nunca** borrar datos solo por voz sin confirmación.

### 5. Detección de manos y gestos con MediaPipe (RA2.e)

MediaPipe Tasks Vision en el navegador. Hay que servir la página desde `http://localhost` (o HTTPS), porque el navegador solo permite usar la cámara en contextos seguros. Por ejemplo: `npx serve .` o `python -m http.server`.

```html
<video id="video" autoplay playsinline></video>
<p id="estado" aria-live="polite">Preparando la cámara…</p>
<script type="module" src="gestos.js"></script>
```

```js
// gestos.js. Fijad la versión del paquete a la última estable comprobada.
import { FilesetResolver, GestureRecognizer } from
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm");
const reconocedor = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
    delegate: "GPU"
  },
  runningMode: "VIDEO",
  numHands: 1
});

const video = document.getElementById("video");
video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
await video.play();

let ultimoTiempo = -1, ultimoGesto = "", desde = 0;
function bucle() {
  if (video.currentTime !== ultimoTiempo) {
    ultimoTiempo = video.currentTime;
    const r = reconocedor.recognizeForVideo(video, performance.now());
    const g = r.gestures.length ? r.gestures[0][0] : null;     // {categoryName, score}
    if (g && g.score > 0.7) {
      // «Debounce»: el gesto debe mantenerse 500 ms para disparar la acción una sola vez
      if (g.categoryName !== ultimoGesto) { ultimoGesto = g.categoryName; desde = performance.now(); }
      else if (performance.now() - desde > 500) { ejecutar(g.categoryName); desde = Infinity; }
    }
  }
  requestAnimationFrame(bucle);
}
requestAnimationFrame(bucle);

function ejecutar(gesto) {
  const acciones = { Thumb_Up: "Orden aprobada", Open_Palm: "Pausa", Pointing_Up: "Siguiente orden" };
  document.getElementById("estado").textContent = acciones[gesto] ?? `Gesto ${gesto} sin acción`;
}
```

El reconocedor incluye gestos predefinidos (`Closed_Fist`, `Open_Palm`, `Pointing_Up`, `Thumb_Down`, `Thumb_Up`, `Victory`, `ILoveYou`). Con **Hand Landmarker** se obtienen los **21 puntos de la mano** y se pueden definir gestos propios por geometría. Por ejemplo, el «pellizco» es una distancia pequeña entre la punta del pulgar (punto 4) y la del índice (punto 8).

**Cara (RA2.e).** `FaceLandmarker` con `outputFaceBlendshapes: true` devuelve coeficientes como `eyeBlinkLeft` o `jawOpen` (de 0 a 1). Se pueden usar como «clic» accesible para personas con movilidad reducida: hay que mantener la expresión un tiempo mínimo para evitar disparos involuntarios.

### 6. Movimiento del cuerpo con Pose Landmarker (RA2.d)

`PoseLandmarker` devuelve **33 puntos** normalizados (x e y entre 0 y 1; y crece hacia abajo). Algunos índices: 11/12 hombros, 13/14 codos, 15/16 muñecas, 23/24 caderas, 25/26 rodillas y 27/28 tobillos.

```js
import { PoseLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const pose = await PoseLandmarker.createFromOptions(vision, {
  baseOptions: { modelAssetPath:
    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task" },
  runningMode: "VIDEO", numPoses: 1
});

function brazoDerechoLevantado(p) {        // la muñeca por encima del hombro
  return p[16].visibility > 0.5 && p[16].y < p[12].y;
}
function angulo(a, b, c) {                 // ángulo ABC en grados (por ejemplo, la rodilla)
  const r = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let g = Math.abs(r * 180 / Math.PI);
  return g > 180 ? 360 - g : g;
}

// En el bucle: const r = pose.detectForVideo(video, performance.now());
// if (r.landmarks.length && brazoDerechoLevantado(r.landmarks[0])) siguienteDiapositiva();
```

Para detectar un **movimiento**, y no solo una postura, se usa una pequeña máquina de estados: «brazo abajo» → «brazo arriba» → «brazo abajo» = un gesto completo. Esto evita repeticiones mientras se mantiene la postura.

### 7. Realidad aumentada (RA2.f)

| Tipo de RA | Seguimiento | Herramienta web |
|---|---|---|
| Con marcador | Patrón impreso (Hiro, códigos de barras) | AR.js (*marker-based*) |
| Seguimiento de imagen | Una imagen natural (un logotipo, la etiqueta de una pieza) | AR.js NFT, MindAR |
| Sin marcador (superficies) | Detección de planos | WebXR (*immersive-ar*, en móviles compatibles), ARCore/ARKit |
| Por ubicación | GPS y brújula | AR.js *location-based* |

Escena mínima con A-Frame + AR.js. Al enfocar el marcador impreso en la orden de reparación aparece el estado de la orden y un modelo 3D de la pieza:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <!-- Comprobad en la documentación de AR.js qué versión de A-Frame es compatible -->
  <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.4.5/aframe/build/aframe-ar.js"></script>
</head>
<body style="margin:0; overflow:hidden">
  <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false" vr-mode-ui="enabled: false">
    <a-marker preset="hiro">
      <a-box position="0 0.5 0" depth="0.6" width="1" height="0.4" color="#0b5cad"></a-box>
      <a-text id="rotulo" value="Orden 2026/031 · En curso" align="center"
              position="0 1.2 0" color="#ffffff" width="3"></a-text>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
  <script>
    // Datos de la orden: en la ampliación se piden al gestor de taller por HTTP local (ver el apartado 8)
    document.querySelector("#rotulo").setAttribute("value", "Orden 2026/031 · En curso");
  </script>
</body>
</html>
```

El modelo 3D se puede sustituir por un `gltf-model` (formato glTF) de la pieza. Conviene probar en el móvil del alumnado, porque es el escenario profesional típico: el técnico enfoca la máquina con la tableta.

### 8. Ampliación: puente entre la página web y el gestor de taller

Para que los gestos controlen la aplicación JavaFX, el gestor de taller abre un **servidor HTTP local**, solo en `127.0.0.1`, con el `HttpServer` del JDK:

```java
HttpServer srv = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), 8765), 0);
srv.createContext("/orden", ex -> {
    String accion = Optional.ofNullable(ex.getRequestURI().getQuery()).orElse("");
    ex.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:3000"); // solo la página propia
    Platform.runLater(() -> ejecutarAccion(accion));      // por ejemplo, accion=siguiente
    ex.sendResponseHeaders(204, -1);
    ex.close();
});
srv.start();
```

La página llama a `fetch("http://127.0.0.1:8765/orden?accion=siguiente", { method: "POST" })`. Seguridad: el servidor escucha solo en *loopback*, admite un único origen y solo acepta una lista cerrada de acciones. Esto se revisa en las pruebas de seguridad de la UD09.

> **Alternativa.** En Python: `mediapipe` + OpenCV para gestos y pose, y `vosk` o `faster-whisper` para la voz. En Android (PMDM): ML Kit, MediaPipe para Android y ARCore. En Unity: AR Foundation o Vuforia. Los CE son los mismos.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Mapa de herramientas.** Por parejas, ficha comparativa de Teachable Machine, MediaPipe, Vosk, Web Speech API, Whisper y un servicio en la nube: qué hace, dónde se ejecuta, licencia, coste y privacidad.
- **A2. Entrenar, romper y mejorar.** Entrenar un modelo con pocos ejemplos, provocar fallos (otro fondo, otra luz), analizar la confusión entre clases y mejorarlo con datos más variados.
- **A3. Gramática de voz.** Medir la tasa de acierto de 10 órdenes con y sin gramática cerrada, en el aula con ruido. Sacar conclusiones.
- **A4. Gesto propio por geometría.** Implementar el «pellizco» con Hand Landmarker y dibujar los puntos sobre un `canvas`.
- **A5. Contador de sentadillas.** Máquina de estados con el ángulo de la rodilla (Pose Landmarker), con retroalimentación accesible (texto, sonido y contraste).
- **A6. Primera RA.** Imprimir el marcador Hiro y mostrar un objeto 3D. Probar en el móvil a través de la red local con HTTPS o con un túnel.

### Práctica evaluable

**P6 · el gestor de taller manos libres (hito H6, `v0.6`).** Se compone de tres partes:

1. **Voz en el gestor de taller (Java, Vosk).** Al menos 5 órdenes con gramática cerrada, indicador de escucha, retroalimentación visible y activación con atajo. Ninguna acción destructiva sin confirmación (HU15).
2. **Prototipo web «Mostrador sin contacto».**
   - (a) Modelo propio de Teachable Machine que reconozca al menos 3 clases útiles para el taller.
   - (b) Navegación por la lista de órdenes del día con gestos de mano.
   - (c) Una acción disparada por un movimiento corporal.
3. **RA:** escena con marcador que muestre información de una orden real (los datos pueden estar en un JSON exportado por el gestor de taller).

Ampliación opcional: el puente HTTP local entre la página y el gestor de taller.

Documento `docs/nui.md`: herramientas elegidas y alternativas, datos de entrenamiento (sin imágenes de personas identificables), umbrales usados, medidas de privacidad y limitaciones conocidas.

**Conexión con el mundo real:** en un taller, un almacén o un entorno sanitario, quien trabaja suele tener las manos ocupadas o sucias. La voz y los gestos reducen el contacto con el equipo. La RA se usa en mantenimiento industrial para superponer instrucciones sobre la máquina. Cualquier proyecto que trate imagen o voz debe cumplir el RGPD desde el diseño.

Entregables: etiqueta `v0.6`, carpeta `web-nui/` con la página y el modelo, un vídeo de 3 minutos en el que se vea cada parte funcionando y `docs/nui.md`. Defensa presencial con demostración en directo.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.a | Compara herramientas con criterios técnicos, de privacidad y de coste, y justifica la elección | Identifica las herramientas, con una justificación superficial | No identifica herramientas |
| RA2.b | Modelo propio bien entrenado (clase de fondo, datos variados, umbral) e integrado con retroalimentación | Modelo funcional con fallos frecuentes | Sin modelo propio |
| RA2.c | 5 o más órdenes fiables, gramática cerrada, indicador de escucha, confirmaciones y alternativa por teclado | Órdenes funcionales con alguna carencia de retroalimentación | Sin voz o no funciona |
| RA2.d | Movimiento (no solo postura) detectado con máquina de estados y sin disparos repetidos | Detecta una postura estática | Sin detección corporal |
| RA2.e | Gestos de mano (predefinidos o propios) con *debounce* y acciones coherentes; uso de la cara como ampliación | Gestos con disparos accidentales | Sin detección de partes del cuerpo |
| RA2.f | Escena de RA estable y con datos del gestor de taller, probada en el móvil | RA con contenido estático | Sin RA |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [MediaPipe Tasks: guías para web (gesture recognizer, hand, pose y face landmarker)](https://ai.google.dev/edge/mediapipe/solutions/guide)
  - [Teachable Machine](https://teachablemachine.withgoogle.com/)
  - [Vosk: documentación y modelos](https://alphacephei.com/vosk/) · [repositorio vosk-api (ejemplo Java)](https://github.com/alphacep/vosk-api)
  - [Web Speech API (MDN)](https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API)
  - [AR.js Docs](https://ar-js-org.github.io/AR.js-Docs/) · [A-Frame](https://aframe.io/docs/) · [WebXR Device API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
  - [RGPD, Reglamento (UE) 2016/679](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679) · [AEPD](https://www.aepd.es/)
- **Herramientas:** navegador Chrome/Edge, servidor local (`npx serve` o `python -m http.server`), webcam, micrófono, marcador Hiro impreso.
