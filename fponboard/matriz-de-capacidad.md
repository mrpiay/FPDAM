# Matriz de Capacidad

> Componente de [FP·onboard](https://fponboard.github.io/) (§5 Resultados), iniciativa del autor de este repositorio. Forma parte de la [propuesta FP·onboard](README.md), complementaria a la programación de los módulos.

## Qué es

Una rúbrica de **competencias profesionales** que mide cinco dimensiones en cuatro niveles. Su rasgo principal: **evalúa la contribución individual a partir de evidencias reales del flujo de trabajo** (commits, *pull requests*, revisiones, *issues*), no el estado final del producto. Un equipo puede entregar un proyecto parcialmente funcional y aun así generar evidencias sólidas en las cinco dimensiones.

## Dimensiones

| Dimensión | Qué observa | Evidencias típicas |
|---|---|---|
| **Colaboración** | Trabajo con el equipo y sobre código ajeno | *Pull requests* revisados, iteraciones sobre código de otras personas, contribuciones al equipo |
| **Autonomía** | Capacidad de avanzar sin intervención docente | *Issues* resueltas sin intervención docente, propuestas técnicas propias |
| **Calidad técnica** | Código correcto y mantenible | Cobertura de tests, errores de linting, cumplimiento de estilo |
| **Fiabilidad** | Estabilidad de lo que se entrega | Reversiones, bugs introducidos, tiempo de corrección |
| **Madurez** | Comunicación profesional del trabajo | Commits descriptivos, documentación, claridad de las propuestas de cambio |

## Niveles

| Nivel | Estrellas | Descriptor |
|---|---|---|
| Iniciación | ★ | Requiere orientación constante |
| Desarrollo | ★★ | Avanza con apoyo puntual |
| Consolidación | ★★★ | Trabaja de forma autónoma |
| Dominio | ★★★★ | Referencia para el grupo |

Con 5 dimensiones de hasta 4 puntos, el **nivel global** se expresa sobre 20. Por ejemplo, en la web: «Consolidación 17 / 20».

## Validación en dos capas

1. **Automática**, en cada *pull request*: tests, linting, estructura del proyecto e historial Git. Es la señal continua y objetiva.
2. **Semántica**, al cierre de cada proyecto: análisis del código y de la trayectoria de contribución. Es la lectura cualitativa.

Las dos capas alimentan la Matriz, que se actualiza durante todo el proceso.

## Uso

La Matriz es la evaluación propia del programa FP·onboard. No forma parte de la calificación de los módulos, que se obtiene exclusivamente de los RA y criterios de evaluación del RD 405/2023 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
