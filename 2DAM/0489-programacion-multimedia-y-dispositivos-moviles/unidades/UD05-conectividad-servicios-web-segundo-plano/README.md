# UD05 · Conectividad, servicios web, permisos y segundo plano

> **Bloque MP0489_12 · Programación de dispositivos móviles.**
> Decisión relacionada: [DEC-PMDM-04](../../decisiones/DEC-PMDM-04-red-y-servicios-web.md).

| Duración orientativa | RA trabajados |
|---|---|
| 18 h | RA2 (CE c, e, j) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.c | Se han utilizado las clases necesarias para la conexión y comunicación con dispositivos inalámbricos. | RD 405/2023, anexo I, MP0489, RA2.c | P5 (estado de red Wi-Fi/datos + escaneo BLE) |
| RA2.e | Se han utilizado las clases necesarias para establecer conexiones y comunicaciones HTTP y HTTPS. | RD 405/2023, anexo I, MP0489, RA2.e | P5 (API REST por HTTPS) · PE |
| RA2.j | Se han establecido los permisos requeridos para el funcionamiento de las aplicaciones. | RD 405/2023, anexo I, MP0489, RA2.j | P5 (manifiesto + petición en tiempo de ejecución con explicación al usuario) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Ejecutar trabajo asíncrono con corrutinas sin bloquear el hilo principal, y programar tareas en segundo plano con WorkManager.
2. Consumir un servicio web REST por HTTPS con Retrofit y kotlinx.serialization, gestionando errores y estados de carga.
3. Detectar el tipo y el estado de la conectividad y reaccionar a sus cambios.
4. Descubrir dispositivos Bluetooth Low Energy cercanos.
5. Declarar y solicitar permisos según su tipo, respetando la privacidad del usuario.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Desarrollo de aplicaciones para dispositivos móviles».

- Tareas en segundo plano. Servicios.
- Seguridad y permisos.
- Conectividad. Tipos. Clases asociadas. Gestión de las comunicaciones.
- Manejo de conexiones HTTP y HTTPS. Acceso a servicios web.

### Desarrollo de los contenidos (propuesta del docente)

### 1. Corrutinas: trabajo asíncrono sin bloquear la interfaz

- El **hilo principal** dibuja la interfaz. Si se bloquea unos segundos, Android muestra un ANR. Por eso, la red y el disco nunca se usan desde él.
- Una **corrutina** se lanza en un *scope* que controla su vida: `viewModelScope` se cancela al destruirse el ViewModel, y `lifecycleScope` o `rememberCoroutineScope` según el componente. Esto es la **concurrencia estructurada**.
- **Dispatchers:**
  - `Main`: interfaz.
  - `IO`: red y disco.
  - `Default`: cálculo intensivo.

  Retrofit y Room ya cambian de hilo por sí mismos en sus funciones `suspend`.

```kotlin
fun cargarTiempo(lat: Double, lon: Double) {
    viewModelScope.launch {
        _estado.value = TiempoUiState.Cargando
        _estado.value = try {
            TiempoUiState.Exito(repo.tiempoActual(lat, lon))
        } catch (e: IOException) {          // sin red, DNS, timeout
            TiempoUiState.Error("Sin conexión. Inténtalo más tarde.")
        } catch (e: HttpException) {        // respuesta 4xx/5xx
            TiempoUiState.Error("El servicio respondió ${e.code()}")
        }
    }
}
```

### 2. HTTP, HTTPS y servicios web REST

