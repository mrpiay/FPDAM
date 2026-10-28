# UD04 · Desarrollo de clases

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 24 h ≈ 29 sesiones | RA4 (85 %), refuerzo de RA2.a/e/h y RA3.f/g/h (15 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA4, criterios a)–i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). RA4.g (clases heredadas) se introduce aquí y se evalúa en [UD06](../UD06-herencia-interfaces/README.md).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA4.a | Se ha reconocido la sintaxis, estructura y componentes típicos de una clase. | RD 405/2023, anexo I, MP0485, RA4.a | Cuestionario en aula + PR2 |
| RA4.b | Se han definido clases. | RD 405/2023, anexo I, MP0485, RA4.b | P4 + PR2 |
| RA4.c | Se han definido propiedades y métodos. | RD 405/2023, anexo I, MP0485, RA4.c | P4 + PR2 |
| RA4.d | Se han creado constructores. | RD 405/2023, anexo I, MP0485, RA4.d | P4 + PR2 |
| RA4.e | Se han desarrollado programas que instancien y utilicen objetos de las clases creadas anteriormente. | RD 405/2023, anexo I, MP0485, RA4.e | P4 + PI-1 |
| RA4.f | Se han utilizado mecanismos para controlar la visibilidad de las clases y de sus miembros. | RD 405/2023, anexo I, MP0485, RA4.f | P4 + PR2 |
| RA4.g | Se han definido y utilizado clases heredadas. | RD 405/2023, anexo I, MP0485, RA4.g | (Se evalúa en UD06) |
| RA4.h | Se han creado y utilizado métodos estáticos. | RD 405/2023, anexo I, MP0485, RA4.h | P4 + PR2 |
| RA4.i | Se han creado y utilizado conjuntos y librerías de clases. | RD 405/2023, anexo I, MP0485, RA4.i | P4 (paquetes + `.jar` reutilizado) + PI-1 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Diseñar una clase a partir de un enunciado (diagrama de clases UML sencillo) e implementarla.
2. Encapsular el estado con atributos privados y exponer un comportamiento coherente mediante métodos.
3. Escribir constructores sobrecargados y encadenados, validando los datos de entrada.
4. Aplicar los modificadores de acceso a clases y miembros y organizar el código en paquetes.
5. Distinguir miembros de instancia y de clase (`static`) y saber cuándo usar cada uno.
6. Sobrescribir `toString`, `equals` y `hashCode`, y usar *records* para datos inmutables.
7. Crear una librería de clases, empaquetarla como `.jar` e instalarla en otro proyecto Maven.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Desarrollo de clases» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): concepto de clase; estructura y miembros de una clase, visibilidad; creación de propiedades; creación de métodos; creación de constructores; utilización de clases y objetos; utilización de clases heredadas.

### 1. Concepto de clase y diseño

Una clase modela una entidad del dominio: **qué sabe** (atributos) y **qué hace** (métodos). Se parte del enunciado: los sustantivos sugieren clases y atributos; los verbos, métodos. Diagrama UML de clases con visibilidad (`-` privado, `+` público, `#` protegido, `~` paquete):

```
┌─────────────────────────────┐
│ Socio                       │
├─────────────────────────────┤
│ - numero: int               │
│ - nombre: String            │
│ - email: String             │
│ - multaPendiente: BigDecimal│
│ - siguienteNumero: int  (s) │
├─────────────────────────────┤
│ + Socio(nombre, email)      │
│ + getNombre(): String       │
│ + puedePedirPrestamo(): bool│
│ + sumarMulta(BigDecimal)    │
│ + pagarMulta()              │
└─────────────────────────────┘
```

### 2. Estructura y miembros de una clase

