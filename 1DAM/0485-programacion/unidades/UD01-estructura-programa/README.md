# UD01 · Estructura de un programa, entorno y elementos del lenguaje

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0485 Programación | 1.º DAM | 16 h ≈ 19 sesiones | RA1 (100 % de esta UD) |

## Criterios de evaluación

> Fuente: RD 405/2023, anexo I, MP0485, RA1, criterios a)–i) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.a | Se han identificado los bloques que componen la estructura de un programa informático. | RD 405/2023, anexo I, MP0485, RA1.a | Cuestionario en aula + P1 (comentario de bloques) + PR1 |
| RA1.b | Se han creado proyectos de desarrollo de aplicaciones. | RD 405/2023, anexo I, MP0485, RA1.b | P1 (proyecto Maven en Classroom) + observación |
| RA1.c | Se han utilizado entornos integrados de desarrollo. | RD 405/2023, anexo I, MP0485, RA1.c | Observación (ejecución, depurador básico, atajos) + P1 |
| RA1.d | Se han identificado los distintos tipos de variables y la utilidad específica de cada uno. | RD 405/2023, anexo I, MP0485, RA1.d | Cuestionario + PR1 |
| RA1.e | Se ha modificado el código de un programa para crear y utilizar variables. | RD 405/2023, anexo I, MP0485, RA1.e | P1 + katas |
| RA1.f | Se han creado y utilizado constantes y literales. | RD 405/2023, anexo I, MP0485, RA1.f | P1 + PR1 |
| RA1.g | Se han clasificado, reconocido y utilizado en expresiones los operadores del lenguaje. | RD 405/2023, anexo I, MP0485, RA1.g | P1 + PR1 |
| RA1.h | Se ha comprobado el funcionamiento de las conversiones de tipo explícitas e implícitas. | RD 405/2023, anexo I, MP0485, RA1.h | P1 (apartado de conversiones) + PR1 |
| RA1.i | Se han introducido comentarios en el código. | RD 405/2023, anexo I, MP0485, RA1.i | P1 (rúbrica de comentarios) |

## Objetivos de aprendizaje

Al terminar la unidad el alumnado será capaz de:

1. Explicar qué es un programa, cómo se compila y ejecuta Java (código fuente → *bytecode* → JVM) e identificar sus bloques.
2. Instalar el JDK 25, crear un proyecto Maven en IntelliJ, ejecutarlo y subirlo a GitHub Classroom.
3. Declarar variables de los tipos primitivos y `String` eligiendo el tipo adecuado, y distinguir variables locales, de instancia y de clase.
4. Usar literales, constantes (`final`) y operadores en expresiones, conociendo su precedencia.
5. Predecir y comprobar el resultado de conversiones implícitas, explícitas (*cast*) y entre texto y número.
6. Comentar el código con comentarios de línea, de bloque y Javadoc.

## Contenidos

> Contenidos básicos que cubre la unidad. Fuente: RD 405/2023, anexo I, MP0485, bloque «Identificación de los elementos de un programa informático» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)): estructura y bloques fundamentales; variables; tipos de datos; literales; constantes; operadores y expresiones; conversiones de tipo; comentarios.

### 1. Programa, lenguaje y paradigmas

- **Programa:** conjunto de instrucciones que procesa datos de entrada para producir una salida. **Algoritmo:** secuencia finita y ordenada de pasos; se puede expresar en pseudocódigo o diagrama de flujo antes de codificar.
- **Lenguajes compilados vs interpretados.** Java es un caso híbrido: `javac` compila a *bytecode* (`.class`) y la **JVM** lo interpreta y compila *just-in-time*. Por eso el mismo `.class` funciona en Windows, Linux o macOS (*write once, run anywhere*).
- **JDK vs JRE vs JVM.** El JDK incluye compilador, JVM, librerías y herramientas (`javac`, `java`, `jshell`, `javadoc`, `jar`). Usaremos **Eclipse Temurin 25 LTS**.
- **Paradigmas:** imperativo/estructurado, orientado a objetos, funcional. Java es OO con elementos funcionales (lambdas, *streams*).

### 2. Instalación y entorno

