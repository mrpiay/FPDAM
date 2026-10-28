# UD06 · Herencia, polimorfismo, interfaces y composición

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 24 h ≈ 29 sesiones | RA7 (80 %), RA4.g e i (20 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA7 criterios a)–j) y RA4 criterios g) e i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA4.g | Se han definido y utilizado clases heredadas. | RD 405/2023, anexo I, MP0485, RA4.g | P6 + PR2 |
| RA4.i | Se han creado y utilizado conjuntos y librerías de clases. | RD 405/2023, anexo I, MP0485, RA4.i | Refuerzo (paquetes de la jerarquía) |
| RA7.a | Se han identificado los conceptos de herencia, superclase y subclase. | RD 405/2023, anexo I, MP0485, RA7.a | Cuestionario en aula + PR2 |
| RA7.b | Se han utilizado modificadores para bloquear y forzar la herencia de clases y métodos. | RD 405/2023, anexo I, MP0485, RA7.b | P6 + PR2 |
| RA7.c | Se ha reconocido la incidencia de los constructores en la herencia. | RD 405/2023, anexo I, MP0485, RA7.c | P6 + PR2 |
| RA7.d | Se han creado clases heredadas que sobrescriben la implementación de métodos de la superclase. | RD 405/2023, anexo I, MP0485, RA7.d | P6 + PR2 |
| RA7.e | Se han diseñado y aplicado jerarquías de clases. | RD 405/2023, anexo I, MP0485, RA7.e | P6 (UML + código) |
| RA7.f | Se han probado y depurado las jerarquías de clases. | RD 405/2023, anexo I, MP0485, RA7.f | P6 (tests JUnit) |
| RA7.g | Se han realizado programas que implementen y utilicen jerarquías de clases. | RD 405/2023, anexo I, MP0485, RA7.g | P6 + PI-2 |
| RA7.h | Se ha comentado y documentado el código. | RD 405/2023, anexo I, MP0485, RA7.h | P6 (Javadoc) |
| RA7.i | Se han identificado y evaluado los escenarios de uso de interfaces. | RD 405/2023, anexo I, MP0485, RA7.i | P6 (informe de diseño) + cuestionario |
| RA7.j | Se han identificado y evaluado los escenarios de utilización de la herencia y la composición. | RD 405/2023, anexo I, MP0485, RA7.j | P6 (informe de diseño) + PR2 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Diseñar jerarquías de clases identificando lo común (superclase) y lo específico (subclases).
2. Usar `extends`, `super`, `protected`, `@Override` y entender el orden de ejecución de los constructores.
3. Aplicar polimorfismo: referencias de la superclase, enlace dinámico, `instanceof` con patrones y *switch* con patrones.
4. Usar `abstract` para forzar la herencia y `final`/`sealed` para bloquearla o restringirla.
5. Definir e implementar interfaces (métodos abstractos, `default` y `static`) y decidir cuándo usar interfaz, clase abstracta o composición.
6. Probar y documentar jerarquías (tests sobre la superclase aplicados a todas las subclases).

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Utilización avanzada de clases» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): composición de clases; herencia y polimorfismo; jerarquía de clases: superclases y subclases; clases y métodos abstractos y finales; interfaces; sobreescritura de métodos; constructores y herencia. También del bloque «Desarrollo de clases»: utilización de clases heredadas.

### 1. Herencia: superclase y subclase

La herencia expresa una relación **«es un»**: una `Revista` *es un* `Recurso` de la biblioteca. La subclase hereda atributos y métodos no privados, puede añadir nuevos y **sobrescribir** los heredados. Java solo admite herencia simple de clases; todas heredan de `Object`.

