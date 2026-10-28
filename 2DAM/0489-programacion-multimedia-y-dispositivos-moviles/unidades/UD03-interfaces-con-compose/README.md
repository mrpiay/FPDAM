# UD03 · Interfaces de usuario con Jetpack Compose

> **Bloque MP0489_12 · Programación de dispositivos móviles.**
> Decisiones relacionadas: [DEC-PMDM-02](../../decisiones/DEC-PMDM-02-ui-toolkit.md), [DEC-PMDM-09](../../decisiones/DEC-PMDM-09-contenidos-anadidos.md).

| Duración orientativa | RA trabajados |
|---|---|
| 16 h | RA2 (CE b, g) · RA1.d (refuerzo) · RA3.f (introducción) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.b | Se han analizado y utilizado las clases que modelan ventanas, menús, alertas y controles para el desarrollo de aplicaciones gráficas sencillas. | RD 405/2023, anexo I, MP0489, RA2.b | P3 (hito 1) · PE |
| RA2.g | Se han realizado pruebas de interacción usuario-aplicación para optimizar las aplicaciones desarrolladas a partir de emuladores. | RD 405/2023, anexo I, MP0489, RA2.g | P3 (pruebas de UI y prueba en dos AVD). Se completa en la UD06 (P6) |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Explicar el modelo declarativo de Compose: funciones `@Composable`, estado, recomposición y elevación del estado (*state hoisting*).
2. Construir pantallas con *layouts*, listas perezosas y `Scaffold`.
3. Usar las clases que modelan ventanas, menús, alertas y controles de Material 3.
4. Gestionar los eventos de entrada: pulsaciones, gestos, teclado e IME.
5. Dibujar en el contexto gráfico (`Canvas`) y mostrar imágenes locales y remotas.
6. Probar la interacción con pruebas de UI de Compose y en emuladores de distintas configuraciones.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Desarrollo de aplicaciones para dispositivos móviles».

- Interfaces de usuario. Clases asociadas.
- Contexto gráfico. Imágenes.
- Métodos de entrada. Eventos.

### Desarrollo de los contenidos (propuesta del docente)

### 1. El modelo declarativo

- Una función `@Composable` **describe** la interfaz a partir del estado. Cuando el estado cambia, Compose vuelve a ejecutar las funciones afectadas (**recomposición**).
- El estado se guarda con `remember { mutableStateOf(…) }` o, si debe sobrevivir a la rotación, con `rememberSaveable`.
- **Elevación del estado:** el *composable* recibe el valor y una lambda para notificar los cambios. Así no tiene estado propio, se reutiliza mejor y se puede probar.

```kotlin
@Composable
fun CampoTitulo(valor: String, onCambio: (String) -> Unit, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = valor,
        onValueChange = onCambio,
        label = { Text("Título") },
        singleLine = true,
        isError = valor.isBlank(),
        supportingText = { if (valor.isBlank()) Text("Obligatorio") },
        modifier = modifier.fillMaxWidth(),
    )
}
```

### 2. Layouts y listas

- `Column`, `Row` y `Box` organizan los elementos. `Spacer` añade espacio y `Arrangement`/`Alignment` controlan la distribución.
- `Modifier` se encadena y **el orden importa**: `padding().background()` no da el mismo resultado que `background().padding()`.
- `LazyColumn`, `LazyRow` y `LazyVerticalGrid` solo componen lo visible, como el antiguo `RecyclerView`. Hay que dar una `key` estable a cada elemento.

```kotlin
@Composable
fun ListaObservaciones(items: List<Observacion>, onClick: (Long) -> Unit, contentPadding: PaddingValues) {
    LazyColumn(contentPadding = contentPadding, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        items(items, key = { it.id }) { obs ->
            ListItem(
                headlineContent = { Text(obs.titulo) },
                supportingContent = { Text(obs.categoria.etiqueta) },
                leadingContent = { Icon(Icons.Default.Place, contentDescription = null) },
                modifier = Modifier.clickable { onClick(obs.id) },
            )
        }
    }
}
```

### 3. Ventanas, menús, alertas y controles (RA2.b)

