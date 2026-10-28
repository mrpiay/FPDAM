# DEC-PROG-04 · Base de datos orientada a objetos

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · UD11 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Utiliza bases de datos orientadas a objetos, analizando sus características y aplicando técnicas para mantener la persistencia de la información.» Fuente: RD 405/2023, anexo I, MP0485, RA8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han instalado sistemas gestores de bases de datos orientados a objetos.» Fuente: RD 405/2023, anexo I, MP0485, RA8.c
>
> «Se han realizado programas para almacenar y gestionar tipos de datos estructurados, compuestos y relacionados.» Fuente: RD 405/2023, anexo I, MP0485, RA8.h
>
> Contenidos básicos: «Bases de datos orientadas a objetos. […] Instalación del gestor de bases de datos. […] El lenguaje de consultas: sintaxis, expresiones, operadores. […] Tipos de datos objeto; atributos y métodos. Tipos de datos colección.» Fuente: RD 405/2023, anexo I, MP0485, bloque «Mantenimiento de la persistencia de los objetos».

## Alternativas evaluadas

| Criterio | A · ObjectDB 2.9 (JPA/JPQL) | B · PostgreSQL objeto-relacional | C · db4o |
|---|---|---|---|
| C1 Normativa | ✅ SGBDOO nativo: instalación (RA8.c), BD y estructuras (RA8.e), objetos embebidos y colecciones (RA8.h), lenguaje de consultas JPQL. | ➖ Cubre tipos objeto y colección (`CREATE TYPE`, arrays) y lenguaje de consultas (SQL), pero es un SGBD **objeto-relacional**, no orientado a objetos: RA8.a/c se cubren de forma indirecta. | ✅ SGBDOO nativo con consultas nativas y por ejemplo. |
| C2 Aplicabilidad profesional | ➖ BDOO de nicho; ✅ la API Jakarta Persistence es la misma que Hibernate y Spring Data JPA (valoración propia). | ✅ PostgreSQL es muy usado: 55,6 % de las respuestas en SO 2025. | ❌ Sin uso actual (valoración propia). |
| C3 Disponibilidad y coste | ✅ Edición gratuita de hasta 10 clases de entidad y un millón de entidades por fichero, permitida para trabajos académicos; licencia educativa gratuita a petición ([objectdb.com/database/purchase](https://www.objectdb.com/database/purchase)). ➖ Software propietario. | ✅ Libre (licencia PostgreSQL). | ➖ Libre, pero solo en archivos de terceros. |
| C4 Popularidad y comunidad | ➖ Comunidad pequeña (foro oficial) (valoración propia). | ✅ 55,6 % (SO 2025); 57,9 % (SO 2026). | ❌ Comunidad inactiva (valoración propia). |
| C5 Vigencia y soporte | ✅ Versión 2.9.5 en su repositorio Maven, con soporte de Jakarta Persistence (`objectdb-jk`). | ✅ Versiones anuales con 5 años de soporte ([versioning policy](https://www.postgresql.org/support/versioning/)). | ❌ Descontinuado, sin versiones desde hace más de una década (valoración propia). |
| C6 Recursos didácticos | ➖ Manual oficial completo; poco material docente (valoración propia). | ✅ Documentación oficial extensa. | ➖ Solo material antiguo; el producto está abandonado (valoración propia). |
| C7 Continuidad curricular | ✅ JPA en Acceso a datos (2.º). | ✅ Bases de datos (1.º) y Acceso a datos (2.º). | ❌ |
| C8 Viabilidad en el aula | ✅ Embebida: un JAR por Maven, sin servidor; modo servidor y *Explorer* opcionales. | ➖ Requiere servidor (instalación o Docker). | ➖ Exige JDK antiguos y librerías sin mantenimiento. |

## Decisión

**ObjectDB 2.9** embebida con la API Jakarta Persistence. Pesa C1: es la única alternativa vigente que es un **SGBD orientado a objetos** en sentido estricto, lo que permite cubrir RA8.a–c literalmente; y C7, porque JPA es la API de persistencia que se usa en 2.º. PostgreSQL objeto-relacional se trabaja en UD11 como comparación (RA8.d) y es el plan B. db4o se descarta por C5.

## Consecuencias

- UD11 incluye instalación de la distribución ZIP, uso del *Explorer* y modo servidor, además del uso embebido por Maven.
- Riesgo: licencia propietaria y comunidad pequeña. Mitigación: se usa solo la API estándar JPA (código portable) y se documenta el plan B.
- **Plan B:** PostgreSQL con tipos compuestos, arrays y herencia de tablas, accedido con JDBC; la rúbrica de P11 se adapta sustituyendo JPQL por SQL objeto-relacional.

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- ObjectDB, *Editions and prices* ([enlace](https://www.objectdb.com/database/purchase)) y licencia ([enlace](https://www.objectdb.com/database/license)); repositorio Maven `https://m2.objectdb.com` (artefacto `com.objectdb:objectdb-jk:2.9.5`). Consultado 2026-10-27.
- PostgreSQL, *Composite Types* ([enlace](https://www.postgresql.org/docs/current/rowtypes.html)) y *Versioning policy* ([enlace](https://www.postgresql.org/support/versioning/)). Consultado 2026-10-27.
- Stack Overflow Developer Survey 2025 y 2026, *Technology* → bases de datos ([2025](https://survey.stackoverflow.co/2025/technology), [2026](https://survey.stackoverflow.co/2026/technology)). Consultado 2026-10-27.
