# Programación didáctica · MP0489 Programación multimedia y dispositivos móviles

> Base legal: [curriculo-boe.md](curriculo-boe.md) · Datos del módulo y convenciones (Normativo / Propuesta del docente): [ficha](README.md#como-leer-este-material).

## Resumen

> **Propuesta del docente.** Las referencias normativas de este resumen se detallan con su fuente en el apartado 1.

**Enfoque.** El módulo se organiza en torno a lo que se hace en la profesión: desarrollar apps móviles nativas con conexión, persistencia y multimedia, y juegos 2D y 3D que se instalan en un móvil real. Las **191 h** (Xunta, catálogo FP, D3IFC000200) se reparten en **10 unidades** agrupadas en los **dos bloques de la estructura gallega de referencia**, las unidades formativas del Decreto 105/2011, anexo VII:

- **MP0489_12 Programación de dispositivos móviles** (RA1-RA2): UD01-UD06, 95 h.
- **MP0489_22 Programación multimedia y de juegos** (RA3-RA5): UD07-UD10, 96 h.

Las clases se basan en proyectos, con explicación breve, código en vivo y la mayor parte de la sesión dedicada a construir.

**Tecnología.** Se usa la tecnología actual que recomienda cada fabricante:

- **Android nativo con Kotlin y Jetpack Compose (Material 3)**, siguiendo la arquitectura recomendada (ViewModel, StateFlow, flujo unidireccional), con Navigation Compose, Room, DataStore, Retrofit, corrutinas y WorkManager, CameraX y Media3.
- El desarrollo multiplataforma (Kotlin Multiplatform, Flutter, React Native) y iOS se analizan y se prueban en la UD01.
- Para juegos se usan **dos motores**: **Godot 4** (libre y ligero) para el juego 2D y **Unity 6.3 LTS** (muy extendido en la industria del videojuego) para el 3D. Así el alumnado compara en la práctica dos arquitecturas, nodos y escenas frente a GameObjects y componentes.

**Proyectos.**

1. **App «Observaciones de campo»** (P3-P7), encargada por un cliente ficticio (sección 1.3). Crece en cinco hitos: interfaz, arquitectura y persistencia, API REST por HTTPS y BLE, sensores y mapa con despliegue firmado, y por último foto, audio y vídeo.
2. **Juego 2D táctil completo en Godot** (P9).
3. **Juego 3D en Unity** controlado con el acelerómetro (P10).

Los dos juegos se exportan a Android y se prueban en un dispositivo.

**Evaluación.**

- Evaluación continua **por RA**, con estos pesos: RA1 15 %, RA2 30 %, RA3 15 %, RA4 10 %, RA5 30 %.
- Cada uno de los **42 CE** tiene al menos un instrumento (matriz en el apartado 5.4). Los instrumentos son prácticas con rúbrica por CE, defensa oral de cada entrega, una prueba práctica individual de Android y dos cuestionarios breves.
- Para aprobar hay que tener **cada RA ≥ 5**. La nota final es la media ponderada.
- Se recupera por RA, sin tener que repetir lo que ya está aprobado.

## 1. Contexto y marco normativo

### 1.1 Normativa y duración

Datos del módulo: ver la [ficha](README.md). RA, CE, contenidos básicos y orientaciones pedagógicas: transcripción literal en [curriculo-boe.md](curriculo-boe.md).

> **Propuesta del docente.** Las UD se organizan en dos bloques que reproducen las unidades formativas del Decreto 105/2011, como **estructura gallega de referencia**. El catálogo actual de la Xunta no muestra unidades formativas para MP0489. Los bloques son, por tanto, un criterio organizativo y no una exigencia normativa vigente.

> **A revisar:** cuando la Xunta publique el desarrollo curricular propio del ciclo según la LOOIFP, hay que comprobar si mantiene esas unidades formativas o sus horas, y ajustar el reparto de cada bloque.

> **Propuesta del docente.** El reparto de horas entre bloques (**95 h + 96 h**) mantiene aproximadamente la proporción del Decreto 105/2011 (47 % y 53 %). Se da algo más de peso al bloque de apps, porque en el tiempo transcurrido Android ha ganado en complejidad: permisos, segundo plano, Compose.
>
> Fuente de los porcentajes de referencia: Decreto 105/2011, anexo VII (58 h y 65 h sobre 123 h).

### 1.2 Contribución al título (RD 405/2023)

> Fuente: RD 405/2023, anexo I, MP0489, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

Según sus orientaciones pedagógicas, el módulo contribuye a los **objetivos generales** y **competencias profesionales, personales y sociales** d), e), g), h), i), j), l), m), n), ñ), s), t) y w). Las letras son las mismas en ambos casos. Los textos de la segunda columna están resumidos o parafraseados; para el literal hay que ir a la fuente. La tercera columna es **propuesta del docente**.

