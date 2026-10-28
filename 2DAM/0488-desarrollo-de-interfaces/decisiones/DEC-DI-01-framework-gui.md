# DEC-DI-01 · Framework de interfaces gráficas de escritorio

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD01, UD03, UD04 (y, de forma indirecta, todas) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

La norma no fija ninguna tecnología. Pide trabajar con editores visuales y lenguajes descriptivos:

> «Genera interfaces gráficos de usuario mediante editores visuales utilizando las funcionalidades del editor y adaptando el código generado.» Fuente: RD 405/2023, anexo I, 0488, RA1 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Se ha analizado el código generado por el editor visual.» · «Se ha modificado el código generado por el editor visual.» Fuente: RD 405/2023, anexo I, 0488, RA1.e y RA1.f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> Contenidos básicos: «Librerías de componentes nativas y multiplataforma. Características.» · «Herramientas propietarias y libres de edición de interfaces.» · «Lenguajes descriptivos para la definición de interfaces.» Fuente: RD 405/2023, anexo I, 0488, contenidos básicos ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

Es la decisión de más peso del módulo: condiciona el lenguaje, los componentes (RA3), los informes (RA5), el empaquetado (RA7) y las pruebas (RA8).

## Alternativas evaluadas

Las valoraciones de C2 y C4 son **valoración propia**, sin cifras: no se ha encontrado una fuente pública que desglose el uso de estos frameworks de escritorio de forma comparable.

