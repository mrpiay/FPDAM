# DEC-PMDM-08 · Empaquetado y distribución

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD01, UD06, UD09, UD10 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han empaquetado y desplegado las aplicaciones desarrolladas en dispositivos móviles reales.» Fuente: RD 405/2023, anexo I, MP0489, RA2.h ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Se han desarrollado e implantado juegos para dispositivos móviles.» Fuente: RD 405/2023, anexo I, MP0489, RA5.h

> «Ciclo de vida de una aplicación: descubrimiento, instalación, ejecución, actualización y borrado.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Análisis de tecnologías para aplicaciones en dispositivos móviles»

## Alternativas evaluadas

| Criterio | A. APK/AAB firmado + `adb` + Google Play (prueba interna) | B. APK firmado + Firebase App Distribution | C. Solo APK por `adb` o enlace directo |
|---|---|---|---|
| C1 Normativa | ✅ Empaquetado, despliegue real y ciclo completo, incluido el descubrimiento en tienda | ✅ Empaquetado y despliegue a testers. Sin tienda | ➖ Cubre RA2.h, pero no la fase de «descubrimiento» en tienda |
| C2 Aplicabilidad profesional | ✅ Es el flujo de publicación de Android. Play exige AAB para apps nuevas ([developer.android.com/guide/app-bundle](https://developer.android.com/guide/app-bundle)) | ✅ Es habitual para distribuir versiones beta internas (valoración propia) | ➖ Solo para desarrollo |
| C3 Disponibilidad y coste | ➖ La cuenta de Play Console tiene un pago único de registro (hay que consultar el importe vigente en la fuente oficial). La gestiona el centro | ✅ Gratuito, con una cuenta de Google | ✅ Gratuito |
| C5 Vigencia y soporte | ✅ Hay que revisar los requisitos de `targetSdk` de Play y la **verificación de desarrolladores** anunciada por Google para 2026 | ✅ | ➖ Le afecta la verificación de desarrolladores |
| C6 Recursos didácticos | ✅ Guías oficiales de firma y publicación | ✅ Documentación de Firebase | ✅ |
| C7 Continuidad curricular | ✅ Enlaza con la distribución de aplicaciones de MP0488 | ✅ | ✅ |
| C8 Viabilidad en el aula | ➖ La cuenta es del centro y hay pocos testers | ✅ | ✅ |

## Decisión

**C como mínimo para todo el alumnado:** APK firmado instalado por `adb` en un dispositivo real.

**A o B como entrega «de empresa»:**

- **A** (Play, prueba interna) si el centro dispone de cuenta de Play Console.
- Si no, **B** (Firebase App Distribution).

Los juegos de Godot y Unity siguen el mismo esquema: APK/AAB firmado con su propio *keystore*.

## Consecuencias

- La firma (*keystore*) se explica junto con su custodia: nunca se sube al repositorio. La CI firma usando secretos.
- **Riesgo:** cambios en las políticas de instalación fuera de Play. Hay que revisarlas cada curso.
- **Plan B:** en Flutter, `flutter build appbundle`. En React Native, Gradle de forma equivalente. iOS (TestFlight) requiere macOS y una cuenta de Apple Developer.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Android Developers: [Firmar la app](https://developer.android.com/studio/publish/app-signing), [Android App Bundles](https://developer.android.com/guide/app-bundle). Firebase: [App Distribution](https://firebase.google.com/docs/app-distribution). Consultados el 2026-10-27.
