# UD09 · Desarrollo de un juego 2D con Godot 4

> **Bloque MP0489_22 · Programación multimedia y de juegos.**
> Decisión relacionada: [DEC-PMDM-06](../../decisiones/DEC-PMDM-06-motor-2d.md).

| Duración orientativa | RA trabajados |
|---|---|
| 26 h | RA5 (CE a, b, c, e, f, h, i, j; refuerzo de d y g) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.a | Se ha establecido la lógica de un nuevo juego. | RD 405/2023, anexo I, MP0489, RA5.a | P9 (GDD + implementación de reglas y estados) |
| RA5.b | Se han creado los objetos necesarios para el juego y definido sus características. | RD 405/2023, anexo I, MP0489, RA5.b | P9 (escenas reutilizables con propiedades exportadas) |
| RA5.c | Se han creado las escenas del juego y distribuido los objetos en las mismas. | RD 405/2023, anexo I, MP0489, RA5.c | P9 (menú, nivel o niveles, fin de partida; jerarquía) |
| RA5.d | Se han creado materiales para determinar las propiedades finales de la superficie de un objeto. | RD 405/2023, anexo I, MP0489, RA5.d | Se refuerza aquí (texturas, `CanvasItemMaterial`) y se evalúa en la UD10 (P10) |
| RA5.e | Se han establecido las propiedades físicas de los objetos. | RD 405/2023, anexo I, MP0489, RA5.e | P9 (cuerpos, capas de colisión, gravedad, fricción y rebote) |
| RA5.f | Se ha incorporado sonido a los diferentes eventos del juego. | RD 405/2023, anexo I, MP0489, RA5.f | P9 (música + efectos ligados a eventos, buses de audio) |
| RA5.g | Se han utilizado cámaras y configurado la iluminación. | RD 405/2023, anexo I, MP0489, RA5.g | Se refuerza aquí (`Camera2D`, luces 2D) y se evalúa en la UD10 (P10) |
| RA5.h | Se han desarrollado e implantado juegos para dispositivos móviles. | RD 405/2023, anexo I, MP0489, RA5.h | P9 (control táctil + APK firmado instalado en un dispositivo) |
| RA5.i | Se han realizado pruebas de funcionamiento y optimización de los juegos desarrollados. | RD 405/2023, anexo I, MP0489, RA5.i | P9 (plan de pruebas + sesión de Profiler y Monitors) |
| RA5.j | Se han documentado las fases de diseño y desarrollo de los juegos creados. | RD 405/2023, anexo I, MP0489, RA5.j | P9 (GDD, *backlog*, *postmortem*) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Diseñar un juego pequeño y documentarlo en un GDD, con sus fases de desarrollo.
2. Programar en GDScript la lógica, los objetos y la comunicación por señales.
3. Construir escenas reutilizables y organizarlas en una jerarquía clara.
4. Configurar físicas 2D, entrada táctil, audio y cámara.
5. Exportar el juego a Android, probarlo y optimizarlo en un dispositivo.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Desarrollo de juegos 2D y 3D».

- Técnicas de programación 2D/3D.
- Fases de desarrollo.
- Componentes de los objetos: materiales y texturas. Propiedades físicas (peso, gravedad, fricciones, colisiones, entre otros).
- Fuentes de audio. Propiedades.
- Cámaras e iluminación.
- Creación de escenas. Jerarquía de objetos.
- Análisis de ejecución. Optimización del código.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Fases de desarrollo y GDD (RA5.a, RA5.j)

| Fase | Producto | En esta *game jam* |
|---|---|---|
| Concepto | Idea, mecánica principal, público, plataforma | Primera sesión: el tema se anuncia por sorpresa y se hace una lluvia de ideas |
| Preproducción | **GDD**, prototipo de la mecánica, *backlog* priorizado | GDD de una o dos páginas + prototipo «feo» jugable |
| Producción | Arte, sonido, niveles, interfaz | *Sprints* cortos con *issues* y PR |
| Pruebas | Pruebas de juego (*playtesting*), errores, ajuste de dificultad | Pruebas cruzadas entre equipos |
| Lanzamiento | *Build* y publicación | APK firmado + página en itch.io (opcional) |
| Postlanzamiento | Parches, *postmortem* | *Postmortem*: qué salió bien, qué mal y qué se aprendió |

**Plantilla mínima de GDD:**

- título y lema (*pitch*) de una línea;
- mecánica principal y bucle de juego;
- controles (táctil);
- condiciones de victoria y derrota;
- objetos y sus propiedades;
- escenas y su flujo (diagrama);
- estilo visual y sonoro, con la lista de *assets* y sus **licencias** (CC0, CC-BY…);
- alcance mínimo (MVP) frente a extras.

