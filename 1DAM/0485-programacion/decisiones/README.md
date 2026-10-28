# Decisiones docentes · MP0485 Programación

> *Propuesta del docente.* Un registro de decisión documenta una elección de tecnología o de contenido que la norma deja abierta. Cada registro sigue la plantilla [decision.md](../../../plantillas/decision.md) y evalúa al menos dos alternativas con los criterios C1–C8 de [criterios-de-decision.md](../../../plantillas/criterios-de-decision.md), con evidencias y fuentes con fecha de consulta. Se revisan cada curso (regla 4). La leyenda de las tablas de alternativas está en [Cómo leer este material](../README.md#como-leer-este-material).
>
> Fuente normativa común a todos los registros: RD 405/2023, anexo I, MP0485 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado 2026-10-27.

| Registro | Decisión | Elección | Alternativas consideradas |
|---|---|---|---|
| [DEC-PROG-01](DEC-PROG-01-lenguaje.md) | Lenguaje de programación | **Java 25 LTS** | C#/.NET 10, Kotlin, Python |
| [DEC-PROG-02](DEC-PROG-02-ide.md) | Entorno integrado de desarrollo | **IntelliJ IDEA** | VS Code, Eclipse, NetBeans |
| [DEC-PROG-03](DEC-PROG-03-gui.md) | Interfaces gráficas | **JavaFX 25 + Scene Builder** | Swing (NetBeans), Compose Multiplatform |
| [DEC-PROG-04](DEC-PROG-04-bd-orientada-objetos.md) | BD orientada a objetos | **ObjectDB 2.9 (JPA/JPQL)** | PostgreSQL objeto-relacional, db4o (obsoleta) |
| [DEC-PROG-05](DEC-PROG-05-acceso-bd.md) | Acceso a BD relacionales | **JDBC + SQLite** (demo con MySQL) | JDBC + MySQL/MariaDB, JDBC + PostgreSQL, ORM |
| [DEC-PROG-06](DEC-PROG-06-control-versiones-y-flujo.md) | Control de versiones, construcción y flujo | **Maven + Git + GitHub** (Classroom, Projects, Actions) | Gradle + GitLab; proyectos del IDE + Moodle |
| [DEC-PROG-07](DEC-PROG-07-formato-intercambio-datos.md) | Intercambio de datos | **Jackson (JSON) + DOM (XML)** | Gson + JAXB; solo Jackson |
| [DEC-PROG-08](DEC-PROG-08-pruebas.md) | Pruebas automatizadas | **JUnit 5** | JUnit 6, TestNG, solo pruebas manuales |

Los contenidos añadidos que no están en los contenidos básicos del BOE (Git, CI, UML, historias de usuario, IA) se justifican en el apartado 2.4 de la [programación didáctica](../programacion-didactica.md#24-contenidos-anadidos-que-no-figuran-en-los-contenidos-basicos).