- **REST:** recursos identificados por URL, métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`), códigos de estado (2xx correcto, 4xx error del cliente, 5xx error del servidor) y representación en **JSON**.
- **HTTPS** = HTTP sobre TLS: cifrado, integridad y autenticación del servidor mediante certificado.
  - Desde Android 9 (API 28), el **tráfico en claro (HTTP) está bloqueado por defecto**.
  - Si un servidor de pruebas lo necesita, se permite solo para su dominio con un `network_security_config.xml`, nunca de forma global.
- **Permiso `INTERNET`**: es de tipo normal. Se concede al instalar la app.

**Servicio de ejemplo:** [Open-Meteo](https://open-meteo.com/en/docs), una API pública sin clave, sobre HTTPS. Petición: `https://api.open-meteo.com/v1/forecast?latitude=42.24&longitude=-8.72&current=temperature_2m,wind_speed_10m,weather_code`.

```kotlin
@Serializable
data class TiempoRespuesta(val current: TiempoActual)

@Serializable
data class TiempoActual(
    val time: String,
    @SerialName("temperature_2m") val temperatura: Double,
    @SerialName("wind_speed_10m") val viento: Double,
    @SerialName("weather_code") val codigo: Int,
)

interface OpenMeteoApi {
    @GET("v1/forecast")
    suspend fun tiempoActual(
        @Query("latitude") lat: Double,
        @Query("longitude") lon: Double,
        @Query("current") campos: String = "temperature_2m,wind_speed_10m,weather_code",
    ): TiempoRespuesta
}

private val json = Json { ignoreUnknownKeys = true }   // tolera campos nuevos de la API

val openMeteo: OpenMeteoApi = Retrofit.Builder()
    .baseUrl("https://api.open-meteo.com/")
    .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
    .build()
    .create(OpenMeteoApi::class.java)
```

Dependencias y *plugins*:

- Retrofit y su conversor oficial `converter-kotlinx-serialization`, con el import `retrofit2.converter.kotlinx.serialization.asConverterFactory`.
- `kotlinx-serialization-json`.
- El *plugin* `org.jetbrains.kotlin.plugin.serialization`.
- Opcional: `okhttp` `logging-interceptor`, para ver las peticiones en Logcat en *debug*.

**Otros verbos:**

- `@POST` con `@Body`.
- `@Header` y un interceptor de OkHttp para añadir un token `Authorization: Bearer …`.
- Las claves de API nunca se suben al repositorio: van en `local.properties` y llegan a `BuildConfig`. Aun así, hay que tener en cuenta que todo lo que va en el APK se puede extraer.

### 3. Seguridad y permisos (RA2.j)

| Tipo | Ejemplos | Cómo se concede |
|---|---|---|
| Normales | `INTERNET`, `ACCESS_NETWORK_STATE`, `VIBRATE` | Al instalar la app, solo con declararlos en el manifiesto |
| Peligrosos (en tiempo de ejecución) | `ACCESS_FINE_LOCATION`, `CAMERA`, `RECORD_AUDIO`, `BLUETOOTH_SCAN`, `POST_NOTIFICATIONS` (API 33+) | Se declaran **y** se piden al usuario, que puede denegarlos o revocarlos |
| Especiales | `SCHEDULE_EXACT_ALARM`, superposición | Desde Ajustes, con una *intent* específica |

**Flujo recomendado:**

1. Pedir el permiso **en contexto**, cuando el usuario usa la función que lo necesita.
2. Comprobar con `ContextCompat.checkSelfPermission`.
3. Si hace falta, explicar el motivo antes de pedirlo (*rationale*).
4. Pedirlo con la *Activity Result API*.
5. Que la app **siga funcionando** si se deniega.

```kotlin
@Composable
fun BotonEscanearBle(onPermitido: () -> Unit) {
    val permisos = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S)
        arrayOf(Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT)
    else arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)   // hasta Android 11, BLE requería ubicación

    var denegado by remember { mutableStateOf(false) }
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { res ->
        if (res.values.all { it }) onPermitido() else denegado = true
    }
    Button(onClick = { launcher.launch(permisos) }) { Text("Buscar dispositivos cercanos") }
    if (denegado) Text("Sin este permiso no se pueden buscar dispositivos. Puedes activarlo en Ajustes.")
}
```