### 2. GDScript esencial

```gdscript
extends CharacterBody2D
## Jugador de plataformas 2D. Los comentarios con ## generan documentación en el editor.

signal golpeado                                   # señal propia

@export var velocidad := 300.0                    # editable en el Inspector
@export var fuerza_salto := -520.0
var gravedad: float = ProjectSettings.get_setting("physics/2d/default_gravity")

@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var sonido_salto: AudioStreamPlayer2D = $SonidoSalto

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += gravedad * delta
    if Input.is_action_just_pressed("saltar") and is_on_floor():
        velocity.y = fuerza_salto
        sonido_salto.play()
    var dir := Input.get_axis("izquierda", "derecha")
    velocity.x = dir * velocidad
    move_and_slide()
    _animar(dir)

func _animar(dir: float) -> void:
    if not is_on_floor():
        sprite.play("saltar")
    elif dir != 0.0:
        sprite.play("correr")
        sprite.flip_h = dir < 0.0
    else:
        sprite.play("quieto")
```

- **Tipado:** con `:=` el tipo se infiere y se puede activar el aviso de variables sin tipo. Mejora el autocompletado y el rendimiento.
- **Acciones de entrada:** en *Project Settings › Input Map* se definen acciones como `saltar` o `izquierda`, en lugar de usar teclas concretas.
- **Señales:** `boton.pressed.connect(_on_pressed)` y `golpeado.emit()`. Desacoplan los objetos, de forma parecida a los eventos de C#.
- `@onready` obtiene los nodos hijos cuando el árbol ya está listo. `%Nombre` accede a nodos marcados con nombre único.

### 3. Objetos, escenas y jerarquía (RA5.b, RA5.c)

En Godot, **cada objeto del juego es una escena** (jugador, enemigo, moneda) que se **instancia** dentro de las escenas de nivel. Sus características se exponen con `@export`, de modo que cada instancia se configura desde el Inspector.

```
Nivel1 (Node2D)
├─ TileMapLayer               ← suelo y plataformas (con colisión en el TileSet)
├─ Jugador (instancia de jugador.tscn)
│  └─ Camera2D                ← la cámara hereda la posición del jugador
├─ Monedas (Node2D)           ← agrupa instancias de moneda.tscn
├─ Enemigos (Node2D)
├─ GeneradorEnemigos (Timer + script)
├─ HUD (CanvasLayer)          ← interfaz fija en pantalla
└─ Musica (AudioStreamPlayer)
```

```gdscript
# moneda.gd (Area2D): un objeto con propiedades y comportamiento propios
extends Area2D

@export var puntos := 10

func _ready() -> void:
    body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D) -> void:
    if body.is_in_group("jugador"):
        Juego.sumar_puntos(puntos)                         # autoload (singleton)
        $Sonido.play()
        hide()
        $CollisionShape2D.set_deferred("disabled", true)   # no cambiar la física en mitad del callback
        await $Sonido.finished
        queue_free()
```

```gdscript
# generador.gd: crear objetos en tiempo de ejecución
const ENEMIGO := preload("res://enemigos/enemigo.tscn")

func _on_timer_timeout() -> void:
    var e := ENEMIGO.instantiate()
    e.position = Vector2(randf_range(32.0, get_viewport_rect().size.x - 32.0), -32.0)
    $"../Enemigos".add_child(e)
```

**Estado global y persistencia** con un *Autoload*, `juego.gd`, registrado en *Project Settings › Globals*:

```gdscript
extends Node

signal puntos_cambiados(total: int)
const RUTA := "user://records.cfg"
var puntos := 0
var record := 0

func _ready() -> void:
    var cfg := ConfigFile.new()
    if cfg.load(RUTA) == OK:
        record = cfg.get_value("juego", "record", 0)

func sumar_puntos(n: int) -> void:
    puntos += n
    puntos_cambiados.emit(puntos)

func terminar_partida() -> void:
    if puntos > record:
        record = puntos
        var cfg := ConfigFile.new()
        cfg.set_value("juego", "record", record)
        cfg.save(RUTA)
    get_tree().change_scene_to_file("res://ui/fin_partida.tscn")
```

**Flujo de escenas:** `menu.tscn` → `nivel_1.tscn` → `fin_partida.tscn`, con `change_scene_to_file` o `change_scene_to_packed`.

### 4. Propiedades físicas (RA5.e)

