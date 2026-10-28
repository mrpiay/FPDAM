# UD07 · Colecciones, genéricos y operaciones agregadas

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 26 h ≈ 31 sesiones | RA6 (95 %): CE b, c, d, e, f, j; refuerzo de RA7.g/i (5 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA6, criterios b)–f) y j) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA6.b | Se han reconocido las librerías de clases relacionadas con tipos de datos avanzados. | RD 405/2023, anexo I, MP0485, RA6.b | Cuestionario en aula + PR3 |
| RA6.c | Se han utilizado listas para almacenar y procesar información. | RD 405/2023, anexo I, MP0485, RA6.c | P7 + PR3 |
| RA6.d | Se han utilizado iteradores para recorrer los elementos de las listas. | RD 405/2023, anexo I, MP0485, RA6.d | P7 + PR3 |
| RA6.e | Se han reconocido las características y ventajas de cada una de las colecciones de datos disponibles. | RD 405/2023, anexo I, MP0485, RA6.e | P7 (justificación de elecciones) + cuestionario |
| RA6.f | Se han creado clases y métodos genéricos. | RD 405/2023, anexo I, MP0485, RA6.f | P7 + PR3 |
| RA6.j | Se han utilizado operaciones agregadas para el manejo de información almacenada en colecciones. | RD 405/2023, anexo I, MP0485, RA6.j | P7 + PR3 + PI-2 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Describir la jerarquía del *Java Collections Framework* y elegir la colección adecuada (lista, conjunto, cola, mapa) y su implementación.
2. Usar `List`, `Set`, `Map` y `Deque` con sus operaciones habituales y con colecciones inmutables.
3. Recorrer colecciones con *for-each*, `Iterator` (incluido el borrado seguro) y `ListIterator`.
4. Ordenar con `Comparable` y `Comparator` encadenados.
5. Crear clases, interfaces y métodos genéricos con parámetros acotados y usar comodines.
6. Escribir lambdas y referencias a métodos, y procesar colecciones con *streams*: filtrado, transformación, reducción y recolección (`Collectors`).

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Aplicación de las estructuras de almacenamiento» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): estructuras estáticas y dinámicas; genericidad; colecciones: listas, conjuntos y diccionarios; operaciones agregadas: filtrado, reducción y recolección.

### 1. El *Java Collections Framework*

```
Iterable<E>
└─ Collection<E>
   ├─ SequencedCollection<E> (Java 21)
   │  ├─ List<E>         ArrayList, LinkedList            ordenada por posición, admite duplicados
   │  └─ Deque<E>        ArrayDeque, LinkedList           cola doble: pila y cola FIFO
   ├─ Set<E>             HashSet, LinkedHashSet           sin duplicados
   │  └─ SortedSet/NavigableSet → TreeSet                 ordenado
   └─ Queue<E>           PriorityQueue                    por prioridad
Map<K,V> (no es Collection)  HashMap, LinkedHashMap, TreeMap   diccionario clave → valor
```

| Necesito… | Interfaz | Implementación habitual | Coste típico |
|---|---|---|---|
| Secuencia con acceso por posición | `List` | `ArrayList` | `get(i)` O(1); insertar al principio O(n) |
| Insertar/quitar en los extremos | `Deque` | `ArrayDeque` | O(1) en extremos |
| Elementos únicos, sin orden | `Set` | `HashSet` | `contains` O(1) medio |
| Únicos en orden de inserción | `Set` | `LinkedHashSet` | O(1) medio |
| Únicos ordenados | `NavigableSet` | `TreeSet` | O(log n) |
| Buscar por clave | `Map` | `HashMap` | `get` O(1) medio |
| Claves ordenadas, rangos | `NavigableMap` | `TreeMap` | O(log n) |
| Procesar por prioridad | `Queue` | `PriorityQueue` | `poll` O(log n) |

Reglas: declarar con la interfaz (`List<Libro> l = new ArrayList<>();`), y para usar `HashSet`/`HashMap` con objetos propios, `equals` y `hashCode` coherentes (UD04); para `TreeSet`/`TreeMap`, `Comparable` o un `Comparator`. Las clases `Collections` y `Arrays` aportan utilidades (`sort`, `unmodifiableList`, `frequency`, `max`…).

### 2. Listas

