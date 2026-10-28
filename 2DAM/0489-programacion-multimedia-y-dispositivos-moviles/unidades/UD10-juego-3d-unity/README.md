# UD10 · Desarrollo de un juego 3D con Unity 6

> **Bloque MP0489_22 · Programación multimedia y de juegos.**
> Decisiones relacionadas: [DEC-PMDM-07](../../decisiones/DEC-PMDM-07-motor-3d.md), [DEC-PMDM-08](../../decisiones/DEC-PMDM-08-distribucion.md).

| Duración orientativa | RA trabajados |
|---|---|
| 33 h (+ 3 h de defensa final) | RA5 (CE a-j) · RA2.d (refuerzo: acelerómetro) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.a | Se ha establecido la lógica de un nuevo juego. | RD 405/2023, anexo I, MP0489, RA5.a | P10 (GDD + gestor de partida) |
| RA5.b | Se han creado los objetos necesarios para el juego y definido sus características. | RD 405/2023, anexo I, MP0489, RA5.b | P10 (Prefabs con componentes y campos serializados) |
| RA5.c | Se han creado las escenas del juego y distribuido los objetos en las mismas. | RD 405/2023, anexo I, MP0489, RA5.c | P10 (menú + circuito o circuitos + fin; jerarquía) |
| RA5.d | Se han creado materiales para determinar las propiedades finales de la superficie de un objeto. | RD 405/2023, anexo I, MP0489, RA5.d | P10 (materiales URP/Lit con mapas y emisión) |
| RA5.e | Se han establecido las propiedades físicas de los objetos. | RD 405/2023, anexo I, MP0489, RA5.e | P10 (Rigidbody, Physics Materials, capas, colisiones y *triggers*) |
| RA5.f | Se ha incorporado sonido a los diferentes eventos del juego. | RD 405/2023, anexo I, MP0489, RA5.f | P10 (AudioSource 2D/3D, Audio Mixer) |
| RA5.g | Se han utilizado cámaras y configurado la iluminación. | RD 405/2023, anexo I, MP0489, RA5.g | P10 (cámara de seguimiento + luces y entorno configurados) |
| RA5.h | Se han desarrollado e implantado juegos para dispositivos móviles. | RD 405/2023, anexo I, MP0489, RA5.h | P10 (acelerómetro/táctil + *build* APK/AAB firmada en un dispositivo) |
| RA5.i | Se han realizado pruebas de funcionamiento y optimización de los juegos desarrollados. | RD 405/2023, anexo I, MP0489, RA5.i | P10 (Profiler en el dispositivo + optimizaciones medidas) |
| RA5.j | Se han documentado las fases de diseño y desarrollo de los juegos creados. | RD 405/2023, anexo I, MP0489, RA5.j | P10 (GDD, documentación técnica, *postmortem*) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Organizar un proyecto 3D en Unity: escenas, jerarquía, GameObjects, componentes y Prefabs.
2. Programar el comportamiento en C# con el ciclo de vida de `MonoBehaviour` y el *Input System* (táctil y acelerómetro).
3. Crear materiales PBR, configurar físicas, audio, cámaras e iluminación.
4. Generar y desplegar una *build* para Android, y perfilarla y optimizarla en un dispositivo.
5. Documentar el diseño y el desarrollo del juego.

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

### 1. Proyecto, escenas y jerarquía (RA5.b, RA5.c)

- **Proyecto:** plantilla *Universal 3D* (URP). En *Build Profiles* se activa **Android** desde el principio, para no reimportar *assets* más adelante.
- **Escena:** fichero `.unity` con una **jerarquía** de GameObjects. Cada uno tiene un `Transform` (posición, rotación, escala), y los hijos heredan la transformación del padre.
- **Prefab:** plantilla reutilizable de un GameObject con sus componentes. Admite variantes y anidamiento. Al cambiar el Prefab, se actualizan todas sus instancias.
- **Git con Unity:**
  - `.gitignore` de Unity: excluir `Library/`, `Temp/`, `Logs/`, `UserSettings/`;
  - *Asset Serialization: Force Text*;
  - *Version Control: Visible Meta Files*;
  - Git LFS para binarios grandes.