```java
package es.dam.biblio.modelo;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * Socio de la biblioteca.
 */
public class Socio {

    // 1. Constantes de clase
    public static final int MAX_PRESTAMOS = 3;

    // 2. Atributos de clase
    private static int siguienteNumero = 1;

    // 3. Atributos de instancia (estado), privados
    private final int numero;
    private String nombre;
    private String email;
    private BigDecimal multaPendiente = BigDecimal.ZERO;
    private int prestamosActivos;

    // 4. Constructores
    public Socio(String nombre, String email) {
        this.numero = siguienteNumero++;
        setNombre(nombre);
        this.email = Objects.requireNonNull(email, "email");
    }

    // 5. Métodos de acceso (getters/setters) solo donde tienen sentido
    public int getNumero() { return numero; }
    public String getNombre() { return nombre; }

    public void setNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        this.nombre = nombre.strip();
    }

    // 6. Métodos de comportamiento
    public boolean puedePedirPrestamo() {
        return multaPendiente.signum() == 0 && prestamosActivos < MAX_PRESTAMOS;
    }

    public void registrarPrestamo() {
        if (!puedePedirPrestamo()) {
            throw new IllegalStateException("El socio " + numero + " no puede pedir préstamos");
        }
        prestamosActivos++;
    }

    public void registrarDevolucion() {
        if (prestamosActivos == 0) throw new IllegalStateException("Sin préstamos activos");
        prestamosActivos--;
    }

    public void sumarMulta(BigDecimal importe) {
        if (importe.signum() < 0) throw new IllegalArgumentException("Importe negativo");
        multaPendiente = multaPendiente.add(importe);
    }

    public void pagarMulta() { multaPendiente = BigDecimal.ZERO; }

    // 7. Métodos de clase
    public static int sociosCreados() { return siguienteNumero - 1; }

    // 8. Métodos heredados de Object que conviene sobrescribir
    @Override
    public String toString() {
        return "Socio[%d, %s, préstamos=%d, multa=%s €]"
                .formatted(numero, nombre, prestamosActivos, multaPendiente);
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Socio otro && numero == otro.numero;
    }

    @Override
    public int hashCode() { return Integer.hashCode(numero); }
}
```

Puntos clave:

- **`this`** referencia al objeto actual: desambigua atributo/parámetro y permite encadenar constructores (`this(...)`).
- Un atributo **`final`** se asigna una sola vez (en su declaración o en el constructor).
- **Encapsulación ≠ getters y setters para todo.** Se exponen operaciones del dominio (`registrarPrestamo`) que mantienen las reglas (invariantes); no `setPrestamosActivos(int)`.
- Las validaciones en métodos públicos usan **excepciones** (`IllegalArgumentException`, `IllegalStateException`); las aserciones quedan para comprobaciones internas (UD03).

### 3. Propiedades y métodos

- **Atributos**: tipo, nombre, visibilidad y, opcionalmente, valor inicial. Valores por defecto: `0`, `false`, `null`.
- **Métodos**: `visibilidad [static] tipoRetorno nombre(parámetros) [throws ...] { cuerpo }`. Un método hace una sola cosa y su nombre es un verbo.
- **Sobrecarga** de métodos: mismo nombre con distintos parámetros.
- **Parámetros variables** (`varargs`): `public void anadirAutores(String... autores)`.
- **Métodos de consulta vs de modificación**: los primeros no cambian el estado (`puedePedirPrestamo`), los segundos sí (`registrarPrestamo`). Separarlos facilita las pruebas.

### 4. Constructores

```java
public class Libro {
    private final String isbn;
    private final String titulo;
    private final String autor;
    private int ejemplares;

    public Libro(String isbn, String titulo, String autor, int ejemplares) {
        if (ejemplares < 0) throw new IllegalArgumentException("ejemplares < 0");
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.ejemplares = ejemplares;
    }

    public Libro(String isbn, String titulo, String autor) {
        this(isbn, titulo, autor, 1);      // encadenamiento: debe ser la primera llamada a otro constructor
    }
    // ...
}
```

- Si no se escribe ninguno, Java crea el **constructor por defecto** sin parámetros; en cuanto se define uno, desaparece.
- Constructor de copia: `public Libro(Libro otro) { this(otro.isbn, otro.titulo, otro.autor, otro.ejemplares); }`.
- **Métodos de fábrica estáticos** como alternativa con nombre: `Libro.deLinea(String csv)`.
- **Java 25 (JEP 513):** se pueden escribir sentencias (p. ej. validaciones) **antes** de `this(...)` o `super(...)`, siempre que no usen el objeto en construcción.

### 5. Visibilidad y paquetes

| Modificador | Misma clase | Mismo paquete | Subclase (otro paquete) | Resto |
|---|---|---|---|---|
| `private` | ✔ | | | |
| *(sin modificador, de paquete)* | ✔ | ✔ | | |
| `protected` | ✔ | ✔ | ✔ | |
| `public` | ✔ | ✔ | ✔ | ✔ |

- Una clase de nivel superior solo puede ser `public` o de paquete; en un fichero solo hay una `public` y se llama igual que el fichero.
- Regla práctica: atributos `private`, métodos `public` solo si forman parte del contrato; lo auxiliar, `private`.
- **Paquetes**: organizan clases por responsabilidad y evitan conflictos de nombres. Estructura propuesta para el proyecto:
  ```
  es.dam.biblio
  ├─ app        Main, menú de consola
  ├─ modelo     Libro, Socio, Prestamo
  ├─ servicio   Biblioteca (reglas de negocio)
  └─ util       Validador, Fechas
  ```

