# UD08 · Análisis de motores de juegos: Godot 4 y Unity 6

> **Bloque MP0489_22 · Programación multimedia y de juegos.**
> Decisiones relacionadas: [DEC-PMDM-06](../../decisiones/DEC-PMDM-06-motor-2d.md), [DEC-PMDM-07](../../decisiones/DEC-PMDM-07-motor-3d.md).

| Duración orientativa | RA trabajados |
|---|---|
| 12 h | RA4 (CE a-f) · RA1.b (refuerzo) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA4.a | Se han identificado los elementos que componen la arquitectura de un juego 2D y 3D. | RD 405/2023, anexo I, MP0489, RA4.a | P8 (apartado 1) · C2 |
| RA4.b | Se han analizado los componentes de un motor de juegos. | RD 405/2023, anexo I, MP0489, RA4.b | P8 (apartado 2) · C2 |
| RA4.c | Se han analizado entornos de desarrollo de juegos. | RD 405/2023, anexo I, MP0489, RA4.c | P8 (apartado 3: instalación y análisis de los editores) · C2 |
| RA4.d | Se han analizado diferentes motores de juegos, sus características y funcionalidades. | RD 405/2023, anexo I, MP0489, RA4.d | P8 (comparativa Godot / Unity / otros) |
| RA4.e | Se han identificado los bloques funcionales de un juego existente. | RD 405/2023, anexo I, MP0489, RA4.e | P8 (análisis de un juego en cada motor) |
| RA4.f | Se ha reconocido la representación lógica y espacial de una escena gráfica sobre un juego existente. | RD 405/2023, anexo I, MP0489, RA4.f | P8 (árbol de la escena + esquema espacial) · C2 |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Describir la arquitectura de un juego (bucle de juego, escenas, entidades, subsistemas) y las diferencias entre 2D y 3D.
2. Identificar los componentes de un motor y las librerías en que se apoyan.
3. Clasificar los motores y entornos por tipo, especialización, lenguaje y licencia.
4. Comparar en profundidad Godot 4 y Unity 6 a partir de la experiencia práctica con ambos.
5. Analizar un juego existente: bloques funcionales, jerarquía lógica de la escena y representación espacial. Introducir una modificación en él.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Análisis de motores de juegos».

- Animación 2D y 3D.
- Arquitectura del juego. Componentes.
- Motores de juegos: Tipos y utilización.
- Áreas de especialización, librerías utilizadas y lenguajes de programación.
- Componentes de un motor de juegos.
- Librerías que proporcionan las funciones básicas de un Motor 2D/3D. Clases.
- Estudio de juegos existentes.
- Aplicación de modificaciones sobre juegos existentes.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Arquitectura de un juego (RA4.a)

**El bucle de juego** se repite en cada fotograma:

```
while (jugando) {
    leerEntrada()            // táctil, teclado, acelerómetro
    actualizar(delta)        // lógica, IA, animaciones (paso variable)
    física(pasoFijo)         // simulación con paso de tiempo fijo, p. ej. 60 Hz
    renderizar()             // dibujar la escena desde la cámara
    reproducirAudio()
}
```

- **`delta`:** tiempo transcurrido desde el fotograma anterior. Multiplicar la velocidad por `delta` hace que el movimiento no dependa de los FPS.
- **Paso fijo para la física:** hace que la simulación sea estable y reproducible.

**Elementos de un juego:**

| Elemento | 2D | 3D |
|---|---|---|
| Representación visual | *Sprites*, *spritesheets*, *tilemaps*, *parallax* | Mallas (*meshes*), materiales y texturas, *shaders* |
| Espacio | Coordenadas x, y + orden de dibujo (*z-index*) | x, y, z + transformaciones (posición, rotación, escala) |
| Cámara | Ortográfica, sigue al jugador, límites | Perspectiva u ortográfica, tercera o primera persona |
| Luz | Opcional (luces 2D) | Direccional, puntual, foco, ambiental, sombras |
| Física | Cuerpos y colisionadores 2D | Cuerpos y colisionadores 3D, materiales físicos |
| Animación | Fotograma a fotograma, interpolación (*tweening*), esqueletal 2D | Fotogramas clave, esqueletal (*rig*), *blend trees*, cinemática inversa |
| Otros | Interfaz (HUD, menús), audio, estado (puntuación, vidas), persistencia, gestión de escenas o niveles | Lo mismo |