Manifiesto para red y BLE, con `minSdk 26`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- Android 12+ (API 31): permisos Bluetooth específicos -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation" tools:targetApi="s" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<!-- Hasta Android 11 -->
<uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" android:maxSdkVersion="30" />
<uses-feature android:name="android.hardware.bluetooth_le"
    android:required="false" />
```

> **Probar los permisos:** `adb shell pm revoke <paquete> android.permission.BLUETOOTH_SCAN` y `pm grant`. También se puede usar *Ajustes › Apps › Permisos*.

### 4. Conectividad: tipos y estado de la red (RA2.c)

- **Tipos de conectividad:**
  - redes: Wi-Fi y datos móviles (4G/5G);
  - corto alcance: Bluetooth clásico y **BLE**, NFC, UWB;
  - entre dispositivos: Wi-Fi Direct y Nearby Connections.
- `ConnectivityManager` informa de la red activa y de sus capacidades: transporte, si tiene Internet validado, si es de pago por uso.

```kotlin
data class EstadoRed(val conectada: Boolean, val tipo: String)

fun ConnectivityManager.observarRed(): Flow<EstadoRed> = callbackFlow {
    val callback = object : ConnectivityManager.NetworkCallback() {
        override fun onCapabilitiesChanged(network: Network, caps: NetworkCapabilities) {
            val tipo = when {
                caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "Wi-Fi"
                caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "Datos móviles"
                else -> "Otra"
            }
            trySend(EstadoRed(caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED), tipo))
        }
        override fun onLost(network: Network) { trySend(EstadoRed(false, "Sin conexión")) }
    }
    trySend(EstadoRed(activeNetwork != null, "Comprobando…"))   // valor inicial
    registerDefaultNetworkCallback(callback)
    awaitClose { unregisterNetworkCallback(callback) }
}.distinctUntilChanged()
```

Uso: `context.getSystemService(ConnectivityManager::class.java).observarRed()`, recogido en el ViewModel con `stateIn`. En la interfaz se muestra un aviso de «sin conexión» y se desactiva el botón de actualizar el tiempo. Se prueba con el modo avión del emulador.

### 5. Bluetooth Low Energy: descubrir dispositivos

- BLE se basa en dos mecanismos:
  - **anuncios** (*advertising*), que un dispositivo emite periódicamente;
  - **GATT**: servicios y características que se leen, escriben o notifican después de conectarse.
- El escaneo consume batería, así que hay que pararlo siempre después de un tiempo.

```kotlin
@RequiresPermission(Manifest.permission.BLUETOOTH_SCAN)
fun Context.escanearBle(): Flow<ScanResult> = callbackFlow {
    val scanner = getSystemService(BluetoothManager::class.java).adapter?.bluetoothLeScanner
    if (scanner == null) { close(IllegalStateException("Bluetooth no disponible o desactivado")); return@callbackFlow }

    val callback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult) { trySend(result) }
        override fun onScanFailed(errorCode: Int) { close(IllegalStateException("Error de escaneo: $errorCode")) }
    }
    val ajustes = ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY).build()
    scanner.startScan(null, ajustes, callback)
    awaitClose { scanner.stopScan(callback) }
}