```
Circuito1 (escena)
├─ Entorno
│  ├─ Directional Light          ← sol: sombras en tiempo real
│  ├─ Global Volume              ← postprocesado (opcional, desactivado en móvil modesto)
│  └─ Suelo, Rampas, Paredes (Prefabs con MeshCollider/BoxCollider)
├─ Bola (Prefab: MeshRenderer + SphereCollider + Rigidbody + ControlBola + AudioSource)
├─ Conchas (vacío que agrupa instancias del Prefab Concha)
├─ Meta (BoxCollider con Is Trigger)
├─ Main Camera (Camera + AudioListener + CamaraSeguimiento)
├─ GestorPartida (script singleton)
└─ Canvas (UI: tiempo, puntos, botón de pausa) + EventSystem
```

### 2. C# en Unity: ciclo de vida y entrada (RA5.a, RA5.h)

- **Orden de ejecución:** `Awake` → `OnEnable` → `Start` → [`FixedUpdate` (física, paso fijo) → `Update` (cada fotograma) → `LateUpdate` (después de `Update`: cámaras)] → `OnDisable` → `OnDestroy`.
- **Campos `[SerializeField] private`:** se editan en el Inspector sin hacerlos públicos.
- **`GetComponent<T>()`:** se guarda en `Awake`, nunca se llama dentro de `Update`.
- ***Input System*** (paquete `com.unity.inputsystem`, el predeterminado en proyectos nuevos): táctil, teclado, mando y sensores.

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody))]
public class ControlBola : MonoBehaviour
{
    [SerializeField] float fuerza = 12f;
    [SerializeField] AudioSource sonidoGolpe;

    Rigidbody rb;
    Vector3 calibracion;

    void Awake() => rb = GetComponent<Rigidbody>();

    void Start()
    {
        if (Accelerometer.current != null)
            InputSystem.EnableDevice(Accelerometer.current);   // los sensores vienen desactivados
    }

    // Botón «Calibrar» de la UI: toma la inclinación actual como reposo
    public void Calibrar()
    {
        if (Accelerometer.current != null)
            calibracion = Accelerometer.current.acceleration.ReadValue();
    }

    void FixedUpdate()
    {
        Vector2 entrada = Vector2.zero;
        if (Accelerometer.current != null && Accelerometer.current.enabled)
        {
            Vector3 a = Accelerometer.current.acceleration.ReadValue() - calibracion;
            entrada = new Vector2(a.x, a.y);            // móvil en horizontal: x = lateral, y = adelante
        }
        else if (Keyboard.current != null)               // pruebas en el editor
        {
            entrada.x = (Keyboard.current.dKey.isPressed ? 1 : 0) - (Keyboard.current.aKey.isPressed ? 1 : 0);
            entrada.y = (Keyboard.current.wKey.isPressed ? 1 : 0) - (Keyboard.current.sKey.isPressed ? 1 : 0);
        }
        rb.AddForce(new Vector3(entrada.x, 0f, entrada.y) * fuerza, ForceMode.Acceleration);
    }

    void OnCollisionEnter(Collision c)
    {
        if (c.relativeVelocity.magnitude > 3f) sonidoGolpe.Play();   // sonido ligado a un evento físico
    }
}
```

> Alternativa sin acelerómetro: un *joystick* virtual con *On-Screen Stick* del *Input System*. En el editor se puede probar con **Unity Remote 5** conectando el móvil.

**Lógica de la partida** con un gestor *singleton* sencillo:

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GestorPartida : MonoBehaviour
{
    public static GestorPartida Instancia { get; private set; }
    public event System.Action<int> PuntosCambiados;

    [SerializeField] float tiempoLimite = 90f;
    int puntos;
    float tiempo;
    bool terminada;

    void Awake()
    {
        if (Instancia != null && Instancia != this) { Destroy(gameObject); return; }
        Instancia = this;
    }

    void Update()
    {
        if (terminada) return;
        tiempo += Time.deltaTime;
        if (tiempo >= tiempoLimite) Terminar(victoria: false);
    }

    public void SumarPuntos(int n) { puntos += n; PuntosCambiados?.Invoke(puntos); }

    public void Terminar(bool victoria)
    {
        terminada = true;
        int record = PlayerPrefs.GetInt("record", 0);
        if (victoria && puntos > record) { PlayerPrefs.SetInt("record", puntos); PlayerPrefs.Save(); }
        SceneManager.LoadScene(victoria ? "Victoria" : "Derrota");
    }
}
```

Las escenas se añaden a la lista de escenas del *Build Profile* para poder cargarlas por nombre.