**Patrones habituales:**

- máquina de estados (menú → jugando → pausa → fin);
- grafo de escena o jerarquía de objetos;
- composición de componentes;
- eventos y señales;
- *object pooling* (reutilizar objetos en vez de crearlos y destruirlos).

### 2. Componentes de un motor y librerías (RA4.b)

| Componente | Función | Librerías o tecnologías de base (ejemplos) |
|---|---|---|
| Renderizado | Dibujar la escena | OpenGL ES, Vulkan, Metal, Direct3D |
| Física | Colisiones, gravedad, fricción | Box2D (física 2D de Unity), PhysX (física 3D de Unity), Godot Physics, Jolt (integrado como opción para 3D en Godot 4.4+) |
| Audio | Reproducción, mezcla, audio 3D | FMOD, Wwise o sistemas propios |
| Entrada | Táctil, mando, teclado, sensores | Capas de la plataforma (SDL u otras) |
| Animación | Fotogramas clave, esqueletal, máquinas de estados | Sistemas propios (Animator/Mecanim, AnimationTree) |
| *Scripting* | Lógica del juego | C#, GDScript, C++, Lua, Blueprints |
| Gestión de recursos (*asset pipeline*) | Importar y optimizar texturas, modelos y audio | glTF, FBX, compresión de texturas ETC2/ASTC |
| Escenas | Cargar y descargar niveles y jerarquías | Propio de cada motor |
| UI | Menús y HUD | Control nodes (Godot), UI Toolkit/uGUI (Unity) |
| Red | Multijugador | Propio de cada motor o librerías externas |
| Editor y herramientas | Edición visual, depuración, *profiler*, exportación | Propio de cada motor |

En los *frameworks* sin editor (libGDX, MonoGame, raylib) el programador monta estos componentes a mano. Así se ve bien qué aporta un motor completo.

### 3. Tipos de motores, especialización y lenguajes (RA4.c, RA4.d)

| Tipo | Ejemplos | Lenguaje | Especialización |
|---|---|---|---|
| Generalista 2D/3D con editor | **Unity**, **Godot**, Unreal | C#, GDScript/C#, C++/Blueprints | Desde móvil hasta consola. Unreal está muy orientado a gráficos de alta gama |
| Especializado en 2D | GameMaker, Defold, Construct | GML, Lua, eventos visuales | 2D, prototipado rápido |
| *Frameworks* y librerías | libGDX, MonoGame, raylib, SDL | Java/Kotlin, C#, C/C++ | Control total, sin editor |
| Web | Phaser, Babylon.js, PlayCanvas | JavaScript/TypeScript | Juegos para el navegador |
| Propios de un estudio (*in-house*) | — | — | Grandes estudios |

**Entornos de desarrollo de juegos (RA4.c):**

- el **editor del motor** (escena, inspector, jerarquía, consola, *profiler*);
- el **IDE** de código: VS Code con la extensión de Godot, Visual Studio o Rider para Unity;
- **control de versiones** con Git LFS para los binarios grandes;
- **herramientas de recursos**: Aseprite/LibreSprite, Blender, Tiled, Audacity, generadores de efectos como jsfxr.

### 4. Comparativa en profundidad: Godot 4 frente a Unity 6 (RA4.d)

