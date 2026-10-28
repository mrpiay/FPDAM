# UD01 · Tecnologías móviles y entorno de desarrollo

> **Bloque MP0489_12 · Programación de dispositivos móviles.**
> Decisiones relacionadas: [DEC-PMDM-01](../../decisiones/DEC-PMDM-01-plataforma-y-lenguaje.md), [DEC-PMDM-08](../../decisiones/DEC-PMDM-08-distribucion.md), [DEC-PMDM-09](../../decisiones/DEC-PMDM-09-contenidos-anadidos.md).

| Duración orientativa | RA trabajados |
|---|---|
| 10 h | RA1 (CE a-e, h) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.a | Se han analizado las limitaciones que plantea la ejecución de aplicaciones en los dispositivos móviles. | RD 405/2023, anexo I, MP0489, RA1.a | P1 (apartado 1 del informe) · C1 |
| RA1.b | Se han identificado las tecnologías de desarrollo de aplicaciones para dispositivos móviles. | RD 405/2023, anexo I, MP0489, RA1.b | P1 (tabla comparativa) · C1 |
| RA1.c | Se han instalado, configurado y utilizado entornos de trabajo para el desarrollo de aplicaciones para dispositivos móviles. | RD 405/2023, anexo I, MP0489, RA1.c | P1 (capturas + proyecto ejecutándose) |
| RA1.d | Se han identificado configuraciones que clasifican los dispositivos móviles en base a sus características. | RD 405/2023, anexo I, MP0489, RA1.d | P1 (clasificación de AVD) · C1 |
| RA1.e | Se han descrito perfiles que establecen la relación entre el dispositivo y la aplicación. | RD 405/2023, anexo I, MP0489, RA1.e | P1 (análisis del manifiesto y del `build.gradle.kts`) · C1 |
| RA1.h | Se han utilizado emuladores para comprobar el funcionamiento de las aplicaciones. | RD 405/2023, anexo I, MP0489, RA1.h | P1 (dos AVD + sesión `adb`) |

RA1.f y RA1.g se introducen aquí y se evalúan en la [UD02](../UD02-kotlin-y-estructura-de-una-app/README.md).

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Describir los tipos de dispositivos móviles y su hardware, y explicar cómo cada limitación (batería, memoria, red, pantalla) condiciona el diseño de una app.
2. Comparar el desarrollo nativo (Android, iOS) con el multiplataforma (Kotlin Multiplatform, Flutter, React Native…) y elegir de forma razonada para un caso concreto.
3. Instalar y configurar Android Studio, el SDK y el emulador, y crear y ejecutar un proyecto de Compose.
4. Clasificar dispositivos por configuración (*form factor*, tamaño y densidad de pantalla, nivel de API, ABI) y relacionarlos con lo que declara la app (`minSdk`, `targetSdk`, `<uses-feature>`, permisos).
5. Usar el emulador y `adb` para instalar, ejecutar, actualizar y desinstalar apps, e identificar las fases del ciclo de vida de una aplicación.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Análisis de tecnologías para aplicaciones en dispositivos móviles».

- Dispositivos móviles. Evolución. Tipos. Características.
- Hardware para dispositivos móviles: pantalla, procesador, memoria, cámara, batería, sensores, conectividad, entre otros. Limitaciones.
- Tecnologías de desarrollo. Nativas y multiplataforma. Entornos de trabajo. Módulos y librerías. Lenguajes.
- Emuladores. Configuraciones. Perfiles. Dispositivos soportados.
- Ciclo de vida de una aplicación: descubrimiento, instalación, ejecución, actualización y borrado.
- Utilización del entorno de ejecución del administrador de aplicaciones.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Dispositivos móviles: evolución, tipos y características

- **Evolución:**
  - PDA y teléfonos con Java ME (J2ME, años 2000).
  - Symbian, BlackBerry OS y Windows Mobile.
  - iPhone (2007) y Android (2008): llega la pantalla táctil capacitiva y las tiendas de aplicaciones.
  - Hoy hay dos plataformas dominantes, Android (AOSP + Google Mobile Services) e iOS/iPadOS.
- **Tipos (*form factors*):** teléfono, tableta, plegable, *wearable* (Wear OS, watchOS), TV (Android TV/Google TV), automoción (Android Auto/Automotive), XR.
- **Hardware y sus limitaciones (RA1.a):**

