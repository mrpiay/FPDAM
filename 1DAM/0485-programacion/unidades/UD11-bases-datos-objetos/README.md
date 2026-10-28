# UD11 · Bases de datos orientadas a objetos (ObjectDB / JPA)

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 16 h ≈ 19 sesiones | RA8 (100 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA8, criterios a)–h) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA8.a | Se han identificado las características de las bases de datos orientadas a objetos. | RD 405/2023, anexo I, MP0485, RA8.a | Cuestionario en aula |
| RA8.b | Se ha analizado su aplicación en el desarrollo de aplicaciones mediante lenguajes orientados a objetos. | RD 405/2023, anexo I, MP0485, RA8.b | P11 (informe comparativo) + PI-3 |
| RA8.c | Se han instalado sistemas gestores de bases de datos orientados a objetos. | RD 405/2023, anexo I, MP0485, RA8.c | P11 (evidencias de instalación) + observación |
| RA8.d | Se han clasificado y analizado los distintos métodos soportados por los sistemas gestores para la gestión de la información almacenada. | RD 405/2023, anexo I, MP0485, RA8.d | Cuestionario + P11 (informe) |
| RA8.e | Se han creado bases de datos y las estructuras necesarias para el almacenamiento de objetos. | RD 405/2023, anexo I, MP0485, RA8.e | P11 |
| RA8.f | Se han programado aplicaciones que almacenen objetos en las bases de datos creadas. | RD 405/2023, anexo I, MP0485, RA8.f | P11 + PI-3 |
| RA8.g | Se han realizado programas para recuperar, actualizar y eliminar objetos de las bases de datos. | RD 405/2023, anexo I, MP0485, RA8.g | P11 + PI-3 |
| RA8.h | Se han realizado programas para almacenar y gestionar tipos de datos estructurados, compuestos y relacionados. | RD 405/2023, anexo I, MP0485, RA8.h | P11 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Explicar el desfase objeto-relacional y las características de las BDOO (identidad de objeto, objetos complejos, herencia, navegación por referencias, persistencia transparente) y compararlas con las BD relacionales, objeto-relacionales y los ORM.
2. Instalar ObjectDB (distribución completa con *Explorer* y servidor) y usarlo embebido desde Maven.
3. Definir clases persistentes (entidades), tipos embebidos y colecciones, y relaciones entre objetos.
4. Almacenar, recuperar, actualizar y eliminar objetos con `EntityManager` y transacciones.
5. Escribir consultas JPQL con expresiones, operadores, parámetros, *joins* y agregados.
6. Reconocer el modelo objeto-relacional de PostgreSQL (tipos compuestos, arrays, herencia de tablas) como alternativa.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Mantenimiento de la persistencia de los objetos» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): bases de datos orientadas a objetos; características de las bases de datos orientadas a objetos; instalación del gestor de bases de datos; creación de bases de datos; mecanismos de consulta; el lenguaje de consultas: sintaxis, expresiones, operadores; recuperación, modificación y borrado de información; tipos de datos objeto, atributos y métodos; tipos de datos colección.

Tecnología elegida y alternativas en [DEC-PROG-04](../../decisiones/DEC-PROG-04-bd-orientada-objetos.md).

### 1. Bases de datos orientadas a objetos: características

**Desfase objeto-relacional** (*impedance mismatch*): en UD10 hubo que traducir a mano objetos ↔ filas (`mapear(ResultSet)`), descomponer objetos compuestos en varias tablas y representar la herencia y las colecciones con tablas y claves ajenas.

Una **BDOO** almacena directamente los objetos del lenguaje:

| Característica | Significado |
|---|---|
| Identidad de objeto (OID) | Cada objeto tiene un identificador único independiente de sus valores |
| Objetos complejos | Atributos que son otros objetos, colecciones o arrays, sin descomponer en tablas |
| Encapsulación, tipos y clases | El esquema de la BD es el modelo de clases de la aplicación |
| Herencia y polimorfismo | Se guarda la jerarquía; una consulta sobre la superclase devuelve objetos de todas las subclases |
| Navegación por referencias | Se pasa de un objeto a otro siguiendo referencias (`prestamo.getSocio().getDireccion()`) |
| Persistencia transparente | Los cambios en objetos gestionados se guardan al confirmar la transacción |
| Lenguaje de consultas orientado a objetos | Consultas sobre clases y atributos, no sobre tablas (OQL del estándar ODMG; JPQL en ObjectDB) |

**Clasificación de enfoques de persistencia (RA8.d):**

| Enfoque | Ejemplos | Cómo se gestiona la información |
|---|---|---|
| BDOO nativa | ObjectDB, db4o (descontinuada), Versant, ObjectStore | API del lenguaje (JPA/JDO), consultas OO, navegación |
| Objeto-relacional | PostgreSQL, Oracle | SQL ampliado con tipos de usuario, arrays, herencia de tablas |
| ORM sobre relacional | JPA con Hibernate o EclipseLink | El ORM traduce objetos a tablas; el SGBD sigue siendo relacional |
| Relacional con JDBC | UD10 | SQL y mapeo manual |

Métodos de gestión de la información que ofrece un SGBDOO: acceso por identificador (`find`), navegación por referencias, lenguaje de consultas (JPQL), consultas con API tipada (*Criteria API*, se menciona), operaciones en lote (`UPDATE`/`DELETE` JPQL) y transacciones.

**Aplicación en el desarrollo (RA8.b):** adecuadas cuando el modelo es muy rico (CAD, simulación, grafos, aplicaciones embebidas, prototipos), con un único lenguaje que accede a los datos. Inconvenientes: poca estandarización entre productos, menos herramientas y menor implantación que las relacionales; por eso en la empresa predomina el ORM sobre BD relacional, que comparte la API JPA que se usa aquí.

### 2. Instalación del gestor

**Opción A · Distribución completa** (para ver el SGBD como producto):

