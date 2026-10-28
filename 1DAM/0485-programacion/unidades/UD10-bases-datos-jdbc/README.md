# UD10 · Acceso a bases de datos relacionales con JDBC

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 20 h ≈ 24 sesiones | RA9 (95 %), refuerzo de RA5.h y RA3.d (5 %) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA9, criterios a)–g) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA9.a | Se han identificado las características y métodos de acceso a sistemas gestores de bases de datos. | RD 405/2023, anexo I, MP0485, RA9.a | Cuestionario en aula + PR4 |
| RA9.b | Se han programado conexiones con bases de datos. | RD 405/2023, anexo I, MP0485, RA9.b | P10 + PR4 |
| RA9.c | Se ha escrito un código para almacenar información en bases de datos. | RD 405/2023, anexo I, MP0485, RA9.c | P10 + PR4 |
| RA9.d | Se han creado programas para recuperar y mostrar información almacenada en bases de datos. | RD 405/2023, anexo I, MP0485, RA9.d | P10 + PR4 |
| RA9.e | Se han efectuado borrados y modificaciones sobre la información almacenada. | RD 405/2023, anexo I, MP0485, RA9.e | P10 + PR4 |
| RA9.f | Se han creado aplicaciones que muestren la información almacenada en bases de datos. | RD 405/2023, anexo I, MP0485, RA9.f | P10 (GUI) + PI-3 |
| RA9.g | Se han creado aplicaciones para gestionar la información presente en bases de datos. | RD 405/2023, anexo I, MP0485, RA9.g | P10 + PI-3 |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Describir los métodos de acceso a un SGBD desde una aplicación (API nativa, ODBC, JDBC, ORM) y la arquitectura de JDBC.
2. Conectarse a SQLite y a MySQL mediante JDBC, gestionando la configuración y el cierre de recursos.
3. Ejecutar sentencias DDL y DML con `Statement` y `PreparedStatement`, y explicar por qué las consultas parametrizadas evitan la inyección SQL.
4. Recuperar datos con `ResultSet` y convertirlos en objetos del modelo (patrón DAO/repositorio).
5. Mantener la integridad con restricciones de la BD y transacciones (`commit`/`rollback`).
6. Integrar el acceso a datos en una aplicación JavaFX que muestre y gestione la información.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Gestión de bases de datos» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): acceso a bases de datos, estándares, características; establecimiento de conexiones; almacenamiento, recuperación, actualización y eliminación de información en bases de datos.

Tecnología elegida y alternativas en [DEC-PROG-05](../../decisiones/DEC-PROG-05-acceso-bd.md). Se coordina con MP0484 Bases de datos, donde el alumnado aprende SQL.

### 1. Acceso a bases de datos: métodos y estándares

| Método | Descripción | Ejemplo |
|---|---|---|
| API nativa del SGBD | Librería específica de un fabricante | `libpq` (PostgreSQL), API C de MySQL |
| **ODBC** | Estándar de Microsoft/X-Open independiente del lenguaje | Conectar Excel o aplicaciones C a una BD |
| **JDBC** | API estándar de Java (`java.sql`); cada SGBD aporta su *driver* | Esta unidad |
| **ORM** (mapeo objeto-relacional) | Traduce objetos a tablas automáticamente; por encima de JDBC | JPA/Hibernate (UD11 y Acceso a datos) |

**Arquitectura JDBC:** aplicación → API JDBC (`java.sql`: `Connection`, `PreparedStatement`, `ResultSet`…) → `DriverManager` → *driver* del SGBD (JAR añadido con Maven) → SGBD. Hoy todos los *drivers* son de **tipo 4** (Java puro, protocolo de red del SGBD); los tipos 1–3 (puente ODBC, nativo, *middleware*) tienen interés histórico.

**SGBD embebido frente a cliente-servidor:** SQLite vive en un fichero y en el mismo proceso (sin usuarios ni red); MySQL/PostgreSQL son servidores con usuarios, permisos y acceso concurrente.

### 2. Conexión

```xml
<dependency>
  <groupId>org.xerial</groupId>
  <artifactId>sqlite-jdbc</artifactId>
  <version>3.50.3.0</version>
</dependency>
<!-- Alternativa MySQL: com.mysql:mysql-connector-j:9.4.0 -->
```