| Aspecto | Godot 4 | Unity 6.3 LTS |
|---|---|---|
| Arquitectura | **Árbol de nodos.** Cada nodo tiene un tipo con su comportamiento (`CharacterBody2D`, `Sprite2D`…). Una **escena** es un árbol reutilizable que se instancia dentro de otras (composición y herencia de escenas) | **GameObject + componentes.** El GameObject es un contenedor vacío al que se añaden componentes (`Transform`, `Rigidbody`, `MeshRenderer`, *scripts*). Los **Prefabs** permiten reutilizarlos |
| Lenguaje | GDScript (parecido a Python, integrado en el editor). Opcional: C# (.NET) y C++ con GDExtension | C# (.NET) |
| Comunicación | **Señales** (`signal`, `connect`, `emit`), grupos, `get_node` / `%NombreÚnico` | Eventos de C#, `UnityEvent`, referencias en el Inspector, `GetComponent<T>()` |
| Ciclo de vida de un *script* | `_init`, `_ready`, `_process(delta)`, `_physics_process(delta)`, `_input(event)`, `_exit_tree` | `Awake`, `OnEnable`, `Start`, `Update`, `FixedUpdate`, `LateUpdate`, `OnDisable`, `OnDestroy` |
| Coordenadas 3D | Y hacia arriba, sistema dextrógiro: el «adelante» del nodo es −Z | Y hacia arriba, sistema levógiro: el «adelante» es +Z |
| Coordenadas 2D | Y crece hacia abajo, en píxeles | Y crece hacia arriba, en unidades del mundo (Unity 2D) |
| Física | Godot Physics (2D y 3D); Jolt como opción en 3D desde 4.4 | Box2D (2D) y PhysX (3D) |
| Renderizado | Forward+, Mobile y Compatibility (OpenGL, para equipos y móviles modestos) | URP (Universal, recomendado para móvil) y HDRP (alta gama) |
| Formato de las escenas y Git | `.tscn`/`.tres` de texto legible, fáciles de revisar en un PR | YAML con ficheros `.meta` (configurar *Force Text* y un `.gitignore` adecuado) |
| Recursos y tienda | Asset Library (código abierto) | Asset Store (muy amplia, con *assets* gratuitos y de pago) |
| Licencia y coste | MIT, sin regalías ([godotengine.org/license](https://godotengine.org/license/)) | Unity Personal gratuito hasta 200 000 USD de ingresos y financiación. El *Runtime Fee* se canceló en 2024 ([unity.com/products/pricing-updates](https://unity.com/products/pricing-updates)) |
| Instalación | Un ejecutable de unos 100 MB más las plantillas de exportación | Unity Hub + editor + módulos, varios GB |
| Exportación a Android | Plantillas de exportación + Android SDK + JDK configurados en el editor. *Keystore* de depuración o de *release* | Módulo *Android Build Support* (con OpenJDK, SDK y NDK). *Build Profiles* › Android. Genera APK o AAB |
| Soporte | Rama 4.x con versiones de mantenimiento | 6.3 LTS hasta diciembre de 2027 ([unity.com/releases/unity-6](https://unity.com/releases/unity-6)) |

Equivalencias rápidas entre los dos motores:

| Godot | Unity |
|---|---|
| `Node2D`/`Node3D` | GameObject con `Transform` |
| Escena `.tscn` instanciada | Prefab |
| `CharacterBody2D` + `move_and_slide()` | `Rigidbody2D` cinemático o `CharacterController` |
| `Area2D` + señal `body_entered` | Colisionador con *Is Trigger* + `OnTriggerEnter2D` |
| `AudioStreamPlayer` | `AudioSource` |
| `AnimationPlayer`/`AnimatedSprite2D` | `Animator` + `Animation Clip` |
| Autoload (singleton) | `DontDestroyOnLoad` / ScriptableObject |

**Otros motores** que se analizan de forma teórica:

- **Unreal Engine 5:** C++/Blueprints, gráficos de alta gama y requisitos de hardware altos. Hay que consultar sus regalías en su EULA.
- **Defold:** ligero, Lua, muy orientado a móvil y web.
- **GameMaker:** 2D, GML.

### 5. Estudio de juegos existentes (RA4.e, RA4.f)

**Método de análisis:**

1. **Ejecutar y jugar:** describir la mecánica principal, las condiciones de victoria y derrota y el bucle de juego.
2. **Bloques funcionales (RA4.e):** identificar en el código o en el árbol de nodos o GameObjects estos bloques:
   - entrada;
   - control del jugador;
   - enemigos y generación (*spawn*);
   - colisiones y física;
   - puntuación y estado;
   - interfaz;
   - audio;
   - gestión de escenas.

   Para cada bloque se indica qué *scripts* y componentes lo implementan.
3. **Representación lógica (RA4.f):** dibujar el **árbol de la escena**, es decir, la jerarquía padre-hijo, y explicar por qué cada nodo está donde está (las transformaciones se heredan).
4. **Representación espacial (RA4.f):** esquema con los ejes y el origen, la posición de la cámara y lo que ve (*viewport*), las capas de dibujo o *z-index*, y las capas y máscaras de colisión.
5. **Modificación:** cambiar un parámetro de jugabilidad (velocidad, gravedad) y añadir un elemento (un objeto que da puntos, un sonido). Documentar el cambio.

**Juegos de partida:**

- **Godot:** *Dodge the Creeps*, de los [proyectos de demostración oficiales](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps) (licencia MIT). Coincide con el tutorial «Tu primer juego 2D» de la documentación.
- **Unity:** un juego 2D sencillo preparado por el docente (material propio), con una mecánica parecida a la de *Dodge the Creeps* para poder comparar. Alternativa en 3D: [Roll-a-ball](https://learn.unity.com/project/roll-a-ball), de Unity Learn.

Ejemplo de árbol lógico en Godot (*Dodge the Creeps*, simplificado):

```
Main (Node)
├─ Player (Area2D)          ← escena instanciada: AnimatedSprite2D + CollisionShape2D
├─ MobTimer / ScoreTimer / StartTimer (Timer)
├─ StartPosition (Marker2D)
├─ MobPath (Path2D)
│  └─ MobSpawnLocation (PathFollow2D)   ← punto aleatorio del borde donde aparecen los enemigos
├─ HUD (CanvasLayer)         ← la interfaz no se mueve con la cámara
└─ Music / DeathSound (AudioStreamPlayer)
```

### 6. Instalación de los entornos (RA4.c)

- **Godot 4:**
  1. Descargar la versión estable (estándar, o .NET si se quiere usar C#).
  2. En *Editor › Manage Export Templates*, descargar las plantillas.
  3. En *Editor Settings › Export › Android*, indicar la ruta del Android SDK (la del bloque 1) y del JDK.
- **Unity 6.3 LTS:**
  1. Instalar Unity Hub e iniciar sesión con un Unity ID.
  2. Instalar el editor 6.3 LTS con los módulos *Android Build Support*, *OpenJDK* y *Android SDK & NDK Tools*.
  3. Crear el proyecto con la plantilla *Universal 3D* (URP).
  4. Activar la plataforma Android en *Build Profiles*.

> **Equipos con poca RAM:** no abrir Unity y Android Studio a la vez. Cerrar el navegador durante las importaciones (ver la programación, apartado 7).

> **Alternativa:** si el centro trabaja con un solo motor, la comparativa con el segundo se hace sobre documentación y un tutorial guiado de 2 h. La rúbrica de RA4.d exige entonces al menos tres motores comparados con fuentes.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Juegos en papel.** Por grupos, descomponer un juego móvil conocido en bloques funcionales y dibujar su bucle de juego.
- **A2. Instalación guiada** de Godot y Unity, primer proyecto en cada uno y exportación vacía a Android para comprobar la cadena de herramientas.
- **A3. El mismo objeto en dos motores.** Un cuadrado que cae con gravedad y rebota en el suelo, hecho en Godot (`RigidBody2D`) y en Unity (`Rigidbody2D`). Comparar los pasos, la jerarquía y el código.
- **A4. Tutorial «Tu primer juego 2D» de Godot** (*Dodge the Creeps*), en la versión breve guiada por el docente.
- **A5. Unity Learn y Manual de Unity:** Unity Hub, editor y C# básico (enlaces en Recursos), como lectura guiada.
- **A6. Cazar el *bug*.** El docente introduce tres errores en un juego (una capa de colisión mal configurada, `delta` olvidado, nodo mal ubicado en el árbol) y el alumnado los localiza.

### Práctica evaluable

**P8 · Informe de análisis de motores y juegos existentes.** Es individual.

> **Conexión con el mundo real:** antes de empezar un proyecto, un estudio evalúa qué motor usar según la plataforma destino, el equipo, la licencia y el coste. Al incorporarse a un proyecto existente, lo primero es entender su arquitectura. Este informe simula ambas situaciones para los juegos que se harán en la *game jam* (UD09) y en el encargo 3D (UD10).

1. **Arquitectura (RA4.a):** bucle de juego y elementos de un juego 2D y uno 3D, con un diagrama.
2. **Componentes del motor (RA4.b):** tabla de componentes de Godot y de Unity con sus librerías de base.
3. **Entornos (RA4.c):** instalación documentada de los dos entornos (capturas, módulos, configuración de Android) y análisis de sus herramientas (editor, inspector, *profiler*, IDE).
4. **Comparativa (RA4.d):** Godot frente a Unity en al menos diez aspectos, más uno o dos motores adicionales. Recomendación justificada para tres tipos de proyecto. Todas las afirmaciones sobre licencias y soporte deben llevar su fuente y su fecha de consulta.
5. **Análisis de un juego en cada motor (RA4.e, RA4.f):** bloques funcionales, árbol lógico de la escena principal, esquema espacial (ejes, cámara, capas) y **una modificación** en cada uno, documentada con el antes y el después.

- **Entregables:** informe en Markdown en el repositorio personal, proyectos modificados (rama `p8`) y vídeo corto de las modificaciones.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA4.a | Identifica todos los elementos y el bucle de juego, con diferencias 2D/3D bien argumentadas | Identifica los elementos principales | Descripción genérica o incorrecta |
| RA4.b | Analiza todos los componentes y sus librerías en los dos motores | Analiza los componentes principales | No distingue los componentes del motor |
| RA4.c | Los dos entornos están instalados, configurados para Android y analizados con criterio | Instalados y descritos | No hay entorno funcional |
| RA4.d | Comparativa amplia, con fuentes fechadas y recomendaciones razonadas | Comparativa correcta pero superficial | Sin comparativa, o con datos sin fuente |
| RA4.e | Bloques funcionales completos y relacionados con *scripts* y nodos concretos | Bloques identificados parcialmente | No identifica bloques |
| RA4.f | Árbol lógico y esquema espacial correctos, explica la herencia de transformaciones. Modificaciones que funcionan | Árbol o esquema con errores menores | No reconoce la estructura de la escena |

**C2 · Cuestionario** (30 min): arquitectura, componentes, tipos de motores y lectura de un árbol de escena.

## Recursos

- **Documentación oficial:**
  - [Godot: Introducción y conceptos clave](https://docs.godotengine.org/es/stable/getting_started/introduction/key_concepts_overview.html)
  - [Godot: Escenas y nodos](https://docs.godotengine.org/es/stable/getting_started/step_by_step/nodes_and_scenes.html)
  - [Godot: Tu primer juego 2D](https://docs.godotengine.org/es/stable/getting_started/first_2d_game/index.html)
  - [Godot: Exportar para Android](https://docs.godotengine.org/es/stable/tutorials/export/exporting_for_android.html)
  - [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
  - [Orden de ejecución de eventos en Unity](https://docs.unity3d.com/Manual/execution-order.html)
  - [Unity: Android](https://docs.unity3d.com/Manual/android.html)
  - [Unity Learn](https://learn.unity.com/)
- **Proyectos de ejemplo:** [Godot demo projects](https://github.com/godotengine/godot-demo-projects) (MIT).
- **Herramientas:** Godot 4, Unity Hub + Unity 6.3 LTS, VS Code / Visual Studio / Rider, Git LFS.
