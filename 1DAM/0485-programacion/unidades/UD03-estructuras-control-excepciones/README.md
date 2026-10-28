# UD03 · Estructuras de control, excepciones, aserciones y depuración

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 26 h ≈ 31 sesiones | RA3 (90 %), refuerzo de RA1.g/i y RA5.a (10 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA3, criterios a)–i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA3.a | Se ha escrito y probado código que haga uso de estructuras de selección. | RD 405/2023, anexo I, MP0485, RA3.a | P3 + PR1 + katas |
| RA3.b | Se han utilizado estructuras de repetición. | RD 405/2023, anexo I, MP0485, RA3.b | P3 + PR1 + katas |
| RA3.c | Se han reconocido las posibilidades de las sentencias de salto. | RD 405/2023, anexo I, MP0485, RA3.c | Cuestionario + PR1 |
| RA3.d | Se ha escrito código utilizando control de excepciones. | RD 405/2023, anexo I, MP0485, RA3.d | P3 + PR1 |
| RA3.e | Se han creado programas ejecutables utilizando diferentes estructuras de control. | RD 405/2023, anexo I, MP0485, RA3.e | P3 (`.jar` ejecutable) |
| RA3.f | Se han probado y depurado los programas. | RD 405/2023, anexo I, MP0485, RA3.f | P3 (tests JUnit) + observación del uso del depurador |
| RA3.g | Se ha comentado y documentado el código. | RD 405/2023, anexo I, MP0485, RA3.g | P3 (Javadoc generado) |
| RA3.h | Se han creado excepciones. | RD 405/2023, anexo I, MP0485, RA3.h | P3 + PR1 |
| RA3.i | Se han utilizado aserciones para la detección y corrección de errores durante la fase de desarrollo. | RD 405/2023, anexo I, MP0485, RA3.i | P3 + cuestionario |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Elegir y escribir la estructura de selección adecuada (`if`, `switch` clásico y *switch expression*).
2. Escribir bucles `while`, `do-while`, `for` y *for-each* controlando condiciones de parada, contadores, acumuladores y centinelas.
3. Usar `break`, `continue`, etiquetas y `return` sabiendo cuándo mejoran o empeoran la legibilidad.
4. Capturar, propagar y lanzar excepciones; usar *try-with-resources*; crear excepciones propias.
5. Usar `assert` para comprobar invariantes durante el desarrollo y activarlas con `-ea`.
6. Depurar con puntos de ruptura, inspección de variables y ejecución paso a paso; escribir tests JUnit 5 sencillos.
7. Documentar con Javadoc y generar la documentación HTML; empaquetar un `.jar` ejecutable.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Uso de estructuras de control» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): estructuras de selección; estructuras de repetición; estructuras de salto; control de excepciones; aserciones; prueba, depuración y documentación de la aplicación.

### 1. Programación estructurada

Todo algoritmo puede escribirse con tres estructuras: **secuencia**, **selección** e **iteración** (teorema de Böhm-Jacopini). Antes de codificar, se recomienda esbozar el algoritmo en pseudocódigo o diagrama de flujo, sobre todo en los primeros ejercicios.

### 2. Estructuras de selección

```java
// if / else if / else
if (nota < 0 || nota > 10) {
    System.out.println("Nota no válida");
} else if (nota >= 9) {
    System.out.println("Sobresaliente");
} else if (nota >= 5) {
    System.out.println("Aprobado");
} else {
    System.out.println("Suspenso");
}
```

**`switch` clásico** (con `break`; sin él se «cae» al siguiente caso):

```java
switch (opcion) {
    case 1:
        alta();
        break;
    case 2:
    case 3:
        listar();
        break;
    default:
        System.out.println("Opción desconocida");
}
```

***Switch expression*** (Java 14+): sin caída, devuelve valor, el compilador exige exhaustividad.

```java
String tipo = switch (dia) {
    case SATURDAY, SUNDAY -> "fin de semana";
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> "laborable";
};   // DayOfWeek es un enum: no hace falta default si están todos

int diasPrestamo = switch (categoria) {
    case 'A' -> 7;
    case 'B' -> 15;
    default -> {
        System.out.println("Categoría desconocida, se aplican 15 días");
        yield 15;          // yield devuelve el valor desde un bloque
    }
};
```

**Pattern matching en `switch`** (Java 21) se presentará en UD06 con jerarquías.

### 3. Estructuras de repetición