// En el ViewModel: escanear 10 s y agrupar por dirección
fun escanear(context: Context) = viewModelScope.launch {
    withTimeoutOrNull(10_000) {
        context.escanearBle().collect { r ->
            _dispositivos.update { it + (r.device.address to (r.scanRecord?.deviceName ?: "Sin nombre") to r.rssi) }
        }
    }
}
```

- `scanRecord?.deviceName` sale del anuncio y no necesita `BLUETOOTH_CONNECT`.
- `device.name` sí lo necesita en Android 12+.
- Se dibuja la intensidad (RSSI) con un `LinearProgressIndicator`.
- **Ampliación:** conectar con `device.connectGatt(...)` y leer la característica de nivel de batería (servicio 0x180F) de una pulsera o de un periférico de prueba. Se puede simular con otra app de móvil que emita como periférico BLE.

> **Emulador:** los emuladores recientes incluyen Bluetooth virtual con limitaciones. Para BLE real hace falta un dispositivo físico. Si no hay ninguno, RA2.c se evalúa con la parte de `ConnectivityManager` (ver la programación, apartado 7).

### 6. Tareas en segundo plano y servicios

| Necesidad | Solución actual |
|---|---|
| Trabajo mientras la pantalla está visible | Corrutinas en `viewModelScope` |
| Trabajo diferible que debe completarse aunque se cierre la app o se reinicie el móvil | **WorkManager** (`CoroutineWorker`), con restricciones y reintentos |
| Tarea larga que el usuario percibe (música, navegación, grabación) | **Servicio en primer plano** con notificación y `foregroundServiceType` (obligatorio desde API 34) |
| Responder a eventos del sistema | `BroadcastReceiver` (con muchas restricciones para los implícitos en el manifiesto) |

```kotlin
class SincronizarTiempoWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {
    override suspend fun doWork(): Result = try {
        (applicationContext as CuadernoApp).contenedor.tiempo.actualizarParaUltimaObservacion()
        Result.success()
    } catch (e: IOException) {
        if (runAttemptCount < 3) Result.retry() else Result.failure()
    }
}

fun programarSincronizacion(context: Context) {
    val peticion = PeriodicWorkRequestBuilder<SincronizarTiempoWorker>(1, TimeUnit.HOURS)   // mínimo: 15 min
        .setConstraints(
            Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .setRequiresBatteryNotLow(true)
                .build()
        )
        .build()
    WorkManager.getInstance(context)
        .enqueueUniquePeriodicWork("sync-tiempo", ExistingPeriodicWorkPolicy.KEEP, peticion)
}
```

- **Background Task Inspector** (*App Inspection*) muestra el estado de cada trabajo.
- **Notificaciones:** antes hay que crear un `NotificationChannel`. Desde Android 13, mostrar notificaciones requiere el permiso `POST_NOTIFICATIONS`.
- **Doze y *App Standby Buckets*:** el sistema retrasa el trabajo en segundo plano. WorkManager lo respeta, y por eso no hay que prometer horas exactas.

### 7. Probar las comunicaciones

- **MockWebServer** (OkHttp) simula respuestas en las pruebas: 200 con JSON, 500, tiempo de espera agotado.
- **Emulador:** modo avión, *Network › Speed/Latency* en los controles extendidos.
- **Network Inspector** (*App Inspection*) muestra cada petición, sus cabeceras y su cuerpo.

> **Alternativa:**
> - En **Flutter**: `dio`/`http` + `json_serializable`, `connectivity_plus`, `flutter_blue_plus`, `permission_handler`, `workmanager`.
> - En **KMP**: **Ktor Client** + kotlinx.serialization (el mismo modelo `@Serializable`).

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Codelab «Get data from the internet»** (Mars Photos), con Retrofit y corrutinas.
- **A2. Explorar la API.** Llamar a Open-Meteo desde el navegador y con `curl`. Identificar código de estado, cabeceras, `Content-Type` y el certificado TLS (candado del navegador).
- **A3. HTTP bloqueado.** Intentar una petición `http://` y leer el error. Después, permitirla solo para un dominio de pruebas con `network_security_config.xml`, y debatir por qué no se hace en producción.
- **A4. Permisos.** Denegar, revocar con `adb` y conceder desde Ajustes, comprobando que la app reacciona bien en todos los casos.
- **A5. Radar de conectividad.** Pantalla con el estado de la red en vivo y, en un dispositivo real, la lista de dispositivos BLE con RSSI.
- **A6. WorkManager.** Un trabajo de una sola ejecución que espera 10 s y muestra una notificación. Comprobar que termina aunque se cierre la app.

