# UD02 · Utilización de objetos y clases predefinidas

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 16 h ≈ 19 sesiones | RA2 (90 %), refuerzo de RA1 y RA5.a/b (10 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA2, criterios a)–i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.a | Se han identificado los fundamentos de la programación orientada a objetos. | RD 405/2023, anexo I, MP0485, RA2.a | Cuestionario en aula + PR1 |
| RA2.b | Se han escrito programas simples. | RD 405/2023, anexo I, MP0485, RA2.b | P2 + katas |
| RA2.c | Se han instanciado objetos a partir de clases predefinidas. | RD 405/2023, anexo I, MP0485, RA2.c | P2 + PR1 |
| RA2.d | Se han utilizado métodos y propiedades de los objetos. | RD 405/2023, anexo I, MP0485, RA2.d | P2 + PR1 |
| RA2.e | Se han escrito llamadas a métodos estáticos. | RD 405/2023, anexo I, MP0485, RA2.e | P2 + PR1 |
| RA2.f | Se han utilizado parámetros en la llamada a métodos. | RD 405/2023, anexo I, MP0485, RA2.f | P2 |
| RA2.g | Se han incorporado y utilizado librerías de objetos. | RD 405/2023, anexo I, MP0485, RA2.g | P2 (dependencia Maven) |
| RA2.h | Se han utilizado constructores. | RD 405/2023, anexo I, MP0485, RA2.h | P2 + PR1 |
| RA2.i | Se ha utilizado el entorno integrado de desarrollo en la creación y compilación de programas simples. | RD 405/2023, anexo I, MP0485, RA2.i | Observación + P2 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Explicar con sus palabras qué son clase, objeto, estado, comportamiento, identidad, encapsulación, herencia y polimorfismo.
2. Crear objetos de clases del JDK con `new` y con métodos de fábrica, y distinguir referencia y objeto.
3. Invocar métodos de instancia y estáticos pasando parámetros, y usar propiedades públicas y constantes de clase.
4. Leer la documentación Javadoc de una clase de la API para descubrir constructores y métodos.
5. Usar `String`, `StringBuilder`, `Math`, `Random`, `Scanner`, las clases envolventes, `LocalDate`/`Period` y `BigDecimal`.
6. Añadir una librería externa con Maven y usarla.
7. Explicar cómo libera la JVM la memoria de los objetos que ya no se usan.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Utilización de objetos» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): características de los objetos; instanciación de objetos; utilización de métodos, parámetros; utilización de propiedades; utilización de métodos estáticos; constructores; destrucción de objetos y liberación de memoria.

### 1. Fundamentos de la programación orientada a objetos

- **Clase:** plantilla que define atributos (estado) y métodos (comportamiento). **Objeto:** instancia concreta de una clase, con su propio estado y una **identidad** (su posición en memoria).
- **Encapsulación:** el objeto oculta su estado y lo expone mediante métodos. **Abstracción:** se modela solo lo relevante. **Herencia:** una clase se define a partir de otra (UD06). **Polimorfismo:** un mismo mensaje provoca comportamientos distintos según el objeto (UD06).
- **Mensaje:** llamada a un método de un objeto: `objeto.metodo(argumentos)`.

Ejemplo del mundo real para la pizarra: la clase `Libro` (título, autor, ISBN; prestar, devolver) y los objetos «El Quijote, ejemplar 1» y «El Quijote, ejemplar 2»: mismo estado inicial, identidades distintas.

### 2. Instanciación: referencias y objetos

```java
String saludo = new String("hola");    // constructor (no recomendado para String)
String otro = "hola";                  // literal: forma habitual
StringBuilder sb = new StringBuilder(); // constructor sin parámetros
StringBuilder sb2 = new StringBuilder("Gestor de biblioteca"); // constructor con parámetro
LocalDate hoy = LocalDate.now();       // método de fábrica estático
LocalDate fecha = LocalDate.of(2026, 9, 15);
List<String> autores = List.of("Cervantes", "Pardo Bazán"); // fábrica
```