```java
// while: 0 o más iteraciones
int intentos = 0;
while (intentos < 3 && !acertado) { ... intentos++; }

// do-while: al menos 1 iteración (típico de menús)
int opcion;
do {
    System.out.print(MENU);
    opcion = leerEntero();
    procesar(opcion);
} while (opcion != 0);

// for: número de iteraciones conocido
for (int i = 1; i <= 10; i++) {
    System.out.printf("7 x %d = %d%n", i, 7 * i);
}

// for-each: recorrer arrays y colecciones
for (String autor : List.of("Rosalía", "Castelao", "Cunqueiro")) {
    System.out.println(autor);
}
```

Patrones habituales: contador, acumulador, máximo/mínimo, bandera, centinela (leer hasta un valor especial), validación de entrada en bucle. Bucles anidados: tablas, figuras con asteriscos. Error típico: bucle infinito por no actualizar la variable de control.

### 4. Sentencias de salto

| Sentencia | Efecto | Uso recomendado |
|---|---|---|
| `break` | Sale del bucle o `switch` más interno | Buscar y parar al encontrar |
| `continue` | Salta a la siguiente iteración | Ignorar casos no válidos al principio del cuerpo |
| `break etiqueta` | Sale del bucle etiquetado (externo) | Búsqueda en estructuras anidadas; usar con moderación |
| `return` | Sale del método (devolviendo valor si procede) | Salidas tempranas (*guard clauses*) |
| `yield` | Devuelve el valor de un bloque en una *switch expression* | Casos con varias sentencias |
| `throw` | Lanza una excepción | Errores (apartado 5) |

```java
buscar:
for (int fila = 0; fila < sala.length; fila++) {
    for (int col = 0; col < sala[fila].length; col++) {
        if (sala[fila][col] == LIBRE) {
            System.out.printf("Primer asiento libre: fila %d, butaca %d%n", fila + 1, col + 1);
            break buscar;
        }
    }
}
```

### 5. Control de excepciones

Una **excepción** es un objeto que representa un error en tiempo de ejecución. Jerarquía básica:

```
Throwable
├─ Error                     (fallos graves de la JVM: OutOfMemoryError…; no se capturan)
└─ Exception                 (comprobadas: el compilador obliga a tratarlas, p. ej. IOException)
   └─ RuntimeException       (no comprobadas: NullPointerException, ArithmeticException,
                              NumberFormatException, IllegalArgumentException, InputMismatchException…)
```

```java
try {
    int ejemplares = Integer.parseInt(texto);
    double media = total / ejemplares;
} catch (NumberFormatException e) {
    System.out.println("No es un número: " + texto);
} catch (ArithmeticException | IllegalStateException e) {   // multi-catch
    System.out.println("Error de cálculo: " + e.getMessage());
} finally {
    System.out.println("Se ejecuta siempre");
}
```

- **Propagar** con `throws` en la firma: `void cargar(Path p) throws IOException`.
- **Lanzar** con `throw new IllegalArgumentException("Los días no pueden ser negativos")`.
- ***Try-with-resources***: cierra automáticamente cualquier `AutoCloseable`.
  ```java
  try (var lector = Files.newBufferedReader(Path.of("socios.csv"))) {
      System.out.println(lector.readLine());
  } catch (IOException e) {
      System.err.println("No se pudo leer: " + e.getMessage());
  }
  ```
- Buenas prácticas: capturar la excepción más específica posible; no dejar `catch` vacíos; no usar excepciones para el flujo normal; mostrar al usuario un mensaje comprensible y registrar el detalle (`e.printStackTrace()` solo en desarrollo).

Lectura robusta de un entero por teclado:

```java
static int leerEntero(Scanner sc, String mensaje) {
    while (true) {
        System.out.print(mensaje);
        try {
            return Integer.parseInt(sc.nextLine().strip());
        } catch (NumberFormatException e) {
            System.out.println("Introduce un número entero.");
        }
    }
}
```

### 6. Creación de excepciones propias

Se crean heredando de `Exception` (comprobada) o `RuntimeException` (no comprobada). Criterio: comprobada si quien llama puede y debe recuperarse (p. ej. préstamo no permitido); no comprobada para errores de programación.

```java
/** Se lanza cuando un socio no puede llevarse un libro en préstamo. */
public class PrestamoException extends Exception {

    public PrestamoException(String mensaje) {
        super(mensaje);
    }

    public PrestamoException(String mensaje, Throwable causa) {
        super(mensaje, causa);   // encadenamiento: conserva la excepción original
    }
}
```

