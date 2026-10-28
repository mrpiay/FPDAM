# DEC-PMDM-03 · Persistencia de datos

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD04 (y uso en UD05-UD07) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han utilizado las clases necesarias para establecer conexiones con almacenes de datos garantizando la persistencia.» Fuente: RD 405/2023, anexo I, MP0489, RA2.f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> «Gestión de las preferencias de la aplicación. Bases de datos y almacenamiento. Persistencia.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Desarrollo de aplicaciones para dispositivos móviles»

Hay que decidir dos cosas: con qué se guardan las **preferencias** y con qué se guardan los **datos estructurados**.

## Alternativas evaluadas

| Criterio | A. Room (SQLite) + DataStore | B. SQLite directo (`SQLiteOpenHelper`) + `SharedPreferences` | C. Firebase Firestore |
|---|---|---|---|
| C1 Normativa | ✅ Cubre preferencias, base de datos y persistencia local | ✅ Cubre los mismos contenidos | ➖ Persistencia remota con caché local. No trabaja el almacén local de forma explícita |
| C2 Aplicabilidad profesional | ✅ Es la recomendación oficial: guía de [Room](https://developer.android.com/training/data-storage/room) y de [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) | ➖ Es código heredado. La documentación oficial recomienda Room frente a SQLite directo | ✅ Muy usado en *startups* y prototipos (valoración propia) |
| C3 Disponibilidad y coste | ✅ Gratuito y sin conexión | ✅ Gratuito | ➖ Plan gratuito con límites. Necesita una cuenta de Google y hay que tratar la privacidad de datos de menores |
| C4 Popularidad y comunidad | Valoración propia: es el estándar en Android moderno | Valoración propia: abundante, pero antiguo | Valoración propia: amplia |
| C5 Vigencia y soporte | ✅ Room es parte de Jetpack y tiene soporte para Kotlin Multiplatform | ➖ No está obsoleto, pero no evoluciona | ✅ Mantenido por Google |
| C6 Recursos didácticos | ✅ Codelabs oficiales | ✅ Material abundante, pero en Java | ➖ Documentación oficial |
| C7 Continuidad curricular | ✅ SQL y ORM enlazan con MP0484 (Bases de datos) y MP0486 (Acceso a datos), donde se ven JPA y Hibernate | ✅ SQL puro | ➖ NoSQL; se ve también en MP0486 |
| C8 Viabilidad en el aula | ✅ Funciona sin red. Se inspecciona con el *Database Inspector* de Android Studio | ✅ | ➖ Depende de la red y de cuentas |

## Decisión

**A. Room + DataStore (Preferences).** Pesan C2 y C5 (recomendación oficial y vigencia), C7 (continuidad con Acceso a datos) y C8 (funciona sin red). `SharedPreferences` y `SQLiteOpenHelper` se muestran como código heredado. Firestore queda como ampliación.

## Consecuencias

- Room necesita el procesador KSP en Gradle. Se entrega ya configurado en la plantilla del proyecto.
- La base de datos expone `Flow`, lo que encaja con el flujo unidireccional de la DEC-PMDM-01/02.
- **Plan B:** en Flutter, `drift` o `sqflite` + `shared_preferences`. En KMP, Room KMP o SQLDelight.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Android Developers, Room y DataStore (enlaces de la tabla), consultados el 2026-10-27.
