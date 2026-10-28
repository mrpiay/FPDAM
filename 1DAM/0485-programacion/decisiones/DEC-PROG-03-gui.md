# DEC-PROG-03 · Librería de interfaces gráficas

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · UD09 (y UD10 para mostrar datos) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han utilizado las herramientas del entorno de desarrollo para crear interfaces gráficos de usuario simples.» Fuente: RD 405/2023, anexo I, MP0485, RA5.f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han programado controladores de eventos.» Fuente: RD 405/2023, anexo I, MP0485, RA5.g
>
> «Se han escrito programas que utilicen interfaces gráficos para la entrada y salida de información.» Fuente: RD 405/2023, anexo I, MP0485, RA5.h
>
> Contenidos básicos: «Interfaces gráficas. Concepto de evento. Creación de controladores de eventos.» Fuente: RD 405/2023, anexo I, MP0485, bloque «Lectura y escritura de información».

## Alternativas evaluadas

| Criterio | A · JavaFX 25 + Scene Builder | B · Swing (+ editor de NetBeans) | C · Compose Multiplatform (Kotlin) |
|---|---|---|---|
| C1 Normativa | ✅ Editor visual (Scene Builder) integrable en IntelliJ (RA5.f), eventos y *listeners* (RA5.g), E/S con controles (RA5.h). | ✅ Editor visual en NetBeans, eventos con *listeners*. | ➖ Vista previa de código en lugar de editor visual: RA5.f se cubre de forma menos literal; exige Kotlin. |
| C2 Aplicabilidad profesional | ➖ Escritorio Java moderno; nicho en empresa (valoración propia). | ➖ Muy presente en aplicaciones heredadas (valoración propia). | ➖ Tecnología reciente en escritorio; en Android, Compose es la recomendada por Google ([developer.android.com/compose](https://developer.android.com/compose)). |
| C3 Disponibilidad y coste | ✅ OpenJFX libre (GPLv2 + CE); Scene Builder gratuito de Gluon. | ✅ Incluido en el JDK. | ✅ Libre. |
| C4 Popularidad y comunidad | ➖ Valoración propia: comunidad activa pero reducida. | ➖ Valoración propia: mucha información, en gran parte antigua. | ➖ Valoración propia: comunidad en crecimiento. |
| C5 Vigencia y soporte | ✅ Versión 25 publicada y mantenida ([openjfx.io](https://openjfx.io/)). | ➖ En mantenimiento: sin nuevas funciones relevantes (valoración propia). | ✅ Mantenido por JetBrains ([jetbrains.com/compose-multiplatform](https://www.jetbrains.com/compose-multiplatform/)). |
| C6 Recursos didácticos | ➖ Documentación oficial de OpenJFX; menos material docente que Swing (valoración propia). | ✅ Documentación oficial y abundante material docente (valoración propia). | ❌ Sin material docente orientado a este módulo (valoración propia). |
| C7 Continuidad curricular | ✅ Desarrollo de interfaces (2.º) puede continuar con JavaFX/FXML. | ➖ | ✅ PMDM si usa Compose en Android. |
| C8 Viabilidad en el aula | ✅ Dependencia Maven + plugin; 20 h son suficientes para una GUI simple. | ✅ Sin dependencias. | ➖ Requiere cambiar de lenguaje. |

## Decisión

**JavaFX 25 + Scene Builder**: es la opción que cubre RA5.f de forma más literal dentro del lenguaje elegido (C1) y con mejor vigencia que Swing (C5). Swing se presenta como alternativa existente en aplicaciones heredadas.

## Consecuencias

- UD09 usa FXML, controladores con `@FXML` y propiedades observables.
- Riesgo: configuración de módulos (`module-info.java`) y del plugin. Mitigación: plantilla de proyecto JavaFX preparada por el profesorado.
- **Plan B:** Swing con el editor visual de NetBeans; la rúbrica de P9 no cambia.

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- OpenJFX ([openjfx.io](https://openjfx.io/)); Gluon Scene Builder ([gluonhq.com/products/scene-builder](https://gluonhq.com/products/scene-builder/)). Consultado 2026-10-27.
- JetBrains, Compose Multiplatform ([enlace](https://www.jetbrains.com/compose-multiplatform/)); Android Developers, Jetpack Compose ([enlace](https://developer.android.com/compose)). Consultado 2026-10-27.