```java
List<String> autores = new ArrayList<>();
autores.add("Rosalía de Castro");
autores.add("Manuel Rivas");
autores.add(0, "Emilia Pardo Bazán");        // inserta en una posición
autores.set(1, "Rosalía Castro");            // reemplaza
autores.remove("Manuel Rivas");              // por objeto
String primero = autores.getFirst();          // Java 21 (SequencedCollection)
boolean esta = autores.contains("Rosalía Castro");
int pos = autores.indexOf("Rosalía Castro");
autores.sort(Comparator.naturalOrder());

List<Integer> fijos = List.of(1, 2, 3);      // inmutable: add → UnsupportedOperationException
List<Integer> copia = new ArrayList<>(fijos);
```

Trampa con `List<Integer>`: `remove(1)` borra la **posición** 1; `remove(Integer.valueOf(1))` borra el **valor** 1.

`ArrayList` frente a `LinkedList`: en la práctica `ArrayList` es casi siempre mejor (localidad de memoria); `LinkedList` solo aporta como `Deque` y con inserciones mediante iterador.

### 3. Iteradores

```java
// for-each: usa un Iterator internamente; no permite borrar
for (Libro l : catalogo) { ... }

// Iterator explícito: borrado seguro durante el recorrido
Iterator<Prestamo> it = prestamos.iterator();
while (it.hasNext()) {
    Prestamo p = it.next();
    if (p.devuelto()) {
        it.remove();                          // borrar con la lista: ConcurrentModificationException
    }
}

// Equivalente moderno
prestamos.removeIf(Prestamo::devuelto);

// ListIterator: recorre en ambos sentidos y modifica
ListIterator<String> li = autores.listIterator();
while (li.hasNext()) {
    li.set(li.next().toUpperCase());
}
```

Hacer una colección propia recorrible con *for-each*: implementar `Iterable<T>`.

```java
public class Estanteria implements Iterable<Libro> {
    private final List<Libro> libros = new ArrayList<>();
    public void colocar(Libro l) { libros.add(l); }
    @Override public Iterator<Libro> iterator() { return libros.iterator(); }
}
```

### 4. Conjuntos y diccionarios

```java
Set<String> generos = new TreeSet<>(List.of("Novela", "Ensayo", "Novela", "Cómic"));
// [Cómic, Ensayo, Novela]  sin duplicados y ordenado

Set<String> a = new HashSet<>(Set.of("java", "sql", "git"));
Set<String> b = Set.of("java", "kotlin");
a.retainAll(b);                               // intersección: [java]

Map<String, Integer> prestamosPorSocio = new HashMap<>();
prestamosPorSocio.put("ana", 2);
prestamosPorSocio.merge("ana", 1, Integer::sum);          // 3
prestamosPorSocio.merge("luis", 1, Integer::sum);         // 1 (no existía)
int n = prestamosPorSocio.getOrDefault("eva", 0);         // 0
prestamosPorSocio.computeIfAbsent("eva", k -> 0);

for (Map.Entry<String, Integer> e : prestamosPorSocio.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}
// o: prestamosPorSocio.forEach((socio, total) -> System.out.println(socio + " → " + total));

Map<String, List<Libro>> porAutor = new TreeMap<>();
porAutor.computeIfAbsent(libro.getAutor(), k -> new ArrayList<>()).add(libro);
```

Cola y pila con `ArrayDeque`: `offer`/`poll` (cola), `push`/`pop` (pila). Ejemplo: lista de espera de reservas de un libro.

### 5. Ordenación: `Comparable` y `Comparator`

```java
public record Libro(String isbn, String titulo, String autor, int anio, Genero genero)
        implements Comparable<Libro> {
    @Override
    public int compareTo(Libro o) { return isbn.compareTo(o.isbn); }   // orden natural
}

List<Libro> lista = new ArrayList<>(catalogo);
Collections.sort(lista);                                            // natural
lista.sort(Comparator.comparing(Libro::autor)
                     .thenComparing(Libro::anio, Comparator.reverseOrder())
                     .thenComparing(Libro::titulo));
```

### 6. Genericidad

**Por qué:** seguridad de tipos en compilación y ausencia de *casts*. Sin genéricos (`List` «en bruto») el error aparece en ejecución.

