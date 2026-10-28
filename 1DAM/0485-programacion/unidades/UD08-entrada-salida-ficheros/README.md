# UD08 · Entrada/salida, ficheros y documentos JSON/XML

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 22 h ≈ 26 sesiones | RA5 a–e (55 %), RA6 h–i (40 %), refuerzo de RA3.d y RA6.j (5 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA5 criterios a)–e) y RA6 criterios h) e i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.a | Se ha utilizado la consola para realizar operaciones de entrada y salida de información. | RD 405/2023, anexo I, MP0485, RA5.a | P8 + PR3 |
| RA5.b | Se han aplicado formatos en la visualización de la información. | RD 405/2023, anexo I, MP0485, RA5.b | P8 (informes) + PR3 |
| RA5.c | Se han reconocido las posibilidades de entrada / salida del lenguaje y las librerías asociadas. | RD 405/2023, anexo I, MP0485, RA5.c | Cuestionario en aula + PR3 |
| RA5.d | Se han utilizado ficheros para almacenar y recuperar información. | RD 405/2023, anexo I, MP0485, RA5.d | P8 + PR3 + PI-2 |
| RA5.e | Se han creado programas que utilicen diversos métodos de acceso al contenido de los ficheros. | RD 405/2023, anexo I, MP0485, RA5.e | P8 (secuencial y aleatorio) + PR3 |
| RA6.h | Se han identificado las clases relacionadas con el tratamiento de documentos escritos en diferentes lenguajes de intercambio de datos. | RD 405/2023, anexo I, MP0485, RA6.h | Cuestionario + P8 |
| RA6.i | Se han realizado programas que realicen manipulaciones sobre documentos escritos en diferentes lenguajes de intercambio de datos. | RD 405/2023, anexo I, MP0485, RA6.i | P8 + PR3 + PI-2 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Explicar el concepto de flujo (*stream* de E/S) y distinguir flujos de bytes y de caracteres, y las clases de `java.io` y `java.nio.file`.
2. Leer de teclado y escribir en consola con formato (`printf`, `String.format`, `NumberFormat`, `DateTimeFormatter`), incluido el `Locale`.
3. Gestionar el sistema de ficheros: rutas, existencia, creación y borrado de ficheros y directorios, listado y recorrido.
4. Leer y escribir ficheros de texto (CSV) y binarios, con codificación explícita y cierre seguro.
5. Distinguir acceso secuencial y aleatorio (`RandomAccessFile`) y trabajar con registros de longitud fija; serializar objetos.
6. Leer, modificar y generar documentos JSON (Jackson) y XML (DOM).

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)), bloque «Lectura y escritura de información»: flujos, tipos: bytes y caracteres, clases relacionadas; ficheros de datos, registros; apertura y cierre de ficheros, modos de acceso, escritura y lectura de información en ficheros; utilización de los sistemas de ficheros; creación y eliminación de ficheros y directorios; entrada desde teclado, salida a pantalla, formatos de visualización. Y del bloque «Aplicación de las estructuras de almacenamiento» lo relativo a documentos en lenguajes de intercambio (RA6.h e i). Las interfaces gráficas y eventos del mismo bloque se tratan en [UD09](../UD09-interfaces-graficas-javafx/README.md).

### 1. Posibilidades de E/S en Java

| Paquete / clase | Uso |
|---|---|
| `System.in`, `System.out`, `System.err` | Flujos estándar de la consola |
| `java.util.Scanner`, `java.lang.IO` (Java 25), `BufferedReader` | Lectura de teclado |
| `java.io`: `InputStream`/`OutputStream` (bytes), `Reader`/`Writer` (caracteres) | Flujos clásicos, decoradores (`Buffered…`, `Data…`, `Object…`) |
| `java.io.RandomAccessFile` | Acceso aleatorio por posición |
| `java.nio.file`: `Path`, `Files`, `FileSystems` | API moderna: rutas, operaciones sobre el sistema de ficheros, lectura y escritura en una línea |
| `java.text`, `java.time.format` | Formatos de números y fechas |
| Jackson, `javax.xml.parsers` (DOM), `javax.xml.transform` | Documentos JSON y XML |

