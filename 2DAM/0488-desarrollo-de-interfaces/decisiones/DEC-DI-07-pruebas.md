# DEC-DI-07 · Herramientas de pruebas

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD04, UD09 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han realizado pruebas de regresión.» · «Se han realizado pruebas de volumen y estrés.» · «Se han realizado pruebas de seguridad.» · «Se han realizado pruebas de uso de recursos por parte de la aplicación.» Fuente: RD 405/2023, anexo I, 0488, RA8.c–f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> Contenido básico: «Pruebas manuales y automáticas. Herramientas software para la realización de pruebas.» Fuente: ídem, bloque «Realización de pruebas».

## Alternativas evaluadas

| Criterio | A. JUnit 5 + TestFX + Mockito; GitHub Actions; JMeter + datos masivos; VisualVM/JFR; OWASP Dependency-Check | B. Lo mismo con Jenkins o GitLab CI | C. Solo pruebas manuales documentadas |
|---|---|---|---|
| C1 Normativa | ✅ Cubre RA8.a–g y RA3.e | ✅ | ❌ No cubre regresión automatizada ni recursos de forma objetiva |
| C2 Aplicabilidad profesional | ✅ CI en cada PR es práctica habitual (valoración propia) | ✅ | ➖ |
| C3 Disponibilidad y coste | ✅ Todo libre. GitHub Actions es gratuito en repositorios públicos y tiene cuota en los privados ([documentación de GitHub Actions](https://docs.github.com/es/actions)) | ➖ Requiere servidor propio | ✅ |
| C4 Popularidad y comunidad | ✅ (valoración propia) | ✅ | — |
| C5 Vigencia y soporte | ✅ Mantenidas. OWASP Dependency-Check requiere una clave de la API del NVD para descargar datos con fluidez ([documentación](https://dependency-check.github.io/DependencyCheck/)) | ✅ | — |
| C6 Recursos didácticos | ✅ Documentación oficial de JUnit 5, TestFX y Mockito | ➖ | ✅ |
| C7 Continuidad curricular | ✅ JUnit viene de Programación de 1.º, donde ya se introduce la integración continua básica | ✅ | ➖ |
| C8 Viabilidad en el aula | ✅ Funciona en los PC del aula. Para TestFX en CI se usa `xvfb` | ➖ Hay que montar y mantener el servidor | ✅ |

## Decisión

**Alternativa A.** Las pruebas manuales no se descartan: se usan en las pruebas de sistema y de usabilidad, y se documentan en el plan de pruebas.

## Consecuencias

- TestFX y CI se introducen en la UD04, así que la regresión ya está en marcha cuando llega la UD09.
- **Riesgo:** la cuota de Actions en repositorios privados. Se mitiga con repositorios de clase públicos o de organización educativa.
- **Plan B:** Jenkins o GitLab CI. Gatling en lugar de JMeter.

## Fuentes

- RD 405/2023: ver la [fuente común](README.md).
- [JUnit 5](https://junit.org/junit5/) · [TestFX](https://github.com/TestFX/TestFX) · [Apache JMeter](https://jmeter.apache.org/) · [VisualVM](https://visualvm.github.io/) · [OWASP Dependency-Check](https://dependency-check.github.io/DependencyCheck/) · [GitHub Actions](https://docs.github.com/es/actions). Consultados el 2026-10-27.