```java
public final class Conexion {
    private static final String URL = "jdbc:sqlite:biblioteca.db";
    // MySQL: "jdbc:mysql://localhost:3306/biblioteca", con usuario y contraseña
    // PostgreSQL: "jdbc:postgresql://localhost:5432/biblioteca"

    private Conexion() { }

    public static Connection abrir() throws SQLException {
        Connection c = DriverManager.getConnection(URL);
        try (Statement st = c.createStatement()) {
            st.execute("PRAGMA foreign_keys = ON");   // SQLite: activar claves ajenas en cada conexión
        }
        return c;
    }
}
```

- Desde JDBC 4 no hace falta `Class.forName(...)`: el *driver* se registra solo.
- Credenciales fuera del código (variables de entorno o fichero `db.properties` no versionado).
- Cada operación abre y cierra con *try-with-resources*; en aplicaciones reales se usa un *pool* de conexiones (HikariCP), que se menciona.
- `DatabaseMetaData` informa del SGBD y sus capacidades: `c.getMetaData().getDatabaseProductName()`.

### 3. Crear la estructura

```java
static void crearEsquema() throws SQLException {
    String sql = """
        CREATE TABLE IF NOT EXISTS socio (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            dni     TEXT NOT NULL UNIQUE,
            nombre  TEXT NOT NULL,
            email   TEXT
        );
        CREATE TABLE IF NOT EXISTS libro (
            isbn       TEXT PRIMARY KEY,
            titulo     TEXT NOT NULL,
            autor      TEXT NOT NULL,
            anio       INTEGER CHECK (anio BETWEEN 1450 AND 2100),
            ejemplares INTEGER NOT NULL DEFAULT 1 CHECK (ejemplares >= 0)
        );
        CREATE TABLE IF NOT EXISTS prestamo (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            socio_id  INTEGER NOT NULL REFERENCES socio(id),
            isbn      TEXT NOT NULL REFERENCES libro(isbn),
            inicio    TEXT NOT NULL,
            limite    TEXT NOT NULL,
            devuelto  INTEGER NOT NULL DEFAULT 0
        );
        """;
    try (Connection c = Conexion.abrir(); Statement st = c.createStatement()) {
        for (String sentencia : sql.split(";")) {
            if (!sentencia.isBlank()) st.executeUpdate(sentencia);
        }
    }
}
```

En proyectos reales el esquema se versiona con herramientas de migración (Flyway, Liquibase); se menciona como buena práctica.

### 4. Insertar (almacenar)

```java
public void insertar(Libro l) throws SQLException {
    String sql = "INSERT INTO libro (isbn, titulo, autor, anio, ejemplares) VALUES (?, ?, ?, ?, ?)";
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement(sql)) {
        ps.setString(1, l.isbn());
        ps.setString(2, l.titulo());
        ps.setString(3, l.autor());
        ps.setInt(4, l.anio());
        ps.setInt(5, l.ejemplares());
        ps.executeUpdate();                          // devuelve filas afectadas
    }
}

public int insertarSocio(String dni, String nombre, String email) throws SQLException {
    String sql = "INSERT INTO socio (dni, nombre, email) VALUES (?, ?, ?)";
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
        ps.setString(1, dni);
        ps.setString(2, nombre);
        ps.setString(3, email);
        ps.executeUpdate();
        try (ResultSet claves = ps.getGeneratedKeys()) {
            claves.next();
            return claves.getInt(1);                 // id autogenerado
        }
    }
}
```

**Inyección SQL.** Concatenar datos del usuario en la sentencia permite alterar la consulta:

```java
// MAL: si titulo vale  x' OR '1'='1  se devuelven todas las filas
String sql = "SELECT * FROM libro WHERE titulo = '" + titulo + "'";
```

`PreparedStatement` envía la sentencia y los parámetros por separado: el valor nunca se interpreta como SQL. Regla: **siempre** parámetros `?` para datos variables.

### 5. Recuperar y mostrar

```java
public List<Libro> buscarPorAutor(String texto) throws SQLException {
    String sql = "SELECT isbn, titulo, autor, anio, ejemplares FROM libro WHERE autor LIKE ? ORDER BY titulo";
    List<Libro> resultado = new ArrayList<>();
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement(sql)) {
        ps.setString(1, "%" + texto + "%");
        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                resultado.add(mapear(rs));
            }
        }
    }
    return resultado;
}

private static Libro mapear(ResultSet rs) throws SQLException {
    return new Libro(rs.getString("isbn"), rs.getString("titulo"), rs.getString("autor"),
                     rs.getInt("anio"), rs.getInt("ejemplares"));
}

public Optional<Libro> buscarPorIsbn(String isbn) throws SQLException {
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement("SELECT * FROM libro WHERE isbn = ?")) {
        ps.setString(1, isbn);
        try (ResultSet rs = ps.executeQuery()) {
            return rs.next() ? Optional.of(mapear(rs)) : Optional.empty();
        }
    }
}
```