1. Instalar Temurin 25 desde [adoptium.net](https://adoptium.net/) y comprobar en un terminal:
   ```bash
   java -version     # openjdk version "25..." 
   javac -version
   ```
2. Instalar IntelliJ IDEA (Community o Ultimate con licencia educativa). *New Project → Java → Build system: Maven → JDK 25*. GroupId `es.dam`, ArtifactId `prog-ud01`.
3. Estructura Maven estándar:
   ```
   prog-ud01/
   ├─ pom.xml                     configuración y dependencias
   ├─ src/main/java/es/dam/...    código de la aplicación
   ├─ src/test/java/es/dam/...    tests JUnit
   └─ target/                     resultado de compilar (no se sube a Git)
   ```
4. **Alternativas:** Gradle (sistema de construcción de Android, se verá en PMDM) y VS Code con *Extension Pack for Java*. Se comparan brevemente: Maven usa XML declarativo y convenciones fijas; Gradle usa un DSL en Kotlin/Groovy y es más flexible.
5. Funciones del IDE que hay que dominar ya: ejecutar (`Mayús+F10`), depurar (`Mayús+F9`), punto de ruptura, autocompletado, *Reformat Code* (`Ctrl+Alt+L`), *Rename* (`Mayús+F6`), integración Git (*Commit*, *Push*).
6. **JShell** para experimentar: `jshell` → `int x = 7 / 2;` → `x ==> 3`.

### 3. Estructura y bloques de un programa Java

```java
package es.dam.ud01;                 // 1. Paquete: espacio de nombres

import java.time.LocalDate;          // 2. Importaciones

/**
 * Programa de ejemplo de la UD01.   // 3. Comentario de documentación (Javadoc)
 */
public class Hola {                  // 4. Declaración de clase (nombre = nombre del fichero)

    static final int CURSO = 1;      // 5. Miembros: constantes, atributos, métodos

    public static void main(String[] args) {   // 6. Punto de entrada
        String modulo = "Programación";        // 7. Sentencias dentro de un bloque { }
        System.out.println("Hola, " + modulo + " de " + CURSO + ".º DAM");
        System.out.println("Hoy es " + LocalDate.now());
    }
}
```

- Un **bloque** es lo que hay entre llaves y define el **ámbito** de las variables declaradas dentro.
- Cada sentencia termina en `;`. Java distingue mayúsculas y minúsculas.
- Convenciones de nombres: clases en `UpperCamelCase`, métodos y variables en `lowerCamelCase`, constantes en `MAYUSCULAS_CON_GUIONES`, paquetes en minúsculas.

**Java 25: ficheros compactos (JEP 512).** Para los primeros programas se puede omitir la clase y el `static`. La clase `java.lang.IO` simplifica la consola:

```java
// Fichero Saludo.java — se ejecuta directamente con: java Saludo.java
void main() {
    String nombre = IO.readln("¿Cómo te llamas? ");
    IO.println("Hola, " + nombre);
}
```

Se usa solo las dos primeras semanas; después se explica la forma completa `public static void main(String[] args)`, que es la que se encuentra en todo el código profesional.

### 4. Variables y tipos de datos

Una **variable** es un nombre asociado a una zona de memoria que guarda un valor de un tipo. Java es de **tipado estático**: el tipo se conoce en compilación.

| Tipo primitivo | Tamaño | Rango / uso | Literal de ejemplo |
|---|---|---|---|
| `byte` | 8 bits | −128 … 127 | `(byte) 10` |
| `short` | 16 bits | −32 768 … 32 767 | `(short) 300` |
| `int` | 32 bits | ±2 147 483 647 · entero por defecto | `42`, `0x2A`, `0b101010`, `1_000_000` |
| `long` | 64 bits | enteros grandes, milisegundos | `9_000_000_000L` |
| `float` | 32 bits | decimal de precisión simple | `3.14f` |
| `double` | 64 bits | decimal por defecto | `3.14`, `1.5e-3` |
| `char` | 16 bits | carácter Unicode | `'A'`, `'\n'`, `'ñ'` |
| `boolean` | — | `true` / `false` | `true` |

- **Tipos referencia:** `String`, arrays, cualquier clase. La variable guarda una referencia al objeto (UD02).
- **Clases de variables según su ámbito:**
  - *Locales*: dentro de un método o bloque; deben inicializarse antes de usarse.
  - *De instancia (atributos)*: pertenecen a cada objeto; tienen valor por defecto (0, `false`, `null`).
  - *De clase (`static`)*: compartidas por todos los objetos de la clase.
  - *Parámetros*: reciben valores en la llamada a un método.
- **Inferencia con `var`** (solo locales con inicializador): `var precio = 12.5;` → `double`. Se recomienda cuando el tipo es evidente en la parte derecha.

```java
int ejemplares = 3;
double precioDia = 0.50;
char categoria = 'B';
boolean disponible = ejemplares > 0;
String titulo = "El Quijote";
var diasPrestamo = 15;                 // int
```

> Error típico: `double` no es exacto (`0.1 + 0.2` → `0.30000000000000004`). Para dinero se usará `BigDecimal` (UD02).

### 5. Literales y constantes

- **Literales:** valores escritos directamente en el código (`42`, `'x'`, `"texto"`, `true`, `null`).
- **Text blocks** para textos de varias líneas:
  ```java
  String menu = """
          === Gestor de biblioteca ===
          1. Alta de libro
          2. Listar
          0. Salir
          """;
  ```
- **Constantes:** `final` impide reasignar. Si además es de clase, `static final`:
  ```java
  public class Tarifas {
      public static final int DIAS_PRESTAMO = 15;
      public static final double MULTA_POR_DIA = 0.20;
  }
  ```
  Evitan los «números mágicos» y centralizan cambios.

### 6. Operadores y expresiones

| Categoría | Operadores | Notas |
|---|---|---|
| Aritméticos | `+ - * / %` | `/` entre enteros trunca: `7 / 2 == 3`; `%` resto: `7 % 2 == 1` |
| Incremento | `++ --` | `i++` (postfijo) devuelve el valor antiguo; `++i` el nuevo |
| Asignación | `= += -= *= /= %=` | `x += 2` equivale a `x = (tipo) (x + 2)` |
| Relacionales | `== != < <= > >=` | Devuelven `boolean`. Con objetos `==` compara referencias |
| Lógicos | `&& \|\| !` | Cortocircuito: `b != 0 && a / b > 1` es seguro |
| Bit a bit | `& \| ^ ~ << >> >>>` | Se ven brevemente (máscaras, permisos) |
| Condicional | `cond ? a : b` | Expresión, no sentencia |
| Concatenación | `+` con `String` | `"a" + 1 + 2` → `"a12"`; `1 + 2 + "a"` → `"3a"` |
| Tipo | `instanceof` | Se amplía en UD06 |

**Precedencia** (de mayor a menor, simplificada): `++ -- !` → `* / %` → `+ -` → relacionales → `== !=` → `&&` → `||` → `?:` → asignaciones. Ante la duda, paréntesis.

```java
int dias = 18;
double multa = (dias - Tarifas.DIAS_PRESTAMO) * Tarifas.MULTA_POR_DIA;   // 0.6000000000000001
boolean conRetraso = dias > Tarifas.DIAS_PRESTAMO;
String estado = conRetraso ? "con retraso" : "en plazo";
```

### 7. Conversiones de tipo

- **Implícitas (de ensanchamiento):** de un tipo «menor» a uno «mayor» sin pérdida: `byte → short → int → long → float → double`; `char → int`.
  ```java
  int i = 'A';          // 65
  long l = i;           // int → long
  double d = l;         // long → double
  ```
- **Promoción en expresiones:** `byte`, `short` y `char` se promocionan a `int`; si interviene un `double`, el resultado es `double`.
  ```java
  byte a = 10, b = 20;
  // byte c = a + b;    // ERROR: a + b es int
  byte c = (byte) (a + b);
  double media = (3 + 4) / 2;      // 3.0  (la división ya era entera)
  double media2 = (3 + 4) / 2.0;   // 3.5
  ```
- **Explícitas (*cast*, de estrechamiento):** pueden perder información.
  ```java
  double precio = 9.99;
  int euros = (int) precio;        // 9 (trunca, no redondea)
  int grande = 300;
  byte b2 = (byte) grande;         // 44 (desbordamiento: 300 - 256)
  long redondeado = Math.round(precio);  // 10
  ```
- **Texto ↔ número** (clases envolventes, se profundiza en UD02):
  ```java
  int n = Integer.parseInt("42");
  double x = Double.parseDouble("3.5");
  String s = String.valueOf(n);    // o "" + n
  ```

### 8. Comentarios

```java
// Comentario de una línea

/* Comentario de
   varias líneas */

/**
 * Comentario de documentación (Javadoc): describe la clase o el método.
 * @param dias días transcurridos desde el préstamo
 * @return importe de la multa en euros
 */
static double calcularMulta(int dias) { ... }
```

Buenas prácticas: comentar el **porqué**, no el qué; mantener los comentarios actualizados; no dejar código comentado en las entregas. En UD03 se genera la documentación HTML con `javadoc`.

### 9. Git y GitHub Classroom (primer día)

```bash
git config --global user.name "Nombre Apellido"
git config --global user.email "correo@ejemplo.com"
git clone https://github.com/<organizacion>/<repo-de-la-tarea>.git
git add .
git commit -m "P1: cálculo de la ficha de préstamo"
git push
```

El `.gitignore` del proyecto debe excluir `target/` y `.idea/`.

## Actividades

### Actividades de clase (no evaluables)

- **A1. Del algoritmo al código.** En parejas, escribir en pseudocódigo el cálculo «precio total de un alquiler de bicicleta por horas con descuento a partir de 3 h» y traducirlo a Java en un fichero compacto ejecutado con `java Alquiler.java`.
- **A2. Anatomía de un programa.** Dado un programa de 40 líneas, señalar con comentarios los bloques: paquete, importaciones, clase, constantes, `main`, sentencias, bloques anidados. Predecir qué variables son visibles en cada línea.
- **A3. JShell detective.** Predecir y comprobar en JShell: `7 / 2`, `7 / 2.0`, `7 % -3`, `(int) 3.99`, `(byte) 200`, `'a' + 1`, `(char) ('a' + 1)`, `"1" + 2 + 3`, `1 + 2 + "3"`, `0.1 + 0.2 == 0.3`, `Integer.MAX_VALUE + 1`.
- **A4. Tipo adecuado.** Para 12 datos (edad, DNI, precio, nota media, población mundial, letra de un aula, si está matriculado…) elegir tipo y justificar.
- **A5. Kata de conversión de temperaturas** con constantes y `printf` básico (`System.out.printf("%.1f%n", c)`).
- **A6. Git en parejas.** Cada miembro clona el repositorio de la pareja, añade una constante y un comentario, hace *commit* y *push*; se resuelve en grupo el primer conflicto de fusión.
- **A7. Bug hunt de tipos.** Programa con 8 errores de compilación y de lógica relacionados con tipos y conversiones (división entera, desbordamiento, `char` + `int`); localizarlos con el IDE y documentar la corrección en un comentario.

### Práctica evaluable

**P1 · Ficha de préstamo.** Proyecto Maven `p1-ficha-prestamo` en GitHub Classroom. El programa define los datos de un préstamo (título, ISBN como `String`, número de ejemplares, fecha como tres `int`, días transcurridos) y muestra una ficha con: días de retraso, multa (constante `MULTA_POR_DIA`), multa en céntimos como `int`, si supera el límite de 5 € (`boolean`) y la inicial del título como `char` en mayúscula. Incluye un apartado «Laboratorio de conversiones» con al menos 6 conversiones comentadas (implícitas, *cast* con pérdida, promoción, texto↔número) y su resultado.

**Conexión con el mundo real:** equivale a la primera tarea de una persona recién incorporada a un equipo: preparar el entorno, clonar el repositorio, hacer un cambio pequeño y bien comentado y subirlo con un *commit* claro.

Entregables: repositorio con `pom.xml`, código en `src/main/java/es/dam/p1`, `README.md` con captura de la ejecución y al menos 3 commits.

| Criterio (CE) | Excelente | Adecuado | Insuficiente |
|---|---|---|---|
| RA1.a | Identifica todos los bloques con comentarios y respeta la estructura y convenciones. | Estructura correcta con algún bloque no identificado. | Estructura incorrecta o no compila. |
| RA1.b / RA1.c | Proyecto Maven correcto, ejecuta desde el IDE, `.gitignore` adecuado, commits con mensajes claros. | Proyecto ejecutable con defectos menores (sin `.gitignore`, commits pobres). | No es un proyecto Maven o no se puede ejecutar. |
| RA1.d / RA1.e | Tipos elegidos óptimos y justificados; nombres significativos. | Tipos válidos pero mejorables. | Tipos incorrectos que provocan errores de cálculo. |
| RA1.f | Todas las magnitudes fijas son constantes `static final`; usa literales variados (incluido *text block*). | Usa constantes, con algún número mágico. | Sin constantes. |
| RA1.g | Expresiones correctas, uso de `%`, lógicos y ternario, paréntesis claros. | Expresiones correctas con algún error menor. | Errores de precedencia o resultados incorrectos. |
| RA1.h | Las 6 conversiones son correctas y su resultado está explicado. | 4–5 conversiones correctas o explicaciones incompletas. | Menos de 4 o sin explicación. |
| RA1.i | Javadoc de clase y método, comentarios útiles y no redundantes. | Comentarios presentes pero redundantes o escasos. | Sin comentarios. |

### Proyecto integrador · incremento I1

Presentación del encargo del cliente ficticio (una librería con servicio de préstamo, ver apartado 4 de la [programación didáctica](../../programacion-didactica.md)). Puesta en marcha: aceptar la tarea de GitHub Classroom, clonar el repositorio `gestor-biblioteca`, comprobar que el proyecto Maven compila y redactar el `README.md` inicial. Las historias de usuario están publicadas por el docente como *issues*. Implementar HU01 en una clase `Main` que muestre la ficha de un libro y calcule la fecha límite y la multa a partir de constantes. Se mantendrá todo el curso.

## Recursos

- **Documentación oficial:** [dev.java · Learn: Getting started](https://dev.java/learn/getting-started/) · [dev.java · Language basics](https://dev.java/learn/language-basics/) · [JEP 512: Compact Source Files and Instance Main Methods](https://openjdk.org/jeps/512) · [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/) · [Tutorial de Java (Oracle): Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html).
- **Herramientas:** Eclipse Temurin 25, IntelliJ IDEA, JShell, Git, GitHub Classroom.
