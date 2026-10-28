# UD05 · Arrays, cadenas y expresiones regulares

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 16 h ≈ 19 sesiones | RA6 (100 %): CE a, b (inicio) y g |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA6, criterios a), b) y g) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). RA6.b se completa y evalúa en [UD07](../UD07-colecciones-genericos-streams/README.md).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA6.a | Se han escrito programas que utilicen matrices (arrays). | RD 405/2023, anexo I, MP0485, RA6.a | P5 + PR2 |
| RA6.b | Se han reconocido las librerías de clases relacionadas con tipos de datos avanzados. | RD 405/2023, anexo I, MP0485, RA6.b | (Se introduce `java.util.Arrays`; se evalúa en UD07) |
| RA6.g | Se han utilizado expresiones regulares en la búsqueda de patrones en cadenas de texto. | RD 405/2023, anexo I, MP0485, RA6.g | P5 + PR2 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Distinguir estructuras estáticas (tamaño fijo) y dinámicas.
2. Declarar, crear, inicializar y recorrer arrays de una y varias dimensiones, de primitivos y de objetos.
3. Implementar algoritmos clásicos sobre arrays: búsqueda lineal y binaria, máximo/mínimo, inserción, borrado con desplazamiento y ordenación (burbuja, selección).
4. Usar `java.util.Arrays` (`sort`, `binarySearch`, `fill`, `copyOf`, `equals`, `toString`) y comprender el paso de arrays a métodos.
5. Manipular cadenas con `String`, `StringBuilder` y `char[]`.
6. Escribir expresiones regulares y usarlas con `String.matches`, `split`, `replaceAll`, `Pattern` y `Matcher` (grupos, grupos con nombre).

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Aplicación de las estructuras de almacenamiento» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): estructuras estáticas y dinámicas; creación de matrices (arrays); matrices (arrays) multidimensionales; cadenas de caracteres, expresiones regulares.

### 1. Estructuras estáticas y dinámicas

- **Estática:** tamaño fijado al crearla (array). Acceso directo por índice en tiempo constante; insertar o borrar en medio obliga a desplazar elementos.
- **Dinámica:** crece y decrece en ejecución (`ArrayList`, `LinkedList`, `HashMap`… en UD07).
- Elección: array cuando el tamaño es conocido y fijo (días de la semana, tablero), o por rendimiento con primitivos; colección en el resto de casos.

### 2. Arrays unidimensionales

```java
int[] notas = new int[5];                  // {0, 0, 0, 0, 0}
double[] precios = {1.5, 2.25, 3.0};       // inicialización con literal
String[] dias = new String[7];             // {null, …}
Libro[] estanteria = new Libro[10];        // array de referencias

notas[0] = 7;
int n = notas.length;                      // 5 (atributo, no método)
// notas[5] = 3;  → ArrayIndexOutOfBoundsException
```

Recorridos:

```java
for (int i = 0; i < notas.length; i++) {   // con índice: para modificar o usar la posición
    notas[i] = notas[i] + 1;
}
int suma = 0;
for (int nota : notas) {                   // for-each: solo lectura
    suma += nota;
}
double media = (double) suma / notas.length;
```

**Arrays y métodos.** Un array es un objeto: el método recibe una copia de la referencia y **puede modificar su contenido**.

```java
static void duplicar(int[] v) {
    for (int i = 0; i < v.length; i++) v[i] *= 2;
}

static int[] pares(int[] v) {             // devolver un array nuevo
    return Arrays.stream(v).filter(x -> x % 2 == 0).toArray();   // avance de UD07
}
```

**Array parcialmente lleno.** Patrón de «array + contador» que se usa en el proyecto antes de pasar a `ArrayList`:

```java
public class Catalogo {
    private final Libro[] libros = new Libro[100];
    private int total = 0;

    public void anadir(Libro l) {
        if (total == libros.length) throw new IllegalStateException("Catálogo lleno");
        libros[total++] = l;
    }

    public boolean eliminar(String isbn) {
        for (int i = 0; i < total; i++) {
            if (libros[i].getIsbn().equals(isbn)) {
                System.arraycopy(libros, i + 1, libros, i, total - i - 1);   // desplazar a la izquierda
                libros[--total] = null;
                return true;
            }
        }
        return false;
    }
}
```

