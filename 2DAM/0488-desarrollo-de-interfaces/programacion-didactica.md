# Programación didáctica · MP0488 Desarrollo de interfaces

> Convenciones ([Normativo], [Propuesta del docente]): ver [Cómo leer este material](README.md#como-leer-este-material).

## Resumen

> **[Propuesta del docente]**, apoyada en los datos normativos del apartado 1.

**Enfoque.** El módulo se organiza en torno al ciclo de vida completo de la capa de presentación de una aplicación de gestión: **diseñar → construir → enriquecer → documentar → distribuir → probar**. Se imparte de forma presencial, con demostraciones en directo y práctica guiada en el puesto. Toda la teoría se aplica enseguida a un mismo producto. Las **191 h** que fija Galicia se reparten en **9 unidades**, agrupadas en los dos bloques de las unidades formativas gallegas de referencia (MP0488_12 Interfaces gráficos de usuario, 142 h; MP0488_22 Despliegue de aplicaciones, 49 h). Entre todas cubren los **61 criterios de evaluación** de los 8 RA del RD 405/2023, incluido el RA2 (interfaces naturales), que no existía en el RD 450/2010.

**Stack.** Java 25 LTS y **JavaFX 25**, las mismas versiones que en Programación de 1.º: FXML con Scene Builder, CSS, propiedades y *binding*, arquitectura MVVM y SQLite. Componentes propios empaquetados con Maven y probados con JUnit 5 y TestFX. Informes con **JasperReports 7**. Ayuda en Markdown publicada con **MkDocs** y F1 contextual. Distribución con **jpackage**, **Inno Setup** y firma con `signtool`. Pruebas con GitHub Actions, JMeter, VisualVM/JFR y OWASP Dependency-Check. Para el RA2 se usa un enfoque híbrido justificado: voz sin conexión con **Vosk** dentro de la aplicación Java, y **MediaPipe**, **Teachable Machine** y **AR.js** en web para gestos, cuerpo y realidad aumentada. Todo es software libre o gratuito.

**Proyecto integrador.** El **gestor de taller** responde al encargo de un cliente ficticio pero verosímil, un taller mecánico, y se trabaja como en una empresa. Parte de historias de usuario, pasa por un prototipo validado con test de usuario y un *design system* básico, y se desarrolla con *pull requests* revisadas, tablero de *issues*, CI con pruebas, *releases* con instalador firmado y manual publicado. Cada equipo de 2–3 personas desarrolla su el gestor de taller, una aplicación de escritorio de gestión de clientes, vehículos y órdenes. La calificación es individual por CE. Crece en 9 hitos versionados: interfaz, diseño accesible, CRUD enlazado a datos, biblioteca de componentes, informes, órdenes por voz, ayuda y manuales, instalador firmado y plan de pruebas. Al final del curso el alumnado tiene un **producto instalable y documentado** que puede enseñar en su portfolio.

**Evaluación.** Es **criterial por RA**, con pesos justificados (RA1 20 %, RA3 y RA4 15 %, RA5 12 %, RA2, RA7 y RA8 10 %, RA6 8 %). Hay tres tipos de instrumento:

1. Prácticas con rúbricas ligadas a cada CE y defensa presencial.
2. Pruebas prácticas en el aula.
3. Observación sistemática con listas de cotejo.

La nota del módulo es la media ponderada de los RA y **cada RA debe ser ≥ 5**. Se recupera por RA, conservando los RA superados.

## 1. Marco normativo y datos del módulo

Datos del módulo: ver la [ficha](README.md).

> **[Normativo]** Marco general de ordenación del sistema de FP: LO 3/2022 ([BOE](https://www.boe.es/eli/es/lo/2022/03/31/3)) y RD 659/2023 ([BOE](https://www.boe.es/eli/es/rd/2023/07/18/659)). RA, CE, contenidos básicos y líneas de actuación: texto literal en [curriculo-boe.md](curriculo-boe.md), fuente RD 405/2023, anexo I, módulo 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

> **Nota (comparación propia de ambos textos):** el RD 450/2010 tenía un RA2 sobre interfaces a partir de documentos XML. El RD 405/2023 lo sustituye por el RA2 actual (interfaces naturales) y lleva los lenguajes descriptivos a los contenidos de «Generación de interfaces de usuario». Por eso el material elaborado para el RD 450/2010 no cubre el RA2.

> **Pendiente:** cuando se publique el decreto gallego que adapte el currículo al RD 405/2023, comprobar si mantiene las unidades formativas y si amplía contenidos. Revisar también la normativa autonómica de evaluación (redondeo, convocatorias, pérdida de la evaluación continua) y ajustar los apartados 5.4 y 5.5.

### 1.1 Contribución del módulo al título

> **[Normativo]** Las orientaciones pedagógicas del módulo describen la función de desarrollador o desarrolladora de aplicaciones multiplataforma: «El desarrollo de interfaces de usuario. La creación de informes. La preparación de aplicaciones para su distribución. La elaboración de los elementos de ayuda. La evaluación del funcionamiento de aplicaciones.»
> Fuente: RD 405/2023, anexo I, módulo 0488, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
>
> **[Normativo]** Objetivos generales y competencias a los que contribuye el módulo: letras d), e), f), g), h), i), j), k), l), m), r), s), t) y w). Fuente: ídem, orientaciones pedagógicas. Su alineación con las unidades está en el apartado 2.2.

