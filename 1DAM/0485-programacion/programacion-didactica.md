# Programación didáctica · MP0485 Programación

Datos del módulo: ver la [ficha](README.md).

## Resumen

*Propuesta del docente.*

**Enfoque.** Módulo eminentemente práctico: se programa en el aula todas las sesiones. Se sigue el orden de los bloques de contenidos básicos del currículo (elementos del programa → objetos → control → clases → almacenamiento → herencia → E/S → persistencia), con una excepción deliberada: las colecciones se adelantan a ficheros y bases de datos para que la persistencia trabaje con estructuras reales. Se dan desde el principio los contenidos que el RD 405/2023 incorpora respecto al RD 450/2010 (genericidad, expresiones regulares, aserciones, documentos en lenguajes de intercambio, operaciones agregadas).

**Stack.** Java 25 LTS (Temurin) · IntelliJ IDEA · Maven · Git + GitHub Classroom · JUnit 5 · JavaFX 25 + Scene Builder · Jackson y DOM · JDBC con SQLite (MySQL opcional) · ObjectDB con Jakarta Persistence/JPQL. Es una propuesta, no una exigencia normativa: el apartado 2 recoge alternativas igual de válidas (C#/.NET, Kotlin, otros IDE y SGBD) y cómo adaptar el módulo. Se elige por ser actual, gratuita, usada en proyectos reales y continuista con 2.º DAM, y para atender el objetivo general e) y la competencia e) del título, que piden *seleccionar y emplear lenguajes, herramientas y librerías* para desarrollar aplicaciones multiplataforma con acceso a bases de datos (ver apartado 1).

**Proyecto integrador.** El **gestor de biblioteca**, un encargo realista de un cliente ficticio (una librería con servicio de préstamo), con historias de usuario y criterios de aceptación, trabajado como en empresa: historias como *issues*, ramas y *pull requests* con revisión del docente, tests JUnit, integración continua con GitHub Actions y entregas por versión (v0.1, v0.2, v1.0). Crece unidad a unidad en un único repositorio: de un programa de consola a una aplicación JavaFX con persistencia intercambiable (memoria, ficheros, JDBC y ObjectDB) gracias a una interfaz `Repositorio<T, ID>`. Tiene 14 h de *sprints* propios además del incremento de cada UD, y se califica en tres hitos con defensa oral.

**Evaluación.** Por resultados de aprendizaje: cada RA se califica de 0 a 10 a partir de sus CE con pruebas prácticas en el aula (30 %), prácticas por UD con rúbrica ligada a CE (35 %), hitos del proyecto (25 %) y katas/observación (10 %), de modo que el 60 % de cada RA procede del trabajo práctico continuado. Nota final = media ponderada de los RA (del 7 % al 20 %, según horas y relevancia), con la condición de que **cada RA ≥ 5**. Se recuperan solo los RA no superados. La matriz CE × UD (apartado 6) cubre el 100 % de los 79 CE.

## 1. Contextualización y contribución al título

### 1.1 Lo que dice la norma

> Fuente: RD 405/2023, anexo I, MP0485, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Transcripción en [curriculo-boe.md](curriculo-boe.md).

El módulo «contribuye a alcanzar los objetivos generales e), j), q) y w) del ciclo formativo y las competencias e), j), t) y w) del título». Texto de esos elementos:

| Elemento | Texto literal | Fuente |
|---|---|---|
| Competencia e) | Desarrollar aplicaciones multiplataforma con acceso a bases de datos utilizando lenguajes, librerías y herramientas adecuados a las especificaciones. | RD 405/2023, art. 5 (competencias del título DAM) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Competencia j) | Desarrollar aplicaciones para teléfonos móviles, tabletas y otros dispositivos inteligentes empleando técnicas y entornos de desarrollo específicos. | RD 405/2023, art. 5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Competencia t) | Establecer vías eficaces de relación profesional y comunicación con sus superiores, compañeros y subordinados, respetando la autonomía y competencias de las distintas personas. | RD 405/2023, art. 5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) — en el texto publicado figura «vidas eficaces», errata evidente de «vías» |
| Competencia w) | Mantener el espíritu de innovación y actualización en el ámbito de su trabajo para adaptarse a los cambios tecnológicos y organizativos de su entorno profesional. | RD 405/2023, art. 5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Objetivo e) | Seleccionar y emplear lenguajes, herramientas y librerías, interpretando las especificaciones para desarrollar aplicaciones multiplataforma con acceso a bases de datos. | RD 405/2023, art. 9 (objetivos generales del ciclo DAM) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Objetivo j) | Seleccionar y emplear técnicas, lenguajes y entornos de desarrollo, evaluando sus posibilidades, para desarrollar aplicaciones en teléfonos móviles, tabletas y otros dispositivos inteligentes. | RD 405/2023, art. 9 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Objetivo q) | Seleccionar y emplear lenguajes y herramientas, atendiendo a los requerimientos, para desarrollar componentes personalizados en sistemas ERP-CRM. | RD 405/2023, art. 9 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |
| Objetivo w) | Identificar los cambios tecnológicos, organizativos, económicos y laborales en su actividad, analizando sus implicaciones en el ámbito de trabajo, para mantener el espíritu de innovación. | RD 405/2023, art. 9 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) |

> Los arts. 5 y 9 citados son los del RD 450/2010 (título DAM) en la nueva redacción que les da el RD 405/2023.

### 1.2 Cómo se concretan en esta programación

*Propuesta del docente.*