| Componente | Característica | Limitación y consecuencia para la app |
|---|---|---|
| Pantalla | De 4" a más de 12" y densidades de 160 a 640 dpi | Hay que diseñar de forma adaptativa, usar `dp`/`sp` y tener recursos por densidad |
| Procesador (SoC ARM) | Varios núcleos big.LITTLE y GPU integrada | Se reduce la frecuencia por calor (*thermal throttling*). Si el hilo principal se bloquea más de 5 s, salta un **ANR** (*Application Not Responding*) |
| Memoria RAM | De 2 a 16 GB, compartida con el sistema | El sistema puede **matar el proceso** en segundo plano (*low memory killer*). Hay que guardar el estado |
| Almacenamiento | Flash limitada | Cada app tiene su almacenamiento propio (*scoped storage*). Hay que vigilar el tamaño del APK |
| Batería | 3.000-5.000 mAh | Modo **Doze**, *App Standby Buckets* y límites a la ejecución en segundo plano. La GPS, la red y la pantalla son lo que más consume |
| Conectividad | 4G/5G, Wi-Fi, Bluetooth/BLE, NFC, UWB | La red es intermitente, cambia la latencia y los datos pueden costar dinero. Hay que diseñar para trabajar sin conexión |
| Sensores | Acelerómetro, giroscopio, magnetómetro, proximidad, luz, barómetro, podómetro, GNSS | Varían según el dispositivo, así que hay que comprobar si existen. Consumen batería |
| Cámara y micrófono | Varias cámaras | Requieren permisos en tiempo de ejecución y la privacidad importa |
| Entrada | Pantalla táctil, gestos, voz, teclado virtual | Áreas táctiles de al menos 48 dp. El teclado tapa parte de la pantalla |

- **Fragmentación:** hay miles de modelos, versiones de Android y capas de fabricante. Por eso se prueba en varios AVD y en dispositivos reales.

### 2. Tecnologías de desarrollo: nativas y multiplataforma (RA1.b)

| Enfoque | Tecnología | Lenguaje | IDE | Interfaz | Comentario |
|---|---|---|---|---|---|
| Nativo Android | Android SDK + Jetpack | **Kotlin** (Java) | Android Studio | Jetpack Compose (o Vistas XML) | Acceso completo a las APIs. Es la opción del módulo |
| Nativo iOS | iOS SDK | Swift (Objective-C) | Xcode (solo macOS) | SwiftUI (o UIKit) | Publicar cuesta 99 $ al año |
| Multiplataforma con lógica compartida | **Kotlin Multiplatform** | Kotlin | Android Studio / IntelliJ IDEA | Nativa en cada plataforma o **Compose Multiplatform** | Se comparte código Kotlin. Compose Multiplatform es estable en iOS |
| Multiplataforma con motor propio | **Flutter** | Dart | Android Studio / VS Code | Widgets dibujados por el motor (Impeller) | Mismo aspecto en todas las plataformas. Recarga en caliente |
| Multiplataforma con puente nativo | **React Native** | JavaScript/TypeScript | VS Code | Componentes nativos | Pensado para equipos web. Expo simplifica el arranque |
| Multiplataforma .NET | .NET MAUI | C# | Visual Studio / VS Code | Controles nativos | Sucesor de Xamarin, que ya no tiene soporte |
| Web híbrida | Ionic + Capacitor, PWA | HTML/CSS/JS | Cualquiera | WebView o navegador | Acceso limitado al hardware |
| Juegos | Godot, Unity, Unreal | GDScript/C#, C#, C++ | Su editor | Motor propio | Se ve en las UD08-UD10 |

**Criterios para elegir:** rendimiento y acceso al hardware, coste de mantener una o dos bases de código, perfil del equipo, aspecto nativo, ecosistema de librerías y tiempo de salida al mercado.

### 3. Arquitectura de la plataforma Android

```
Apps (sistema y usuario)
Java API Framework (ActivityManager, PackageManager, LocationManager…)
Librerías nativas (C/C++) | Android Runtime (ART: compilación AOT/JIT de DEX)
HAL (Hardware Abstraction Layer)
Núcleo Linux (drivers, gestión de energía, procesos)
```

- Cada app se ejecuta en **su propio proceso** con un **usuario Linux propio** (*sandbox*). El código Kotlin se compila a *bytecode* DEX, que ART ejecuta.
- **Nivel de API:** cada versión de Android tiene un número (Android 14 = API 34, Android 15 = API 35, Android 16 = API 36). Google Play exige un `targetSdk` reciente, normalmente la versión del año anterior.

### 4. Entorno de trabajo (RA1.c)

