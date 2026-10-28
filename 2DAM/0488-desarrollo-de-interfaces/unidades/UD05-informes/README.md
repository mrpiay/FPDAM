# UD05 · Informes con JasperReports

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_12 Interfaces gráficos de usuario | 2.º DAM | 22 h · ≈ 26 sesiones de 50 min (estimación; semanas 17–21) | RA5 (a–h, principal) · RA3.h (refuerzo) |

> Tecnología: JasperReports 7.0.x + Jaspersoft Studio 7 (justificación en [DEC-DI-04](../../decisiones/DEC-DI-04-informes.md)).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.a | Se ha establecido la estructura del informe. | [RD 405/2023, anexo I, 0488, RA5.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: boceto previo y uso correcto de bandas y grupos |
| RA5.b | Se han generado informes básicos a partir de diferentes fuentes de datos mediante asistentes. | [RD 405/2023, anexo I, 0488, RA5.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: informes con el asistente desde JDBC (SQLite) y desde una colección de JavaBeans o CSV |
| RA5.c | Se han establecido filtros sobre los valores a presentar en los informes. | [RD 405/2023, anexo I, 0488, RA5.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: parámetros de fecha y estado en la consulta; expresión de filtro |
| RA5.d | Se han incluido valores calculados, recuentos y totales. | [RD 405/2023, anexo I, 0488, RA5.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: numeración de líneas, subtotales por grupo, total general, IVA |
| RA5.e | Se han incluido gráficos generados a partir de los datos. | [RD 405/2023, anexo I, 0488, RA5.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: gráfico de barras o sectores de la facturación |
| RA5.f | Se han utilizado herramientas para generar el código correspondiente a los informes de una aplicación. | [RD 405/2023, anexo I, 0488, RA5.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: JRXML generado con Jaspersoft Studio |
| RA5.g | Se ha modificado el código correspondiente a los informes. | [RD 405/2023, anexo I, 0488, RA5.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: edición manual del JRXML (pestaña *Source*) y de la clase Java que lo ejecuta; defensa |
| RA5.h | Se ha desarrollado una aplicación que incluye informes incrustados. | [RD 405/2023, anexo I, 0488, RA5.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P5: visor dentro del gestor de taller y exportación a PDF; prueba práctica en aula del 2.º trimestre |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Creación de informes», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Informes incrustados y no incrustados en la aplicación.
- Herramientas gráficas integradas en el IDE y externas al mismo.
- Estructura general. Secciones.
- Filtrado de datos.
- Numeración de líneas, recuentos y totales.
- Gráficos.
- Librerías para generación de informes. Clases, métodos y atributos.
- Conexión con las fuentes de datos. Ejecución de consultas.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Diseñar la estructura de un informe a partir de una necesidad de negocio.
2. Crear informes con el asistente de Jaspersoft Studio desde distintas fuentes de datos.
3. Filtrar con parámetros y expresiones, y añadir variables calculadas, recuentos, grupos y totales.
4. Incluir gráficos y subinformes.
5. Leer y modificar el JRXML y ejecutar los informes desde Java con la API de JasperReports.
6. Incrustar los informes en una aplicación JavaFX con visor propio y exportación.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Informes en una aplicación de gestión

Un **informe** presenta datos con formato orientado a su lectura o impresión: listados, facturas, resúmenes, etiquetas o estadísticas.

| Tipo | Descripción | Ejemplo en el gestor de taller |
|---|---|---|
| **Incrustado** | La plantilla viaja con la aplicación y esta lo genera y muestra | Factura de una orden, listado de órdenes abiertas |
| **No incrustado** | Lo genera otro sistema o se consulta fuera de la aplicación: servidor de informes, herramienta de BI, PDF enviado por correo | Informe mensual de facturación que se envía al gestor, o el mismo JRXML publicado en un servidor de informes |

**Herramientas.** Las hay **integradas en el IDE** (por ejemplo, los *plugins* de diseñador para Eclipse; Jaspersoft Studio también se distribuye como *plugin* de Eclipse) y **externas** (Jaspersoft Studio como aplicación independiente, BIRT Designer, Power BI o Metabase para BI). Hay **librerías** que ejecutan la plantilla (JasperReports) y otras que generan el documento por código (OpenPDF, Apache PDFBox).

### 2. Flujo de JasperReports

```
diseño (Jaspersoft Studio) → plantilla .jrxml (XML)
        → compilación → .jasper (binario)
        → llenado con datos (JDBC, JavaBeans, CSV, JSON…) + parámetros → JasperPrint
        → exportación (PDF, XLSX, HTML, DOCX…) o visualización
```

| Clase (API) | Función |
|---|---|
| `JasperCompileManager` | Compila `.jrxml` → `JasperReport` |
| `JRLoader` | Carga un `.jasper` ya compilado |
| `JasperFillManager` | Rellena la plantilla con datos y parámetros → `JasperPrint` |
| `JasperExportManager` | Exporta a PDF, HTML o XML |
| `JRBeanCollectionDataSource`, `JRCsvDataSource`, `JsonDataSource` | Fuentes de datos que no son JDBC |
| `JasperPrintManager` | Impresión y renderizado de páginas como imagen |

### 3. Estructura y secciones (RA5.a)

Las **bandas** de un informe:

| Banda | Se imprime | Uso típico |
|---|---|---|
| *Title* | Una vez, al principio | Logotipo, título, rango de fechas |
| *Page Header* | En cada página | Cabecera corporativa |
| *Column Header* | En cada página, sobre el detalle | Títulos de columna |
| *Group Header/Footer* | Al cambiar el valor del grupo | Cliente, mes, tipo de trabajo; subtotales |
| *Detail* | Una vez por registro | Línea de la orden |
| *Column Footer* / *Page Footer* | Al final de la columna o de la página | «Página X de Y» |
| *Summary* | Una vez, al final | Totales generales y gráfico |
| *No Data* | Si no hay registros | «No hay órdenes en el periodo seleccionado» |
| *Background* | Detrás de todo | Marca de agua «BORRADOR» |

**Antes de diseñar en la herramienta, se boceta en papel**: qué pregunta responde el informe, quién lo lee, qué agrupaciones y totales necesita y en qué formato sale (A4 vertical o apaisado).

### 4. Fuentes de datos y asistentes (RA5.b)

1. **JDBC con SQLite.** En Jaspersoft Studio se crea un *Data Adapter* de tipo *Database JDBC Connection*: se añade el JAR de `sqlite-jdbc` en *Driver Classpath*, la clase `org.sqlite.JDBC` y la URL `jdbc:sqlite:C:/ruta/gestor-taller.db`.
2. **Colección de JavaBeans.** Es útil cuando los datos ya están en memoria (por ejemplo, el resultado filtrado de la `TableView`). Los campos del informe se llaman como las propiedades del *bean*.
3. **CSV o JSON**, para datos que se importan de otros sistemas.

Con el asistente (*File › New › Jasper Report*) se elige una plantilla, el *Data Adapter*, la consulta, los campos y la agrupación. Genera el JRXML con bandas, campos y grupos ya colocados.

### 5. Expresiones, parámetros y filtros (RA5.c)

Las expresiones son Java (por defecto) y hacen referencia a:

- `$F{campo}`: campo del registro actual.
- `$P{PARAMETRO}`: parámetro que pasa la aplicación.
- `$V{variable}`: variable calculada.
- `$R{clave}`: texto internacionalizado (*resource bundle*).

**Filtrar en la consulta** (opción preferente, porque la base de datos devuelve menos filas):

```sql
SELECT o.id, o.fecha_entrada, o.estado, c.nombre AS cliente, v.matricula,
       SUM(l.horas * l.precio_hora + l.importe_piezas) AS importe
FROM orden o
JOIN vehiculo v ON v.id = o.vehiculo_id
JOIN cliente  c ON c.id = v.cliente_id
JOIN linea_orden l ON l.orden_id = o.id
WHERE o.fecha_entrada BETWEEN $P{DESDE} AND $P{HASTA}
  AND ($P{ESTADO} IS NULL OR o.estado = $P{ESTADO})
GROUP BY o.id
ORDER BY c.nombre, o.fecha_entrada
```

- `$P{X}` dentro de la consulta se convierte en un **parámetro de `PreparedStatement`**, así que es seguro.
- `$P!{X}` **sustituye el texto literalmente**. Solo debe usarse con valores controlados por el programa (por ejemplo, el nombre de la columna por la que ordenar), **nunca con texto del usuario**, porque permite inyección SQL. Esto se comprueba en UD09.

**Filtrar en el informe:** la *Filter Expression* del *dataset* (por ejemplo, `$F{importe}.doubleValue() > 0`) descarta registros después de la consulta. Conviene para fuentes que no son SQL.

### 6. Variables, recuentos, totales y numeración (RA5.d)

| Necesidad | Cómo |
|---|---|
| Numerar líneas | Variable del sistema `$V{REPORT_COUNT}`, o `$V{nombreGrupo_COUNT}` para numerar dentro de cada grupo |
| Recuento de órdenes por cliente | Variable con cálculo *Count* y *Reset type* = grupo «cliente» |
| Subtotal por cliente | Variable con cálculo *Sum* de `$F{importe}` y *Reset type* = grupo |
| Total general | Variable *Sum* con *Reset type* = *Report*, en *Summary* |
| Media | Cálculo *Average* |
| Valor calculado por línea | Campo de texto con la expresión `$F{horas}.multiply($F{precio_hora}).add($F{importe_piezas})` (con `BigDecimal`) |
| IVA y total | `$V{base}.multiply(new java.math.BigDecimal("0.21"))` |
| «Página X de Y» | Dos campos: `"Página " + $V{PAGE_NUMBER}` (*Evaluation time* = *Now*) y `" de " + $V{PAGE_NUMBER}` (*Evaluation time* = *Report*) |

> Para importes conviene usar `BigDecimal` y el patrón de formato `#,##0.00 €`. Con `Double` aparecen errores de redondeo.

### 7. Gráficos y subinformes (RA5.e)

- **Gráfico** (paleta *Chart*): de barras con la facturación por tipo de trabajo o por mes, o de sectores con las órdenes por estado. Se configura el *dataset* del gráfico: serie (`"Facturación"`), categoría (`$F{mes}`) y valor (`$F{importe}`). Se coloca en *Summary* o en *Group Footer*. En la rama 7 los gráficos van en un artefacto aparte (ver el apartado 8).
- **Subinforme:** en la factura, las líneas de la orden van en un subinforme que recibe `$F{id}` como parámetro y la conexión mediante `$P{REPORT_CONNECTION}`.

### 8. Ejecución desde Java (RA5.f, g)

Dependencias (rama 7: la librería está dividida en artefactos). **Hay que comprobar los nombres y versiones exactos en la documentación de la versión usada:**

```xml
<properties><jasper.version>7.0.7</jasper.version></properties>
<dependency>
  <groupId>net.sf.jasperreports</groupId>
  <artifactId>jasperreports</artifactId>
  <version>${jasper.version}</version>
</dependency>
<dependency> <!-- exportación a PDF -->
  <groupId>net.sf.jasperreports</groupId>
  <artifactId>jasperreports-pdf</artifactId>
  <version>${jasper.version}</version>
</dependency>
<dependency> <!-- gráficos -->
  <groupId>net.sf.jasperreports</groupId>
  <artifactId>jasperreports-charts</artifactId>
  <version>${jasper.version}</version>
</dependency>
```

```java
public class InformeService {
    private final Database db;
    public InformeService(Database db) { this.db = db; }

    /** Compila (o carga precompilado) y rellena el informe de órdenes. */
    public JasperPrint ordenes(LocalDate desde, LocalDate hasta, EstadoOrden estado) throws Exception {
        JasperReport plantilla;
        try (InputStream in = getClass().getResourceAsStream("/informes/ordenes.jrxml")) {
            plantilla = JasperCompileManager.compileReport(in);
            // En producción: precompilar a .jasper en la build y usar
            // (JasperReport) JRLoader.loadObject(getClass().getResourceAsStream("/informes/ordenes.jasper"))
        }
        Map<String, Object> p = new HashMap<>();
        p.put("DESDE", desde.toString());                // SQLite guarda fechas ISO como texto
        p.put("HASTA", hasta.toString());
        p.put("ESTADO", estado == null ? null : estado.name());
        p.put("LOGO", getClass().getResource("/img/logo.png"));
        p.put(JRParameter.REPORT_LOCALE, Locale.of("es", "ES"));
        try (Connection c = db.conectar()) {
            return JasperFillManager.fillReport(plantilla, p, c);
        }
    }

    /** Mismo informe a partir de una lista en memoria (otra fuente de datos). */
    public JasperPrint desdeLista(JasperReport plantilla, List<OrdenResumen> datos) throws JRException {
        return JasperFillManager.fillReport(plantilla, new HashMap<>(), new JRBeanCollectionDataSource(datos));
    }

    public void exportarPdf(JasperPrint print, Path destino) throws JRException {
        JasperExportManager.exportReportToPdfFile(print, destino.toString());
    }
}
```

**Modificar el código del informe (RA5.g).** Ejercicios típicos sobre el JRXML, en la pestaña *Source* del Studio o en el editor del IDE:

- Cambiar la consulta para añadir un filtro nuevo.
- Añadir un parámetro con valor por defecto (`defaultValueExpression`).
- Cambiar el patrón de formato de un campo.
- Añadir un estilo condicional: importe en rojo y negrita si es mayor que 1000. Para que no dependa solo del color, se añade además un icono o un texto.

Después de cada cambio manual hay que volver a abrir la plantilla en el Studio para comprobar que sigue siendo válida. Es la misma disciplina que con FXML en la UD01.

> **Cambio de formato entre las ramas 6 y 7.** El JRXML de la rama 7 no es compatible con el de la 6 y hay que convertirlo con Jaspersoft Studio 7. Los ejemplos hechos con la rama 6 se analizan, pero no se cargan tal cual. Comparar una plantilla antigua con su versión convertida es un buen ejercicio de RA5.g.

### 9. Informes incrustados en JavaFX (RA5.h)

El visor clásico de JasperReports es Swing. En JavaFX hay tres opciones:

1. **Visor propio** (recomendado): cada página se renderiza como imagen y se muestra en un `Pagination`. Hace falta `javafx-swing` para `SwingFXUtils`:
   ```java
   public Pagination crearVisor(JasperPrint print) {
       Pagination pag = new Pagination(Math.max(1, print.getPages().size()), 0);
       pag.setPageFactory(i -> {
           try {
               BufferedImage img = (BufferedImage) JasperPrintManager.printPageToImage(print, i, 1.5f);
               ImageView vista = new ImageView(SwingFXUtils.toFXImage(img, null));
               vista.setPreserveRatio(true);
               vista.setAccessibleText("Página " + (i + 1) + " del informe");
               return new ScrollPane(vista);
           } catch (JRException e) {
               return new Label("No se ha podido mostrar la página " + (i + 1));
           }
       });
       return pag;
   }
   ```
2. **`SwingNode`** con el visor Swing de JasperReports (mezcla dos toolkits, así que es menos recomendable).
3. **Exportar a PDF** y abrirlo con el visor del sistema: `getHostServices().showDocument(pdf.toUri().toString())`.

Como el llenado puede tardar, se ejecuta en un `Task` (como en la UD03) y el visor se muestra en `setOnSucceeded`. La pantalla «Informes» del gestor de taller tiene `DatePicker` desde/hasta, `ComboBox` de estado, botón Generar, el visor y botones Exportar PDF e Imprimir.

> **Alternativa.** En .NET: informes RDLC o FastReport con el visor de WinForms/WPF. En web/Electron: jsPDF + AutoTable o pdfmake. En todos los casos los conceptos son los mismos: bandas, grupos, variables, parámetros y exportación.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Del papel a las bandas.** Dada una factura real anonimizada, identificar sus bandas, grupos, variables y parámetros.
- **A2. Asistente con tres fuentes.** El mismo listado de clientes generado desde JDBC, desde un CSV y desde `JRBeanCollectionDataSource`. Comparar qué cambia en el JRXML.
- **A3. Grupos y totales.** Agrupar las órdenes por cliente, con recuento, subtotal y total general, y numerar las líneas dentro del grupo.
- **A4. `$P{}` frente a `$P!{}`.** Demostrar una inyección SQL con `$P!{}` en un entorno de prueba y corregirla.
- **A5. Gráfico.** Facturación mensual en barras y órdenes por estado en sectores.
- **A6. Conversión 6 → 7.** Abrir en Jaspersoft Studio 7 una plantilla JRXML de la rama 6, convertirla y anotar las diferencias de formato.

### Práctica evaluable

**P5 · Informes del gestor de taller (hito H5, `v0.5`).** Se desarrollan tres informes y su integración en la aplicación:

1. **Listado de órdenes** filtrable por fechas y estado, agrupado por cliente, con numeración, recuentos, subtotales y total.
2. **Factura** de una orden con logotipo, datos del cliente, subinforme de líneas, base, IVA y total. Se lanza desde el menú contextual de la orden.
3. **Informe de gestión** con un gráfico de facturación por mes o tipo de trabajo (HU12).

Al menos uno se genera con el asistente desde JDBC y otro desde una colección de JavaBeans. Los tres se muestran **dentro del gestor de taller** con un visor propio, con exportación a PDF e impresión, y se rellenan en segundo plano.

Se trabaja en equipo: cada miembro es responsable de un informe y revisa la PR de otro.

**Conexión con el mundo real:** facturas, listados y cuadros de mando son los entregables que más pide el cliente de una aplicación de gestión. Las facturas, además, tienen requisitos formales (datos fiscales, IVA desglosado). El informe de gestión responde a una historia de usuario del gerente.

Entregables: etiqueta `v0.5`; JRXML y clases en el repositorio; PDF de ejemplo de cada informe; `docs/informes.md` con el boceto, las bandas, los parámetros, las variables y la lista de cambios hechos a mano en el JRXML. Defensa presencial.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA5.a | Boceto previo coherente; bandas y grupos bien usados; *No Data* y paginación resueltas | Estructura correcta con algún detalle | Estructura desordenada o sin grupos |
| RA5.b | Informes con asistente desde JDBC y JavaBeans (o CSV), con *Data Adapter* bien configurado | Una sola fuente | No usa el asistente o no funciona |
| RA5.c | Filtros por parámetros seguros en la consulta y filtro en el informe donde procede | Filtros funcionales con algún uso innecesario de `$P!{}` | Sin filtros, o con inyección posible |
| RA5.d | Numeración, recuentos, subtotales, total, IVA con `BigDecimal` y «Página X de Y» | Faltan uno o dos elementos | Sin cálculos o con resultados incorrectos |
| RA5.e | Gráfico legible y correcto, con título, leyenda y colores con contraste | Gráfico correcto pero poco legible | Sin gráfico |
| RA5.f | JRXML generados con el Studio, versionados y precompilados en la *build* | Generados, compilados en tiempo de ejecución | No usa la herramienta |
| RA5.g | Varias modificaciones manuales del JRXML justificadas, documentadas y válidas en el Studio | Una modificación | Ninguna, o rompe la plantilla |
| RA5.h | Visor integrado, exportación e impresión, generación en segundo plano y mensajes claros | Exporta a PDF y lo abre fuera | No integra informes |


## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [JasperReports Library (repositorio, notas de versión y documentación)](https://github.com/Jaspersoft/jasperreports)
  - [Jaspersoft Community (descarga del Studio)](https://www.jaspersoft.com/products/jaspersoft-community)
  - [JavaFX `Pagination`](https://openjfx.io/javadoc/25/javafx.controls/javafx/scene/control/Pagination.html) y [`SwingFXUtils`](https://openjfx.io/javadoc/25/javafx.swing/javafx/embed/swing/SwingFXUtils.html)
- **Herramientas:** Jaspersoft Studio 7, DB Browser for SQLite, `sqlite-jdbc`.
