# UD09 · Interfaces gráficas con JavaFX y eventos

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 20 h ≈ 24 sesiones | RA5 f–h (100 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA5, criterios f), g) y h) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.f | Se han utilizado las herramientas del entorno de desarrollo para crear interfaces gráficos de usuario simples. | RD 405/2023, anexo I, MP0485, RA5.f | P9 (FXML con Scene Builder) + observación |
| RA5.g | Se han programado controladores de eventos. | RD 405/2023, anexo I, MP0485, RA5.g | P9 + PR4 |
| RA5.h | Se han escrito programas que utilicen interfaces gráficos para la entrada y salida de información. | RD 405/2023, anexo I, MP0485, RA5.h | P9 + PR4 + PI-3 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Crear y ejecutar un proyecto JavaFX con Maven y módulos.
2. Explicar la estructura de una aplicación JavaFX (`Application`, `Stage`, `Scene`, grafo de nodos) y los contenedores de diseño.
3. Diseñar vistas en FXML con Scene Builder integrado en el IDE y conectarlas a un controlador.
4. Programar controladores de eventos (acción, ratón, teclado, cambios de selección) con métodos `@FXML`, lambdas y *listeners* de propiedades.
5. Recoger y validar datos de formularios, mostrar resultados en tablas y listas y comunicar errores con diálogos.
6. Separar vista, controlador y modelo (MVC básico) para reutilizar la lógica ya escrita.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Lectura y escritura de información» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): interfaces gráficas; concepto de evento; creación de controladores de eventos.

Tecnología elegida y alternativas en [DEC-PROG-03](../../decisiones/DEC-PROG-03-gui.md).

### 1. Interfaces gráficas y programación dirigida por eventos

- En consola el programa decide el orden de las interacciones; en una GUI, el programa **espera eventos** (clic, tecla, cambio de texto) y reacciona a ellos. Un hilo especial, el *JavaFX Application Thread*, procesa los eventos y repinta la interfaz: no hay que bloquearlo con tareas largas.
- **Evento:** objeto que describe algo que ha ocurrido (`ActionEvent`, `MouseEvent`, `KeyEvent`), con un **origen** (el control) y un **tipo**. **Controlador de eventos** (*event handler*): código que se ejecuta cuando ocurre el evento.
- Librerías GUI en Java: AWT (histórica), **Swing** (en mantenimiento, muy presente en aplicaciones existentes), **JavaFX** (moderna, FXML, CSS, propiedades observables).

### 2. Proyecto JavaFX con Maven

IntelliJ: *New Project → JavaFX* genera la estructura. Partes clave del `pom.xml`:

```xml
<dependencies>
  <dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-controls</artifactId>
    <version>25.0.2</version>
  </dependency>
  <dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-fxml</artifactId>
    <version>25.0.2</version>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.openjfx</groupId>
      <artifactId>javafx-maven-plugin</artifactId>
      <version>0.0.8</version>
      <configuration>
        <mainClass>es.dam.biblio.gui/es.dam.biblio.gui.App</mainClass>
      </configuration>
    </plugin>
  </plugins>
</build>
```

Se ejecuta con `mvn javafx:run`. Descriptor de módulo `src/main/java/module-info.java`:

```java
module es.dam.biblio.gui {
    requires javafx.controls;
    requires javafx.fxml;

    opens es.dam.biblio.gui to javafx.fxml;    // FXMLLoader accede por reflexión al controlador
    exports es.dam.biblio.gui;
}
```

### 3. Estructura de una aplicación JavaFX

```
Stage (ventana)
└─ Scene (contenido, tamaño, hoja de estilos)
   └─ Parent raíz (p. ej. BorderPane)
      ├─ top:    MenuBar / ToolBar
      ├─ center: TableView
      └─ bottom: HBox con Label y Button
```

