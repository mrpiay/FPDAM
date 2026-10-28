# UD06 · Sensores, localización, mapas, pruebas y despliegue

> **Bloque MP0489_12 · Programación de dispositivos móviles.**
> Decisiones relacionadas: [DEC-PMDM-04](../../decisiones/DEC-PMDM-04-red-y-servicios-web.md) (mapas y ubicación), [DEC-PMDM-08](../../decisiones/DEC-PMDM-08-distribucion.md).

| Duración orientativa | RA trabajados |
|---|---|
| 16 h | RA2 (CE d, g, h, i) · RA1.a, e (refuerzo) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.d | Se han desarrollado aplicaciones que hacen uso de las funcionalidades proporcionadas por los sensores. | RD 405/2023, anexo I, MP0489, RA2.d | P6 (sensor integrado en la app) |
| RA2.g | Se han realizado pruebas de interacción usuario-aplicación para optimizar las aplicaciones desarrolladas a partir de emuladores. | RD 405/2023, anexo I, MP0489, RA2.g | P6 (plan de pruebas en emulador, Monkey, Profiler y mejoras aplicadas) |
| RA2.h | Se han empaquetado y desplegado las aplicaciones desarrolladas en dispositivos móviles reales. | RD 405/2023, anexo I, MP0489, RA2.h | P6 (AAB/APK firmado, instalación en dispositivo real, distribución a testers) |
| RA2.i | Se han documentado los procesos necesarios para el desarrollo de las aplicaciones. | RD 405/2023, anexo I, MP0489, RA2.i | P6 (manual de compilación, firma e instalación + manual de usuario) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Leer sensores de movimiento y de entorno de forma eficiente, registrándolos y liberándolos según el ciclo de vida.
2. Obtener la ubicación con el permiso mínimo necesario y mostrar datos en un mapa.
3. Planificar y ejecutar pruebas de interacción en emuladores y usar sus resultados para optimizar la app.
4. Generar una versión de *release* firmada (APK y AAB), instalarla en un dispositivo real y distribuirla a testers.
5. Documentar los procesos de compilación, firma, despliegue y uso.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Desarrollo de aplicaciones para dispositivos móviles».

- Sensores.
- Posicionamiento. Localización. Mapas.
- Herramientas. Flujo de trabajo.
- Seguridad y permisos.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Sensores (RA2.d)

| Categoría | Ejemplos (`Sensor.TYPE_…`) | Uso típico |
|---|---|---|
| Movimiento | `ACCELEROMETER`, `GYROSCOPE`, `LINEAR_ACCELERATION`, `STEP_COUNTER`, `STEP_DETECTOR` | Agitar para deshacer, podómetro, juegos |
| Posición | `MAGNETIC_FIELD`, `ROTATION_VECTOR`, `PROXIMITY` | Brújula, orientación, apagar la pantalla en llamadas |
| Entorno | `LIGHT`, `PRESSURE`, `AMBIENT_TEMPERATURE`, `RELATIVE_HUMIDITY` | Brillo adaptativo, altitud barométrica |

- Hay que **comprobar siempre que el sensor existe**: `getDefaultSensor(...)` puede devolver `null`. Si la app no tiene sentido sin él, se declara con `<uses-feature android:required="true">`.
- **Frecuencia de muestreo:** `SENSOR_DELAY_UI` o `SENSOR_DELAY_GAME`. Una frecuencia innecesariamente alta gasta batería; esto conecta con la limitación de RA1.a.
- **Registrar en *Resumed* y liberar en *Paused*:** encaja con el modelo de estados de la UD02.

```kotlin
@Composable
fun rememberAcelerometro(): State<FloatArray> {
    val context = LocalContext.current
    val valores = remember { mutableStateOf(floatArrayOf(0f, 0f, 0f)) }

    LifecycleResumeEffect(Unit) {                         // se ejecuta en ON_RESUME
        val sm = context.getSystemService(SensorManager::class.java)
        val sensor = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        val listener = object : SensorEventListener {
            override fun onSensorChanged(e: SensorEvent) { valores.value = e.values.clone() }
            override fun onAccuracyChanged(s: Sensor?, accuracy: Int) = Unit
        }
        sensor?.let { sm.registerListener(listener, it, SensorManager.SENSOR_DELAY_UI) }
        onPauseOrDispose { sm.unregisterListener(listener) }   // en ON_PAUSE o al salir de la composición
    }
    return valores
}

// Detector de agitado: módulo de la aceleración (sin la gravedad) por encima de un umbral
fun esAgitado(v: FloatArray, umbral: Float = 12f) =
    sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) - SensorManager.GRAVITY_EARTH > umbral
```

