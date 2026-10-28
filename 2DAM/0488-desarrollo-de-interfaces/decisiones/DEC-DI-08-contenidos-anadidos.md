# DEC-DI-08 · Contenidos añadidos fuera de los contenidos básicos

> Aplica la regla 5 de los [criterios de decisión](../../../plantillas/criterios-de-decision.md): «Los contenidos también se justifican.»

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · todas |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

Galicia asigna al módulo 191 h, frente a las 80 h mínimas estatales ([Xunta, D3IFC000200](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). Parte de esas horas se dedican a contenidos que no aparecen literalmente en los contenidos básicos del RD 405/2023, anexo I, 0488. Cada uno se justifica con el criterio de evaluación al que sirve y con su aplicabilidad.

## Contenidos añadidos y justificación

| Contenido añadido | UD | CE que apoya (RD 405/2023, anexo I, 0488) | Aplicabilidad profesional (C2) | Coste en horas (C8) |
|---|---|---|---|---|
| Git con ramas, *pull requests* y revisión; *issues* y tablero | Todas | Instrumental para todos. Permite verificar la autoría de las entregas. Apoya RA8.c (regresión en cada PR) | Flujo de trabajo estándar en equipos (valoración propia) | ≈ 3 h repartidas |
| Integración continua (GitHub Actions) | UD04, UD08, UD09 | RA3.e, RA8.c («pruebas de regresión»), RA7.h (*releases*) | Práctica habitual (valoración propia) | ≈ 3 h |
| Patrón MVVM y concurrencia (`Task`) | UD03 | Contenido básico «Patrones de arquitectura de las aplicaciones gráficas»; RA1.h | Necesario para que la interfaz no se bloquee en aplicaciones reales | ≈ 6 h |
| Historias de usuario y definición de hecho | UD01–UD02 | RA4.i (pruebas con usuarios basadas en tareas); RA8.a (criterios de aceptación como base de la estrategia) | Habitual en metodologías ágiles (valoración propia) | ≈ 2 h |
| *Design system* básico (*tokens*, componentes de diseño) | UD02 | RA4.g (aspecto y legibilidad); RA3.b (correspondencia diseño ↔ componente) | Habitual en equipos de producto (valoración propia) | ≈ 2 h |
| Internacionalización (castellano y gallego) | UD01, UD03 | RA1.f (modificar código generado: `%claves` en FXML). Contenido «Personalización de la instalación: … idioma» (RA7.b) | Aplicaciones para un entorno bilingüe | ≈ 2 h |
| Privacidad de datos biométricos (RGPD) | UD06 | RA2.c–e (uso responsable de voz e imagen) | Obligación legal al tratar voz e imagen | ≈ 1 h |
| Uso responsable de IA generativa en el desarrollo | Todas | Transversal | Práctica actual en el sector (valoración propia); prospectiva art. 8.l | ≈ 1 h |

## Decisión

Se incorporan los contenidos de la tabla. Ninguno sustituye a un contenido básico: todos se apoyan en uno o en un CE. Suman unas 20 h de las 111 h que superan el mínimo estatal.

## Consecuencias

- Los contenidos añadidos no tienen un peso propio en la calificación: se evalúan a través de los CE indicados.
- Las competencias de trabajo en equipo se observan con la observación sistemática (lista de cotejo), que forma parte de la nota de cada RA.
- **Plan B:** si las horas reales son menos, se recortan en este orden: *design system* → i18n → historias de usuario. Git y CI se mantienen porque sostienen RA8.c.

## Fuentes

- RD 405/2023, anexo I, 0488 y art. 8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado el 2026-10-27.
- Xunta, catálogo FP, ciclo D3IFC000200 ([edu.xunta.gal](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). Consultado el 2026-10-27.