```
               ┌──────────────────────────┐
               │ «abstract» Recurso       │
               │ # codigo, titulo, anio   │
               │ + diasPrestamo(): int  {abstract}
               │ + multaDiaria(): BigDecimal
               └────────────▲─────────────┘
          ┌─────────────────┼──────────────────┐
   ┌──────┴─────┐    ┌──────┴──────┐    ┌──────┴─────┐
   │ Libro      │    │ Revista     │    │ Dvd        │
   │ - isbn     │    │ - numero    │    │ - minutos  │
   │ - autor    │    │             │    │            │
   └────────────┘    └─────────────┘    └────────────┘
```

```java
public abstract class Recurso {
    private final String codigo;
    protected final String titulo;
    protected final int anio;

    protected Recurso(String codigo, String titulo, int anio) {
        if (anio < 1450 || anio > Year.now().getValue()) {
            throw new IllegalArgumentException("Año no válido: " + anio);
        }
        this.codigo = codigo;
        this.titulo = titulo;
        this.anio = anio;
    }

    public String getCodigo() { return codigo; }
    public String getTitulo() { return titulo; }

    /** Días de préstamo permitidos; cada tipo de recurso lo define. */
    public abstract int diasPrestamo();

    /** Multa por día de retraso. Por defecto, 0,20 €. */
    public BigDecimal multaDiaria() { return new BigDecimal("0.20"); }

    /** Plantilla: la misma para todos, usa métodos que cada subclase concreta. */
    public final LocalDate fechaLimite(LocalDate inicio) {
        return inicio.plusDays(diasPrestamo());
    }

    @Override
    public String toString() {
        return "%s[%s, %s (%d)]".formatted(getClass().getSimpleName(), codigo, titulo, anio);
    }
}
```

```java
public class Libro extends Recurso {
    private final String isbn;
    private final String autor;

    public Libro(String codigo, String titulo, int anio, String isbn, String autor) {
        super(codigo, titulo, anio);           // llamada al constructor de la superclase
        this.isbn = isbn;
        this.autor = autor;
    }

    @Override
    public int diasPrestamo() { return 15; }

    @Override
    public String toString() {
        return super.toString() + " de " + autor;   // reutiliza la versión de la superclase
    }
}

public final class Dvd extends Recurso {             // final: no se puede heredar de Dvd
    private final int minutos;

    public Dvd(String codigo, String titulo, int anio, int minutos) {
        super(codigo, titulo, anio);
        this.minutos = minutos;
    }

    @Override public int diasPrestamo() { return 3; }
    @Override public BigDecimal multaDiaria() { return new BigDecimal("1.00"); }
}
```

### 2. Constructores y herencia

- El constructor de la subclase **siempre** llama a uno de la superclase: explícitamente con `super(...)` o implícitamente a `super()` (que debe existir).
- Orden de ejecución: primero se inicializa la parte de `Object`, luego la de la superclase y por último la de la subclase. Se comprueba con trazas en los constructores.
- Los constructores **no se heredan**.
- **Java 25 (JEP 513, constructores flexibles):** se pueden validar los argumentos *antes* de llamar a `super(...)`, sin usar `this`:
  ```java
  public Revista(String codigo, String titulo, int anio, int numero) {
      if (numero <= 0) throw new IllegalArgumentException("Número de revista no válido");
      super(codigo, titulo, anio);
      this.numero = numero;
  }
  ```
- Evitar llamar a métodos sobrescribibles desde un constructor: la subclase aún no está inicializada.

### 3. Sobrescritura y polimorfismo

- **Sobrescribir** (*override*): misma firma que en la superclase; `@Override` hace que el compilador lo compruebe. No se puede reducir la visibilidad.
- **Sobrecargar** (*overload*): mismo nombre, distintos parámetros (UD04). Se compara con la sobrescritura en un ejercicio.
- **Polimorfismo:** una referencia de tipo `Recurso` puede apuntar a cualquier subclase; el método que se ejecuta lo decide el **tipo real** del objeto en tiempo de ejecución (enlace dinámico).
  ```java
  Recurso[] fondos = {
      new Libro("L1", "Os Eoas", 1974, "9788491210000", "Eduardo Pondal"),
      new Dvd("D1", "Os luns ao sol", 2002, 113)
  };
  for (Recurso r : fondos) {
      System.out.println(r.getTitulo() + " → " + r.diasPrestamo() + " días");  // 15 y 3
  }
  ```