1. Instalar **Android Studio**, que incluye su propio JDK. En el asistente se instalan el SDK, *Platform-Tools* (`adb`), *Build-Tools* y el emulador.
2. En **SDK Manager** se añade la plataforma del `targetSdk` y una imagen de sistema x86_64 (o arm64 en Mac con Apple Silicon).
3. Se comprueba la **aceleración por hardware**: WHPX (Plataforma de hipervisor de Windows) en Windows, KVM en Linux.
4. Se crea un proyecto con **New Project › Empty Activity**, que ya trae la plantilla de Compose.

Estructura de un proyecto Gradle (se explica en detalle en la UD02):

```
MiApp/
├─ settings.gradle.kts           módulos incluidos
├─ build.gradle.kts              plugins comunes
├─ gradle/libs.versions.toml     catálogo de versiones
└─ app/
   ├─ build.gradle.kts           namespace, minSdk, targetSdk, dependencias
   └─ src/main/
      ├─ AndroidManifest.xml
      ├─ java/…/MainActivity.kt
      └─ res/ (values, drawable, mipmap…)
```

Configuración relevante en `app/build.gradle.kts`:

```kotlin
android {
    namespace = "es.fpdam.observaciones"
    compileSdk = 36

    defaultConfig {
        applicationId = "es.fpdam.observaciones" // identificador único en el dispositivo y en Play
        minSdk = 26          // versión mínima: por debajo, la app no se instala
        targetSdk = 36       // versión para la que se ha probado: activa los comportamientos nuevos
        versionCode = 1      // entero que tiene que subir en cada actualización
        versionName = "1.0"  // versión que ve el usuario
    }
}
```

> Los valores de `compileSdk` y `targetSdk` son orientativos. Hay que usar los que proponga la versión estable de Android Studio de cada curso.

### 5. Configuraciones y perfiles (RA1.d, RA1.e)

El BOE habla de «configuraciones» y «perfiles» (RA1.d, RA1.e) sin definirlos. **Interpretación del docente:** son términos que vienen de **Java ME**:

- Una **configuración** (CLDC o CDC) clasificaba los dispositivos según su capacidad de memoria y CPU.
- Un **perfil** (MIDP) definía las APIs que la app podía usar en esa clase de dispositivo.

En esta propuesta se trasladan así a Android:

**Configuraciones: clasifican el dispositivo según sus características.**

| Criterio | Valores en Android | Cómo lo aprovecha la app |
|---|---|---|
| *Form factor* | Teléfono, tableta, plegable, Wear OS, TV, Automotive | Módulos o variantes, *layouts* adaptativos |
| Tamaño de ventana | *Window size classes*: compacta < 600 dp, media 600-840 dp, expandida ≥ 840 dp | `currentWindowAdaptiveInfo()` en Compose |
| Densidad | mdpi (1×), hdpi (1,5×), xhdpi (2×), xxhdpi (3×), xxxhdpi (4×) | Recursos `drawable-xxhdpi`, vectores |
| Nivel de API | API 26 … API 36 | `minSdk`, comprobaciones `Build.VERSION.SDK_INT` |
| ABI | arm64-v8a, armeabi-v7a, x86_64 | Librerías nativas por ABI y *splits* del AAB |
| Idioma, orientación, modo oscuro | `es`, `land`, `night` | **Calificadores de recursos**: `values-es/`, `values-night/` |

**Perfiles: establecen la relación entre la app y el dispositivo, es decir, lo que la app exige o pide.**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Hardware: si es required="true", Play no muestra la app en dispositivos sin esa característica -->
    <uses-feature android:name="android.hardware.camera.any" android:required="false" />
    <uses-feature android:name="android.hardware.bluetooth_le" android:required="false" />
    <!-- Permisos que necesita la app -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <application …>
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

A esto se suman `minSdk`, `targetSdk`, las ABI soportadas y las pantallas soportadas. Google Play usa todo ello para filtrar en qué dispositivos se ofrece la app (**dispositivos soportados**).

### 6. Emuladores (RA1.h)

- **Device Manager › Create Virtual Device:** se elige perfil de hardware (Pixel, Tablet, Wear…), imagen del sistema (nivel de API, con o sin Google Play) y RAM.
- **Controles extendidos (`…`):** ubicación GPS y rutas, sensores virtuales (rotación, acelerómetro), batería, red (latencia, velocidad), cámara virtual, huella dactilar, grabación de pantalla.
- **Emulador frente a dispositivo físico:** el emulador permite probar muchas configuraciones a la vez. El dispositivo real mide de verdad el rendimiento y los sensores, y el Bluetooth en el emulador es limitado.
- **Depuración en dispositivo físico:**
  1. Activar *Opciones de desarrollador* (pulsar 7 veces en «Número de compilación»).
  2. Activar la depuración USB, o la depuración inalámbrica con *Pair device using Wi-Fi*.