**Flujo** (*stream* de E/S, no confundir con los *streams* de UD07): secuencia de datos entre el programa y un origen o destino. **Bytes** (8 bits; imágenes, binarios) frente a **caracteres** (texto; requieren una **codificación**, siempre `UTF-8` de forma explícita). Patrón **decorador**: se envuelven flujos para añadir funciones (`new BufferedReader(new InputStreamReader(in, UTF_8))`).

### 2. Consola: entrada y formatos de visualización

```java
System.out.printf("%-30s %6s %10s%n", "Título", "Año", "Precio");
System.out.printf("%-30.30s %6d %10.2f €%n", "Cien años de soledad", 1967, 18.9);
System.out.printf(Locale.US, "%.2f%n", 18.9);            // 18.90 (punto decimal)
System.out.printf("%,d%n", 1234567);                      // 1.234.567 en es-ES
System.out.printf("%05d|%x|%e|%b%n", 42, 255, 12345.678, true);

NumberFormat euros = NumberFormat.getCurrencyInstance(Locale.of("es", "ES"));
System.out.println(euros.format(1234.5));                 // 1.234,50 €
var f = DateTimeFormatter.ofPattern("EEEE d 'de' MMMM 'de' yyyy", Locale.of("es", "ES"));
System.out.println(LocalDate.of(2026, 11, 3).format(f));  // martes 3 de noviembre de 2026
```

| Especificador | Tipo | Modificadores |
|---|---|---|
| `%d` | entero | `%5d` ancho, `%-5d` izquierda, `%05d` ceros, `%,d` separador de miles |
| `%f` `%e` | decimal | `%.2f` decimales |
| `%s` | texto (llama a `toString`) | `%-20s`, `%.10s` recorta |
| `%c` `%b` `%x` `%n` | carácter, booleano, hexadecimal, salto de línea | |

Lectura: `Scanner` (UD02), `IO.readln` (Java 25) o `BufferedReader` sobre `System.in`. Mensajes de error por `System.err`.

### 3. Sistema de ficheros con `java.nio.file`

```java
Path datos = Path.of("datos");                          // relativa al directorio de trabajo
Path csv = datos.resolve("libros.csv");                 // datos/libros.csv
System.out.println(csv.toAbsolutePath());
System.out.println(csv.getFileName() + " en " + csv.getParent());

Files.createDirectories(datos);                         // crea toda la ruta si no existe
if (Files.notExists(csv)) Files.createFile(csv);
boolean esDir = Files.isDirectory(datos);
long bytes = Files.size(csv);

Files.copy(csv, datos.resolve("libros.bak"), StandardCopyOption.REPLACE_EXISTING);
Files.move(datos.resolve("libros.bak"), datos.resolve("copias/libros.bak"));   // falla si no existe "copias"
Files.deleteIfExists(datos.resolve("temporal.txt"));

try (Stream<Path> contenido = Files.list(datos)) {      // listar un directorio
    contenido.filter(p -> p.toString().endsWith(".csv")).forEach(System.out::println);
}
try (Stream<Path> todo = Files.walk(datos)) {           // recorrer recursivamente
    long total = todo.filter(Files::isRegularFile).count();
}
```

`java.io.File` es la API antigua (aún en mucho código existente): `exists()`, `mkdirs()`, `listFiles()`, `delete()`; se convierte con `file.toPath()` / `path.toFile()`.

### 4. Ficheros de texto

```java
// Lectura completa (ficheros pequeños)
List<String> lineas = Files.readAllLines(csv, StandardCharsets.UTF_8);
String todo = Files.readString(csv);                     // UTF-8 por defecto

// Lectura secuencial línea a línea (ficheros grandes)
try (BufferedReader in = Files.newBufferedReader(csv)) {
    String linea;
    while ((linea = in.readLine()) != null) {
        procesar(linea);
    }
}

// Con streams de líneas
try (Stream<String> s = Files.lines(csv)) {
    List<Libro> libros = s.skip(1)                       // cabecera
                          .map(Libro::desdeCsv)
                          .toList();
}

// Escritura: crear/sobrescribir o añadir (modos de apertura)
Files.writeString(csv, "isbn;titulo;autor;anio\n");
Files.write(csv, List.of("9788437604947;Cien años de soledad;G. García Márquez;1967"),
        StandardOpenOption.APPEND);

try (PrintWriter out = new PrintWriter(Files.newBufferedWriter(csv))) {
    out.println("isbn;titulo;autor;anio");
    for (Libro l : catalogo) out.printf("%s;%s;%s;%d%n", l.isbn(), l.titulo(), l.autor(), l.anio());
}
```

