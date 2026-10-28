# DEC-SI-06 · Copias de seguridad y cifrado

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD03 (cifrado), UD05 (copias) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han realizado y restaurado copias de seguridad.» RA3.e · «Realización y restauración de copias de seguridad.» y «Herramientas de administración de discos. Particiones y volúmenes. Desfragmentación y chequeo. Cifrado.» Contenidos básicos, bloque «Gestión de la información»
>
> Fuente: RD 405/2023, anexo I, MP0483 ([BOE-A-2023-13221][boe])
>
> Prospectiva: la necesidad de «asegurar la integridad, consistencia y accesibilidad de los datos». Fuente: RD 450/2010, art. 8.h, en la redacción del RD 405/2023 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

## Alternativas evaluadas

| Criterio | A · Herramientas del SO: `tar`/`rsync` + `robocopy`/Historial de archivos/Copias de seguridad de Windows Server · LUKS + BitLocker | B · Restic o BorgBackup (copias deduplicadas y cifradas) · VeraCrypt | C · Soluciones comerciales con agente (versiones gratuitas) |
|---|---|---|---|
| C1 Normativa | ✅ RA3.e; «Cifrado» | ✅ | ✅ |
| C2 Aplicabilidad profesional | ✅ `rsync` y `tar` están en cualquier servidor; BitLocker y LUKS son el cifrado integrado de cada SO (valoración propia) | ✅ uso creciente en servidores y equipos de desarrollo (valoración propia, sin cifras) | ✅ empresas (valoración propia) |
| C3 Disponibilidad y coste | ✅ incluidas en el SO; BitLocker requiere Windows Pro | ✅ libres y multiplataforma | ➖ restricciones de licencia y registro |
| C4 Popularidad y comunidad | ✅ (valoración propia) | ✅ (valoración propia) | ➖ |
| C5 Vigencia y soporte | ✅ mantenidas con el SO | ✅ proyectos activos | ➖ dependen del fabricante |
| C6 Recursos didácticos | ✅ `man`, Microsoft Learn | ➖ documentación oficial | ➖ |
| C7 Continuidad curricular | ✅ copias de bases de datos en MP0484 | ✅ | ➖ |
| C8 Viabilidad en el aula | ✅ sin instalar nada; se entienden los tipos de copia (completa, incremental, diferencial) | ➖ abstraen los tipos de copia; mejor como ampliación | ➖ |

## Decisión

**A · Herramientas del propio SO** para enseñar los conceptos: tipos de copia, regla 3-2-1, restauración y verificación. **B** queda como reto de ampliación en UD05. Han pesado C1, C3 y C8.

## Consecuencias

- P5 exige **restaurar** y comprobar el resultado; P3 exige cifrar un volumen y custodiar la clave de recuperación.
- **Plan B:** con otro SO, sus equivalentes: Time Machine y FileVault en macOS, `dnf` + `rsync` en RHEL. Las rúbricas son las mismas.

## Fuentes

- RD 405/2023, anexo I, MP0483, y RD 450/2010, art. 8 (redacción del RD 405/2023) (consulta: 2026-10-27).
- `man rsync`, `man tar`, `man cryptsetup`; [BitLocker en Microsoft Learn](https://learn.microsoft.com/windows/security/operating-system-security/data-protection/bitlocker/) (consulta: 2026-10-27).
- [Restic](https://restic.net/) · [BorgBackup](https://www.borgbackup.org/) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
