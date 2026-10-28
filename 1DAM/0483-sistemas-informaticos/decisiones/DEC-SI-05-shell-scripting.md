# DEC-SI-05 · Shells, *scripting* y planificación de tareas

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD03-UD08 (comandos), UD05 (scripts y tareas programadas) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han utilizado comandos para realizar las tareas básicas de configuración y administración del sistema.» RA4.e · «Se han planificado y automatizado tareas.» RA3.f · «Comandos de sistemas operativos libres y propietarios.» Contenidos básicos, bloque «Configuración de sistemas operativos» · «Tareas automáticas. Planificación.» Contenidos básicos, bloque «Gestión de la información»
>
> Fuente: RD 405/2023, anexo I, MP0483 ([BOE-A-2023-13221][boe])

## Alternativas evaluadas

| Criterio | A · bash + PowerShell (5.1 y 7) · cron/systemd timers + Programador de tareas | B · bash + cmd/batch · cron + `schtasks` | C · Python como lenguaje único de automatización |
|---|---|---|---|
| C1 Normativa | ✅ comandos de un SO libre y uno propietario; RA3.f | ✅ | ➖ no son «comandos de sistemas operativos»; complemento, no sustituto |
| C2 Aplicabilidad profesional | ✅ bash es el shell por defecto de Ubuntu; PowerShell es la herramienta de administración de Windows y Windows Server (valoración propia apoyada en la documentación oficial) | ➖ cmd sigue existiendo, pero la administración moderna de Windows usa PowerShell (valoración propia) | ✅ muy usado en automatización (valoración propia) |
| C3 Disponibilidad y coste | ✅ incluidos en el SO; PowerShell 7 es libre (MIT) y multiplataforma | ✅ | ✅ |
| C4 Popularidad y comunidad | ✅ (valoración propia) | ➖ (valoración propia) | ✅ (valoración propia) |
| C5 Vigencia y soporte | ✅ PowerShell 7 con versiones LTS; systemd timers integrados en el SO | ➖ cmd sin evolución funcional | ✅ |
| C6 Recursos didácticos | ✅ documentación oficial de PowerShell y Bash | ✅ abundante material antiguo de batch (valoración propia) | ➖ |
| C7 Continuidad curricular | ✅ refuerza variables, condiciones y bucles de MP0485; scripts de compilación y despliegue en 2.º | ➖ | ✅ |
| C8 Viabilidad en el aula | ✅ un lenguaje de shell por SO | ✅ | ➖ añade un tercer lenguaje en 1.º |

## Decisión

**A · bash + PowerShell**, con **cron y systemd timers** en Linux y el **Programador de tareas** (cmdlets `ScheduledTasks`) en Windows. `cmd` se muestra solo como referencia, porque aparece en documentación antigua y en WinRE. Han pesado C1, C2 y C5.

## Consecuencias

- Todos los ejemplos del módulo usan bash y PowerShell; los scripts se versionan en Git desde UD05.
- **Riesgo:** confundir Windows PowerShell 5.1 con PowerShell 7 (algunos cmdlets, como `Checkpoint-Computer`, solo existen en 5.1). **Mitigación:** cada ejemplo indica la versión cuando importa.
- **Plan B:** zsh o fish en Linux, sin cambios en los CE. Python como ampliación en UD05.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [Documentación de PowerShell](https://learn.microsoft.com/powershell/) y [ciclo de soporte de PowerShell](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle) (consulta: 2026-10-27).
- [systemd.timer](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
