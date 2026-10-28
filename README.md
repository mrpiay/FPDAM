# Programación didáctica de DAM

Programación didáctica **abierta** del ciclo formativo de grado superior **Desarrollo de Aplicaciones Multiplataforma (DAM)**: del currículo oficial a unidades, prácticas y rúbricas listas para el aula, con la justificación de cada decisión. Está basada en el RD 405/2023 y en el currículo de Galicia, y cada dato normativo cita su fuente.

De momento incluye **cuatro módulos**, dos de 1.º y dos de 2.º. El repositorio está pensado para ampliarse con más módulos del ciclo.

**Consúltalo en la web:** [mrpiay.github.io/FPDAM](https://mrpiay.github.io/FPDAM/)

## Para qué sirve

- **Para impartir los módulos:** cada módulo tiene su programación didáctica y sus unidades listas para usar en el aula.
- **Para preparar o revisar una programación:** muestra cómo se concreta el currículo oficial en secuencia, horas, evaluación y cobertura completa de los criterios de evaluación.
- **Para adaptarlo a otro centro:** las tecnologías, la temporalización y los criterios de calificación son propuestas justificadas, con alternativas y un plan B para cambiarlas.
- **Para reutilizarlo y mejorarlo:** el contenido está en ficheros Markdown, con licencia abierta.

## Qué contiene

| 4 módulos (de momento) | 777 horas | 39 unidades didácticas | 236 criterios de evaluación | 33 decisiones justificadas |
|:---:|:---:|:---:|:---:|:---:|
| 1.º y 2.º DAM | Currículo de Galicia | Cada una con práctica y rúbrica | Todos trabajados y evaluados | Frente a alternativas, con fuentes |

| Curso | Módulo | Horas | Proyecto | Tecnología principal |
|---|---|:---:|---|---|
| 1.º | [**MP0483 · Sistemas informáticos**](1DAM/0483-sistemas-informaticos/README.md) | 155 | Infraestructura de una pequeña empresa de software | Linux · Windows Server y dominio · virtualización · redes |
| 1.º | [**MP0485 · Programación**](1DAM/0485-programacion/README.md) | 240 | Aplicación de gestión en tres versiones | Java 25 · JUnit · JavaFX · JDBC · ObjectDB · Git |
| 2.º | [**MP0488 · Desarrollo de interfaces**](2DAM/0488-desarrollo-de-interfaces/README.md) | 191 | App de escritorio con informes, ayuda, instalador, pruebas y voz | Java 25 · JavaFX · Figma · JasperReports · MediaPipe |
| 2.º | [**MP0489 · Programación multimedia y dispositivos móviles**](2DAM/0489-programacion-multimedia-y-dispositivos-moviles/README.md) | 191 | App Android con API real, más un juego 2D y otro 3D | Kotlin · Jetpack Compose · Godot 4 · Unity 6 LTS |

Los clientes de los proyectos son ficticios.

Cada módulo tiene estas páginas:

| Página | Contenido |
|---|---|
| **Ficha** | Identificación del módulo, cómo leer el material e índice de unidades |
| **Currículo (BOE)** | Resultados de aprendizaje, criterios de evaluación y contenidos, en texto literal |
| **Programación didáctica** | Secuencia y horas, proyecto, metodología, evaluación, matriz de criterios por unidad, aula y atención a la diversidad |
| **Decisiones** | Por qué cada tecnología o contenido, comparado con alternativas |
| **Unidades** | Criterios que trabaja, contenidos, actividades, práctica evaluable y rúbrica |

Los módulos incluidos forman un recorrido: Sistemas informáticos prepara el entorno de trabajo, Programación aporta la base de Java y orientación a objetos, y en 2.º esa base se aplica a aplicaciones de escritorio (Desarrollo de interfaces) y a aplicaciones móviles y videojuegos (PMDM).

## Cómo usarlo

1. **Consultarlo:** en la [web](https://mrpiay.github.io/FPDAM/), con navegación por curso y módulo y buscador, o directamente en GitHub.
2. **Descargarlo:** botón *Code → Download ZIP*. Los ficheros `.md` se abren con cualquier editor o se convierten a otros formatos.
3. **Adaptarlo a tu centro:** haz un *fork* (tu propia copia) y modifica lo que necesites. Si publicas tu versión, mantén la atribución y la misma licencia.
4. **Proponer mejoras:** abre una [*issue*](https://github.com/mrpiay/FPDAM/issues) si encuentras un error, o envía un *pull request* con la corrección.

## Organización del repositorio

```
1DAM/  2DAM/     Un directorio por módulo:
  ├─ README.md                  Ficha del módulo
  ├─ curriculo-boe.md           Currículo oficial literal
  ├─ programacion-didactica.md  Programación didáctica
  ├─ decisiones/                Registro de decisiones
  └─ unidades/                  Unidades didácticas
normativa/       Marco legal estatal y gallego, con fuentes
plantillas/      Criterios de decisión y plantillas de unidad y de decisión
fponboard/       FP·onboard: propuesta metodológica complementaria
web/             Portada, estilos y scripts de la web
scripts/         Preparación del contenido para generar la web
mkdocs.yml       Configuración de la web (menú, tema)
.github/         Publicación automática de la web en GitHub Pages
```

Cómo se genera la web: [Sobre esta web](SOBRE-ESTA-WEB.md). Cómo se publica sola con cada cambio, explicado como caso práctico de integración y despliegue continuos (CI/CD) para el aula: [Publicación con GitHub Actions](PUBLICACION.md).

## Criterios

- **Procedencia.** Todo dato que viene de una norma cita su fuente: norma, artículo o anexo, elemento y enlace oficial. Por ejemplo, «RD 405/2023, anexo I, MP0485, RA3.d». Lo que no viene de la norma va marcado como **Propuesta del docente**.
- **Decisiones justificadas.** Cada tecnología se compara con alternativas según ocho [criterios](plantillas/criterios-de-decision.md): normativa, aplicabilidad profesional, coste, popularidad, vigencia, recursos, continuidad y viabilidad en el aula.
- **Adaptable.** Las horas son las oficiales de la Xunta. Las sesiones de 50 min, los criterios de calificación y la organización son propuestas que cada centro ajusta a su calendario, a su proyecto curricular y a la normativa de evaluación ([Orde do 12 de xullo de 2011](normativa/README.md)).
- **Proyecto vivo.** Se revisa cada curso: ver la [Hoja de ruta](ROADMAP.md).

## Licencia

[CC BY-NC-SA 4.0](LICENSE) © 2026 Javier Piay Pombo. Puedes compartir y adaptar este material citando la autoría, sin fines comerciales y con la misma licencia. Los textos legales del BOE y el DOG no están sujetos a ella, porque están excluidos de la propiedad intelectual (art. 13 TRLPI).