```java
public record Libro(String isbn, String titulo, String autor, int anio) {
    public static Libro desdeCsv(String linea) {
        String[] c = linea.split(";", -1);
        if (c.length != 4) throw new IllegalArgumentException("Línea mal formada: " + linea);
        return new Libro(c[0], c[1], c[2], Integer.parseInt(c[3].strip()));
    }
}
```

Modos de apertura (`StandardOpenOption`): `CREATE`, `CREATE_NEW`, `APPEND`, `TRUNCATE_EXISTING`, `READ`, `WRITE`. Excepciones: `NoSuchFileException`, `AccessDeniedException`, `IOException` en general; siempre *try-with-resources*. Un CSV real con comillas y separadores dentro de los campos requiere una librería (Apache Commons CSV); se menciona.

### 5. Ficheros binarios, registros y acceso aleatorio

**Binario secuencial con `DataOutputStream`/`DataInputStream`:**

```java
try (var out = new DataOutputStream(new BufferedOutputStream(Files.newOutputStream(Path.of("notas.dat"))))) {
    out.writeInt(3);
    out.writeUTF("Ana");  out.writeDouble(8.5);
    out.writeUTF("Brais"); out.writeDouble(6.25);
    out.writeUTF("Uxía");  out.writeDouble(9.0);
}
try (var in = new DataInputStream(new BufferedInputStream(Files.newInputStream(Path.of("notas.dat"))))) {
    int n = in.readInt();
    for (int i = 0; i < n; i++) System.out.println(in.readUTF() + ": " + in.readDouble());
}
```

**Acceso aleatorio con registros de longitud fija.** Cada registro ocupa siempre los mismos bytes, así que la posición del registro *i* es `i × TAM`:

```java
public class FicheroSocios implements AutoCloseable {
    private static final int LONG_NOMBRE = 30;                       // caracteres
    private static final int TAM = Integer.BYTES + LONG_NOMBRE * Character.BYTES + Double.BYTES;  // 72 bytes
    private final RandomAccessFile raf;

    public FicheroSocios(Path ruta) throws IOException {
        raf = new RandomAccessFile(ruta.toFile(), "rw");             // modos: "r", "rw"
    }

    public void escribir(int pos, int numero, String nombre, double multa) throws IOException {
        raf.seek((long) pos * TAM);
        raf.writeInt(numero);
        StringBuilder sb = new StringBuilder(nombre);
        sb.setLength(LONG_NOMBRE);                                   // rellena con '\0' o recorta
        raf.writeChars(sb.toString());
        raf.writeDouble(multa);
    }

    public String leer(int pos) throws IOException {
        raf.seek((long) pos * TAM);
        int numero = raf.readInt();
        char[] nombre = new char[LONG_NOMBRE];
        for (int i = 0; i < LONG_NOMBRE; i++) nombre[i] = raf.readChar();
        double multa = raf.readDouble();
        return "%d %s %.2f".formatted(numero, new String(nombre).strip().replace("\0", ""), multa);
    }

    public long numRegistros() throws IOException { return raf.length() / TAM; }

    @Override public void close() throws IOException { raf.close(); }
}
```

**Serialización de objetos** (`ObjectOutputStream`/`ObjectInputStream`, clases que implementan `Serializable`): cómoda pero frágil entre versiones y con riesgos de seguridad al deserializar datos no confiables; se presenta y se compara con JSON, que es la opción recomendada para intercambiar datos.

| Método de acceso | Cuándo | Clases |
|---|---|---|
| Secuencial de texto | Datos legibles, intercambio (CSV) | `Files`, `BufferedReader/Writer` |
| Secuencial binario | Datos compactos, tipos primitivos | `DataInput/OutputStream` |
| Aleatorio (directo) | Leer o modificar el registro *n* sin recorrer el fichero | `RandomAccessFile`, `FileChannel` |
| Objetos | Guardar el estado de objetos Java | `ObjectInput/OutputStream` |