```java
static void comprobarPrestamo(int prestamosActivos, boolean tieneMulta) throws PrestamoException {
    if (tieneMulta) {
        throw new PrestamoException("El socio tiene multas pendientes");
    }
    if (prestamosActivos >= MAX_PRESTAMOS) {
        throw new PrestamoException("Máximo de " + MAX_PRESTAMOS + " préstamos alcanzado");
    }
}
```

### 7. Aserciones

`assert condición : mensaje;` comprueba una suposición del programador. Si es falsa y las aserciones están activas, lanza `AssertionError`.

```java
static double calcularMulta(int diasRetraso) {
    assert diasRetraso >= 0 : "diasRetraso negativo: " + diasRetraso;
    return diasRetraso * MULTA_POR_DIA;
}
```

- Están **desactivadas por defecto**. Se activan con `java -ea Clase` o, en IntelliJ, *Run → Edit Configurations → VM options: `-ea`*. Maven Surefire las activa al ejecutar tests.
- **Uso correcto:** invariantes internos, postcondiciones, casos «imposibles» (`default -> { assert false : "opción imposible"; }`).
- **Uso incorrecto:** validar datos del usuario o argumentos de métodos públicos (en producción estarían desactivadas): para eso, excepciones.
- La expresión del `assert` no debe tener efectos secundarios.

### 8. Pruebas y depuración

**Depurador de IntelliJ:** punto de ruptura (clic en el margen), *Debug* (`Mayús+F9`), *Step Over* (`F8`), *Step Into* (`F7`), *Step Out* (`Mayús+F8`), *Resume* (`F9`), ventana *Variables*, *Evaluate Expression* (`Alt+F8`), puntos de ruptura condicionales (clic derecho → *Condition*) y *Watches*.

**Tipos de pruebas:** de caja negra (entradas/salidas, clases de equivalencia y valores límite) y de caja blanca (cubrir caminos del código). Para `calcularMulta`: 0 días, 1 día, valor típico, valor muy grande, negativo.

**JUnit 5** (dependencia ya incluida en el `pom.xml` base). Los tests van en `src/test/java` y se ejecutan con `mvn test` o desde el IDE.

```java
package es.dam.ud03;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

class TarifasTest {

    @Test
    void sinRetrasoNoHayMulta() {
        assertEquals(0.0, Tarifas.calcularMulta(0), 1e-9);
    }

    @ParameterizedTest
    @CsvSource({"1, 0.20", "5, 1.00", "30, 6.00"})
    void multaProporcionalAlRetraso(int dias, double esperado) {
        assertEquals(esperado, Tarifas.calcularMulta(dias), 1e-9);
    }

    @Test
    void conMultaPendienteNoSePuedePrestar() {
        var e = assertThrows(PrestamoException.class,
                () -> Tarifas.comprobarPrestamo(0, true));
        assertTrue(e.getMessage().contains("multas"));
    }
}
```

`@ParameterizedTest` requiere el artefacto `junit-jupiter-params`, que ya está incluido en `junit-jupiter`.

### 9. Documentación y empaquetado

```java
/**
 * Calcula la multa por devolución tardía.
 *
 * @param diasRetraso días transcurridos desde la fecha límite; debe ser {@code >= 0}
 * @return importe en euros
 * @throws IllegalArgumentException si {@code diasRetraso} es negativo
 * @see Tarifas#MULTA_POR_DIA
 */
```

- Generar HTML: `mvn javadoc:javadoc` (salida en `target/reports/apidocs`) o *Tools → Generate JavaDoc* en IntelliJ.
- **Programa ejecutable:** `mvn package` genera `target/*.jar`; para ejecutarlo con `java -jar` hay que indicar la clase principal en el manifiesto (plugin `maven-jar-plugin`, `<mainClass>`), o ejecutar `java -cp target/p3.jar es.dam.p3.Main`.

### 10. Depurar y probar código generado por IA