### 3. Materiales y texturas (RA5.d)

- **URP/Lit** es un material PBR (*physically based rendering*). Sus propiedades principales:
  - **Base Map** (color o albedo);
  - **Metallic** y **Smoothness**;
  - **Normal Map** (relieve sin más polígonos);
  - **Occlusion**;
  - **Emission** (brillo propio, que no ilumina la escena salvo con iluminación precalculada).
- **Superficie:** *Opaque* o *Transparent*; *Alpha Clipping*.
- **Texturas:** tamaño máximo, compresión para Android (**ASTC**), *mipmaps*, *tiling* y *offset* (por ejemplo, un suelo de arena repetido).
- **Ejemplos de materiales:**
  - suelo de arena (textura con *tiling* y *normal map*);
  - bola metálica (Metallic alto, Smoothness alto);
  - conchas con emisión;
  - agua (transparente y suave).
- **Shader Graph:** se presenta como ampliación, por ejemplo con un desplazamiento de UV para simular agua.

```csharp
// Cambiar propiedades de un material URP/Lit desde código
var mat = GetComponent<Renderer>().material;          // instancia propia (no afecta a otros objetos)
mat.SetColor("_BaseColor", new Color(0.2f, 0.7f, 0.9f));
mat.SetFloat("_Metallic", 0f);
mat.SetFloat("_Smoothness", 0.85f);
mat.EnableKeyword("_EMISSION");
mat.SetColor("_EmissionColor", Color.yellow * 2f);
```

> `renderer.material` crea una copia del material, lo que rompe el *batching*. `sharedMaterial` modifica el original para todos los objetos. Hay que elegir con intención: es un punto de optimización.

### 4. Propiedades físicas (RA5.e)

| Componente o ajuste | Propiedades |
|---|---|
| `Rigidbody` | `mass`, `linearDamping`, `angularDamping`, `useGravity`, `isKinematic`, `interpolation`, `collisionDetectionMode` (*Continuous* para objetos rápidos), `constraints`. En Unity 6, `drag` y `velocity` se llaman `linearDamping` y `linearVelocity` |
| `Collider` | `BoxCollider`, `SphereCollider`, `CapsuleCollider`, `MeshCollider` (convexo si se mueve). *Is Trigger* para detectar sin chocar |
| `PhysicsMaterial` | `dynamicFriction`, `staticFriction`, `bounciness`, `frictionCombine` y `bounceCombine` |
| Proyecto | *Physics › Gravity* (por defecto −9,81 en Y), **matriz de colisiones entre capas** (*Layer Collision Matrix*), *Fixed Timestep* |

```csharp
// Zona de hielo: material físico con poca fricción
var hielo = new PhysicsMaterial("Hielo")
{
    dynamicFriction = 0.05f, staticFriction = 0.05f, bounciness = 0f,
    frictionCombine = PhysicsMaterialCombine.Minimum
};
GetComponent<Collider>().material = hielo;
```

- **Eventos:**
  - `OnCollisionEnter/Stay/Exit(Collision)` para choques físicos;
  - `OnTriggerEnter/Exit(Collider)` para zonas, coleccionables y meta.

  Para que salten, al menos uno de los dos objetos debe tener un `Rigidbody`.
- **Fuerzas:** `AddForce` con `ForceMode.Force`, `Acceleration`, `Impulse` o `VelocityChange`. Se aplican en `FixedUpdate`.

```csharp
public class Concha : MonoBehaviour
{
    [SerializeField] int puntos = 1;
    [SerializeField] AudioClip sonido;

    void Update() => transform.Rotate(0f, 90f * Time.deltaTime, 0f);   // animación sencilla

    void OnTriggerEnter(Collider other)
    {
        if (!other.CompareTag("Player")) return;
        GestorPartida.Instancia.SumarPuntos(puntos);
        AudioSource.PlayClipAtPoint(sonido, transform.position);
        gameObject.SetActive(false);
    }
}
```

### 5. Audio (RA5.f)

- **`AudioListener`:** uno por escena, normalmente en la cámara.
- **`AudioSource`:**
  - `clip`, `volume`, `pitch`, `loop`, `playOnAwake`;
  - **`spatialBlend`**: 0 = 2D (música, UI), 1 = 3D (sonido posicional);
  - `minDistance`/`maxDistance` y curva de atenuación;
  - `PlayOneShot` para superponer efectos.