| Letra | Competencia / objetivo (resumen) | Cómo lo desarrolla esta programación (propuesta del docente) | UD | Fuente |
|---|---|---|---|---|
| d) | Gestionar entornos de desarrollo e instalar y configurar módulos y complementos | Android Studio, el SDK y los AVD; Godot con sus plantillas de exportación; Unity Hub con *Android Build Support* | UD01, UD08 | RD 405/2023, art. 5.d y art. 9.d (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| e) | Desarrollar aplicaciones multiplataforma con acceso a bases de datos | Room y DataStore; taller de Kotlin Multiplatform y Flutter | UD01, UD04 | RD 405/2023, art. 5.e y art. 9.e (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| g) | Integrar contenidos gráficos y componentes multimedia | Media3, CameraX, `MediaRecorder`, conversión de formatos, animaciones | UD03, UD07 | RD 405/2023, art. 5.g y art. 9.g (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| h) | Desarrollar interfaces gráficas interactivas y usables | Jetpack Compose con Material 3, diseño adaptativo y accesibilidad | UD03 | RD 405/2023, art. 5.h y art. 9.h (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| i) | Participar en el desarrollo de juegos con técnicas, motores y entornos específicos | Comparativa de Godot y Unity, juego 2D (Godot) y juego 3D (Unity) | UD08-UD10 | RD 405/2023, art. 5.i y art. 9.i (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| j) | Desarrollar aplicaciones para móviles, tabletas y otros dispositivos inteligentes | El proyecto completo «Observaciones de campo» | UD02-UD07 | RD 405/2023, art. 5.j y art. 9.j (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| l) | Crear tutoriales y manuales de usuario, instalación y configuración | `README`, manual de instalación (P6), documento de diseño de juego (P9, P10) | UD04, UD06, UD09, UD10 | RD 405/2023, art. 5.l y art. 9.l (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| m) | Empaquetar aplicaciones para su distribución | APK/AAB firmados, exportación de Godot y *build* de Unity | UD06, UD09, UD10 | RD 405/2023, art. 5.m y art. 9.m (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| n) | Desarrollar aplicaciones multiproceso y multihilo | Corrutinas, `Dispatchers`, WorkManager, servicios | UD05 | RD 405/2023, art. 5.n y art. 9.n (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| ñ) | Desarrollar aplicaciones que usan servicios en red | Retrofit sobre HTTPS, `ConnectivityManager`, BLE | UD05 | RD 405/2023, art. 5.ñ y art. 9.ñ (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| s) | Desplegar y distribuir aplicaciones verificando su comportamiento | `adb`, dispositivo real, Google Play (prueba interna), pruebas | UD06, UD10 | RD 405/2023, art. 5.s y art. 9.s (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| t) | Relación profesional y trabajo en equipo | Parejas, revisión de código entre compañeros y compañeras, defensas orales | Todas | RD 405/2023, art. 5.t y art. 9.t (nueva redacción de los arts. 5 y 9 del RD 450/2010) |
| w) | Innovación y adaptación a los cambios tecnológicos | Comparativas de tecnologías y motores, novedades de Android, declaración del uso de IA | UD01, UD08 | RD 405/2023, art. 5.w y art. 9.w (nueva redacción de los arts. 5 y 9 del RD 450/2010) |

**Relación con otros módulos de 2.º** (propuesta del docente; los módulos se toman del catálogo de la Xunta, D3IFC000200):

- Con **MP0488 Desarrollo de interfaces** se coordina que allí no se repita Compose. Se reparten la usabilidad y la distribución.
- Con **MP0490 Programación de servicios y procesos** se comparten hilos, corrutinas y *sockets*/HTTP.
- Con **MP0486 Acceso a datos** se comparten Room y SQL.
- Con **MP0492 Proyecto intermodular** el «Observaciones de campo» o uno de los juegos puede servir de punto de partida.

### 1.3 Prospectiva del sector y enfoque hacia proyectos reales

> Fuente: RD 405/2023, art. 8 (prospectiva del título en el sector), letras l) y m) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Es texto literal.
>
> l) «El consumo generalizado de dispositivos inteligentes, el auge de la inteligencia artificial (IA) y la realidad aumentada (RA) con la consiguiente demanda de soluciones específicas, implica la necesaria reorientación de los desarrolladores hacia las nuevas tendencias tecnológicas y la adaptación a técnicas y entornos de desarrollo muy especializados.»
>
> m) «De la misma forma, el consumo de aplicaciones para el entretenimiento y toda la cultura dirigida hacia el ocio electrónico, hace necesario el empleo de técnicas y entornos de desarrollo muy especializados y específicos.»

> Fuente: RD 405/2023, anexo I, MP0489, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Es texto literal.
>
> «Las actividades profesionales asociadas a esta función se aplican en el desarrollo de software multiplataforma en empresas especializadas en la elaboración de contenidos multimedia, aplicaciones interactivas y juegos.»

**Propuesta del docente.** De estos textos se deduce que los proyectos deben parecerse a **encargos reales de empresa**:

- **App incremental como encargo de un cliente ficticio verosímil:** una **asociación medioambiental** (ficticia) encarga una app para registrar observaciones de campo. Hay un *briefing* del cliente, **historias de usuario** con criterios de aceptación, **prototipo en Figma** (en coordinación con MP0488), **arquitectura recomendada por Google**, consumo de una **API REST real y pública** ([Open-Meteo](https://open-meteo.com/en/docs), sin clave, de uso no comercial) y distribución a los testers del cliente con **Google Play (prueba interna)** o **Firebase App Distribution**.
- **Juegos como una *game jam* interna:**
  - Juego 2D en una *jam* de dos semanas con tema sorpresa.
  - Juego 3D como encargo de un minijuego promocional para la misma asociación ficticia.

  Ambos tienen un **GDD** (*game design document*), un *backlog* priorizado y una ***build* para Android** como entregable.
- **Forma de trabajar como en una empresa:**
  - Repositorio Git con ramas por funcionalidad y ***pull requests*** revisados.
  - ***Issues*** enlazados a las historias de usuario y **tablero** (GitHub Projects o similar).
  - **Integración continua** con GitHub Actions: compilación, pruebas unitarias y *lint* en cada PR.
  - ***Releases*** versionadas (*tag* + APK adjunto + *changelog*).
- **IA y RA (art. 8.l):** se introducen como ampliación opcional. Por ejemplo, la clasificación de imágenes en el propio dispositivo con ML Kit para identificar la especie fotografiada, o una escena de RA en Unity con AR Foundation. Se coordina con MP0488, cuyo RA2 trata las interfaces naturales.

## 2. Decisiones tecnológicas (propuesta del docente)

> **Qué dice la norma.** El RD 405/2023 **no impone ninguna tecnología concreta**. Habla de «Tecnologías de desarrollo. Nativas y multiplataforma. Entornos de trabajo. Módulos y librerías. Lenguajes.» y de «Motores de juegos: Tipos y utilización.». Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloques «Análisis de tecnologías para aplicaciones en dispositivos móviles» y «Análisis de motores de juegos» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
>
> Por eso esta sección **no limita las tecnologías**. Propone una principal para cada bloque y deja las alternativas como opciones igual de válidas.

### 2.0 Registro de decisiones

La elección, las alternativas evaluadas y los criterios determinantes de cada decisión están en el [índice de decisiones](decisiones/README.md).

Las tablas 2.1 y 2.2 resumen la relación entre la norma y la tecnología elegida.

**Criterios de elección** que se aplican en todas las filas:

1. **Vigencia:** la tecnología es la recomendada hoy por su fabricante y no está obsoleta.
2. **Gratuidad:** se puede usar sin coste en Windows, en el aula y en casa.
3. **Demanda laboral:** la tecnología aparece en ofertas de empleo. No se dan cifras. Si se quiere un dato, hay que consultar fuentes como la [Stack Overflow Developer Survey](https://survey.stackoverflow.co/) del año en curso y citarla.
4. **Material disponible:** hay documentación oficial, codelabs o tutoriales oficiales.
5. **Uso en proyectos reales:** existe documentación oficial de casos de uso, o la tecnología está ampliamente adoptada en apps y juegos publicados. Se afirma de forma cualitativa y, cuando es posible, con un enlace oficial.

**Godot para el 2D.** Se elige por gratuidad (licencia MIT), por lo poco que pesa en los equipos del aula y por lo rápido que se aprende. A cambio, hay que preparar material propio, que se apoya en la documentación oficial y en sus *demo projects*.

### 2.1 Bloque MP0489_12: dispositivos móviles (RA1-RA2)

| Lo que pide la norma (literal) | Fuente | Tecnología principal | Alternativas igual de válidas | Criterio de elección |
|---|---|---|---|---|
| «Tecnologías de desarrollo. Nativas y multiplataforma. Entornos de trabajo. Módulos y librerías. Lenguajes.» | RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Análisis de tecnologías…» | **Android nativo: Kotlin + Android Studio** | Flutter (Dart) · Kotlin Multiplatform / Compose Multiplatform · React Native (TS) · .NET MAUI (C#) · iOS nativo (Swift, requiere macOS) | Vigencia: Google declara Android *Kotlin-first* ([developer.android.com/kotlin/first](https://developer.android.com/kotlin/first)). Gratuidad: también en Windows. Uso en proyectos reales: Google publica casos de apps en producción con Kotlin y Compose ([developer.android.com/stories](https://developer.android.com/stories)). Material: oficial. El salto desde Java (MP0485) es corto. |
| RA2.b: «…clases que modelan ventanas, menús, alertas y controles…» | RD 405/2023, anexo I, MP0489, RA2.b | **Jetpack Compose + Material 3** | Vistas XML (Android clásico) · *widgets* de Flutter · Compose Multiplatform · componentes de React Native | Vigencia: Compose es el kit de interfaz recomendado. Material: codelabs oficiales. |
| RA2.a: «…estructura de clases necesaria para la aplicación» | RD 405/2023, anexo I, MP0489, RA2.a | **Arquitectura recomendada de Android** (ViewModel, StateFlow, UDF) | MVI · Clean Architecture · Bloc/Riverpod (Flutter) | Vigencia: es la guía oficial ([developer.android.com/topic/architecture](https://developer.android.com/topic/architecture)). Uso en proyectos reales: la siguen las apps de ejemplo oficiales (Now in Android). Permite probar el código. |
| RA2.f: «…conexiones con almacenes de datos garantizando la persistencia» | RD 405/2023, anexo I, MP0489, RA2.f | **Room + DataStore** | SQLDelight (KMP) · `sqflite`/Drift (Flutter) · Firebase/Firestore · Realm | Vigencia: son las APIs de Jetpack. Gratuidad. Relación con MP0486 Acceso a datos. |
| RA2.e: «…conexiones y comunicaciones HTTP y HTTPS» | RD 405/2023, anexo I, MP0489, RA2.e | **Retrofit + kotlinx.serialization** | Ktor Client (KMP) · `http`/Dio (Flutter) · `fetch`/Axios (React Native) | Uso en proyectos reales: es una librería de código abierto de Square muy adoptada en Android. Material abundante. |
| «Tareas en segundo plano. Servicios.» | RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Desarrollo de aplicaciones…» | **Corrutinas + WorkManager** | Servicios en primer plano · `Isolate`/`workmanager` (Flutter) | Vigencia: `AsyncTask` está retirado. Relación con MP0490 Programación de servicios y procesos. |
| RA2.c: «…conexión y comunicación con dispositivos inalámbricos» | RD 405/2023, anexo I, MP0489, RA2.c | **`ConnectivityManager` + BLE** | Wi-Fi Direct · NFC · Nearby Connections · `flutter_blue_plus` | Vigencia: BLE es la tecnología de los *wearables* y las balizas. El estado de la red se puede probar en el emulador. |
| «Sensores. Posicionamiento. Localización. Mapas.» | RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Desarrollo de aplicaciones…» | **`SensorManager`, Fused Location, Maps Compose** | `LocationManager` · MapLibre/OpenStreetMap (sin clave) · `geolocator` (Flutter) | Material oficial. Si el centro prefiere evitar Google Cloud, se usa MapLibre. |
| RA2.h: «…empaquetado y desplegado… en dispositivos móviles reales» | RD 405/2023, anexo I, MP0489, RA2.h | **APK/AAB firmados, `adb`, Google Play (prueba interna)** | Firebase App Distribution · F-Droid · TestFlight (iOS) | Gratuidad: sin cuota, salvo la cuenta de Play, que es opcional. |

### 2.2 Bloque MP0489_22: multimedia y juegos (RA3-RA5)

| Lo que pide la norma (literal) | Fuente | Tecnología principal | Alternativas igual de válidas | Criterio de elección |
|---|---|---|---|---|
| «Arquitectura del API utilizado. Fuentes de datos multimedia. Clases.» | RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Utilización de librerías multimedia integradas» | **Media3 (ExoPlayer, Transformer), CameraX, `MediaRecorder`** | `MediaPlayer` (clásico) · `video_player`/`camera` (Flutter) · JavaFX Media (escritorio) | Vigencia: Media3 sustituye a ExoPlayer 2. Continúa la app del bloque 1. |
| RA3.f: «…clases para la creación y control de animaciones» | RD 405/2023, anexo I, MP0489, RA3.f | **API de animación de Compose** | `ObjectAnimator` (Vistas) · Lottie · animaciones de Flutter | Vigencia. Se integra con la interfaz del proyecto. |
| «Motores de juegos: Tipos y utilización.» y RA4.d: «…diferentes motores de juegos, sus características y funcionalidades» | RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Análisis de motores de juegos», y RA4.d | **Godot 4 y Unity 6** (análisis comparado) | Unreal Engine · Defold · GameMaker · libGDX | Para analizar «diferentes motores» se trabaja con dos de verdad. Unity tiene tutoriales oficiales en Unity Learn y Godot es libre. |
| RA5 (juego 2D): «Desarrolla juegos 2D y 3D sencillos utilizando motores de juegos.» | RD 405/2023, anexo I, MP0489, RA5 | **Godot 4 (GDScript)** | Unity 2D · Defold · GameMaker | Gratuidad (MIT), poco peso en equipos de 8 GB y aprendizaje rápido. Uso en proyectos reales: hay juegos comerciales publicados con Godot ([godotengine.org/showcase](https://godotengine.org/showcase/)). Hay que preparar material propio, apoyado en la documentación oficial. |
| RA5 (juego 3D), RA5.d «…materiales…», RA5.g «…cámaras… iluminación» | RD 405/2023, anexo I, MP0489, RA5, RA5.d, RA5.g | **Unity 6.3 LTS (C#, URP)** | Godot 4 3D · Unreal Engine 5 (exige equipos potentes) | Uso en proyectos reales: muy extendido en juegos móviles comerciales; Unity publica casos de éxito ([unity.com/case-study](https://unity.com/case-study)). Material: documentación oficial y [Unity Learn](https://learn.unity.com/). C# está cerca de Java. |
| RA5.h: «…desarrollado e implantado juegos para dispositivos móviles» | RD 405/2023, anexo I, MP0489, RA5.h | **Exportación a Android** desde Godot y desde Unity | Exportación web (HTML5) como paso intermedio · iOS (requiere macOS) | Gratuidad. Reutiliza los dispositivos y `adb` del bloque 1. |

### 2.3 Cómo se adapta el módulo si el centro usa otra tecnología

Los RA, los CE, la secuencia de UD, los proyectos y las rúbricas **no dependen de la tecnología**: cada rúbrica evalúa el CE, no la librería. Para cambiar de tecnología:

1. **Se elige la tecnología principal** de cada fila de las tablas 2.1 y 2.2 entre las alternativas. Por ejemplo, Flutter para todo el bloque 1, o Unity para los dos juegos.
2. **Se mantienen los proyectos.** El «Observaciones de campo» se puede hacer igual en Flutter, Compose Multiplatform o React Native, y los dos juegos en cualquier motor.
3. **Se sustituyen los fragmentos de código y los recursos** de cada UD. Cada UD incluye una nota **«Alternativa»** con el equivalente en las tecnologías más probables.
4. **Se revisa el reparto de horas.** Si se elige una tecnología que el alumnado no conoce, por ejemplo Dart para Flutter, la UD02 dedica sus horas de Kotlin a ese lenguaje.
5. **Se revisan los requisitos de aula.** Flutter y React Native también necesitan el Android SDK. Unreal exige equipos mucho más potentes.

> **Nota de actualidad (revisar cada curso):**
> - Google ha anunciado que **verificará la identidad de quien desarrolla** las apps que se instalen en dispositivos Android certificados, también fuera de Play. Se despliega de forma progresiva desde 2026. Hay que comprobar cómo afecta a la instalación de APK en los móviles del alumnado. Según lo anunciado, `adb` desde el entorno de desarrollo sigue permitido.
> - Hay que revisar también las condiciones de Unity Personal y de Unity Education.

## 3. Secuencia y temporalización (propuesta del docente)

> Total de horas: Xunta, catálogo FP, D3IFC000200 ([edu.xunta.gal/fp/ciclo/D3IFC000200](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). Bloques: Decreto 105/2011, anexo VII ([DOG 8/6/2011](https://www.xunta.gal/dog/Publicados/2011/20110608/AnuncioC3F1-250511-2127_es.html)). El reparto en UD y las horas de cada UD son propuesta del docente.

### 3.1 Unidades (191 h)

| Bloque | UD | Título | Horas | Sesiones de 50 min (estimación) | RA y CE principales | Instrumentos |
|---|---|---|---|---|---|---|
| **MP0489_12** Programación de dispositivos móviles (95 h) | [UD01](unidades/UD01-tecnologias-y-entorno-movil/README.md) | Tecnologías móviles y entorno de desarrollo | 10 | 12 | RA1.a-e, h | P1, C1 |
| | [UD02](unidades/UD02-kotlin-y-estructura-de-una-app/README.md) | Kotlin y estructura de una app Android | 14 | 17 | RA1.f, g · RA2.a | P2 |
| | [UD03](unidades/UD03-interfaces-con-compose/README.md) | Interfaces de usuario con Jetpack Compose | 16 | 19 | RA2.b · RA2.g | P3 (hito 1) |
| | [UD04](unidades/UD04-arquitectura-navegacion-persistencia/README.md) | Arquitectura, navegación y persistencia | 18 | 21 | RA2.a, f, i | P4 (hito 2) |
| | [UD05](unidades/UD05-conectividad-servicios-web-segundo-plano/README.md) | Conectividad, servicios web, permisos y segundo plano | 18 | 22 | RA2.c, e, j | P5 (hito 3) |
| | [UD06](unidades/UD06-sensores-localizacion-despliegue/README.md) | Sensores, localización, mapas, pruebas y despliegue | 16 | 19 | RA2.d, g, h, i | P6 (hito 4) |
| | — | Prueba práctica individual del bloque | 3 | 4 | RA2.a, b, e, f | PE |
| **MP0489_22** Programación multimedia y de juegos (96 h) | [UD07](unidades/UD07-multimedia/README.md) | Programación multimedia | 22 | 26 | RA3.a-h | P7 (hito 5), D7 |
| | [UD08](unidades/UD08-motores-de-juegos/README.md) | Análisis de motores de juegos: Godot 4 y Unity 6 | 12 | 14 | RA4.a-f | P8, C2 |
| | [UD09](unidades/UD09-juego-2d-godot/README.md) | Desarrollo de un juego 2D con Godot 4 | 26 | 31 | RA5.a-c, e, f, h, i, j | P9 |
| | [UD10](unidades/UD10-juego-3d-unity/README.md) | Desarrollo de un juego 3D con Unity 6 | 33 | 40 | RA5.a-j | P10 |
| | — | Defensa final de los juegos y cierre | 3 | 4 | RA5.h, i, j | P10 (defensa) |
| | | **Total** | **191** | **229** | | |

**Distribución por RA (horas aproximadas):** RA1 ≈ 18 h (9 %) · RA2 ≈ 77 h (40 %) · RA3 ≈ 22 h (12 %) · RA4 ≈ 12 h (6 %) · RA5 ≈ 62 h (32 %).

> Mínimo estatal: **55 h** (fuente: RD 405/2023, anexo I, MP0489, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Esta programación desarrolla las 191 h que fija la Xunta.

### 3.2 Calendario orientativo

> **Propuesta del docente (estimación).** Las horas del currículo son la unidad oficial (fuente: Xunta, catálogo FP, D3IFC000200) y se entienden de 60 min. Las sesiones se calculan con un criterio único, común a todos los módulos: **sesiones = horas × 60 / 50**, redondeado. Así, 191 h → **229 sesiones** de 50 min, que a 7 sesiones por semana son unas **33 semanas**. **Pendiente de confirmar con el centro la equivalencia hora/sesión y el calendario de 2.º, que incluye la formación en empresa.**

- **Ritmo:** 7 sesiones semanales (fuente: Xunta, catálogo FP, D3IFC000200), unas 33 semanas según la estimación anterior.
- **Primera parte del curso:** bloque MP0489_12 (UD01-UD06, unas 114 sesiones, ≈ 16-17 semanas) y la PE al cerrarlo.
- **Segunda parte:** bloque MP0489_22 (UD07-UD10, unas 115 sesiones, ≈ 16-17 semanas) y la defensa final. Las fechas exactas dependen de cuándo empiece la formación en empresa.
- **Reparto semanal recomendado:** de martes a viernes, por ejemplo 2 + 2 + 2 + 1 sesiones. Conviene agrupar las sesiones en bloques dobles, porque una sesión aislada de 50 min sirve de poco para el trabajo práctico.

## 4. Metodología (propuesta del docente)

> Las líneas de actuación del BOE que orientan esta metodología son el uso de emuladores, la persistencia y el intercambio de datos, la integración multimedia, el análisis de motores y el desarrollo y la implantación de juegos en móviles. Fuente: RD 405/2023, anexo I, MP0489, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

- **Aprendizaje basado en proyectos con tres productos:**
  - **App «Observaciones de campo» (P3-P7).** Cada práctica es un hito del mismo repositorio Git (*tag* `hito-n`), y su rúbrica evalúa los CE que añade ese hito. Funcionalidad final:
    - lista, detalle y edición de observaciones (Room) y ajustes (DataStore);
    - tiempo actual de la API Open-Meteo (HTTPS, sin clave), sincronización periódica (WorkManager), estado de la red y escaneo BLE;
    - ubicación, mapa y un sensor;
    - foto (CameraX), nota de voz (`MediaRecorder`) con reproducción (ExoPlayer), conversión de imagen a WebP y animaciones.
  - **Juego 2D en Godot (P9)**: un juego táctil completo con menú, niveles, puntuación persistente y sonido, exportado a APK.
  - **Juego 3D en Unity (P10)**: bola controlada con el acelerómetro por un circuito, con materiales, físicas, sonido, cámara e iluminación, *build* Android e informe de rendimiento con el Profiler.
- **Sesión tipo (bloque de 2-3 sesiones):**
  1. Explicación corta con código en vivo (30-40 min).
  2. Actividad guiada o codelab.
  3. Avance del proyecto con apoyo individual.
  4. Cierre con dudas y *commit*.
- **Defensa oral breve (5-10 min)** de cada entrega. El alumnado explica una parte de su código elegida por el profesorado. Si no sabe explicar su código, el instrumento queda suspenso.
- **Revisión entre compañeros y compañeras** (competencia t): antes de cada hito, cada estudiante revisa el *pull request* de otro con una lista de comprobación.
- **Flujo de trabajo de empresa (en todas las prácticas):**
  - Historias de usuario como *issues*.
  - Tablero con las columnas *Por hacer*, *En curso*, *En revisión* y *Hecho*.
  - Rama por *issue* y PR con descripción y capturas.
  - CI con GitHub Actions: `./gradlew assembleDebug testDebugUnitTest lint`.
  - *Release* en cada hito.
  - Para los juegos, la CI es opcional: exportación *headless* en Godot o GameCI en Unity, que necesita configurar la licencia como secreto.

  El profesorado hace de **cliente** en la revisión de cada hito (*sprint review*).

Ejemplo de flujo de CI para el proyecto Android (`.github/workflows/android.yml`):

```yaml
name: Android CI
on: [pull_request, push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '17' }
      - uses: gradle/actions/setup-gradle@v4
      - run: ./gradlew assembleDebug testDebugUnitTest lint
      - uses: actions/upload-artifact@v4
        with: { name: apk-debug, path: app/build/outputs/apk/debug/*.apk }
```

> Hay que revisar cada curso la versión de JDK que pide el Android Gradle Plugin (17 o superior) y las versiones de las *actions*.

- **Uso de IA generativa:** se permite como asistente, siempre que se declare en el `README` para qué se ha usado. La defensa oral garantiza que el alumnado entiende lo que entrega.

### 4.1 Trabajo en equipo con flujo de trabajo profesional

> **Propuesta del docente.** Las prácticas profesionales (Git con PR revisados, *issues*, CI y *releases*) se justifican en [DEC-PMDM-09](decisiones/DEC-PMDM-09-contenidos-anadidos.md) y en el enfoque hacia proyectos reales (apartado 1.3).

- **Equipos de 2-3 personas** para la app «Observaciones de campo» (P3-P7) y para los dos juegos (P9-P10). Cada equipo tiene un repositorio compartido.
- **Ciclo de trabajo de cada *issue*, desde el hito 1:** preparar el entorno, asignarse una *issue* del *backlog*, desarrollar en una rama propia, abrir un PR con revisión entre iguales y CI, hacer el *merge* y publicar (APK de *release* o Firebase App Distribution), y cerrar la *issue* enlazando las evidencias. En concreto:
  - *issues* con historias de usuario;
  - tablero del equipo;
  - ramas y ***pull requests* con revisión entre iguales obligatoria**, sin poder fusionar el propio PR;
  - **CI** con compilación y pruebas en cada PR;
  - ***releases*** versionadas por hito.
- **Individuales:** P1, C1, P2, P8 (análisis de motores), C2, la prueba práctica **PE** y todas las **defensas orales**.
- **La calificación de los proyectos de equipo es individual** y se basa en los CE. Se usan estas evidencias de la contribución de cada persona:
  - *issues* asignados y cerrados;
  - *commits* y PR propios;
  - revisiones hechas a otros;
  - la defensa oral sobre su parte y sobre una parte ajena.

  Si la contribución de alguien es insuficiente, su nota en los CE de ese hito baja respecto a la del equipo.

Propuesta complementaria fuera del módulo: [FP·onboard](../../fponboard/README.md)

## 5. Evaluación (propuesta del docente)

> **Normativo:** los RA y CE que se evalúan (RD 405/2023, anexo I, MP0489, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). **Propuesta del docente:** los pesos, los instrumentos, la regla de cada RA ≥ 5 y los criterios de recuperación. Hay que ajustarlos a la normativa gallega de evaluación de FP y al proyecto curricular del centro.

### 5.1 Principios

- La evaluación es **continua y por resultados de aprendizaje**. Cada CE se evalúa al menos una vez con un instrumento concreto.
- **Nota de cada RA:** media ponderada de sus instrumentos (tabla 5.3). Dentro de cada instrumento, la rúbrica puntúa cada CE por separado y la nota del instrumento para ese RA es la media de sus CE.
- **Nota del módulo:** media ponderada de los RA (tabla 5.2). **Hay que tener cada RA con nota ≥ 5.** Si algún RA queda por debajo de 5, la nota del módulo es como máximo 4.
- **Nota informativa de cada bloque:** al cerrar cada bloque se informa de la media de sus RA: MP0489_12 = (15·RA1 + 30·RA2)/45 y MP0489_22 = (15·RA3 + 10·RA4 + 30·RA5)/55.

### 5.2 Ponderación de los RA

| RA | Peso | Justificación |
|---|---|---|
| RA1 | **15 %** | 9 % de las horas y 8 CE (19 %). Es analítico, pero es la base del resto. Media de las dos proporciones: ≈ 14. |
| RA2 | **30 %** | 40 % de las horas y 10 CE (24 %). Es el núcleo del bloque de apps (competencia j). Media ≈ 32. |
| RA3 | **15 %** | 12 % de las horas y 8 CE (19 %). Media ≈ 15. |
| RA4 | **10 %** | 6 % de las horas y 6 CE (14 %). Es analítico y está muy ligado a RA5. Media ≈ 10. |
| RA5 | **30 %** | 32 % de las horas y 10 CE (24 %). Es productivo, con dos juegos completos (competencia i). Media ≈ 28. |

El criterio es la media de la proporción de horas y la proporción de CE, redondeada a múltiplos de 5. Los bloques quedan con un 45 % (MP0489_12) y un 55 % (MP0489_22), en línea con su peso en el Decreto 105/2011 (47 % y 53 %).

### 5.3 Instrumentos y peso dentro de cada RA

| Código | Instrumento | UD | RA (peso dentro del RA) |
|---|---|---|---|
| P1 | Informe técnico comparativo + taller multiplataforma + entorno, AVD y sesión `adb` | UD01 | RA1 (50 %) |
| C1 | Cuestionario: tecnologías, limitaciones, configuraciones y perfiles | UD01 | RA1 (20 %) |
| P2 | Análisis y modificación de una app existente + estados de la Activity | UD02 | RA1 (30 %) |
| P3 | Hito 1: interfaz del cuaderno (ventanas, menús, diálogos, controles) + prueba de UI | UD03 | RA2 (15 %) |
| P4 | Hito 2: arquitectura, navegación, Room, DataStore y documentación | UD04 | RA2 (20 %) |
| P5 | Hito 3: API REST por HTTPS, red/BLE, permisos y WorkManager | UD05 | RA2 (20 %) |
| P6 | Hito 4: sensor, ubicación y mapa, pruebas de interacción, APK/AAB firmado en dispositivo real y manual | UD06 | RA2 (20 %) |
| PE | Prueba práctica individual en el aula (3 h): app con lista, formulario, Room y llamada HTTP | Cierre del bloque 1 | RA2 (25 %) |
| P7 | Hito 5: módulo multimedia del cuaderno + informe técnico | UD07 | RA3 (80 %) |
| D7 | Defensa oral de P7 (APIs, estados, eventos y excepciones) | UD07 | RA3 (20 %) |
| P8 | Comparativa de Godot, Unity y otros motores + análisis y modificación de un juego existente en cada motor | UD08 | RA4 (70 %) |
| C2 | Cuestionario sobre arquitectura de juegos y motores | UD08 | RA4 (30 %) |
| P9 | Juego 2D en Godot exportado a Android + GDD | UD09 | RA5 (40 %) |
| P10 | Juego 3D en Unity + *build* Android + informe de pruebas y optimización + GDD + defensa final | UD10 | RA5 (60 %) |

### 5.4 Matriz CE × UD (cobertura del 100 %)

> Fuente de los CE (columna 1, enunciado abreviado; literal en [curriculo-boe.md](curriculo-boe.md)): RD 405/2023, anexo I, MP0489 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). La asignación a las UD es propuesta del docente.

«Se trabaja y evalúa en»: unidades donde el CE se trabaja y se evalúa. «Se refuerza en»: unidades donde se trabaja o se refuerza, sin instrumento propio.

| CE | Se trabaja y evalúa en | Se refuerza en | Instrumento |
|---|---|---|---|
| RA1.a Limitaciones de ejecución | UD01 | UD05, UD06, UD09, UD10 | P1, C1 |
| RA1.b Tecnologías de desarrollo | UD01 | UD08 | P1, C1 |
| RA1.c Entornos de trabajo | UD01 | UD02, UD03, UD04, UD05, UD06, UD07 | P1 |
| RA1.d Configuraciones de dispositivos | UD01 | UD03 | P1, C1 |
| RA1.e Perfiles dispositivo-aplicación | UD01 | UD02, UD05, UD06 | P1, C1 |
| RA1.f Estructura de apps existentes | UD02 | UD01 | P2 |
| RA1.g Modificaciones sobre apps existentes | UD02 | UD01 | P2 |
| RA1.h Emuladores | UD01 | UD02, UD03, UD04, UD05, UD06 | P1 |
| RA2.a Estructura de clases | UD04 | UD02, UD05 | P4, PE |
| RA2.b Ventanas, menús, alertas y controles | UD03 | UD04 | P3, PE |
| RA2.c Dispositivos inalámbricos | UD05 | — | P5 |
| RA2.d Sensores | UD06 | UD10 | P6 |
| RA2.e HTTP y HTTPS | UD05 | — | P5, PE |
| RA2.f Almacenes de datos y persistencia | UD04 | UD05 | P4, PE |
| RA2.g Pruebas de interacción con emuladores | UD03, UD06 | UD04 | P3, P6 |
| RA2.h Empaquetado y despliegue en dispositivo real | UD06 | UD09, UD10 | P6 |
| RA2.i Documentación del desarrollo | UD04, UD06 | — | P4, P6 |
| RA2.j Permisos | UD05 | UD06, UD07 | P5 |
| RA3.a Entornos de desarrollo multimedia | UD07 | — | P7, D7 |
| RA3.b Captura, procesamiento y almacenamiento | UD07 | — | P7 |
| RA3.c Conversión de formatos | UD07 | — | P7 |
| RA3.d Procesamiento multimedia | UD07 | — | P7 |
| RA3.e Eventos, tipos de media y excepciones | UD07 | — | P7, D7 |
| RA3.f Animaciones | UD07 | UD03, UD09 | P7 |
| RA3.g Reproducción | UD07 | — | P7 |
| RA3.h Depuración y documentación | UD07 | — | P7 |
| RA4.a Arquitectura de juego 2D y 3D | UD08 | UD09, UD10 | P8, C2 |
| RA4.b Componentes de un motor | UD08 | UD09, UD10 | P8, C2 |
| RA4.c Entornos de desarrollo de juegos | UD08 | UD09, UD10 | P8, C2 |
| RA4.d Comparativa de motores | UD08 | — | P8 |
| RA4.e Bloques funcionales de un juego existente | UD08 | — | P8 |
| RA4.f Representación lógica y espacial de una escena | UD08 | UD09, UD10 | P8, C2 |
| RA5.a Lógica del juego | UD09, UD10 | — | P9, P10 |
| RA5.b Objetos y características | UD09, UD10 | — | P9, P10 |
| RA5.c Escenas y distribución de objetos | UD09, UD10 | — | P9, P10 |
| RA5.d Materiales | UD10 | UD09 | P10 |
| RA5.e Propiedades físicas | UD09, UD10 | — | P9, P10 |
| RA5.f Sonido en eventos | UD09, UD10 | — | P9, P10 |
| RA5.g Cámaras e iluminación | UD10 | UD09 | P10 |
| RA5.h Juegos en dispositivos móviles | UD09, UD10 | — | P9, P10 |
| RA5.i Pruebas y optimización | UD09, UD10 | — | P9, P10 |
| RA5.j Documentación de diseño y desarrollo | UD09, UD10 | — | P9, P10 |

**Comprobación:** los 42 CE (8 + 10 + 8 + 6 + 10) tienen al menos una UD en la columna «Se trabaja y evalúa en» y al menos un instrumento.

### 5.5 Criterios de calificación

- Cada práctica tiene una **rúbrica por CE** con tres niveles (Excelente 10-9, Adecuado 8-5, Insuficiente < 5), que está en su UD.
- **Entrega fuera de plazo:** se acepta hasta 7 días después con una penalización del 20 %. Pasado ese plazo, se va a recuperación.
- **Plagio o código que no se sabe explicar:** el instrumento cuenta con un 0 y se va directamente a recuperación del RA.
- **Requisitos mínimos de entrega:** el proyecto compila desde una copia limpia (`./gradlew assembleDebug`, exportación de Godot o *build* de Unity sin errores) e incluye un `README.md`. Sin esto, la práctica no se corrige.

### 5.6 Recuperación

- **Durante el curso:** cada RA suspendido se recupera con una **tarea de recuperación** sobre los CE fallidos y una **prueba práctica corta**.
  - Los RA1-RA2 se recuperan en enero, al empezar el bloque 2.
  - Los RA3-RA5 se recuperan antes de la evaluación final.
  - La nota del RA recuperado es la nueva nota.
- **Ordinaria final:** prueba práctica por cada RA pendiente. Se pueden presentar de nuevo las prácticas corregidas.
- **Extraordinaria (o la convocatoria que fije el centro):** proyecto integrador reducido (app y/o juego, según los RA pendientes) y prueba práctica sobre los RA no superados. Se guardan los RA aprobados.
- **Pérdida de la evaluación continua:** se aplica lo que diga el reglamento del centro. La prueba final cubre todos los RA, con los mismos pesos.

## 6. Recursos generales (propuesta del docente)

- **Software, preinstalado en la imagen del aula:**
  - Android Studio (versión estable) con el SDK, el emulador y una imagen x86_64.
  - Godot 4.x estable con sus plantillas de exportación.
  - Unity Hub con Unity 6.3 LTS y *Android Build Support* (con OpenJDK y Android SDK & NDK Tools).
  - Git.
- **Documentación oficial:** [developer.android.com](https://developer.android.com/) · [Android Basics with Compose](https://developer.android.com/courses/android-basics-compose/course) · [Guía de arquitectura de apps](https://developer.android.com/topic/architecture) · [Documentación de Godot](https://docs.godotengine.org/es/stable/) · [Manual de Unity 6](https://docs.unity3d.com/Manual/index.html) · [Unity Learn](https://learn.unity.com/).

### 6.1 Requisitos de aula

- **RAM:** 16 GB recomendados. Con 8 GB se trabaja siguiendo la [atención a la diversidad](#7-atencion-a-la-diversidad-propuesta-del-docente). La regla básica es no abrir a la vez Android Studio con el emulador y Unity.
- **Disco:** unos 15 GB para Android Studio, el SDK y un AVD, y otros 12-15 GB para Unity 6 con *Android Build Support*. Godot ocupa menos de 200 MB más sus plantillas de exportación. Conviene que todo venga preinstalado en la imagen del aula.
- **Licencias:** Unity Personal o Unity Education, con un Unity ID por estudiante. Godot no necesita cuenta.
- **Dispositivos:** al menos un dispositivo Android físico por pareja.
- **Google Play Console:** una cuenta del centro, si se quiere practicar la prueba interna. Es opcional.

## 7. Atención a la diversidad (propuesta del docente)

- **Ritmos distintos:** cada hito tiene requisitos mínimos (CE a nivel «Adecuado») y extensiones opcionales para subir a «Excelente». Se publica la solución del hito anterior para que nadie se quede bloqueado en la cadena incremental.
- **Sin dispositivo Android físico:**
  - El centro presta dispositivos en el aula, al menos uno por pareja. Es imprescindible para RA2.h y RA5.h.
  - Los sensores, la ubicación y la batería se simulan con los **controles extendidos del emulador**.
  - Si no se puede hacer BLE, el CE RA2.c se evalúa con `ConnectivityManager` (Wi-Fi o datos), que funciona en el emulador.
  - Para los juegos, el APK se instala también en un AVD. En Unity, el acelerómetro se puede probar con **Unity Remote 5** o sustituirse por un *joystick* táctil.
  - Como último recurso para RA2.h, se acepta un dispositivo de un compañero o compañera, o *Android Device Streaming* desde Android Studio (cuota gratuita limitada).
- **Equipos con poca RAM (8 GB o menos), en el aula presencial:**
  - **Nunca se abren a la vez** Android Studio con el emulador y Unity. Cada bloque usa una sola herramienta pesada.
  - **Android:** AVD ligero (x86_64 sin Play Store, 720p, 2 GB de RAM del AVD, *Quick Boot*, aceleración WHPX). Trabajar con **`@Preview` de Compose** con el emulador cerrado, depurar en un **dispositivo físico** por USB o Wi-Fi, y limitar Gradle con `org.gradle.jvmargs=-Xmx2g`.
  - **Unity:** plantilla *Universal 3D*, *Quality* en un nivel bajo, sin postprocesado y con escenas pequeñas. Activar la plataforma Android en *Build Profiles* desde el principio para no reimportar *assets*. Cerrar el navegador mientras se trabaja.
  - **Godot** funciona sin problemas en estos equipos. Si un equipo no puede con Unity, P10 puede hacerse **en Godot 4 (renderizador *Mobile* o *Compatibility*)** con la misma rúbrica, previa autorización del profesorado.
- **Necesidades específicas de apoyo educativo:** se adaptan los tiempos, se dan enunciados por pasos y se permite la defensa por escrito cuando esté justificado. Siempre se mantienen los CE. Lo que se adapta es el acceso, no el resultado de aprendizaje.