### 3. Algoritmos sobre arrays

```java
// Búsqueda lineal: O(n)
static int buscar(int[] v, int x) {
    for (int i = 0; i < v.length; i++) if (v[i] == x) return i;
    return -1;
}

// Búsqueda binaria (array ordenado): O(log n)
static int buscarBinaria(int[] v, int x) {
    int ini = 0, fin = v.length - 1;
    while (ini <= fin) {
        int medio = (ini + fin) >>> 1;          // evita desbordamiento
        if (v[medio] == x) return medio;
        if (v[medio] < x) ini = medio + 1; else fin = medio - 1;
    }
    return -1;
}

// Ordenación por selección: O(n²)
static void seleccion(int[] v) {
    for (int i = 0; i < v.length - 1; i++) {
        int min = i;
        for (int j = i + 1; j < v.length; j++) if (v[j] < v[min]) min = j;
        int tmp = v[i]; v[i] = v[min]; v[min] = tmp;
    }
}
```

Se comparan tiempos con `System.nanoTime()` para 10 000 y 100 000 elementos frente a `Arrays.sort` (introducción informal a la complejidad).

### 4. La clase `java.util.Arrays`

```java
int[] v = {5, 3, 9, 1};
Arrays.sort(v);                               // [1, 3, 5, 9]
int pos = Arrays.binarySearch(v, 5);          // 2
int[] copia = Arrays.copyOf(v, 6);            // [1, 3, 5, 9, 0, 0]
int[] trozo = Arrays.copyOfRange(v, 1, 3);    // [3, 5]
Arrays.fill(copia, 4, 6, -1);                 // [1, 3, 5, 9, -1, -1]
System.out.println(Arrays.toString(v));       // "[1, 3, 5, 9]"
boolean iguales = Arrays.equals(v, copia);    // false

String[] titulos = {"Rayuela", "Ensaio sobre a cegueira", "Ana Karenina"};
Arrays.sort(titulos);                                        // orden natural
Arrays.sort(titulos, Comparator.comparing(String::length));  // por longitud (avance de UD07)
```

`v1 == v2` compara referencias; `Arrays.equals` compara contenido; `Arrays.deepToString` y `deepEquals` para arrays multidimensionales.

### 5. Arrays multidimensionales

```java
int[][] tabla = new int[3][4];          // 3 filas, 4 columnas
int[][] m = {
    {1, 2, 3},
    {4, 5, 6}
};
int filas = m.length;                   // 2
int columnas = m[0].length;             // 3

// Recorrido por filas
for (int f = 0; f < m.length; f++) {
    for (int c = 0; c < m[f].length; c++) {
        System.out.printf("%4d", m[f][c]);
    }
    System.out.println();
}

// Arrays irregulares (cada fila con distinta longitud)
int[][] triangulo = new int[4][];
for (int f = 0; f < triangulo.length; f++) triangulo[f] = new int[f + 1];
```

Casos de uso: tablero de juego, horario semanal (`String[5][6]`), ocupación de una sala, matriz de notas (alumnado × módulos) con medias por fila y columna.

### 6. Cadenas de caracteres

Repaso y ampliación de UD02 orientado a algoritmos:

```java
String s = "Anita lava la tina";
String limpio = s.toLowerCase().replace(" ", "");
boolean palindromo = new StringBuilder(limpio).reverse().toString().equals(limpio);   // true

char[] letras = limpio.toCharArray();
Arrays.sort(letras);
String ordenada = new String(letras);

long vocales = s.toLowerCase().chars().filter(ch -> "aeiouáéíóú".indexOf(ch) >= 0).count();

String[] palabras = "uno,dos,,tres".split(",");          // ["uno", "dos", "", "tres"]
String unidas = String.join(" | ", palabras);
int cmp = "abeto".compareTo("árbol");                    // compara por código Unicode
```

