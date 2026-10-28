# DEC-PMDM-09 · Contenidos añadidos fuera de los contenidos básicos

> Aplica la regla 5 de los [criterios de decisión](../../../plantillas/criterios-de-decision.md).

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · todas |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

Los contenidos básicos del RD 405/2023 (anexo I, MP0489) no incluyen de forma literal los contenidos de la tabla siguiente. Se añaden porque **apoyan CE concretos** y porque tienen **aplicabilidad profesional**, en línea con la prospectiva del título:

> «…implica la necesaria reorientación de los desarrolladores hacia las nuevas tendencias tecnológicas y la adaptación a técnicas y entornos de desarrollo muy especializados.» Fuente: RD 405/2023, art. 8.l ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

## Contenidos añadidos y su justificación

| Contenido añadido | UD | CE que apoya (RD 405/2023, anexo I, MP0489) | C2 Aplicabilidad profesional | C8 Coste en horas |
|---|---|---|---|---|
| Lenguaje Kotlin (de Java a Kotlin) | UD02 | Todos los de RA2 (es el lenguaje de la DEC-PMDM-01) | Recomendación oficial de Google ([kotlin/first](https://developer.android.com/kotlin/first)) | 6 h |
| Git con ramas, *pull requests*, *issues* y tablero | Todas | RA2.i «Se han documentado los procesos necesarios para el desarrollo de las aplicaciones» y RA5.j | Es la forma habitual de trabajo en equipo (valoración propia) | Transversal, unos 2 h de introducción |
| Integración continua (GitHub Actions: *build*, pruebas y *lint*) | UD03-UD07 | RA2.g (pruebas) y RA2.h (empaquetado reproducible) | Práctica habitual en equipos profesionales (valoración propia) | 2 h |
| Pruebas automatizadas (unitarias y de UI de Compose) | UD03, UD04, UD06 | RA2.g «Se han realizado pruebas de interacción usuario-aplicación…» | Guía oficial de pruebas ([developer.android.com/training/testing](https://developer.android.com/training/testing)) | Incluido en las UD |
| Historias de usuario y prototipo en Figma | UD03 | RA2.b (diseño de ventanas, menús y controles) y RA2.i | Paso habitual antes de programar (valoración propia). Se coordina con MP0488 (*wireframes* y *mockups*) | 2 h |
| Arquitectura en capas y flujo unidireccional | UD04 | RA2.a «Se ha generado la estructura de clases necesaria para la aplicación» | Guía oficial de arquitectura ([topic/architecture](https://developer.android.com/topic/architecture)) | Incluido en UD04 |
| GDD (*game design document*) y *backlog* del juego | UD09, UD10 | RA5.a «Se ha establecido la lógica de un nuevo juego» y RA5.j «Se han documentado las fases de diseño y desarrollo» | Documento habitual en estudios (valoración propia) | 2 h |
| Taller multiplataforma (Compose Multiplatform, Flutter) | UD01 | RA1.b «Se han identificado las tecnologías de desarrollo…» | Ver DEC-PMDM-01 | 2 h |
| IA en el dispositivo (ML Kit) y RA (AR Foundation), **opcionales** | UD07, UD10 (ampliación) | RA3.d (procesamiento multimedia) y RA5.h | Prospectiva del título, art. 8.l (cita literal arriba) | Solo como ampliación |

## Decisión

Se incluyen los contenidos de la tabla con la carga indicada. Los dos últimos (IA y RA) son **opcionales** y no se evalúan con instrumento propio.

## Consecuencias

- Todos estos contenidos se evalúan **a través de los CE que apoyan**, nunca como criterio independiente.
- **Plan B:** si falta tiempo, se reducen primero la CI y Figma (que se pueden coordinar con MP0488). Kotlin, Git y las pruebas se mantienen.

## Fuentes

- RD 405/2023, art. 8 y anexo I, MP0489 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)), consultado el 2026-10-27.
- Android Developers (enlaces de la tabla), consultados el 2026-10-27.