- `ResultSet` es un cursor: `next()` avanza y devuelve `false` al final. Getters por nombre o por índice (desde 1).
- Valores nulos: `rs.getInt` devuelve 0; comprobar con `rs.wasNull()` o usar `rs.getObject("anio", Integer.class)`.
- Fechas: en SQLite se guardan como texto ISO (`LocalDate.toString()` / `LocalDate.parse`); en MySQL, `ps.setObject(i, localDate)` y `rs.getObject("inicio", LocalDate.class)`.
- Consultas con JOIN y agregados se recogen en *records* de vista (p. ej. `record PrestamoVista(String socio, String titulo, LocalDate limite)`).

### 6. Modificar y borrar

```java
public boolean actualizarEjemplares(String isbn, int ejemplares) throws SQLException {
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement("UPDATE libro SET ejemplares = ? WHERE isbn = ?")) {
        ps.setInt(1, ejemplares);
        ps.setString(2, isbn);
        return ps.executeUpdate() == 1;
    }
}

public boolean eliminar(String isbn) throws SQLException {
    try (Connection c = Conexion.abrir();
         PreparedStatement ps = c.prepareStatement("DELETE FROM libro WHERE isbn = ?")) {
        ps.setString(1, isbn);
        return ps.executeUpdate() == 1;
    } catch (SQLException e) {
        // Con claves ajenas activas, borrar un libro con préstamos viola la restricción.
        // El código de error depende del SGBD (SQLite: 19, SQLITE_CONSTRAINT; MySQL: 1451).
        throw new PersistenciaException("No se pudo borrar el libro " + isbn
                + " (¿tiene préstamos asociados?)", e);
    }
}
```

Borrado lógico (columna `activo`) frente a físico: se discute qué conviene en una biblioteca (histórico de préstamos).

### 7. Integridad y consistencia: transacciones

Un préstamo modifica dos tablas: si falla la segunda operación, la primera debe deshacerse.

```java
public void prestar(int socioId, String isbn, LocalDate hoy) throws SQLException, PrestamoException {
    try (Connection c = Conexion.abrir()) {
        c.setAutoCommit(false);                                  // inicio de transacción
        try (PreparedStatement restar = c.prepareStatement(
                 "UPDATE libro SET ejemplares = ejemplares - 1 WHERE isbn = ? AND ejemplares > 0");
             PreparedStatement insertar = c.prepareStatement(
                 "INSERT INTO prestamo (socio_id, isbn, inicio, limite) VALUES (?, ?, ?, ?)")) {

            restar.setString(1, isbn);
            if (restar.executeUpdate() == 0) {
                throw new PrestamoException("No quedan ejemplares disponibles de " + isbn);
            }
            insertar.setInt(1, socioId);
            insertar.setString(2, isbn);
            insertar.setString(3, hoy.toString());
            insertar.setString(4, hoy.plusDays(15).toString());
            insertar.executeUpdate();

            c.commit();                                          // todo o nada
        } catch (SQLException | PrestamoException e) {
            c.rollback();
            throw e;
        }
    }
}
```