Ejercicio guiado: se entrega una función generada por un asistente con dos errores sutiles (condición límite y excepción tragada). El alumnado escribe primero los tests que la hacen fallar y luego la corrige. Objetivo: tratar el código generado como código ajeno que hay que verificar.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Kata FizzBuzz con *switch expression*** y su versión con `if`; comparar legibilidad.
- **A2. Adivina el número** con `Random`, `do-while`, contador de intentos y validación de entrada con excepciones.
- **A3. Traza a mano y con depurador.** Dado un bucle anidado que dibuja un triángulo, rellenar la tabla de valores de `i` y `j` y comprobarla con puntos de ruptura condicionales.
- **A4. Salto o no salto.** Reescribir tres fragmentos que usan `break`/`continue` sin ellos y discutir qué versión es más clara.
- **A5. Cazador de excepciones.** Provocar a propósito 6 excepciones distintas, leer su traza (*stack trace*) e identificar la línea origen.
- **A6. Tests primero.** Para `esBisiesto(int anio)`, escribir 6 tests (incluidos 1900 y 2000) antes de implementar el método.
- **A7. Calculadora de IMC** con menú, *switch expression* y aserciones sobre los rangos de salida, ejecutada con y sin `-ea`.

### Práctica evaluable

**P3 · Terminal de autopréstamo.** Aplicación de consola con menú en bucle (*switch expression*): 1) registrar préstamo, 2) registrar devolución y calcular multa, 3) simular el calendario de un mes marcando los días de cierre, 0) salir. Requisitos: validación de toda entrada con reintento; excepción propia comprobada `PrestamoException` lanzada por las reglas de negocio (máximo de préstamos, multas pendientes) y tratada en el menú; al menos dos aserciones de invariantes; uso justificado de una sentencia de salto; tests JUnit proporcionados por el profesorado (deben pasar) + al menos 5 tests propios; Javadoc de todos los métodos públicos; `.jar` ejecutable.

**Conexión con el mundo real:** equivale a desarrollar una funcionalidad a partir de tests de aceptación dados, tratando errores de usuario sin que la aplicación caiga y dejando la documentación de la API generada, como en un *ticket* de un equipo con integración continua.

Entregables: repositorio de Classroom (el *autograding* ejecuta `mvn test`), `README.md` con instrucciones para ejecutar el `.jar` con `-ea`, captura de una sesión de depuración con un punto de ruptura condicional y enlace a la Javadoc generada (carpeta `docs/`).

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA3.a / RA3.b | Estructuras adecuadas a cada caso, sin condiciones redundantes ni bucles infinitos. | Correctas con alguna elección mejorable. | Errores lógicos que impiden el funcionamiento. |
| RA3.c | Usa una sentencia de salto justificada en el README; no abusa de ellas. | Usa saltos correctamente sin justificar. | Saltos que dificultan la lectura o mal usados. |
| RA3.d | Captura excepciones específicas, *try-with-resources* donde procede, mensajes claros; ninguna entrada rompe el programa. | Controla las excepciones principales; algún caso sin tratar. | El programa termina con excepciones no tratadas. |
| RA3.e | `.jar` ejecutable que combina selección, repetición y saltos de forma coherente. | Ejecutable desde el IDE pero no como `.jar`. | No ejecutable. |
| RA3.f | Pasan todos los tests; 5+ tests propios con valores límite; captura de depuración relevante. | Pasan los tests dados; tests propios básicos. | Fallan tests dados o no hay tests propios. |
| RA3.g | Javadoc completa (`@param`, `@return`, `@throws`) generada y publicada en `docs/`. | Javadoc parcial. | Sin documentación. |
| RA3.h | Excepción propia bien diseñada (constructores con causa, tipo adecuado) y usada en las reglas de negocio. | Excepción propia creada pero con uso limitado. | No crea excepciones. |
| RA3.i | Aserciones de invariantes correctas, sin efectos secundarios, y explicación de cuándo se activan. | Aserciones presentes con algún uso indebido (validar entrada). | Sin aserciones. |

### Proyecto integrador · incremento I3

Convertir el `Main` del gestor de biblioteca en un menú en bucle con *switch expression*, validar todas las entradas, crear `PrestamoException` y añadir aserciones y Javadoc. Primeros tests JUnit sobre el cálculo de multas.

## Recursos

- **Documentación oficial:** [dev.java · Control flow statements](https://dev.java/learn/language-basics/controlling-flow/) · [dev.java · Exceptions](https://dev.java/learn/exceptions/) · [Oracle: Programming with Assertions](https://docs.oracle.com/javase/8/docs/technotes/guides/language/assert.html) · [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) · [IntelliJ IDEA: Debug code](https://www.jetbrains.com/help/idea/debugging-code.html) · [Javadoc tool (Java SE 25)](https://docs.oracle.com/en/java/javase/25/javadoc/javadoc.html).
- **Herramientas:** depurador de IntelliJ, JUnit 5, `mvn javadoc:javadoc`, `mvn package`.