- **Conversión de referencias:** *upcasting* implícito (`Recurso r = libro;`), *downcasting* explícito con comprobación previa. Con *pattern matching* (Java 16+):
  ```java
  if (r instanceof Libro l) {
      System.out.println("Autor: " + l.getAutor());
  }
  ```

### 4. Clases y métodos abstractos y finales

| Modificador | En una clase | En un método |
|---|---|---|
| `abstract` | No se puede instanciar; **fuerza** a heredar | Sin cuerpo; **fuerza** a sobrescribir |
| `final` | **Bloquea** la herencia (`String`, `Integer`) | **Bloquea** la sobrescritura (`fechaLimite`) |
| `sealed … permits` (Java 17) | **Restringe** qué clases pueden heredar | — |

```java
public abstract sealed class Recurso permits Libro, Revista, Dvd { ... }
public final class Dvd extends Recurso { ... }
public non-sealed class Libro extends Recurso { ... }   // abre de nuevo la jerarquía
```

Con jerarquías selladas, el `switch` con patrones es **exhaustivo** sin `default`:

```java
static String icono(Recurso r) {
    return switch (r) {
        case Libro l -> "📕 " + l.getAutor();
        case Revista rev -> "📰 n.º " + rev.getNumero();
        case Dvd d -> "💿 " + d.getMinutos() + " min";
    };
}
```

(Los emojis son ilustrativos; en consola de Windows conviene `chcp 65001` o evitarlos.)

### 5. Interfaces

Una interfaz define un **contrato** («puede hacer»), sin estado. Una clase puede implementar varias.

```java
public interface Prestable {
    int diasPrestamo();

    default boolean admiteRenovacion() { return true; }     // implementación por defecto

    static int maxRenovaciones() { return 2; }               // método de utilidad
}

public interface Reservable {
    boolean reservar(Socio s);
}

public abstract sealed class Recurso implements Prestable permits Libro, Revista, Dvd { ... }

public non-sealed class Libro extends Recurso implements Reservable {
    @Override public boolean reservar(Socio s) { ... }
}
```

Interfaces del JDK que se usan ya: `Comparable<T>` (orden natural), `Comparator<T>`, `Iterable<T>`, `AutoCloseable`, `Runnable`. **Interfaces funcionales** (un solo método abstracto) y **lambdas**, como avance de UD07:

```java
public class Libro extends Recurso implements Comparable<Libro> {
    @Override
    public int compareTo(Libro otro) { return titulo.compareToIgnoreCase(otro.titulo); }
}

Comparator<Recurso> porAnio = Comparator.comparingInt(r -> r.anio);
```

**Escenarios de uso de interfaces (RA7.i):**

| Escenario | Ejemplo |
|---|---|
| Capacidad compartida por clases no relacionadas | `Prestable` para recursos y para salas de estudio |
| Desacoplar quién usa de quién implementa | `Repositorio<T, ID>` con implementaciones en memoria, fichero, JDBC u ObjectDB (UD07–UD11) |
| Varias implementaciones intercambiables (estrategia) | `CalculoMulta` estándar, reducida para socios infantiles, sin multa en verano |
| Retrollamadas y eventos | `EventHandler<ActionEvent>` en JavaFX (UD09) |
| Pruebas | Sustituir una dependencia real por una falsa en un test |

### 6. Composición frente a herencia

- **Composición** («tiene un»): un objeto contiene a otros y les delega trabajo. `Biblioteca` *tiene un* `Catalogo` y *tiene una* política de multas.
- **Herencia** («es un»): solo si la subclase es realmente un subtipo y puede usarse donde se espera la superclase (principio de sustitución de Liskov).

