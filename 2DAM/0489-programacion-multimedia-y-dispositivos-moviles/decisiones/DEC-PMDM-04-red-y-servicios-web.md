# DEC-PMDM-04 · Red, servicios web, segundo plano y conectividad inalámbrica

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD05 (y UD06) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han utilizado las clases necesarias para establecer conexiones y comunicaciones HTTP y HTTPS.» Fuente: RD 405/2023, anexo I, MP0489, RA2.e ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Se han utilizado las clases necesarias para la conexión y comunicación con dispositivos inalámbricos.» Fuente: RD 405/2023, anexo I, MP0489, RA2.c

> «Tareas en segundo plano. Servicios. […] Conectividad. Tipos. Clases asociadas. Gestión de las comunicaciones. Manejo de conexiones HTTP y HTTPS. Acceso a servicios web.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Desarrollo de aplicaciones para dispositivos móviles»

Hay que decidir el **cliente HTTP**, el **servicio web** que se consume, la **concurrencia** y la **tecnología inalámbrica**.

## Alternativas evaluadas: cliente HTTP

| Criterio | A. Retrofit + OkHttp + kotlinx.serialization | B. Ktor Client | C. `HttpURLConnection` + `org.json` |
|---|---|---|---|
| C1 Normativa | ✅ HTTP y HTTPS, servicios REST | ✅ Igual | ✅ Igual, a bajo nivel |
| C2 Aplicabilidad profesional | ✅ Valoración propia: muy adoptado en Android. Es de código abierto ([square.github.io/retrofit](https://square.github.io/retrofit/)) | ✅ Es el habitual en Kotlin Multiplatform ([ktor.io](https://ktor.io/docs/client-create-new-application.html)) | ❌ No se usa en código nuevo |
| C3 Disponibilidad y coste | ✅ Gratuito (Apache-2.0) | ✅ Gratuito (Apache-2.0) | ✅ Incluido en la plataforma |
| C4 Popularidad y comunidad | Valoración propia: muy alta en Android | Valoración propia: en crecimiento | — |
| C5 Vigencia y soporte | ✅ Mantenido. Conversor oficial de kotlinx.serialization | ✅ Mantenido por JetBrains | ➖ Antiguo |
| C6 Recursos didácticos | ✅ Codelab oficial «Get data from the internet» | ➖ Documentación oficial | ✅ Material abundante, pero en Java |
| C7 Continuidad curricular | ✅ Enlaza con MP0490 (servicios en red) y con APIs REST de DAW | ✅ Igual, y además KMP | ✅ Enlaza con los *sockets* y HTTP de MP0490 |
| C8 Viabilidad en el aula | ✅ Las interfaces anotadas son sencillas | ✅ | ➖ Mucho código repetitivo |

**Servicio web:** se usa [Open-Meteo](https://open-meteo.com/en/docs), una API REST real, pública y sin clave, gratuita para uso no comercial (hay que comprobar sus condiciones cada curso), sobre HTTPS. Alternativas: los datos abiertos del [catálogo de datos abiertos de la Xunta](https://abertos.xunta.gal/) o una API propia hecha en MP0490.

**Concurrencia:** corrutinas + `Flow` + **WorkManager**, frente a hilos (`Thread`/`ExecutorService`) y `AsyncTask`. `AsyncTask` está obsoleto desde API 30. WorkManager es la solución recomendada para el trabajo persistente ([guía de trabajo en segundo plano](https://developer.android.com/develop/background-work/background-tasks)).

## Alternativas evaluadas: conectividad inalámbrica

| Criterio | A. `ConnectivityManager` + BLE (`BluetoothLeScanner`) | B. Wi-Fi Direct (`WifiP2pManager`) | C. NFC |
|---|---|---|---|
| C1 Normativa | ✅ Clases de conexión con dispositivos inalámbricos (RA2.c) | ✅ | ✅ |
| C2 Aplicabilidad profesional | ✅ BLE es la tecnología de *wearables*, balizas y sensores IoT (valoración propia) | ➖ Uso de nicho | ➖ Pagos y etiquetas, con acceso restringido |
| C3 Disponibilidad y coste | ✅ Cualquier móvil. El estado de la red se puede probar en el emulador | ➖ Hacen falta dos dispositivos | ➖ Hacen falta un móvil con NFC y etiquetas |
| C5 Vigencia y soporte | ✅ APIs actuales, con permisos `BLUETOOTH_SCAN`/`BLUETOOTH_CONNECT` desde API 31 | ✅ | ✅ |
| C8 Viabilidad en el aula | ✅ Con la red se puede trabajar siempre. BLE con un móvil y cualquier dispositivo BLE cercano | ➖ | ➖ |

## Decisión

- **Cliente HTTP:** Retrofit + kotlinx.serialization.
- **Servicio web:** Open-Meteo.
- **Concurrencia y segundo plano:** corrutinas + WorkManager.
- **Inalámbrico:** `ConnectivityManager` (mínimo garantizado) + escaneo BLE.

Ktor se presenta como alternativa para KMP.

## Consecuencias

- Se usan los permisos `INTERNET`, `ACCESS_NETWORK_STATE`, `BLUETOOTH_SCAN` y `BLUETOOTH_CONNECT`, con petición en tiempo de ejecución para los de BLE (RA2.j).
- **Riesgo:** que una API externa caiga o cambie sus condiciones. Se mitiga con un servidor simulado (*mock*) local (MockWebServer en las pruebas) y una segunda API de reserva.
- **Plan B:** en Flutter, `dio` o `http` + `flutter_blue_plus`. En KMP, Ktor.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Retrofit, Ktor, Open-Meteo y Android Developers (enlaces de la tabla), consultados el 2026-10-27.