1. Descargar el ZIP de ObjectDB desde [objectdb.com/download](https://www.objectdb.com/download) y descomprimirlo (p. ej. `C:\objectdb`).
2. Contenido relevante: `bin/objectdb.jar` (motor), lanzadores del *Explorer* y del servidor, `objectdb.conf` (configuración: puerto, usuarios, ruta de las BD), `db/` (BD de ejemplo) y documentación.
3. **ObjectDB Explorer:** herramienta gráfica para abrir un fichero `.odb`, navegar por los objetos y ejecutar consultas JPQL. Se inicia con el lanzador de `bin/` o con `java -cp objectdb.jar com.objectdb.Explorer`.
4. **Modo cliente-servidor:** `java -cp objectdb.jar com.objectdb.Server start` (puerto por defecto 6136; usuarios definidos en `objectdb.conf`). Conexión remota: `objectdb://localhost:6136/biblioteca.odb;user=admin;password=admin`.

> Los comandos y valores por defecto proceden del manual de ObjectDB; conviene comprobarlos con la versión descargada.

**Opción B · Embebida con Maven** (la que usan las prácticas):

```xml
<repositories>
  <repository>
    <id>objectdb</id>
    <name>ObjectDB Repository</name>
    <url>https://m2.objectdb.com</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>com.objectdb</groupId>
    <artifactId>objectdb-jk</artifactId>      <!-- variante para jakarta.persistence -->
    <version>2.9.5</version>
  </dependency>
  <dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.1.0</version>
  </dependency>
</dependencies>
```

Edición gratuita: hasta 10 clases de entidad y un millón de objetos por fichero ([condiciones](https://www.objectdb.com/database/purchase)), suficiente para el aula.

### 3. Crear la base de datos y la estructura

Con ObjectDB **no hay `CREATE TABLE`**: la BD se crea al abrirla por primera vez y el **esquema son las clases persistentes**, que se registran al guardar el primer objeto de cada clase.

```java
EntityManagerFactory emf = Persistence.createEntityManagerFactory(
        "objectdb:" + Path.of("datos", "biblioteca.odb").toAbsolutePath());   // se crea si no existe
EntityManager em = emf.createEntityManager();
// ... trabajar ...
em.close();
emf.close();
```

ObjectDB admite pasar la URL directamente en lugar de un `persistence.xml`; con otros proveedores JPA se define una unidad de persistencia.

**Clases persistentes:**

```java
@Embeddable                                          // tipo estructurado sin identidad propia
public class Direccion {
    private String calle;
    private String ciudad;
    private String cp;

    protected Direccion() { }                         // JPA necesita constructor sin argumentos
    public Direccion(String calle, String ciudad, String cp) {
        this.calle = calle; this.ciudad = ciudad; this.cp = cp;
    }
    public String getCiudad() { return ciudad; }
    @Override public String toString() { return calle + ", " + cp + " " + ciudad; }
}

@Entity
public class Socio {
    @Id @GeneratedValue
    private long id;
    private String dni;
    private String nombre;
    @Embedded
    private Direccion direccion;                      // objeto compuesto
    @ElementCollection
    private List<String> telefonos = new ArrayList<>();   // colección de valores
    @OneToMany(mappedBy = "socio")
    private List<Prestamo> prestamos = new ArrayList<>(); // objetos relacionados

    protected Socio() { }
    public Socio(String dni, String nombre, Direccion direccion) {
        this.dni = dni; this.nombre = nombre; this.direccion = direccion;
    }

    /** Método de negocio: los objetos guardados conservan su comportamiento. */
    public long prestamosActivos() {
        return prestamos.stream().filter(p -> !p.isDevuelto()).count();
    }
    // getters y setters…
}

@Entity
public abstract class Recurso {                       // la jerarquía se almacena tal cual
    @Id private String codigo;
    private String titulo;
    private int anio;
    @ElementCollection
    private Set<String> etiquetas = new HashSet<>();
    protected Recurso() { }
    protected Recurso(String codigo, String titulo, int anio) { this.codigo = codigo; this.titulo = titulo; this.anio = anio; }
    public abstract int diasPrestamo();
    // getters…
}

@Entity
public class Libro extends Recurso {
    private String autor;
    private int ejemplares;
    protected Libro() { }
    public Libro(String codigo, String titulo, int anio, String autor, int ejemplares) {
        super(codigo, titulo, anio); this.autor = autor; this.ejemplares = ejemplares;
    }
    @Override public int diasPrestamo() { return 15; }
    // getters y setters…
}

@Entity
public class Prestamo {
    @Id @GeneratedValue private long id;
    @ManyToOne private Socio socio;
    @ManyToOne private Recurso recurso;
    private LocalDate inicio;
    private LocalDate limite;
    private boolean devuelto;
    protected Prestamo() { }
    public Prestamo(Socio socio, Recurso recurso, LocalDate inicio) {
        this.socio = socio; this.recurso = recurso; this.inicio = inicio;
        this.limite = inicio.plusDays(recurso.diasPrestamo());
    }
    public boolean isDevuelto() { return devuelto; }
    public void devolver() { this.devuelto = true; }
}
```

Requisitos de una entidad JPA: clase **pública** de nivel superior (ObjectDB genera subclases dinámicas y falla con clases no públicas), no `final`, constructor sin argumentos (puede ser `protected`), atributos no `final`. Por eso las entidades no son *records*; los *records* siguen sirviendo como DTO para la vista. Atributos `transient` o `@Transient` no se guardan.

**Tipos de datos (RA8.h):** objeto (entidad, con identidad), estructurado/compuesto (`@Embeddable`, sin identidad propia), colección (`List`, `Set`, `Map` de valores con `@ElementCollection` o de entidades con relaciones) y relacionados (`@ManyToOne`, `@OneToMany`, `@OneToOne`, `@ManyToMany`).

### 4. Almacenar objetos

```java
EntityManager em = emf.createEntityManager();
try {
    em.getTransaction().begin();
    var ana = new Socio("12345678Z", "Ana Souto", new Direccion("Calle Mayor 1", "Ciudad A", "00001"));
    ana.getTelefonos().add("600111222");
    var libro = new Libro("L-001", "Memorias dun neno labrego", 1961, "Xosé Neira Vilas", 2);
    libro.getEtiquetas().addAll(Set.of("gallego", "clásico"));
    em.persist(ana);
    em.persist(libro);
    em.persist(new Prestamo(ana, libro, LocalDate.now()));
    em.getTransaction().commit();
} catch (RuntimeException e) {
    if (em.getTransaction().isActive()) em.getTransaction().rollback();
    throw e;
} finally {
    em.close();
}
```

Ciclo de vida: *nuevo* → `persist` → *gestionado* → `commit` (se escribe) → `close` → *separado* (`merge` para volver a gestionarlo) → `remove` → *eliminado*. Persistencia por alcance: en ObjectDB, los objetos referenciados desde uno gestionado también se guardan al confirmar (en JPA portable se indica con `cascade = CascadeType.PERSIST`).

### 5. Recuperar, actualizar y eliminar

```java
// Por identificador
Libro l = em.find(Libro.class, "L-001");

// Actualizar: modificar un objeto gestionado dentro de una transacción
em.getTransaction().begin();
l.setEjemplares(l.getEjemplares() + 1);              // no hace falta "UPDATE": se detecta el cambio
em.getTransaction().commit();

// Eliminar
em.getTransaction().begin();
em.remove(em.find(Prestamo.class, 1L));
em.getTransaction().commit();
```

### 6. El lenguaje de consultas JPQL

Sintaxis similar a SQL, pero sobre **clases y atributos**: `SELECT … FROM Clase alias [JOIN …] [WHERE …] [GROUP BY … HAVING …] [ORDER BY …]`.

```java
// Parámetros con nombre y consulta tipada
TypedQuery<Libro> q = em.createQuery(
        "SELECT l FROM Libro l WHERE l.anio < :anio ORDER BY l.titulo", Libro.class);
q.setParameter("anio", 1970);
List<Libro> antiguos = q.getResultList();

// Polimorfismo: devuelve libros, revistas y DVD
List<Recurso> todos = em.createQuery("SELECT r FROM Recurso r", Recurso.class).getResultList();
List<Recurso> soloDvd = em.createQuery("SELECT r FROM Recurso r WHERE TYPE(r) = Dvd", Recurso.class)
        .getResultList();

// Navegación por atributos embebidos y joins por relaciones
List<Prestamo> deCiudadA = em.createQuery("""
        SELECT p FROM Prestamo p JOIN p.socio s
        WHERE s.direccion.ciudad = :ciudad AND p.devuelto = false
        ORDER BY p.limite""", Prestamo.class)
        .setParameter("ciudad", "Ciudad A")
        .getResultList();

// Colecciones: MEMBER OF, SIZE, IS EMPTY
List<Recurso> enGallego = em.createQuery(
        "SELECT r FROM Recurso r WHERE 'gallego' MEMBER OF r.etiquetas", Recurso.class).getResultList();
List<Socio> sinTelefono = em.createQuery(
        "SELECT s FROM Socio s WHERE s.telefonos IS EMPTY", Socio.class).getResultList();
// En ObjectDB 2.9, IS EMPTY no admite la colección inversa (mappedBy) s.prestamos:
// para «socios sin préstamos» se usa NOT EXISTS (SELECT p FROM Prestamo p WHERE p.socio = s)

// Proyecciones y agregados
List<Object[]> porAutor = em.createQuery(
        "SELECT l.autor, COUNT(l), SUM(l.ejemplares) FROM Libro l GROUP BY l.autor HAVING COUNT(l) > 1",
        Object[].class).getResultList();
Long total = em.createQuery("SELECT COUNT(r) FROM Recurso r", Long.class).getSingleResult();

// Actualización y borrado masivos (dentro de una transacción)
int n = em.createQuery("UPDATE Prestamo p SET p.devuelto = true WHERE p.limite < :fecha")
          .setParameter("fecha", LocalDate.now().minusYears(1))
          .executeUpdate();
```

| Elemento | Ejemplos |
|---|---|
| Expresiones de ruta | `p.socio.direccion.ciudad` |
| Comparación | `=`, `<>`, `<`, `>=`, `BETWEEN`, `LIKE '%Rivas%'`, `IN ('A', 'B')`, `IS NULL` |
| Lógicos | `AND`, `OR`, `NOT` |
| Aritméticos y funciones | `+ - * /`, `UPPER`, `LOWER`, `LENGTH`, `CONCAT`, `SUBSTRING`, `ABS`, `CURRENT_DATE` |
| Colecciones | `MEMBER OF`, `IS EMPTY`, `SIZE(c)`, `JOIN` |
| Agregados | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` con `GROUP BY` / `HAVING` |
| Tipo | `TYPE(r) = Libro` |

Las mismas consultas se pueden ejecutar en ObjectDB Explorer para comprobarlas antes de escribirlas en el código.

### 7. Repositorio ObjectDB

`RepositorioObjectDb<T, ID> implements Repositorio<T, ID>` recibe la clase de la entidad y el `EntityManagerFactory`; cada método abre un `EntityManager`, usa transacción si modifica y lo cierra. La aplicación elige la implementación (memoria, JDBC u ObjectDB) por configuración, sin cambiar la GUI: se evidencia el valor de programar contra interfaces (RA7.i).

### 8. Alternativa: modelo objeto-relacional en PostgreSQL

Para comparar (RA8.d) y como plan B ([DEC-PROG-04](../../decisiones/DEC-PROG-04-bd-orientada-objetos.md)):

```sql
CREATE TYPE direccion AS (calle text, ciudad text, cp char(5));     -- tipo estructurado

CREATE TABLE socio (
    id        serial PRIMARY KEY,
    nombre    text NOT NULL,
    dir       direccion,                                          -- atributo de tipo objeto
    telefonos text[]                                              -- tipo colección
);

INSERT INTO socio (nombre, dir, telefonos)
VALUES ('Ana Souto', ROW('Calle Mayor 1', 'Ciudad A', '00001'), ARRAY['600111222']);

SELECT nombre, (dir).ciudad, telefonos[1] FROM socio WHERE (dir).ciudad = 'Ciudad A';

CREATE TABLE recurso (codigo text PRIMARY KEY, titulo text, anio int);
CREATE TABLE libro (autor text) INHERITS (recurso);               -- herencia de tablas
SELECT * FROM recurso;                                            -- incluye las filas de libro
```

Desde Java se accede con JDBC (UD10). Diferencias: sigue siendo SQL sobre tablas, la herencia de tablas tiene limitaciones (las claves primarias y ajenas no se heredan) y el mapeo a objetos sigue siendo manual.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Desfase objeto-relacional.** Partiendo del modelo de clases del gestor de biblioteca, diseñar en papel las tablas necesarias y contar cuántas líneas de código de mapeo hicieron falta en UD10. Debate: ¿qué desaparece con una BDOO?
- **A2. Instalación y exploración.** Instalar la distribución de ObjectDB, abrir la BD de ejemplo con el *Explorer*, navegar por objetos y ejecutar 5 consultas; arrancar el servidor y conectarse en remoto.
- **A3. Primeros objetos persistentes.** Guardar 20 objetos `Punto`/`Ruta` (embebidos y colecciones) y recuperarlos con `find` y con JPQL.
- **A4. Taller de JPQL.** 12 consultas con tests sobre una BD de ejemplo (filtros, rutas, `MEMBER OF`, `TYPE`, agregados, `UPDATE` masivo).
- **A5. Lo mismo en PostgreSQL.** Crear el tipo `direccion`, una tabla con array y herencia de tablas; comparar con ObjectDB en una tabla de ventajas e inconvenientes.

### Práctica evaluable

**P11 · Catálogo de un museo etnográfico.** Una pequeña asociación cultural quiere catalogar su colección: piezas (`Pieza` abstracta con `Herramienta`, `Textil` y `Fotografia`), cada una con procedencia (`@Embeddable Lugar`: parroquia, concello, provincia), lista de materiales y palabras clave (colecciones), y relación con `Donante` y con `Exposicion` (relaciones). La aplicación (consola o JavaFX) permite: crear la BD y almacenar piezas, donantes y exposiciones; buscar por concello, material, tipo de pieza o rango de fechas con JPQL; actualizar datos y mover piezas entre exposiciones; dar de baja piezas; y mostrar estadísticas (piezas por tipo y por donante). Evidencias de instalación de la distribución ObjectDB y consultas probadas en el *Explorer*. **Informe** (1–2 páginas en el README): características de las BDOO observadas en la práctica, comparación con la solución JDBC de UD10 y con PostgreSQL objeto-relacional, y en qué tipo de proyectos elegiría cada opción.

**Conexión con el mundo real:** equivale a desarrollar la **capa de persistencia de una aplicación con un modelo de dominio rico** (catalogación, inventario, colecciones) y a redactar el informe técnico con el que un equipo justifica la elección de la tecnología de almacenamiento.

Entregables: repositorio con PR revisada por el docente, CI en verde (tests con BD en fichero temporal), README con informe, capturas del *Explorer* y del servidor en marcha.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA8.a / RA8.b | El informe relaciona correctamente las características de las BDOO con lo observado y razona su aplicación frente a otras opciones. | Identifica las características sin relacionarlas con la práctica. | Informe ausente o con errores conceptuales. |
| RA8.c | Instalación completa documentada: *Explorer* y servidor funcionando, conexión remota probada. | Instalación parcial (solo embebida o solo *Explorer*). | No hay evidencias de instalación. |
| RA8.d | Clasifica BDOO, objeto-relacional, ORM y relacional, y los métodos de gestión (identificador, navegación, consultas, lote) con ejemplos propios. | Clasificación correcta sin ejemplos. | Clasificación incorrecta. |
| RA8.e | Modelo persistente correcto: entidades, jerarquía, embebidos, colecciones y relaciones bien anotados. | Modelo correcto con alguna estructura mal resuelta. | El modelo no se puede persistir. |
| RA8.f | Almacena objetos con transacciones y gestión de errores (*rollback*). | Almacena sin gestionar errores. | No almacena objetos. |
| RA8.g | Recupera (con `find` y JPQL parametrizado), actualiza y elimina correctamente; consultas variadas. | Operaciones correctas con consultas simples. | Faltan operaciones o fallan. |
| RA8.h | Gestiona tipos estructurados (embebidos), compuestos/colección y relacionados en consultas (`MEMBER OF`, rutas, `JOIN`). | Usa los tipos pero no los explota en consultas. | No usa tipos estructurados ni relaciones. |

### Proyecto integrador · incremento I11 (hito PI-3, versión v1.0)

Anotar el modelo del gestor de biblioteca como entidades JPA e implementar `RepositorioObjectDb`; elegir JDBC u ObjectDB en `config.properties`; consultas JPQL para las estadísticas; informe comparativo en el README (historia HU10). Publicar la versión v1.0 en el *Sprint 3* con defensa oral.

## Recursos

- **Documentación oficial:** [ObjectDB Manual](https://www.objectdb.com/java/jpa) (instalación, *Explorer*, servidor, JPQL) · [ObjectDB · descarga](https://www.objectdb.com/download) · [Jakarta Persistence 3.1 (especificación y JPQL)](https://jakarta.ee/specifications/persistence/3.1/) · [PostgreSQL: Composite Types](https://www.postgresql.org/docs/current/rowtypes.html), [Arrays](https://www.postgresql.org/docs/current/arrays.html) e [Inheritance](https://www.postgresql.org/docs/current/ddl-inherit.html).
- **Herramientas:** ObjectDB Explorer y servidor, PostgreSQL (servidor del aula o Docker) con pgAdmin o DBeaver.