### 6. Miembros estáticos

- **Atributo estático**: uno por clase, compartido (contador `siguienteNumero`).
- **Método estático**: no tiene `this`; solo accede directamente a miembros estáticos. Adecuado para utilidades sin estado (`Validador.esIsbnValido(String)`) y fábricas.
- **Clase de utilidad**: `final`, constructor `private`, solo métodos estáticos.
  ```java
  public final class Fechas {
      private Fechas() { }      // no instanciable

      public static LocalDate siguienteLaborable(LocalDate fecha) {
          return switch (fecha.getDayOfWeek()) {
              case SATURDAY -> fecha.plusDays(2);
              case SUNDAY -> fecha.plusDays(1);
              default -> fecha;
          };
      }
  }
  ```
- Bloque de inicialización estático: `static { ... }` (se ve, se usa poco).

### 7. *Records* y enumerados

- **`record`**: clase inmutable de datos; el compilador genera constructor, métodos de acceso (`titulo()`), `equals`, `hashCode` y `toString`. Admite **constructor compacto** para validar.
  ```java
  public record Prestamo(Socio socio, Libro libro, LocalDate inicio, LocalDate limite) {
      public Prestamo {
          Objects.requireNonNull(socio);
          Objects.requireNonNull(libro);
          if (limite.isBefore(inicio)) throw new IllegalArgumentException("Fecha límite anterior al inicio");
      }

      public long diasRetraso(LocalDate hoy) {
          return Math.max(0, ChronoUnit.DAYS.between(limite, hoy));
      }
  }
  ```
- **`enum`**: conjunto cerrado de constantes, que puede tener atributos y métodos.
  ```java
  public enum Genero {
      NOVELA("Novela"), ENSAYO("Ensayo"), INFANTIL("Infantil"), COMIC("Cómic");

      private final String etiqueta;
      Genero(String etiqueta) { this.etiqueta = etiqueta; }
      public String etiqueta() { return etiqueta; }
  }
  ```

### 8. Utilización de clases y objetos

```java
public class Main {
    public static void main(String[] args) {
        var ana = new Socio("Ana Souto", "ana@example.com");
        var libro = new Libro("9788437604947", "Cien años de soledad", "G. García Márquez");
        var hoy = LocalDate.now();
        var p = new Prestamo(ana, libro, hoy, Fechas.siguienteLaborable(hoy.plusDays(15)));
        ana.registrarPrestamo();
        System.out.println(p);
        System.out.println("Socios creados: " + Socio.sociosCreados());
    }
}
```

Relación entre objetos: un `Prestamo` **tiene** un `Socio` y un `Libro` (asociación/composición; se profundiza en UD06).

### 9. Introducción a la herencia (avance de UD06)

Toda clase hereda de `Object` (`toString`, `equals`, `hashCode`, `getClass`). Se presenta `extends` con un ejemplo mínimo (`SocioInfantil extends Socio` con `MAX_PRESTAMOS` distinto) para justificar `protected`; el desarrollo completo y la evaluación de RA4.g se hacen en UD06.

### 10. Conjuntos y librerías de clases

- **Librería propia**: proyecto Maven `biblio-util` con `Validador` y `Fechas`, `mvn install` → se instala en el repositorio local `~/.m2`.
- **Uso en otro proyecto**:
  ```xml
  <dependency>
    <groupId>es.dam</groupId>
    <artifactId>biblio-util</artifactId>
    <version>1.0.0</version>
  </dependency>
  ```
- Mención a los **módulos de Java** (`module-info.java`, `exports`, `requires`): se usarán en UD09 con JavaFX.
- Javadoc de la librería (`mvn javadoc:javadoc`) como «manual» para quien la usa.

### 11. Tests de clases

```java
class SocioTest {
    @Test
    void conMultaNoPuedePedirPrestamo() {
        var s = new Socio("Luis", "luis@example.com");
        s.sumarMulta(new BigDecimal("1.20"));
        assertFalse(s.puedePedirPrestamo());
        assertThrows(IllegalStateException.class, s::registrarPrestamo);
    }

    @Test
    void nombreEnBlancoNoSePermite() {
        assertThrows(IllegalArgumentException.class, () -> new Socio("  ", "x@example.com"));
    }
}
```

## Actividades

### Actividades de clase (no evaluables)