| Elemento | Concreción |
|---|---|
| Objetivo e) · Competencia e) | Java + Maven + librerías externas (Jackson, JavaFX, drivers JDBC, ObjectDB); acceso a BD relacionales (UD10) y orientadas a objetos (UD11). Las decisiones del apartado 2 se justifican con este criterio. |
| Objetivo j) · Competencia j) | POO, colecciones, genéricos, *lambdas* y programación dirigida por eventos: base de Kotlin/Android en PMDM (2.º). En UD01 se presenta Gradle (el sistema de construcción de Android) como alternativa a Maven. |
| Objetivo q) | Lectura de especificaciones y desarrollo de componentes reutilizables (paquetes, interfaces, librerías de clases: RA4.i, RA7.i), que se retoman en Sistemas de gestión empresarial. |
| Competencia t) | Programación en pareja, revisión de código por *pull request* y defensa oral de los hitos del proyecto. |
| Objetivo w) · Competencia w) | Uso de la versión LTS vigente de Java y de sus novedades; comparación razonada de tecnologías (Swing vs JavaFX, db4o vs ObjectDB, ORM vs BDOO); uso responsable de asistentes de IA. |

### 1.3 Supuestos de partida

*Supuestos de partida (propuesta del docente).* Modalidad presencial; grupo de 1.º sin experiencia previa homogénea; aula con un PC por estudiante (16 GB de RAM recomendados) con JDK, IntelliJ y Scene Builder preinstalados; cuenta de GitHub por estudiante; coordinación con MP0484 Bases de datos, que imparte SQL en paralelo (por eso RA9 se programa en el 3.er trimestre).

## 2. Decisiones tecnológicas

*Propuesta del docente.* **La norma no impone ningún lenguaje ni herramienta:** habla de «lenguajes orientados a objetos» y de «entornos integrados de desarrollo» en general. Entre las líneas de actuación de las orientaciones pedagógicas figura «la evaluación, selección y utilización de herramientas y lenguajes de programación orientados a objetos» (RD 405/2023, anexo I, MP0485, orientaciones pedagógicas, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Por eso cada elección se presenta con sus alternativas y en clase se dedica tiempo a compararlas.

### 2.1 Apoyo normativo para orientar las decisiones a proyectos reales

El art. 8 (prospectiva del título) indica que las administraciones educativas tendrán en cuenta, entre otras, estas consideraciones:

| Letra | Texto literal | Fuente | Consecuencia en este módulo |
|---|---|---|---|
| c) | «Cada vez es más necesario para las empresas el acceso a información contenida en bases de datos mediante aplicaciones que, además, permitan gestionar de forma integral la información almacenada.» | RD 405/2023, art. 8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) | El proyecto integrador termina como aplicación de gestión con BD (UD10–UD11). |
| g) | «El perfil profesional de este título evoluciona hacia una mayor integración de los sistemas de gestión e intercambio de información basados en diferentes plataformas y tecnologías, siendo preciso que cada vez sean más estables y seguros.» | RD 405/2023, art. 8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) | JSON/XML para intercambio (UD08); pruebas automatizadas e integración continua para la estabilidad. |
| l) | «El consumo generalizado de dispositivos inteligentes, el auge de la inteligencia artificial (IA) y la realidad aumentada (RA) con la consiguiente demanda de soluciones específicas, implica la necesaria reorientación de los desarrolladores hacia las nuevas tendencias tecnológicas y la adaptación a técnicas y entornos de desarrollo muy especializados.» | RD 405/2023, art. 8 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)) | Versión LTS actual del lenguaje, herramientas profesionales y uso crítico de asistentes de IA. |

> Los arts. 5, 8 y 9 citados en este documento son los del RD 450/2010 (título DAM) en la redacción que les da el RD 405/2023.

### 2.2 Criterios de elección

Vigencia (versión mantenida y con soporte a largo plazo), gratuidad para el aula, continuidad con 2.º DAM (Desarrollo de interfaces, PMDM, Acceso a datos, PSP), **uso en proyectos reales** (herramientas con las que se trabaja hoy en equipos de desarrollo) y material disponible. No se dan cifras de demanda laboral: como referencia verificable, Java, C# y Python aparecen de forma estable entre los lenguajes más usados en la [Stack Overflow Developer Survey](https://survey.stackoverflow.co/) y en el [JetBrains State of Developer Ecosystem](https://www.jetbrains.com/lp/devecosystem/); conviene consultar la edición vigente antes de presentarlo.