```java
public interface CalculoMulta {
    BigDecimal calcular(Recurso r, long diasRetraso);
}

public class Biblioteca {
    private final Catalogo catalogo = new Catalogo();     // composición
    private CalculoMulta politicaMultas;                  // composición + interfaz (estrategia)

    public Biblioteca(CalculoMulta politicaMultas) {
        this.politicaMultas = politicaMultas;
    }

    public void cambiarPolitica(CalculoMulta nueva) { this.politicaMultas = nueva; }   // en ejecución
    ...
}

CalculoMulta estandar = (r, dias) -> r.multaDiaria().multiply(BigDecimal.valueOf(dias));
CalculoMulta verano = (r, dias) -> BigDecimal.ZERO;
```

**Criterios (RA7.j):** preferir composición cuando se quiere reutilizar comportamiento sin relación «es un», cuando el comportamiento cambia en ejecución o cuando la herencia expondría métodos que no tienen sentido (contraejemplo clásico: `class Pila extends ArrayList`, que hereda `add(int, E)` y rompe la semántica de pila). Herencia cuando hay un subtipo real y comportamiento común estable.

### 7. Probar y depurar jerarquías

- **Tests del contrato de la superclase** aplicados a todas las subclases con un test parametrizado:
  ```java
  static Stream<Recurso> recursos() {
      return Stream.of(
          new Libro("L1", "T", 2000, "9788437604947", "A"),
          new Revista("R1", "T", 2020, 5),
          new Dvd("D1", "T", 2010, 90));
  }

  @ParameterizedTest
  @MethodSource("recursos")
  void fechaLimitePosteriorAlInicio(Recurso r) {
      var hoy = LocalDate.of(2026, 11, 3);
      assertTrue(r.fechaLimite(hoy).isAfter(hoy));
  }
  ```
- **Depurador:** ver el tipo real del objeto en la ventana *Variables*; *Step Into* para comprobar qué versión del método se ejecuta; vista de jerarquía de tipos de IntelliJ (`Ctrl+H`).
- Errores típicos: olvidar `@Override` y sobrecargar sin querer (`equals(Libro)` en lugar de `equals(Object)`), `ClassCastException` por *downcasting* sin comprobar.

### 8. Documentar jerarquías

Javadoc en la superclase describiendo el contrato que deben cumplir las subclases (`@implSpec` para el comportamiento por defecto); `{@inheritDoc}` en las sobrescrituras; diagrama de clases (PlantUML o Mermaid) en el README.

```java
/**
 * {@inheritDoc}
 * <p>Los DVD se prestan solo 3 días por su alta demanda.
 */
@Override
public int diasPrestamo() { return 3; }
```

## Actividades

### Actividades de clase (no evaluables)

- **A1. ¿Es un o tiene un?** Clasificar 12 pares de conceptos (Coche–Motor, Gato–Animal, Pila–Lista, Empleado–Persona, Pedido–LíneaPedido…) y justificarlo.
- **A2. Orden de construcción.** Jerarquía de tres niveles con trazas en constructores y bloques de inicialización: predecir la salida y comprobarla.
- **A3. Nóminas polimórficas.** `Empleado` abstracto con `Asalariado`, `PorHoras` y `Comercial`; calcular la nómina total con un único bucle.
- **A4. Sobrescritura frente a sobrecarga.** Encontrar el error en una clase con `equals(Punto)` que falla dentro de una lista; corregirlo y añadir `hashCode`.
- **A5. Refactorización a composición.** Partir de `class Pila extends ArrayList<Integer>` y rehacerla por composición; listar qué métodos indebidos desaparecen.
- **A6. Figuras selladas.** `sealed interface Figura permits Circulo, Rectangulo, Triangulo` como *records* y cálculo del área con *switch* de patrones.

### Práctica evaluable

