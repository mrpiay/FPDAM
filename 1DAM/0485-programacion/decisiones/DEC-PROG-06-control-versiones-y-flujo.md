# DEC-PROG-06 · Control de versiones, construcción y flujo de trabajo

> **Contenido no incluido en los contenidos básicos del BOE**: se justifica según la regla 5 de [criterios-de-decision.md](../../../plantillas/criterios-de-decision.md).

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · todas (desde UD01) y proyecto integrador |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

Los contenidos básicos no mencionan Git, herramientas de construcción, integración continua ni tableros de tareas. Se añaden porque apoyan estos CE:

> «Se han creado proyectos de desarrollo de aplicaciones.» Fuente: RD 405/2023, anexo I, MP0485, RA1.b ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han incorporado y utilizado librerías de objetos.» Fuente: RD 405/2023, anexo I, MP0485, RA2.g
>
> «Se han creado y utilizado conjuntos y librerías de clases.» Fuente: RD 405/2023, anexo I, MP0485, RA4.i
>
> «Se han probado y depurado los programas.» Fuente: RD 405/2023, anexo I, MP0485, RA3.f

Y la competencia t): «Establecer vías eficaces de relación profesional y comunicación con sus superiores, compañeros y subordinados […]» (RD 405/2023, art. 5; en el texto publicado, «vidas»), que se trabaja con revisión de código y *pull requests*.

## Alternativas evaluadas

| Criterio | A · Maven + Git + GitHub (Classroom, Projects, Actions) | B · Gradle + Git + GitLab | C · Proyectos del IDE + entrega por Moodle (ZIP) |
|---|---|---|---|
| C1 Normativa | ✅ Proyectos (RA1.b), dependencias (RA2.g), librerías instalables (RA4.i), tests en CI (RA3.f). | ✅ Igual. | ➖ RA2.g y RA4.i a mano (JAR copiados); sin CI. |
| C2 Aplicabilidad profesional | ✅ Git, *pull requests*, CI y tableros son la forma habitual de trabajar en equipos de desarrollo (valoración propia). | ✅ Gradle es el sistema de construcción de Android. | ❌ No refleja el trabajo real. |
| C3 Disponibilidad y coste | ✅ GitHub Classroom y GitHub Education gratuitos para centros y alumnado ([GitHub Education](https://github.com/education)). | ✅ GitLab gratuito; GitLab autogestionado posible. | ✅ |
| C4 Popularidad y comunidad | ✅ Valoración propia: Git es el estándar de control de versiones; GitHub publica su informe [Octoverse](https://octoverse.github.com/). | ✅ | — |
| C5 Vigencia y soporte | ✅ | ✅ | — |
| C6 Recursos didácticos | ✅ Documentación de GitHub Classroom y Actions. | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Entornos de desarrollo (1.º), proyecto intermodular y todos los módulos de 2.º. | ✅ PMDM (Gradle). | ➖ |
| C8 Viabilidad en el aula | ✅ Se introduce de forma gradual: *commit/push* (UD01), CI (UD03), ramas y PR revisadas por el docente (UD06). Unas 6–8 h repartidas, incluidas en las 240 h. | ➖ Gradle añade complejidad en 1.º. | ✅ |

## Decisión

**Maven + Git + GitHub** (Classroom para las entregas, *issues* para las historias, Actions para la CI). Pesan C1 (apoyo directo a RA1.b, RA2.g, RA4.i, RA3.f), C2 y C7. Se coordina con el módulo de Entornos de desarrollo para no duplicar contenidos.

## Consecuencias

- Todas las prácticas se entregan por GitHub Classroom y se corrigen con `mvn test` en GitHub Actions.
- El proyecto integrador sigue un flujo profesional individual: historias como *issues*, desarrollo en ramas con commits incrementales, *pull requests* revisadas por el docente con CI en verde y *releases* por versión. Revisión entre iguales y tableros compartidos, en 2.º.
- Riesgo: cuentas y privacidad del alumnado menor de edad o sin cuenta. Mitigación: repositorios privados de la organización del centro; alternativa con GitLab o Gitea del centro.
- **Plan B:** GitLab (CI integrada) o Gitea en servidor del centro; Gradle si el departamento lo prefiere.

## Fuentes

- RD 405/2023, anexo I, MP0485, y art. 5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado 2026-10-27.
- GitHub Education y GitHub Classroom ([enlace](https://github.com/education)); documentación de GitHub Actions ([enlace](https://docs.github.com/actions)); GitHub Octoverse ([enlace](https://octoverse.github.com/)). Consultado 2026-10-27.
- Apache Maven ([enlace](https://maven.apache.org/)). Consultado 2026-10-27.