Material disponible: la documentación oficial ([dev.java](https://dev.java/learn/) y la API de Java SE 25) y los apuntes propios de cada UD de este módulo están en **Java**.

### 2.3 Resumen de decisiones

Cada decisión está documentada en un registro propio, con al menos dos alternativas evaluadas según los criterios C1–C8 de [criterios-de-decision.md](../../plantillas/criterios-de-decision.md), evidencias y fuentes con fecha de consulta. La elección y las alternativas de cada una se resumen en el [índice de decisiones](decisiones/README.md).

### 2.4 Contenidos añadidos que no figuran en los contenidos básicos

Regla 5 de [criterios-de-decision.md](../../plantillas/criterios-de-decision.md): todo contenido añadido se justifica con el CE que apoya y su aplicabilidad.

| Contenido añadido | UD | CE que apoya (fuente: RD 405/2023, anexo I, MP0485) | Criterio y aplicabilidad |
|---|---|---|---|
| Git, GitHub Classroom, ramas y *pull requests* | UD01 → todas | RA1.b (proyectos), RA3.f (probar y depurar: historial y revisión) | C2, C7: forma habitual de trabajo en equipos de desarrollo; base de los proyectos en equipo de 2.º. [DEC-PROG-06](decisiones/DEC-PROG-06-control-versiones-y-flujo.md) |
| Maven (dependencias e instalación de librerías) | UD01, UD02, UD04 | RA1.b, RA2.g, RA4.i | C2, C8: incorporar librerías de forma reproducible. [DEC-PROG-06](decisiones/DEC-PROG-06-control-versiones-y-flujo.md) |
| Integración continua (GitHub Actions) | UD03 → proyecto | RA3.f, RA7.f | C2: los tests se ejecutan en cada cambio, como en un *pipeline* real; art. 8.g (sistemas «más estables y seguros»). |
| Historias de usuario como *issues* y criterios de aceptación | Proyecto integrador | RA4.e, RA9.g (aplicaciones completas a partir de requisitos) | C2: lectura de especificaciones; objetivo e) «interpretando las especificaciones» (art. 9). |
| Diagramas UML de clases | UD04, UD06 | RA4.a, RA7.e (estructura de clases y diseño de jerarquías) | C2, C7: notación estándar de diseño; se usa en Entornos de desarrollo. |
| Uso crítico de asistentes de IA (probar y depurar código generado) | UD03 y enunciados | RA3.f | C2: práctica actual en la profesión; art. 8.l (auge de la IA). |
| Novedades del lenguaje (*records*, *pattern matching*, JEP 511–513) | UD01–UD07 | RA4.b, RA4.d, RA7.d | C5: versión LTS vigente; competencia w) (actualización). |

### 2.5 Cómo se adapta el módulo si el centro usa otra tecnología

La secuencia, la matriz CE × UD, el proyecto integrador y los criterios de calificación **no dependen del lenguaje**: cambian los ejemplos de código y algunas librerías. Con **C#/.NET**: Visual Studio o Rider, NuGet en lugar de Maven, xUnit o NUnit, LINQ en lugar de *streams*, WPF o .NET MAUI para la GUI, ADO.NET para RA9 y, para RA8, PostgreSQL objeto-relacional o una BDOO para .NET (la oferta es menor que en Java; hay que revisarla antes). Con **Kotlin**: mismo JDK, IDE, JUnit, JDBC y ObjectDB; Gradle como herramienta de construcción y Compose Multiplatform o JavaFX para la GUI; hay que reforzar los conceptos que Kotlin oculta (tipos primitivos, `static`, excepciones comprobadas). **Python** se desaconseja como lenguaje principal por las limitaciones indicadas en RA4.f, RA7.b y RA6.f, pero puede usarse como segundo lenguaje para comparar. Cada UD indica qué CE trabaja cada actividad, de modo que los ejemplos se pueden reescribir manteniendo la evaluación.

### 2.6 Versiones y configuración de partida

**Versiones comprobadas en Maven Central y en el repositorio de ObjectDB (octubre de 2026):** `org.junit.jupiter:junit-jupiter:5.14.4`, `org.openjfx:javafx-controls` y `javafx-fxml:25.0.2`, `org.openjfx:javafx-maven-plugin:0.0.8`, `com.fasterxml.jackson.core:jackson-databind:2.20.0` (+ `com.fasterxml.jackson.datatype:jackson-datatype-jsr310`), `org.xerial:sqlite-jdbc:3.50.3.0`, `com.mysql:mysql-connector-j:9.4.0`, `com.objectdb:objectdb-jk:2.9.5` (repositorio `https://m2.objectdb.com`) + `jakarta.persistence:jakarta.persistence-api:3.1.0`.

Novedades de Java 25 que se aprovechan con fines didácticos: ficheros compactos e `IO` (JEP 512) para los primeros programas, importación de módulos (JEP 511), constructores flexibles (JEP 513), además de *records*, *switch expressions*, *text blocks*, *pattern matching* y `var`.

#### `pom.xml` base del curso

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>es.dam</groupId>
  <artifactId>prog-ud01</artifactId>
  <version>1.0-SNAPSHOT</version>

  <properties>
    <maven.compiler.release>25</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.14.4</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.14.1</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.5.4</version>
        <!-- Surefire ejecuta los tests con aserciones activadas (-ea) por defecto -->
      </plugin>
    </plugins>
  </build>