```java
// Clase genérica
public class Par<A, B> {
    private final A primero;
    private final B segundo;
    public Par(A primero, B segundo) { this.primero = primero; this.segundo = segundo; }
    public A primero() { return primero; }
    public B segundo() { return segundo; }
}
// (con records: public record Par<A, B>(A primero, B segundo) { })

// Interfaz genérica: pieza central del proyecto integrador
public interface Repositorio<T, ID> {
    void guardar(T entidad);
    Optional<T> buscarPorId(ID id);
    List<T> buscarTodos();
    boolean eliminar(ID id);
}

// Implementación genérica en memoria
public class RepositorioMemoria<T, ID> implements Repositorio<T, ID> {
    private final Map<ID, T> datos = new LinkedHashMap<>();
    private final Function<T, ID> extraerId;

    public RepositorioMemoria(Function<T, ID> extraerId) { this.extraerId = extraerId; }

    @Override public void guardar(T e) { datos.put(extraerId.apply(e), e); }
    @Override public Optional<T> buscarPorId(ID id) { return Optional.ofNullable(datos.get(id)); }
    @Override public List<T> buscarTodos() { return List.copyOf(datos.values()); }
    @Override public boolean eliminar(ID id) { return datos.remove(id) != null; }
}

Repositorio<Libro, String> libros = new RepositorioMemoria<>(Libro::isbn);
```

```java
// Método genérico con parámetro acotado
public static <T extends Comparable<? super T>> T maximo(Collection<? extends T> c) {
    Iterator<? extends T> it = c.iterator();
    T max = it.next();
    while (it.hasNext()) {
        T x = it.next();
        if (x.compareTo(max) > 0) max = x;
    }
    return max;
}
```

- **Comodines:** `? extends T` para **leer** (productor), `? super T` para **escribir** (consumidor) — regla PECS.
- Limitaciones: no se pueden usar primitivos (`List<int>` no existe), ni `new T()`, ni arrays genéricos directos; los tipos genéricos se borran en ejecución (*type erasure*).
- `Optional<T>`: contenedor genérico para «puede no haber resultado» (`orElse`, `orElseThrow`, `ifPresent`, `map`).

### 7. Lambdas y referencias a métodos

Una **interfaz funcional** tiene un único método abstracto; una lambda es una implementación concisa.

| Interfaz (`java.util.function`) | Método | Ejemplo |
|---|---|---|
| `Predicate<T>` | `boolean test(T)` | `l -> l.anio() < 1900` |
| `Function<T,R>` | `R apply(T)` | `Libro::titulo` |
| `Consumer<T>` | `void accept(T)` | `System.out::println` |
| `Supplier<T>` | `T get()` | `ArrayList::new` |
| `BinaryOperator<T>` | `T apply(T, T)` | `Integer::sum` |
| `Comparator<T>` | `int compare(T, T)` | `Comparator.comparing(Libro::autor)` |

### 8. Operaciones agregadas (*streams*)

Un *stream* es una secuencia de elementos sobre la que se encadenan **operaciones intermedias** (perezosas, devuelven otro *stream*) y una **operación terminal** (produce el resultado). No modifica la colección original.

```java
List<Libro> catalogo = ...;

// Filtrado + transformación + recolección
List<String> clasicos = catalogo.stream()
        .filter(l -> l.anio() < 1900)
        .sorted(Comparator.comparing(Libro::anio))
        .map(Libro::titulo)
        .toList();                                   // Java 16+, lista inmutable

// Reducción
int totalPaginas = catalogo.stream().mapToInt(Libro::paginas).sum();
OptionalDouble mediaAnio = catalogo.stream().mapToInt(Libro::anio).average();
Optional<Libro> masAntiguo = catalogo.stream().min(Comparator.comparingInt(Libro::anio));
BigDecimal multas = prestamos.stream()
        .map(Prestamo::multa)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

// Recolección con Collectors
Map<Genero, Long> porGenero = catalogo.stream()
        .collect(Collectors.groupingBy(Libro::genero, TreeMap::new, Collectors.counting()));

Map<Boolean, List<Libro>> antesDe2000 = catalogo.stream()
        .collect(Collectors.partitioningBy(l -> l.anio() < 2000));

String autores = catalogo.stream()
        .map(Libro::autor).distinct().sorted()
        .collect(Collectors.joining(", ", "Autores: ", "."));

Map<String, Libro> porIsbn = catalogo.stream()
        .collect(Collectors.toMap(Libro::isbn, Function.identity()));

// Búsqueda y comprobaciones
boolean hayComics = catalogo.stream().anyMatch(l -> l.genero() == Genero.COMIC);
List<Libro> top3 = prestamos.stream()
        .collect(Collectors.groupingBy(Prestamo::libro, Collectors.counting()))
        .entrySet().stream()
        .sorted(Map.Entry.<Libro, Long>comparingByValue().reversed())
        .limit(3)
        .map(Map.Entry::getKey)
        .toList();
```

