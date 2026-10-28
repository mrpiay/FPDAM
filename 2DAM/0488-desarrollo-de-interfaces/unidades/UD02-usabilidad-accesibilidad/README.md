# UD02 · Diseño de interfaces: usabilidad, accesibilidad, wireframes y mockups

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 20 h · ≈ 24 sesiones de 50 min (estimación; semanas 4–7) | RA4 (a–i, principal) |

> Herramienta de prototipado: Penpot o Figma. Justificación en [DEC-DI-02](../../decisiones/DEC-DI-02-herramienta-prototipado.md).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA4.a | Se han identificado los principales estándares de usabilidad y accesibilidad. | [RD 405/2023, anexo I, 0488, RA4.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | Prueba en aula del 1.er trimestre; P2 (referencias en la guía de estilo) |
| RA4.b | Se ha valorado la importancia del uso de estándares para la creación de interfaces. | [RD 405/2023, anexo I, 0488, RA4.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: apartado de justificación; A1 |
| RA4.c | Se han creado diferentes tipos de menús cuya estructura y contenido siguen los estándares establecidos. | [RD 405/2023, anexo I, 0488, RA4.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: mockup de barra de menús, menú contextual y menú de navegación |
| RA4.d | Se han distribuido las acciones en menús, barras de herramientas, botones de comando, entre otros, siguiendo un criterio coherente. | [RD 405/2023, anexo I, 0488, RA4.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: matriz de acciones (acción × menú/barra/botón/atajo) |
| RA4.e | Se han distribuido adecuadamente los controles en la interfaz de usuario. | [RD 405/2023, anexo I, 0488, RA4.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: wireframes con rejilla, alineación y agrupación |
| RA4.f | Se ha utilizado el tipo de control más apropiado en cada caso. | [RD 405/2023, anexo I, 0488, RA4.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: tabla de justificación de controles por campo |
| RA4.g | Se ha diseñado el aspecto de la interfaz de usuario (colores y fuentes entre otros) atendiendo a su legibilidad. | [RD 405/2023, anexo I, 0488, RA4.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: guía de estilo y CSS con contraste ≥ 4,5:1 verificado |
| RA4.h | Se ha verificado que los mensajes generados por la aplicación son adecuados en extensión y claridad. | [RD 405/2023, anexo I, 0488, RA4.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: catálogo de mensajes revisado |
| RA4.i | Se han realizado pruebas para evaluar la usabilidad y accesibilidad de la aplicación. | [RD 405/2023, anexo I, 0488, RA4.i](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P2: evaluación heurística cruzada. Se completa en UD09 con test de usuarios y SUS |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Diseño de interfaces gráficas», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Usabilidad y accesibilidad. Características. Pautas. Estándares.
- Medidas de usabilidad y accesibilidad de las aplicaciones; herramientas.
- Esquemas (Wireframes) y Maquetas (Mockups).
- Pautas de diseño de la estructura de la interfaz de usuario; menús, ventanas, cuadros de diálogo, atajos de teclado, entre otros.
- Pautas de diseño del aspecto de la interfaz de usuario: colores, fuentes, iconos, distribución de los elementos.
- Pautas de diseño de los elementos interactivos de la interfaz de usuario: Botones de comando, listas desplegables, entre otros.
- Pautas de diseño de la secuencia de control de la aplicación.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Definir usabilidad y accesibilidad y citar los estándares que las regulan (ISO 9241, WCAG 2.2, UNE-EN 301549) y su obligatoriedad legal.
2. Aplicar las 10 heurísticas de Nielsen para diseñar y para evaluar.
3. Elaborar wireframes, mockups y prototipos navegables en Penpot o Figma.
4. Distribuir acciones y controles con coherencia y elegir el control adecuado a cada dato.
5. Definir una guía de estilo legible y accesible e implementarla en CSS de JavaFX.
6. Redactar mensajes de error, confirmación e información claros.
7. Llevar a cabo una evaluación heurística y una revisión de accesibilidad con herramientas.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Usabilidad y accesibilidad: conceptos y estándares (RA4.a, b)

- **Usabilidad.** Según la [ISO 9241-11:2018](https://www.iso.org/standard/63500.html), es el grado en que un producto puede ser usado por usuarios específicos para lograr objetivos específicos con **efectividad, eficiencia y satisfacción** en un contexto de uso determinado. Es una traducción libre de la definición del estándar.
- **Accesibilidad.** Que el producto lo pueda usar el mayor número posible de personas, con independencia de sus capacidades visuales, auditivas, motoras o cognitivas. No solo beneficia a personas con discapacidad: también ayuda a quien usa el teclado, a personas mayores y a quien trabaja con sol en la pantalla.

| Estándar o norma | Qué aporta (resumen propio) | Fuente oficial |
|---|---|---|
| ISO 9241-110:2020 | Principios de interacción: adecuación a la tarea, autodescriptividad, conformidad con las expectativas, facilidad de aprendizaje, controlabilidad, tolerancia a errores y compromiso del usuario | [iso.org/standard/75258](https://www.iso.org/standard/75258.html) |
| ISO 9241-210:2019 | Diseño centrado en las personas como proceso iterativo: contexto de uso → requisitos → diseño → evaluación | [iso.org/standard/77520](https://www.iso.org/standard/77520.html) |
| WCAG 2.2 (W3C, 2023) | Pautas de accesibilidad organizadas en 4 principios (perceptible, operable, comprensible, robusto) y 3 niveles de conformidad (A, AA, AAA). Es la referencia técnica en la que se apoya la norma europea | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) · [traducción autorizada](https://www.w3.org/Translations/WCAG22-es/) |
| UNE-EN 301549 (EN 301 549 V3.2.1) | Norma europea armonizada de requisitos de accesibilidad para productos y servicios TIC. Su **capítulo 11** trata el software, incluido el que no es web | [ETSI EN 301 549 V3.2.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf) |
| RD 1112/2018 | Accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público | [BOE](https://www.boe.es/eli/es/rd/2018/09/07/1112) |
| Ley 11/2023 | Transpone, entre otras, la Directiva (UE) 2019/882 (Acta Europea de Accesibilidad) sobre requisitos de accesibilidad de determinados productos y servicios | [BOE](https://www.boe.es/eli/es/l/2023/05/08/11) |
| Guías de plataforma (no normativas) | Convenciones de menús, atajos y diálogos | [Windows](https://learn.microsoft.com/es-es/windows/apps/design/), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/), [GNOME HIG](https://developer.gnome.org/hig/) |

> Las fichas de ISO solo muestran el resumen; el texto completo es de pago. En el aula se trabaja con los resúmenes y con WCAG, que es de acceso libre.

Por qué seguir estándares:

- El usuario ya conoce las convenciones, así que se reduce el aprendizaje y hay menos errores.
- Se puede verificar de forma objetiva.
- En determinados ámbitos es obligatorio: sector público (RD 1112/2018) y productos y servicios incluidos en la Ley 11/2023. Antes de afirmar que un caso concreto está obligado, hay que comprobar el ámbito de aplicación de cada norma.

### 2. Heurísticas de Nielsen

No son una norma: son una propuesta de Jakob Nielsen muy extendida en la profesión. Fuente: [Nielsen Norman Group, *10 Usability Heuristics*](https://www.nngroup.com/articles/ten-usability-heuristics/). Lista traducida:

1. Visibilidad del estado del sistema.
2. Correspondencia entre el sistema y el mundo real.
3. Control y libertad del usuario (deshacer, cancelar).
4. Consistencia y estándares.
5. Prevención de errores.
6. Reconocer antes que recordar.
7. Flexibilidad y eficiencia de uso (atajos).
8. Diseño estético y minimalista.
9. Ayudar a reconocer, diagnosticar y recuperarse de errores.
10. Ayuda y documentación.

En una **evaluación heurística** 3–5 evaluadores revisan por separado y anotan cada problema con la heurística que incumple y su **gravedad** (0 = no es problema … 4 = catástrofe). Después se unifican los resultados.

### 3. Medidas y herramientas (RA4.i)

| Medida | Cómo |
|---|---|
| Efectividad | % de tareas completadas, número de errores |
| Eficiencia | Tiempo por tarea, número de clics o pulsaciones |
| Satisfacción | Cuestionario **SUS** (System Usability Scale, J. Brooke, 1996; 10 ítems de Likert 1–5): puntuación = 2,5 × [Σ(impares − 1) + Σ(5 − pares)]; > 68 se considera por encima de la media |
| Accesibilidad | Lista de verificación WCAG/EN 301549, contraste, navegación solo con teclado, lector de pantalla |

Herramientas: **Accessibility Insights for Windows** (inspecciona el árbol de UI Automation, que JavaFX expone), **NVDA** o Narrador, **Colour Contrast Analyser** (TPGi), simuladores de daltonismo (Penpot/Figma, Coblis) y **Maze/Lookback** para tests remotos.

### 4. Wireframes y mockups

| Artefacto | Fidelidad | Contenido | Herramienta |
|---|---|---|---|
| Boceto | Muy baja | Papel, ideas rápidas | Papel, pizarra |
| **Wireframe** (esquema) | Baja | Estructura, jerarquía y ubicación de bloques, en escala de grises y sin estilo | Penpot, Figma, Balsamiq |
| **Mockup** (maqueta) | Alta | Aspecto final estático: colores, tipografía, iconos y datos realistas | Penpot, Figma |
| Prototipo | Media/alta | Mockups enlazados con interacciones navegables | Penpot (*Prototype*), Figma |

En Penpot o Figma conviene trabajar con **componentes** (botón, campo, fila de tabla) y variantes de estado (normal, foco, deshabilitado, error), **rejillas** (8 px) y ***tokens* de color y tipografía**. Así lo que se diseña coincide con el CSS después.

### 5. Estructura de la interfaz (RA4.c, d)

**Menús.** Barra de menús con el orden convencional: **Archivo · Edición · Ver · [específicos] · Herramientas · Ayuda**. A esto se suman los menús contextuales (botón derecho, solo acciones del elemento señalado), los menús de navegación (lateral) y los menús de botón (`MenuButton`/`SplitMenuButton`). Reglas:

- Opciones como verbos o sustantivos claros. Puntos suspensivos (`Exportar…`) si abren un diálogo que pide más datos.
- Agrupar con separadores. Como máximo 7 ± 2 elementos por grupo y no más de 2 niveles de submenú.
- Mnemónico único por nivel (`_Archivo` → Alt+A) y atajos estándar (Ctrl+N, Ctrl+S, Ctrl+F, F1, Supr).
- Deshabilitar en lugar de ocultar las opciones que no están disponibles en ese momento, para mantener la consistencia.

**Distribución de acciones** (matriz que se pide en la práctica):

| Acción | Menú | Barra herr. | Botón en pantalla | Contextual | Atajo |
|---|---|---|---|---|---|
| Nuevo cliente | Archivo › Nuevo › Cliente | ✔ | ✔ (lista de clientes) | — | Ctrl+N |
| Guardar | Archivo › Guardar | ✔ | ✔ (formulario) | — | Ctrl+S |
| Eliminar | Edición › Eliminar | — | — | ✔ | Supr (con confirmación) |
| Buscar | Edición › Buscar… | campo | — | — | Ctrl+F |
| Ayuda de esta pantalla | Ayuda › Ayuda contextual | — | — | — | F1 |

Criterio: las acciones frecuentes van a la barra de herramientas y tienen atajo; todas las acciones están en el menú (es donde se descubren); las destructivas, nunca en un sitio donde se puedan pulsar por error.

**Ventanas y diálogos.** Modal solo si hace falta una respuesta para continuar. Botón por defecto: la acción segura. En Windows el orden es Aceptar/Cancelar a la derecha. Los diálogos se cierran con Esc. **Secuencia de control:** flujo de tareas lineal, asistentes (*wizards*) para procesos largos, foco inicial en el primer campo y orden de tabulación de izquierda a derecha y de arriba abajo.

### 6. Distribución y elección de controles (RA4.e, f)

- **Gestalt:** proximidad (agrupar lo relacionado), semejanza, alineación (etiquetas alineadas a la derecha o encima) y región común (`TitledPane`, bordes sutiles).
- Rejilla de 8 px, márgenes uniformes, una sola columna en formularios largos y la acción principal abajo a la derecha.

| Dato | Control apropiado | Evitar |
|---|---|---|
| Texto libre corto | `TextField` con `promptText` | — |
| Una opción entre 2–5 | `RadioButton` en `ToggleGroup` o `ToggleButton` | `ComboBox` (oculta opciones) |
| Una opción entre muchas | `ComboBox` (editable con autocompletado si hay > 15) | Radio buttons |
| Sí/No | `CheckBox` | Combo «Sí/No» |
| Fecha | `DatePicker` | Tres `TextField` |
| Número acotado | `Spinner` o `Slider` con valor visible | `TextField` sin validar |
| Varias opciones | `CheckBox` o `ListView` con selección múltiple | — |
| Colección de registros | `TableView` ordenable y filtrable | `TextArea` |

### 7. Aspecto y legibilidad (RA4.g)

Criterios de WCAG 2.2 que más se aplican ([w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)):

- **Contraste (WCAG 2.2, criterio 1.4.3, nivel AA):** texto normal ≥ **4,5:1**; texto grande (≥ 18,66 px en negrita o ≥ 24 px) ≥ 3:1. Componentes de interfaz y gráficos (criterio 1.4.11): ≥ 3:1.
- **No usar el color como único medio** para transmitir información (criterio 1.4.1): error = color + icono + texto.
- *(Recomendación propia, no es un criterio WCAG)* Tipografía sin serifa con buena altura de x (Segoe UI, Inter, Noto Sans), 13–14 px como base y como máximo 2 familias. Interlineado de 1,4.
- **Foco visible** (criterio 2.4.7) y **foco no oculto** (criterio 2.4.11, nuevo en 2.2).
- **Tamaño mínimo del objetivo** de 24 × 24 px CSS, con excepciones (criterio 2.5.8, nuevo en 2.2).
- *(Recomendación propia)* Iconos coherentes de una sola familia (Material Symbols, Ikonli), con texto o *tooltip*.

CSS de JavaFX con variables *looked-up* (equivalente a *tokens*):

```css
/* app.css */
.root {
    -color-fondo: #ffffff;
    -color-texto: #1f2328;        /* contraste 15,8:1 sobre blanco */
    -color-primario: #0b5cad;     /* 6,4:1 sobre blanco */
    -color-error: #b3261e;        /* 6,5:1 sobre blanco */
    -fx-font-family: "Segoe UI", "Noto Sans", sans-serif;
    -fx-font-size: 14px;
    -fx-background-color: -color-fondo;
}
.label { -fx-text-fill: -color-texto; }

.button.primario {
    -fx-background-color: -color-primario;
    -fx-text-fill: white;
    -fx-min-height: 32px;         /* objetivo ≥ 24 px */
}
/* Foco visible y bien contrastado */
.button:focused, .text-field:focused, .combo-box:focused {
    -fx-border-color: #ffbf47;
    -fx-border-width: 2px;
    -fx-border-radius: 3px;
}
.text-field.error {
    -fx-border-color: -color-error;
}
.mensaje-error {
    -fx-text-fill: -color-error;
    -fx-graphic: url("../img/error.png");  /* icono además del color */
}
```

Se puede ofrecer un **tema de alto contraste** cambiando la hoja: `scene.getStylesheets().setAll(alto)`.

> **Alternativa.** En WPF los estilos se definen en `ResourceDictionary` y la accesibilidad con `AutomationProperties.Name`. En la web (Electron), con CSS y atributos ARIA. En Compose, con `Modifier.semantics { contentDescription = ... }`.

**Accesibilidad específica de JavaFX:**

```java
btnBuscar.setAccessibleText("Buscar clientes");           // nombre para el lector de pantalla
btnBuscar.setAccessibleHelp("Abre la búsqueda avanzada");
imgLogo.setAccessibleRole(AccessibleRole.IMAGE_VIEW);
lblNif.setLabelFor(txtNif);                               // asocia etiqueta y campo
```

Los botones que solo tienen icono **siempre** deben llevar `accessibleText` y `tooltip`.

### 8. Mensajes (RA4.h)

Un buen mensaje dice **qué ha pasado, por qué y qué hacer**, con lenguaje del usuario, sin culpabilizar y sin códigos técnicos (estos van al log).

| Mal | Bien |
|---|---|
| `SQLException: UNIQUE constraint failed: cliente.nif` | «Ya existe un cliente con el NIF 12345678Z. Búscalo en la lista o revisa el número.» |
| «Error» | «No se ha podido guardar la orden porque falta la matrícula del vehículo.» |
| «¿Está seguro?» [Sí] [No] | «¿Eliminar la orden 2026/031? No se puede deshacer.» [Eliminar] [Cancelar] |

Extensión: título de 2–5 palabras y cuerpo de 1–2 frases. Los errores de validación se muestran **junto al campo**, no en un diálogo. Las confirmaciones solo para acciones irreversibles; para el resto es mejor ofrecer deshacer.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Caza de errores.** En grupos, se muestran 6 capturas de aplicaciones reales con problemas. Cada grupo asigna la heurística incumplida y la gravedad y propone una corrección.
- **A2. Comprobación de contraste.** Medir con Colour Contrast Analyser la paleta de una aplicación que use el alumnado habitualmente y corregir 3 combinaciones que no cumplan AA.
- **A3. Wireframe en papel → Penpot.** Bocetar en 10 minutos la pantalla «Órdenes de reparación» y pasarla a un wireframe con rejilla de 8 px.
- **A4. Solo con teclado y lector de pantalla.** Usar el formulario de la P1 únicamente con teclado y con NVDA o Narrador activado. Anotar qué no se puede hacer o qué no se anuncia.
- **A5. Reescribir mensajes.** Transformar 10 mensajes técnicos en mensajes útiles siguiendo la plantilla qué/por qué/qué hacer.
- **A6. Análisis de una sede electrónica.** Revisar la declaración de accesibilidad de una web pública (por ejemplo, la sede electrónica de una administración pública) según el [RD 1112/2018](https://www.boe.es/eli/es/rd/2018/09/07/1112). Identificar qué criterios WCAG declara incumplidos y por qué.
- **A7. Componentes y variantes en Penpot.** Crear la biblioteca de componentes del gestor de taller (botón con 4 estados, campo con error, fila de tabla) y usarla en los wireframes de A3.
- **A8. Simulación de discapacidad.** Revisar el mockup con un simulador de daltonismo y con zoom al 200 % (WCAG 1.4.4). Anotar qué se pierde.

**Reparto orientativo (20 h):** teoría y análisis de casos, 6 h · actividades A1–A8, 7 h · P2 en aula, 6 h · evaluación cruzada y defensa, 1 h.

### Práctica evaluable

**P2 · Diseño UX accesible del gestor de taller (hito H2, `v0.2`).** Partiendo de los requisitos del proyecto:

1. Wireframes de las 5 pantallas clave (principal, lista de clientes, ficha de cliente con vehículos, orden de reparación y búsqueda).
2. Mockups de alta fidelidad y un prototipo navegable en Penpot o Figma, con la barra de menús, un menú contextual y la navegación lateral.
3. Guía de estilo (`docs/guia-estilo.md`): paleta con ratios de contraste, tipografía, iconos, espaciado, componentes y estados.
4. Matriz de acciones y tabla de justificación de controles.
5. Catálogo de al menos 12 mensajes de la aplicación.
6. `app.css` aplicado a las ventanas de la P1, con foco visible y mnemónicos.
7. Evaluación heurística **cruzada** del prototipo de otro compañero o compañera (mínimo 8 hallazgos con gravedad) y respuesta a la evaluación recibida.

**Conexión con el mundo real:** es la fase de *discovery* y diseño de un proyecto de producto. El cliente valida un prototipo antes de pagar el desarrollo, y la guía de estilo hace de *design system* que el equipo comparte. Las auditorías de accesibilidad con EN 301549 se piden en las licitaciones públicas.

Entregables: enlace al proyecto Penpot/Figma (en modo lectura) y exportación en PDF; ficheros en `docs/`; etiqueta `v0.2`.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA4.a | Cita y aplica de forma correcta ISO 9241, WCAG 2.2 (criterios concretos) y EN 301549 | Cita los estándares con alguna imprecisión | No identifica los estándares |
| RA4.b | Argumenta el valor de los estándares (usuario, legal, verificabilidad) con ejemplos propios | Argumentación genérica | Sin argumentación |
| RA4.c | Tres tipos de menú con orden convencional, mnemónicos únicos, atajos estándar y agrupación | Menús correctos con algún fallo de convención | Menús desordenados o incompletos |
| RA4.d | Matriz completa y coherente: lo frecuente en la barra, todo en el menú y lo destructivo protegido | Matriz con incoherencias leves | Sin matriz o acciones dispersas sin criterio |
| RA4.e | Rejilla, alineación y agrupación consistentes en todas las pantallas | Pequeñas inconsistencias | Distribución desordenada |
| RA4.f | Cada control está justificado y es el más adecuado al dato | Algún control mejorable | Elecciones inadecuadas frecuentes |
| RA4.g | Toda la paleta ≥ AA medida, foco visible, objetivos ≥ 24 px y CSS fiel a la guía | Cumple AA con alguna excepción menor | No cumple contraste o no hay guía |
| RA4.h | Los 12 mensajes siguen qué/por qué/qué hacer, con extensión adecuada y sin jerga | La mayoría son correctos | Mensajes técnicos o ambiguos |
| RA4.i | Evaluación heurística rigurosa (≥ 8 hallazgos con gravedad y propuesta) y corrección de los hallazgos recibidos | Evaluación correcta pero superficial | No realiza la evaluación |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:** [WCAG 2.2 (traducción autorizada al español)](https://www.w3.org/Translations/WCAG22-es/) · [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) · [EN 301 549 V3.2.1 (ETSI)](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf) · [Observatorio de Accesibilidad (PAe)](https://administracionelectronica.gob.es/pae_Home/pae_Estrategias/pae_Accesibilidad.html) · [Nielsen Norman Group: 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [JavaFX CSS Reference Guide](https://openjfx.io/javadoc/25/javafx.graphics/javafx/scene/doc-files/cssref.html) · [Windows: diseño y accesibilidad](https://learn.microsoft.com/es-es/windows/apps/design/accessibility/accessibility) · [Penpot docs](https://help.penpot.app/)
- **Herramientas:** Penpot / Figma, Colour Contrast Analyser, Accessibility Insights for Windows, NVDA, cuestionario SUS.
