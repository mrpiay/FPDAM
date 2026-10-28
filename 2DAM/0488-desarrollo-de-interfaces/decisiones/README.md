# Decisiones · MP0488

> **[Propuesta del docente]** Un **registro de decisión** documenta una elección de tecnología o de contenido que la norma no prescribe: la norma **no impone ninguna tecnología concreta**, solo pide tipos de herramientas. Cada registro evalúa al menos dos alternativas con los criterios C1–C8 de [criterios-de-decision.md](../../../plantillas/criterios-de-decision.md) (normativa, aplicabilidad profesional, disponibilidad y coste, popularidad, vigencia, recursos didácticos, continuidad curricular y viabilidad en el aula) y recoge las evidencias y las fuentes, con fecha de consulta. La leyenda ✅ ➖ ❌ y el uso de «valoración propia» se explican en [Cómo leer este material](../README.md#como-leer-este-material).
>
> Fuente normativa común a todos los registros: RD 405/2023, anexo I, 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado el 2026-10-27.

| Registro | RA / bloque | Decisión tomada | Alternativas consideradas |
|---|---|---|---|
| [DEC-DI-01](DEC-DI-01-framework-gui.md) | RA1 · Generación de interfaces | Java 25 LTS + **JavaFX 25**, FXML y **Scene Builder**; Maven; SQLite. JavaFX gana en C1, C3, C7 y C8, pero **sale peor en C2 y C4**; el registro explica por qué se mantiene | C# + WPF · .NET MAUI / Avalonia · Compose Multiplatform · Electron · Flutter · Qt |
| [DEC-DI-02](DEC-DI-02-herramienta-prototipado.md) | RA4 · Diseño | **Penpot** (o Figma); Accessibility Insights, NVDA, Colour Contrast Analyser | Figma, Balsamiq, papel |
| [DEC-DI-03](DEC-DI-03-interfaces-naturales.md) | RA2 · Interfaces naturales | Híbrido: **Vosk** (Java, sin conexión) + **MediaPipe Tasks**, **Teachable Machine** y **AR.js/A-Frame** (web) | Python + MediaPipe · Unity + AR Foundation · Android ML Kit + ARCore |
| [DEC-DI-04](DEC-DI-04-informes.md) | RA5 · Informes | **JasperReports 7.0.x + Jaspersoft Studio 7** (misma versión en ambos; se elige la rama 7 por soporte y seguridad) | JasperReports 6.21 · BIRT |
| [DEC-DI-05](DEC-DI-05-documentacion-y-ayuda.md) | RA6 · Documentación | Markdown + `mkdocs.yml` (MkDocs Material o Zensical), JavaDoc, OBS Studio (incluye el riesgo de vigencia de Material for MkDocs) | Docusaurus, Sphinx, HelpNDoc |
| [DEC-DI-06](DEC-DI-06-empaquetado-y-distribucion.md) | RA7 · Distribución | **jpackage** + **Inno Setup**; `signtool`/`jarsigner`; GitHub Releases, winget | WiX, MSIX, Install4j |
| [DEC-DI-07](DEC-DI-07-pruebas.md) | RA8 · Pruebas (y RA3 · Componentes) | JUnit 5, TestFX, Mockito, GitHub Actions, JMeter, VisualVM/JFR, OWASP Dependency-Check | Jenkins/GitLab CI, Gatling |
| [DEC-DI-08](DEC-DI-08-contenidos-anadidos.md) | Contenidos añadidos | Git y PR, CI, MVVM, historias de usuario, *design system*, i18n, RGPD, IA generativa (no figuran en los contenidos básicos; justificación por CE y horas) | — |

Los componentes visuales (RA3: controles JavaFX con `fx:root` o `Control` + `Skin`, Maven, JUnit 5 + TestFX) son consecuencia de [DEC-DI-01](DEC-DI-01-framework-gui.md) y [DEC-DI-07](DEC-DI-07-pruebas.md); alternativas: WPF `UserControl` + NuGet · Compose · Web Components.

Cómo cambiar de tecnología si el centro usa otra: [programación didáctica, apartado 2.1](../programacion-didactica.md#21-como-se-adapta-el-modulo-si-el-centro-usa-otra-tecnologia).
