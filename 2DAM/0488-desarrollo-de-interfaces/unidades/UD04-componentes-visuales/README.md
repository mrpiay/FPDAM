# UD04 · Componentes visuales propios

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 24 h · ≈ 29 sesiones de 50 min (estimación; semanas 13–17) | RA3 (a–h, principal) · RA8.a y c (introducción) |

> Tecnología: controles JavaFX, Maven, JUnit 5 + TestFX y GitHub Actions ([DEC-DI-01](../../decisiones/DEC-DI-01-framework-gui.md), [DEC-DI-07](../../decisiones/DEC-DI-07-pruebas.md)).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA3.a | Se han identificado las herramientas para diseño y prueba de componentes. | [RD 405/2023, anexo I, 0488, RA3.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: apartado «Herramientas» del README de la biblioteca; prueba práctica en aula del 1.er trimestre |
| RA3.b | Se han creado componentes visuales. | [RD 405/2023, anexo I, 0488, RA3.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: `MatriculaField` (composición) y `RatingControl` (`Control` + `Skin`) |
| RA3.c | Se han definido sus métodos y propiedades con asignación de valores por defecto. | [RD 405/2023, anexo I, 0488, RA3.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: propiedades JavaFX con valor inicial y visibles en el *Inspector* de Scene Builder |
| RA3.d | Se han determinado los eventos a los que debe responder el componente y se les han asociado las acciones correspondientes. | [RD 405/2023, anexo I, 0488, RA3.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: eventos propios (`MatriculaEvent`) y respuesta a ratón y teclado |
| RA3.e | Se han realizado pruebas unitarias sobre los componentes desarrollados. | [RD 405/2023, anexo I, 0488, RA3.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: JUnit 5 + TestFX ejecutadas en GitHub Actions |
| RA3.f | Se han documentado los componentes creados. | [RD 405/2023, anexo I, 0488, RA3.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: JavaDoc generado y README de uso |
| RA3.g | Se han empaquetado componentes. | [RD 405/2023, anexo I, 0488, RA3.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: artefacto Maven `gestor-taller-controls` importado en Scene Builder |
| RA3.h | Se han programado aplicaciones cuyo interfaz gráfico utiliza los componentes creados. | [RD 405/2023, anexo I, 0488, RA3.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P4: El gestor de taller usa la biblioteca como dependencia en sus FXML |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Creación de componentes visuales», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Concepto de componente; características.
- Propiedades, atributos y métodos.
- Eventos; asociación de acciones a eventos.
- Persistencia del componente.
- Herramientas para desarrollo de componentes visuales.
- Prueba de los componentes.
- Empaquetado de componentes.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Explicar qué es un componente reutilizable y qué características debe tener.
2. Elegir entre las técnicas de creación de controles en JavaFX: composición con `fx:root`, extensión de un control existente o `Control` + `Skin`.
3. Definir propiedades JavaFX con valores por defecto, propiedades de solo lectura y propiedades configurables desde CSS.
4. Definir eventos propios y exponerlos como `onXxx`, para poder usarlos desde FXML.
5. Persistir el estado o la configuración de un componente.
6. Probar componentes con JUnit 5 y TestFX y ejecutar las pruebas en integración continua.
7. Documentar con JavaDoc, empaquetar como artefacto Maven, importar en Scene Builder y reutilizar en una aplicación.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Concepto de componente y características

Un **componente visual** es una unidad de interfaz **reutilizable y autocontenida**. Tiene un aspecto, un estado (propiedades), un comportamiento (métodos) y un modo de comunicarse con el exterior (eventos). Se distribuye de forma que otras aplicaciones lo usen sin conocer su implementación.

Características deseables:

| Característica | En JavaFX |
|---|---|
| Encapsulación | Los nodos internos son privados y se expone una API pública mínima |
| Configurabilidad | Propiedades con valores por defecto razonables, ajustables desde código, FXML, Scene Builder y CSS |
| Introspección | Seguir la convención *JavaFX Beans* (`getX`/`setX`/`xProperty`) para que herramientas como Scene Builder descubran las propiedades |
| Comunicación por eventos | Eventos propios y *bindings* sobre sus propiedades |
| Persistencia | Guardar y restaurar estado o configuración |
| Accesibilidad | Rol, texto accesible, foco y teclado |
| Aspecto personalizable | Clase CSS propia y hoja de estilo por defecto |

> **Contexto histórico.** El modelo de componentes de Java era **JavaBeans** (constructor sin argumentos, *getters* y *setters*, `PropertyChangeSupport`, `Serializable`). Los editores visuales de Swing, como NetBeans Matisse, se basaban en él. JavaFX lo hereda y lo moderniza con propiedades observables.

### 2. Técnicas para crear controles en JavaFX

| Técnica | Cuándo | Ejemplo en el gestor de taller |
|---|---|---|
| **Composición con `fx:root`** | Agrupar controles existentes con lógica propia. Es la técnica más rápida | `MatriculaField` (campo + mensaje de validación) |
| **Extender un control existente** | Cambiar ligeramente el comportamiento | `NumericTextField extends TextField` |
| **`Control` + `SkinBase`** | Control nuevo con aspecto intercambiable. Separa el modelo del control de su apariencia | `RatingControl` (valoración de 1 a 5 de la satisfacción del cliente) |
| **`Region`/`Canvas` dibujado** | Gráficos a medida | Indicador de ocupación del taller |

### 3. Componente por composición: `MatriculaField`

`MatriculaField.fxml` va en el mismo paquete de recursos que la clase:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.control.Label?>
<?import javafx.scene.control.TextField?>
<fx:root type="javafx.scene.layout.VBox" xmlns="http://javafx.com/javafx/21"
         xmlns:fx="http://javafx.com/fxml/1" spacing="2">
  <TextField fx:id="campo" promptText="1234BCD"/>
  <Label fx:id="mensaje" styleClass="mensaje-error" managed="false" visible="false"/>
</fx:root>
```

```java
package es.fpdam.gestortaller.controls;

/**
 * Campo de texto para matrículas españolas con validación en vivo.
 * <p>Formato actual (desde 2000): 4 cifras y 3 consonantes, sin vocales, Ñ ni Q.
 * Opcionalmente admite el formato provincial antiguo.</p>
 *
 * <pre>{@code
 * <MatriculaField fx:id="matricula" obligatorio="true" onValida="#onMatriculaValida"/>
 * }</pre>
 *
 * @since 1.0
 */
public class MatriculaField extends VBox {

    /** Formatos de matrícula admitidos. */
    public enum Formato { ACTUAL, ACTUAL_Y_PROVINCIAL }

    private static final Pattern ACTUAL = Pattern.compile("\\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}");
    private static final Pattern PROVINCIAL = Pattern.compile("[A-Z]{1,2}\\d{4}[A-Z]{0,2}");
    private static final PseudoClass ERROR = PseudoClass.getPseudoClass("error");

    @FXML private TextField campo;
    @FXML private Label mensaje;

    // --- Propiedades con valores por defecto (RA3.c) ---
    private final ObjectProperty<Formato> formato =
            new SimpleObjectProperty<>(this, "formato", Formato.ACTUAL);
    private final BooleanProperty obligatorio =
            new SimpleBooleanProperty(this, "obligatorio", false);
    private final ReadOnlyBooleanWrapper valida =
            new ReadOnlyBooleanWrapper(this, "valida", false);

    // --- Evento expuesto como propiedad onValida, utilizable desde FXML (RA3.d) ---
    private final ObjectProperty<EventHandler<MatriculaEvent>> onValida =
            new SimpleObjectProperty<>(this, "onValida") {
                @Override protected void invalidated() {
                    setEventHandler(MatriculaEvent.VALIDA, get());
                }
            };

    /** Constructor sin argumentos: imprescindible para FXML y Scene Builder. */
    public MatriculaField() {
        FXMLLoader loader = new FXMLLoader(MatriculaField.class.getResource("MatriculaField.fxml"));
        loader.setRoot(this);
        loader.setController(this);
        try {
            loader.load();
        } catch (IOException e) {
            throw new UncheckedIOException("No se pudo cargar MatriculaField.fxml", e);
        }
        getStyleClass().add("matricula-field");
        campo.setAccessibleText("Matrícula del vehículo");
        campo.textProperty().addListener((obs, ant, txt) -> validar());
        formato.addListener(obs -> validar());
        obligatorio.addListener(obs -> validar());
    }

    private void validar() {
        String t = getMatricula().toUpperCase().replaceAll("[\\s-]", "");
        boolean ok = ACTUAL.matcher(t).matches()
                || (getFormato() == Formato.ACTUAL_Y_PROVINCIAL && PROVINCIAL.matcher(t).matches());
        boolean vacia = t.isEmpty();
        boolean error = vacia ? isObligatorio() : !ok;
        valida.set(!vacia && ok);
        campo.pseudoClassStateChanged(ERROR, error && !vacia);
        mensaje.setText(error && !vacia ? "Formato de matrícula no válido. Ejemplo: 1234BCD." : "");
        mensaje.setVisible(!mensaje.getText().isEmpty());
        mensaje.setManaged(mensaje.isVisible());
        if (valida.get()) {
            fireEvent(new MatriculaEvent(MatriculaEvent.VALIDA, t));
        }
    }

    // --- API pública (convención JavaFX Beans) ---
    public String getMatricula()                 { return campo.getText() == null ? "" : campo.getText(); }
    public void setMatricula(String m)           { campo.setText(m); }
    public StringProperty matriculaProperty()    { return campo.textProperty(); }

    public Formato getFormato()                  { return formato.get(); }
    public void setFormato(Formato f)            { formato.set(f); }
    public ObjectProperty<Formato> formatoProperty() { return formato; }

    public boolean isObligatorio()               { return obligatorio.get(); }
    public void setObligatorio(boolean b)        { obligatorio.set(b); }
    public BooleanProperty obligatorioProperty() { return obligatorio; }

    public boolean isValida()                    { return valida.get(); }
    public ReadOnlyBooleanProperty validaProperty() { return valida.getReadOnlyProperty(); }

    public EventHandler<MatriculaEvent> getOnValida()         { return onValida.get(); }
    public void setOnValida(EventHandler<MatriculaEvent> h)   { onValida.set(h); }
    public ObjectProperty<EventHandler<MatriculaEvent>> onValidaProperty() { return onValida; }
}
```

Evento propio:

```java
public class MatriculaEvent extends Event {
    public static final EventType<MatriculaEvent> ANY = new EventType<>(Event.ANY, "MATRICULA");
    public static final EventType<MatriculaEvent> VALIDA = new EventType<>(ANY, "MATRICULA_VALIDA");

    private final String matricula;

    public MatriculaEvent(EventType<MatriculaEvent> tipo, String matricula) {
        super(tipo);
        this.matricula = matricula;
    }
    public String getMatricula() { return matricula; }
}
```

Decisiones de diseño que hay que saber justificar:

- **`ReadOnlyBooleanWrapper`.** `valida` lo calcula el componente, así que desde fuera solo se puede leer o enlazar, nunca asignar.
- **`setEventHandler` dentro de `invalidated()`.** Así `onValida="#metodo"` funciona desde FXML, igual que `onAction` en un `Button`.
- **Los nodos internos son privados.** Se expone `matriculaProperty()`, no el `TextField`.

### 4. Control con *skin*: `RatingControl`

```java
public class RatingControl extends Control {
    private final IntegerProperty maximo = new SimpleIntegerProperty(this, "maximo", 5);
    private final IntegerProperty valor = new SimpleIntegerProperty(this, "valor", 0) {
        @Override public void set(int v) { super.set(Math.max(0, Math.min(v, getMaximo()))); } // acota
    };

    public RatingControl() {
        getStyleClass().add("rating-control");
        setFocusTraversable(true);
        setAccessibleRole(AccessibleRole.SLIDER);
    }

    @Override protected Skin<?> createDefaultSkin() { return new RatingSkin(this); }

    @Override public String getUserAgentStylesheet() {
        return RatingControl.class.getResource("rating-control.css").toExternalForm();
    }

    @Override public Object queryAccessibleAttribute(AccessibleAttribute attr, Object... params) {
        return switch (attr) {
            case VALUE     -> (double) getValor();
            case MIN_VALUE -> 0.0;
            case MAX_VALUE -> (double) getMaximo();
            default        -> super.queryAccessibleAttribute(attr, params);
        };
    }

    public void incrementar() { setValor(getValor() + 1); }   // métodos públicos (RA3.c)
    public void decrementar() { setValor(getValor() - 1); }
    // getters, setters y xxxProperty() de valor y maximo
}
```

```java
public class RatingSkin extends SkinBase<RatingControl> {
    private final HBox estrellas = new HBox(4);

    public RatingSkin(RatingControl control) {
        super(control);
        getChildren().add(estrellas);
        reconstruir();
        control.maximoProperty().addListener(o -> reconstruir());
        control.valorProperty().addListener(o -> actualizar());
        control.addEventHandler(KeyEvent.KEY_PRESSED, e -> {
            switch (e.getCode()) {
                case RIGHT, UP   -> { control.incrementar(); e.consume(); }
                case LEFT, DOWN  -> { control.decrementar(); e.consume(); }
                default -> { }
            }
        });
    }

    private void reconstruir() {
        estrellas.getChildren().clear();
        for (int i = 1; i <= getSkinnable().getMaximo(); i++) {
            int n = i;
            Region estrella = new Region();
            estrella.getStyleClass().add("estrella");
            estrella.setOnMouseClicked(e -> getSkinnable().setValor(n));
            estrellas.getChildren().add(estrella);
        }
        actualizar();
    }

    private void actualizar() {
        for (int i = 0; i < estrellas.getChildren().size(); i++) {
            estrellas.getChildren().get(i).pseudoClassStateChanged(
                    PseudoClass.getPseudoClass("activa"), i < getSkinnable().getValor());
        }
    }
}
```

```css
/* rating-control.css (hoja por defecto del control) */
.rating-control .estrella {
    -fx-shape: "M12 2l3 7h7l-5.5 4.5 2 7.5-6.5-4.5-6.5 4.5 2-7.5L2 9h7z";
    -fx-min-width: 24px; -fx-min-height: 24px;      /* objetivo táctil adecuado */
    -fx-background-color: #8a8f98;
}
.rating-control .estrella:activa { -fx-background-color: #b35c00; }
.rating-control:focused { -fx-border-color: #ffbf47; -fx-border-width: 2px; }
```

**Propiedad configurable desde CSS** (ampliación). Se usan `CssMetaData` y `StyleableObjectProperty`:

```java
private static final CssMetaData<RatingControl, Color> COLOR_ACTIVA =
        new CssMetaData<>("-gt-color-activa", StyleConverter.getColorConverter(), Color.web("#b35c00")) {
            @Override public boolean isSettable(RatingControl c) { return !c.colorActiva.isBound(); }
            @Override public StyleableProperty<Color> getStyleableProperty(RatingControl c) { return c.colorActiva; }
        };
private final StyleableObjectProperty<Color> colorActiva =
        new SimpleStyleableObjectProperty<>(COLOR_ACTIVA, this, "colorActiva", Color.web("#b35c00"));

public static List<CssMetaData<? extends Styleable, ?>> getClassCssMetaData() {
    List<CssMetaData<? extends Styleable, ?>> lista = new ArrayList<>(Control.getClassCssMetaData());
    lista.add(COLOR_ACTIVA);
    return Collections.unmodifiableList(lista);
}
@Override public List<CssMetaData<? extends Styleable, ?>> getControlCssMetaData() { return getClassCssMetaData(); }
```

### 5. Persistencia del componente

Hay dos niveles de persistencia:

1. **Estado del componente.** Lo guarda la aplicación a través de las propiedades del componente, por ejemplo el valor de `RatingControl` en la tabla `orden`.
2. **Configuración del usuario**, que el propio componente puede recordar: anchos y orden de las columnas, último formato elegido o tema. Se usa `java.util.prefs.Preferences`, que en Windows guarda en el registro y en Linux en `~/.java`.

```java
/** Recuerda los anchos de columna de una tabla entre sesiones. */
public final class ColumnasPersistentes {
    public static void vincular(TableView<?> tabla, String clave) {
        Preferences p = Preferences.userNodeForPackage(ColumnasPersistentes.class).node(clave);
        for (TableColumn<?, ?> col : tabla.getColumns()) {
            String id = Objects.requireNonNull(col.getId(), "Cada columna necesita fx:id");
            col.setPrefWidth(p.getDouble(id, col.getPrefWidth()));
            col.widthProperty().addListener((o, a, ancho) -> p.putDouble(id, ancho.doubleValue()));
        }
    }
}
```

Alternativas: serializar las propiedades a JSON (Jackson) o a un fichero `properties` en el directorio de datos del usuario, o usar la serialización Java (solo como contexto, por sus riesgos de seguridad).

### 6. Herramientas para diseño y prueba de componentes (RA3.a)

| Herramienta | Uso |
|---|---|
| **Scene Builder** | Importar el JAR (*Library* › ⚙ › *JAR/FXML Manager*), ver el componente en la paleta, editar sus propiedades en el *Inspector* y previsualizarlo |
| **Scenic View** | Inspeccionar el grafo de escena, las propiedades y el CSS aplicado en tiempo de ejecución |
| **IDE** (IntelliJ/NetBeans) | Depuración, refactorización y vista de JavaDoc |
| **JUnit 5 + TestFX** | Pruebas unitarias y de interacción (robot de ratón y teclado) |
| **GitHub Actions** | Ejecutar las pruebas en cada *push* o PR (base de las pruebas de regresión de UD09) |
| **Accessibility Insights** | Comprobar rol, nombre y valor accesibles |
| **Penpot/Figma** | Diseñar el componente y sus estados antes de programarlo |

### 7. Pruebas de componentes (RA3.e)

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.11.3</version>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>org.testfx</groupId>
  <artifactId>testfx-junit5</artifactId>
  <version>4.0.18</version>   <!-- comprobar la última versión 4.0.x -->
  <scope>test</scope>
</dependency>
```

```java
@ExtendWith(ApplicationExtension.class)
class MatriculaFieldTest {

    private MatriculaField campo;

    @Start
    void start(Stage stage) {
        campo = new MatriculaField();
        stage.setScene(new Scene(new StackPane(campo), 320, 120));
        stage.show();
    }

    @Test
    void valoresPorDefecto() {
        assertEquals(MatriculaField.Formato.ACTUAL, campo.getFormato());
        assertFalse(campo.isObligatorio());
        assertFalse(campo.isValida());
    }

    @Test
    void aceptaMatriculaActual(FxRobot robot) {
        robot.clickOn(".text-field").write("1234BCD");
        assertTrue(campo.isValida());
    }

    @Test
    void rechazaVocales(FxRobot robot) {
        robot.clickOn(".text-field").write("1234ABC");
        assertFalse(campo.isValida());
        FxAssert.verifyThat(".mensaje-error",
                LabeledMatchers.hasText("Formato de matrícula no válido. Ejemplo: 1234BCD."));
    }

    @Test
    void lanzaEventoValida(FxRobot robot) {
        AtomicReference<String> recibida = new AtomicReference<>();
        robot.interact(() -> campo.setOnValida(e -> recibida.set(e.getMatricula())));
        robot.clickOn(".text-field").write("1234 bcd");
        assertEquals("1234BCD", recibida.get());
    }
}
```

`robot.interact(...)` ejecuta el código en el hilo de JavaFX. Para la lógica pura, como el patrón de matrícula, conviene extraer un `ValidadorMatricula` y probarlo con JUnit sin interfaz y con `@ParameterizedTest`, que es más rápido.

**CI en GitHub Actions.** Las pruebas de interfaz necesitan una pantalla, así que en Linux se usa un servidor X virtual:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '21', cache: maven }
      - name: Compilar y probar (pantalla virtual)
        run: xvfb-run -a mvn -B verify
```

Alternativa sin pantalla: Monocle en modo *headless* (`-Dtestfx.robot=glass -Dtestfx.headless=true -Dprism.order=sw`).

### 8. Documentación (RA3.f)

- JavaDoc en la clase (propósito, ejemplo FXML con `{@code}`, `@since`) y en cada método público. En las propiedades se documenta el método `xxxProperty()`.
- `mvn javadoc:javadoc` genera la documentación. Con la opción `--javafx` del doclet estándar, las propiedades JavaFX se documentan agrupadas:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-javadoc-plugin</artifactId>
  <version>3.11.2</version>
  <configuration>
    <additionalOptions>--javafx</additionalOptions>
    <locale>es</locale>
  </configuration>
</plugin>
```

- README de la biblioteca con instalación (coordenadas Maven), una tabla de propiedades (nombre, tipo, valor por defecto, descripción), eventos, clases CSS y capturas.

### 9. Empaquetado y uso (RA3.g, h)

Estructura de un proyecto Maven multimódulo:

```
gestor-taller/
├── pom.xml                    (padre, <packaging>pom</packaging>)
├── gestor-taller-controls/        (biblioteca: JAR)
│   └── src/main/java/es/fpdam/gestortaller/controls/...
│       src/main/resources/es/fpdam/gestortaller/controls/MatriculaField.fxml, rating-control.css
└── gestor-taller-app/             (aplicación; depende de gestor-taller-controls)
```

`module-info.java` de la biblioteca:

```java
module es.fpdam.gestortaller.controls {
    requires transitive javafx.controls;
    requires javafx.fxml;
    exports es.fpdam.gestortaller.controls;
    opens es.fpdam.gestortaller.controls to javafx.fxml;   // el FXML interno usa @FXML
}
```

- `mvn install` instala el JAR en el repositorio local. La aplicación lo declara como `<dependency>`.
- **Scene Builder:** *JAR/FXML Manager* › *Add Library/FXML from file system* (o *Search repositories* con las coordenadas Maven). Los componentes aparecen en la sección *Custom* de la paleta.
- En el FXML de la aplicación: `<?import es.fpdam.gestortaller.controls.MatriculaField?>` y `<MatriculaField fx:id="matricula" obligatorio="true" onValida="#onMatriculaValida"/>`.
- Ampliación: publicar la biblioteca en **GitHub Packages** con `mvn deploy`, con versión semántica (`1.0.0`).

> **Alternativa.** En WPF: `UserControl` (composición) o `CustomControl` con `ControlTemplate` (el equivalente al *skin*), `DependencyProperty` con valor por defecto en `PropertyMetadata`, `RoutedEvent`, empaquetado como NuGet y pruebas con xUnit + FlaUI. En Compose: una función `@Composable` con parámetros por defecto y *lambdas* `onXxx`, publicada como artefacto Gradle. En web: Web Components (`customElements.define`) publicados en npm.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Anatomía de un control.** Inspeccionar con Scenic View un `DatePicker` y un `TableView` para descubrir su *skin*, sus nodos internos y sus clases CSS.
- **A2. `NumericTextField`.** Extender `TextField` para que solo acepte números con decimales según el `Locale`. Debe tener las propiedades `minimo`, `maximo` y `decimales`, con valores por defecto.
- **A3. Del FXML a Scene Builder.** Empaquetar `MatriculaField`, importarlo en Scene Builder y comprobar qué propiedades aparecen en el *Inspector* y por qué; por ejemplo, por qué `valida` no es editable.
- **A4. Primer test con robot.** Escribir 3 pruebas TestFX para `RatingControl`: clic en la tercera estrella, flechas de teclado y valor acotado al máximo.
- **A5. CI en verde.** Configurar el *workflow* de GitHub Actions y provocar un fallo a propósito para ver cómo se bloquea la PR.
- **A6. Persistencia.** Aplicar `ColumnasPersistentes` a las tablas del gestor de taller y verificar que se recuerdan los anchos tras reiniciar.

### Práctica evaluable

**P4 · Biblioteca `gestor-taller-controls` (hito H4, `v0.4`).** Desarrollar una biblioteca con al menos **dos componentes**: `MatriculaField` y `RatingControl`, o dos equivalentes propuestos por el alumnado y aprobados. Requisitos:

1. Al menos uno debe usar la técnica `Control` + `Skin`.
2. Cada componente tiene al menos 3 propiedades con valor por defecto, una de solo lectura, 2 métodos públicos y un evento propio expuesto como `onXxx`.
3. Persistencia de alguna preferencia.
4. Mínimo 8 pruebas JUnit/TestFX en CI.
5. JavaDoc y README de la biblioteca.
6. JAR instalable con Maven e importable en Scene Builder.
7. El gestor de taller usa los componentes desde su FXML.

**Conexión con el mundo real:** muchas empresas mantienen una biblioteca interna de componentes compartida entre aplicaciones. Su calidad depende de una API estable, documentación, pruebas automáticas y versionado. Es lo que se pide aquí, con revisión por PR como en un equipo.

Entregables: repositorio multimódulo con la etiqueta `v0.4`, *workflow* en verde, JavaDoc generado (`target/reports/apidocs`) y una captura de Scene Builder con los componentes en la paleta. Defensa presencial.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA3.a | Describe y usa de forma justificada Scene Builder, Scenic View, TestFX y CI | Menciona las herramientas y usa algunas | No identifica herramientas |
| RA3.b | Dos componentes funcionales y encapsulados, uno con `Control` + `Skin` | Dos componentes por composición | Un solo componente o expone sus nodos internos |
| RA3.c | Propiedades JavaFX completas (*getter*, *setter* y `xxxProperty`) con valores por defecto razonables, solo lectura donde corresponde y métodos útiles | Propiedades correctas con alguna omisión | Campos sin propiedades observables o sin valores por defecto |
| RA3.d | Evento propio con jerarquía de tipos, `onXxx` usable desde FXML y teclado y ratón gestionados | Evento propio sin uso desde FXML | Sin eventos propios |
| RA3.e | 8 o más pruebas significativas (valores por defecto, interacción, eventos y límites) en CI en verde | Pruebas suficientes, sin CI | Menos de 4 pruebas o fallan |
| RA3.f | JavaDoc completo con ejemplos y README con la tabla de propiedades, eventos y CSS | Documentación correcta pero escasa | Sin documentación |
| RA3.g | Multimódulo Maven, `module-info` correcto, se importa en Scene Builder sin errores | JAR funcional con algún problema de importación | No se puede reutilizar |
| RA3.h | El gestor de taller usa los componentes en varias pantallas desde FXML y enlazados al ViewModel | Los usa en una pantalla | No los usa |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [Introduction to FXML: Custom components (`fx:root`)](https://openjfx.io/javadoc/25/javafx.fxml/javafx/fxml/doc-files/introduction_to_fxml.html#custom_components)
  - [JavaFX 25 API: `Control`, `SkinBase`, `CssMetaData`](https://openjfx.io/javadoc/25/)
  - [JavaFX CSS Reference Guide](https://openjfx.io/javadoc/25/javafx.graphics/javafx/scene/doc-files/cssref.html)
  - [TestFX](https://github.com/TestFX/TestFX) · [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) · [Scenic View](https://github.com/JonathanGiles/scenic-view) · [Maven: guía de multimódulo](https://maven.apache.org/guides/mini/guide-multiple-modules.html)
- **Herramientas:** Scene Builder, Scenic View, JUnit 5, TestFX, GitHub Actions, Maven.
