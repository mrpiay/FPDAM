# UD01 · Interfaces gráficas con JavaFX, FXML y Scene Builder

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 20 h · ≈ 24 sesiones de 50 min (estimación; semanas 1–4) | RA1 (a–f principal, g introducción) |

> Tecnología: Java 25 LTS + JavaFX 25, FXML y Scene Builder. Justificación, alternativas y debilidades reconocidas en [DEC-DI-01](../../decisiones/DEC-DI-01-framework-gui.md).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.a | Se han analizado las herramientas y librerías disponibles para la generación de interfaces gráficos. | [RD 405/2023, anexo I, 0488, RA1.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | A1 (tabla comparativa) y pregunta de la prueba del 1.er trimestre |
| RA1.b | Se ha creado un interfaz gráfico utilizando las herramientas de un editor visual. | [RD 405/2023, anexo I, 0488, RA1.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1: ventanas creadas en Scene Builder |
| RA1.c | Se han utilizado las funciones del editor para ubicar los componentes del interfaz. | [RD 405/2023, anexo I, 0488, RA1.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1: uso correcto de contenedores (`BorderPane`, `GridPane`…) y anclajes |
| RA1.d | Se han modificado las propiedades de los componentes para adecuarlas a las necesidades de la aplicación. | [RD 405/2023, anexo I, 0488, RA1.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1: `prefWidth`, `promptText`, `tooltip`, `mnemonicParsing`, `fx:id`… |
| RA1.e | Se ha analizado el código generado por el editor visual. | [RD 405/2023, anexo I, 0488, RA1.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1: memoria breve que explica el FXML generado; defensa oral |
| RA1.f | Se ha modificado el código generado por el editor visual. | [RD 405/2023, anexo I, 0488, RA1.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1: cambios hechos a mano en el FXML y en el esqueleto del controlador |
| RA1.g | Se han asociado a los eventos las acciones correspondientes. | [RD 405/2023, anexo I, 0488, RA1.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P1 (introducción: `onAction`). Se evalúa a fondo en UD03 |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Generación de interfaces de usuario», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Patrones de arquitectura de las aplicaciones gráficas.
- Librerías de componentes nativas y multiplataforma. Características.
- Herramientas propietarias y libres de edición de interfaces.
- Lenguajes descriptivos para la definición de interfaces.
- Componentes: características y campo de aplicación.
- Enlace de componentes a orígenes de datos.
- Asociación de acciones a eventos.
- Edición del código generado por la herramienta de diseño.
- Clases, propiedades, métodos.
- Eventos; escuchadores.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Comparar librerías y herramientas de interfaces (nativas, multiplataforma y web) y justificar cuál conviene a un proyecto.
2. Explicar los patrones MVC, MVP y MVVM, y cómo encaja FXML en ellos.
3. Crear un proyecto Maven JavaFX 25 y lanzar una ventana definida en FXML.
4. Diseñar ventanas en Scene Builder eligiendo bien los contenedores de *layout*.
5. Leer y editar a mano el FXML generado y conectarlo a un controlador con `@FXML`.
6. Asociar acciones sencillas a eventos de botón y menú.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Arquitectura de las aplicaciones gráficas

Una interfaz gráfica (GUI) es un **programa dirigido por eventos**. El sistema operativo entrega los eventos (clic, tecla, redimensionado) a la cola de un hilo de interfaz, y este los despacha a los manejadores. En JavaFX ese hilo es el **JavaFX Application Thread**. Ninguna operación lenta debe bloquearlo: la base de datos y la red se ejecutan en otro hilo (lo veremos en UD03).

Patrones que separan presentación y lógica:

| Patrón | Quién conoce a quién | En JavaFX |
|---|---|---|
| **MVC** | El controlador recibe los eventos de la vista y actualiza el modelo. La vista lee del modelo. | FXML (vista) + clase controladora (`fx:controller`) + clases de dominio |
| **MVP** | La vista es pasiva y el *presenter* la actualiza a través de una interfaz. | Controlador que implementa una interfaz `ClienteView` |
| **MVVM** | La vista se **enlaza** (*binding*) a propiedades de un *ViewModel* que no conoce la vista. | Propiedades `StringProperty`… en un `ClienteViewModel` (UD03) |

Las aplicaciones también se organizan en **capas**: presentación → servicio → acceso a datos (DAO/repositorio).

### 2. Librerías y herramientas (RA1.a)

| Tipo | Ejemplos | Lenguaje declarativo | Editor visual |
|---|---|---|---|
| Nativas de sistema | Win32/WinUI 3 (Windows), AppKit/SwiftUI (macOS), GTK (Linux) | XAML, SwiftUI, GtkBuilder (XML) | Visual Studio, Xcode, Cambalache |
| Multiplataforma «clásicas» | **JavaFX**, Swing, Qt, wxWidgets | **FXML**, QML/.ui | **Scene Builder**, NetBeans Matisse (Swing), Qt Designer |
| Multiplataforma modernas | .NET MAUI, Avalonia, Flutter, Compose Multiplatform | XAML, Dart/Kotlin declarativo | Vista previa en el IDE |
| Web empaquetada | Electron, Tauri | HTML + CSS | Herramientas web |

Criterios de elección: plataformas destino, lenguaje del equipo, rendimiento, aspecto nativo, licencia, editor visual, madurez y comunidad, y facilidad de distribución.

**Lenguajes descriptivos.** Describen *qué* hay en la interfaz, no *cómo* se construye: FXML, XAML, QML, layouts XML de Android y HTML. Ventajas: separan diseño y lógica, permiten editores visuales y que diseñadores y programadores trabajen en paralelo.

### 3. Proyecto Maven JavaFX 25

`pom.xml` (fragmento):

```xml
<properties>
  <maven.compiler.release>25</maven.compiler.release>
  <javafx.version>25.0.1</javafx.version>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>

<dependencies>
  <dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-controls</artifactId>
    <version>${javafx.version}</version>
  </dependency>
  <dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-fxml</artifactId>
    <version>${javafx.version}</version>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.openjfx</groupId>
      <artifactId>javafx-maven-plugin</artifactId>
      <version>0.0.8</version>
      <configuration>
        <mainClass>es.fpdam.gestortaller/es.fpdam.gestortaller.App</mainClass>
      </configuration>
    </plugin>
  </plugins>
</build>
```

Se ejecuta con `mvn javafx:run`. Con `module-info.java` (proyecto modular):

```java
module es.fpdam.gestortaller {
    requires javafx.controls;
    requires javafx.fxml;
    // FXMLLoader instancia los controladores por reflexión:
    opens es.fpdam.gestortaller.controller to javafx.fxml;
    exports es.fpdam.gestortaller;
}
```

> Si se olvida el `opens`, al cargar el FXML aparece `IllegalAccessException ... module ... does not open ... to javafx.graphics/javafx.fxml`. Es el error más habitual de la primera semana.

Clase principal:

```java
package es.fpdam.gestortaller;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        FXMLLoader loader = new FXMLLoader(App.class.getResource("view/principal.fxml"));
        Scene scene = new Scene(loader.load(), 900, 600);
        scene.getStylesheets().add(App.class.getResource("css/app.css").toExternalForm());
        stage.setTitle("Gestor de taller");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

Jerarquía de JavaFX: `Stage` (ventana) → `Scene` (contenido) → **grafo de escena** de `Node` (`Parent` → `Region` → `Pane`/`Control`). Ciclo de vida: `init()` → `start(Stage)` → `stop()`.

### 4. Contenedores de *layout* (RA1.c)

| Contenedor | Para qué | Propiedades clave |
|---|---|---|
| `BorderPane` | Ventana principal: menú arriba, navegación a la izquierda, contenido en el centro y estado abajo | `top`, `left`, `center`, `bottom` |
| `VBox` / `HBox` | Apilar elementos | `spacing`, `alignment`, `VBox.vgrow` |
| `GridPane` | Formularios con etiqueta y campo | `hgap`, `vgap`, `ColumnConstraints`, `GridPane.columnIndex` |
| `AnchorPane` | Anclar a los bordes (por ejemplo, botonera abajo a la derecha) | `AnchorPane.rightAnchor` |
| `StackPane` | Superponer (indicador de carga sobre la tabla) | `alignment` |
| `TabPane`, `SplitPane`, `ScrollPane` | Organizar contenido extenso | — |

Regla práctica: **nunca posicionar con coordenadas absolutas** (`layoutX/Y`). Hay que usar contenedores, porque la ventana debe adaptarse al tamaño, al idioma y al escalado de pantalla.

### 5. Scene Builder (RA1.b, c, d)

Paneles: **Library** (controles), **Document** (jerarquía y controlador), **Content** (lienzo) e **Inspector** (Properties / Layout / Code).

- Se arrastra desde *Library* o se ordena en *Hierarchy*. Con *Wrap in* se envuelve una selección en un contenedor.
- En **Properties** se ajusta `text`, `promptText`, `tooltip`, `disable`, `focusTraversable`, `mnemonicParsing` y `styleClass`.
- En **Layout** se fijan márgenes, `hgrow`/`vgrow`, `min/pref/maxWidth` y restricciones de `GridPane`.
- En **Code** se asigna el `fx:id` y los manejadores (`onAction`).
- *Preview → Show Preview in Window* permite probar el redimensionado. *View → Show Sample Controller Skeleton* genera el esqueleto del controlador.

### 6. Análisis del FXML generado (RA1.e)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.geometry.Insets?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<GridPane xmlns="http://javafx.com/javafx/21" xmlns:fx="http://javafx.com/fxml/1"
          fx:controller="es.fpdam.gestortaller.controller.ClienteFormController"
          hgap="10" vgap="8">
  <padding><Insets top="16" right="16" bottom="16" left="16"/></padding>
  <columnConstraints>
    <ColumnConstraints halignment="RIGHT" minWidth="90"/>
    <ColumnConstraints hgrow="ALWAYS"/>
  </columnConstraints>

  <Label text="_NIF:" mnemonicParsing="true" labelFor="$txtNif"
         GridPane.rowIndex="0" GridPane.columnIndex="0"/>
  <TextField fx:id="txtNif" promptText="12345678Z"
             GridPane.rowIndex="0" GridPane.columnIndex="1"/>

  <Label text="N_ombre:" mnemonicParsing="true" labelFor="$txtNombre"
         GridPane.rowIndex="1" GridPane.columnIndex="0"/>
  <TextField fx:id="txtNombre" GridPane.rowIndex="1" GridPane.columnIndex="1"/>

  <HBox spacing="8" alignment="CENTER_RIGHT"
        GridPane.rowIndex="2" GridPane.columnIndex="0" GridPane.columnSpan="2">
    <Button text="Cancelar" cancelButton="true" onAction="#onCancelar"/>
    <Button fx:id="btnGuardar" text="_Guardar" defaultButton="true" onAction="#onGuardar"/>
  </HBox>
</GridPane>
```

Qué hay que saber leer:

- Las **instrucciones `<?import?>`** equivalen a los `import` de Java. Cada elemento XML es una clase y cada atributo, una propiedad (`text` → `setText`).
- Las **propiedades estáticas** (`GridPane.rowIndex`) son restricciones que el contenedor padre lee.
- **`fx:controller`** indica la clase que instancia `FXMLLoader`. **`fx:id`** inyecta el nodo en el campo `@FXML` del mismo nombre.
- **`#onGuardar`** apunta al método del controlador. **`$txtNif`** hace referencia a otro elemento del documento.
- `defaultButton`/`cancelButton` asocian Intro y Esc. El guion bajo de `_Guardar` crea el mnemónico Alt+G (lo retomaremos en UD02, en accesibilidad).

### 7. Controlador y modificación del código generado (RA1.f, g)

```java
package es.fpdam.gestortaller.controller;

import javafx.fxml.FXML;
import javafx.scene.control.*;

public class ClienteFormController {

    @FXML private TextField txtNif;
    @FXML private TextField txtNombre;
    @FXML private Button btnGuardar;

    /** FXMLLoader lo llama tras inyectar los @FXML. */
    @FXML
    private void initialize() {
        // Cambio a mano: deshabilitar Guardar si falta el nombre (binding básico)
        btnGuardar.disableProperty().bind(txtNombre.textProperty().isEmpty());
        txtNif.setTextFormatter(new TextFormatter<String>(c ->
                c.getControlNewText().length() <= 9 ? c : null));
    }

    @FXML
    private void onGuardar() {
        new Alert(Alert.AlertType.INFORMATION, "Cliente guardado").showAndWait();
    }

    @FXML
    private void onCancelar() {
        txtNombre.getScene().getWindow().hide();
    }
}
```

Modificaciones que el editor no hace y que conviene practicar a mano:

1. Añadir `fx:include` para reutilizar partes de la interfaz: `<fx:include fx:id="barraEstado" source="barra-estado.fxml"/>`. Se inyecta como `barraEstado` (el nodo) y `barraEstadoController`.
2. Definir constantes y recursos: `text="%cliente.nombre"`, con `ResourceBundle` para internacionalizar (`new FXMLLoader(url, ResourceBundle.getBundle("i18n.textos"))`).
3. Crear nodos desde código cuando su número es dinámico. Por ejemplo, un botón por cada categoría leída de la base de datos.
4. Pasar datos a otro controlador: `loader.getController()` después de `load()`.

Tras editar el FXML a mano, se vuelve a abrir en Scene Builder para comprobar que sigue siendo válido. Scene Builder respeta lo que entiende, pero **elimina los comentarios** y puede reordenar atributos, así que hay que versionar con Git antes de guardar.

> **Alternativa.** En C#/WPF el equivalente es XAML con el diseñador de Visual Studio: `x:Name` hace el papel de `fx:id` y `Click="OnGuardar"` el de `onAction`. En Qt, los ficheros `.ui` de Qt Designer. En Compose Multiplatform no hay lenguaje descriptivo separado: la interfaz es código Kotlin con vista previa, así que RA1.e/f se trabajan sobre el código que genera la vista previa o un asistente.

### 8. Eventos (introducción)

Todo `Node` emite eventos (`ActionEvent`, `MouseEvent`, `KeyEvent`). Formas de manejarlos:

```java
btnGuardar.setOnAction(e -> guardar());                                   // propiedad de conveniencia
txtNombre.addEventHandler(KeyEvent.KEY_PRESSED, e -> { /* ... */ });      // manejador añadido
scene.addEventFilter(KeyEvent.KEY_PRESSED, e -> { /* fase de captura */ });
```

Un evento recorre el grafo en dos fases: **captura** (de la raíz al nodo, filtros) y **burbujeo** (del nodo a la raíz, manejadores). `e.consume()` lo detiene. Se profundiza en UD03.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Comparativa de librerías.** En parejas, completar una tabla con JavaFX, WinUI 3, Qt, Avalonia, Electron y Flutter (plataformas, lenguaje, lenguaje declarativo, editor visual, licencia, una aplicación conocida). Puesta en común de 10 minutos.
- **A2. Hola FXML.** Crear el proyecto Maven desde el IDE, ejecutar `mvn javafx:run` y provocar a propósito el error del `opens` para aprender a resolverlo.
- **A3. Layout que se estira.** Reproducir en Scene Builder un formulario de inicio de sesión que se adapte al redimensionar (`GridPane` + `ColumnConstraints hgrow`). Probar con *Preview*.
- **A4. Ingeniería inversa del FXML.** Dado un FXML de unas 40 líneas, anotar cada línea, dibujar el árbol de nodos y predecir cómo se verá. Comprobarlo abriéndolo en Scene Builder.
- **A5. Navegación entre ventanas.** Abrir el formulario de cliente como diálogo modal (`initModality(Modality.WINDOW_MODAL)`) y devolverle un dato a la ventana principal.
- **A6. Mismo formulario, tres tecnologías.** Ver en el proyector el mismo formulario en Swing (código generado por NetBeans Matisse), en FXML y en XAML. Comparar legibilidad, separación vista/lógica y facilidad de edición manual. Debate guiado (1 sesión).
- **A7. Internacionalización.** Extraer todos los textos de una ventana a `textos_es.properties` y `textos_gl.properties` (castellano y gallego) y cambiar de idioma al arrancar con `Locale`. Comprobar que el *layout* aguanta textos más largos.
- **A8. Taller de layouts.** Reto cronometrado por parejas: reproducir 4 capturas de pantalla de aplicaciones reales usando solo contenedores, sin coordenadas absolutas.

**Reparto orientativo (20 h):** teoría y demostraciones, 5 h · actividades A1–A8, 8 h · P1 en aula, 6 h · defensa de P1, 1 h.

### Práctica evaluable

**P1 · Interfaz base del gestor de taller (hito H1, `v0.1`).** Trabajo en equipo (2–3 personas). Primero se prepara el entorno profesional: repositorio con `main` protegida, tablero de GitHub Projects con el *backlog* de historias de usuario del encargo y plantilla de PR. Después, se construye con Scene Builder la ventana principal (`BorderPane` con `MenuBar`, `ToolBar`, navegación lateral y área central) y los formularios de **cliente** y **vehículo**, con los campos del modelo de datos. Los formularios se abren desde el menú y la barra de herramientas. Los botones Guardar y Cancelar tienen acción (de momento, un `Alert` y cerrar la ventana). Al menos dos cambios se hacen **a mano** en el FXML (por ejemplo, `fx:include` de la barra de estado e i18n con `%claves`) y otro en el controlador (*binding* de habilitación o `TextFormatter`).

**Conexión con el mundo real:** equivale al *sprint* 0 de un proyecto. Se monta la estructura, el repositorio, el tablero y un primer esqueleto navegable para enseñar al cliente en la primera reunión de seguimiento.

Entregables: repositorio con la etiqueta `v0.1`, capturas a 800×600 y a 1920×1080, y `MEMORIA.md` (máx. 2 páginas) con el árbol de nodos de una ventana, la explicación de 10 líneas del FXML generado y una lista de los cambios hechos a mano con su motivo.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA1.a | Justifica en la memoria la elección de JavaFX frente a dos alternativas, con criterios técnicos | Menciona alternativas con una justificación general | No analiza alternativas |
| RA1.b | Todas las ventanas pedidas están creadas con Scene Builder y se ven completas | Faltan detalles menores | Faltan ventanas o no se usó el editor visual |
| RA1.c | Contenedores adecuados; todo se adapta al redimensionar; sin coordenadas absolutas | Algún contenedor mejorable o un desajuste al redimensionar | Posicionamiento absoluto o interfaz rota al redimensionar |
| RA1.d | Ajusta `promptText`, `tooltip`, mnemónicos, `default/cancelButton` y tamaños con coherencia | Ajusta la mayoría de propiedades | Deja las propiedades por defecto |
| RA1.e | Explica con precisión el FXML (imports, `fx:id`, `fx:controller`, restricciones estáticas) y responde bien en la defensa | Explicación correcta con alguna imprecisión | No sabe explicar el código generado |
| RA1.f | Hace 3 o más modificaciones manuales correctas (FXML y controlador) y siguen siendo editables en Scene Builder | Hace 2 modificaciones correctas | Ninguna, o rompen el FXML |
| RA1.g | Todas las acciones de menú y botón funcionan; usa `onAction` y `setOnAction` con criterio | Funcionan casi todas | No hay eventos asociados |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:** [OpenJFX: Getting Started](https://openjfx.io/openjfx-docs/) · [JavaFX 25 API](https://openjfx.io/javadoc/25/) · [Introduction to FXML](https://openjfx.io/javadoc/25/javafx.fxml/javafx/fxml/doc-files/introduction_to_fxml.html) · [Scene Builder (Gluon)](https://gluonhq.com/products/scene-builder/) · [javafx-maven-plugin](https://github.com/openjfx/javafx-maven-plugin)
- **Herramientas:** JDK 25, IntelliJ IDEA / NetBeans, Gluon Scene Builder 25, Git.