> **[Propuesta del docente]** Coordinación con otros módulos.

- **0485 Programación (1.º):** Java, POO, colecciones, *streams*, excepciones y JUnit. Se da por sabido y se amplía.
- **0484 Bases de datos (1.º) y 0486 Acceso a datos (2.º):** el proyecto usa JDBC con SQLite. Aquí solo se trata la parte que conecta la base de datos con la vista; se coordina con Acceso a datos para no duplicar contenidos sobre persistencia.
- **0489 PMDM (2.º):** allí se trabajan las interfaces móviles y aquí el escritorio. Las interfaces naturales (UD06) pueden reutilizarse en PMDM con MediaPipe para Android.
- **Proyecto intermodular:** el gestor de taller puede servirle de base.

### 1.2 Prospectiva del sector y orientación a proyectos reales

> **[Normativo]** El RD 405/2023 da nueva redacción al art. 8 («Prospectiva del título en el sector o sectores») del RD 450/2010. Letras relacionadas con este módulo (citas literales parciales; el texto completo está en el BOE):
>
> - **c)** «Cada vez es más necesario para las empresas el acceso a información contenida en bases de datos…»
> - **e)** «Una característica fundamental de este perfil contemplaría la integración de contenidos gráficos y componentes multimedia…» (continúa con los interfaces gráficos de usuario interactivos).
> - **f)** «Igualmente, en el desarrollo de aplicaciones no debe olvidarse la importancia que ha adquirido…» (continúa con la usabilidad y el uso de componentes visuales).
> - **l)** «El consumo generalizado de dispositivos inteligentes, el auge de la inteligencia artificial (IA) y la realidad aumentada…»
>
> Fuente: RD 405/2023, art. segundo, apdo. cuatro, que modifica el art. 8 del RD 450/2010 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
>
> **[Normativo]** «Las actividades profesionales asociadas a esta función se aplican en el desarrollo de software de gestión multiplataforma.»
> Fuente: RD 405/2023, anexo I, módulo 0488, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

> **[Propuesta del docente]** De estas referencias salen tres decisiones de la programación:
>
> 1. El proyecto integrador es **software de gestión con base de datos** (letra c y orientaciones pedagógicas).
> 2. La usabilidad y los componentes visuales son transversales en todo el curso (letras e y f).
> 3. La IA y la RA se trabajan con herramientas actuales en la UD06 (letra l).
>
> El proyecto se lleva a cabo **como un encargo profesional** (apartado 4.2).

## 2. Decisiones tecnológicas

> **[Propuesta del docente]** La norma **no impone ninguna tecnología concreta**: pide tipos de herramientas. Cada elección (tecnología principal y alternativas evaluadas) se documenta en un registro de decisión; el resumen está en el [índice de decisiones](decisiones/README.md).

**Los contenidos básicos no imponen una tecnología concreta** (lectura propia del RD 405/2023): hablan de herramientas, librerías y lenguajes descriptivos en general, sin citar productos. Por eso el módulo puede impartirse con distintas tecnologías.

### 2.1 Cómo se adapta el módulo si el centro usa otra tecnología

La secuencia, el proyecto integrador, la matriz CE × UD, la evaluación y las rúbricas **no dependen de la tecnología**: hablan de editor visual, lenguaje descriptivo, componentes, informes, instalador y plan de pruebas. Para cambiar de tecnología basta con sustituir la tecnología principal de cada registro del [índice de decisiones](decisiones/README.md) y los fragmentos de código de cada unidad. Cada unidad incluye notas **«Alternativa»** con el equivalente en otra tecnología. Correspondencias principales:

| Concepto en este material | C# / WPF o .NET MAUI | Compose Multiplatform | Electron | Flutter | Qt |
|---|---|---|---|---|---|
| FXML + Scene Builder | XAML + diseñador de Visual Studio | `@Composable` + vista previa | HTML + herramientas web | Widgets + Flutter Inspector | QML/.ui + Qt Designer |
| Propiedades y *binding* | `INotifyPropertyChanged`, `{Binding}` | `State`, `StateFlow` | Framework (Vue/React) | `ChangeNotifier`, Riverpod | `Q_PROPERTY`, señales y *slots* |
| Control propio | `UserControl`/`CustomControl` | Función `@Composable` | Web Component | `StatelessWidget`/`StatefulWidget` | `QWidget`/componente QML |
| JasperReports | RDLC, FastReport | JasperReports (JVM) | jsPDF, pdfmake | paquete `pdf` | QTextDocument, KD Reports |
| jpackage + Inno Setup | MSIX, ClickOnce, WiX | `compose.desktop` (genera MSI/DMG/DEB) | electron-builder | `flutter build windows` + MSIX | `windeployqt` + Qt Installer Framework |
| JUnit + TestFX | xUnit + FlaUI | `compose-ui-test` | Playwright | `flutter_test` + `integration_test` | Qt Test |

Si se cambia, se recomienda mantener **un único lenguaje en todo el curso** y comprobar que la tecnología elegida tiene editor visual o vista previa y lenguaje descriptivo, porque los CE RA1.b–f los exigen.