- La variable guarda una **referencia**; `new` reserva memoria en el *heap* y ejecuta un **constructor**.
- `null` indica «no referencia a ningún objeto»; invocar un método sobre `null` lanza `NullPointerException`.
- **Igualdad:** `==` compara referencias; `equals` compara contenido.
  ```java
  String a = "dam";
  String b = new String("dam");
  System.out.println(a == b);       // false: objetos distintos
  System.out.println(a.equals(b));  // true: mismo contenido
  ```
- **Clases inmutables** (`String`, `LocalDate`, `BigDecimal`, envolventes): sus métodos devuelven objetos nuevos; hay que recoger el resultado.
  ```java
  String t = "  el quijote ";
  t.strip();               // no cambia t
  t = t.strip().toUpperCase();   // "EL QUIJOTE"
  ```

### 3. Métodos, parámetros y valor de retorno

- Firma: nombre + tipos de los parámetros. La documentación muestra el tipo de retorno, por ejemplo `String substring(int beginIndex, int endIndex)`.
- **Sobrecarga:** mismo nombre, distintos parámetros: `Math.abs(int)`, `Math.abs(double)`; `String.valueOf(int)`, `String.valueOf(char[])`.
- **Paso de parámetros por valor:** Java copia el valor del argumento; si es una referencia, se copia la referencia (el método puede modificar el objeto, pero no hacer que la variable original apunte a otro).
- **Encadenamiento** de llamadas sobre objetos devueltos:
  ```java
  String isbn = " 978-84-376-0494-7 ".strip().replace("-", "");  // "9788437604947"
  int longitud = isbn.length();                                  // 13
  ```

Métodos de `String` más usados: `length`, `charAt`, `substring`, `indexOf`, `contains`, `startsWith`, `equalsIgnoreCase`, `compareTo`, `toUpperCase`, `strip`, `isBlank`, `replace`, `split`, `repeat`, `formatted`, `chars`. Para construir texto en bucles: `StringBuilder` (`append`, `insert`, `reverse`, `toString`).

### 4. Propiedades (atributos) de los objetos y de las clases

Las clases bien diseñadas ocultan sus atributos, pero algunas del JDK exponen **propiedades públicas** o **constantes**:

```java
import java.awt.Point;

Point p = new Point(2, 3);
p.x = 10;                         // atributo público de instancia
System.out.println(p);            // java.awt.Point[x=10,y=3]

double area = Math.PI * 2 * 2;    // constante de clase
int max = Integer.MAX_VALUE;      // constante de clase
int[] notas = {7, 9, 5};
int n = notas.length;             // longitud de un array
```

En la mayoría de clases, el estado se consulta con métodos de acceso: `fecha.getYear()`, `lista.size()`, `sb.length()`.

### 5. Métodos estáticos

Pertenecen a la clase, no a un objeto: se invocan con `NombreClase.metodo(...)`.

```java
double raiz = Math.sqrt(2);
long r = Math.round(4.5);                  // 5
int limitado = Math.clamp(150, 0, 100);    // 100 (Java 21+)
int n = Integer.parseInt("125");
String s = String.valueOf(3.5);
boolean digito = Character.isDigit('7');
LocalDate d = LocalDate.parse("2026-11-03");
```

Importación estática para abreviar (con moderación): `import static java.lang.Math.*;` → `sqrt(2)`.

### 6. Constructores

Inicializan el objeto. Una clase puede tener varios (sobrecarga). Se consultan en la sección *Constructor Summary* del Javadoc.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

Random azar = new Random();            // semilla aleatoria
Random fija = new Random(42);          // reproducible: útil en tests
int dado = fija.nextInt(1, 7);         // 1..6

BigDecimal precio = new BigDecimal("0.10");   // ¡con String, no con double!
BigDecimal total = precio.multiply(BigDecimal.valueOf(3))
                         .setScale(2, RoundingMode.HALF_UP);   // 0.30 exactos
```

### 7. Clases envolventes y *autoboxing*

Cada primitivo tiene su clase: `Integer`, `Double`, `Character`, `Boolean`, `Long`… Se necesitan en colecciones (UD07) y aportan métodos útiles.

```java
Integer edad = 18;             // autoboxing int → Integer
int e = edad;                  // unboxing
Integer x = 127, y = 127;      // x == y es true por caché, pero con 128 no: ¡usar equals!
int binario = Integer.parseInt("1010", 2);   // 10
String hex = Integer.toHexString(255);       // "ff"
```

### 8. Entrada por teclado con `Scanner` y salida con formato básico

```java
import java.util.Scanner;

