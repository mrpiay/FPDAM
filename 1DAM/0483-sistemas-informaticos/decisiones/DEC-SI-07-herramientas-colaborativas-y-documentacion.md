# DEC-SI-07 · Herramientas colaborativas y de documentación

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · todas (memorias de prácticas), UD09 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han documentado los procesos realizados.» RA2.i · «Se han realizado tareas de documentación mediante el uso de herramientas ofimáticas y de trabajo colaborativo.» RA7.c · «Herramientas ofimáticas y de trabajo colaborativo.» Contenidos básicos, bloque «Explotación de aplicaciones informáticas de propósito general»
>
> Fuente: RD 405/2023, anexo I, MP0483 ([BOE-A-2023-13221][boe])
>
> Competencia: «Crear tutoriales, manuales de usuario, de instalación, de configuración y de administración, empleando herramientas específicas.» Fuente: RD 450/2010, art. 5.l, en la redacción del RD 405/2023

## Alternativas evaluadas

| Criterio | A · Git + Markdown (GitHub o GitLab) + suite en la nube del centro (Google Workspace o Microsoft 365) | B · Solo suite ofimática (LibreOffice o Microsoft 365) | C · Wiki colaborativa (Confluence, Notion o Nextcloud) |
|---|---|---|---|
| C1 Normativa | ✅ RA2.i y RA7.c: Git aporta el trabajo colaborativo e historial; la suite, la parte ofimática | ✅ RA7.c (la colaboración, con documentos compartidos) | ✅ |
| C2 Aplicabilidad profesional | ✅ documentación en repositorios (README, Markdown) y control de versiones en el desarrollo de software (valoración propia) | ✅ informes y presupuestos | ✅ documentación interna de empresa (valoración propia) |
| C3 Disponibilidad y coste | ✅ Git es libre; GitHub y GitLab tienen planes gratuitos y educativos; la suite, según el centro | ✅ LibreOffice es libre | ➖ planes gratuitos limitados |
| C4 Popularidad y comunidad | ✅ (valoración propia; ver las encuestas de [Stack Overflow](https://survey.stackoverflow.co/) para datos con año) | ✅ (valoración propia) | ➖ |
| C5 Vigencia y soporte | ✅ | ✅ | ➖ dependen del proveedor |
| C6 Recursos didácticos | ✅ [Pro Git](https://git-scm.com/book/es/v2) en español, gratuito | ✅ | ➖ |
| C7 Continuidad curricular | ✅ MP0487 Entornos de desarrollo (control de versiones), MP0485 y proyecto intermodular | ➖ | ➖ |
| C8 Viabilidad en el aula | ✅ uso de Git limitado a lo básico: `clone`, `add`, `commit`, `push`, `log` | ✅ | ➖ |

## Decisión

**A.** Cada alumno o alumna tiene un repositorio Git con las memorias en Markdown, que es el dossier técnico de la empresa cliente. Los documentos ofimáticos para el "cliente" (presupuesto en hoja de cálculo, informe exportado a PDF) se hacen en la suite del centro. Han pesado C1, C2 y C7.

## Consecuencias

- La sesión de acogida dedica 2 h a Git y Markdown. En UD09 se profundiza: ramas simples, *issues* y revisión entre parejas.
- **Contenido añadido no prescrito literalmente:** Git no aparece nombrado en los contenidos básicos. Se justifica en [DEC-SI-08](DEC-SI-08-contenidos-adicionales.md).
- **Plan B:** si el centro no permite cuentas externas, GitLab o Gitea en un servidor del centro, o repositorio local con entrega en ZIP.

## Fuentes

- RD 405/2023, anexo I, MP0483, y RD 450/2010, art. 5 (redacción del RD 405/2023) (consulta: 2026-10-27).
- [Pro Git (es)](https://git-scm.com/book/es/v2) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