```java
package es.dam.biblio.gui;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        FXMLLoader loader = new FXMLLoader(App.class.getResource("catalogo.fxml"));
        Scene scene = new Scene(loader.load(), 900, 600);
        scene.getStylesheets().add(App.class.getResource("estilos.css").toExternalForm());
        stage.setTitle("Gestor de biblioteca");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

El FXML y el CSS van en `src/main/resources/es/dam/biblio/gui/` (mismo paquete que la clase).

**Contenedores de diseño:** `VBox`/`HBox` (en columna/fila), `BorderPane` (cinco zonas), `GridPane` (formularios), `StackPane`, `FlowPane`, `AnchorPane`. **Controles:** `Label`, `TextField`, `PasswordField`, `TextArea`, `Button`, `CheckBox`, `RadioButton` + `ToggleGroup`, `ComboBox`, `DatePicker`, `Spinner`, `ListView`, `TableView`, `MenuBar`.

### 4. Diseño con Scene Builder (herramienta del entorno)

1. Instalar Scene Builder (Gluon) y en IntelliJ indicar su ruta: *Settings → Languages & Frameworks → JavaFX*. Clic derecho en un `.fxml` → *Open in SceneBuilder*.
2. Arrastrar contenedores y controles, ajustar propiedades y *layout* (márgenes, crecimiento), y asignar un **`fx:id`** a cada control que se use desde el código.
3. En *Controller*, indicar la clase controladora; en la pestaña *Code* de cada control, el método de evento (`onAction="#guardar"`).
4. Previsualizar (*Preview → Show Preview in Window*) y guardar: Scene Builder solo edita el FXML.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.geometry.Insets?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<BorderPane xmlns="http://javafx.com/javafx" xmlns:fx="http://javafx.com/fxml"
            fx:controller="es.dam.biblio.gui.CatalogoController">
  <top>
    <HBox spacing="8">
      <padding><Insets top="8" right="8" bottom="8" left="8"/></padding>
      <TextField fx:id="txtFiltro" promptText="Buscar por título" HBox.hgrow="ALWAYS"/>
      <ComboBox fx:id="cmbTipo" promptText="Tipo"/>
    </HBox>
  </top>
  <center>
    <TableView fx:id="tabla">
      <columns>
        <TableColumn fx:id="colTitulo" text="Título" prefWidth="320"/>
        <TableColumn fx:id="colAutor" text="Autor" prefWidth="220"/>
        <TableColumn fx:id="colAnio" text="Año" prefWidth="80"/>
      </columns>
    </TableView>
  </center>
  <bottom>
    <GridPane hgap="8" vgap="8">
      <padding><Insets top="8" right="8" bottom="8" left="8"/></padding>
      <Label text="Título" GridPane.rowIndex="0" GridPane.columnIndex="0"/>
      <TextField fx:id="txtTitulo" GridPane.rowIndex="0" GridPane.columnIndex="1"/>
      <Label text="Autor" GridPane.rowIndex="1" GridPane.columnIndex="0"/>
      <TextField fx:id="txtAutor" GridPane.rowIndex="1" GridPane.columnIndex="1"/>
      <Label text="Año" GridPane.rowIndex="2" GridPane.columnIndex="0"/>
      <Spinner fx:id="spnAnio" GridPane.rowIndex="2" GridPane.columnIndex="1"/>
      <Button fx:id="btnGuardar" text="Guardar" defaultButton="true" onAction="#guardar"
              GridPane.rowIndex="3" GridPane.columnIndex="1"/>
      <Label fx:id="lblEstado" GridPane.rowIndex="3" GridPane.columnIndex="2"/>
    </GridPane>
  </bottom>
</BorderPane>
```

### 5. Controlador y controladores de eventos

