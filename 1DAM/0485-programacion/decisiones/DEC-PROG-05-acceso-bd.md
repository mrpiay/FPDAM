# DEC-PROG-05 · Acceso a bases de datos relacionales

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · UD10 (y UD11 como comparación) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han identificado las características y métodos de acceso a sistemas gestores de bases de datos.» Fuente: RD 405/2023, anexo I, MP0485, RA9.a ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han programado conexiones con bases de datos.» Fuente: RD 405/2023, anexo I, MP0485, RA9.b
>
> Contenidos básicos: «Acceso a bases de datos. Estándares. Características. Establecimiento de conexiones. Almacenamiento, recuperación, actualización y eliminación de información en bases de datos.» Fuente: RD 405/2023, anexo I, MP0485, bloque «Gestión de bases de datos».

Hay que decidir la API de acceso y el SGBD de prácticas.

## Alternativas evaluadas

| Criterio | A · JDBC + SQLite | B · JDBC + MySQL/MariaDB | C · JDBC + PostgreSQL | D · ORM (JPA/Hibernate) directamente |
|---|---|---|---|---|
| C1 Normativa | ✅ API estándar (RA9.a), conexiones, CRUD con `PreparedStatement`, transacciones (integridad). | ✅ Igual. | ✅ Igual. | ➖ Oculta las conexiones y el SQL: RA9.b–e se ven de forma indirecta. Se reserva para RA8/2.º. |
| C2 Aplicabilidad profesional | ✅ JDBC es la base de todos los ORM Java; SQLite se usa como BD embebida en aplicaciones de escritorio y móviles (valoración propia). | ✅ | ✅ | ✅ |
| C3 Disponibilidad y coste | ✅ Driver libre; sin servidor. | ✅ Libre; requiere servidor. | ✅ Libre; requiere servidor. | ✅ Libre. |
| C4 Popularidad y comunidad | ✅ SQLite 37,5 % (SO 2025). | ✅ MySQL 40,5 % (SO 2025). | ✅ PostgreSQL 55,6 % (SO 2025). | — |
| C5 Vigencia y soporte | ✅ `sqlite-jdbc` 3.50.x mantenido. | ✅ `mysql-connector-j` 9.x. | ✅ Driver 42.7.x. | ✅ |
| C6 Recursos didácticos | ✅ Documentación oficial (Oracle · JDBC Basics). | ✅ La misma documentación oficial de JDBC. | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Acceso a datos; Android usa SQLite. | ✅ Bases de datos (1.º) suele usar MySQL o MariaDB. | ✅ | ✅ Acceso a datos. |
| C8 Viabilidad en el aula | ✅ Cero instalación, la BD viaja en el repositorio y la CI la usa sin servicios externos. | ➖ Servidor en cada PC o Docker. | ➖ Igual que B. | ➖ Curva de aprendizaje mayor. |

## Decisión

**JDBC + SQLite** en las prácticas, por C8 (sin servidor, compatible con la CI) y C1. Se muestra la misma aplicación con **MySQL** (el SGBD que suele usar MP0484 Bases de datos), cambiando solo la URL y el driver, para reforzar que JDBC es un estándar.

## Consecuencias

- UD10 usa `DriverManager`, `PreparedStatement`, *try-with-resources* y transacciones.
- Riesgo: SQLite tiene tipado flexible y menos tipos que MySQL. Mitigación: se explicitan las diferencias y se hace una actividad con MySQL.
- **Plan B:** MySQL/MariaDB o PostgreSQL (en Docker o servidor del aula) sin cambiar el código de la aplicación.

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- Oracle, *JDBC Basics* ([enlace](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html)); xerial, `sqlite-jdbc` ([enlace](https://github.com/xerial/sqlite-jdbc)). Consultado 2026-10-27.
- Stack Overflow Developer Survey 2025, *Technology* → bases de datos ([enlace](https://survey.stackoverflow.co/2025/technology)). Consultado 2026-10-27.
