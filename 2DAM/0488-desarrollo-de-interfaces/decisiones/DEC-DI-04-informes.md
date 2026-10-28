# DEC-DI-04 · Herramienta y librería de informes

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD05 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Crea informes evaluando y utilizando herramientas gráficas.» Fuente: RD 405/2023, anexo I, 0488, RA5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Se han utilizado herramientas para generar el código correspondiente a los informes de una aplicación.» · «Se ha modificado el código correspondiente a los informes.» Fuente: ídem, RA5.f y RA5.g

> Contenidos básicos: «Herramientas gráficas integradas en el IDE y externas al mismo.» · «Librerías para generación de informes. Clases, métodos y atributos.» Fuente: ídem, contenidos básicos, bloque «Creación de informes».

## Alternativas evaluadas

| Criterio | A. JasperReports 7.0.x + Jaspersoft Studio 7 | B. JasperReports 6.21 + Jaspersoft Studio 6.21 | C. Eclipse BIRT | D. PDF generado por código (OpenPDF/PDFBox) |
|---|---|---|---|---|
| C1 Normativa | ✅ Diseñador gráfico externo, JRXML editable y librería Java: cubre RA5.a–h | ✅ Igual | ✅ Diseñador y motor | ❌ Sin herramienta gráfica (RA5.b, f) |
| C2 Aplicabilidad profesional | ✅ Se integra en aplicaciones Java empresariales (valoración propia) | ➖ Rama anterior | ➖ Uso menor (valoración propia) | ➖ Útil para documentos sencillos |
| C3 Disponibilidad y coste | ✅ Librería con licencia LGPL; Studio Community gratuito, con un inicio de sesión al descargar ([Jaspersoft Community](https://www.jaspersoft.com/products/jaspersoft-community)) | ✅ Igual | ✅ EPL | ✅ |
| C4 Popularidad y comunidad | ➖ Comunidad consolidada (valoración propia) | ➖ | ➖ | ➖ |
| C5 Vigencia y soporte | ✅ Rama mantenida. La 7.0.7 incluye un filtro de deserialización que corrige CVE-2026-6009 ([notas de versión](https://github.com/Jaspersoft/jasperreports/releases)) | ❌ Rama anterior; no consta que reciba esa corrección | ➖ Actividad reducida (valoración propia) | ✅ |
| C6 Recursos didácticos | ➖ Hay menos tutoriales porque el formato JRXML cambió en la 7 | ✅ Abundantes tutoriales y ejemplos con JRXML de la rama 6 (valoración propia) | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Java, JDBC (Acceso a datos) | ✅ | ✅ | ✅ |
| C8 Viabilidad en el aula | ✅ Studio funciona en Windows y Linux. Se usa el mismo número de versión en el diseñador y en la librería | ✅ | ➖ Hay que montar Eclipse con el *plugin* | ✅ |

## Decisión

**Alternativa A: JasperReports 7.0.x + Jaspersoft Studio 7**, siempre con la **misma versión** en el diseñador y en la librería.

Esta decisión cambia la propuesta inicial, que era la rama 6.21. El motivo es C5: la rama 7 es la mantenida y recibe correcciones de seguridad. El inconveniente en C6 (el material antiguo usa JRXML de la 6) se convierte en contenido didáctico: Jaspersoft Studio 7 convierte las plantillas antiguas, y analizar las diferencias trabaja RA5.g («modificar el código»).

## Consecuencias

- La rama 7 divide la librería en artefactos opcionales: la exportación a PDF y los gráficos van en dependencias aparte. En la UD05 se indican las dependencias y se pide comprobarlas en la documentación de la versión usada.
- Los JRXML de la rama 6 **no cargan en la 7 sin convertirlos**. Se usan como material de análisis, no como plantillas.
- **Plan B:** si una versión concreta da problemas en el aula, se usa JasperReports 6.21 con su Studio 6.21, solo para la práctica y documentando el motivo, o BIRT.

## Fuentes

- RD 405/2023: ver la [fuente común](README.md).
- Jaspersoft, repositorio y notas de versión ([github.com/Jaspersoft/jasperreports](https://github.com/Jaspersoft/jasperreports)). El cambio de formato JRXML en la 7.0.0 y la corrección de CVE-2026-6009 en la 7.0.7 constan en las notas de versión. Consultado el 2026-10-27.
- Jaspersoft Community ([jaspersoft.com/products/jaspersoft-community](https://www.jaspersoft.com/products/jaspersoft-community)). Consultado el 2026-10-27.
- Eclipse BIRT ([eclipse-birt.github.io](https://eclipse-birt.github.io/birt-website/)). Consultado el 2026-10-27.
