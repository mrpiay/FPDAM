# DEC-PMDM-07 · Motor para el juego 3D

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD08, UD10 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han creado materiales para determinar las propiedades finales de la superficie de un objeto.» (RA5.d) · «Se han establecido las propiedades físicas de los objetos.» (RA5.e) · «Se han utilizado cámaras y configurado la iluminación.» (RA5.g) · «Se han desarrollado e implantado juegos para dispositivos móviles.» (RA5.h) · «Se han realizado pruebas de funcionamiento y optimización de los juegos desarrollados.» (RA5.i). Fuente: RD 405/2023, anexo I, MP0489, RA5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

## Alternativas evaluadas

| Criterio | A. Unity 6.3 LTS (C#, URP) | B. Godot 4 3D | C. Unreal Engine 5 (C++/Blueprints) |
|---|---|---|---|
| C1 Normativa | ✅ Materiales PBR (URP/Lit), Rigidbody y PhysicMaterial, AudioSource, Camera y Cinemachine, luces, *build* Android, Profiler | ✅ StandardMaterial3D, RigidBody3D, AudioStreamPlayer3D, Camera3D, luces, exportación a Android, profiler | ✅ Lo cubre todo |
| C2 Aplicabilidad profesional | ✅ Valoración propia: muy extendido en juegos móviles comerciales. Casos en [unity.com/case-study](https://unity.com/case-study) | ➖ Valoración propia: menos presente en estudios de 3D | ✅ Valoración propia: muy presente en producciones de consola y PC, menos en móvil |
| C3 Disponibilidad y coste | ✅ Personal gratuito hasta 200 000 USD de ingresos y financiación. El *Runtime Fee* se canceló el 12 de septiembre de 2024 ([unity.com/products/pricing-updates](https://unity.com/products/pricing-updates)). Licencia educativa disponible | ✅ MIT, sin regalías ([godotengine.org/license](https://godotengine.org/license/)) | ➖ Gratuito con regalías a partir de cierto nivel de ingresos (hay que consultar el EULA vigente). **Requisitos de hardware altos** |
| C4 Popularidad y comunidad | Valoración propia: comunidad muy grande y Unity Learn | Valoración propia: grande y en crecimiento | Valoración propia: muy grande |
| C5 Vigencia y soporte | ✅ 6.3 LTS con soporte hasta diciembre de 2027. La 6.0 LTS tenía soporte hasta octubre de 2026 ([unity.com/releases/unity-6](https://unity.com/releases/unity-6)) | ✅ Rama 4.x activa | ✅ |
| C6 Recursos didácticos | ✅ Documentación oficial y tutoriales de [Unity Learn](https://learn.unity.com/) (*Roll-a-ball*, *Junior Programmer*) | ➖ Documentación oficial | ➖ Documentación oficial |
| C7 Continuidad curricular | ✅ C# es cercano a Java (MP0485) y a .NET. Completa la comparativa con Godot (RA4.d) | ➖ Repetir motor reduce la comparativa | ➖ C++ no se ve en el ciclo |
| C8 Viabilidad en el aula | ➖ Instalación grande. Con 8 GB de RAM funciona en escenas pequeñas si no se abre Android Studio a la vez | ✅ Ligero (renderizadores *Mobile*/*Compatibility*) | ❌ Inviable en la mayoría de equipos de aula y para exportar a móviles modestos |

## Decisión

**A. Unity 6.3 LTS.** Pesan C2 (presencia en la industria), C6 (tutoriales oficiales de Unity Learn), C7 (C# y comparativa con Godot) y C5. Se usa **6.3 LTS** y no 6.0 LTS porque esta pierde el soporte en octubre de 2026, al empezar el curso. Unreal se analiza solo de forma teórica en la UD08 (C8 ❌).

## Consecuencias

- La imagen del aula debe incluir Unity Hub, Unity 6.3 LTS y *Android Build Support* (con OpenJDK y Android SDK & NDK Tools).
- Hay que gestionar las licencias: Unity Personal, o Education si el centro la solicita.
- **Riesgo:** equipos con poca RAM. Se mitiga con la plantilla *Universal 3D* en calidad baja, escenas pequeñas y sin abrir Android Studio a la vez. Como último recurso, Godot 3D (plan B individual).
- **Plan B:** si el centro no puede instalar Unity, la UD10 se hace en Godot 4 3D con la misma rúbrica.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Unity, Pricing updates y Unity 6 releases (enlaces de la tabla), consultados el 2026-10-27.
- Godot Engine, licencia: ver las fuentes de [DEC-PMDM-06](DEC-PMDM-06-motor-2d.md#fuentes).
- Unreal Engine: condiciones en [unrealengine.com/license](https://www.unrealengine.com/license). No se citan cifras de regalías; hay que comprobarlas en la fuente.