| Nodo | Cuándo usarlo |
|---|---|
| `StaticBody2D` | Suelo y paredes, que no se mueven |
| `CharacterBody2D` | Jugador o enemigos controlados por código (`velocity` + `move_and_slide()`) |
| `RigidBody2D` | Objetos simulados: `mass`, `gravity_scale`, `physics_material_override` con `friction` y `bounce`, `linear_damp` |
| `Area2D` | Detectar solapamientos sin choque: monedas, zonas de muerte |

- **Gravedad global:** *Project Settings › Physics › 2D › Default Gravity*. Por objeto, con `gravity_scale`. Por zona, con `Area2D` y *gravity override*.
- **Capas y máscaras de colisión:**
  - la **capa** dice «quién soy» y la **máscara** dice «con quién choco»;
  - conviene nombrar las capas: 1 jugador, 2 mundo, 3 enemigos, 4 objetos recogibles;
  - es la base para que las colisiones sean correctas y eficientes.
- **Física frente a lógica:** el movimiento físico va en `_physics_process`, que tiene paso fijo, y no en `_process`.

```gdscript
# Una caja que rebota: propiedades físicas desde código (también se pueden poner en el Inspector)
func _ready() -> void:
    var mat := PhysicsMaterial.new()
    mat.friction = 0.2
    mat.bounce = 0.6
    $Caja.physics_material_override = mat
    $Caja.mass = 2.0
```

### 5. Entrada táctil y sensores (RA5.h)

```gdscript
# Arrastrar con el dedo para mover una nave horizontalmente
func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventScreenDrag:
        position.x = clampf(position.x + event.relative.x, 0.0, get_viewport_rect().size.x)
    elif event is InputEventScreenTouch and event.pressed and event.double_tap:
        disparar()
```

- **`TouchScreenButton`:** botones táctiles que disparan acciones del *Input Map*, con la opción de mostrarse solo en pantallas táctiles.
- **Acelerómetro:** `Input.get_accelerometer()` devuelve un `Vector3` en dispositivos móviles. En escritorio devuelve cero.
- **Probar en escritorio:** *Project Settings › Input Devices › Pointing › Emulate Touch From Mouse* permite probar el táctil con el ratón.

### 6. Texturas, animación y materiales 2D

- **`AnimatedSprite2D`** con un recurso `SpriteFrames` (animaciones fotograma a fotograma) y **`AnimationPlayer`** (animación de cualquier propiedad con fotogramas clave).
- **`Tween`:** animación por código, útil para efectos rápidos.
- **Texturas:** las importaciones de *pixel art* necesitan el filtro *Nearest*. Se puede usar `TextureRect`/`NinePatchRect` en la interfaz.
- **Materiales 2D (refuerzo de RA5.d):**
  - `CanvasItemMaterial` permite modos de mezcla y modo sin luz.
  - Un `ShaderMaterial` sencillo puede hacer parpadear de blanco al recibir daño.

```glsl
shader_type canvas_item;
uniform float destello : hint_range(0.0, 1.0) = 0.0;
void fragment() {
    vec4 c = texture(TEXTURE, UV);
    COLOR = vec4(mix(c.rgb, vec3(1.0), destello), c.a);
}
```

### 7. Audio (RA5.f)

- **Nodos:**
  - `AudioStreamPlayer` (sin posición: música, interfaz);
  - `AudioStreamPlayer2D` (se atenúa con la distancia y la posición);
  - `AudioStreamPlayer3D`.
- **Propiedades:** `volume_db`, `pitch_scale`, `autoplay`, `bus`, `max_polyphony`, bucle (en la importación del recurso).
- **Buses** (*Audio › Buses*): `Master`, `Musica` y `Efectos`, con volumen independiente y efectos (reverberación, limitador). En el menú de opciones, un control deslizante ajusta cada bus con `AudioServer.set_bus_volume_db(...)`.
- **Ligar sonidos a eventos:** salto, recoger, daño, victoria y derrota. Variar un poco el tono con `pitch_scale = randf_range(0.9, 1.1)` evita la repetición.
- **Formatos:** OGG Vorbis para la música, WAV para efectos cortos. Hay que respetar las licencias de los recursos de audio.

### 8. Cámara e iluminación 2D (refuerzo de RA5.g)

- **`Camera2D`:**
  - hija del jugador, con *Position Smoothing* y límites (`limit_left`…) para no mostrar fuera del nivel;
  - `zoom`;
  - `offset` para sacudir la pantalla.
- **Capas de *parallax*** para dar profundidad al fondo.
- **Luces 2D:** `PointLight2D` y `DirectionalLight2D` con `LightOccluder2D` para sombras, y `CanvasModulate` para oscurecer la escena.