```java
package es.dam.biblio.gui;

import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.input.KeyCode;
import javafx.scene.input.MouseButton;

public class CatalogoController {

    public record Libro(String titulo, String autor, int anio) { }

    @FXML private TextField txtFiltro, txtTitulo, txtAutor;
    @FXML private ComboBox<String> cmbTipo;
    @FXML private TableView<Libro> tabla;
    @FXML private TableColumn<Libro, String> colTitulo, colAutor;
    @FXML private TableColumn<Libro, Number> colAnio;
    @FXML private Spinner<Integer> spnAnio;
    @FXML private Button btnGuardar;
    @FXML private Label lblEstado;

    private final ObservableList<Libro> libros = FXCollections.observableArrayList();

    /** Lo llama FXMLLoader después de inyectar los campos @FXML. */
    @FXML
    private void initialize() {
        // Columnas: los records no siguen la convención getX(), así que se usan lambdas
        colTitulo.setCellValueFactory(c -> new SimpleStringProperty(c.getValue().titulo()));
        colAutor.setCellValueFactory(c -> new SimpleStringProperty(c.getValue().autor()));
        colAnio.setCellValueFactory(c -> new SimpleIntegerProperty(c.getValue().anio()));

        spnAnio.setValueFactory(new SpinnerValueFactory.IntegerSpinnerValueFactory(1450, 2100, 2026));
        cmbTipo.getItems().setAll("Todos", "Libro", "Revista", "DVD");

        // Filtro en vivo: listener sobre la propiedad text
        FilteredList<Libro> filtrados = new FilteredList<>(libros, l -> true);
        txtFiltro.textProperty().addListener((obs, viejo, nuevo) ->
                filtrados.setPredicate(l -> nuevo == null || nuevo.isBlank()
                        || l.titulo().toLowerCase().contains(nuevo.toLowerCase())));
        tabla.setItems(filtrados);

        // Evento de selección: rellenar el formulario
        tabla.getSelectionModel().selectedItemProperty().addListener((obs, antes, sel) -> {
            if (sel != null) {
                txtTitulo.setText(sel.titulo());
                txtAutor.setText(sel.autor());
                spnAnio.getValueFactory().setValue(sel.anio());
            }
        });

        // Evento de ratón: doble clic
        tabla.setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY && e.getClickCount() == 2) {
                mostrarDetalle(tabla.getSelectionModel().getSelectedItem());
            }
        });

        // Evento de teclado: Supr borra la fila seleccionada
        tabla.setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.DELETE) borrarSeleccionado();
        });

        // Binding: el botón solo se habilita si hay título
        btnGuardar.disableProperty().bind(txtTitulo.textProperty().isEmpty());
    }

    /** Controlador de evento asociado en el FXML con onAction="#guardar". */
    @FXML
    private void guardar(ActionEvent evento) {
        try {
            String titulo = txtTitulo.getText().strip();
            String autor = txtAutor.getText().strip();
            if (autor.isEmpty()) throw new IllegalArgumentException("El autor es obligatorio");
            libros.add(new Libro(titulo, autor, spnAnio.getValue()));
            lblEstado.setText("Guardado: " + titulo);
            txtTitulo.clear();
            txtAutor.clear();
        } catch (IllegalArgumentException ex) {
            Alert alerta = new Alert(Alert.AlertType.ERROR, ex.getMessage());
            alerta.setHeaderText("Datos no válidos");
            alerta.showAndWait();
        }
    }

    private void borrarSeleccionado() {
        Libro sel = tabla.getSelectionModel().getSelectedItem();
        if (sel == null) return;
        var confirmar = new Alert(Alert.AlertType.CONFIRMATION, "¿Borrar «" + sel.titulo() + "»?");
        confirmar.showAndWait()
                 .filter(r -> r == ButtonType.OK)
                 .ifPresent(r -> libros.remove(sel));
    }

    private void mostrarDetalle(Libro l) {
        if (l != null) new Alert(Alert.AlertType.INFORMATION, l.toString()).showAndWait();
    }
}
```

**Formas de asociar controladores de eventos:**

| Forma | Ejemplo | Cuándo |
|---|---|---|
| En el FXML | `onAction="#guardar"` + método `@FXML` | Acciones principales diseñadas en Scene Builder |
| Método `setOnX` con lambda | `boton.setOnAction(e -> ...)` | Eventos creados por código |
| `addEventHandler` | `nodo.addEventHandler(MouseEvent.MOUSE_CLICKED, h)` | Varios manejadores para el mismo evento |
| *Listener* de propiedad | `textProperty().addListener(...)` | Reaccionar a cambios de valor |
| *Binding* | `disableProperty().bind(...)` | Mantener sincronizadas dos propiedades sin código de evento |

Propagación: los eventos se **capturan** desde la raíz hacia el nodo destino (filtros, `addEventFilter`) y **burbujean** de vuelta (manejadores); `event.consume()` detiene la propagación.

### 6. Entrada y salida de información con la GUI

- **Entrada:** `TextField.getText()`, `Spinner.getValue()`, `DatePicker.getValue()` (`LocalDate`), `ComboBox.getValue()`, `CheckBox.isSelected()`; validar con las clases de UD05 (`Validador`) y mostrar errores junto al campo o con `Alert`.
- **Salida:** `Label`, `TableView`/`ListView` con `ObservableList`, diálogos `Alert`, `TextInputDialog`; selección de ficheros con `FileChooser` para importar/exportar el JSON de UD08.
  ```java
  FileChooser fc = new FileChooser();
  fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("JSON", "*.json"));
  File f = fc.showSaveDialog(tabla.getScene().getWindow());
  if (f != null) servicio.exportarJson(f.toPath());
  ```
- **Tareas largas** (cargar un fichero grande, consultar una BD en UD10): `javafx.concurrent.Task` en otro hilo y actualizar la interfaz al terminar (`setOnSucceeded`). Se presenta como receta; la concurrencia se estudia en PSP.

### 7. Separar vista y lógica (MVC básico)

- **Modelo:** clases del gestor de biblioteca ya existentes (`Recurso`, `Biblioteca`, `Repositorio`), sin dependencias de JavaFX.
- **Vista:** FXML + CSS.
- **Controlador:** traduce eventos en llamadas al modelo y actualiza la vista. No contiene reglas de negocio.