`LifecycleResumeEffect` está en `lifecycle-runtime-compose`.

- **Podómetro:** `TYPE_STEP_COUNTER` necesita el permiso `ACTIVITY_RECOGNITION` en tiempo de ejecución desde API 29.
- **En el emulador:** *Extended controls › Virtual sensors* permite girar el dispositivo y fijar valores de los sensores de entorno.

### 2. Localización

- **Fuentes de posición:**
  - **GNSS**: GPS, Galileo y otros. Es preciso pero gasta mucho y no funciona bien en interiores.
  - **Wi-Fi y antenas de telefonía**: menos preciso, gasta poco.
  - **Fused Location Provider** (Google Play services) combina las fuentes según la prioridad pedida.
- **Permisos:**
  - `ACCESS_COARSE_LOCATION` (aproximada) y `ACCESS_FINE_LOCATION` (precisa). Desde Android 12 se piden **juntos**, y el usuario puede conceder solo la aproximada.
  - `ACCESS_BACKGROUND_LOCATION` se evita: Play exige justificarlo.

```kotlin
class UbicacionRepository(context: Context) {
    private val cliente = LocationServices.getFusedLocationProviderClient(context)

    @RequiresPermission(anyOf = [Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION])
    suspend fun actual(): Location? =
        cliente.getCurrentLocation(Priority.PRIORITY_BALANCED_POWER_ACCURACY, CancellationTokenSource().token).await()
}
```

`await()` viene de `kotlinx-coroutines-play-services`. Para recibir actualizaciones continuas (seguir una ruta) se usa `requestLocationUpdates` con un `LocationRequest` y se convierte a `Flow` con `callbackFlow`, como en la UD05.

- **Geocodificación:** `Geocoder` (dirección ↔ coordenadas). Desde API 33 tiene una versión asíncrona con *listener*.
- **En el emulador:** *Extended controls › Location* permite fijar un punto o reproducir una ruta GPX/KML, por ejemplo un paseo por la senda del Lagares.

### 3. Mapas

**Maps Compose**, la librería de Google Maps para Compose. Necesita una clave de API de Google Cloud, que es gratuita dentro de su cuota. La clave va en `local.properties` y se inyecta en el manifiesto con el *Secrets Gradle Plugin*. Nunca se sube al repositorio.

```kotlin
@Composable
fun MapaObservaciones(observaciones: List<Observacion>, onAbrir: (Long) -> Unit) {
    val centro = LatLng(40.4168, -3.7038) // coordenadas de ejemplo
    val camara = rememberCameraPositionState { position = CameraPosition.fromLatLngZoom(centro, 11f) }

    GoogleMap(modifier = Modifier.fillMaxSize(), cameraPositionState = camara,
        properties = MapProperties(isMyLocationEnabled = false)) {
        observaciones.filter { it.latitud != null && it.longitud != null }.forEach { o ->
            key(o.id) {
                Marker(
                    state = rememberMarkerState(position = LatLng(o.latitud!!, o.longitud!!)),
                    title = o.titulo,
                    snippet = o.categoria.etiqueta,
                    onInfoWindowClick = { onAbrir(o.id) },
                )
            }
        }
    }
}
```

> **Alternativa sin cuenta de Google:** **MapLibre** con teselas de OpenStreetMap. Hay que respetar la política de uso de las teselas y la atribución «© OpenStreetMap contributors».

### 4. Pruebas de interacción y optimización con emuladores (RA2.g)

Un **plan de pruebas** de interacción es una tabla con caso, pasos, resultado esperado, resultado obtenido y la mejora que se aplica. Se ejecuta en al menos dos AVD distintos y se combinan estas técnicas:

| Técnica | Herramienta | Qué detecta |
|---|---|---|
| Pruebas de UI automatizadas | `createAndroidComposeRule`, `onNodeWithText`, `performClick` | Que los flujos principales (crear, ver y borrar una observación) no se rompen |
| Pruebas de estrés | `adb shell monkey -p es.fpdam.observaciones --throttle 100 -v 2000` | Cierres inesperados ante entradas aleatorias |
| Condiciones del dispositivo | Controles extendidos: sin red, batería baja, rotación, ubicación simulada, sensores virtuales | Cómo se comporta la app en situaciones difíciles |
| Rendimiento | **Android Studio Profiler** (CPU, memoria, energía), recuento de recomposiciones en el Layout Inspector | Jank, fugas, sensores o ubicación sin liberar |
| Accesibilidad | Accessibility Scanner, TalkBack en el emulador | Contraste, tamaño táctil, etiquetas |
| Detección de errores de hilos | `StrictMode` en *debug* | Disco o red en el hilo principal |

