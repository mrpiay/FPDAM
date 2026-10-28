# DEC-PROG-01 · Lenguaje de programación

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0485 · todas (UD01–UD11) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

La norma exige un lenguaje orientado a objetos, pero no nombra ninguno:

> «Desarrolla programas organizados en clases analizando y aplicando los principios de la programación orientada a objetos.» Fuente: RD 405/2023, anexo I, MP0485, RA4 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Se han utilizado mecanismos para controlar la visibilidad de las clases y de sus miembros.» Fuente: RD 405/2023, anexo I, MP0485, RA4.f
>
> «Se han utilizado modificadores para bloquear y forzar la herencia de clases y métodos.» Fuente: RD 405/2023, anexo I, MP0485, RA7.b
>
> «Se han creado clases y métodos genéricos.» Fuente: RD 405/2023, anexo I, MP0485, RA6.f
>
> Las orientaciones pedagógicas piden «la evaluación, selección y utilización de herramientas y lenguajes de programación orientados a objetos». Fuente: RD 405/2023, anexo I, MP0485, orientaciones pedagógicas.

Estos CE son los más exigentes con el lenguaje: requieren tipado estático, modificadores de visibilidad reales y modificadores de herencia.

## Alternativas evaluadas

| Criterio | A · Java 25 LTS | B · C# / .NET 10 LTS | C · Kotlin | D · Python 3 |
|---|---|---|---|---|
| C1 Normativa | ✅ Cubre todos los CE: tipado estático (RA1.d/h), `private`/`protected` (RA4.f), `final`/`abstract` (RA7.b), genéricos (RA6.f), `assert` (RA3.i), *streams* (RA6.j), JDBC (RA9) y JPA (RA8). | ✅ Cubre todos: `private`/`internal`, `sealed`/`abstract`, genéricos, `Debug.Assert`, LINQ, ADO.NET. Oferta de BDOO nativas para .NET menor (RA8). | ✅ Cubre todos sobre la JVM (`private`, clases `final` por defecto y `open`, genéricos, JDBC, JPA). Oculta conceptos que el BOE pide ver: primitivos, `static`, excepciones comprobadas. | ➖ La visibilidad es por convención (`_`, *name mangling*), no hay modificador para bloquear la herencia salvo `typing.final` (solo para analizadores estáticos) y el tipado es dinámico: RA4.f, RA7.b y RA1.h quedan débiles. No se descarta por C1, pero queda en desventaja. |
| C2 Aplicabilidad profesional | ✅ Lenguaje de aplicaciones empresariales y *back-end* (Spring, Jakarta EE) y base histórica de Android (valoración propia). | ✅ Aplicaciones empresariales, escritorio Windows y videojuegos con Unity (valoración propia). | ✅ Lenguaje recomendado por Google para Android ([developer.android.com/kotlin/first](https://developer.android.com/kotlin/first)). | ✅ Datos, IA, *scripting*, web (valoración propia). |
| C3 Disponibilidad y coste | ✅ JDK libre (Eclipse Temurin, GPLv2 + *Classpath Exception*), Windows/Linux/macOS. | ✅ SDK libre (MIT), multiplataforma; el mejor IDE (Visual Studio) es solo Windows; Rider con licencia educativa. | ✅ Libre (Apache-2.0). | ✅ Libre. |
| C4 Popularidad y comunidad | ✅ 29,4 % de las respuestas en la [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology); 27,6 % en la [edición 2026](https://survey.stackoverflow.co/2026/technology). | ✅ 27,8 % (SO 2025); 27,1 % (SO 2026). | ➖ 10,8 % (SO 2025). | ✅ 57,9 % (SO 2025); 58,0 % (SO 2026). |
| C5 Vigencia y soporte | ✅ Java 25 es LTS; Temurin 25 con soporte de seguridad hasta 2031-09-30 ([endoflife.date](https://endoflife.date/eclipse-temurin)). | ✅ .NET 10 es LTS ([política de soporte de .NET](https://dotnet.microsoft.com/platform/support/policy/dotnet-core)). | ✅ Versiones frecuentes, mantenido por JetBrains. | ✅ Versiones anuales con 5 años de soporte. |
| C6 Recursos didácticos | ✅ Documentación oficial y tutoriales completos ([dev.java](https://dev.java/learn/)); los apuntes propios del módulo están en Java. | ➖ Documentación oficial muy completa; poco material docente orientado a este módulo (valoración propia). | ➖ Poco material docente orientado a este módulo (valoración propia). | ➖ Documentación oficial amplia; poco material docente orientado a este módulo (valoración propia). |
| C7 Continuidad curricular | ✅ Acceso a datos y PSP (habitualmente Java), PMDM (Kotlin sobre la JVM), Desarrollo de interfaces (JavaFX). | ➖ Buena si 2.º usa .NET/Unity; en otro caso, cambio de ecosistema. | ✅ PMDM. ➖ Acceso a datos/PSP suelen usar Java. | ➖ Poca continuidad en DAM 2.º. |
| C8 Viabilidad en el aula | ✅ Funciona en cualquier PC del aula; más verboso al principio, mitigado con JEP 512 (ficheros compactos). | ✅ Viable; mejor experiencia en Windows. | ➖ Viable, pero la sintaxis concisa esconde fundamentos en 1.º. | ✅ Curva inicial suave. |

## Decisión

**Java 25 LTS** (JDK Eclipse Temurin). Pesan sobre todo C1 (cobertura literal de RA4.f, RA7.b, RA6.f y RA3.i), C7 (continuidad con 2.º) y C6 (todo el material de referencia está en Java). C# queda como alternativa equivalente; Python, como lenguaje de contraste.

## Consecuencias

- Todos los fragmentos de código de las UD están en Java 25 y aprovechan sus novedades (JEP 511, 512, 513, *records*, *pattern matching*).
- Riesgo: verbosidad inicial. Mitigación: ficheros compactos e `IO` en las dos primeras semanas.
- **Plan B:** con C#/.NET o Kotlin se mantienen secuencia, matriz CE × UD, proyecto y rúbricas; se reescriben los ejemplos (ver apartado 2.5 de la [programación didáctica](../programacion-didactica.md)).

## Fuentes

- Fuente normativa común: ver el [índice de decisiones](README.md).
- Stack Overflow Developer Survey 2025 y 2026, sección *Technology* ([2025](https://survey.stackoverflow.co/2025/technology), [2026](https://survey.stackoverflow.co/2026/technology)), porcentaje de todas las respuestas. Consultado 2026-10-27.
- endoflife.date, Eclipse Temurin ([enlace](https://endoflife.date/eclipse-temurin)). Consultado 2026-10-27.
- Microsoft, política de soporte de .NET ([enlace](https://dotnet.microsoft.com/platform/support/policy/dotnet-core)). Consultado 2026-10-27.
- Android Developers, *Android's Kotlin-first approach* ([enlace](https://developer.android.com/kotlin/first)). Consultado 2026-10-27.
- Documentación de Python, *Private Variables* ([enlace](https://docs.python.org/3/tutorial/classes.html#private-variables)). Consultado 2026-10-27.