Así los tests JUnit del modelo siguen valiendo y la misma lógica sirve a la versión de consola y a la gráfica. La prueba automatizada de interfaces (TestFX) se ve en Desarrollo de interfaces (2.º).

### 8. Estilo con CSS (breve)

```css
.root { -fx-font-family: "Segoe UI", sans-serif; -fx-font-size: 14px; }
.button:default { -fx-base: #1f6feb; }
.label.error { -fx-text-fill: #b42318; }
```

## Actividades

### Actividades de clase (no evaluables)

- **A1. Hola JavaFX por código** (sin FXML): ventana con un `TextField`, un botón y una etiqueta que saluda; luego la misma vista en FXML con Scene Builder. Comparar.
- **A2. Conversor de unidades** con `ComboBox` de origen/destino, *listener* sobre el texto para convertir en vivo y validación de números.
- **A3. Laboratorio de eventos.** Ventana que registra en un `TextArea` todos los eventos de ratón y teclado que recibe un rectángulo, con y sin `consume()` y con un filtro en el contenedor.
- **A4. Lista de la compra** con `ListView`, alta, borrado con tecla Supr y confirmación.
- **A5. Formulario de registro** en `GridPane` con validación (DNI, correo, fecha de nacimiento con `DatePicker`) reutilizando el `Validador` de UD05, y botón habilitado por *binding*.
- **A6. Abrir y guardar.** Añadir a A4 un menú *Archivo* con `FileChooser` para guardar y cargar la lista en JSON.

### Práctica evaluable

**P9 · Aplicación de escritorio para un taller de bicicletas.** Un taller quiere registrar las reparaciones: cliente, bicicleta, fecha de entrada (`DatePicker`), tipo de reparación (`ComboBox`), presupuesto, estado. Requisitos: ventana principal diseñada en FXML con Scene Builder (`BorderPane` con menú, tabla y formulario); al menos cinco tipos de controladores de eventos distintos (acción de botón y de menú, selección en tabla, doble clic, tecla, *listener* de texto para filtrar) y un *binding*; validación de entrada con mensajes de error; total de presupuestos pendientes actualizado en una etiqueta; importar/exportar las reparaciones en JSON con `FileChooser` (reutilizando UD08); separación modelo–vista–controlador con tests JUnit del modelo.

**Conexión con el mundo real:** equivale a desarrollar el **interfaz de mostrador** de una aplicación de gestión para un pequeño negocio, uno de los encargos más habituales para una empresa de desarrollo que trabaja con pymes.

Entregables: repositorio con PR revisada por el docente, CI en verde (tests del modelo), capturas de las pantallas y vídeo corto (≤ 2 min) demostrando los eventos.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA5.f | Vista diseñada íntegramente con Scene Builder: contenedores adecuados, `fx:id` y eventos asignados en el FXML, redimensiona correctamente. | Diseñada con Scene Builder con problemas de *layout* o parte creada por código sin motivo. | No usa las herramientas del entorno o la vista no carga. |
| RA5.g | Cinco o más tipos de eventos bien resueltos, más un *binding*; manejadores breves que delegan en el modelo. | Tres o cuatro tipos de eventos; lógica de negocio en el controlador. | Menos de tres eventos o manejadores que no funcionan. |
| RA5.h | Entrada validada con mensajes claros; salida en tabla, etiquetas y diálogos; importación/exportación con `FileChooser` funcional. | Entrada y salida correctas con validación incompleta. | La GUI no permite introducir o mostrar la información correctamente. |

### Proyecto integrador · incremento I9

Interfaz JavaFX del gestor de biblioteca: tabla de recursos con filtro por título y tipo, formulario de alta con validación, diálogo de préstamo y menú de importar/exportar (historia HU08). La GUI usa `Repositorio<T, ID>`, de modo que en UD10 y UD11 solo cambia la implementación.

## Recursos

- **Documentación oficial:** [OpenJFX · Getting started (Maven, IntelliJ)](https://openjfx.io/openjfx-docs/) · [JavaFX 25 API](https://openjfx.io/javadoc/25/) · [Gluon Scene Builder](https://gluonhq.com/products/scene-builder/) · [IntelliJ IDEA: JavaFX y Scene Builder](https://www.jetbrains.com/help/idea/opening-fxml-files-in-javafx-scene-builder.html) · [Introduction to FXML](https://openjfx.io/javadoc/25/javafx.fxml/javafx/fxml/doc-files/introduction_to_fxml.html) · [JavaFX CSS Reference](https://openjfx.io/javadoc/25/javafx.graphics/javafx/scene/doc-files/cssref.html).
- **Herramientas:** Scene Builder, ScenicView (inspección del grafo de escena en ejecución), IntelliJ IDEA.
