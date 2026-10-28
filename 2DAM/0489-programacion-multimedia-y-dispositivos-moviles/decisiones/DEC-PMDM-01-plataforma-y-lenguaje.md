# DEC-PMDM-01 · Plataforma y lenguaje para apps móviles

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD01-UD07 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

La norma pide analizar tecnologías nativas y multiplataforma y desarrollar apps móviles, pero no fija ni la plataforma ni el lenguaje:

> «Tecnologías de desarrollo. Nativas y multiplataforma. Entornos de trabajo. Módulos y librerías. Lenguajes.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Análisis de tecnologías para aplicaciones en dispositivos móviles» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Desarrolla aplicaciones para dispositivos móviles analizando y empleando las tecnologías y librerías específicas.» Fuente: RD 405/2023, anexo I, MP0489, RA2

Hay que elegir la tecnología **principal** del bloque MP0489_12. Las demás se analizan en la UD01 (RA1.b) en cualquier caso.

## Alternativas evaluadas

| Criterio | A. Android nativo: Kotlin | B. Flutter (Dart) | C. Kotlin Multiplatform + Compose Multiplatform | D. React Native (TypeScript) |
|---|---|---|---|---|
| C1 Normativa | ✅ Cubre RA1-RA2. Acceso directo a sensores, BLE, permisos y empaquetado (RA2.c, d, h, j) | ✅ Cubre RA1-RA2. El acceso al hardware es mediante *plugins* | ✅ Cubre RA1-RA2. En Android usa las mismas APIs que A | ✅ Cubre RA1-RA2. El hardware es mediante módulos nativos o *plugins* |
| C2 Aplicabilidad profesional | ✅ Google recomienda Kotlin para Android: «we recommend starting with Kotlin» ([developer.android.com/kotlin/first](https://developer.android.com/kotlin/first)). Casos publicados en [developer.android.com/stories](https://developer.android.com/stories) | ✅ Lo usan apps en producción ([flutter.dev/showcase](https://flutter.dev/showcase)) | ➖ Adopción creciente ([kotlinlang.org/case-studies](https://kotlinlang.org/case-studies/)). Valoración propia: todavía menos implantado que A o B | ✅ Lo usan apps en producción ([reactnative.dev/showcase](https://reactnative.dev/showcase)) |
| C3 Disponibilidad y coste | ✅ Gratuito y funciona en Windows, Linux y macOS | ✅ Gratuito. También necesita el Android SDK | ✅ Gratuito. El destino iOS requiere macOS | ✅ Gratuito. También necesita el Android SDK |
| C4 Popularidad y comunidad | Valoración propia: comunidad muy amplia, porque es el ecosistema oficial de Android | Valoración propia: comunidad amplia | Valoración propia: comunidad en crecimiento | Valoración propia: comunidad amplia, muy ligada al desarrollo web |
| C5 Vigencia y soporte | ✅ Lenguaje oficial. Jetpack se publica en Kotlin primero | ✅ Mantenido por Google | ✅ Mantenido por JetBrains; Compose Multiplatform para iOS es estable | ✅ Mantenido por Meta y su comunidad |
| C6 Recursos didácticos | ✅ Codelabs oficiales en español y curso *Android Basics with Compose* | ➖ Documentación oficial muy buena | ➖ Documentación oficial | ➖ Documentación oficial |
| C7 Continuidad curricular | ✅ Muy cerca de Java (MP0485). Comparte JVM con MP0486 (Acceso a datos) y MP0490 (Servicios y procesos) | ➖ Lenguaje nuevo (Dart) | ✅ El mismo Kotlin que A, y además escritorio (enlaza con MP0488) | ➖ TypeScript, más próximo a DAW que a DAM |
| C8 Viabilidad en el aula | ➖ Android Studio y el emulador piden mucha RAM; se mitiga con un dispositivo físico y `@Preview` | ➖ Mismos requisitos más el SDK de Flutter. Hay que dedicar horas a Dart | ➖ Más configuración de Gradle. Más complejo para empezar | ➖ Node, Metro y el Android SDK: más piezas que configurar |

## Decisión

**A. Android nativo con Kotlin** como tecnología principal, con un **taller comparativo** de C (Compose Multiplatform) y B (Flutter) en la UD01.

Lo que más ha pesado:

- C2 y C5: es la recomendación oficial del fabricante de la plataforma.
- C7: el salto desde Java es corto y conecta con otros módulos de 2.º.
- C6: hay codelabs oficiales en español y un curso oficial completo.

C es una evolución natural de A: lo aprendido en Android se reutiliza.

## Consecuencias

- La UD02 dedica unas 6 h a Kotlin para quienes vienen de Java.
- Todas las UD del bloque 1 usan Android Studio. Las alternativas de RAM están en la programación, apartado 7.
- **Riesgo:** el alumnado puede tener la impresión de que «solo hay Android». Se mitiga con el taller multiplataforma de la UD01 y la comparativa de P1.
- **Plan B:** si el centro usa Flutter, se mantienen las UD y las rúbricas, y se sustituye Kotlin por Dart en la UD02. Cada UD trae una nota «Alternativa». Si se usa KMP, el código de Compose es casi idéntico.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Android Developers, «Android's Kotlin-first approach» ([developer.android.com/kotlin/first](https://developer.android.com/kotlin/first)), consultado el 2026-10-27.
- Kotlin Multiplatform ([kotlinlang.org/docs/multiplatform.html](https://kotlinlang.org/docs/multiplatform.html)), Flutter ([flutter.dev](https://flutter.dev/)), React Native ([reactnative.dev](https://reactnative.dev/)), consultados el 2026-10-27.
- Popularidad: no se dan cifras. Para un dato, consultar la [Stack Overflow Developer Survey](https://survey.stackoverflow.co/) o el [JetBrains Developer Ecosystem](https://www.jetbrains.com/lp/devecosystem/) del año en curso.