### 6. Documentos JSON con Jackson

Dependencias (`pom.xml`):

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.20.0</version>
</dependency>
<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jsr310</artifactId>
  <version>2.20.0</version>
</dependency>
```

**Enlace de datos (*data binding*)**: objetos Java ↔ JSON. Jackson admite *records*.

```java
public record Prestamo(String isbn, int socio, LocalDate inicio, LocalDate limite) { }

ObjectMapper mapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)     // fechas como "2026-11-03"
        .enable(SerializationFeature.INDENT_OUTPUT);

List<Prestamo> prestamos = List.of(new Prestamo("9788437604947", 7,
        LocalDate.of(2026, 11, 3), LocalDate.of(2026, 11, 18)));

mapper.writeValue(Path.of("prestamos.json").toFile(), prestamos);

List<Prestamo> leidos = mapper.readValue(Path.of("prestamos.json").toFile(),
        new TypeReference<List<Prestamo>>() { });
```

```json
[ {
  "isbn" : "9788437604947",
  "socio" : 7,
  "inicio" : "2026-11-03",
  "limite" : "2026-11-18"
} ]
```

**Modelo de árbol** (`JsonNode`): para leer documentos de estructura desconocida o modificar partes.

```java
JsonNode raiz = mapper.readTree(Path.of("catalogo-asociacion.json").toFile());
for (JsonNode libro : raiz.path("libros")) {
    String titulo = libro.path("titulo").asText();
    int anio = libro.path("anio").asInt(0);
    if (anio < 1900) ((ObjectNode) libro).put("clasico", true);   // modificación
}
mapper.writeValue(Path.of("catalogo-marcado.json").toFile(), raiz);
```

Anotaciones útiles: `@JsonProperty("nombre_json")`, `@JsonIgnore`, `@JsonIgnoreProperties(ignoreUnknown = true)`.

### 7. Documentos XML con DOM

XML: elementos, atributos, texto, raíz única, bien formado frente a válido (DTD/XSD, se menciona). **DOM** carga el documento como árbol de nodos en memoria (adecuado para documentos medianos); **SAX/StAX** lo procesan como flujo de eventos (documentos grandes); **JAXB** enlaza XML ↔ objetos (dependencia externa).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalogo>
  <libro isbn="9788437604947">
    <titulo>Cien años de soledad</titulo>
    <anio>1967</anio>
  </libro>
</catalogo>
```

```java
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.*;

// Escribir
Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
Element raiz = doc.createElement("catalogo");
doc.appendChild(raiz);
for (Libro l : catalogo) {
    Element e = doc.createElement("libro");
    e.setAttribute("isbn", l.isbn());
    Element t = doc.createElement("titulo");
    t.setTextContent(l.titulo());
    e.appendChild(t);
    Element a = doc.createElement("anio");
    a.setTextContent(String.valueOf(l.anio()));
    e.appendChild(a);
    raiz.appendChild(e);
}
Transformer tr = TransformerFactory.newInstance().newTransformer();
tr.setOutputProperty(OutputKeys.INDENT, "yes");
tr.transform(new DOMSource(doc), new StreamResult(Path.of("catalogo.xml").toFile()));

// Leer
Document leido = DocumentBuilderFactory.newInstance().newDocumentBuilder()
        .parse(Path.of("catalogo.xml").toFile());
NodeList libros = leido.getElementsByTagName("libro");
for (int i = 0; i < libros.getLength(); i++) {
    Element e = (Element) libros.item(i);
    String isbn = e.getAttribute("isbn");
    String titulo = e.getElementsByTagName("titulo").item(0).getTextContent();
    System.out.println(isbn + " → " + titulo);
}
```