**Optimizaciones típicas** que salen de estas pruebas:

- `key` en listas y `derivedStateOf` para evitar recomposiciones.
- Liberar los sensores en *Paused*.
- Bajar la prioridad de la ubicación.
- Cargar las imágenes escaladas.
- Activar R8 en *release*.
- *Baseline Profiles* para el arranque (ampliación).

### 5. Empaquetado y despliegue en dispositivos reales (RA2.h)

1. **Versionado:** subir `versionCode`, que tiene que ser mayor en cada actualización, y `versionName`.
2. **Optimización de *release*:** `isMinifyEnabled = true` y `isShrinkResources = true` (R8). Después hay que probar la versión *release*, porque R8 puede eliminar clases que se usan por reflexión.
3. **Firma:** se crea el almacén de claves (*keystore*). Hay dos formas:
   - con *Build › Generate Signed App Bundle or APK*;
   - con `keytool -genkeypair -v -keystore cuaderno.jks -keyalg RSA -keysize 2048 -validity 10000 -alias cuaderno`.

   **El *keystore* y sus contraseñas no se suben nunca al repositorio.** Si se pierde la clave, no se pueden publicar actualizaciones, salvo que se use *Play App Signing*.

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file(System.getenv("KEYSTORE_PATH") ?: "../cuaderno.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = System.getenv("KEY_ALIAS")
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
```

4. **Generar los paquetes:**
   - `./gradlew assembleRelease` genera un **APK**, que se instala directamente.
   - `./gradlew bundleRelease` genera un **AAB**, el formato de publicación de Play. Play genera a partir de él APK optimizados para cada dispositivo.
5. **Instalar en un dispositivo real:**
   - APK: `adb install -r app-release.apk`.
   - AAB en local, con **bundletool**:

```bash
java -jar bundletool.jar build-apks --bundle=app-release.aab --output=cuaderno.apks \
     --connected-device --ks=cuaderno.jks --ks-key-alias=cuaderno
java -jar bundletool.jar install-apks --apks=cuaderno.apks
```

6. **Distribuir a testers:**
   - **Google Play Console › Pruebas internas**: se sube el AAB y se añaden testers por correo.
   - **Firebase App Distribution**: APK o AAB e invitaciones por correo.
7. **CI:** la *release* se puede generar en GitHub Actions, leyendo el *keystore* desde un secreto codificado en Base64. El APK resultante se adjunta a la *release* de GitHub.

> **Atención:** hay que revisar cada curso los requisitos de `targetSdk` de Google Play y el estado de la **verificación de desarrolladores** anunciada por Google para la instalación de apps en dispositivos certificados ([DEC-PMDM-08](../../decisiones/DEC-PMDM-08-distribucion.md)).

### 6. Documentación de procesos (RA2.i)

- **Manual de compilación y despliegue:**
  - requisitos;
  - variables de firma y cómo crear el *keystore* sin publicarlo;
  - comandos para generar el APK o el AAB;
  - instalación por `adb` y con bundletool;
  - cómo dar de alta testers.
- **Manual de usuario** breve con capturas: qué hace cada pantalla, qué permisos pide y por qué.
- **Ficha de privacidad:** qué datos recoge la app (ubicación, fotos), dónde se guardan y si salen del dispositivo. Es la base del formulario de *Seguridad de los datos* de Play.

> **Alternativa:**
> - En **Flutter**: `sensors_plus`, `geolocator`, `google_maps_flutter`/`flutter_map` (OSM), `integration_test`, `flutter build appbundle`.
> - En **KMP**: los sensores y la ubicación se acceden en el código específico de cada plataforma (`expect`/`actual`).

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Inventario de sensores.** Listar con `sm.getSensorList(Sensor.TYPE_ALL)` los sensores del móvil y del emulador y comparar los resultados del grupo (fragmentación).
- **A2. Nivel de burbuja.** Una burbuja dibujada con `Canvas` que se mueve con el acelerómetro. Comprobar con el Profiler el consumo con `SENSOR_DELAY_FASTEST` y con `SENSOR_DELAY_UI`.
- **A3. Dónde estoy.** Mostrar la ubicación con el permiso aproximado y con el preciso, y simular una ruta GPX en el emulador.
- **A4. Mapa.** Configurar la clave de Maps con el *Secrets Gradle Plugin* y poner marcadores desde una lista.
- **A5. Taller de *release*.** Crear el *keystore*, generar el AAB, instalarlo con bundletool en un móvil real y actualizarlo a una nueva versión conservando los datos.
- **A6. Monkey y Profiler.** Lanzar Monkey contra la app, reproducir cualquier cierre que aparezca y corregirlo.

### Práctica evaluable

**P6 · Hito 4 del «Observaciones de campo»: sensores, mapa, pruebas y despliegue.** Se hace en equipo, con PR revisados y CI.

> **Conexión con el mundo real:** es el cierre de la primera versión que se entrega al cliente: las funciones que dependen del hardware del móvil, una campaña de pruebas que justifica la calidad y la distribución a los testers del cliente ficticio (una asociación medioambiental) como en un lanzamiento real.

- Al crear una observación, se rellena la **ubicación actual** (con petición de permiso y funcionamiento sin ella) y se consulta el tiempo (hito 3).
- **Pantalla de mapa** con todas las observaciones geolocalizadas, con Maps Compose o MapLibre.
- **Un sensor con utilidad real.** Por ejemplo:
  - agitar para deshacer el último borrado;
  - podómetro de la salida de campo;
  - brújula para anotar la orientación.
- **Plan de pruebas de interacción** con al menos diez casos, ejecutado en dos AVD, más Monkey y una sesión de Profiler. Debe incluir **al menos tres mejoras** aplicadas a partir de los resultados, con el antes y el después.
- ***Release* firmada:** AAB y APK, instalados en **un dispositivo real** y distribuidos a testers por Play (pruebas internas) o por Firebase App Distribution. Evidencias: capturas o vídeo, y `adb devices`.
- **Documentación:** manual de compilación y despliegue, manual de usuario y ficha de privacidad.
- **Entregables:** *release* `v1.0.0` (APK adjunto y AAB en la tienda o en Firebase) y defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.d | El sensor aporta una función útil, comprueba que existe y se registra y libera según el ciclo de vida, con una frecuencia adecuada | El sensor funciona, pero sin comprobar que existe o sin liberarlo en pausa | No usa sensores, o la lectura no tiene efecto en la app |
| RA2.g | El plan de pruebas está completo, ejecutado en dos AVD y con Monkey y Profiler. Tiene tres o más mejoras medidas | El plan es parcial o las mejoras no están justificadas con datos | No hay pruebas de interacción |
| RA2.h | AAB y APK firmados con R8, instalados en un dispositivo real, distribuidos a testers y actualizados con conservación de datos | APK firmado instalado en un dispositivo real | No hay despliegue en un dispositivo real, o el APK no está firmado |
| RA2.i | Un tercero puede reproducir la compilación, la firma y la instalación siguiendo los manuales. El manual de usuario y la ficha de privacidad son claros | Los manuales están presentes, con lagunas | No hay documentación de procesos |


### Prueba práctica individual del bloque (PE, 3 h)

Al cerrar esta unidad. Partiendo de una plantilla vacía, cada estudiante desarrolla una app pequeña que incluye:

- una lista y un formulario con validación, más un diálogo (RA2.b);
- un ViewModel con su estado (RA2.a);
- persistencia con Room (RA2.f);
- una llamada GET a una API pública que se indica en el enunciado (RA2.e).

Se califica con la misma escala de rúbrica. Se permite consultar la documentación oficial, pero no usar asistentes de IA ni repositorios propios.

## Recursos

- **Documentación oficial:**
  - [Descripción general de los sensores](https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview)
  - [Sensores de movimiento](https://developer.android.com/develop/sensors-and-location/sensors/sensors_motion)
  - [Ubicación](https://developer.android.com/develop/sensors-and-location/location)
  - [Permisos de ubicación](https://developer.android.com/develop/sensors-and-location/location/permissions)
  - [Maps Compose](https://developers.google.com/maps/documentation/android-sdk/maps-compose)
  - [MapLibre Android](https://maplibre.org/maplibre-native/android/api/)
  - [Probar en Android](https://developer.android.com/training/testing)
  - [UI/Application Exerciser Monkey](https://developer.android.com/studio/test/other-testing-tools/monkey)
  - [Profiler](https://developer.android.com/studio/profile)
  - [Firmar la app](https://developer.android.com/studio/publish/app-signing)
  - [Reducir, ofuscar y optimizar (R8)](https://developer.android.com/build/shrink-code)
  - [bundletool](https://developer.android.com/tools/bundletool)
  - [Pruebas internas en Play](https://support.google.com/googleplay/android-developer/answer/9845334)
  - [Firebase App Distribution](https://firebase.google.com/docs/app-distribution)
- **Herramientas:** controles extendidos del emulador, Profiler, Monkey, bundletool, Play Console o Firebase.