public class Edad {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);
        System.out.print("Nombre: ");
        String nombre = teclado.nextLine();
        System.out.print("Año de nacimiento: ");
        int anio = teclado.nextInt();
        teclado.nextLine();            // consume el salto de línea pendiente
        int edad = java.time.Year.now().getValue() - anio;
        System.out.printf("%s tiene (o cumplirá) %d años%n", nombre, edad);
    }
}
```

> Error típico: tras `nextInt()` queda el `\n` en el búfer y el siguiente `nextLine()` devuelve cadena vacía. Alternativa robusta: leer siempre con `nextLine()` y convertir con `Integer.parseInt`.

Formato: `%d` enteros, `%.2f` decimales (usa el `Locale` del sistema: en España imprime coma decimal), `%s` texto, `%10s` ancho, `%-10s` alineado a la izquierda, `%n` salto de línea. Se profundiza en UD08.

### 9. Fechas con `java.time`

```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

LocalDate prestamo = LocalDate.of(2026, 10, 1);
LocalDate devolucion = prestamo.plusDays(15);
long dias = ChronoUnit.DAYS.between(prestamo, LocalDate.now());
Period p = Period.between(LocalDate.of(2007, 5, 20), LocalDate.now());
DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy");
System.out.println(devolucion.format(f));               // 16/10/2026
System.out.println(devolucion.getDayOfWeek());           // FRIDAY
boolean finde = devolucion.getDayOfWeek().getValue() >= 6;
```

`Date` y `Calendar` son heredadas; no se usan en código nuevo.

### 10. Librerías de objetos

- **Paquetes del JDK:** `java.lang` (se importa solo), `java.util`, `java.time`, `java.math`, `java.nio.file`… `import java.util.Scanner;` o `import java.util.*;`.
- **Java 25:** `import module java.base;` importa de golpe todos los paquetes del módulo (JEP 511). Útil en ejemplos; en proyectos se prefieren importaciones explícitas.
- **Librerías externas con Maven** (*Maven Central*): se declaran en el `pom.xml` y el IDE las descarga.
  ```xml
  <dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.18.0</version>
  </dependency>
  ```
  ```java
  import org.apache.commons.lang3.StringUtils;

  String t = StringUtils.capitalize("quijote");       // "Quijote"
  String a = StringUtils.abbreviate("Cien años de soledad", 12);  // "Cien años..."
  ```

### 11. Destrucción de objetos y liberación de memoria

- Java no tiene destructores: el **recolector de basura** (*garbage collector*, GC) libera los objetos que ya no son alcanzables desde ninguna referencia viva.
- Un objeto deja de ser alcanzable cuando sus referencias salen de ámbito o se reasignan (`ref = null`).
- `System.gc()` solo *sugiere* una recolección; no se usa en código normal. `finalize()` está obsoleto.
- Lo que el GC **no** libera son recursos externos (ficheros, conexiones, `Scanner` sobre un fichero): se cierran con `close()` o, mejor, con *try-with-resources* (UD03, UD08).
  ```java
  try (Scanner sc = new Scanner(Path.of("datos.txt"))) {
      // se cierra automáticamente al salir del bloque
  }
  ```
- Demostración en clase: VisualVM o la pestaña *Profiler* de IntelliJ con un bucle que crea muchos `StringBuilder`.

### 12. El IDE para crear y compilar

Compilar y ejecutar a mano, para entender qué hace el IDE:

```bash
javac -d out src/main/java/es/dam/ud02/Edad.java
java -cp out es.dam.ud02.Edad
```

En IntelliJ: *Build → Build Project* (`Ctrl+F9`), la ventana *Problems* muestra errores de compilación; `Ctrl+Q` muestra el Javadoc de la clase o método bajo el cursor; `Ctrl+P` los parámetros esperados.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Explora la API.** Cada pareja recibe una clase (`String`, `StringBuilder`, `Math`, `Character`, `LocalDate`, `Random`) y prepara en 15 minutos una ficha: 2 constructores o fábricas, 5 métodos con ejemplo y 1 trampa típica. Puesta en común.
- **A2. ¿Mismo objeto o mismo contenido?** Predecir la salida de 10 comparaciones con `==` y `equals` sobre `String`, `Integer` y `LocalDate`, y comprobarlo con el depurador mirando el identificador de cada objeto.
- **A3. Calculadora de fechas.** Leer una fecha `dd/MM/yyyy` y mostrar el día de la semana, los días que faltan hasta fin de curso y si es fin de semana.
- **A4. Contraseñas aleatorias.** Con `Random` y `StringBuilder`, generar una contraseña de longitud elegida con mayúsculas, minúsculas y dígitos; con semilla fija para comprobar el resultado.
- **A5. Dinero con `double` vs `BigDecimal`.** Sumar 0,10 € diez veces con ambos tipos y explicar la diferencia.
- **A6. Primera dependencia.** Añadir `commons-lang3` al proyecto, usar 3 métodos de `StringUtils` y localizar el `.jar` en el repositorio local de Maven (`~/.m2`).

### Práctica evaluable

**P2 · Asistente de préstamos.** Programa de consola que pide el nombre del socio, el título del libro y la fecha del préstamo (`dd/MM/yyyy`) y muestra: título normalizado (sin espacios sobrantes y con la primera letra de cada palabra en mayúscula, usando `String`/`StringBuilder`), fecha de devolución (15 días; si cae en domingo, se pasa al lunes), días de retraso respecto a hoy, multa calculada con `BigDecimal` (0,20 €/día, redondeo a 2 decimales), un código de préstamo generado con `Random` y las iniciales del socio con `StringUtils` de `commons-lang3`.

**Conexión con el mundo real:** equivale a implementar una regla de negocio usando la API estándar y una librería de terceros, leyendo su documentación (cálculo de fechas e importes exactos, como en cualquier software de facturación o reservas).

Entregables: repositorio de Classroom con proyecto Maven, `README.md` con dos ejecuciones de ejemplo y una tabla «clase utilizada → constructor/método estático/método de instancia usado».

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA2.a | La tabla del README distingue correctamente clase, objeto, método de instancia y estático. | Distingue con algún error puntual. | Confunde clase y objeto o instancia y estático. |
| RA2.b / RA2.i | Programa completo que compila y se ejecuta desde el IDE y con `mvn`; estructura clara. | Funciona con defectos menores. | No compila o no se puede ejecutar. |
| RA2.c / RA2.h | Usa los constructores y fábricas adecuados (`BigDecimal(String)`, `Random(seed)` en pruebas, `LocalDate.parse`). | Instancia correctamente con alguna elección mejorable (p. ej. `BigDecimal(double)`). | No instancia objetos o lo hace de forma errónea. |
| RA2.d / RA2.f | Encadena métodos con sentido y recoge los resultados de objetos inmutables; parámetros correctos. | Usa métodos correctamente con algún resultado ignorado. | Errores frecuentes en llamadas o parámetros. |
| RA2.e | Llamadas estáticas correctas (`Math`, `Integer`, `LocalDate`, `ChronoUnit`). | Correctas con alguna innecesaria o mal ubicada. | Confunde estático e instancia. |
| RA2.g | Dependencia declarada en el `pom.xml`, importada y usada. | Declarada y usada con algún problema (versión, *scope*). | No incorpora la librería. |

### Proyecto integrador · incremento I2

Leer por teclado los datos de un libro y de un préstamo; calcular la fecha de devolución con `LocalDate` y mostrar la ficha con formato. Guardar en el README del proyecto qué clases del JDK se han usado y para qué.

## Recursos

- **Documentación oficial:** [dev.java · Getting to know the String class](https://dev.java/learn/numbers-strings/) · [dev.java · The Date Time API](https://dev.java/learn/date-time/) · [Javadoc de `java.lang.String` (Java SE 25)](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/String.html) · [Javadoc de `java.util.Scanner`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Scanner.html) · [JEP 511: Module Import Declarations](https://openjdk.org/jeps/511) · [Guía de Maven: dependencias](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html).
- **Herramientas:** IntelliJ IDEA (Javadoc rápido `Ctrl+Q`), JShell, VisualVM.
