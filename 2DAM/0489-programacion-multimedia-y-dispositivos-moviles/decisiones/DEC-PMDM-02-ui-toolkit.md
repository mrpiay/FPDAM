# DEC-PMDM-02 · Kit de interfaz de usuario

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD02, UD03 (y todas las UD de apps) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han analizado y utilizado las clases que modelan ventanas, menús, alertas y controles para el desarrollo de aplicaciones gráficas sencillas.» Fuente: RD 405/2023, anexo I, MP0489, RA2.b ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Interfaces de usuario. Clases asociadas.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Desarrollo de aplicaciones para dispositivos móviles»

En Android hay dos kits de interfaz: Jetpack Compose (declarativo) y las Vistas XML (imperativo).

## Alternativas evaluadas

| Criterio | A. Jetpack Compose + Material 3 | B. Vistas XML + Material Components |
|---|---|---|
| C1 Normativa | ✅ Cubre RA2.b: `Scaffold`/`TopAppBar` (ventanas), `DropdownMenu` (menús), `AlertDialog`/`Snackbar` (alertas) y controles | ✅ Cubre RA2.b: `Activity`, menús de opciones, `AlertDialog`, `View` |
| C2 Aplicabilidad profesional | ✅ «Jetpack Compose is Android's recommended modern toolkit for building native UI» ([developer.android.com/compose](https://developer.android.com/compose)) | ➖ Mucho código en producción todavía usa Vistas (mantenimiento), pero ya no es la recomendación para código nuevo |
| C3 Disponibilidad y coste | ✅ Gratuito | ✅ Gratuito |
| C4 Popularidad y comunidad | Valoración propia: es donde se concentra la documentación y las novedades | Valoración propia: muchísimo material, pero buena parte desactualizado |
| C5 Vigencia y soporte | ✅ Recibe todas las novedades de Material 3 y del diseño adaptativo | ➖ Se mantiene, pero las novedades llegan primero a Compose |
| C6 Recursos didácticos | ✅ Curso oficial *Android Basics with Compose* | ✅ Material abundante, pero en Java y antiguo |
| C7 Continuidad curricular | ✅ Su modelo declarativo enlaza con MP0488 y con frameworks web (DAW) y con Compose Multiplatform | ➖ Su modelo XML + código es parecido a JavaFX/FXML de MP0488 |
| C8 Viabilidad en el aula | ✅ `@Preview` permite trabajar sin emulador, algo útil en equipos con poca RAM | ➖ Hace falta emulador o dispositivo para ver la mayoría de cambios |

## Decisión

**A. Jetpack Compose + Material 3.** Pesan C2 y C5, que son la recomendación oficial del fabricante, y C8, la vista previa sin emulador. Las Vistas XML se ven al **analizar y modificar** una app antigua (RA1.f, RA1.g) en la UD02.

## Consecuencias

- Todo el código de las UD03-UD07 usa Compose.
- Algunas APIs, como `PlayerView` de Media3 o `PreviewView` de CameraX, siguen siendo Vistas. Se integran con `AndroidView`, que también se explica.
- **Plan B:** con Vistas, la UD03 sustituye `Scaffold` por `Toolbar` + menú de opciones, y `LazyColumn` por `RecyclerView`. Las rúbricas no cambian.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Android Developers, Jetpack Compose ([developer.android.com/compose](https://developer.android.com/compose)), consultado el 2026-10-27.