### Práctica evaluable

**P5 · Hito 3 del «Observaciones de campo»: red, permisos y segundo plano.** Se hace en equipo, con PR revisados y CI.

> **Conexión con el mundo real:** casi toda app profesional depende de servicios web. Aquí se consume una API REST pública real (Open-Meteo), se gestionan los fallos de red con elegancia, se piden los permisos como exigen las políticas de las tiendas y se sincroniza en segundo plano sin agotar la batería.

- Al guardar una observación con coordenadas (de momento, introducidas a mano o fijas en un punto de prueba), se consulta y se guarda en Room el **tiempo actual** de Open-Meteo. Hay estados de carga y error, y un botón para reintentar.
- **Sincronización periódica** con WorkManager, con restricción de red.
- **Indicador de conectividad** (Wi-Fi, datos o sin red) que desactiva las acciones de red cuando no hay conexión.
- **Pantalla «Dispositivos cercanos»** con escaneo BLE de 10 s. Alternativa sin dispositivo físico: ver la programación, apartado 7.
- **Permisos:** manifiesto mínimo y correcto, petición en contexto, explicación y funcionamiento degradado si se deniegan. Hay que justificar en el `README` cada permiso declarado.
- **Pruebas:** una prueba del repositorio de red con MockWebServer o con un *fake*.
- **Entregables:** *release* `hito-3` y defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.c | Observa el estado de la red de forma reactiva y el escaneo BLE funciona, con límite de tiempo y liberación de recursos. Explica el modelo de BLE (anuncios y GATT) | Detecta el tipo de red o escanea BLE, con algún fallo menor (no detiene el escaneo, no es reactivo) | No usa las clases de conectividad |
| RA2.e | Llamada HTTPS correcta con modelos serializables, gestión de errores (sin red, 4xx/5xx), estados de carga y prueba automatizada | La llamada funciona, pero la gestión de errores es parcial | No hay comunicación HTTP, o la app se cierra sin red |
| RA2.j | Permisos mínimos y justificados, petición en contexto con explicación, y la app funciona si se deniegan. Diferencia los tipos de permiso | Declara y pide bien los permisos, pero sin explicación o sin funcionamiento degradado | Faltan permisos, declara permisos innecesarios o la app falla al denegarlos |


## Recursos

- **Documentación oficial:**
  - [Corrutinas en Android](https://developer.android.com/kotlin/coroutines)
  - [Conectarse a la red](https://developer.android.com/develop/connectivity/network-ops/connecting)
  - [Configuración de seguridad de red](https://developer.android.com/privacy-and-security/security-config)
  - [Permisos en Android](https://developer.android.com/guide/topics/permissions/overview)
  - [Solicitar permisos en tiempo de ejecución](https://developer.android.com/training/permissions/requesting)
  - [Supervisar el estado de la conectividad](https://developer.android.com/develop/connectivity/network-ops/reading-network-state)
  - [Bluetooth Low Energy](https://developer.android.com/develop/connectivity/bluetooth/ble/ble-overview)
  - [Permisos de Bluetooth](https://developer.android.com/develop/connectivity/bluetooth/bt-permissions)
  - [WorkManager](https://developer.android.com/develop/background-work/background-tasks/persistent)
  - [Servicios en primer plano](https://developer.android.com/develop/background-work/services/fgs)
  - [Retrofit](https://square.github.io/retrofit/)
  - [Open-Meteo API](https://open-meteo.com/en/docs)
- **Codelabs:** [Obtener datos de Internet](https://developer.android.com/codelabs/basic-android-kotlin-compose-getting-data-internet) · [WorkManager](https://developer.android.com/codelabs/basic-android-kotlin-compose-workmanager)
- **Herramientas:** Network Inspector, Background Task Inspector, `curl`, MockWebServer, nRF Connect (app gratuita para explorar y simular BLE).
