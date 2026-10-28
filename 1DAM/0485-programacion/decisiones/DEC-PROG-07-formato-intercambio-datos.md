# DEC-PROG-07 · Formatos y librerías de intercambio de datos

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · UD08 (y proyecto integrador) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han identificado las clases relacionadas con el tratamiento de documentos escritos en diferentes lenguajes de intercambio de datos.» Fuente: RD 405/2023, anexo I, MP0485, RA6.h ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han realizado programas que realicen manipulaciones sobre documentos escritos en diferentes lenguajes de intercambio de datos.» Fuente: RD 405/2023, anexo I, MP0485, RA6.i

«Diferentes lenguajes» obliga a trabajar al menos dos. La prospectiva del título apoya el intercambio entre plataformas: «una mayor integración de los sistemas de gestión e intercambio de información basados en diferentes plataformas y tecnologías» (RD 405/2023, art. 8.g).

## Alternativas evaluadas

| Criterio | A · JSON con Jackson + XML con DOM (JDK) | B · JSON con Gson/`org.json` + XML con JAXB | C · Solo Jackson (JSON y XML con `jackson-dataformat-xml`) |
|---|---|---|---|
| C1 Normativa | ✅ Dos lenguajes y dos modelos (enlace de datos y árbol DOM): RA6.h/i. | ✅ Dos lenguajes. | ➖ Dos lenguajes, pero un solo modelo de programación: se pierde la comparación. |
| C2 Aplicabilidad profesional | ✅ Jackson es la librería JSON preferida y por defecto de Spring Boot ([documentación de Spring Boot](https://docs.spring.io/spring-boot/reference/features/json.html)); XML sigue presente en configuración e integración (valoración propia). | ➖ Gson en mantenimiento; JAXB fuera del JDK desde Java 11 (valoración propia). | ✅ |
| C3 Disponibilidad y coste | ✅ Libre (Apache-2.0); DOM incluido en el JDK. | ✅ Libre. | ✅ |
| C4 Popularidad y comunidad | ✅ Valoración propia: comunidad muy amplia. | ➖ | ✅ |
| C5 Vigencia y soporte | ✅ Jackson 2.x mantenido (2.20.0 en Maven Central). | ➖ | ✅ |
| C6 Recursos didácticos | ✅ Documentación oficial (JSON/XML es contenido nuevo del RD 405/2023). | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Acceso a datos (2.º) trata XML y JSON en profundidad. | ✅ | ✅ |
| C8 Viabilidad en el aula | ✅ Jackson serializa *records* sin configuración; DOM no requiere dependencias. | ✅ | ✅ |

## Decisión

**JSON con Jackson** y **XML con DOM**. C1 y C2: se cubren «diferentes lenguajes» con dos modelos de programación distintos y con la librería que el alumnado encontrará en proyectos Spring.

## Consecuencias

- UD08 incluye Jackson (`ObjectMapper`, `JsonNode`, módulo `jsr310` para fechas) y DOM (`DocumentBuilder`, `Transformer`).
- Riesgo: convivencia de Jackson 2 y Jackson 3. Mitigación: se fija la versión 2.20.0 en el `pom.xml` y se revisa cada curso.
- **Plan B:** Gson para JSON y JAXB para XML; la rúbrica de P8 no cambia.

## Fuentes

- RD 405/2023, anexo I, MP0485, y art. 8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado 2026-10-27.
- Spring Boot, *JSON* ([enlace](https://docs.spring.io/spring-boot/reference/features/json.html)); FasterXML Jackson ([enlace](https://github.com/FasterXML/jackson)); Maven Central, `com.fasterxml.jackson.core:jackson-databind`. Consultado 2026-10-27.
- Java SE 25, módulo `java.xml` ([enlace](https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html)). Consultado 2026-10-27.
