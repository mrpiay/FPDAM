# Decisiones · MP0489

> **Propuesta del docente.** Cada página de esta carpeta es un **registro de decisión docente**: recoge el contexto normativo, compara las alternativas con los [criterios de decisión](../../../plantillas/criterios-de-decision.md) C1-C8, con evidencias y fecha de consulta, y deja constancia de la decisión tomada y de sus consecuencias. El significado de ✅ ➖ ❌ está en [Cómo leer este material](../README.md#como-leer-este-material).

| DEC | Decisión | Elección | Alternativas evaluadas | Criterios determinantes |
|---|---|---|---|---|
| [DEC-PMDM-01](DEC-PMDM-01-plataforma-y-lenguaje.md) | Plataforma y lenguaje para apps móviles | Android nativo con Kotlin (+ taller de KMP/Flutter) | Flutter, Kotlin Multiplatform, React Native | C2, C5, C7 |
| [DEC-PMDM-02](DEC-PMDM-02-ui-toolkit.md) | Kit de interfaz de usuario | Jetpack Compose + Material 3 | Vistas XML | C2, C5, C8 |
| [DEC-PMDM-03](DEC-PMDM-03-persistencia.md) | Persistencia de datos | Room + DataStore | SQLite directo + `SharedPreferences`, Firestore | C2, C7, C8 |
| [DEC-PMDM-04](DEC-PMDM-04-red-y-servicios-web.md) | Red, servicios web, segundo plano y conectividad inalámbrica | Retrofit + kotlinx.serialization, Open-Meteo, corrutinas + WorkManager, `ConnectivityManager` + BLE | Ktor, `HttpURLConnection`; Wi-Fi Direct, NFC | C1, C2, C8 |
| [DEC-PMDM-05](DEC-PMDM-05-multimedia.md) | Librerías multimedia | Media3 + CameraX + `MediaRecorder` + animaciones de Compose | `MediaPlayer`/Camera2, JavaFX Media | C1, C2, C7 |
| [DEC-PMDM-06](DEC-PMDM-06-motor-2d.md) | Motor para el juego 2D | Godot 4 | Unity 2D, Defold, GameMaker | C3, C7, C8 |
| [DEC-PMDM-07](DEC-PMDM-07-motor-3d.md) | Motor para el juego 3D | Unity 6.3 LTS | Godot 4 3D, Unreal Engine 5 | C2, C5, C6, C7 |
| [DEC-PMDM-08](DEC-PMDM-08-distribucion.md) | Empaquetado y distribución | APK firmado + `adb` (mínimo); Play (prueba interna) o Firebase App Distribution | Solo APK | C1, C2 |
| [DEC-PMDM-09](DEC-PMDM-09-contenidos-anadidos.md) | Contenidos añadidos fuera de los contenidos básicos | Kotlin, Git/PR, CI, pruebas, Figma, arquitectura, GDD; IA y RA opcionales | — | Cada uno ligado a un CE |

## Fuente común

Todas las decisiones DEC-PMDM-01 a 08 se apoyan en esta fuente, además de las propias que cita cada una:

- RD 405/2023, anexo I, MP0489 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)), consultado el 2026-10-27.