| Criterio | A. Java + JavaFX (FXML + Scene Builder) | B. C# + WPF (XAML + Visual Studio) | C. Kotlin + Compose Multiplatform | D. Electron (HTML/CSS/JS) |
|---|---|---|---|---|
| C1 Normativa | ✅ FXML es un lenguaje descriptivo separado del código y Scene Builder es un editor visual: RA1.b–f se evalúan de forma directa | ✅ XAML + diseñador visual: cobertura directa de RA1.b–f | ➖ No hay lenguaje descriptivo separado ni editor de arrastrar y soltar: la interfaz es código Kotlin con vista previa. RA1.e/f («código generado por el editor visual») quedan forzados | ➖ HTML/CSS es descriptivo, pero no hay un editor visual de referencia integrado en el flujo de trabajo |
| C2 Aplicabilidad profesional | ➖ Se usa en aplicaciones de escritorio de gestión, industriales y científicas, pero tiene menos presencia que .NET o web en ofertas de escritorio (valoración propia) | ✅ Muy presente en el escritorio Windows corporativo (valoración propia) | ➖ Es una tecnología en crecimiento. En escritorio tiene menos uso que en Android (valoración propia) | ✅ Muy usado en aplicaciones de escritorio de producto (valoración propia) |
| C3 Disponibilidad y coste | ✅ OpenJFX es libre (GPL + *classpath exception*), Scene Builder es gratuito y funciona en Windows, Linux y macOS ([Gluon](https://gluonhq.com/products/javafx/), [Scene Builder](https://gluonhq.com/products/scene-builder/)) | ➖ Gratuito con Visual Studio Community, pero **WPF solo funciona en Windows** | ✅ Libre y multiplataforma (IntelliJ IDEA Community) | ✅ Libre y multiplataforma |
| C4 Popularidad y comunidad | ➖ Comunidad estable pero más reducida que las alternativas B y D (valoración propia) | ✅ Comunidad amplia (valoración propia) | ➖ En crecimiento (valoración propia) | ✅ Comunidad muy amplia (valoración propia) |
| C5 Vigencia y soporte | ✅ JavaFX tiene versiones LTS: 21 LTS (última actualización listada 21.0.13, oct. 2026) y 25 LTS (requiere JDK 23+) ([Gluon, consultado 2026-10-27](https://gluonhq.com/products/javafx/)) | ✅ Mantenido por Microsoft dentro de .NET | ✅ Mantenido por JetBrains | ✅ Calendario de versiones regular |
| C6 Recursos didácticos | ✅ Documentación oficial de OpenJFX y de Scene Builder; es la tecnología del material propio del módulo | ➖ Mucha documentación oficial, pero sin material del ciclo | ➖ Documentación oficial, sin material del ciclo | ➖ Documentación oficial, sin material del ciclo |
| C7 Continuidad curricular | ✅ El mismo lenguaje que MP0485 Programación (Java) y MP0486 Acceso a datos | ❌ Requiere aprender C# en 2.º | ✅ Kotlin y Compose conectan con MP0489 PMDM (Android) | ➖ Conecta con DAW y con Lenguajes de marcas, no con Programación |
| C8 Viabilidad en el aula | ✅ El alumnado ya sabe Java. Funciona en cualquier PC del aula y del alumnado | ➖ Hay que aprender el lenguaje y el alumnado con macOS o Linux no puede trabajar en casa | ➖ Hay que aprender Kotlin si PMDM aún no lo ha introducido | ➖ Hay que aprender JS/Node y un framework |

## Decisión

**Alternativa A: Java + JavaFX con FXML y Scene Builder.** Versión: **JDK 25 LTS + JavaFX 25 LTS**, las mismas que en Programación de 1.º, para que el alumnado no cambie de entorno entre cursos (C7). JavaFX 25 requiere JDK 23 o superior. Si un centro necesita mantener JDK 21, el código de las unidades funciona también con JavaFX 21 LTS.

Han pesado sobre todo:

- **C1:** cobertura directa de RA1.e/f gracias al lenguaje descriptivo separado y al editor visual.
- **C7:** continuidad con Programación y Acceso a datos.
- **C3 y C8:** es libre, multiplataforma y viable en todos los equipos.

**Honestidad sobre las debilidades.** JavaFX sale **peor que WPF y Electron en C2 y C4** (aplicabilidad profesional y popularidad, según valoración propia). Aun así se elige porque cambiar de lenguaje en 2.º costaría unas 20–30 h de las 191 en aprender C# o JavaScript, y esas horas se quitarían a los RA. Para compensar las debilidades:

1. En la UD01 se hace una **comparativa práctica** con XAML y Compose (actividad A6).
2. Los patrones que se enseñan son transferibles a cualquier framework: MVVM, *binding*, componentes, CI e instaladores (ver la tabla de correspondencias en la programación).

**Alternativa recomendada si cambia el contexto:** si PMDM introduce Kotlin y Compose en el 1.er trimestre, la alternativa C gana en C7. En ese caso, habría que valorar el cambio el curso siguiente, cubriendo RA1.e/f con el código que generan los asistentes y la vista previa, y anotar el cambio en este registro.

## Consecuencias

- Las unidades UD01, UD03 y UD04 usan FXML, Scene Builder, propiedades JavaFX y controles propios. Jasper (UD05), jpackage (UD08) y TestFX (UD09) se eligen en coherencia con el ecosistema Java.
- **Riesgo:** la percepción de que JavaFX es una tecnología «poco demandada». Se mitiga con la comparativa explícita y con prácticas transferibles.
- **Riesgo técnico:** la configuración de módulos (`opens … to javafx.fxml`). Se trabaja de forma explícita en la UD01, actividad A2.
- **Plan B:** WPF, Compose, Electron, Flutter o Qt, según la tabla de correspondencias del [apartado 2.1 de la programación](../programacion-didactica.md). La matriz CE × UD y las rúbricas no cambian.

## Fuentes

- RD 405/2023, anexo I, módulo 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado el 2026-10-27.
- Gluon, *JavaFX: Long Term Support* ([gluonhq.com/products/javafx](https://gluonhq.com/products/javafx/)). Consultado el 2026-10-27. La página indica que sus fechas son informativas.
- OpenJFX ([openjfx.io](https://openjfx.io/)). Microsoft, documentación de WPF ([learn.microsoft.com](https://learn.microsoft.com/es-es/dotnet/desktop/wpf/)). JetBrains, Compose Multiplatform ([jetbrains.com/compose-multiplatform](https://www.jetbrains.com/compose-multiplatform/)). Electron ([electronjs.org](https://www.electronjs.org/)). Consultados el 2026-10-27.
- Para C4, si se quiere aportar cifras en el futuro: [Stack Overflow Developer Survey](https://survey.stackoverflow.co/) y [JetBrains Developer Ecosystem](https://www.jetbrains.com/lp/devecosystem/), citando año y apartado.