| Concepto del BOE | Clases de Compose y Material 3 |
|---|---|
| Ventana | `ComponentActivity` + `setContent`, `Scaffold` (estructura de la pantalla), `TopAppBar`, `BottomAppBar`, `ModalNavigationDrawer`, `ModalBottomSheet` |
| Menú | `DropdownMenu` + `DropdownMenuItem` (menú de desbordamiento), `NavigationBar`/`NavigationRail` (navegación principal), `ExposedDropdownMenuBox` (selector) |
| Alerta | `AlertDialog`, `Snackbar` + `SnackbarHostState`, `DatePickerDialog`, notificaciones del sistema (se ven en la UD05) |
| Control | `Button`, `FilledTonalButton`, `OutlinedButton`, `IconButton`, `FloatingActionButton`, `TextField`, `Checkbox`, `Switch`, `RadioButton`, `Slider`, `FilterChip`, `ProgressIndicator` |

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaLista(
    observaciones: List<Observacion>,
    onAnadir: () -> Unit,
    onAbrir: (Long) -> Unit,
    onBorrarTodo: () -> Unit,
) {
    var menuAbierto by remember { mutableStateOf(false) }
    var confirmarBorrado by remember { mutableStateOf(false) }
    val snackbar = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.app_name)) },
                actions = {
                    IconButton(onClick = { menuAbierto = true }) {
                        Icon(Icons.Default.MoreVert, contentDescription = "Más opciones")
                    }
                    DropdownMenu(expanded = menuAbierto, onDismissRequest = { menuAbierto = false }) {
                        DropdownMenuItem(
                            text = { Text("Borrar todo") },
                            leadingIcon = { Icon(Icons.Default.Delete, null) },
                            onClick = { menuAbierto = false; confirmarBorrado = true },
                        )
                    }
                },
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = onAnadir) { Icon(Icons.Default.Add, contentDescription = "Añadir observación") }
        },
        snackbarHost = { SnackbarHost(snackbar) },
    ) { padding ->
        ListaObservaciones(observaciones, onAbrir, padding)
    }

    if (confirmarBorrado) {
        AlertDialog(
            onDismissRequest = { confirmarBorrado = false },
            title = { Text("¿Borrar todas las observaciones?") },
            text = { Text("Esta acción no se puede deshacer.") },
            confirmButton = {
                TextButton(onClick = {
                    confirmarBorrado = false
                    onBorrarTodo()
                    scope.launch { snackbar.showSnackbar("Observaciones borradas") }
                }) { Text("Borrar") }
            },
            dismissButton = { TextButton(onClick = { confirmarBorrado = false }) { Text("Cancelar") } },
        )
    }
}
```

> **Iconos.** Las versiones recientes de Material 3 ya no incluyen por defecto `material-icons-core`. Si `Icons.Default.*` no resuelve, hay que añadir la dependencia `androidx.compose.material:material-icons-core`, o usar iconos *Material Symbols* importados como recursos vectoriales (`painterResource`). `TopAppBar` sigue necesitando `@OptIn(ExperimentalMaterial3Api::class)`.

Controles en un formulario:

```kotlin
@Composable
fun FormularioObservacion(onGuardar: (Observacion) -> Unit) {
    var titulo by rememberSaveable { mutableStateOf("") }
    var categoria by rememberSaveable { mutableStateOf(Categoria.FAUNA) }
    var abundancia by rememberSaveable { mutableFloatStateOf(1f) }
    var publica by rememberSaveable { mutableStateOf(false) }

    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        CampoTitulo(titulo, { titulo = it })
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Categoria.entries.forEach { c ->
                FilterChip(selected = c == categoria, onClick = { categoria = c }, label = { Text(c.etiqueta) })
            }
        }
        Text("Abundancia: ${abundancia.roundToInt()}")
        Slider(value = abundancia, onValueChange = { abundancia = it }, valueRange = 1f..10f, steps = 8)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Switch(checked = publica, onCheckedChange = { publica = it })
            Spacer(Modifier.width(8.dp)); Text("Compartir públicamente")
        }
        Button(
            onClick = { onGuardar(Observacion(titulo = titulo.trim(), categoria = categoria, abundancia = abundancia.roundToInt(), publica = publica)) },
            enabled = titulo.isNotBlank(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }
    }
}
```

### 4. Métodos de entrada y eventos

- **Pulsación:** `onClick` de los controles, `Modifier.clickable`, `combinedClickable` (pulsación larga).
- **Gestos:** `Modifier.pointerInput(Unit) { detectTapGestures(onDoubleTap = { … }) }`, `detectDragGestures`, `detectTransformGestures` (pellizcar para hacer *zoom*), `Modifier.draggable`, `swipeToDismiss` (`SwipeToDismissBox`).
- **Teclado e IME:** `KeyboardOptions(keyboardType = KeyboardType.Number, imeAction = ImeAction.Done)` y `KeyboardActions(onDone = { … })`. El foco se gestiona con `FocusRequester` y `LocalFocusManager`.
- **Atrás del sistema:** `BackHandler { … }`. Con la navegación predictiva de Android 14+, conviene dejar que lo gestione Navigation.

```kotlin
var escala by remember { mutableFloatStateOf(1f) }
Image(
    painter = painterResource(R.drawable.mapa_illas_cies),
    contentDescription = "Mapa de las islas Cíes",
    modifier = Modifier
        .graphicsLayer(scaleX = escala, scaleY = escala)
        .pointerInput(Unit) { detectTransformGestures { _, _, zoom, _ -> escala = (escala * zoom).coerceIn(1f, 4f) } },
)
```

### 5. Contexto gráfico e imágenes

`Canvas` ofrece un `DrawScope` donde se dibujan primitivas en píxeles. Para convertir unidades se usa `dp.toPx()`.

```kotlin
@Composable
fun GraficoAbundancia(valores: List<Int>, modifier: Modifier = Modifier) {
    val color = MaterialTheme.colorScheme.primary
    Canvas(modifier.fillMaxWidth().height(120.dp)) {
        if (valores.isEmpty()) return@Canvas
        val ancho = size.width / valores.size
        val max = valores.max().coerceAtLeast(1)
        valores.forEachIndexed { i, v ->
            val alto = size.height * v / max
            drawRect(color, topLeft = Offset(i * ancho + 4.dp.toPx(), size.height - alto), size = Size(ancho - 8.dp.toPx(), alto))
        }
    }
}
```

- **Imágenes locales:** `Image(painterResource(...))` para *drawables* y vectores. `ContentScale.Crop` y `Modifier.clip(CircleShape)` controlan el encuadre.
- **Imágenes remotas:** se usa una librería de carga de imágenes, por ejemplo **Coil**. `AsyncImage(model = url, contentDescription = …)` necesita la dependencia de Coil para Compose y su módulo de red. Coil gestiona la caché y la decodificación fuera del hilo principal.
- **Accesibilidad:** `contentDescription` describe las imágenes que aportan información y se deja en `null` en las decorativas. Las áreas táctiles deben medir al menos 48 dp y el texto se escala en `sp`.

### 6. Tema y diseño adaptativo

- `MaterialTheme(colorScheme, typography, shapes)`. En Android 12+ está el color dinámico: `dynamicLightColorScheme(context)`. El modo oscuro se detecta con `isSystemInDarkTheme()`.
- **Adaptativo:** `currentWindowAdaptiveInfo().windowSizeClass` permite mostrar una lista en pantallas compactas y lista + detalle en las expandidas (`NavigationSuiteScaffold`, `ListDetailPaneScaffold`). Esto refuerza RA1.d, las configuraciones de dispositivo.

### 7. Pruebas de interacción (RA2.g, primera parte)

- **`@Preview`** con varios `device` y `uiMode` permite revisar el diseño sin emulador.
- **Pruebas de UI de Compose** (`androidTest`), que se ejecutan en el emulador. Necesitan las dependencias `ui-test-junit4` (androidTest) y `ui-test-manifest` (debug).

```kotlin
class FormularioTest {
    @get:Rule val compose = createComposeRule()