> **Requisito de entorno (opción principal):** JDK 25 LTS, el mismo que en Programación de 1.º (ver DEC-DI-01), con JavaFX 25 como dependencia de Maven (`org.openjfx:javafx-controls:25.0.x`). Para empaquetar (UD08), los *jmods* de JavaFX 25 de Gluon o un JDK que ya incluya JavaFX (Liberica Full, Zulu FX).

### 2.2 Alineación con los objetivos generales y competencias

> **[Normativo]** (columnas «Letra» y «Resumen»). La lista de letras procede del RD 405/2023, anexo I, módulo 0488, orientaciones pedagógicas. El texto de cada letra está en el RD 405/2023, art. 9 (objetivos generales) y art. 5 (competencias profesionales, personales y sociales), que dan nueva redacción a esos artículos del RD 450/2010 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). La columna «Resumen» es una **paráfrasis abreviada**; el texto completo hay que consultarlo en el BOE.
> **[Propuesta del docente]** (columnas «Cómo se atiende» y «UD»).

| Letra | Resumen del objetivo general (art. 9) / competencia (art. 5) | Cómo se atiende | UD |
|---|---|---|---|
| d) | Instalar y configurar módulos y complementos para gestionar entornos de desarrollo | Configurar el IDE, Maven, JavaFX, Scene Builder (importar el JAR de componentes), Jaspersoft Studio y CI | UD01, UD04, UD05, UD09 |
| e) | Seleccionar y emplear lenguajes, herramientas y librerías para aplicaciones multiplataforma con acceso a bases de datos | Java + JavaFX, elegido tras una comparativa razonada (RA1.a); SQLite por JDBC | UD01, UD03 |
| f) | Gestionar la información con sistemas de formularios e informes | Formularios FXML enlazados a datos y JasperReports incrustado | UD03, UD05 |
| g) | Integrar contenidos gráficos y componentes multimedia | Gráficos en informes, iconografía y CSS; cámara y micrófono en interfaces naturales | UD02, UD05, UD06 |
| h) | Desarrollar interfaces gráficas interactivas con la usabilidad adecuada, empleando componentes visuales | Scene Builder, componentes propios y criterios de ISO 9241 y WCAG 2.2 | UD01–UD04 |
| i) | Técnicas, motores y entornos para juegos y aplicaciones de entretenimiento y educación | Interacción natural con aprendizaje automático y RA web con A-Frame | UD06 |
| j) | Técnicas y entornos para dispositivos móviles y otros dispositivos inteligentes | Los prototipos web de la UD06 funcionan en el móvil; coordinación con PMDM | UD06 |
| k) | Crear ayudas generales y sensibles al contexto | MkDocs con búsqueda y F1 contextual | UD07 |
| l) | Crear tutoriales y manuales de usuario, instalación, configuración y administración | Manuales en MkDocs y tutorial en vídeo | UD07 |
| m) | Empaquetar aplicaciones en paquetes autoinstalables con asistentes | jpackage e Inno Setup con asistente personalizado y modo desatendido | UD08 |
| r) | Verificar los componentes desarrollados y completar un plan de pruebas | JUnit 5/TestFX desde UD04 y plan de pruebas completo | UD04, UD09 |
| s) | Desplegar y distribuir aplicaciones verificando su funcionamiento | Firma, GitHub Releases, winget/Microsoft Store y pruebas sobre el producto instalado | UD08, UD09 |
| t) | Relación profesional, comunicación y trabajo en equipo | Revisión entre iguales, tests de usabilidad cruzados, *issues* y *pull requests* | UD02, UD09 |
| w) | Innovación y actualización ante los cambios tecnológicos | RA2 con IA aplicada, versiones LTS actuales y uso responsable de IA generativa | UD06, todas |

## 3. Secuencia y temporalización

