# UD09 · Pruebas de aplicaciones

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_22 Despliegue de aplicaciones | 2.º DAM | 17 h · ≈ 20 sesiones de 50 min (estimación; semanas 30–33) | RA8 (a–g, principal) · RA4.i (principal) · RA3.e (refuerzo) |

> Herramientas: JUnit 5, TestFX, Mockito, GitHub Actions, JMeter, VisualVM/JFR, OWASP Dependency-Check. Justificación en [DEC-DI-07](../../decisiones/DEC-DI-07-pruebas.md). Las pruebas unitarias y la CI empezaron en la [UD04](../UD04-componentes-visuales/README.md).

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA8.a | Se ha establecido una estrategia de pruebas. | [RD 405/2023, anexo I, 0488, RA8.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: plan de pruebas (alcance, niveles, tipos, riesgos, criterios de salida) |
| RA8.b | Se han realizado pruebas de integración de los distintos elementos. | [RD 405/2023, anexo I, 0488, RA8.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: integración ascendente (repositorio + SQLite) y descendente (ViewModel con *stubs*) |
| RA8.c | Se han realizado pruebas de regresión. | [RD 405/2023, anexo I, 0488, RA8.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: batería automática en CI en cada PR; prueba de regresión por cada defecto corregido |
| RA8.d | Se han realizado pruebas de volumen y estrés. | [RD 405/2023, anexo I, 0488, RA8.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: 100 000 registros, tiempos de la HU04 e informe con un gran volumen; JMeter con concurrencia sobre la BD |
| RA8.e | Se han realizado pruebas de seguridad. | [RD 405/2023, anexo I, 0488, RA8.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: inyección SQL, dependencias, secretos, servidor local de la UD06 y firma |
| RA8.f | Se han realizado pruebas de uso de recursos por parte de la aplicación. | [RD 405/2023, anexo I, 0488, RA8.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: memoria, CPU, hilos y tiempo de arranque con VisualVM/JFR |
| RA8.g | Se ha documentado la estrategia de pruebas y los resultados obtenidos. | [RD 405/2023, anexo I, 0488, RA8.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: plan, casos, informe de resultados e *issues* de defectos |
| RA4.i | Se han realizado pruebas para evaluar la usabilidad y accesibilidad de la aplicación. | [RD 405/2023, anexo I, 0488, RA4.i](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P9: test con usuarios (tareas + SUS) y auditoría de accesibilidad de la aplicación instalada |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Realización de pruebas», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Objetivo, importancia y limitaciones del proceso de prueba. Estrategias.
- Pruebas de integración: ascendentes y descendentes.
- Pruebas de sistema: configuración, recuperación, entre otras.
- Pruebas de uso de recursos.
- Pruebas de seguridad.
- Pruebas manuales y automáticas. Herramientas software para la realización de pruebas.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Explicar el objetivo y los límites de las pruebas y diseñar una estrategia proporcionada a los riesgos del producto.
2. Hacer pruebas de integración ascendentes y descendentes con *drivers* y *stubs*.
3. Mantener una batería de regresión automática en integración continua.
4. Hacer pruebas de sistema (configuración, recuperación, instalación), de volumen y estrés, de seguridad y de uso de recursos.
5. Evaluar la usabilidad y la accesibilidad con usuarios reales y con herramientas.
6. Documentar el plan, los casos, los defectos y el informe de resultados.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Objetivo, importancia y limitaciones (RA8.a)

- **Objetivo:** encontrar defectos y aportar información sobre la calidad para decidir si el producto puede entregarse. No se busca «demostrar que funciona».
- **Importancia:** cuanto más tarde se descubre un defecto, más cuesta corregirlo. Una aplicación de gestión con errores en la facturación tiene consecuencias económicas y legales.
- **Limitaciones:** las pruebas exhaustivas son imposibles. Las pruebas muestran la presencia de defectos, no su ausencia. Los recursos y el tiempo son limitados, así que **se prueba según el riesgo**. El [programa de certificación ISTQB](https://www.istqb.org/) recoge estos principios como referencia profesional; no es una norma.

**Estrategia de pruebas del gestor de taller:**

| Nivel | Qué | Cómo | Herramienta | Automática |
|---|---|---|---|---|
| Unitario | Validadores, cálculos, componentes | Caja blanca y negra | JUnit 5, TestFX | Sí, en CI |
| Integración | Repositorio ↔ SQLite, ViewModel ↔ repositorio, aplicación ↔ informes | Ascendente y descendente | JUnit + SQLite temporal, Mockito | Sí, en CI |
| Sistema | La aplicación instalada: funcionalidad, configuración, recuperación, volumen, seguridad y recursos | Casos de prueba sobre la VM | Manual + *scripts*, JMeter, VisualVM | Parcial |
| Aceptación | Historias de usuario con sus criterios de aceptación | Demostración al «cliente» | Manual | No |
| Usabilidad y accesibilidad | Tareas reales con usuarios; WCAG/EN 301549 | Test moderado + SUS; auditoría | Accessibility Insights, NVDA | Parcial |

La **pirámide de pruebas** propone muchas pruebas unitarias rápidas, menos de integración y pocas de extremo a extremo (las de interfaz son lentas y frágiles).

**Criterios de salida (ejemplo):** el 100 % de los casos de prioridad alta superados, ningún defecto crítico abierto, cobertura de líneas ≥ 70 % en el modelo y el ViewModel (medida con JaCoCo), SUS ≥ 68 y ningún fallo de nivel AA en la auditoría automática.

### 2. Pruebas de integración ascendentes y descendentes (RA8.b)

| Enfoque | Orden | Necesita | Ventaja | Inconveniente |
|---|---|---|---|---|
| **Ascendente** (*bottom-up*) | Primero los módulos de bajo nivel (repositorio + BD) y después los que los usan | ***Drivers***: código de prueba que invoca al módulo | Se prueba pronto la parte más crítica (datos) | La interfaz se ve tarde |
| **Descendente** (*top-down*) | Primero los módulos de alto nivel (ViewModel o interfaz) con los inferiores simulados | ***Stubs*** o *mocks* que sustituyen a los módulos inferiores | Pronto se tiene un esqueleto funcional que se puede enseñar | Los *stubs* pueden ocultar problemas reales |

**Ascendente:** el *driver* es la propia prueba, que trabaja contra un SQLite real temporal.

```java
class ClienteRepositoryIT {
    @TempDir Path tmp;
    ClienteRepository repo;

    @BeforeEach
    void preparar() throws Exception {
        Database db = new Database(tmp.resolve("test.db"));
        Esquema.crear(db);                         // ejecuta schema.sql
        repo = new ClienteRepository(db);
    }

    @Test
    void insertarYRecuperar() throws Exception {
        Cliente c = new Cliente("12345678Z", "Ana Pérez");
        repo.insert(c);
        assertTrue(c.getId() > 0);
        assertEquals("Ana Pérez", repo.findAll().get(0).getNombre());
    }

    @Test
    void nifDuplicadoLanzaExcepcion() throws Exception {
        repo.insert(new Cliente("12345678Z", "Ana"));
        assertThrows(SQLException.class, () -> repo.insert(new Cliente("12345678Z", "Otra")));
    }
}
```

**Descendente:** el ViewModel se prueba con un *stub* del repositorio creado con Mockito:

```java
@ExtendWith(MockitoExtension.class)
class ClientesViewModelTest {
    @Mock ClienteRepository repo;

    @Test
    void elFiltroBuscaPorNombreYNif() throws Exception {
        when(repo.findAll()).thenReturn(List.of(
                new Cliente("12345678Z", "Ana Pérez"),
                new Cliente("87654321X", "Luis Gómez")));
        ClientesViewModel vm = new ClientesViewModel(repo);
        vm.cargarSincrono();                        // variante sin Task para pruebas
        vm.filtroProperty().set("8765");
        assertEquals(1, vm.getFiltrados().size());
        assertEquals("Luis Gómez", vm.getFiltrados().get(0).getNombre());
    }
}
```

> Para poder probar así, el ViewModel recibe el repositorio por constructor (inyección de dependencias, UD03) y separa la carga síncrona del lanzamiento del `Task`. **El diseño facilita las pruebas.**

Maven separa las pruebas unitarias (`*Test`, `maven-surefire-plugin`) de las de integración (`*IT`, `maven-failsafe-plugin`, fase `verify`).

### 3. Pruebas de regresión (RA8.c)

Una **regresión** es un fallo en algo que antes funcionaba. Las medidas que se aplican:

- La batería completa (unitarias, integración y TestFX de los flujos principales) se ejecuta en **cada PR** con GitHub Actions (UD04). Una PR con pruebas en rojo no se fusiona.
- **Cada defecto corregido trae su prueba:** primero se escribe la prueba que reproduce el defecto (en rojo), después se corrige (en verde) y la *issue* enlaza la PR.
- Las pruebas de interfaz de los flujos críticos (alta de cliente, nueva orden, factura) se hacen con TestFX.
- La cobertura se mide con JaCoCo para detectar zonas sin pruebas, no como objetivo en sí.

```java
@Test
void altaDeClienteDesdeLaInterfaz(FxRobot robot) {
    robot.clickOn("#btnNuevo");
    robot.clickOn("#txtNif").write("12345678Z");
    robot.clickOn("#txtNombre").write("Ana Pérez");
    robot.clickOn("Aceptar");
    FxAssert.verifyThat("#tabla", TableViewMatchers.containsRow("12345678Z", "Ana Pérez"));
}
```

### 4. Pruebas de sistema: configuración, recuperación e instalación

| Tipo | Casos en el gestor de taller |
|---|---|
| **Configuración** | Windows 11 y Linux; escalado de pantalla al 100 % y al 150 %; idioma castellano y gallego; resolución mínima de 1366×768; con y sin micrófono o cámara; ruta de datos personalizada (UD08) |
| **Recuperación** | Matar el proceso mientras se guarda una orden: SQLite debe mantener la transacción íntegra. Fichero de BD corrupto o ausente: mensaje claro y opción de restaurar la copia. Perder el micrófono durante la escucha |
| **Instalación** | Instalar, actualizar (1.0.0 → 1.0.1), desinstalar y reinstalar en una VM limpia, en modo asistido y desatendido (UD08) |

Las transacciones se comprueban en código: guardar la orden y sus líneas en **una sola transacción** (`setAutoCommit(false)` … `commit()` / `rollback()`), y verificar que, si se lanza una excepción a mitad, no quedan líneas huérfanas.

### 5. Pruebas de volumen y estrés (RA8.d)

- **Volumen:** comportamiento con grandes cantidades de datos. Se generan datos realistas con [Datafaker](https://www.datafaker.net/) (100 000 clientes, 300 000 órdenes) y se mide:
  - Tiempo de carga de la tabla y respuesta del filtro, frente al criterio de la HU04 (< 1 s con 10 000 vehículos).
  - Generación del informe mensual con 50 000 líneas: tiempo y memoria.
  - Tamaño de la base de datos y efecto de los índices (`CREATE INDEX idx_vehiculo_matricula ON vehiculo(matricula)`, comparando antes y después con `EXPLAIN QUERY PLAN`).
- **Estrés:** comportamiento por encima de la carga prevista. Con **Apache JMeter** (*JDBC Connection Configuration* + *JDBC Request*, con el driver de sqlite-jdbc en `lib/`) se lanzan 20 hilos que insertan y leen a la vez sobre el mismo fichero. Se observa la aparición de `SQLITE_BUSY` (base de datos bloqueada), una limitación conocida de SQLite con escrituras concurrentes. Después se mitiga con `PRAGMA journal_mode=WAL` y `busy_timeout`, y se documenta el límite para el cliente (un taller con 3–5 puestos).

```java
@Test
@Tag("volumen")
void filtroCon100000ClientesEnMenosDeUnSegundo() {
    Faker f = new Faker(Locale.of("es"));
    List<Cliente> datos = IntStream.range(0, 100_000)
            .mapToObj(i -> new Cliente(String.format("%08dX", i), f.name().fullName()))
            .toList();
    ClientesViewModel vm = new ClientesViewModel(repoEnMemoria(datos));
    vm.cargarSincrono();
    long t0 = System.nanoTime();
    vm.filtroProperty().set("garcía");
    long ms = (System.nanoTime() - t0) / 1_000_000;
    assertTrue(ms < 1000, "El filtro ha tardado " + ms + " ms");
}
```

Las pruebas lentas se etiquetan (`@Tag("volumen")`) y se ejecutan en un *workflow* aparte o bajo demanda, no en cada PR.

### 6. Pruebas de seguridad (RA8.e)

Lista de comprobación inspirada en el [OWASP Top 10](https://owasp.org/www-project-top-ten/) y adaptada a una aplicación de escritorio:

| Riesgo | Prueba |
|---|---|
| Inyección SQL | Introducir `' OR '1'='1` y `'); DROP TABLE cliente;--` en el filtro y en los formularios. Revisar que todo el SQL usa `PreparedStatement` y que los informes no usan `$P!{}` con datos del usuario (UD05) |
| Componentes vulnerables | `mvn org.owasp:dependency-check-maven:check` (requiere una clave de la API del NVD) o Dependabot. Revisar los avisos de JasperReports, sqlite-jdbc y JNA y actualizar |
| Secretos expuestos | Buscar en el historial de Git contraseñas o el PFX (`git log -p`, o herramientas como gitleaks) |
| Superficie de red | El servidor HTTP de la UD06 solo escucha en `127.0.0.1`, solo admite el origen esperado y rechaza acciones fuera de la lista (comprobar con `netstat -ano` y peticiones con `curl`) |
| Integridad del ejecutable | `signtool verify`. Modificar un byte y comprobar que la verificación falla (UD08) |
| Datos personales | Ubicación y permisos de `gestor-taller.db`; que los *logs* no contengan datos de clientes; borrado al desinstalar si se pide |
| Entradas maliciosas | Ficheros CSV o JSON importados con contenido inesperado (campos enormes o caracteres de control) |

### 7. Pruebas de uso de recursos (RA8.f)

- **VisualVM** (se conecta al proceso en marcha): *heap* y GC, CPU, hilos (que el hilo `voz` y las `Task` terminen) y volcado de memoria para buscar fugas. Por ejemplo, abrir y cerrar 50 veces el diálogo de cliente: si la memoria no vuelve a la base tras el GC, hay escuchadores sin eliminar (UD03).
- **Java Flight Recorder** con un coste muy bajo en ejecución:
  ```bat
  :: En desarrollo, lanzando con la JVM
  java -XX:StartFlightRecording=duration=120s,filename=gestor-taller.jfr -jar gestor-taller-app.jar
  :: En la aplicación instalada: añadir la opción en app\GestorTaller.cfg (sección [JavaOptions])
  :: o generar la imagen con jpackage --java-options "-XX:StartFlightRecording=..."
  ```
  La grabación se analiza con **JDK Mission Control**: métodos calientes, asignaciones y bloqueos.
- **Métricas que se piden:** tiempo de arranque hasta la ventana visible, memoria en reposo y con 100 000 registros, CPU con la escucha de voz activa y tamaño instalado (jlink, UD08). En la parte web de la UD06, se usa el panel *Performance* de las DevTools para ver los FPS y la CPU de MediaPipe.

### 8. Usabilidad y accesibilidad de la aplicación final (RA4.i)

- **Test con usuarios:** 3–5 personas ajenas al proyecto hacen 5 tareas reales («Abre una orden para el vehículo 1234BCD y añade 2 horas de mano de obra») mientras se aplica el protocolo de pensar en voz alta. Se mide si completan cada tarea, el tiempo y los errores, y al final responden el **SUS** (UD02).
- **Accesibilidad:** Accessibility Insights for Windows (*FastPass*) sobre cada pantalla; recorrido solo con teclado; NVDA o Narrador; contraste; zoom y escalado al 200 %. Los criterios son los de WCAG 2.2 ([w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)) aplicados a software según EN 301 549, capítulo 11 ([ETSI EN 301 549 V3.2.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf)).
- Cada hallazgo se registra como *issue* con su gravedad y la PR que lo corrige.

### 9. Pruebas manuales y automáticas; documentación (RA8.g)

| Manual | Automática |
|---|---|
| Exploratorias, de usabilidad, de instalación en una VM, de aceptación | Unitarias, integración, regresión, volumen repetible, análisis de dependencias |
| Encuentran problemas inesperados; requieren criterio | Repetibles y baratas una vez escritas; solo encuentran lo previsto |

**Documentación** (en `docs/pruebas/`; estructura propuesta por el docente):

1. **Plan de pruebas:** objetivo, alcance (qué entra y qué no), riesgos priorizados, niveles y tipos, entorno (VM, versiones, datos), herramientas, criterios de entrada y salida, calendario y responsables dentro del equipo.
2. **Casos de prueba:** ID, historia de usuario o requisito, prioridad, precondiciones, pasos, datos, resultado esperado, resultado obtenido y estado. Pueden mantenerse como tabla Markdown o hoja de cálculo; los automáticos remiten a su clase de prueba.
3. **Defectos:** *issues* con una plantilla (pasos para reproducir, esperado/obtenido, entorno, gravedad, evidencias) enlazadas a la PR que los corrige.
4. **Informe de resultados:** casos ejecutados, superados y fallidos; defectos por gravedad; métricas de volumen, recursos y SUS; cobertura; riesgos residuales; y recomendación de entrega (sí/no, con condiciones).

> **Alternativa.** En .NET: xUnit o NUnit, Moq, FlaUI para la interfaz y dotMemory o PerfView. En Electron: Playwright y el panel de rendimiento de Chromium. La estrategia, los niveles y la documentación son los mismos.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Matriz de riesgos.** Por equipos, priorizar las funcionalidades del gestor de taller por probabilidad e impacto del fallo y derivar de ahí la estrategia.
- **A2. *Driver* y *stub*.** Hacer la misma integración (ViewModel ↔ repositorio) de forma ascendente y descendente. Comparar qué detecta cada enfoque.
- **A3. Regresión dirigida.** El docente introduce un defecto en una rama; el equipo escribe la prueba que lo detecta y comprueba que la CI lo bloquea.
- **A4. Datos masivos.** Generar 100 000 registros con Datafaker y medir la tabla y el filtro, con y sin índice.
- **A5. Estrés con JMeter.** Plan con 20 hilos JDBC sobre SQLite; observar `SQLITE_BUSY` y mitigarlo con WAL.
- **A6. Caza de fugas.** Con VisualVM, localizar una fuga de memoria provocada por un escuchador y corregirla.
- **A7. Ataque y defensa.** Equipos cruzados intentan inyección SQL y abuso del servidor local de la aplicación de otro equipo (en la VM), y el equipo atacado documenta las correcciones.

### Práctica evaluable

**P9 · Plan y ejecución de pruebas del gestor de taller 1.0 (hito H9, `v1.0.1`).**

1. Plan de pruebas basado en riesgos.
2. Pruebas de integración ascendentes y descendentes automatizadas.
3. Batería de regresión en CI con una prueba por cada defecto corregido en la versión.
4. Volumen (100 000 registros, criterio de la HU04) y estrés (JMeter).
5. Seguridad según la lista de comprobación, con informe de dependencias (HU23).
6. Uso de recursos con VisualVM/JFR y una mejora medida antes y después.
7. Sistema: configuración, recuperación e instalación en una VM.
8. Test de usabilidad con al menos 3 usuarios y SUS, y auditoría de accesibilidad.
9. Informe final con recomendación de entrega, y versión `1.0.1` que corrija los defectos prioritarios.

Las pruebas de usabilidad y seguridad se hacen **de forma cruzada entre equipos**.

**Conexión con el mundo real:** antes de entregar, el cliente pide garantías de que la aplicación aguanta los datos de varios años, no pierde información si se cae el equipo, no expone los datos de sus clientes y la pueden usar todas las personas de la plantilla. El plan y el informe de pruebas son la evidencia de esa calidad, y la batería de regresión permite seguir evolucionando el producto sin miedo.

Entregables: etiqueta `v1.0.1`, `docs/pruebas/` (plan, casos e informe), *issues* de defectos enlazadas, *workflow* de CI en verde, plan de JMeter (`.jmx`), capturas o ficheros JFR y resultados del SUS. Defensa presencial con demostración de una prueba de cada tipo.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA8.a | Estrategia basada en riesgos, con niveles, tipos, entornos y criterios de salida medibles | Estrategia completa pero genérica | Sin estrategia o como lista de pruebas sueltas |
| RA8.b | Integración ascendente y descendente automatizadas, justificando qué detecta cada una | Solo un enfoque | Sin pruebas de integración |
| RA8.c | Regresión completa en CI; cada defecto corregido tiene su prueba enlazada | Regresión en CI sin trazabilidad de defectos | Sin regresión automatizada |
| RA8.d | Volumen y estrés medidos, con límites identificados y mitigados (índices, WAL) | Mediciones sin análisis ni mejora | Sin pruebas de volumen o estrés |
| RA8.e | Lista de comprobación completa, dependencias analizadas, vulnerabilidades corregidas y prueba cruzada | Pruebas parciales | Sin pruebas de seguridad |
| RA8.f | Métricas de memoria, CPU, hilos y arranque, con una mejora demostrada | Métricas sin mejora | Sin medición de recursos |
| RA8.g | Plan, casos, defectos e informe completos, claros y con recomendación de entrega razonada | Documentación parcial | Sin documentación |
| RA4.i | Test con 3 o más usuarios, SUS calculado, auditoría de accesibilidad y hallazgos corregidos | Test o auditoría, pero no ambos | Sin evaluación de usabilidad ni accesibilidad |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) · [Mockito](https://site.mockito.org/) · [TestFX](https://github.com/TestFX/TestFX) · [JaCoCo](https://www.jacoco.org/jacoco/) · [Maven Failsafe](https://maven.apache.org/surefire/maven-failsafe-plugin/)
  - [Apache JMeter](https://jmeter.apache.org/usermanual/) · [Datafaker](https://www.datafaker.net/)
  - [VisualVM](https://visualvm.github.io/) · [JDK Mission Control](https://www.oracle.com/java/technologies/jdk-mission-control.html)
  - [OWASP Top 10](https://owasp.org/www-project-top-ten/) · [OWASP Dependency-Check](https://dependency-check.github.io/DependencyCheck/)
  - [SQLite: WAL](https://www.sqlite.org/wal.html) · [Accessibility Insights for Windows](https://accessibilityinsights.io/docs/windows/overview/)
  - [ISTQB](https://www.istqb.org/) (referencia profesional, no normativa)
- **Herramientas:** JUnit 5, TestFX, Mockito, JaCoCo, JMeter, Datafaker, VisualVM, JDK Mission Control, OWASP Dependency-Check, Accessibility Insights, NVDA.