**P6 · Flota de vehículos de alquiler.** Una empresa de alquiler de vehículos necesita modelar su flota: `Vehiculo` (abstracta, sellada) con `Turismo`, `Furgoneta` y `Bicicleta`; precio por día con reglas distintas (abstracto), seguro común `final`; interfaz `Electrico` (autonomía, tiempo de carga) que implementan algunos tipos de distintas ramas; política de descuentos inyectada por composición (`EstrategiaDescuento` con al menos dos implementaciones o lambdas); programa que calcula la facturación de un día con un array polimórfico y un *switch* de patrones para un informe por tipo. Tests parametrizados del contrato de la superclase y tests específicos por subclase. Javadoc completo y un **informe de diseño** de una página en el README: diagrama UML, por qué cada relación es herencia, interfaz o composición, y dónde se ha bloqueado o forzado la herencia.

**Conexión con el mundo real:** equivale al diseño del **modelo de dominio extensible** de un software de gestión (catálogo de productos o servicios con reglas por tipo), en el que añadir un tipo nuevo no debe obligar a tocar el código existente; el informe de diseño es lo que se presenta en una revisión de arquitectura.

Entregables: repositorio con rama `feature/p6` fusionada mediante *pull request* revisada por el docente, CI en verde, README con informe y diagrama.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA7.a / RA4.g | Superclase y subclases bien identificadas; uso correcto de `extends`, `super` y `protected`. | Jerarquía correcta con algún miembro mal ubicado. | No hay herencia real o es incorrecta. |
| RA7.b | `abstract`, `final` y `sealed` usados donde aportan y justificados en el informe. | Usados correctamente sin justificar. | No se usan o se usan sin sentido. |
| RA7.c | Constructores encadenados con `super(...)`, validación antes de `super` (JEP 513) donde procede. | Constructores correctos sin validación. | Errores de compilación o estado inválido. |
| RA7.d | Sobrescrituras con `@Override`, reutilizando `super.metodo()` cuando corresponde. | Sobrescrituras correctas sin reutilización. | Sobrecarga en lugar de sobrescritura o sin `@Override`. |
| RA7.e / RA7.g | Jerarquía bien diseñada (UML coherente) y programa que la explota con polimorfismo y *switch* de patrones. | Jerarquía razonable; polimorfismo parcial (`instanceof` en cadena). | Diseño incoherente o sin polimorfismo. |
| RA7.f | Tests parametrizados del contrato + tests por subclase, en verde en la CI. | Tests por subclase sin test de contrato. | Sin tests o en rojo. |
| RA7.h | Javadoc con contrato de la superclase y `{@inheritDoc}`; diagrama en el README. | Javadoc parcial. | Sin documentación. |
| RA7.i / RA7.j | El informe identifica y justifica los escenarios de interfaz, herencia y composición con argumentos correctos. | Justificación incompleta. | Sin informe o con argumentos erróneos. |

### Proyecto integrador · incremento I6

Jerarquía `Recurso` (abstracta y sellada) → `Libro`, `Revista`, `Dvd`; interfaz `Prestable`; `Biblioteca` compuesta por `Catalogo` y una política de multas (`CalculoMulta`). Desde esta unidad, cada historia se desarrolla en una rama y se fusiona por *pull request* revisada por el docente (historia HU05).

## Recursos

- **Documentación oficial:** [dev.java · Inheritance](https://dev.java/learn/inheritance/) · [dev.java · Interfaces](https://dev.java/learn/interfaces/) · [dev.java · Pattern matching](https://dev.java/learn/pattern-matching/) · [JEP 409: Sealed Classes](https://openjdk.org/jeps/409) · [JEP 441: Pattern Matching for switch](https://openjdk.org/jeps/441) · [JEP 513: Flexible Constructor Bodies](https://openjdk.org/jeps/513) · [JUnit 5: Parameterized Tests](https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests).
- **Herramientas:** IntelliJ (*Type Hierarchy* `Ctrl+H`, *Generate → Override Methods* `Ctrl+O`, diagramas UML en Ultimate), PlantUML o Mermaid.