    @Test fun guardarDeshabilitadoSinTitulo() {
        compose.setContent { CuadernoTheme { FormularioObservacion(onGuardar = {}) } }
        compose.onNodeWithText("Guardar").assertIsNotEnabled()
        compose.onNodeWithText("Título").performTextInput("Garza real")
        compose.onNodeWithText("Guardar").assertIsEnabled()
    }
}
```

- **Prueba manual en dos AVD** (compacto y expandido, o tableta), en modo oscuro y con la fuente al 200 %. Se usa **Accessibility Scanner** o el *Compose UI Check* de las vistas previas para detectar problemas de contraste y de tamaño táctil.

> **Alternativa:**
> - En **Flutter**: `Scaffold`, `AppBar`, `PopupMenuButton`, `showDialog`/`AlertDialog`, `ScaffoldMessenger.showSnackBar`, `ListView.builder`, `CustomPaint`, y pruebas con `flutter_test` (`WidgetTester`).
> - En **Compose Multiplatform** el código de esta unidad es prácticamente el mismo.
> - Con **Vistas XML**: `Toolbar` + `onCreateOptionsMenu`, `MaterialAlertDialogBuilder`, `RecyclerView` y Espresso.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Tarjeta de presentación.** Codelab oficial de *layouts* básicos (`Column`, `Row`, `Image`, `Modifier`).
- **A2. Estado y recomposición.** Un contador con `remember` y otro con `rememberSaveable`. Se rota la pantalla y se explica la diferencia. Después se eleva el estado del contador.
- **A3. Catálogo de componentes.** Una pantalla por cada fila de la tabla de la sección 3: una ventana con `Scaffold`, un menú, una alerta y cinco controles.
- **A4. Dibujo libre.** Con `Canvas` y `detectDragGestures`, una pizarra que guarde los trazos en una `mutableStateListOf<Offset>`.
- **A5. Prueba que falla.** Escribir una prueba de UI que falle a propósito y leer el informe. Usar `printToLog()` para ver el árbol semántico.

### Práctica evaluable

**P3 · Hito 1 del «Observaciones de campo»: interfaz.** Se hace en equipo de 2-3 personas, con el flujo de trabajo profesional descrito en la programación (apartado 4.1). De momento, los datos están en memoria (`mutableStateListOf`).

> **Conexión con el mundo real:** es el primer *sprint* de un encargo. A partir del *briefing* del cliente ficticio (una asociación medioambiental) se escriben las historias de usuario como *issues* y se hace el prototipo en Figma (coordinado con MP0488). Después se implementa con revisión de código por PR y se presenta al cliente (el docente) en la *sprint review*.

- **Antes de programar:** de cinco a ocho historias de usuario con criterios de aceptación, un prototipo de baja fidelidad en Figma y el tablero del equipo creado. El repositorio debe tener protegida la rama `main` y la CI de la programación activada.

- Pantalla de **lista** (`LazyColumn`), **detalle** y **formulario** con validación. La navegación se puede hacer de momento con un estado `pantallaActual`; Navigation llega en la UD04.
- `TopAppBar` con un **menú** de desbordamiento, un **diálogo de confirmación** para borrar y un **Snackbar** con la opción «Deshacer».
- Al menos cinco **controles** distintos y un **gráfico** con `Canvas`.
- Textos en `strings.xml` (es y gl) y modo oscuro.
- Al menos **dos pruebas de UI** y una tabla de prueba manual en dos AVD de configuración distinta, con los problemas encontrados y cómo se corrigieron.
- **Entregables:** *release* `hito-1` en el repositorio del equipo (con el APK de *debug* adjunto), `README.md` con capturas en los dos AVD, enlace al prototipo y defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.b | Usa de forma correcta y justificada ventana, menú, diálogo, *snackbar* y cinco o más controles. El estado está elevado y es accesible (`contentDescription`, 48 dp) | Están todos los elementos, pero con estado mal ubicado o detalles de accesibilidad | Faltan menú, alerta o controles, o la app falla al interactuar |
| RA2.g | Tiene dos o más pruebas de UI que pasan en la CI, prueba en dos AVD documentada y mejoras aplicadas a partir de lo que encontró | Tiene una prueba de UI o la prueba manual está incompleta | No hay pruebas |


## Recursos

- **Documentación oficial:**
  - [Pensar en Compose](https://developer.android.com/develop/ui/compose/mental-model)
  - [El estado y Jetpack Compose](https://developer.android.com/develop/ui/compose/state)
  - [Componentes de Material 3](https://developer.android.com/develop/ui/compose/components)
  - [Gestos](https://developer.android.com/develop/ui/compose/touch-input/pointer-input)
  - [Gráficos en Compose](https://developer.android.com/develop/ui/compose/graphics/draw/overview)
  - [Diseño adaptativo](https://developer.android.com/develop/ui/compose/layouts/adaptive)
  - [Probar el diseño de Compose](https://developer.android.com/develop/ui/compose/testing)
  - [Accesibilidad en Compose](https://developer.android.com/develop/ui/compose/accessibility)
- **Codelabs:** [Unidad 1 y 2 de Android Basics with Compose](https://developer.android.com/courses/android-basics-compose/course) · [Material Theming con Compose](https://developer.android.com/codelabs/basic-android-kotlin-compose-material-theming)
- **Herramientas:** vista previa interactiva de Compose, Layout Inspector, Accessibility Scanner (Google Play).
