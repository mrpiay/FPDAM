# DEC-SI-08 · Contenidos añadidos no nombrados en los contenidos básicos

> Regla 5 de [criterios-de-decision.md](../../../plantillas/criterios-de-decision.md): los contenidos que no aparecen en los contenidos básicos del BOE se justifican igual que las tecnologías.

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD02, UD03, UD05, UD07, UD09 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

El currículo deja abierto el desarrollo de la explotación del sistema "en relación al desarrollo de aplicaciones":

> «Se han evaluado las necesidades del sistema informático en relación con el desarrollo de aplicaciones.» Fuente: RD 405/2023, anexo I, MP0483, RA4.h
>
> «Las actividades profesionales asociadas a esta función se aplican en la explotación de sistemas informáticos en relación al desarrollo de aplicaciones.» Fuente: RD 405/2023, anexo I, MP0483, orientaciones pedagógicas
>
> ([BOE-A-2023-13221][boe])

## Contenidos añadidos y justificación

| Contenido añadido | UD | CE / contenido que apoya | Criterios | Alcance (para que quepa en C8) |
|---|---|---|---|---|
| **Git básico** como herramienta de documentación y versionado de scripts | Acogida, UD05, UD09 | RA2.i, RA7.c; contenido «Herramientas ofimáticas y de trabajo colaborativo» | C2, C7 (MP0487 Entornos de desarrollo) | `clone`, `add`, `commit`, `push`, `log`; ramas solo en UD09. Ver [DEC-SI-07](DEC-SI-07-herramientas-colaborativas-y-documentacion.md) |
| **WSL 2** | UD05 | RA4.h; RA2.g (tecnologías de virtualización); RA2.h | C2, C7 | Instalar, ejecutar Ubuntu en Windows, acceder a archivos y ver la diferencia de rendimiento entre `/mnt/c` y el sistema de archivos de Linux |
| **Contenedores (introducción)** | UD02 (tipos de virtualización), UD05 | RA2.g; contenido «Tecnologías de virtualización. Tipos.»; RA4.h | C2, C5 | Solo **mención y demostración**: qué es una imagen, ejecutar una imagen oficial (`docker run hello-world`) y comparar con una MV. Sin Dockerfile ni orquestación |
| **Preparación de un entorno de desarrollo con script** (JDK, IDE, Git) | UD05 | RA4.h, RA2.h, RA3.f | C2, C7 (MP0485 Programación) | Script bash y script PowerShell/winget versionados |
| **SSH con claves** | UD07 | RA5.h, RA6.d | C2; prospectiva k) | Generar claves ed25519, copiarlas al servidor, desactivar el acceso por contraseña |
| **Dev Drive (ReFS)** en Windows 11 | UD03 | RA3.a (comparar sistemas de archivos) | C2, C5 | Mención y demostración opcional |
| **Markdown** como formato de documentación | Todas | RA2.i, RA7.c | C2, C7 | Sintaxis básica, tablas, bloques de código |

## Alternativas consideradas

| Criterio | A · Añadir estos contenidos con alcance limitado (tabla anterior) | B · Ceñirse solo a los contenidos básicos literales | C · Profundizar (Docker completo, CI/CD) |
|---|---|---|---|
| C1 Normativa | ✅ todos apoyan CE existentes | ✅ | ➖ desplaza horas de CE obligatorios |
| C2 Aplicabilidad profesional | ✅ | ➖ peor conexión con el trabajo del desarrollador | ✅ |
| C7 Continuidad curricular | ✅ conecta con MP0485 y MP0487 | ➖ | ✅ |
| C8 Viabilidad en el aula | ✅ caben en las 155 h | ✅ | ❌ no caben en 1.º |

## Decisión

**A.** Se añaden con el alcance de la tabla y no se evalúan como contenido autónomo: cada uno se evalúa a través del CE al que apoya.

## Consecuencias

- Las rúbricas solo puntúan CE del RD 405/2023.
- **Plan B:** si falta tiempo, los contenidos añadidos pasan a reto de ampliación sin afectar a la cobertura de CE.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [Instalación de WSL](https://learn.microsoft.com/windows/wsl/install) · [Docker: Get started](https://docs.docker.com/get-started/) · [Dev Drive](https://learn.microsoft.com/windows/dev-drive/) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