- Inmutabilidad y rendimiento: concatenar en un bucle crea muchos objetos → `StringBuilder`.
- Comparar ignorando acentos y mayúsculas para ordenar en español: `java.text.Collator.getInstance(Locale.of("es", "ES"))`.
- `String.format` / `formatted` y *text blocks* (UD01).

### 7. Expresiones regulares

Una expresión regular (*regex*) describe un patrón de texto.

| Elemento | Significado | Ejemplo |
|---|---|---|
| `.` | Cualquier carácter | `c.sa` → casa, cosa |
| `[abc]`, `[a-z]`, `[^0-9]` | Clase de caracteres; negación | `[A-Z]` una mayúscula |
| `\d` `\w` `\s` | Dígito, carácter de palabra, espacio (en Java se escribe `\\d`) | `\\d{5}` código postal |
| `*` `+` `?` `{n}` `{n,m}` | Cuantificadores | `\\d{8}` ocho dígitos |
| `^` `$` | Inicio y fin | `^\\d+$` |
| `(…)` `(?<nombre>…)` | Grupo, grupo con nombre | `(?<anio>\\d{4})` |
| `\|` | Alternativa | `978\|979` |
| `\b` | Límite de palabra | `\\bJava\\b` |

Uso en Java:

```java
// 1. Validar un formato completo
boolean cp = "36201".matches("\\d{5}");
boolean dniFormato = "12345678Z".matches("\\d{8}[A-HJ-NP-TV-Z]");

// 2. Buscar todas las coincidencias
Pattern fecha = Pattern.compile("(?<dia>\\d{2})/(?<mes>\\d{2})/(?<anio>\\d{4})");
Matcher m = fecha.matcher("Préstamo 03/11/2026, devolución 18/11/2026");
while (m.find()) {
    System.out.println(m.group("anio") + "-" + m.group("mes") + "-" + m.group("dia"));
}

// 3. Sustituir y partir
String sinEspacios = "  muchos    espacios  ".strip().replaceAll("\\s+", " ");
String[] campos = "Rosalía;Castro; 1837".split("\\s*;\\s*");

// 4. Opciones: ignorar mayúsculas
Pattern java = Pattern.compile("\\bjava\\b", Pattern.CASE_INSENSITIVE);
```

**Validación completa = formato (regex) + reglas (código).** Ejemplo de DNI/NIE y de ISBN-13:

```java
public final class Validador {
    private static final Pattern DNI_NIE = Pattern.compile("([XYZ]?)(\\d{7,8})([A-Z])");
    private static final String LETRAS = "TRWAGMYFPDXBNJZSQVHLCKE";

    private Validador() { }

    public static boolean esDniNieValido(String doc) {
        Matcher m = DNI_NIE.matcher(doc.strip().toUpperCase());
        if (!m.matches()) return false;
        String prefijo = switch (m.group(1)) {
            case "X" -> "0";
            case "Y" -> "1";
            case "Z" -> "2";
            default -> "";
        };
        String numero = prefijo + m.group(2);
        if (numero.length() != 8) return false;
        int resto = Integer.parseInt(numero) % 23;
        return LETRAS.charAt(resto) == m.group(3).charAt(0);
    }

    public static boolean esIsbn13Valido(String isbn) {
        String digitos = isbn.replaceAll("[\\s-]", "");
        if (!digitos.matches("97[89]\\d{10}")) return false;
        int suma = 0;
        for (int i = 0; i < 12; i++) {
            int d = digitos.charAt(i) - '0';
            suma += (i % 2 == 0) ? d : d * 3;
        }
        int control = (10 - suma % 10) % 10;
        return control == digitos.charAt(12) - '0';
    }
}
```