Propiedades ACID; restricciones de la BD (`PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `CHECK`, `FOREIGN KEY`) como primera línea de defensa, más validación en la aplicación (UD05). Niveles de aislamiento: se mencionan (`c.setTransactionIsolation`). Operaciones por lotes: `addBatch`/`executeBatch` para importar muchos registros.

### 8. Repositorio JDBC y aplicación de gestión

La clase `RepositorioJdbcLibros implements Repositorio<Libro, String>` (interfaz de UD07) encapsula todo el SQL; la GUI de UD09 no cambia. Las excepciones `SQLException` se traducen a excepciones propias de la aplicación (`PersistenciaException extends RuntimeException`, ya usada en el apartado 6) para no filtrar detalles de JDBC a la vista. Las consultas lentas se lanzan con `Task` para no bloquear la interfaz.

```java
// En el controlador JavaFX
Task<List<Libro>> carga = new Task<>() {
    @Override protected List<Libro> call() { return repositorio.buscarTodos(); }
};
carga.setOnSucceeded(e -> libros.setAll(carga.getValue()));
carga.setOnFailed(e -> new Alert(Alert.AlertType.ERROR, carga.getException().getMessage()).show());
new Thread(carga).start();
```

Tests: base de datos SQLite en memoria (`jdbc:sqlite::memory:` dentro de una única conexión) o fichero temporal con `@TempDir`, creando el esquema en `@BeforeEach`.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Mapa de accesos.** Comparar en una tabla API nativa, ODBC, JDBC y ORM: portabilidad, rendimiento, nivel de abstracción y ejemplo.
- **A2. Primera conexión.** Conectar a SQLite, mostrar `DatabaseMetaData` y listar tablas; repetir contra el MySQL del módulo de Bases de datos cambiando solo URL y *driver*.
- **A3. Ataque y defensa.** Pantalla de *login* vulnerable con concatenación: explotarla con una inyección y corregirla con `PreparedStatement`.
- **A4. CRUD por consola** de la tabla `socio` con menú (reutiliza UD03).
- **A5. Todo o nada.** Transferencia entre dos cuentas con y sin transacción, provocando un fallo a mitad; comprobar el estado final.
- **A6. Importación por lotes.** Cargar un CSV de 10 000 filas con y sin `executeBatch` y medir el tiempo.

### Práctica evaluable

**P10 · Gestión de citas de una clínica veterinaria.** Base de datos SQLite con las tablas `cliente`, `mascota` y `cita` (claves ajenas y restricciones). Aplicación JavaFX con: listado de citas del día en una tabla (consulta con JOIN), filtro por fecha y veterinario, alta de clientes y mascotas, alta y modificación de citas, cancelación (borrado) con confirmación, y la operación «registrar visita» que en una transacción marca la cita como atendida e inserta el cargo en `factura`. Todo el SQL en clases repositorio con `PreparedStatement`; credenciales/URL en `db.properties`; tests de los repositorios con BD temporal. Demostración de que el mismo código funciona contra MySQL cambiando la configuración.

**Conexión con el mundo real:** equivale a una **aplicación de gestión con base de datos** para un negocio de servicios (citas, clientes, facturación), con la capa de acceso a datos separada, parametrizada contra inyección y con transacciones para no dejar datos inconsistentes.

Entregables: repositorio con PR revisada por el docente, CI en verde, script SQL del esquema y datos de ejemplo, `README.md` con el modelo de datos y capturas.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA9.a | El README explica el método de acceso elegido, la arquitectura JDBC y las diferencias SQLite/MySQL comprobadas. | Explicación correcta pero incompleta. | Sin explicación o con errores conceptuales. |
| RA9.b | Conexión configurable, recursos cerrados con *try-with-resources*, claves ajenas activas; funciona con dos SGBD. | Conexión correcta con un solo SGBD o configuración en el código. | Fugas de conexiones o no conecta. |
| RA9.c | Inserciones con `PreparedStatement`, claves generadas recuperadas y errores de restricción tratados. | Inserciones correctas sin recuperar claves o sin tratar errores. | Concatenación de SQL o inserciones fallidas. |
| RA9.d | Consultas con filtros y JOIN mapeadas a objetos, nulos y fechas bien tratados. | Consultas correctas con mapeo incompleto. | Consultas incorrectas. |
| RA9.e | Modificaciones y borrados con confirmación, comprobación de filas afectadas y transacción en la operación compuesta. | Modificaciones y borrados correctos sin transacción. | No modifica o deja datos inconsistentes. |
| RA9.f | La GUI muestra la información de la BD actualizada, sin bloquearse en cargas. | La GUI muestra datos con algún problema de refresco. | No muestra información de la BD. |
| RA9.g | Aplicación completa de gestión (alta, consulta, modificación, baja) con capa repositorio y tests. | Gestión completa con lógica SQL en los controladores. | Gestión incompleta. |

### Proyecto integrador · incremento I10

`RepositorioJdbc` para recursos, socios y préstamos sobre SQLite; préstamo y devolución en transacción; la GUI de UD09 pasa a usar la BD sin cambios en la vista (historia HU09).

## Recursos

- **Documentación oficial:** [Oracle · JDBC Basics](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html) · [Javadoc del paquete `java.sql` (Java SE 25)](https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/package-summary.html) · [sqlite-jdbc](https://github.com/xerial/sqlite-jdbc) · [SQLite: Foreign Key Support](https://www.sqlite.org/foreignkeys.html) · [MySQL Connector/J Developer Guide](https://dev.mysql.com/doc/connector-j/en/) · [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).
- **Herramientas:** DB Browser for SQLite, ventana *Database* de IntelliJ Ultimate o DBeaver, MySQL del módulo de Bases de datos (o Docker).