Buenas prácticas: lambdas cortas y sin efectos secundarios; preferir un bucle si el *stream* resulta menos legible; los *streams* de primitivos (`IntStream`) evitan *boxing*; un *stream* solo se consume una vez. Los *streams* paralelos se mencionan pero no se usan en 1.º.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Elige la colección.** 10 escenarios (historial del navegador, invitados únicos, ranking, diccionario gallego–castellano, cola de impresión…): interfaz e implementación con justificación de coste.
- **A2. Contador de palabras.** Leer un texto, contar la frecuencia de cada palabra con `Map.merge` y mostrar las 10 más frecuentes; repetirlo con *streams*.
- **A3. Borrado durante el recorrido.** Provocar `ConcurrentModificationException` y resolverlo con `Iterator.remove` y con `removeIf`.
- **A4. `HashSet` y `equals`.** Insertar en un `HashSet` objetos de una clase sin `hashCode`: observar duplicados y corregir.
- **A5. Caja genérica.** Implementar `Pila<T>` genérica con `ArrayDeque` y un método genérico `static <T> void intercambiar(List<T> l, int i, int j)`.
- **A6. Kata de *streams*.** 12 consultas con tests sobre una lista de 50 empleados (*records*): filtrar, ordenar, agrupar por departamento, salario medio, el mejor pagado por departamento, nombres concatenados.

### Práctica evaluable

**P7 · Analítica de ventas de una tienda en línea.** A partir de una lista de pedidos (*record* `Pedido` con cliente, fecha, líneas de producto, cantidades y precios) cargada en memoria por un `RepositorioMemoria<T, ID>` genérico implementado por el alumnado: (1) gestión de clientes (`Map`), categorías únicas (`Set` ordenado) y cola de pedidos pendientes (`Deque`), con justificación escrita de cada elección; (2) recorrido con `Iterator` para cancelar pedidos caducados; (3) método genérico `topN(Collection<T>, Comparator<? super T>, int)`; (4) informe con *streams*: facturación total y por mes, ticket medio, producto más vendido por categoría, clientes sin pedidos en 90 días, partición entre pedidos grandes y pequeños. Tests JUnit de cada consulta con un conjunto de datos fijo.

**Conexión con el mundo real:** equivale a programar la **capa de consultas y estadísticas** de un panel de ventas (*dashboard*) de un comercio electrónico, donde se combinan estructuras de datos adecuadas y consultas agregadas sobre colecciones.

Entregables: repositorio con PR revisada por el docente, CI en verde, `README.md` con la tabla «estructura → motivo de elección».

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA6.b / RA6.e | Elige la interfaz e implementación óptimas en cada caso y justifica costes y características. | Elecciones correctas con justificación incompleta. | Elecciones inadecuadas o sin justificar. |
| RA6.c | Listas usadas con operaciones adecuadas, inmutabilidad donde procede, sin errores de índice. | Uso correcto con alguna operación ineficiente. | Errores en el uso de listas. |
| RA6.d | `Iterator.remove` o `removeIf` para borrar durante el recorrido; `Iterable` propio si procede. | Recorridos correctos sin borrado seguro. | `ConcurrentModificationException` o recorridos erróneos. |
| RA6.f | Repositorio genérico y método genérico con acotación y comodines correctos; sin tipos en bruto. | Genéricos correctos sin acotación o con algún *cast*. | Sin genéricos o con tipos en bruto. |
| RA6.j | Consultas con *streams* correctas, legibles, con `Collectors` adecuados y sin efectos secundarios; tests en verde. | La mayoría de consultas correctas; algún *stream* poco legible. | Consultas incorrectas o resueltas solo con bucles. |

### Proyecto integrador · incremento I7

Sustituir el array del catálogo por colecciones (`List`, `Map` por ISBN, `Set` de géneros, `Deque` para listas de espera); introducir `Repositorio<T, ID>` y `RepositorioMemoria`; estadísticas con *streams* (historia HU06).

## Recursos

- **Documentación oficial:** [dev.java · The Collections Framework](https://dev.java/learn/api/collections-framework/) · [dev.java · Generics](https://dev.java/learn/generics/) · [dev.java · Lambda expressions](https://dev.java/learn/lambdas/) · [dev.java · The Stream API](https://dev.java/learn/api/streams/) · [Javadoc de `java.util.stream.Collectors`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Collectors.html) · [JEP 431: Sequenced Collections](https://openjdk.org/jeps/431).
- **Herramientas:** depurador de IntelliJ (*Stream Trace* para visualizar cada paso de un *stream*), JShell.