Seguridad: al procesar XML de terceros, desactivar entidades externas (`factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)`) para evitar ataques XXE; se comenta brevemente.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Ticket de compra.** Imprimir un ticket alineado con `printf`, importes con `NumberFormat` en euros y fecha en castellano.
- **A2. Explorador de carpetas.** Programa que recibe una ruta y muestra un árbol de directorios con tamaños, el fichero más grande y el número de ficheros por extensión (`Files.walk` + *streams*).
- **A3. Agenda en CSV.** Alta, listado y borrado de contactos con persistencia en CSV; gestionar líneas mal formadas sin detener la carga.
- **A4. Secuencial frente a aleatorio.** Con 100 000 registros de longitud fija, medir el tiempo de leer el registro 99 999 de forma secuencial y con `seek`.
- **A5. JSON de datos abiertos.** Leer con `JsonNode` un JSON de ejemplo con estructura de datos abiertos (p. ej. paradas de autobús descargadas por el docente) y calcular estadísticas.
- **A6. Conversor CSV → XML → JSON** con verificación de ida y vuelta.

### Práctica evaluable

**P8 · Sistema de registro de una estación meteorológica.** Una estación genera lecturas (fecha-hora, temperatura, humedad, presión). El programa: (1) importa lecturas desde CSV, descartando y registrando en un fichero de errores las líneas inválidas; (2) mantiene un histórico binario de registros de longitud fija con acceso aleatorio para consultar o corregir la lectura *n*; (3) organiza ficheros por año y mes en directorios que crea y limpia (borrar meses anteriores a una fecha); (4) exporta un resumen diario a JSON con Jackson y lo vuelve a importar; (5) exporta la configuración de sensores a XML con DOM y la lee al arrancar; (6) muestra por consola un informe tabulado con formatos regionales. Tests JUnit con ficheros temporales (`@TempDir`).

**Conexión con el mundo real:** equivale a un proceso de **integración de datos** (ETL sencillo): importar datos de un dispositivo o proveedor, validarlos, almacenarlos de forma eficiente y exportarlos en formatos estándar para otros sistemas, como hacen las aplicaciones de IoT y los servicios de datos abiertos.

Entregables: repositorio con PR revisada por el docente, CI en verde, ficheros de ejemplo en `src/test/resources` y `README.md` con el formato de cada fichero.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA5.a / RA5.b | Interacción por consola clara; informe tabulado con `printf`, `NumberFormat` y `DateTimeFormatter` con `Locale`. | Salida correcta con formato mejorable. | Salida sin formato o ilegible. |
| RA5.c | El README justifica la API usada en cada caso (texto/binario, `java.io`/`java.nio`, Jackson/DOM). | Elecciones correctas sin justificar. | Elecciones inadecuadas. |
| RA5.d | Guarda y recupera todos los datos sin pérdidas; codificación explícita; *try-with-resources*; gestión de directorios correcta. | Funciona con algún recurso sin cerrar o caso no tratado. | Pierde datos o no funciona. |
| RA5.e | Combina acceso secuencial (texto y binario) y aleatorio con registros de longitud fija correctamente calculados. | Solo un tipo de acceso bien resuelto. | Accesos incorrectos. |
| RA6.h | Identifica en el README las clases de Jackson (`ObjectMapper`, `JsonNode`) y de DOM (`Document`, `Element`, `Transformer`) y su papel. | Identificación parcial. | No identifica las clases. |
| RA6.i | JSON y XML se generan, leen y modifican correctamente; prueba de ida y vuelta en los tests. | Uno de los dos formatos completo y el otro parcial. | No manipula documentos de intercambio. |

### Proyecto integrador · incremento I8 (hito PI-2, versión v0.2)

Persistencia del gestor de biblioteca en CSV con `java.nio.file` (carga al arrancar, guardado al salir), exportación e importación del catálogo en JSON y XML, e informes de consola con formato (historia HU07). Publicar la *release* v0.2 en el *Sprint 2*.

## Recursos

- **Documentación oficial:** [dev.java · Java I/O API](https://dev.java/learn/java-io/) · [Javadoc de `java.nio.file.Files`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/file/Files.html) · [Javadoc de `java.util.Formatter`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Formatter.html) (sintaxis de formato) · [Jackson Databind](https://github.com/FasterXML/jackson-databind) · [Módulo `java.xml` (Java SE 25)](https://docs.oracle.com/en/java/javase/25/docs/api/java.xml/module-summary.html) · [OWASP: XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html).
- **Herramientas:** visor hexadecimal (plugin *BinEd* de IntelliJ) para ver ficheros binarios, validador JSON/XML del IDE.