- **A1. Del enunciado al UML.** En parejas, subrayar sustantivos y verbos de un enunciado (parking de bicicletas) y dibujar el diagrama de clases con visibilidades. Puesta en común en la pizarra.
- **A2. `CuentaBancaria` encapsulada.** Implementar ingreso, retirada (sin saldo negativo), transferencia entre cuentas y número de cuenta autogenerado; tests de las reglas.
- **A3. Rompe la encapsulación.** Dada una clase con todos los atributos públicos, encontrar 3 formas de dejar un objeto en estado inválido y refactorizarla.
- **A4. Record o clase.** Para 6 entidades (punto, alumno, fecha de examen, carrito de la compra, color RGB, cuenta), decidir si conviene *record*, clase o *enum* y justificar.
- **A5. Mi primera librería.** Crear `biblio-util`, instalarla con `mvn install` y usarla desde otro proyecto.
- **A6. Kata `Fraccion`.** Clase inmutable con simplificación en el constructor, suma, producto, `equals`/`hashCode` coherentes y tests.

### Práctica evaluable

**P4 · Gestor de reservas de un aula de estudio.** Modelar e implementar las clases `Estudiante`, `Puesto`, `Reserva` (*record*) y `SalaEstudio` con: atributos privados y validación en constructores; constructores sobrecargados y encadenados; contador estático de reservas y una clase de utilidad estática `Horarios`; un *enum* `Franja`; `toString`, `equals` y `hashCode`; organización en paquetes `modelo`, `servicio`, `app` y `util`; la clase de utilidad se publica como librería Maven aparte y se usa como dependencia. Programa principal de consola que demuestra los casos de uso. Tests JUnit de las reglas (no reservar un puesto ocupado, máximo 2 reservas por estudiante y día).

**Conexión con el mundo real:** equivale a implementar el **modelo de dominio** de una aplicación de reservas a partir de un diagrama de clases y extraer a una librería interna el código común que reutilizan varios proyectos del equipo.

Entregables: dos repositorios (aplicación y librería), diagrama UML (imagen o PlantUML/Mermaid en el README), tests en verde en la CI.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA4.a / RA4.b | Clases bien estructuradas, coherentes con el UML y con las convenciones. | Clases correctas con alguna desviación del diseño. | Clases mal estructuradas o que no compilan. |
| RA4.c | Métodos con una sola responsabilidad que mantienen las invariantes; sin *setters* innecesarios. | Métodos correctos con algún *setter* que rompe reglas. | Lógica fuera de las clases o atributos manipulados desde fuera. |
| RA4.d | Constructores sobrecargados, encadenados y con validación; *record* con constructor compacto. | Constructores correctos sin validación completa. | Objetos que pueden quedar en estado inválido. |
| RA4.e | Programa principal que ejercita todos los casos de uso; tests de las reglas en verde. | Programa que usa las clases con algún caso sin cubrir. | No se instancian ni usan las clases. |
| RA4.f | Visibilidad mínima necesaria en clases y miembros; paquetes por responsabilidad. | Visibilidad correcta con excepciones injustificadas. | Atributos públicos o todo en un paquete. |
| RA4.h | Miembros estáticos usados donde corresponde (contador, utilidades) y justificados. | Uso correcto pero con algún `static` innecesario. | No hay miembros estáticos o se usan para evitar crear objetos. |
| RA4.i | Librería separada, instalada y usada como dependencia, con Javadoc. | Librería usada pero sin documentación o con problemas de versión. | No se crea ni usa una librería de clases. |

### Proyecto integrador · incremento I4 (hito PI-1, versión v0.1)

Refactorizar el gestor de biblioteca en las clases `Libro`, `Socio`, `Prestamo` y `Biblioteca`, organizadas en paquetes, con tests de las historias HU01–HU03. Publicar la versión v0.1 como *GitHub Release* con el `.jar` en el *Sprint 1*.

## Recursos

- **Documentación oficial:** [dev.java · Classes and objects](https://dev.java/learn/classes-objects/) · [dev.java · Records](https://dev.java/learn/records/) · [dev.java · Enums](https://dev.java/learn/classes-objects/enums/) · [Tutorial de Java (Oracle): Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html) · [JEP 513: Flexible Constructor Bodies](https://openjdk.org/jeps/513) · [Maven: Introduction to the Build Lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html).
- **Herramientas:** IntelliJ IDEA (*Generate* `Alt+Insert` para constructores, `equals`/`hashCode`), PlantUML o Mermaid para diagramas, Maven (`mvn install`).
