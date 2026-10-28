# DEC-PMDM-06 · Motor para el juego 2D

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0489 · UD08, UD09 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Desarrolla juegos 2D y 3D sencillos utilizando motores de juegos.» Fuente: RD 405/2023, anexo I, MP0489, RA5 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Criterios a) a j).

> «Se han analizado diferentes motores de juegos, sus características y funcionalidades.» Fuente: RD 405/2023, anexo I, MP0489, RA4.d

> «Motores de juegos: Tipos y utilización.» Fuente: RD 405/2023, anexo I, MP0489, contenidos básicos, bloque «Análisis de motores de juegos»

La norma no nombra ningún motor. El juego 2D (UD09) debe incluir lógica, objetos, escenas, físicas, sonido y exportación a Android.

## Alternativas evaluadas

| Criterio | A. Godot 4 (GDScript) | B. Unity 6.3 LTS 2D (C#) | C. Defold (Lua) | D. GameMaker (GML) |
|---|---|---|---|---|
| C1 Normativa | ✅ Cubre RA5.a-c, e, f, h-j en 2D, con exportación a Android | ✅ Igual | ✅ Igual | ✅ Igual |
| C2 Aplicabilidad profesional | ➖ Juegos comerciales publicados ([godotengine.org/showcase](https://godotengine.org/showcase/)). Valoración propia: menos presencia que Unity en las ofertas de empleo | ✅ Valoración propia: el motor con más presencia en estudios de juegos móviles. Casos en [unity.com/case-study](https://unity.com/case-study) | ➖ De nicho (valoración propia) | ➖ Muy usado en 2D independiente (valoración propia) |
| C3 Disponibilidad y coste | ✅ Licencia MIT: «free and open source software released under the permissive MIT license», sin regalías ([godotengine.org/license](https://godotengine.org/license/)). Sin cuenta ni instalador | ✅ Unity Personal gratuito, «available to customers with up to $200,000 in revenue and funding» ([unity.com/products/pricing-updates](https://unity.com/products/pricing-updates)). Necesita Unity ID | ✅ Gratuito, con licencia propia | ➖ Gratuito para uso no comercial |
| C4 Popularidad y comunidad | Valoración propia: comunidad grande y en crecimiento, documentación traducida al español | Valoración propia: la comunidad más grande | Valoración propia: pequeña | Valoración propia: mediana |
| C5 Vigencia y soporte | ✅ Rama 4.x activa, con versiones de mantenimiento | ✅ 6.3 LTS con soporte hasta diciembre de 2027 ([unity.com/releases/unity-6](https://unity.com/releases/unity-6)) | ✅ | ✅ |
| C6 Recursos didácticos | ➖ Documentación oficial excelente y *demo projects*, pero **hay que preparar material propio** | ✅ Documentación oficial y tutoriales de [Unity Learn](https://learn.unity.com/) | ➖ Poco material en español | ➖ |
| C7 Continuidad curricular | ✅ Se suma a Unity: dos motores permiten la **comparativa real** que pide RA4.d | ➖ Usar Unity para los dos juegos reduce la comparativa a la teoría | ➖ Lenguaje nuevo | ➖ Lenguaje propio |
| C8 Viabilidad en el aula | ✅ Pesa unos 100 MB, arranca en segundos y va bien en equipos de 8 GB. La exportación a Android reutiliza el SDK del bloque 1 | ➖ Unos 12-15 GB con *Android Build Support*. Más pesado en equipos modestos | ✅ Ligero | ✅ Ligero |

## Decisión

**A. Godot 4** para el 2D. Pesan C3 (libre y sin cuentas), C8 (ligero y se aprende rápido en 26 h) y C7 (junto con Unity en el 3D permite comparar dos arquitecturas, nodos y escenas frente a GameObjects y componentes). Se asume su punto débil en C6 (no hay material didáctico previo) y se compensa con material propio y la documentación oficial.

## Consecuencias

- Hace falta preparar material propio de Godot (UD09).
- La exportación a Android requiere configurar en Godot la ruta del Android SDK y un JDK, y descargar las plantillas de exportación.
- **Riesgo:** menos presencia en ofertas de empleo que Unity. Se compensa con Unity en la UD10, y los conceptos (escenas, físicas, señales/eventos) son transferibles.
- **Plan B:** hacer el 2D en Unity, apoyándose en la documentación oficial y en Unity Learn. La UD09 mantiene CE y rúbrica; solo cambia la herramienta.

## Fuentes

- Fuente común: [índice](README.md#fuente-comun).
- Godot Engine, licencia ([godotengine.org/license](https://godotengine.org/license/)), consultado el 2026-10-27.
- Unity, Pricing updates ([unity.com/products/pricing-updates](https://unity.com/products/pricing-updates)) y Unity 6 releases ([unity.com/releases/unity-6](https://unity.com/releases/unity-6)), consultados el 2026-10-27.