</project>
```

## 3. Secuencia y temporalización

> Fuente de la carga horaria total (240 h, 9 sesiones semanales en 1.º): Xunta, catálogo FP, ciclo D3IFC000200 ([edu.xunta.gal/fp/ciclo/D3IFC000200](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). Mínimo estatal: 135 h, RD 405/2023, anexo I, MP0485 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

*Propuesta del docente:* la división en unidades, su orden y el reparto de horas. Las **horas** (de 60 min) son la unidad oficial (fuente: Xunta). Las **sesiones** son una *propuesta del docente (estimación)*: sesiones = horas × 60 / 50, redondeado; 240 h → **288 sesiones**, unas **32 semanas** a 9 sesiones. Pendiente de confirmar con el centro la equivalencia hora/sesión y el calendario.

Criterio de secuencia: fundamentos (RA1–RA3) → POO básica (RA4) → estructuras estáticas (RA6: arrays y regex) → POO avanzada (RA7) → colecciones (RA6) **antes** de ficheros y BD → E/S (RA5, RA6 JSON/XML) → GUI (RA5) → BD relacional (RA9, cuando Bases de datos ya ha dado SQL) → BD orientada a objetos (RA8), que reutiliza el mismo modelo y lo persiste con JPA.

| UD | Título | Horas | Sesiones (estimación) | RA (CE principales) | Trimestre | Instrumentos |
|---|---|---|---|---|---|---|
| [UD01](unidades/UD01-estructura-programa/README.md) | Estructura de un programa, entorno y elementos del lenguaje | 16 | 19 | RA1 (a–i) | 1.º | P1, PR1, katas |
| [UD02](unidades/UD02-objetos-clases-predefinidas/README.md) | Utilización de objetos y clases predefinidas | 16 | 19 | RA2 (a–i) | 1.º | P2, PR1, katas |
| [UD03](unidades/UD03-estructuras-control-excepciones/README.md) | Estructuras de control, excepciones, aserciones y depuración | 26 | 31 | RA3 (a–i) | 1.º | P3, PR1, katas |
| [UD04](unidades/UD04-desarrollo-clases/README.md) | Desarrollo de clases | 24 | 29 | RA4 (a–f, h, i) | 1.º | P4, PR2, PI-1 |
| Sprint 1 | Proyecto integrador: cierre y defensa de PI-1 | 4 | 5 | RA1–RA4 | 1.º | PI-1 |
| [UD05](unidades/UD05-arrays-cadenas-regex/README.md) | Arrays, cadenas y expresiones regulares | 16 | 19 | RA6 (a, b, g) | 2.º | P5, PR2 |
| [UD06](unidades/UD06-herencia-interfaces/README.md) | Herencia, polimorfismo, interfaces y composición | 24 | 29 | RA7 (a–j), RA4 (g, i) | 2.º | P6, PR2 |
| [UD07](unidades/UD07-colecciones-genericos-streams/README.md) | Colecciones, genéricos y operaciones agregadas | 26 | 31 | RA6 (b–f, j) | 2.º | P7, PR3, PI-2 |
| [UD08](unidades/UD08-entrada-salida-ficheros/README.md) | Entrada/salida, ficheros y documentos JSON/XML | 22 | 26 | RA5 (a–e), RA6 (h, i) | 2.º | P8, PR3, PI-2 |
| Sprint 2 | Proyecto integrador: refactorización, revisión del docente sobre PR y defensa de PI-2 | 5 | 6 | RA5–RA7 | 2.º | PI-2 |
| [UD09](unidades/UD09-interfaces-graficas-javafx/README.md) | Interfaces gráficas con JavaFX y eventos | 20 | 24 | RA5 (f–h) | 3.º | P9, PR4, PI-3 |
| [UD10](unidades/UD10-bases-datos-jdbc/README.md) | Acceso a bases de datos relacionales con JDBC | 20 | 24 | RA9 (a–g) | 3.º | P10, PR4, PI-3 |
| [UD11](unidades/UD11-bases-datos-objetos/README.md) | Bases de datos orientadas a objetos (ObjectDB / JPA) | 16 | 19 | RA8 (a–h) | 3.º | P11, PI-3, cuestionario |
| Sprint 3 | Proyecto integrador: integración final, demo y defensa de PI-3 | 5 | 6 | RA5, RA8, RA9 | 3.º | PI-3 |
| | **Total** | **240** | **288** (suma redondeada por fila: 287) | | | |

Las horas de cada UD incluyen su prueba práctica (PR) cuando le corresponde y el incremento del proyecto integrador; los *sprints* son horas reservadas solo al proyecto.

**Uso de las horas por encima del mínimo estatal** (240 − 135 = 105 h): +50 h de práctica guiada y katas (sobre todo en UD03, UD06 y UD07, donde más dificultades aparecen), +14 h de *sprints* del proyecto integrador, +25 h de ampliación técnica (algoritmos de búsqueda y ordenación en UD05, patrón MVC en UD09, transacciones en UD10, comparación con PostgreSQL objeto-relacional en UD11) y +16 h de pruebas y recuperaciones en horario lectivo.

**Distribución por trimestre** (sesiones y semanas: estimación): 1.º → UD01–UD04 + Sprint 1 (86 h ≈ 103 sesiones, ~11–12 semanas a 9 sesiones); 2.º → UD05–UD08 + Sprint 2 (93 h ≈ 112 sesiones, ~12–13 semanas); 3.º → UD09–UD11 + Sprint 3 (61 h ≈ 73 sesiones, ~8 semanas). El 3.er trimestre es más corto por la formación en empresa y las recuperaciones. Fechas pendientes del calendario escolar de Galicia 2026-27.

## 4. Proyecto integrador: El gestor de biblioteca

*Propuesta del docente.* Apoyo normativo: RD 405/2023, art. 8.c (aplicaciones que gestionen de forma integral la información de bases de datos) y orientaciones pedagógicas de MP0485 («la identificación de las funcionalidades aportadas por los sistemas gestores de bases de datos y su incorporación a las aplicaciones desarrolladas»; «la prueba, depuración y documentación de las aplicaciones desarrolladas») ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

### 4.1 El encargo

> **Cliente (ficticio):** una librería con un pequeño servicio de préstamo de libros, revistas y DVD para sus socios. Hoy lo gestiona con una hoja de cálculo y una libreta. Quiere una aplicación de escritorio para el mostrador que funcione sin conexión, que permita dar de alta fondos y socios, prestar y devolver, calcular multas e intercambiar el catálogo con la plataforma web de una asociación de librerías (en JSON/XML).
>
> El cliente es inventado; cualquier parecido con un comercio real es casual.

El profesorado actúa como **cliente y *product owner***: presenta el encargo en la primera semana, responde dudas de requisitos y acepta o rechaza cada versión según los criterios de aceptación.

### 4.2 Historias de usuario (extracto del *backlog*)

| ID | Historia de usuario | Criterios de aceptación | Versión |
|---|---|---|---|
| HU01 | Como **personal de mostrador** quiero ver la ficha de un libro con su fecha límite de devolución para informar al socio. | Muestra título, autor, ISBN y fecha límite = fecha de préstamo + 15 días; las constantes no están repetidas en el código. | v0.1 |
| HU02 | Como personal de mostrador quiero un menú que no se rompa si me equivoco al teclear. | Cualquier entrada no válida muestra un mensaje y vuelve a pedir el dato; ningún error termina el programa. | v0.1 |
| HU03 | Como personal de mostrador quiero registrar préstamos y que se impidan los no permitidos. | No se presta si el socio tiene multas o 3 préstamos activos; el mensaje explica el motivo; hay tests que lo demuestran. | v0.1 |
| HU04 | Como responsable quiero que el sistema valide ISBN, DNI/NIE y correo. | ISBN-13 con dígito de control correcto; DNI/NIE con letra correcta; tests con casos válidos e inválidos. | v0.2 |
| HU05 | Como responsable quiero gestionar libros, revistas y DVD con reglas de préstamo distintas. | Libro 15 días, revista 7, DVD 3; añadir un tipo nuevo no obliga a modificar el código de préstamo. | v0.2 |
| HU06 | Como responsable quiero estadísticas: más prestados, socios con retraso, fondos por género. | Resultados correctos sobre un conjunto de datos de prueba conocido. | v0.2 |
| HU07 | Como responsable quiero que los datos se guarden al cerrar y exportar/importar el catálogo en JSON y XML. | Al reiniciar se recuperan los datos; el JSON exportado se vuelve a importar sin pérdidas; el XML cumple la estructura acordada. | v0.2 |
| HU08 | Como personal de mostrador quiero una ventana con la lista de fondos, filtros y un formulario de alta. | Tabla con filtro por título y tipo; los errores de validación se muestran en un diálogo; no se bloquea la interfaz. | v1.0 |
| HU09 | Como responsable quiero que los datos estén en una base de datos y que un préstamo no deje datos a medias. | Persistencia en SQLite; el préstamo se hace en una transacción (si falla, no cambia nada). | v1.0 |
| HU10 | Como responsable técnico quiero evaluar una BD orientada a objetos como alternativa. | Misma interfaz `Repositorio`; se puede elegir JDBC u ObjectDB en la configuración; informe breve comparativo en el README. | v1.0 |

### 4.3 Forma de trabajo «como en empresa»

*Propuesta del docente*, justificada en [DEC-PROG-06](decisiones/DEC-PROG-06-control-versiones-y-flujo.md) y [DEC-PROG-08](decisiones/DEC-PROG-08-pruebas.md). En 1.º el trabajo es individual; la revisión entre iguales y los tableros compartidos se dejan para los proyectos en equipo de 2.º.

| Práctica | Cómo se aplica en el gestor de biblioteca | Desde |
|---|---|---|
| Puesta en marcha del proyecto | Aceptar la tarea de GitHub Classroom, clonar, configurar JDK/IDE/Maven, ejecutar el proyecto base y leer su README. | UD01 |
| *Issues* | El docente publica las historias de usuario como *issues*; el alumnado las cierra desde sus *commits* o PR (`Closes #3`). | UD03 |
| Commits y ramas | Commits pequeños y descriptivos; desde UD06, una rama por historia (`feature/hu05-jerarquia`). | UD01 · UD06 |
| *Pull requests* | PR con descripción y enlace a la historia; **revisión del docente** con comentarios que el alumnado resuelve; no se fusiona con la CI en rojo. | UD06 |