### 7. Ciclo de vida de una aplicación y administrador de aplicaciones

Fases del BOE y cómo se hacen en Android:

| Fase | En Android | Comando o herramienta |
|---|---|---|
| Descubrimiento | Google Play u otras tiendas (F-Droid, Galaxy Store), enlaces, *sideload* | Ficha de Play |
| Instalación | `PackageManager`/`PackageInstaller` verifica la firma, copia el APK, optimiza el DEX y concede los permisos de instalación | `adb install app-debug.apk` |
| Ejecución | `ActivityManager` crea el proceso y lanza la Activity del *launcher* | `adb shell am start -n es.fpdam.observaciones/.MainActivity` |
| Actualización | Mismo `applicationId`, **misma firma** y `versionCode` mayor. Los datos se conservan | `adb install -r app-debug.apk` |
| Borrado | Se eliminan el APK y los datos privados | `adb uninstall es.fpdam.observaciones` (`-k` conserva los datos) |

Uso del **entorno de ejecución del administrador de aplicaciones** (`pm` y `am` dentro de `adb shell`):

```bash
adb devices                                   # dispositivos y emuladores conectados
adb shell pm list packages -3                 # apps instaladas por el usuario
adb shell pm path es.fpdam.observaciones   # ruta del APK
adb shell dumpsys package es.fpdam.observaciones | grep -E "versionCode|permission"
adb shell pm grant es.fpdam.observaciones android.permission.ACCESS_FINE_LOCATION
adb shell am force-stop es.fpdam.observaciones   # detener la app
adb shell pm clear es.fpdam.observaciones        # borrar sus datos
adb logcat --pid=$(adb shell pidof -s es.fpdam.observaciones)  # log de la app
```

> En Windows con PowerShell, la subcomando `$(…)` también funciona. Si no, se lanza `adb shell pidof -s …` por separado.

### 8. Multiplataforma en la práctica

Taller de 2 h. Se muestra la misma pantalla, una lista con un botón, en dos tecnologías:

- **Compose Multiplatform:** con el asistente web de Kotlin Multiplatform se genera un proyecto Android + escritorio (+ iOS en macOS). La función `@Composable` que está en `commonMain` es la misma que en Android.
- **Flutter:** `flutter create demo` y `flutter run`. Se compara el *widget* `ListView` con `LazyColumn`.

Se anotan el tamaño del APK resultante, el tiempo de compilación y la experiencia con la recarga en caliente. Esos datos alimentan la tabla comparativa de P1.

> Opcional: si el aula no tiene SDK de Flutter, el taller se hace solo con Compose Multiplatform en Android y escritorio.

El **modelo de estados** (activo, pausa, destruido) de una Activity se trabaja en la UD02.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Ficha de mi móvil.** Cada estudiante obtiene los datos de su dispositivo, o de un AVD, con *Ajustes › Información del teléfono* y con `adb shell getprop ro.build.version.sdk`, `adb shell wm size` y `adb shell wm density`. Después lo clasifica según la tabla de configuraciones. Se ponen en común las fichas para ver la fragmentación del grupo.
- **A2. ¿Nativa o multiplataforma?** Por parejas se analizan tres casos: una app bancaria, un juego casual y la app interna de inventario de una pyme. Hay que defender una tecnología con los criterios de elección.
- **A3. Instalación guiada.** Android Studio + SDK + AVD, crear un proyecto *Empty Activity*, ejecutarlo y cambiar el texto de `Greeting`. Es un primer contacto con RA1.g.
- **A4. Laboratorio de `adb`.** Instalar el APK de *debug* (`app/build/outputs/apk/debug/`), lanzarlo con `am start`, subir `versionCode`, reinstalarlo con `-r` y comprobar que los datos se conservan. Después desinstalarlo con y sin `-k`.
- **A5. Comparar código antiguo con código actual.** Abrir un ejercicio en Java con Vistas XML preparado por el docente (material propio) y compararlo con la plantilla de Compose: ¿dónde está la interfaz? ¿qué clases cambian?
- **A6. Taller multiplataforma** (sección 8).

