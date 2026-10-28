# DEC-PROG-08 · Pruebas automatizadas

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · desde UD03 en todas las prácticas; UD06 (jerarquías) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han probado y depurado los programas.» Fuente: RD 405/2023, anexo I, MP0485, RA3.f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han probado y depurado las jerarquías de clases.» Fuente: RD 405/2023, anexo I, MP0485, RA7.f
>
> Contenidos básicos: «Prueba, depuración y documentación de la aplicación.» Fuente: RD 405/2023, anexo I, MP0485, bloque «Uso de estructuras de control».
>
> Orientaciones pedagógicas: «La prueba, depuración y documentación de las aplicaciones desarrolladas.»

La norma pide probar, pero no fija cómo. Se decide usar un *framework* de pruebas unitarias.

## Alternativas evaluadas

| Criterio | A · JUnit 5 (Jupiter) | B · JUnit 6 | C · TestNG | D · Solo pruebas manuales + depurador |
|---|---|---|---|---|
| C1 Normativa | ✅ RA3.f y RA7.f (tests de jerarquías, `assertThrows`, tests parametrizados). | ✅ Igual. | ✅ Igual. | ➖ Cubre «depurar» pero no deja evidencia repetible de las pruebas. |
| C2 Aplicabilidad profesional | ✅ Estándar de facto en proyectos Java (valoración propia). | ✅ Sucesor directo. | ➖ Uso menor (valoración propia). | ❌ |
| C3 Disponibilidad y coste | ✅ Libre (EPL-2.0). | ✅ | ✅ | ✅ |
| C4 Popularidad y comunidad | ✅ Valoración propia. | ➖ Reciente. | ➖ | — |
| C5 Vigencia y soporte | ✅ 5.14.x mantenida ([junit.org](https://junit.org/)). | ✅ 6.x vigente. | ✅ | — |
| C6 Recursos didácticos | ✅ Guía oficial y abundante material. | ➖ Menos material todavía. | ➖ | ✅ |
| C7 Continuidad curricular | ✅ Entornos de desarrollo (1.º) y todos los módulos de 2.º. | ✅ | ➖ | — |
| C8 Viabilidad en el aula | ✅ Una dependencia en el `pom.xml`; integración con IntelliJ y con la CI. | ✅ | ✅ | ✅ |

## Decisión

**JUnit 5** + depurador del IDE. C2, C6 y C7: es el estándar con más material disponible y continuidad. Se revisará el paso a JUnit 6 en el curso 2027-28 (regla 4).

## Consecuencias

- Desde UD03 las prácticas incluyen tests dados por el profesorado (especificación ejecutable) y tests propios; la CI los ejecuta en cada *push*.
- Riesgo: que el alumnado escriba código «para pasar los tests». Mitigación: tests ocultos en la corrección y defensa oral.
- **Plan B:** JUnit 6 sin cambios relevantes; con otro lenguaje, el *framework* equivalente (xUnit/NUnit en .NET).

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- JUnit ([junit.org](https://junit.org/)); Maven Central, `org.junit.jupiter:junit-jupiter` (5.14.4 y 6.x publicadas). Consultado 2026-10-27.