- **Repositorio único** por estudiante (GitHub Classroom) con `README.md` (descripción, cómo compilar y ejecutar, capturas) y `CHANGELOG.md`.
- **Pruebas automatizadas** con JUnit en cada historia (criterios de aceptación → tests).
- **Integración continua con GitHub Actions** desde UD03: cada *push* y cada *pull request* compila y ejecuta los tests.
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-java@v4
          with:
            distribution: temurin
            java-version: '25'
            cache: maven
        - run: mvn -B verify
  ```
- **Entregas por versión:** etiqueta Git y *GitHub Release* con el `.jar` en cada hito: **v0.1** (PI-1, tras UD04), **v0.2** (PI-2, tras UD08), **v1.0** (PI-3, final).

### 4.4 Incrementos por unidad

| Incremento | UD | Qué se añade | Historias | Hito |
|---|---|---|---|---|
| I1 | UD01 | Proyecto Maven `gestor-biblioteca` en GitHub, `Main` que muestra la ficha de un libro con variables, constantes y cálculos. | HU01 | |
| I2 | UD02 | Lectura por teclado (`Scanner`), fechas con `LocalDate`, normalización de títulos con `String`. | HU01 | |
| I3 | UD03 | Menú en bucle con *switch expression*, validación de entradas, `PrestamoException`, aserciones, Javadoc y primeros tests; CI activada. | HU02, HU03 | |
| I4 | UD04 | Clases `Libro`, `Socio`, `Prestamo`, `Biblioteca` en paquetes, encapsulación, contador estático, tests JUnit. | HU03 | **PI-1 · v0.1** (Sprint 1) |
| I5 | UD05 | Catálogo en array con búsqueda y ordenación; validación de ISBN-13, DNI/NIE y correo con regex. | HU04 | |
| I6 | UD06 | Jerarquía `Recurso` (abstracta) → `Libro`, `Revista`, `Dvd`; interfaz `Prestable`; composición. Ramas y revisión de código obligatorias. | HU05 | |
| I7 | UD07 | `List`/`Map`/`Set`; `Repositorio<T, ID>` genérico; estadísticas con *streams*. | HU06 | |
| I8 | UD08 | Persistencia en CSV, exportación/importación JSON y XML; informes con formato. | HU07 | **PI-2 · v0.2** (Sprint 2) |
| I9 | UD09 | Interfaz JavaFX: tabla, filtros, formulario y diálogos. | HU08 | |
| I10 | UD10 | `RepositorioJdbc` sobre SQLite; transacción en el préstamo. | HU09 | |
| I11 | UD11 | `RepositorioObjectDb` con entidades JPA y JPQL; selector de persistencia; informe comparativo. | HU10 | **PI-3 · v1.0** (Sprint 3) |

La interfaz `Repositorio<T, ID>` (UD07) es la pieza clave: permite pasar de memoria a fichero, JDBC u ObjectDB sin tocar la GUI, y hace visible para qué sirven las interfaces y la composición (RA7.i, RA7.j).

### 4.5 Evaluación de los hitos

**Calificación (basada en RA/CE).** Cada hito se califica con una rúbrica común: historias aceptadas según sus criterios (40 %), calidad del código y pruebas (25 %), uso del flujo de trabajo — *issues*, ramas, PR, CI verde, *release* — (15 %) y defensa oral presencial (20 %). Cada criterio de la rúbrica indica a qué CE alimenta, según la tabla 5.3; la nota del hito solo cuenta a través de esos CE.

## 5. Evaluación y calificación

> Fuente de lo normativo: la evaluación se refiere a los resultados de aprendizaje y criterios de evaluación del RD 405/2023, anexo I, MP0485 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). El número de convocatorias, la pérdida de evaluación continua y los plazos los fija la normativa de evaluación de FP de Galicia y el reglamento del centro (pendiente de enlazar).
>
> *Propuesta del docente:* todo lo demás de este apartado (pesos, instrumentos, porcentajes y procedimientos de recuperación).

### 5.1 Principios

- Evaluación **continua y por resultados de aprendizaje**. Cada RA se califica de 0 a 10 a partir de sus CE.
- **Nota del módulo = media ponderada de los RA** con los pesos de la tabla 5.2, **siempre que cada RA tenga una nota ≥ 5**. Si algún RA es < 5, el módulo no se supera y la nota que figura es la media ponderada con un máximo de 4.
- Cada CE se evalúa al menos con un instrumento; las rúbricas indican qué CE mide cada criterio. La nota de un RA es la media ponderada de sus instrumentos (tabla 5.3).
- Autoría: se puede pedir defensa oral de cualquier entrega. Una entrega cuya autoría no se pueda defender se califica con 0 en los CE afectados. El uso de asistentes de IA se permite solo cuando el enunciado lo indique y debe declararse en el `README` de la entrega.

### 5.2 Ponderación de los RA

Horas de referencia: las de las UD que trabajan cada RA (sin *sprints*), sobre 226 h.

| RA | Horas aprox. | Peso | Justificación |
|---|---|---|---|
| RA1 | 16 | 7 % | Conocimientos básicos que se vuelven a evaluar de forma indirecta en todo lo demás; peso bajo para no penalizar dos veces. |
| RA2 | 16 | 7 % | Uso de clases predefinidas; transversal al resto del curso. |
| RA3 | 26 | 12 % | Control de flujo, excepciones y depuración: base de cualquier programa. |
| RA4 | 28 (UD04 + parte de UD06) | 12 % | Núcleo de la POO. |
| RA5 | 32 (parte de UD08 + UD09) | 14 % | Consola, ficheros y GUI: tres bloques técnicos distintos. |
| RA6 | 52 (UD05, UD07, parte de UD08) | 20 % | Mayor carga horaria; concentra contenidos nuevos del RD 405/2023 (genericidad, regex, intercambio de datos, operaciones agregadas). |
| RA7 | 20 | 10 % | Diseño de jerarquías e interfaces. |
| RA8 | 16 | 8 % | Persistencia de objetos; se apoya en lo aprendido en RA9. |
| RA9 | 20 | 10 % | Acceso a datos relacional; base de Acceso a datos en 2.º. |
| **Total** | **226** | **100 %** | Pesos aproximadamente proporcionales a las horas, corregidos por relevancia profesional. |

### 5.3 Instrumentos y peso dentro de cada RA

| Instrumento | Descripción | RA1–RA7, RA9 | RA8 |
|---|---|---|---|
| **Prueba práctica en el aula (PR)** | Ejercicio individual y presencial en los PC del aula (2–3 sesiones), con red limitada a la documentación oficial de Java y a GitHub para la entrega; se corrige con tests y rúbrica. PR1 (RA1–RA3), PR2 (RA4, RA6.a/g, RA7), PR3 (RA6, RA5.a–e), PR4 (RA5.f–h, RA9). | 30 % | — |
| **Prácticas evaluables (Pn)** | Una por UD. Se empiezan y se avanzan en el aula con el profesorado resolviendo dudas, y se terminan en casa; entrega por GitHub Classroom con rúbrica ligada a CE. | 35 % | 45 % |
| **Proyecto integrador (PI-1, PI-2, PI-3)** | Hitos con defensa oral presencial (demostración + pregunta sobre el código). PI-1 → RA1–RA4; PI-2 → RA5.a–e, RA6, RA7; PI-3 → RA5.f–h, RA8, RA9. | 25 % | 35 % |
| **Katas, cuestionarios y observación sistemática** | Katas de inicio de sesión con tests, cuestionarios cortos en el aula (p. ej. características de las BDOO, RA8.a) y registro de observación del trabajo en clase: uso del depurador, del IDE y de Git (RA1.c, RA2.i, RA3.f), programación en pareja. | 10 % | 20 % |

**Registro de observación.** Hoja por grupo con los CE observables en el aula (crear y configurar proyectos, depurar con puntos de ruptura, usar Scene Builder, hacer *commits* significativos) y escala *conseguido / en proceso / no conseguido*. Alimenta el 10 % de katas y observación y sirve de evidencia ante reclamaciones.

### 5.4 Recuperación

- **Durante el curso:** cada PR tiene una recuperación al inicio del trimestre siguiente, **solo de los RA no superados**. Las prácticas con nota < 5 se pueden reentregar una vez, corregidas, en dos semanas (nota máxima 7).
- **Final:** prueba práctica de los RA pendientes + entrega de las prácticas pendientes. Se conservan las notas de los RA superados.
- **Módulo pendiente o pérdida de evaluación continua:** plan de recuperación individual con las prácticas de los RA no superados y una prueba final por RA, en las convocatorias y condiciones que fije la normativa gallega de evaluación.
- **Mejora de nota:** se puede repetir la prueba de cualquier RA superado; prevalece la nota más alta.

### 5.5 Requisitos mínimos de las entregas

Las rúbricas tienen tres niveles por criterio (Excelente 10–9, Adecuado 8–5, Insuficiente < 5). Para corregir una entrega de código: **compila**, se ejecuta con `mvn test` o desde el IDE sin pasos manuales no documentados y está en el repositorio de Classroom antes de la fecha límite. Retraso: −10 % por día lectivo, hasta 3 días.

## 6. Matriz CE × UD

> Fuente de los códigos de CE: RD 405/2023, anexo I, MP0485, criterios de evaluación de RA1–RA9 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). La etiqueta de cada fila es un **resumen propio**; el texto literal está en [curriculo-boe.md](curriculo-boe.md) y en la tabla de CE de cada UD.
>
> *Propuesta del docente:* la asignación de CE a unidades.

«Se trabaja y evalúa en»: unidades donde el CE se trabaja y tiene evaluación propia. «Se refuerza en»: unidades donde se vuelve a trabajar o se refuerza.

| CE | Se trabaja y evalúa en | Se refuerza en |
|---|---|---|
| **RA1.a** Bloques de un programa | UD01 | — |
| RA1.b Proyectos de desarrollo | UD01 | UD02 |
| RA1.c Entornos integrados | UD01 | UD02, UD03 |
| RA1.d Tipos de variables | UD01 | — |
| RA1.e Crear y usar variables | UD01 | — |
| RA1.f Constantes y literales | UD01 | — |
| RA1.g Operadores | UD01 | UD03 |
| RA1.h Conversiones de tipo | UD01 | UD02 |
| RA1.i Comentarios | UD01 | UD03 |
| **RA2.a** Fundamentos POO | UD02 | UD04 |
| RA2.b Programas simples | UD02 | — |
| RA2.c Instanciar clases predefinidas | UD02 | — |
| RA2.d Métodos y propiedades | UD02 | — |
| RA2.e Llamadas a métodos estáticos | UD02 | UD04 |
| RA2.f Parámetros | UD02 | — |
| RA2.g Librerías de objetos | UD02 | UD08 |
| RA2.h Constructores | UD02 | UD04 |
| RA2.i IDE: crear y compilar | UD02 | — |
| **RA3.a** Selección | UD03 | — |
| RA3.b Repetición | UD03 | — |
| RA3.c Sentencias de salto | UD03 | — |
| RA3.d Control de excepciones | UD03 | UD08, UD10 |
| RA3.e Programas con estructuras de control | UD03 | — |
| RA3.f Probar y depurar | UD03 | UD04, UD06 |
| RA3.g Comentar y documentar | UD03 | UD04 |
| RA3.h Crear excepciones | UD03 | UD04 |
| RA3.i Aserciones | UD03 | — |
| **RA4.a** Sintaxis y estructura de clase | UD04 | — |
| RA4.b Definir clases | UD04 | — |
| RA4.c Propiedades y métodos | UD04 | — |
| RA4.d Constructores | UD04 | — |
| RA4.e Instanciar clases propias | UD04 | — |
| RA4.f Visibilidad | UD04 | — |
| RA4.g Clases heredadas | UD06 | UD04 |
| RA4.h Métodos estáticos | UD04 | — |
| RA4.i Conjuntos y librerías de clases | UD04 | UD06 |
| **RA5.a** Consola E/S | UD08 | UD02, UD03 |
| RA5.b Formatos de visualización | UD08 | UD02 |
| RA5.c Posibilidades E/S y librerías | UD08 | — |
| RA5.d Ficheros: almacenar y recuperar | UD08 | — |
| RA5.e Métodos de acceso a ficheros | UD08 | — |
| RA5.f Herramientas del IDE para GUI | UD09 | — |
| RA5.g Controladores de eventos | UD09 | — |
| RA5.h GUI para E/S | UD09 | UD10 |
| **RA6.a** Arrays | UD05 | UD07 |
| RA6.b Librerías de tipos avanzados | UD07 | UD05 |
| RA6.c Listas | UD07 | — |
| RA6.d Iteradores | UD07 | — |
| RA6.e Características de colecciones | UD07 | — |
| RA6.f Clases y métodos genéricos | UD07 | — |
| RA6.g Expresiones regulares | UD05 | — |
| RA6.h Clases para documentos de intercambio | UD08 | — |
| RA6.i Manipular documentos de intercambio | UD08 | — |
| RA6.j Operaciones agregadas | UD07 | UD08, UD10 |
| **RA7.a** Herencia, superclase, subclase | UD06 | — |
| RA7.b Bloquear/forzar herencia | UD06 | — |
| RA7.c Constructores en la herencia | UD06 | — |
| RA7.d Sobrescritura | UD06 | — |
| RA7.e Diseñar jerarquías | UD06 | — |
| RA7.f Probar y depurar jerarquías | UD06 | — |
| RA7.g Programas con jerarquías | UD06 | UD07 |
| RA7.h Comentar y documentar | UD06 | — |
| RA7.i Escenarios de interfaces | UD06 | UD07, UD10 |
| RA7.j Herencia vs composición | UD06 | — |
| **RA8.a** Características BDOO | UD11 | — |
| RA8.b Aplicación con lenguajes OO | UD11 | — |
| RA8.c Instalar SGBDOO | UD11 | — |
| RA8.d Métodos de gestión de la información | UD11 | — |
| RA8.e Crear BD y estructuras | UD11 | — |
| RA8.f Almacenar objetos | UD11 | — |
| RA8.g Recuperar, actualizar, eliminar | UD11 | — |
| RA8.h Tipos estructurados, compuestos y relacionados | UD11 | — |
| **RA9.a** Características y métodos de acceso | UD10 | — |
| RA9.b Conexiones | UD10 | — |
| RA9.c Almacenar | UD10 | — |
| RA9.d Recuperar y mostrar | UD10 | — |
| RA9.e Borrados y modificaciones | UD10 | — |
| RA9.f Aplicaciones que muestren información | UD10 | — |
| RA9.g Aplicaciones de gestión | UD10 | — |

**Cobertura:** los 79 CE (RA1: 9, RA2: 9, RA3: 9, RA4: 9, RA5: 8, RA6: 10, RA7: 10, RA8: 8, RA9: 7) tienen al menos una UD en la columna «Se trabaja y evalúa en» → **100 %**.

## 7. Metodología

> Fuente de las líneas de actuación: RD 405/2023, anexo I, MP0485, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): interpretación y aplicación de los principios de la POO; evaluación, selección y utilización de herramientas y lenguajes OO; uso de las características de lenguajes y entornos; integración de las funcionalidades de los SGBD; prueba, depuración y documentación.
>
> *Propuesta del docente:* las estrategias concretas que siguen.

- **Organización de las sesiones (modalidad presencial).** 9 sesiones semanales en el aula de informática, agrupadas en bloques dobles cuando el horario lo permite. Estructura de un bloque: kata (15 min) → explicación con *live coding* (≤ 20 min) → actividad guiada en pareja (30–40 min) → trabajo en la práctica de la UD con el profesorado atendiendo dudas puesto a puesto. Las prácticas se lanzan y se avanzan en el aula; las pruebas prácticas y las defensas son siempre presenciales.
- **Programación diaria.** Cada sesión empieza con una **kata** corta con tests ya escritos, en un repositorio de katas del grupo.
- **Live coding y lectura de código.** El profesorado programa en directo cometiendo y corrigiendo errores reales; el alumnado predice la salida de fragmentos antes de ejecutarlos.
- **Programación en pareja** en las actividades de clase, con rotación de roles conductor/navegante cada 15 minutos.
- **Tests como especificación.** Desde UD03 las prácticas incluyen tests JUnit que hay que pasar; desde UD04 el alumnado escribe los suyos. GitHub Classroom ejecuta `mvn test` en cada `push`.
- **Prácticas profesionales de forma progresiva** (*propuesta del docente*, ver [DEC-PROG-06](decisiones/DEC-PROG-06-control-versiones-y-flujo.md)): Git individual con *commits* pequeños desde UD01 → integración continua con JUnit y GitHub Actions desde UD03 → ramas y *pull requests* con revisión del docente desde UD06 → *releases* versionadas en los *sprints*. La revisión entre iguales y el trabajo en equipo quedan para 2.º.
- **Proyecto integrador incremental** (apartado 4) con *sprints* propios: da sentido a cada unidad y obliga a refactorizar código propio.
- **Uso responsable de la IA:** se trabaja de forma explícita en UD03 (depurar y probar código generado) y se regula en cada enunciado.
- **Materiales:** los apuntes de cada UD de este repositorio y la documentación oficial (dev.java y la API de Java SE 25).
- Propuesta complementaria fuera del módulo: [FP·onboard](../../fponboard/README.md)

## 8. Atención a la diversidad

*Propuesta del docente,* a concretar con el departamento de orientación según la normativa gallega de atención a la diversidad en FP.

- **Niveles en las actividades:** cada práctica tiene una parte obligatoria (mínimos de los CE) y retos opcionales (★).
- **Refuerzo:** katas adicionales con solución comentada, tutorías y parejas de nivel mixto.
- **Adaptaciones de acceso** (no significativas, porque los RA son enseñanzas mínimas del título): tiempo extra en las pruebas, temas de alto contraste y tamaño de fuente en el IDE, lector de pantalla y enunciados accesibles.
- **Alumnado con experiencia previa:** puede proponer una variante del proyecto (p. ej. gestor de inventario o de un club deportivo) que cubra los mismos CE.