```gdscript
# camara.gd: sacudida de pantalla con Tween
extends Camera2D

func sacudir(intensidad := 8.0, duracion := 0.2) -> void:
    var t := create_tween()
    for i in 4:
        t.tween_property(self, "offset",
            Vector2(randf_range(-intensidad, intensidad), randf_range(-intensidad, intensidad)), duracion / 5.0)
    t.tween_property(self, "offset", Vector2.ZERO, duracion / 5.0)
```

### 9. Exportación e implantación en Android (RA5.h)

1. **Requisitos:** plantillas de exportación y rutas del Android SDK y del JDK en *Editor Settings* (ver la UD08).
2. ***Project › Export › Add… › Android*:**
   - nombre único del paquete (`es.fpdam.juego2d`);
   - `version/code` y `version/name`;
   - orientación;
   - icono;
   - permisos (solo los necesarios; un juego sin red no necesita `INTERNET`).
3. **Firma:**
   - Para *debug*, Godot usa un *keystore* de depuración, que se configura en *Editor Settings › Export › Android*.
   - Para *release*, se indica el *keystore* propio en el *preset*, con el mismo `keytool` que en la UD06.
   - Las contraseñas no se suben al repositorio: el fichero `export_credentials.cfg` está en `.godot/`, que va al `.gitignore`.
4. **Formatos:**
   - **APK** directo.
   - **AAB** para Play. Requiere activar *Use Gradle Build* e instalar la plantilla de compilación de Android (*Project › Install Android Build Template*).
5. **Despliegue con un clic:** con el móvil conectado por `adb`, aparece el icono de Android en la barra del editor. *Debug › Deploy with Remote Debug* permite ver errores y *prints* del móvil en el editor.
6. **Renderizador:** *Mobile* para dispositivos actuales, o *Compatibility* para la mayor compatibilidad con móviles antiguos.

### 10. Pruebas y optimización (RA5.i)

- **Pruebas de funcionamiento:** lista de casos (victoria, derrota, pausa, rotación, interrupción por llamada o notificación, volver de segundo plano) en el móvil real. Hay *playtesting* cruzado entre equipos con un formulario de observaciones.
- **Herramientas del depurador:**
  - *Debugger › Profiler*: tiempo por función;
  - *Visual Profiler*: CPU y GPU por fotograma;
  - *Monitors*: FPS, tiempo de proceso y de física, objetos, nodos, *draw calls* 2D, memoria estática;
  - nodos huérfanos.
- **Optimizaciones típicas:**
  - **reutilizar objetos (*pooling*)** en vez de `instantiate()`/`queue_free()` constantes;
  - liberar lo que sale de pantalla con `VisibleOnScreenNotifier2D.screen_exited`;
  - no buscar nodos (`get_node`) dentro de `_process`, guardarlos con `@onready`;
  - capas de colisión ajustadas;
  - atlas de texturas y compresión;
  - limitar las partículas;
  - desactivar `_process` cuando no se necesita (`set_process(false)`).
- **Medir siempre antes y después:** las optimizaciones se documentan con los datos de *Monitors* tomados en el dispositivo.

> **Alternativa:** si el centro elige **Unity 2D** para este juego, los equivalentes son `Rigidbody2D`, `Collider2D` (y *Physics Material 2D*), `Animator`, `AudioSource`, `Camera` ortográfica o Cinemachine, *Input System* (táctil) y el *build* de Android de la UD10. La rúbrica no cambia.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. GDScript exprés.** Ejercicios cortos: mover un *sprite* con teclado y táctil, una señal propia, un temporizador.
- **A2. Física de laboratorio.** Rampas con `RigidBody2D` y distintos `PhysicsMaterial`. Tabla de fricción y rebote frente al comportamiento observado.
- **A3. Escenas e instancias.** Crear `moneda.tscn` y colocar veinte monedas con propiedades distintas desde el Inspector.
- **A4. Sonido con buses.** Música, efectos y un menú de volumen con `HSlider` por bus.
- **A5. Primer APK.** Exportar el prototipo, instalarlo en el móvil y depurarlo de forma remota.
- **A6. Cazar cuellos de botella.** El docente entrega un proyecto que crea mil balas por segundo sin reutilizarlas. Se mide con *Monitors*, se aplica *pooling* y se compara.

### Práctica evaluable

**P9 · *Game jam* 2D en Godot.** Se hace en equipos de 2-3 personas, durante unas dos semanas (unas 14 h de aula), con un tema que se anuncia el primer día.