Herramientas para practicar: [regex101.com](https://regex101.com/) (seleccionar el sabor *Java 8*) y el panel *Check RegExp* de IntelliJ (`Alt+Intro` sobre una regex).

## Actividades

### Actividades de clase (no evaluables)

- **A1. Estadísticas de notas.** Leer N notas, guardarlas en un array y mostrar media, máxima, mínima, aprobados y un histograma con asteriscos.
- **A2. Carrera de algoritmos.** Medir búsqueda lineal frente a binaria y selección frente a `Arrays.sort` con 10⁴ y 10⁵ elementos; tabla de tiempos y conclusión.
- **A3. Sala de cine.** Matriz `boolean[8][12]` de butacas: reservar, liberar, mostrar plano y buscar *n* butacas contiguas libres (sentencia de salto con etiqueta).
- **A4. Palíndromos y anagramas** con `StringBuilder` y `char[]` ordenados.
- **A5. Regex golf.** 10 retos de patrón con tests ya escritos: código postal gallego (`15`, `27`, `32`, `36` + 3 dígitos), matrícula española actual, hora `hh:mm`, correo simplificado, extraer *hashtags* de un texto.
- **A6. Limpieza de datos.** Normalizar un fichero de nombres con espacios, mayúsculas y separadores irregulares usando `replaceAll` y `split`.

### Práctica evaluable

**P5 · Validador y analizador de inscripciones.** Una asociación deportiva recibe inscripciones como líneas de texto `nombre;DNI/NIE;correo;teléfono;fecha_nacimiento;categoría`. El programa debe: validar cada campo con expresiones regulares y reglas (letra del DNI/NIE, fecha real, teléfono español de 9 dígitos que empieza por 6, 7, 8 o 9); guardar las válidas en un array de objetos con contador; ordenar por apellido con un algoritmo implementado a mano y comprobarlo frente a `Arrays.sort`; generar una matriz categoría × franja de edad con el número de inscripciones y mostrarla tabulada; extraer con `Matcher` y grupos con nombre todos los correos de un dominio dado. Tests JUnit de las validaciones (casos válidos e inválidos).

**Conexión con el mundo real:** equivale a la validación y limpieza de datos de entrada de un formulario de alta o de una importación masiva, una tarea habitual antes de guardar datos en cualquier sistema de gestión.

Entregables: repositorio de Classroom con tests en verde en la CI, fichero de datos de prueba con al menos 20 líneas (5 erróneas) y `README.md` con las expresiones regulares explicadas.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA6.a (arrays de objetos) | Array con contador bien encapsulado; inserción y búsqueda correctas sin `NullPointerException`. | Funciona con algún caso límite sin tratar (array lleno). | Errores de índice o de `null`. |
| RA6.a (algoritmo y `Arrays`) | Ordenación propia correcta, comparada con `Arrays.sort`, y uso adecuado de `Arrays`. | Ordenación correcta sin comparación o uso parcial de `Arrays`. | No ordena correctamente. |
| RA6.a (multidimensional) | Matriz correcta, con totales por fila y columna y salida tabulada. | Matriz correcta con salida mejorable. | Matriz incorrecta o ausente. |
| RA6.g (validación) | Regex precisas y legibles (constantes `Pattern`), combinadas con reglas; tests de casos límite. | Regex correctas con algún falso positivo/negativo. | Regex incorrectas o validación sin regex. |
| RA6.g (búsqueda) | Usa `Matcher.find` y grupos con nombre para extraer datos. | Extrae datos con `split` o grupos numéricos. | No extrae patrones. |

### Proyecto integrador · incremento I5

Catálogo del gestor de biblioteca en un array con contador (alta, baja con desplazamiento, búsqueda por ISBN y por título que contiene un texto, ordenación por título con `Collator`). Clase `Validador` con ISBN-13, DNI/NIE y correo, con tests (historia HU04).

## Recursos

- **Documentación oficial:** [dev.java · Arrays](https://dev.java/learn/language-basics/arrays/) · [dev.java · Regular expressions](https://dev.java/learn/regex/) · [Javadoc de `java.util.Arrays`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html) · [Javadoc de `java.util.regex.Pattern`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/regex/Pattern.html) (tabla completa de sintaxis).
- **Herramientas:** regex101, *Check RegExp* de IntelliJ, VisuAlgo (visualización de algoritmos de ordenación).