- **Audio Mixer:** grupos *Music* y *SFX* con parámetros expuestos para el menú de volumen. Admite efectos (*duck* de la música cuando suena un efecto importante).
- **Importación:** *Load Type* (*Decompress On Load* para efectos cortos, *Streaming* para la música) y compresión Vorbis. Influye en la memoria en el móvil.

### 6. Cámaras e iluminación (RA5.g)

**Cámara:**

- proyección en perspectiva (*Field of View*) u ortográfica;
- planos de recorte cercano y lejano (*clipping planes*), que también influyen en el rendimiento;
- *Culling Mask* por capas.

```csharp
public class CamaraSeguimiento : MonoBehaviour
{
    [SerializeField] Transform objetivo;
    [SerializeField] Vector3 desplazamiento = new(0f, 6f, -8f);
    [SerializeField] float suavizado = 5f;

    void LateUpdate()   // después de que la bola se haya movido
    {
        Vector3 deseada = objetivo.position + desplazamiento;
        transform.position = Vector3.Lerp(transform.position, deseada, suavizado * Time.deltaTime);
        transform.LookAt(objetivo);
    }
}
```

**Alternativa profesional: Cinemachine 3** (paquete). Un `CinemachineCamera` con el comportamiento *Follow* y *Rotation Composer* sobre la bola, sin código. Permite mezclar cámaras (cámara de llegada a meta).

**Iluminación:**