> **[Normativo]** 191 h y 7 sesiones semanales en 2.º. Fuente: Xunta, catálogo FP, ciclo D3IFC000200 ([edu.xunta.gal/fp/ciclo/D3IFC000200](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). Las unidades formativas MP0488_12 y MP0488_22 proceden del Decreto 105/2011 (DOG 8/6/2011), anexo VII ([DOG](https://www.xunta.gal/dog/Publicados/2011/20110608/AnuncioC3F1-250511-2127_es.html)).
> **[Propuesta del docente]** El reparto en unidades y horas, el orden y la ubicación del RA2 en el primer bloque. El RA2 no existía en 2011 y se coloca aquí por afinidad, porque también trata de generación de interfaces.

Con 191 h, unas 229 sesiones de 50 minutos, y 7 sesiones semanales salen unas **33 semanas lectivas**. La distribución exacta depende del calendario 2026-27 y del periodo de formación en empresa.

> **Propuesta del docente (estimación).** Las horas del currículo son de 60 minutos y las sesiones del centro de 50 minutos. Por eso, sesiones = horas × 60 / 50, redondeado por UD y ajustado para que el total sea 229. 191 h equivalen a **229 sesiones**, unas **33 semanas** a 7 sesiones por semana. Pendiente de confirmar con el centro la equivalencia hora/sesión y el calendario de 2.º, que incluye la formación en empresa.

| Bloque (estructura gallega de referencia) | UD | Título | RA | Horas | Sesiones de 50 min (estimación) | Semanas aprox. (7 sesiones/sem) |
|---|---|---|---|---|---|---|
| **MP0488_12 Interfaces gráficos de usuario** | [UD01](unidades/UD01-javafx-fxml-scene-builder/README.md) | Interfaces gráficas con JavaFX, FXML y Scene Builder | RA1 | 20 | 24 | 1–4 |
| | [UD02](unidades/UD02-usabilidad-accesibilidad/README.md) | Diseño de interfaces: usabilidad, accesibilidad, wireframes y mockups | RA4 | 20 | 24 | 4–7 |
| | [UD03](unidades/UD03-eventos-enlace-datos/README.md) | Eventos, enlace a datos y arquitectura MVVM | RA1, RA4 | 32 | 39 | 7–13 |
| | [UD04](unidades/UD04-componentes-visuales/README.md) | Componentes visuales propios | RA3 | 24 | 29 | 13–17 |
| | [UD05](unidades/UD05-informes/README.md) | Informes con JasperReports | RA5 | 22 | 26 | 17–21 |
| | [UD06](unidades/UD06-interfaces-naturales/README.md) | Interfaces naturales de usuario | RA2 | 24 | 29 | 21–25 |
| | | *Subtotal* | | *142* | *171* | |
| **MP0488_22 Despliegue de aplicaciones** | [UD07](unidades/UD07-documentacion-ayudas/README.md) | Documentación de aplicaciones y sistemas de ayuda | RA6 | 15 | 18 | 25–27 |
| | [UD08](unidades/UD08-distribucion/README.md) | Distribución de aplicaciones | RA7 | 17 | 20 | 28–30 |
| | [UD09](unidades/UD09-pruebas/README.md) | Pruebas de aplicaciones | RA8 (+RA4.i) | 17 | 20 | 30–33 |
| | | *Subtotal* | | *49* | *58* | |
| | | **Total** | | **191** | **229** | |

Las horas de cada unidad incluyen las pruebas prácticas en el aula y las defensas.

Por qué este orden:

1. **UD01 → UD02 → UD03.** Primero se aprende a manejar la herramienta (UD01). Después se diseña el gestor de taller con criterio (UD02) y por último se implementa con datos reales (UD03). Así el diseño de la aplicación se hace antes de programarla, y no al revés.
2. **UD04** necesita propiedades, eventos y *binding* (UD03). Además introduce JUnit/TestFX, que se retoman en UD09.
3. **UD05** necesita la base de datos poblada (UD03).
4. **UD06** va cuando la aplicación ya es estable. Así se le pueden añadir órdenes por voz sin bloquear lo anterior.
5. **UD07 → UD08 → UD09** siguen el ciclo de entrega: documentar, empaquetar con la ayuda incluida y probar el producto instalado.

Las horas por encima del mínimo estatal se dedican a **práctica guiada en el aula** y a **ampliaciones con profundidad profesional**: internacionalización y temas en UD03, `Control` + `Skin` y persistencia del componente en UD04, subinformes y parámetros en UD05, entrenamiento de modelos propios en UD06, CI/CD del instalador en UD08 y pruebas de sistema en UD09.

## 4. Metodología

> **[Normativo]** El currículo indica líneas de actuación: «La utilización de herramientas de diseño de interfaces de usuario», «… para el diseño de componentes visuales», «… de diseño y generación de informes», «La aplicación de criterios de usabilidad», «El diseño y ejecución de pruebas», «La instalación de aplicaciones», «El uso de herramientas de generación de ayudas, guías, tutoriales y manuales».
> Fuente: RD 405/2023, anexo I, módulo 0488, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
> **[Propuesta del docente]** Todo lo que sigue.

### 4.1 Organización presencial

El módulo se imparte en un aula con un PC por estudiante, con 7 sesiones semanales agrupadas en bloques de 2 sesiones siempre que el horario lo permita. Cada bloque sigue esta estructura:

1. Explicación breve con demostración en el proyector (15–25 min).
2. Práctica guiada en el puesto, mientras el o la docente pasa por las mesas y resuelve dudas.
3. Cierre de 5 minutos con lo que se ha conseguido, los problemas encontrados y la siguiente tarea.

- Las **prácticas evaluables se empiezan y se avanzan en el aula**. Al menos el 60 % de su tiempo estimado está dentro del horario lectivo, de modo que el trabajo en casa es solo de acabado. Cada práctica termina con una **defensa presencial** de 5–10 minutos en el puesto.
- **Aprendizaje basado en proyectos.** Cada concepto se aplica enseguida al gestor de taller.
- **Repositorio Git por equipo** (GitHub Classroom o similar), con flujo profesional (ver 4.2). El historial de *commits*, *pull requests* y revisiones sirve como evidencia de autoría y de trabajo en equipo.
- **Revisión entre iguales** en usabilidad (UD02) y pruebas (UD09).
- **Uso responsable de IA generativa.** Se permite como apoyo. El alumnado declara su uso en el README de cada entrega y debe saber explicar todo el código en la defensa.

### 4.2 Proyecto integrador el gestor de taller: un encargo como en empresa

**El encargo.** El cliente (**empresa ficticia**) es un taller mecánico de cinco personas. Hoy gestiona clientes, vehículos y órdenes de reparación con hojas de cálculo y papel. Encarga una aplicación de escritorio para Windows, con posibilidad de Linux, que funcione sin conexión. El alumnado se organiza en **equipos de desarrollo de 2–3 personas**, estables durante todo el curso y cada uno con su propio repositorio. Las tareas de equipo (PR, revisiones, tablero) se reparten de forma que **cada CE se pueda evaluar de manera individual**: cada persona es responsable de historias concretas, sus contribuciones se ven en el historial y la defensa es individual. El o la docente hace de **cliente/product owner**: entrega el documento de encargo, responde dudas en «reuniones» de 10 minutos y acepta o rechaza cada entrega según la definición de hecho.

**Requisitos en historias de usuario** (extracto; el *backlog* completo, de unas 25 historias, se entrega en la UD01):

| ID | Historia | Criterios de aceptación (resumen) | UD |
|---|---|---|---|
| HU01 | Como recepcionista, quiero dar de alta un cliente con su NIF para no duplicar fichas. | NIF validado; aviso claro si ya existe | UD03 |
| HU04 | Como recepcionista, quiero buscar un vehículo por matrícula mientras escribo para atender rápido en el mostrador. | Filtro en vivo; respuesta < 1 s con 10 000 vehículos | UD03, UD09 |
| HU08 | Como mecánico, quiero añadir líneas de mano de obra y piezas a una orden para que el total se calcule solo. | Total con IVA recalculado al editar | UD03 |
| HU12 | Como gerente, quiero un informe mensual de facturación por tipo de trabajo, con gráfico, para decidir precios. | Filtro por fechas; totales; gráfico; PDF | UD05 |
| HU15 | Como mecánico con las manos ocupadas, quiero consultar el estado de una orden por voz. | Órdenes de voz en castellano, sin conexión | UD06 |
| HU18 | Como usuario nuevo, quiero pulsar F1 y ver la ayuda de la pantalla en la que estoy. | Ayuda contextual por pantalla | UD07 |
| HU21 | Como responsable de informática, quiero instalar la aplicación en todos los PC sin intervención. | Instalación desatendida; desinstalación limpia | UD08 |
| HU23 | Como gerente, quiero que la aplicación no exponga los datos de clientes. | Sin inyección SQL; dependencias sin vulnerabilidades críticas | UD09 |

**Diseño validado con usuarios.** Hay un prototipo en Penpot o Figma con un ***design system* básico** (*tokens* de color y tipografía, componentes con estados y rejilla) y un **test de usuario** con al menos 3 personas ajenas al proyecto antes de programar (UD02), que se repite sobre la aplicación final (UD09).

**Forma de trabajo profesional**, la misma que en un equipo real:

- **Git con GitHub Flow:** una rama por historia y ***pull request*** con descripción y capturas. **Revisión de código** por un compañero o compañera asignado (rotatorio) antes de fusionar con `main`.
- ***Issues* y tablero** en GitHub Projects (Pendiente / En curso / En revisión / Hecho). Cada *issue* enlaza su historia de usuario.
- **Integración continua** con GitHub Actions desde la UD04: compilación y pruebas en cada PR, y la PR no se fusiona si falla.
- **Releases versionadas** con versionado semántico. Desde la UD08 cada *release* incluye el **instalador firmado** y las notas de la versión (*changelog*).
- **Manual de usuario publicado** en GitHub Pages con MkDocs desde la UD07.
- **Definición de hecho (DoD):** el criterio de aceptación se cumple, hay pruebas en verde en CI, la PR está revisada, la ayuda está actualizada y no aparecen avisos nuevos de accesibilidad.

**Hitos:**

| Hito | UD | Qué se entrega | Etiqueta |
|---|---|---|---|
| H1 | UD01 | Ventana principal y formularios (FXML) de clientes y vehículos, sin persistencia; repositorio, tablero y *backlog* creados | `v0.1` |
| H2 | UD02 | Wireframes, mockups y prototipo; *design system*; test de usuario y evaluación heurística; CSS accesible | `v0.2` |
| H3 | UD03 | MVVM, CRUD con SQLite, `TableView` con filtro, validación, menús, atajos y tareas en segundo plano | `v0.3` |
| H4 | UD04 | Biblioteca `gestor-taller-controls` como artefacto Maven, con pruebas, JavaDoc y CI | `v0.4` |
| H5 | UD05 | Informes (filtros, totales, gráfico), factura con subinforme y visor integrado | `v0.5` |
| H6 | UD06 | Órdenes de voz con Vosk en el gestor de taller y prototipo web de gestos/RA | `v0.6` |
| H7 | UD07 | Ayuda MkDocs publicada, F1 contextual, diccionario de datos, manuales y tutorial en vídeo | `v0.7` |
| H8 | UD08 | MSI (jpackage) e instalador Inno Setup personalizado, firmado, desatendido y publicado como *release* | `v1.0.0` |
| H9 | UD09 | Plan de pruebas, integración, regresión en CI, estrés, seguridad, recursos e informe final | `v1.0.1` |

**Modelo de datos mínimo:** `cliente(id, nif, nombre, telefono, email, alta)`, `vehiculo(id, matricula, marca, modelo, anio, cliente_id)`, `orden(id, vehiculo_id, fecha_entrada, fecha_salida, estado, descripcion)`, `linea_orden(id, orden_id, concepto, horas, precio_hora, importe_piezas)`.

Se admiten otros encargos equivalentes (clínica veterinaria, biblioteca municipal, gimnasio), siempre ficticios, con un modelo de datos de complejidad similar y aprobados por el o la docente.

### 4.3 Prácticas profesionales de equipo

> **[Propuesta del docente]** Justificación en [DEC-DI-07](decisiones/DEC-DI-07-pruebas.md) y [DEC-DI-08](decisiones/DEC-DI-08-contenidos-anadidos.md), y en la orientación a proyectos reales (apartado 1.2).

Ciclo de trabajo de cada historia de usuario:

1. **Asignación:** cada persona toma una *issue* del *backlog*.
2. **Desarrollo:** en una rama propia, con *commits* incrementales y pruebas locales.
3. ***Pull request***: revisión de otro miembro del equipo y CI en verde.
4. **Integración en `main`:** publicación automática de la ayuda y, desde la UD08, de la *release*.

Los equipos son de 2–3 personas, de modo que cada estudiante pueda demostrar todos los CE.

| Práctica de equipo | Cómo se aplica en el gestor de taller | RA/CE que la sostiene |
|---|---|---|
| *Issues* y tablero | Una *issue* por historia de usuario, en el tablero de GitHub Projects | RA8.a y RA8.g (estrategia y trazabilidad) |
| *Pull requests* con revisión entre iguales | Ninguna PR se fusiona sin la revisión de otro miembro del equipo, siguiendo una lista de comprobación (accesibilidad, pruebas, ayuda) | RA4.i, RA8.b |
| CI con pruebas | GitHub Actions compila y ejecuta las pruebas en cada PR | RA3.e, RA8.c |
| *Releases* versionadas | Versionado semántico, *changelog* e instalador firmado como artefacto de cada *release* | RA7.c–h |

### 4.4 Recursos y espacios

- PC con Windows 11 por estudiante, con permisos para instalar software o una imagen ya preparada con el software de la tabla siguiente.
- Las prácticas de instalación y firma (UD08) se hacen en una **máquina virtual o un entorno restaurable**.
- Una máquina virtual Linux para los paquetes DEB.
- Webcam y micrófono por puesto, o préstamo de periféricos, para la UD06.
- Proyector y cuenta de GitHub por estudiante.

Propuesta complementaria fuera del módulo: [FP·onboard](../../fponboard/README.md)

#### Software del aula

Todo es gratuito. La justificación de cada herramienta está en el [índice de decisiones](decisiones/README.md).

| Herramienta | Uso | Unidades |
|---|---|---|
| JDK 25 LTS (Temurin, o Liberica Full si se quiere JavaFX incluido) | Compilación y ejecución | Todas |
| IntelliJ IDEA Community o NetBeans 21+ | IDE con Maven | Todas |
| Gluon Scene Builder 21+ | Editor visual de FXML | UD01, UD03, UD04 |
| Penpot (libre) o Figma | Wireframes y mockups | UD02 |
| DB Browser for SQLite / DBeaver | Base de datos | UD03, UD05, UD07 |
| Jaspersoft Studio (misma versión que la librería JasperReports) | Diseño de informes | UD05 |
| Navegador Chrome/Edge + Teachable Machine; modelos Vosk | Interfaces naturales | UD06 |
| Python 3.12 + MkDocs (Material) o Zensical; OBS Studio | Ayuda y tutoriales | UD07 |
| WiX Toolset 3.14, Inno Setup 6, Windows SDK (signtool) | Instaladores y firma | UD08 |
| GitHub + GitHub Actions, VisualVM / JDK Mission Control, Apache JMeter | Pruebas | UD04, UD09 |
| Accessibility Insights for Windows, NVDA, Colour Contrast Analyser | Accesibilidad | UD02, UD09 |

## 5. Evaluación

> **[Normativo]** Los RA y los CE son los del RD 405/2023, anexo I, módulo 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)); su texto literal está en [curriculo-boe.md](curriculo-boe.md) y en la tabla de CE de cada unidad.
> **[Propuesta del docente]** Pesos, instrumentos, criterios de calificación y recuperación. Deben ajustarse a la normativa autonómica de evaluación que esté vigente.

### 5.1 Ponderación de los RA

| RA | Peso | Justificación |
|---|---|---|
| RA1 | **20 %** | Es la base técnica del módulo y de todo el proyecto (unas 40 h entre UD01 y UD03). |
| RA2 | **10 %** | Tiene mucha carga horaria (24 h), pero su aplicación en software de gestión es secundaria. Se valora en proporción a su uso profesional. |
| RA3 | **15 %** | Reutilización, pruebas y empaquetado de componentes. Requiere un dominio avanzado de Java. |
| RA4 | **15 %** | Es transversal (UD02, UD03 y UD09). En el sector público la accesibilidad es obligatoria por el RD 1112/2018 ([BOE](https://www.boe.es/eli/es/rd/2018/09/07/1112)). |
| RA5 | **12 %** | Los informes son imprescindibles en una aplicación de gestión (22 h). |
| RA6 | **8 %** | Es sobre todo documental y de menor complejidad técnica (15 h). |
| RA7 | **10 %** | Tiene una carga técnica notable: instaladores, firma y canales (17 h). |
| RA8 | **10 %** | Es transversal desde UD04 y se cierra en UD09 (17 h). |

### 5.2 Instrumentos por RA

| RA | Instrumentos (peso dentro del RA) |
|---|---|
| RA1 | P1 Formularios con Scene Builder (30 %) · P3 CRUD con enlace a datos (30 %) · Prueba práctica en aula, 1.er trimestre (30 %) · Observación (10 %) |
| RA2 | P6 Interfaces naturales (60 %) · Prueba práctica en aula, 2.º trimestre (30 %) · Observación (10 %) |
| RA3 | P4 Biblioteca de componentes (60 %) · Prueba práctica en aula, 1.er trimestre (30 %) · Observación (10 %) |
| RA4 | P2 Diseño UX accesible (45 %) · P3, parte de interfaz (15 %) · P9, test de usabilidad y accesibilidad (10 %) · Prueba en aula, 1.er trimestre (20 %) · Observación (10 %) |
| RA5 | P5 Informes incrustados (60 %) · Prueba práctica en aula, 2.º trimestre (30 %) · Observación (10 %) |
| RA6 | P7 Sistema de ayuda y manuales (70 %) · Cuestionario en aula (20 %) · Observación (10 %) |
| RA7 | P8 Instalador y distribución (70 %) · Prueba práctica breve en aula: generar el paquete e instalarlo en modo desatendido (20 %) · Observación (10 %) |
| RA8 | P9 Plan y ejecución de pruebas (60 %) · Prueba práctica en aula, 2.º trimestre (30 %) · Observación (10 %) |

- **Pruebas prácticas en aula.** Se hacen en los PC del centro, sin acceso a la red salvo a la documentación oficial (lista blanca o *javadocs* descargados). El alumnado parte de un proyecto base. Duración: 2 h en el 1.er trimestre (RA1, RA3, RA4) y 3 h en el 2.º (RA2, RA5, RA8).
- **Observación sistemática.** Se hace con una lista de cotejo por UD que el o la docente rellena durante las sesiones. Recoge si la actividad de clase se ha completado en el puesto, si el alumno o la alumna resuelve problemas de forma autónoma, si hace *commits* frecuentes y si colabora en las revisiones entre iguales. Es evidencia vinculada a los CE de la unidad, no una nota de actitud.
- **Defensa presencial** de cada práctica. Es condición para que la práctica cuente (ver 5.4.6).

Cada instrumento se corrige con una **rúbrica ligada a los CE** (ver cada unidad). Dentro de cada RA, todos sus CE pesan lo mismo, salvo que la rúbrica de la práctica indique otra cosa.

### 5.3 Matriz CE × UD

Los códigos de CE siguen el RD 405/2023, anexo I, módulo 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). La descripción de cada fila es un **rótulo abreviado**; el texto literal está en [curriculo-boe.md](curriculo-boe.md). La asignación a unidades es propuesta del docente.

«Se trabaja y evalúa en»: unidad o unidades donde el CE se trabaja y se evalúa principalmente. «Se refuerza en»: unidades donde se refuerza o se vuelve a evaluar.

| CE | Se trabaja y evalúa en | Se refuerza en |
|---|---|---|
| RA1.a Herramientas y librerías | UD01 | — |
| RA1.b Interfaz con editor visual | UD01 | UD03 |
| RA1.c Ubicar componentes | UD01 | UD03 |
| RA1.d Modificar propiedades | UD01 | UD03 |
| RA1.e Analizar código generado | UD01 | — |
| RA1.f Modificar código generado | UD01 | UD03 |
| RA1.g Asociar acciones a eventos | UD03 | UD01 |
| RA1.h Aplicación con la interfaz | UD03 | — |
| RA2.a Herramientas de aprendizaje automático | UD06 | — |
| RA2.b Crear interfaz natural | UD06 | — |
| RA2.c Reconocimiento de voz | UD06 | — |
| RA2.d Movimiento del cuerpo | UD06 | — |
| RA2.e Partes del cuerpo | UD06 | — |
| RA2.f Realidad aumentada | UD06 | — |
| RA3.a Herramientas de componentes | UD04 | — |
| RA3.b Crear componentes | UD04 | — |
| RA3.c Métodos y propiedades por defecto | UD04 | — |
| RA3.d Eventos del componente | UD04 | — |
| RA3.e Pruebas unitarias | UD04 | UD09 |
| RA3.f Documentar componentes | UD04 | UD07 |
| RA3.g Empaquetar componentes | UD04 | UD08 |
| RA3.h Aplicaciones con los componentes | UD04 | UD05 |
| RA4.a Estándares | UD02 | — |
| RA4.b Importancia de los estándares | UD02 | — |
| RA4.c Tipos de menús | UD02 | UD03 |
| RA4.d Distribución de acciones | UD02 | UD03 |
| RA4.e Distribución de controles | UD02 | UD03 |
| RA4.f Tipo de control apropiado | UD02 | UD03 |
| RA4.g Aspecto y legibilidad | UD02 | UD03 |
| RA4.h Mensajes adecuados | UD02 | UD03 |
| RA4.i Pruebas de usabilidad y accesibilidad | UD02, UD09 | — |
| RA5.a Estructura del informe | UD05 | — |
| RA5.b Informes con asistentes | UD05 | — |
| RA5.c Filtros | UD05 | — |
| RA5.d Calculados, recuentos y totales | UD05 | — |
| RA5.e Gráficos | UD05 | — |
| RA5.f Herramientas que generan código | UD05 | — |
| RA5.g Modificar código del informe | UD05 | — |
| RA5.h Aplicación con informes incrustados | UD05 | — |
| RA6.a Sistemas de generación de ayudas | UD07 | — |
| RA6.b Ayudas en formatos habituales | UD07 | — |
| RA6.c Ayuda sensible al contexto | UD07 | — |
| RA6.d Estructura de la información persistente | UD07 | UD03 |
| RA6.e Manual de usuario y guía de referencia | UD07 | — |
| RA6.f Manuales de instalación, configuración y administración | UD07 | UD08 |
| RA6.g Tutoriales | UD07 | — |
| RA7.a Empaquetar componentes de la aplicación | UD08 | UD04 |
| RA7.b Personalizar asistente | UD08 | — |
| RA7.c Paquetes con el entorno de desarrollo | UD08 | — |
| RA7.d Paquetes con herramientas externas | UD08 | — |
| RA7.e Firma digital | UD08 | — |
| RA7.f Instalación desatendida | UD08 | — |
| RA7.g Desinstalación | UD08 | — |
| RA7.h Canales de distribución | UD08 | — |
| RA8.a Estrategia de pruebas | UD09 | UD04 |
| RA8.b Pruebas de integración | UD09 | — |
| RA8.c Pruebas de regresión | UD09 | UD04 |
| RA8.d Volumen y estrés | UD09 | — |
| RA8.e Seguridad | UD09 | — |
| RA8.f Uso de recursos | UD09 | — |
| RA8.g Documentar estrategia y resultados | UD09 | — |

**Cobertura: 61 de 61 CE (100 %).** Todos los CE tienen al menos una unidad marcada con P.

### 5.4 Criterios de calificación

1. **Evaluación por RA.** La nota de cada RA (0–10) es la media ponderada de sus instrumentos (tabla 5.2). La nota de cada instrumento sale de su rúbrica por CE.
2. **Nota del módulo** = Σ (nota RAᵢ × pesoᵢ), redondeada según establezca la normativa autonómica.
3. **Condición de superación:** cada RA debe tener una nota **≥ 5**. Si algún RA queda por debajo de 5, el módulo no se supera y la nota que consta es la media ponderada con un **máximo de 4**.
4. **Evaluaciones parciales** (fin de trimestre). Son informativas y se calculan con los RA trabajados hasta ese momento, reescalando sus pesos.
5. **Entregas fuera de plazo.** Se aceptan hasta 7 días después con una penalización del 20 %. Pasado ese plazo, el instrumento queda para recuperación.
6. **Autoría.** Si la defensa muestra que el alumno o la alumna no domina su entrega, o si se detecta plagio, el instrumento se califica con 0 y pasa a recuperación.

### 5.5 Recuperación

- **Durante el curso:** cada RA no superado se recupera al final del trimestre siguiente. Se vuelve a entregar la práctica corregida según la retroalimentación y se repite la parte correspondiente de la prueba práctica.
- **Convocatoria final:** se repiten solo los RA pendientes, con una práctica específica y una prueba práctica en aula por RA. La nota de los RA ya superados se conserva.
- **Pérdida de la evaluación continua o convocatorias posteriores** (según la normativa autonómica): prueba presencial por RA sobre un proyecto base entregado por el profesorado, más la entrega de las prácticas obligatorias. Se aplican las mismas ponderaciones.
- **Plan de refuerzo:** fichas de ejercicios por RA y sesiones de refuerzo en el aula, según el calendario de formación en empresa.

## 6. Atención a la diversidad

> **[Propuesta del docente]**

- **Niveles en cada práctica:** un núcleo obligatorio que asegura el 5 en cada CE y unas ampliaciones opcionales.
- **Dominio libre en el proyecto integrador,** con un modelo de datos equivalente, para aumentar la motivación.
- **Alumnado con necesidades específicas:** adaptaciones de acceso (más tiempo en las pruebas, enunciados en formato accesible, lector de pantalla). La UD02 y la UD09 se aprovechan para que todo el grupo pruebe con lector de pantalla y navegación solo con teclado.
- **Brecha digital:** todo el software es gratuito y se usa en los PC del aula. Si falta webcam, la UD06 puede trabajarse con vídeo pregrabado como fuente.
- **Alumnado con perfil avanzado:** se le propone publicar su biblioteca de componentes en GitHub Packages o contribuir a un proyecto libre de JavaFX.

## 7. Evaluación de la práctica docente

> **[Propuesta del docente]**

Al final de cada trimestre se pasa una encuesta anónima al alumnado sobre carga de trabajo, claridad y utilidad de cada unidad. Se comparan los resultados por RA con los del curso anterior, se revisa la vigencia tecnológica (versiones de JavaFX, Jasper, MediaPipe) y se anotan los cambios en este documento.
