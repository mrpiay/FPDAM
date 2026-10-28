# DEC-PROG-02 · Entorno integrado de desarrollo

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · todas; especialmente UD01, UD02, UD03, UD09 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han utilizado entornos integrados de desarrollo.» Fuente: RD 405/2023, anexo I, MP0485, RA1.c ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se ha utilizado el entorno integrado de desarrollo en la creación y compilación de programas simples.» Fuente: RD 405/2023, anexo I, MP0485, RA2.i
>
> «Se han probado y depurado los programas.» Fuente: RD 405/2023, anexo I, MP0485, RA3.f
>
> «Se han utilizado las herramientas del entorno de desarrollo para crear interfaces gráficos de usuario simples.» Fuente: RD 405/2023, anexo I, MP0485, RA5.f

El IDE debe tener depurador, integración con la herramienta de construcción y con un editor visual de interfaces.

## Alternativas evaluadas

| Criterio | A · IntelliJ IDEA | B · VS Code + Extension Pack for Java | C · Eclipse IDE | D · Apache NetBeans |
|---|---|---|---|---|
| C1 Normativa | ✅ Depurador completo, Maven, JUnit, Git; abre FXML en Scene Builder (RA5.f). | ✅ Depurador y Maven; ➖ Scene Builder solo como aplicación externa. | ✅ Depurador, Maven, JUnit; Scene Builder externo. | ✅ Depurador, Maven, editor visual de Swing integrado (RA5.f con Swing). |
| C2 Aplicabilidad profesional | ✅ Muy usado en desarrollo Java profesional; Android Studio se basa en él. | ✅ Editor muy extendido y polivalente. | ➖ Presente en empresas con proyectos heredados (valoración propia). | ➖ Uso profesional minoritario (valoración propia). |
| C3 Disponibilidad y coste | ✅ Edición gratuita y licencias educativas gratuitas de JetBrains ([JetBrains Education](https://www.jetbrains.com/community/education/)); Windows/Linux/macOS. ➖ Requiere más RAM. | ✅ Gratuito; ligero. | ✅ Gratuito (EPL). | ✅ Gratuito (Apache-2.0). |
| C4 Popularidad y comunidad | ✅ 27,1 % (SO 2025). | ✅ 75,9 % (SO 2025), pero para todos los lenguajes. | ➖ 7,1 % (SO 2025). | ➖ No aparece en la tabla de SO 2025. |
| C5 Vigencia y soporte | ✅ Versiones trimestrales. | ✅ Versiones mensuales. | ✅ Versiones trimestrales. | ✅ Versiones trimestrales. |
| C6 Recursos didácticos | ✅ Documentación oficial amplia. | ✅ Documentación oficial. | ✅ Documentación oficial. | ✅ Documentación oficial y abundante material docente (valoración propia). |
| C7 Continuidad curricular | ✅ Misma familia que Android Studio (PMDM). | ✅ Útil en DAW y en módulos con varios lenguajes. | ➖ | ➖ |
| C8 Viabilidad en el aula | ✅ Con 16 GB de RAM funciona con holgura; con 8 GB, ajustar memoria. | ✅ El más ligero. | ✅ | ✅ |

## Decisión

**IntelliJ IDEA** como IDE de referencia en clase, por C1 (integración de depurador, Maven, JUnit, Git y Scene Builder en un solo entorno) y C7 (continuidad con Android Studio). Se permite VS Code al alumnado que lo prefiera en casa: las prácticas son proyectos Maven y no dependen del IDE.

## Consecuencias

- Los atajos y capturas de las UD se refieren a IntelliJ.
- Las prácticas se corrigen con `mvn test` en la CI, no con el IDE.
- **Plan B:** VS Code o Eclipse con el mismo proyecto Maven; NetBeans si se opta por Swing en RA5.

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- Stack Overflow Developer Survey 2025, *Technology* → entornos de desarrollo ([enlace](https://survey.stackoverflow.co/2025/technology)), todas las respuestas. Consultado 2026-10-27.
- JetBrains, licencias educativas ([enlace](https://www.jetbrains.com/community/education/)). Consultado 2026-10-27.