> **Conexión con el mundo real:** las *game jams* son una forma habitual de prototipar en la industria y de construir portfolio. Se trabaja con el mismo ritmo que en un estudio pequeño: concepto, GDD, *backlog* en *issues*, *sprints* cortos con PR, *playtesting* y publicación de la *build*.

- **GDD** antes de la primera línea de código, y ***backlog*** priorizado (MVP y extras) en el tablero del equipo.
- **Juego jugable de principio a fin:**
  - menú → partida → fin de partida, con reinicio;
  - puntuación y récord persistente;
  - al menos tres tipos de objetos con propiedades configurables;
  - una escena de nivel bien jerarquizada.
- **Físicas:** cuerpos adecuados a cada objeto, capas y máscaras con nombre, y al menos un objeto con propiedades físicas ajustadas (masa, fricción, rebote o gravedad).
- **Audio:** música y al menos cuatro efectos ligados a eventos, con buses.
- **Controles táctiles** pensados para móvil y **APK firmado** instalado y probado en un dispositivo real.
- **Pruebas y optimización:** plan de pruebas en el dispositivo, sesión de *Monitors*/Profiler y al menos una optimización medida.
- **Documentación:** GDD actualizado, `README` (cómo jugar y cómo exportar), créditos y licencias de los *assets*, y un *postmortem*.
- **Entregables:** repositorio con *release* (APK adjunto), vídeo de 60 s jugando en el móvil, presentación de 5 min a la clase y defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA5.a | Lógica completa (estados, reglas, victoria y derrota), coherente con el GDD y sin errores que rompan la partida | Lógica jugable con lagunas menores | El juego no tiene un bucle completo |
| RA5.b | Objetos como escenas reutilizables con propiedades `@export` y comportamiento encapsulado | Objetos funcionales pero poco reutilizables | Objetos duplicados a mano o sin características definidas |
| RA5.c | Varias escenas con un flujo claro y una jerarquía lógica (grupos, CanvasLayer, cámara hija) | Escenas correctas con una jerarquía mejorable | Una sola escena desordenada |
| RA5.e | Tipos de cuerpo bien elegidos, capas y máscaras con nombre, propiedades físicas ajustadas y justificadas | Física funcional sin un ajuste fino | Colisiones erróneas o física en `_process` |
| RA5.f | Música y efectos en todos los eventos clave, buses y variación de tono | Sonido en algunos eventos | Sin sonido |
| RA5.h | Controles táctiles cómodos, APK firmado y probado en un dispositivo real, con permisos mínimos | APK funcional en el dispositivo con controles mejorables | No se ejecuta en móvil |
| RA5.i | Plan de pruebas en el dispositivo, *playtesting* y una optimización medida antes y después | Pruebas sin medición | Sin pruebas |
| RA5.j | GDD, *backlog*, `README`, licencias de *assets* y *postmortem* completos | Documentación parcial | Sin documentación |

## Recursos

- **Documentación oficial de Godot (español):**
  - [Tu primer juego 2D](https://docs.godotengine.org/es/stable/getting_started/first_2d_game/index.html)
  - [GDScript: referencia](https://docs.godotengine.org/es/stable/tutorials/scripting/gdscript/gdscript_basics.html)
  - [Señales](https://docs.godotengine.org/es/stable/getting_started/step_by_step/signals.html)
  - [Física: introducción](https://docs.godotengine.org/es/stable/tutorials/physics/physics_introduction.html)
  - [Capas y máscaras de colisión](https://docs.godotengine.org/es/stable/tutorials/physics/physics_introduction.html#collision-layers-and-masks)
  - [Audio: buses](https://docs.godotengine.org/es/stable/tutorials/audio/audio_buses.html)
  - [Entrada táctil](https://docs.godotengine.org/es/stable/tutorials/inputs/inputevent.html)
  - [Exportar para Android](https://docs.godotengine.org/es/stable/tutorials/export/exporting_for_android.html)
  - [Profiler y monitores](https://docs.godotengine.org/es/stable/tutorials/scripting/debug/the_profiler.html)
  - [Optimización](https://docs.godotengine.org/es/stable/tutorials/performance/index.html)
- **Proyectos de ejemplo:** [Godot demo projects, carpeta 2D](https://github.com/godotengine/godot-demo-projects/tree/master/2d) (MIT).
- ***Assets* libres:** [Kenney](https://kenney.nl/assets) (CC0) y [OpenGameArt](https://opengameart.org/). Hay que revisar la licencia de cada recurso.
- **Herramientas:** Godot 4, Aseprite/LibreSprite, Tiled (opcional), Audacity, jsfxr, itch.io (publicación opcional).
