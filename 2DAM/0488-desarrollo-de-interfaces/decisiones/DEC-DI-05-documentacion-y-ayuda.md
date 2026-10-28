# DEC-DI-05 · Sistema de ayuda y documentación

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD07 (y UD04 para JavaDoc) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han generado ayudas en los formatos habituales.» · «Se han generado ayudas sensibles al contexto.» Fuente: RD 405/2023, anexo I, 0488, RA6.b y RA6.c ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> Contenidos básicos: «Ficheros de ayuda. Formatos.» · «Herramientas de generación de ayudas.» · «Tablas de contenidos, índices, sistemas de búsqueda, entre otros.» Fuente: ídem, contenidos básicos, bloque «Documentación de aplicaciones».

## Alternativas evaluadas

| Criterio | A. Markdown + `mkdocs.yml` (MkDocs + Material, o su sucesor Zensical) | B. Docusaurus | C. HelpNDoc | D. CHM (HTML Help Workshop) / JavaHelp |
|---|---|---|---|---|
| C1 Normativa | ✅ HTML con tabla de contenidos, búsqueda e índice. Ayuda contextual con anclas por pantalla | ✅ Igual | ✅ Genera CHM, HTML y PDF | ✅ Formato histórico con índice y búsqueda |
| C2 Aplicabilidad profesional | ✅ La documentación como código es habitual (valoración propia) | ✅ Igual | ➖ Uso en documentación técnica tradicional | ❌ Obsoleto |
| C3 Disponibilidad y coste | ✅ Libre | ✅ Libre | ➖ Gratuito para uso personal, con condiciones | ➖ Solo Windows |
| C4 Popularidad y comunidad | ✅ (valoración propia) | ✅ (valoración propia) | ➖ | ❌ |
| C5 Vigencia y soporte | ➖ **Material for MkDocs entró en modo mantenimiento el 5-11-2025**, con correcciones críticas durante al menos 12 meses. Sus autores trabajan en **Zensical**, que lee `mkdocs.yml` pero aún no tiene todas las funciones ([anuncio](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/)) | ✅ Mantenido | ✅ | ❌ |
| C6 Recursos didácticos | ✅ Documentación oficial. Este mismo repositorio se publica con MkDocs | ✅ | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Markdown ya se usa en los README de los proyectos. Requiere poco Python | ➖ Requiere Node/React | ➖ | ❌ |
| C8 Viabilidad en el aula | ✅ `pip install` y listo | ➖ Más pesado | ✅ | ➖ |

## Decisión

**Alternativa A: el contenido en Markdown con configuración `mkdocs.yml`.** Se compila con **MkDocs + Material** mientras tenga soporte, o con **Zensical** cuando sea estable para las funciones que se usan (navegación, búsqueda y anclas). Lo que se evalúa es el contenido y la estructura de la ayuda, que son portables entre ambos.

La ayuda contextual (RA6.c) se implementa en la aplicación: F1 abre la página y el ancla de la pantalla activa. No depende del generador.

**Honestidad sobre C5:** el riesgo de vigencia es real y conocido. Se acepta porque el contenido no queda atado a la herramienta. Esta decisión se revisa al inicio de cada curso.

## Consecuencias

- La UD07 enseña Markdown y la estructura de `mkdocs.yml`. CHM y JavaHelp se mencionan como formatos históricos (RA6.a, «sistemas de generación de ayudas»).
- **Plan B:** Docusaurus o Sphinx. El Markdown se reutiliza con cambios mínimos.

## Fuentes

- RD 405/2023: ver la [fuente común](README.md).
- Material for MkDocs, anuncio de modo mantenimiento y de Zensical ([blog, 2025-11-05](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/)). Consultado el 2026-10-27.
- [MkDocs](https://www.mkdocs.org/) · [Docusaurus](https://docusaurus.io/) · [HelpNDoc](https://www.helpndoc.com/). Consultados el 2026-10-27.