### Práctica evaluable

**P1 · Informe técnico y entorno de desarrollo.** Entrega individual de un PDF o Markdown en el repositorio con:

> **Conexión con el mundo real:** es el informe de viabilidad tecnológica que un equipo prepara antes de aceptar un encargo: qué tecnología usar, en qué dispositivos debe funcionar la app y con qué entorno se trabajará. En este caso, para el cliente ficticio (una asociación medioambiental) descrito en la programación (apartado 1.3).


1. **Limitaciones (RA1.a):** para la app «Observaciones de campo» (descrita en la programación, apartado 1.3), identificar cinco limitaciones de hardware o del sistema que le afecten y la medida de diseño que se propone para cada una.
2. **Tecnologías (RA1.b):** tabla comparativa, con los datos medidos en el taller A6, de al menos cuatro tecnologías (nativa Android, nativa iOS y dos multiplataforma) con lenguaje, IDE, interfaz, rendimiento, coste y plataformas destino. Cerrar con una recomendación justificada.
3. **Entorno (RA1.c):** capturas de Android Studio con el SDK Manager, el proyecto ejecutándose y la versión de las herramientas.
4. **Configuraciones (RA1.d):** crear **dos AVD** muy distintos (por ejemplo, un teléfono compacto API 26 y una tableta expandida con el API más reciente) y clasificarlos con la tabla de configuraciones.
5. **Perfiles (RA1.e):** explicar qué declaran el manifiesto y el `build.gradle.kts` del proyecto (`minSdk`, `targetSdk`, `applicationId`, `uses-feature`, permisos) y en qué dispositivos se podría o no se podría instalar la app.
6. **Emuladores y `adb` (RA1.h):** ejecutar la app en los dos AVD, simular un cambio de ubicación y de batería, y entregar la transcripción de una sesión de `adb` con instalación, actualización, `dumpsys` y desinstalación.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA1.a | Cinco limitaciones bien fundamentadas, cada una con una medida concreta y su API o técnica (Doze, WorkManager, `rememberSaveable`…) | Al menos tres limitaciones correctas con medidas razonables | Limitaciones genéricas o sin relación con la app |
| RA1.b | Comparativa completa y correcta, con una recomendación argumentada con criterios | Comparativa con cuatro tecnologías, alguna imprecisión menor | Menos de cuatro tecnologías o errores conceptuales (por ejemplo, confundir nativo con híbrido) |
| RA1.c | El entorno funciona, con el SDK correcto y la aceleración por hardware comprobada | El entorno funciona con capturas básicas | El proyecto no se ejecuta |
| RA1.d | Dos AVD bien diferenciados y bien clasificados por todos los criterios | Dos AVD con clasificación parcial | Un solo AVD o clasificación errónea |
| RA1.e | Relaciona cada declaración con su efecto sobre la instalación, el filtrado en Play y el comportamiento en ejecución | Describe las declaraciones sin relacionarlas del todo | No identifica `minSdk`/`targetSdk` ni los permisos |
| RA1.h | Prueba en los dos AVD, usa los controles extendidos y la sesión `adb` es completa y comentada | Prueba en un AVD y la sesión `adb` es parcial | No usa el emulador ni `adb` |

**C1 · Cuestionario** (20 min, en Moodle u otra plataforma): 15-20 preguntas sobre las secciones 1, 2 y 5.

## Recursos

- **Documentación oficial:**
  - [Instalar Android Studio](https://developer.android.com/studio/install)
  - [Crear y administrar dispositivos virtuales](https://developer.android.com/studio/run/managing-avds)
  - [Controles extendidos del emulador](https://developer.android.com/studio/run/emulator-extended-controls)
  - [Android Debug Bridge (adb)](https://developer.android.com/tools/adb)
  - [Arquitectura de la plataforma](https://developer.android.com/guide/platform)
  - [Compatibilidad de dispositivos](https://developer.android.com/guide/practices/compatibility)
  - [Clases de tamaño de ventana](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes)
  - [`<uses-feature>`](https://developer.android.com/guide/topics/manifest/uses-feature-element)
  - [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html)
  - [Flutter](https://docs.flutter.dev/)
  - [React Native](https://reactnative.dev/docs/getting-started)
  - [Swift/SwiftUI](https://developer.apple.com/xcode/swiftui/)
- **Codelab:** [Crea tu primera app para Android (Compose)](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app)
- **Herramientas:** Android Studio, Android SDK Platform-Tools (`adb`), Device Manager.
