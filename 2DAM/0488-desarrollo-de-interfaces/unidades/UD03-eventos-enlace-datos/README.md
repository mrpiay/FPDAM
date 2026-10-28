# UD03 · Eventos, enlace a datos y arquitectura MVVM

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 32 h · ≈ 39 sesiones de 50 min (estimación; semanas 7–13) | RA1 (g, h principal; b, c, d, f refuerzo) · RA4 (c–h aplicación) |

> Tecnología: JavaFX + SQLite con MVVM ([DEC-DI-01](../../decisiones/DEC-DI-01-framework-gui.md)). Los contenidos añadidos (MVVM, concurrencia, i18n) se justifican en [DEC-DI-08](../../decisiones/DEC-DI-08-contenidos-anadidos.md).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.g | Se han asociado a los eventos las acciones correspondientes. | [RD 405/2023, anexo I, 0488, RA1.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3: eventos de ratón y teclado, aceleradores, menús contextuales, doble clic y filtros de eventos |
| RA1.h | Se ha desarrollado una aplicación que incluye el interfaz gráfico obtenido. | [RD 405/2023, anexo I, 0488, RA1.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3: El gestor de taller funcional con CRUD sobre SQLite; prueba práctica en aula del 1.er trimestre |
| RA1.b | Se ha creado un interfaz gráfico utilizando las herramientas de un editor visual. | [RD 405/2023, anexo I, 0488, RA1.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (refuerzo): pantallas de órdenes y maestro-detalle diseñadas en Scene Builder |
| RA1.c | Se han utilizado las funciones del editor para ubicar los componentes del interfaz. | [RD 405/2023, anexo I, 0488, RA1.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (refuerzo) |
| RA1.d | Se han modificado las propiedades de los componentes para adecuarlas a las necesidades de la aplicación. | [RD 405/2023, anexo I, 0488, RA1.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (refuerzo) |
| RA1.f | Se ha modificado el código generado por el editor visual. | [RD 405/2023, anexo I, 0488, RA1.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (refuerzo): `cellFactory`, `rowFactory` y `controllerFactory` añadidos al código |
| RA4.c | Se han creado diferentes tipos de menús cuya estructura y contenido siguen los estándares establecidos. | [RD 405/2023, anexo I, 0488, RA4.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz): los menús diseñados en P2, implementados |
| RA4.d | Se han distribuido las acciones en menús, barras de herramientas, botones de comando, entre otros, siguiendo un criterio coherente. | [RD 405/2023, anexo I, 0488, RA4.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz): la matriz de acciones de P2, implementada |
| RA4.e | Se han distribuido adecuadamente los controles en la interfaz de usuario. | [RD 405/2023, anexo I, 0488, RA4.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz) |
| RA4.f | Se ha utilizado el tipo de control más apropiado en cada caso. | [RD 405/2023, anexo I, 0488, RA4.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz): `DatePicker`, `ComboBox`, `Spinner`… según la tabla de P2 |
| RA4.g | Se ha diseñado el aspecto de la interfaz de usuario (colores y fuentes entre otros) atendiendo a su legibilidad. | [RD 405/2023, anexo I, 0488, RA4.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz): CSS y pseudoclases de estado |
| RA4.h | Se ha verificado que los mensajes generados por la aplicación son adecuados en extensión y claridad. | [RD 405/2023, anexo I, 0488, RA4.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P3 (parte de interfaz): validación junto al campo y errores de BD traducidos |

## Contenidos básicos del currículo

> **[Normativo]** Contenidos de los bloques «Generación de interfaces de usuario» y «Diseño de interfaces gráficas» que se trabajan en la unidad. Texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Patrones de arquitectura de las aplicaciones gráficas.
- Componentes: características y campo de aplicación.
- Enlace de componentes a orígenes de datos.
- Asociación de acciones a eventos.
- Edición del código generado por la herramienta de diseño.
- Clases, propiedades, métodos.
- Eventos; escuchadores.
- Pautas de diseño de la secuencia de control de la aplicación.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Explicar el modelo de eventos de JavaFX (tipos, fases de captura y burbujeo, consumo) y aplicarlo con manejadores, filtros y aceleradores.
2. Usar propiedades JavaFX, escuchadores y *bindings* (unidireccionales, bidireccionales y calculados).
3. Mostrar y editar colecciones con `ObservableList`, `FilteredList`, `SortedList` y `TableView`, con celdas personalizadas.
4. Estructurar una aplicación en capas con el patrón MVVM: vista, ViewModel, repositorio JDBC y SQLite.
5. Ejecutar el acceso a datos en segundo plano con `Task` sin bloquear la interfaz.
6. Implementar validación, mensajes y secuencia de control de acuerdo con el diseño de la UD02.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Modelo de eventos de JavaFX

Un `Event` tiene **tipo** (`EventType`, jerárquico: `InputEvent.ANY` › `MouseEvent.ANY` › `MouseEvent.MOUSE_CLICKED`), **origen** (*source*), **destino** (*target*, el nodo más profundo afectado) y una **ruta de despacho**:

1. **Captura**, de `Stage` → `Scene` → … → destino. Se ejecutan los *filtros* (`addEventFilter`).
2. **Burbujeo**, del destino → … → `Stage`. Se ejecutan los *manejadores* (`addEventHandler` y `setOnXxx`).

`event.consume()` detiene la propagación. Un filtro sirve para interceptar antes que el control. Por ejemplo, para impedir que un campo numérico reciba letras:

```java
txtHoras.addEventFilter(KeyEvent.KEY_TYPED, e -> {
    if (!e.getCharacter().matches("[0-9,]")) {
        e.consume();
    }
});
```

Tipos de eventos más usados en aplicaciones de gestión:

| Evento | Uso típico |
|---|---|
| `ActionEvent` | Botón, `MenuItem`, Intro en un `TextField` |
| `MouseEvent.MOUSE_CLICKED` (`getClickCount()`) | Doble clic en una fila para editar |
| `KeyEvent.KEY_PRESSED` | Supr para eliminar, Esc para limpiar el filtro |
| `ContextMenuEvent` | Menú contextual |
| `WindowEvent.WINDOW_CLOSE_REQUEST` | Avisar si hay cambios sin guardar |

**Aceleradores y mnemónicos** (implementan la matriz de acciones de la UD02):

```java
menuNuevo.setAccelerator(new KeyCodeCombination(KeyCode.N, KeyCombination.SHORTCUT_DOWN)); // Ctrl+N (Cmd+N en macOS)
menuBuscar.setAccelerator(new KeyCodeCombination(KeyCode.F, KeyCombination.SHORTCUT_DOWN));
scene.getAccelerators().put(new KeyCodeCombination(KeyCode.F1), this::abrirAyudaContextual); // se usa en UD07
```

**Confirmar el cierre si hay cambios sin guardar:**

```java
stage.setOnCloseRequest(e -> {
    if (vm.hayCambiosProperty().get()) {
        Alert a = new Alert(Alert.AlertType.CONFIRMATION,
                "Hay cambios sin guardar en la orden. ¿Salir sin guardar?",
                new ButtonType("Salir sin guardar", ButtonBar.ButtonData.OK_DONE),
                ButtonType.CANCEL);
        a.setHeaderText("Cambios sin guardar");
        if (a.showAndWait().filter(b -> b.getButtonData() == ButtonBar.ButtonData.OK_DONE).isEmpty()) {
            e.consume(); // cancela el cierre
        }
    }
});
```

### 2. Propiedades, escuchadores y *binding*

Una **propiedad JavaFX** es un valor observable. Por convención (*JavaFX Beans*) tiene tres métodos:

```java
public class Cliente {
    private final IntegerProperty id = new SimpleIntegerProperty(this, "id");
    private final StringProperty nif = new SimpleStringProperty(this, "nif", "");
    private final StringProperty nombre = new SimpleStringProperty(this, "nombre", "");
    private final StringProperty telefono = new SimpleStringProperty(this, "telefono", "");
    private final ObjectProperty<LocalDate> alta = new SimpleObjectProperty<>(this, "alta", LocalDate.now());

    public String getNombre()              { return nombre.get(); }
    public void setNombre(String valor)    { nombre.set(valor); }
    public StringProperty nombreProperty() { return nombre; }
    // ... ídem para el resto
}
```

- **Escuchadores.** `ChangeListener` recibe el valor anterior y el nuevo. `InvalidationListener` solo avisa de que el valor ha cambiado, y es más ligero.
  ```java
  cliente.nombreProperty().addListener((obs, anterior, nuevo) -> vm.marcarCambios());
  ```
- **Binding unidireccional** (`a.bind(b)`): `a` sigue a `b` y no se puede asignar directamente.
- **Binding bidireccional** (`a.bindBidirectional(b)`): los dos valores se sincronizan. Es lo típico entre un campo del formulario y el ViewModel.
- **Bindings calculados**:
  ```java
  BooleanBinding formularioValido = Bindings.createBooleanBinding(
          () -> Validadores.nifValido(nif.get()) && !nombre.get().isBlank(),
          nif, nombre);                                   // dependencias
  btnGuardar.disableProperty().bind(formularioValido.not());

  lblTotal.textProperty().bind(Bindings.format("Total: %.2f €", vm.totalProperty()));
  lblEstado.textProperty().bind(Bindings.when(vm.cargandoProperty())
          .then("Cargando…").otherwise(Bindings.size(vm.getFiltrados()).asString("%d clientes")));
  ```

> **Fugas de memoria:** los escuchadores añadidos a objetos de larga vida (el modelo) desde vistas efímeras (diálogos) mantienen la vista en memoria. Hay que quitarlos al cerrar (`removeListener`) o usar `WeakChangeListener`. Esto se mide en UD09 con VisualVM.

### 3. Colecciones observables y `TableView`

```java
ObservableList<Cliente> clientes = FXCollections.observableArrayList();
FilteredList<Cliente> filtrados = new FilteredList<>(clientes, c -> true);
SortedList<Cliente> ordenados = new SortedList<>(filtrados);
ordenados.comparatorProperty().bind(tabla.comparatorProperty()); // permite ordenar al pulsar la cabecera
tabla.setItems(ordenados);
```

**Fábricas de valor y de celda:**

```java
colNif.setCellValueFactory(c -> c.getValue().nifProperty());   // mejor que PropertyValueFactory: sin reflexión
colAlta.setCellValueFactory(c -> c.getValue().altaProperty());
colAlta.setCellFactory(col -> new TableCell<>() {
    private final DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    @Override
    protected void updateItem(LocalDate fecha, boolean empty) {
        super.updateItem(fecha, empty);
        setText(empty || fecha == null ? null : fmt.format(fecha));
    }
});
```

Celda con estilo según el estado (una clase CSS, además del texto, para no depender solo del color):

```java
colEstado.setCellFactory(col -> new TableCell<>() {
    @Override
    protected void updateItem(EstadoOrden estado, boolean empty) {
        super.updateItem(estado, empty);
        getStyleClass().removeIf(s -> s.startsWith("estado-"));
        if (empty || estado == null) {
            setText(null);
        } else {
            setText(estado.etiqueta());                         // «Abierta», «En curso», «Cerrada»
            getStyleClass().add("estado-" + estado.name().toLowerCase());
        }
    }
});
```

Las **celdas se reciclan**: `updateItem` debe dejar siempre la celda en un estado completo, también cuando está vacía. Es el error más típico con las celdas personalizadas.

**Fila con doble clic y menú contextual:**

```java
tabla.setRowFactory(tv -> {
    TableRow<Cliente> fila = new TableRow<>();
    fila.setOnMouseClicked(e -> {
        if (e.getClickCount() == 2 && !fila.isEmpty()) {
            editar(fila.getItem());
        }
    });
    fila.contextMenuProperty().bind(Bindings.when(fila.emptyProperty())
            .then((ContextMenu) null).otherwise(menuContextualCliente));
    return fila;
});
```

**Maestro-detalle** (cliente → vehículos):

```java
tablaClientes.getSelectionModel().selectedItemProperty().addListener((obs, ant, cli) ->
        vm.cargarVehiculosDe(cli));          // rellena la ObservableList de la tabla de vehículos
```

### 4. Arquitectura MVVM en capas

```
es.fpdam.gestortaller
├── App.java                     (arranque y factoría de controladores)
├── model/        Cliente, Vehiculo, Orden, LineaOrden, EstadoOrden
├── data/         Database (conexión y esquema), ClienteRepository, ...
├── viewmodel/    ClientesViewModel, ClienteFormViewModel, ...
├── controller/   ClientesController, ClienteFormController (vista: FXML + controlador)
└── resources/es/fpdam/gestortaller/view/*.fxml, css/app.css, i18n/textos*.properties
```

| Capa | Responsabilidad | No debe |
|---|---|---|
| Vista (FXML + controlador) | Enlazar los controles al ViewModel y abrir diálogos | Contener SQL ni reglas de negocio |
| ViewModel | Estado de la pantalla (propiedades), comandos, validación | Importar clases `javafx.scene.control` |
| Repositorio | SQL con `PreparedStatement` y mapeo a objetos del modelo | Conocer la interfaz |

**Base de datos (SQLite):**

```sql
CREATE TABLE IF NOT EXISTS cliente (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nif       TEXT NOT NULL UNIQUE,
  nombre    TEXT NOT NULL,
  telefono  TEXT,
  email     TEXT,
  alta      TEXT NOT NULL            -- ISO-8601 (yyyy-MM-dd)
);
CREATE TABLE IF NOT EXISTS vehiculo (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  matricula  TEXT NOT NULL UNIQUE,
  marca      TEXT NOT NULL,
  modelo     TEXT,
  anio       INTEGER CHECK (anio BETWEEN 1950 AND 2100),
  cliente_id INTEGER NOT NULL REFERENCES cliente(id) ON DELETE RESTRICT
);
-- orden y linea_orden, análogas (ver modelo de datos en la programación)
```

```java
public final class Database {
    private final String url;
    public Database(Path fichero) { this.url = "jdbc:sqlite:" + fichero.toAbsolutePath(); }

    public Connection conectar() throws SQLException {
        Connection c = DriverManager.getConnection(url);
        try (Statement st = c.createStatement()) {
            st.execute("PRAGMA foreign_keys = ON");   // en SQLite se activa en cada conexión
        }
        return c;
    }
}
```

```java
public class ClienteRepository {
    private final Database db;
    public ClienteRepository(Database db) { this.db = db; }

    public List<Cliente> findAll() throws SQLException {
        String sql = "SELECT id, nif, nombre, telefono, email, alta FROM cliente ORDER BY nombre";
        try (Connection c = db.conectar();
             PreparedStatement ps = c.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Cliente> lista = new ArrayList<>();
            while (rs.next()) {
                lista.add(mapear(rs));
            }
            return lista;
        }
    }

    public void insert(Cliente cli) throws SQLException {
        String sql = "INSERT INTO cliente(nif, nombre, telefono, email, alta) VALUES (?,?,?,?,?)";
        try (Connection c = db.conectar();
             PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, cli.getNif());
            ps.setString(2, cli.getNombre());
            ps.setString(3, cli.getTelefono());
            ps.setString(4, cli.getEmail());
            ps.setString(5, cli.getAlta().toString());
            ps.executeUpdate();
            try (ResultSet k = ps.getGeneratedKeys()) {
                if (k.next()) cli.setId(k.getInt(1));
            }
        }
    }
    // update, delete, mapear(ResultSet)...
}
```

> Siempre `PreparedStatement`, nunca concatenar texto en el SQL. Es una prevención básica de inyección SQL que se comprueba en las pruebas de seguridad de UD09.

**ViewModel con carga en segundo plano:**

```java
public class ClientesViewModel {
    private final ClienteRepository repo;
    private final ObservableList<Cliente> clientes = FXCollections.observableArrayList();
    private final FilteredList<Cliente> filtrados = new FilteredList<>(clientes, c -> true);
    private final StringProperty filtro = new SimpleStringProperty("");
    private final ObjectProperty<Cliente> seleccionado = new SimpleObjectProperty<>();
    private final BooleanProperty cargando = new SimpleBooleanProperty(false);
    private final StringProperty error = new SimpleStringProperty();

    public ClientesViewModel(ClienteRepository repo) {
        this.repo = repo;
        filtro.addListener((obs, ant, txt) -> {
            String t = txt == null ? "" : txt.strip().toLowerCase();
            filtrados.setPredicate(c -> t.isEmpty()
                    || c.getNombre().toLowerCase().contains(t)
                    || c.getNif().toLowerCase().contains(t));
        });
    }

    public void cargar() {
        Task<List<Cliente>> tarea = new Task<>() {
            @Override protected List<Cliente> call() throws Exception {
                return repo.findAll();                 // fuera del hilo de JavaFX
            }
        };
        cargando.bind(tarea.runningProperty());
        tarea.setOnSucceeded(e -> clientes.setAll(tarea.getValue()));  // ya en el hilo de JavaFX
        tarea.setOnFailed(e -> error.set("No se han podido cargar los clientes. "
                + "Comprueba que el fichero de datos existe y vuelve a intentarlo."));
        Thread hilo = new Thread(tarea, "carga-clientes");
        hilo.setDaemon(true);
        hilo.start();
    }
    // getters de propiedades, guardar(Cliente), eliminar(Cliente)...
}
```

Regla: **solo el hilo de JavaFX toca el grafo de escena.** Desde otro hilo hay que usar `Platform.runLater(...)` o los manejadores `setOnSucceeded`/`setOnFailed` de `Task`, que ya se ejecutan en el hilo de JavaFX. Para tareas repetibles conviene usar `Service<T>`.

**Controlador fino e inyección de dependencias:**

```java
public class ClientesController {
    @FXML private TextField txtFiltro;
    @FXML private TableView<Cliente> tabla;
    @FXML private TableColumn<Cliente, String> colNif, colNombre;
    @FXML private ProgressIndicator indicador;
    @FXML private Button btnEditar, btnEliminar;

    private final ClientesViewModel vm;
    public ClientesController(ClientesViewModel vm) { this.vm = vm; }

    @FXML
    private void initialize() {
        colNif.setCellValueFactory(c -> c.getValue().nifProperty());
        colNombre.setCellValueFactory(c -> c.getValue().nombreProperty());
        SortedList<Cliente> ordenados = new SortedList<>(vm.getFiltrados());
        ordenados.comparatorProperty().bind(tabla.comparatorProperty());
        tabla.setItems(ordenados);
        tabla.setPlaceholder(new Label("No hay clientes que coincidan con la búsqueda"));

        txtFiltro.textProperty().bindBidirectional(vm.filtroProperty());
        vm.seleccionadoProperty().bind(tabla.getSelectionModel().selectedItemProperty());
        btnEditar.disableProperty().bind(vm.seleccionadoProperty().isNull());
        btnEliminar.disableProperty().bind(vm.seleccionadoProperty().isNull());
        indicador.visibleProperty().bind(vm.cargandoProperty());
        vm.cargar();
    }
}
```

```java
// En App.start(): FXMLLoader no puede usar constructores con parámetros sin ayuda
FXMLLoader loader = new FXMLLoader(App.class.getResource("view/clientes.fxml"));
loader.setControllerFactory(tipo -> {
    if (tipo == ClientesController.class) return new ClientesController(new ClientesViewModel(clienteRepo));
    try { return tipo.getDeclaredConstructor().newInstance(); }
    catch (ReflectiveOperationException ex) { throw new IllegalStateException(ex); }
});
```

> **Alternativa.** En C#/WPF: `INotifyPropertyChanged` o CommunityToolkit.Mvvm (`[ObservableProperty]`, `[RelayCommand]`), `ObservableCollection<T>`, `ICollectionView` para filtrar y `DataGrid`. En Compose: `StateFlow` en un ViewModel y `LazyColumn`. El patrón MVVM es el mismo.

### 5. Formularios: validación, diálogos y mensajes

**Validación junto al campo** con pseudoclase CSS. El NIF español se valida con la letra de control: el número módulo 23 indexa la cadena `TRWAGMYFPDXBNJZSQVHLCKE`.

```java
public final class Validadores {
    private static final String LETRAS = "TRWAGMYFPDXBNJZSQVHLCKE";
    public static boolean nifValido(String nif) {
        if (nif == null || !nif.matches("\\d{8}[A-Za-z]")) return false;
        int numero = Integer.parseInt(nif.substring(0, 8));
        return Character.toUpperCase(nif.charAt(8)) == LETRAS.charAt(numero % 23);
    }
}
```

```java
private static final PseudoClass ERROR = PseudoClass.getPseudoClass("error");

txtNif.textProperty().addListener((o, a, n) -> {
    boolean ok = Validadores.nifValido(n);
    txtNif.pseudoClassStateChanged(ERROR, !n.isEmpty() && !ok);
    lblErrorNif.setText(ok || n.isEmpty() ? "" : "El NIF debe tener 8 números y una letra válida, por ejemplo 12345678Z.");
});
```

```css
.text-field:error { -fx-border-color: -color-error; -fx-border-width: 2px; }
.estado-abierta  { -fx-text-fill: #0b5cad; }
.estado-cerrada  { -fx-text-fill: #1e6b34; }
```

**Diálogo tipado** que devuelve un resultado:

```java
Dialog<Cliente> dlg = new Dialog<>();
dlg.setTitle("Nuevo cliente");
dlg.initOwner(tabla.getScene().getWindow());
FXMLLoader l = new FXMLLoader(App.class.getResource("view/cliente-form.fxml"));
dlg.getDialogPane().setContent(l.load());
ClienteFormController form = l.getController();
dlg.getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);
dlg.getDialogPane().lookupButton(ButtonType.OK).disableProperty().bind(form.validoProperty().not());
dlg.setResultConverter(b -> b == ButtonType.OK ? form.getCliente() : null);
dlg.showAndWait().ifPresent(vm::guardar);
```

**Errores de base de datos convertidos en mensajes útiles** (RA4.h):

```java
catch (SQLException ex) {
    if (ex.getMessage() != null && ex.getMessage().contains("UNIQUE constraint failed: cliente.nif")) {
        error.set("Ya existe un cliente con el NIF " + cli.getNif() + ". Búscalo en la lista o revisa el número.");
    } else {
        LOG.log(Level.SEVERE, "Error guardando cliente", ex);   // el detalle técnico va al log
        error.set("No se ha podido guardar el cliente. Inténtalo de nuevo; si el problema continúa, avisa al soporte.");
    }
}
```

### 6. Secuencia de control

- **Ventana principal con navegación lateral.** El área central se cambia con `contenido.setCenter(vista)` y cada vista se carga una sola vez y se guarda en caché.
- **Foco inicial:** `Platform.runLater(txtNif::requestFocus)` al abrir el formulario.
- **Orden de tabulación:** es el orden de los nodos en el FXML, y se revisa en Scene Builder.
- **Flujo «nueva orden»:** elegir cliente → elegir o crear vehículo → añadir líneas → cerrar orden. Se implementa como asistente con pasos (`StackPane` con vistas y botones Anterior/Siguiente cuya habilitación depende de que el paso sea válido).
- **Barra de estado** enlazada al ViewModel: número de registros, operación en curso y último error.

### 7. Ampliación: internacionalización y temas

- Hay que pasar un `ResourceBundle` a todos los `FXMLLoader` y formatear fechas y números con el `Locale` (`NumberFormat.getCurrencyInstance(locale)`). Se usan castellano y gallego.
- Tema claro, oscuro o de alto contraste con `scene.getStylesheets().setAll(...)`, guardando la preferencia con `java.util.prefs.Preferences`. Esto anticipa la **persistencia de preferencias** que se retoma en UD04.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Traza de eventos.** Añadir filtros y manejadores en `Stage`, `Scene`, `VBox` y `Button` que impriman la fase. Predecir el orden antes de ejecutar, y después consumir el evento en distintos puntos y comparar.
- **A2. Laboratorio de *bindings*.** Una calculadora de presupuesto (horas × precio + piezas + IVA) hecha solo con *bindings*, sin un solo escuchador.
- **A3. De `PropertyValueFactory` a *lambdas*.** Migrar una tabla y provocar el error silencioso de un nombre de propiedad mal escrito para ver por qué conviene la *lambda*.
- **A4. Congelar la interfaz.** Ejecutar `Thread.sleep(5000)` en un manejador y ver cómo se bloquea la interfaz. Rehacerlo con `Task` y un `ProgressIndicator`.
- **A5. Repositorio con pruebas.** Escribir `ClienteRepositoryTest` con JUnit 5 sobre una base de datos SQLite temporal (`@TempDir`). Es la primera prueba de integración, que se retoma en UD09.
- **A6. Maestro-detalle.** Clientes y vehículos con selección sincronizada y un contador en la barra de estado.
- **A7. Celdas editables.** `TextFieldTableCell.forTableColumn()` en las líneas de la orden, con recálculo automático del total.

### Práctica evaluable

**P3 · el gestor de taller con datos (hito H3, `v0.3`).** Implementar sobre SQLite, con arquitectura MVVM:

1. CRUD completo de clientes y vehículos (maestro-detalle).
2. Órdenes de reparación con líneas editables y total calculado.
3. Filtro en vivo y ordenación en las tablas, y estado de la orden con celda personalizada.
4. Menús, barra de herramientas, aceleradores, menú contextual y doble clic según la matriz de acciones de la P2.
5. Validación junto al campo (NIF, matrícula, email) y mensajes según el catálogo de la P2.
6. Acceso a datos en segundo plano con indicador de carga.
7. Confirmación al eliminar y al cerrar con cambios sin guardar.
8. Al menos tres pruebas JUnit del repositorio.

La práctica se empieza en el aula (unas 12 de las 32 h). Cada funcionalidad se desarrolla en una rama propia, se integra mediante *pull request* revisada y enlaza su historia de usuario (HU01–HU08).

**Conexión con el mundo real:** es el núcleo de cualquier aplicación de gestión, con CRUD, búsqueda, validación y maestro-detalle. Es el tipo de tarea más frecuente en un primer empleo de desarrollo, y se trabaja con el flujo de PR y revisión que usan los equipos profesionales. Entregables: repositorio con la etiqueta `v0.3`, script `schema.sql` con datos de ejemplo y un vídeo o GIF de 2 minutos mostrando el flujo completo. Defensa presencial.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA1.g | Todas las acciones tienen su evento; usa filtros, aceleradores, contextual y doble clic con criterio; consume eventos donde corresponde | Eventos principales correctos, sin filtros ni aceleradores | Faltan acciones o hay manejadores con lógica duplicada |
| RA1.h | Aplicación completa y estable con MVVM limpio: el controlador no tiene SQL y el ViewModel no usa controles | Funciona, con alguna mezcla de capas | No funciona o tiene la lógica en el controlador |
| RA1.b, c, d, f (refuerzo) | Pantallas nuevas en Scene Builder, *layout* adaptable y código ampliado a mano (`cellFactory`, `controllerFactory`) | Correcto, con algún detalle | Interfaz rígida o generada solo por código |
| RA4.c, d | Menús, barra y atajos coinciden con la matriz de la P2 | Pequeñas desviaciones | No sigue la matriz |
| RA4.e, f | Controles adecuados a cada dato (fecha, combos, *spinners*) y bien distribuidos | Algún control mejorable | Controles inadecuados |
| RA4.g | Estilos del CSS de la P2, estados por clase CSS + texto, foco visible | Estilos aplicados parcialmente | Sin estilos o con contraste insuficiente |
| RA4.h | Validación en línea, errores de BD traducidos y confirmaciones solo donde hacen falta | Mensajes claros con excepciones | Mensajes técnicos o ausentes |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [JavaFX 25 API: `javafx.beans`, `javafx.collections`, `TableView`](https://openjfx.io/javadoc/25/)
  - [Oracle: Using JavaFX Properties and Binding](https://docs.oracle.com/javafx/2/binding/jfxpub-binding.htm) y [Concurrency in JavaFX](https://docs.oracle.com/javafx/2/threads/jfxpub-threads.htm) (son de JavaFX 2, pero los conceptos siguen vigentes)
  - [Handling JavaFX Events](https://docs.oracle.com/javafx/2/events/jfxpub-events.htm)
  - [sqlite-jdbc](https://github.com/xerial/sqlite-jdbc) y [SQLite: Foreign Key Support](https://www.sqlite.org/foreignkeys.html)
- **Herramientas:** Scene Builder, DB Browser for SQLite, JUnit 5.