- **Tipos de luz:** *Directional* (sol), *Point*, *Spot*, *Area* (solo precalculada).
- **Propiedades:** color, intensidad, alcance y sombras (*Hard*/*Soft*, resolución).
- **Modo de la luz:**
  - *Realtime*: dinámica y cara;
  - *Baked*: precalculada en *lightmaps*, barata en ejecución, solo para objetos estáticos;
  - *Mixed*: combinación de las dos.
- **Entorno** (ventana *Lighting*): *skybox*, luz ambiental, niebla. *Reflection Probes* para materiales brillantes.
- **En móvil:**
  - una luz direccional en tiempo real como máximo;
  - el resto precalculado (marcar los objetos *Static*);
  - poca distancia de sombras en el *URP Asset*.

### 7. Implantación en Android (RA5.h)

1. ***Build Profiles* › Android › Player Settings**:
   - *Company/Product Name* y *Package Name* (`es.fpdam.juego3d`);
   - *Version* y *Bundle Version Code*;
   - *Minimum API Level* y *Target API Level* (el que exija Play en el curso);
   - **Scripting Backend IL2CPP** + **ARM64** (Play exige 64 bits);
   - orientación (horizontal) e icono.
2. **Firma:** *Publishing Settings › Keystore Manager*: se crea o se selecciona el *keystore* y el alias. **No se sube al repositorio**, igual que en la UD06.
3. **Formato:** APK, o **AAB** activando *Build App Bundle (Google Play)*.
4. ***Build And Run*** con el móvil conectado por `adb`.
5. ***Development Build* + *Autoconnect Profiler***: permite perfilar en el dispositivo.
6. **Depuración:** paquete **Android Logcat** para ver los registros del móvil dentro del editor.
7. **Rendimiento en móvil:**
   - `Application.targetFrameRate = 60;`, porque en móvil el valor por defecto puede quedarse en 30;
   - evitar el sobrecalentamiento (RA1.a).

### 8. Pruebas y optimización (RA5.i)

- **Pruebas de funcionamiento** en el dispositivo:
  - inclinar en todas las direcciones y calibrar;
  - caer del circuito;
  - recoger todo y ganar;
  - agotar el tiempo;
  - pausar;
  - volver de segundo plano (`OnApplicationPause`).
- **Herramientas:**
  - **Profiler**: módulos *CPU*, *Rendering*, *Memory*, *Physics* y *Audio*, en el editor y en el dispositivo;
  - **Frame Debugger**: cómo se dibuja cada fotograma;
  - ventana **Stats**: *batches*, triángulos, *SetPass calls*.
- **Optimizaciones habituales:**
  - **SRP Batcher** (activado por defecto en URP), *static batching* (objetos *Static*) y **GPU Instancing** en los materiales repetidos;
  - texturas ASTC y tamaño máximo adecuado;
  - luz precalculada en lugar de en tiempo real, y menor distancia de sombras;
  - ajustar *render scale* y MSAA en el *URP Asset*;
  - **reutilizar objetos (*pooling*)** con `UnityEngine.Pool.ObjectPool<T>`;
  - guardar referencias, no usar `Find`/`GetComponent` en `Update` y evitar asignaciones de memoria por fotograma (menos recolección de basura).
- **Medir antes y después** en el dispositivo y documentarlo. Una optimización sin datos no cuenta.

### 9. Documentación (RA5.j)

- **GDD** con:
  - concepto;
  - mecánicas (inclinar, recoger, evitar caer);
  - controles;
  - flujo de escenas;
  - lista de *assets* con sus licencias;
  - alcance (MVP y extras).
- **Documento técnico:**
  - arquitectura de los *scripts*;
  - diagrama de la jerarquía de la escena principal;
  - configuración de físicas (capas, materiales) y de luces;
  - proceso de *build* y firma.
- ***Postmortem*** y ***changelog*** de las *releases*.

> **Alternativa en Godot 4 3D** (plan B individual por equipos con poca RAM, o si el centro elige Godot para los dos juegos):
>
> | Unity | Godot 4 |
> |---|---|
> | `Rigidbody` | `RigidBody3D` |
> | `PhysicsMaterial` | `PhysicsMaterial` (`friction`, `bounce`) |
> | URP/Lit | `StandardMaterial3D` (`albedo`, `metallic`, `roughness`, `normal`, `emission`) |
> | `AudioSource` | `AudioStreamPlayer3D` |
> | `Camera` | `Camera3D` |
> | Luces | `DirectionalLight3D` y `WorldEnvironment` |
> | Profiler | *Monitors*/Profiler |
>
> La exportación a Android es la de la UD09. La rúbrica no cambia.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Roll-a-ball guiado.** Escena con suelo, bola con `Rigidbody`, control por teclado, coleccionables y cámara de seguimiento. Es la base de la práctica.
- **A2. Taller de materiales.** Cinco materiales (arena, metal, plástico, emisivo, transparente) aplicados a esferas bajo la misma luz, para comparar el efecto de Metallic y Smoothness.
- **A3. Laboratorio de física.** Rampa con tres `PhysicsMaterial` distintos y la matriz de colisiones entre capas. Predecir y comprobar.
- **A4. Luz y sombra.** La misma escena con luz en tiempo real y con luz precalculada: comparar la calidad y los FPS en el móvil.
- **A5. Primer *build* Android.** IL2CPP + ARM64, *keystore*, *Build And Run* y Android Logcat.
- **A6. Profiler en el dispositivo.** Un *Development Build* con *Autoconnect Profiler*: localizar un pico de CPU o de recolección de basura provocado a propósito y corregirlo.
- **A7. Análisis de *Roll-a-ball*** (Unity Learn): cámara y control del jugador. Comparar sus soluciones con las propias.

### Práctica evaluable

**P10 · Juego 3D en Unity (encargo promocional).** Se hace en equipos de 2-3 personas, durante unas 24 h de aula, y se cierra con la defensa final (3 h).

> **Conexión con el mundo real:** el cliente ficticio, una asociación medioambiental, encarga un minijuego promocional para ferias de divulgación: una bola que recorre un circuito inspirado en las islas Cíes recogiendo conchas, controlada inclinando el móvil. Hay que cumplir un *briefing*, un plazo y un requisito de rendimiento en los móviles modestos del cliente. Es lo que hace un estudio pequeño con un encargo de *advergaming*.

**Requisitos:**

- **GDD** y *backlog* en el tablero antes de producir. Ciclo de *issues* con PR revisados.
- **Escenas:** menú (jugar, calibrar, volumen, récord) → al menos un circuito con su jerarquía ordenada → victoria o derrota con reinicio.
- **Objetos como Prefabs:** bola, coleccionables, obstáculos (por ejemplo, plataformas móviles o una zona de hielo) y meta, con sus características en el Inspector.
- **Materiales:** al menos cuatro, con el uso de mapas (base y normal) y emisión justificado en el documento técnico.
- **Física:** Rigidbody con masa y amortiguación ajustadas, al menos dos `PhysicsMaterial` distintos, capas con la matriz de colisiones y *triggers*.
- **Audio:** música 2D, efectos 3D en eventos (recoger, golpe, caída, victoria) y Audio Mixer con volumen en el menú.
- **Cámara** de seguimiento (con *script* o Cinemachine) e **iluminación** pensada para móvil (direccional en tiempo real + entorno, y opcionalmente luz precalculada).
- **Android:**
  - control por acelerómetro con calibración y alternativa táctil;
  - *build* firmada IL2CPP/ARM64 instalada en un dispositivo real;
  - AAB si se distribuye por Play (pruebas internas) o Firebase.
- **Pruebas y optimización:**
  - plan de pruebas en el dispositivo;
  - sesión de Profiler en el dispositivo;
  - **al menos dos optimizaciones medidas** (FPS o tiempo de CPU, *batches*, memoria).
- **Documentación:** GDD final, documento técnico, créditos y licencias de *assets*, y *postmortem*.
- **Entregables:**
  - repositorio con *release* (APK adjunto);
  - vídeo de 90 s jugando en el móvil;
  - presentación de 5 min al «cliente» (el profesorado y el resto de la clase) en la defensa final;
  - defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA5.a | Lógica completa (tiempo, puntos, victoria y derrota, pausa, récord) coherente con el GDD | Lógica jugable con lagunas | Sin bucle de juego completo |
| RA5.b | Prefabs bien diseñados, con componentes y campos serializados para ajustar sin tocar código | Objetos funcionales poco reutilizables | Objetos duplicados o sin características |
| RA5.c | Varias escenas con un flujo claro y una jerarquía ordenada (agrupación, nombres, Prefabs) | Escenas correctas con desorden menor | Una escena sin estructura |
| RA5.d | Cuatro o más materiales PBR con mapas y emisión bien usados y justificados | Materiales de color básico | Materiales por defecto |
| RA5.e | Física ajustada y justificada (masa, amortiguación, materiales físicos, capas, *triggers*) | Física funcional sin ajuste | Colisiones erróneas |
| RA5.f | Audio 2D y 3D en todos los eventos clave, con Mixer y control de volumen | Sonido en algunos eventos | Sin sonido |
| RA5.g | Cámara suave y adecuada, iluminación correcta y eficiente en móvil | Cámara e iluminación básicas | Cámara fija o mal iluminada sin criterio |
| RA5.h | Acelerómetro calibrado con alternativa táctil, *build* firmada ARM64 en un dispositivo real y distribuida | *Build* que funciona en el dispositivo con controles mejorables | No se ejecuta en móvil |
| RA5.i | Plan de pruebas en el dispositivo y dos o más optimizaciones medidas con el Profiler | Pruebas sin medición, o una optimización | Sin pruebas |
| RA5.j | GDD, documento técnico, licencias y *postmortem* completos y coherentes | Documentación parcial | Sin documentación |

## Recursos

- **Documentación oficial de Unity:**
  - [Manual de Unity 6](https://docs.unity3d.com/Manual/index.html)
  - [Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
  - [Orden de ejecución](https://docs.unity3d.com/Manual/execution-order.html)
  - [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest)
  - [URP Lit shader](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest)
  - [Rigidbody](https://docs.unity3d.com/Manual/rigidbody-physics-section.html)
  - [Physics Material](https://docs.unity3d.com/Manual/physics-material.html)
  - [Audio](https://docs.unity3d.com/Manual/Audio.html)
  - [Iluminación](https://docs.unity3d.com/Manual/LightingOverview.html)
  - [Cinemachine](https://docs.unity3d.com/Packages/com.unity.cinemachine@latest)
  - [Desarrollo para Android](https://docs.unity3d.com/Manual/android.html)
  - [Profiler](https://docs.unity3d.com/Manual/Profiler.html)
  - [Optimización para móvil](https://docs.unity3d.com/Manual/MobileOptimizationPracticalGuide.html)
- **Unity Learn:** [Roll-a-ball](https://learn.unity.com/project/roll-a-ball) · [Junior Programmer](https://learn.unity.com/pathway/junior-programmer)
- ***Assets* libres:** [Kenney](https://kenney.nl/assets) (CC0), [Poly Haven](https://polyhaven.com/) (CC0: texturas PBR y HDRI). Hay que revisar la licencia de cada recurso.
- **Herramientas:** Unity Hub + Unity 6.3 LTS (*Android Build Support*), Visual Studio / Rider / VS Code, Unity Remote 5, Android Logcat (paquete), Blender (opcional), Audacity.
