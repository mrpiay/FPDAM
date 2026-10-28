# UD04 · Arquitectura, navegación y persistencia

> **Bloque MP0489_12 · Programación de dispositivos móviles.**
> Decisiones relacionadas: [DEC-PMDM-03](../../decisiones/DEC-PMDM-03-persistencia.md), [DEC-PMDM-09](../../decisiones/DEC-PMDM-09-contenidos-anadidos.md).

| Duración orientativa | RA trabajados |
|---|---|
| 18 h | RA2 (CE a, f, i) |

## Criterios de evaluación

| CE | Texto (RD 405/2023) | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.a | Se ha generado la estructura de clases necesaria para la aplicación. | RD 405/2023, anexo I, MP0489, RA2.a | P4 (arquitectura en capas) · PE |
| RA2.f | Se han utilizado las clases necesarias para establecer conexiones con almacenes de datos garantizando la persistencia. | RD 405/2023, anexo I, MP0489, RA2.f | P4 (Room + DataStore) · PE |
| RA2.i | Se han documentado los procesos necesarios para el desarrollo de las aplicaciones. | RD 405/2023, anexo I, MP0489, RA2.i | P4 (README técnico, KDoc, diagrama, CHANGELOG). Se completa en P6 |

## Objetivos de aprendizaje (propuesta del docente)

Al terminar la unidad el alumnado será capaz de:

1. Organizar una app en capas de interfaz y datos, con ViewModel, estado de interfaz inmutable y flujo unidireccional de datos.
2. Navegar entre pantallas con Navigation Compose, pasando argumentos con rutas tipadas.
3. Guardar preferencias con DataStore y datos estructurados con Room, y exponerlos como `Flow`.
4. Elegir el tipo de almacenamiento adecuado (preferencias, base de datos, ficheros privados o compartidos).
5. Documentar la arquitectura y los procesos de compilación y desarrollo, y probar la lógica con pruebas unitarias.

## Contenidos

### Contenidos básicos que cubre la unidad

> Bloque «Desarrollo de aplicaciones para dispositivos móviles».

- Componentes de una aplicación. Recursos.
- Gestión de las preferencias de la aplicación.
- Bases de datos y almacenamiento.
- Persistencia.

La arquitectura en capas, la navegación tipada y las pruebas unitarias son **contenidos añadidos** que apoyan RA2.a y RA2.i. Se justifican en [DEC-PMDM-09](../../decisiones/DEC-PMDM-09-contenidos-anadidos.md).

### Desarrollo de los contenidos (propuesta del docente)

### 1. Arquitectura recomendada (RA2.a)

```
ui/        Pantallas @Composable + ViewModel + UiState      (capa de interfaz)
data/      Repositorios + fuentes de datos (Room, DataStore, red)   (capa de datos)
domain/    Casos de uso, opcional cuando hay lógica compartida
di/        Contenedor de dependencias (manual o Hilt)
```

Principios:

- **Separación de responsabilidades:** cada clase tiene una sola razón para cambiar.
- **Fuente única de verdad:** en esta app, Room.
- **Flujo unidireccional:** el estado baja de la capa de datos a la interfaz y los eventos suben de la interfaz a la capa de datos.

```kotlin
data class ListaUiState(
    val items: List<Observacion> = emptyList(),
    val cargando: Boolean = true,
)

class ListaViewModel(private val repo: ObservacionesRepository) : ViewModel() {

    val uiState: StateFlow<ListaUiState> = repo.observarTodas()
        .map { ListaUiState(items = it, cargando = false) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), ListaUiState())

    fun borrarTodo() = viewModelScope.launch { repo.borrarTodas() }

    companion object {
        val Factory = viewModelFactory {
            initializer {
                val app = this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as CuadernoApp
                ListaViewModel(app.contenedor.observaciones)
            }
        }
    }
}

@Composable
fun ListaRoute(onAbrir: (Long) -> Unit, vm: ListaViewModel = viewModel(factory = ListaViewModel.Factory)) {
    val estado by vm.uiState.collectAsStateWithLifecycle()
    PantallaLista(estado.items, onAnadir = { onAbrir(0) }, onAbrir = onAbrir, onBorrarTodo = vm::borrarTodo)
}
```

- `viewModel()` está en `lifecycle-viewmodel-compose` y `collectAsStateWithLifecycle()` en `lifecycle-runtime-compose`. Este último deja de recoger datos cuando la app pasa a segundo plano.
- **Inyección de dependencias manual:** un `AppContainer` se crea en una clase `Application` (declarada en el manifiesto con `android:name=".CuadernoApp"`) y crea una sola vez la base de datos y los repositorios. En proyectos grandes se usa **Hilt** (se menciona como alternativa).

```kotlin
class CuadernoApp : Application() {
    lateinit var contenedor: AppContainer
    override fun onCreate() { super.onCreate(); contenedor = AppContainer(this) }
}

class AppContainer(context: Context) {
    private val db = Room.databaseBuilder(context, CuadernoDatabase::class.java, "cuaderno.db").build()
    val observaciones: ObservacionesRepository = RoomObservacionesRepository(db.observacionDao())
    val ajustes = AjustesRepository(context)
}
```

### 2. Navegación con Navigation Compose

Las rutas son clases `@Serializable`. Esto necesita el plugin `org.jetbrains.kotlin.plugin.serialization`.

```kotlin
@Serializable object Lista
@Serializable data class Detalle(val id: Long)   // id = 0 → observación nueva
@Serializable object Ajustes

@Composable
fun CuadernoNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController, startDestination = Lista) {
        composable<Lista> {
            ListaRoute(onAbrir = { id -> navController.navigate(Detalle(id)) })
        }
        composable<Detalle> {
            DetalleRoute(onVolver = { navController.popBackStack() })
        }
        composable<Ajustes> { AjustesRoute() }
    }
}

// En el ViewModel del detalle, los argumentos llegan por SavedStateHandle
class DetalleViewModel(handle: SavedStateHandle, repo: ObservacionesRepository) : ViewModel() {
    private val id = handle.toRoute<Detalle>().id
    // …
}
```

- La pila de navegación (*back stack*) responde al botón Atrás.
- Para no repetir pantallas en la pila se usan `navigate(..) { launchSingleTop = true }` y `popUpTo`.
- Para la navegación principal se usa una barra inferior (`NavigationBar`) o `NavigationSuiteScaffold`.
- **Navigation 3** es la nueva librería de Jetpack, en la que la pila de navegación la gestiona la propia app. Se menciona como evolución.

### 3. Preferencias con DataStore

DataStore sustituye a `SharedPreferences`: es asíncrono, transaccional y expone `Flow`.

```kotlin
private val Context.dataStore by preferencesDataStore(name = "ajustes")

data class Ajustes(val alias: String = "", val unidadesMetricas: Boolean = true)

class AjustesRepository(private val context: Context) {
    private object Claves {
        val ALIAS = stringPreferencesKey("alias")
        val METRICAS = booleanPreferencesKey("unidades_metricas")
    }

    val ajustes: Flow<Ajustes> = context.dataStore.data
        .catch { e -> if (e is IOException) emit(emptyPreferences()) else throw e }
        .map { p -> Ajustes(p[Claves.ALIAS] ?: "", p[Claves.METRICAS] ?: true) }

    suspend fun guardarAlias(alias: String) {
        context.dataStore.edit { it[Claves.ALIAS] = alias }
    }
}
```

> Hay que crear **una sola instancia** de DataStore por fichero. Por eso se declara como propiedad de nivel superior con el delegado `preferencesDataStore`.

### 4. Base de datos con Room

Room genera el código SQLite en tiempo de compilación con **KSP**. Hacen falta el plugin `com.google.devtools.ksp`, `implementation(room-runtime)`, `implementation(room-ktx)` y `ksp(room-compiler)`.

```kotlin
@Entity(tableName = "observaciones")
data class ObservacionEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val titulo: String,
    val categoria: String,
    val abundancia: Int,
    val fecha: Long = System.currentTimeMillis(),
    val latitud: Double? = null,
    val longitud: Double? = null,
    @ColumnInfo(name = "foto_uri") val fotoUri: String? = null,
)

@Dao
interface ObservacionDao {
    @Query("SELECT * FROM observaciones ORDER BY fecha DESC")
    fun observarTodas(): Flow<List<ObservacionEntity>>

    @Query("SELECT * FROM observaciones WHERE id = :id")
    fun observar(id: Long): Flow<ObservacionEntity?>

    @Query("SELECT * FROM observaciones WHERE titulo LIKE '%' || :texto || '%'")
    fun buscar(texto: String): Flow<List<ObservacionEntity>>

    @Upsert
    suspend fun guardar(obs: ObservacionEntity)

    @Delete
    suspend fun borrar(obs: ObservacionEntity)

    @Query("DELETE FROM observaciones")
    suspend fun borrarTodas()
}

@Database(entities = [ObservacionEntity::class], version = 1, exportSchema = true)
abstract class CuadernoDatabase : RoomDatabase() {
    abstract fun observacionDao(): ObservacionDao
}
```

- Las consultas que devuelven `Flow` se actualizan solas cuando cambian los datos.
- Las operaciones `suspend` se ejecutan fuera del hilo principal.
- **Migraciones:** al cambiar el esquema se sube `version` y se proporciona una `Migration`, o `@AutoMigration` si el esquema está exportado (con el plugin de Gradle de Room, `room { schemaDirectory("$projectDir/schemas") }`).
- **Relaciones:** `@Relation` y `@Embedded` (ver la documentación de Room en Recursos).
- **Inspección:** *App Inspection › Database Inspector* permite consultar y modificar la base de datos en ejecución.

El repositorio convierte las entidades al modelo de dominio:

```kotlin
interface ObservacionesRepository {
    fun observarTodas(): Flow<List<Observacion>>
    suspend fun guardar(o: Observacion)
    suspend fun borrarTodas()
}

class RoomObservacionesRepository(private val dao: ObservacionDao) : ObservacionesRepository {
    override fun observarTodas() = dao.observarTodas().map { lista -> lista.map { it.aModelo() } }
    override suspend fun guardar(o: Observacion) = dao.guardar(o.aEntidad())
    override suspend fun borrarTodas() = dao.borrarTodas()
}
```

`aModelo()` y `aEntidad()` son funciones de extensión que convierten entre la entidad de Room y el modelo de dominio.

### 5. Almacenamiento: qué usar para cada cosa

| Necesidad | Almacén | Permisos |
|---|---|---|
| Ajustes del usuario | DataStore (Preferences) | Ninguno |
| Datos estructurados y consultables | Room | Ninguno |
| Ficheros privados de la app (fotos y audios propios) | `context.filesDir` / `cacheDir` | Ninguno; se borran al desinstalar |
| Ficheros que el usuario quiere ver en la galería | `MediaStore` (almacenamiento con ámbito) | Ninguno para escribir los propios desde API 29 |
| Ficheros elegidos por el usuario | *Storage Access Framework* (`OpenDocument`, `CreateDocument`) | Ninguno |
| Datos compartidos con otras apps | `ContentProvider` / `FileProvider` | Los que defina el proveedor |

### 6. Pruebas de la lógica

Las pruebas unitarias del ViewModel usan un repositorio falso (*fake*) y `kotlinx-coroutines-test`. Room se prueba en `androidTest` con una base de datos en memoria (`Room.inMemoryDatabaseBuilder`).

```kotlin
class MainDispatcherRule(private val d: TestDispatcher = UnconfinedTestDispatcher()) : TestWatcher() {
    override fun starting(description: Description) = Dispatchers.setMain(d)
    override fun finished(description: Description) = Dispatchers.resetMain()
}

class ListaViewModelTest {
    @get:Rule val main = MainDispatcherRule()

    @Test fun muestraLasObservacionesDelRepositorio() = runTest {
        val repo = FakeObservacionesRepository(listOf(Observacion(1, "Garza real")))
        val vm = ListaViewModel(repo)
        backgroundScope.launch { vm.uiState.collect {} }   // activa WhileSubscribed
        assertEquals(1, vm.uiState.value.items.size)
    }
}
```

> Para poder inyectar un *fake*, el ViewModel debe depender de una **interfaz** de repositorio, no de la clase concreta. Este es un buen ejemplo práctico de RA2.a.

### 7. Documentación del desarrollo (RA2.i)

Un proyecto documentado incluye:

- **`README.md` técnico:** requisitos (versión de Android Studio y JDK), cómo clonar, compilar (`./gradlew assembleDebug`) y ejecutar las pruebas (`./gradlew test`), y la estructura de paquetes.
- **Diagrama de arquitectura y de clases** en Mermaid.
- **KDoc** en las clases públicas (`/** … */`, `@param`, `@return`). Se puede generar un sitio web con **Dokka**.
- **`CHANGELOG.md`** por *release* y mensajes de *commit* con convención (por ejemplo, *Conventional Commits*).
- **Decisiones de arquitectura (ADR) breves:** por qué Room, por qué DataStore.

> **Alternativa:**
> - En **Flutter**: Provider/Riverpod/Bloc para el estado, `go_router` para la navegación, `shared_preferences` y `drift`/`sqflite` para guardar datos.
> - En **KMP**: ViewModel y Room son multiplataforma; también se puede usar SQLDelight.
> - Con **Vistas**: `Fragment` + Navigation con XML y `LiveData`.

## Actividades (propuesta del docente)

### Actividades de clase (no evaluables)

- **A1. Refactorización guiada.** Llevar el estado del hito 1 a un `ViewModel` con `StateFlow`. Comprobar que sobrevive a la rotación sin `rememberSaveable`.
- **A2. Navegación.** Añadir las rutas `Lista`, `Detalle(id)` y `Ajustes` y probar el botón Atrás y la navegación predictiva.
- **A3. Codelab de Room.** Codelab oficial «Persist data with Room» (app *Inventory*).
- **A4. DataStore.** Pantalla de ajustes (alias, unidades, tema oscuro forzado) que se aplica en toda la app.
- **A5. Database Inspector.** Ejecutar consultas SQL en vivo y ver cómo la lista se actualiza sola.
- **A6. Primera prueba unitaria.** Repositorio falso y prueba del ViewModel con `runTest`.

### Práctica evaluable

**P4 · Hito 2 del «Observaciones de campo»: arquitectura y persistencia.** Se hace en equipo, con PR revisados y CI.

> **Conexión con el mundo real:** es el *sprint* en el que la app deja de ser una maqueta y empieza a guardar los datos del cliente. Se sigue la arquitectura que Google recomienda para apps en producción y se deja documentado el proyecto para que otra persona del equipo pueda continuarlo.

- Paquetes `ui/`, `data/` y `di/`. Un ViewModel por pantalla con su `UiState`. El repositorio depende de una interfaz.
- Navegación tipada entre lista, detalle o edición y ajustes.
- Persistencia con Room (CRUD completo y búsqueda por texto) y DataStore (al menos dos preferencias que cambian el comportamiento de la app).
- Al menos **tres pruebas unitarias** (ViewModel o repositorio) que pasan en la CI.
- **Documentación:** `README.md` técnico, diagrama de clases, KDoc en el repositorio y el DAO, y `CHANGELOG.md`.
- **Entregables:** *release* `hito-2` con el APK, PR fusionados con revisión e *issues* cerradas en el tablero, y defensa oral individual.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.a | Capas bien separadas, estado inmutable, UDF sin fugas (la interfaz no accede al DAO) y dependencias inyectables por interfaz | Hay capas y ViewModel, con alguna dependencia directa o un estado mutable expuesto | Toda la lógica está en los *composables*, o no hay ViewModel |
| RA2.f | CRUD completo con `Flow`, búsqueda, preferencias aplicadas y los datos persisten tras reinicios y actualizaciones de la app. Elige bien el almacén | CRUD funcional con algún fallo menor, o DataStore sin efecto real | Los datos se pierden al cerrar la app, o falla el CRUD |
| RA2.i | `README` reproducible por un tercero, diagrama correcto, KDoc útil y CHANGELOG al día | Documentación presente pero incompleta | No hay documentación, o no permite compilar el proyecto |


## Recursos

- **Documentación oficial:**
  - [Guía de arquitectura de apps](https://developer.android.com/topic/architecture)
  - [Capa de interfaz y estado](https://developer.android.com/topic/architecture/ui-layer)
  - [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)
  - [Navigation Compose y seguridad de tipos](https://developer.android.com/guide/navigation/design/type-safety)
  - [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)
  - [Room](https://developer.android.com/training/data-storage/room)
  - [Resumen de almacenamiento](https://developer.android.com/training/data-storage)
  - [Probar corrutinas](https://developer.android.com/kotlin/coroutines/test)
  - [Dokka](https://kotlinlang.org/docs/dokka-introduction.html)
- **Codelabs:** [ViewModel y estado](https://developer.android.com/codelabs/basic-android-kotlin-compose-viewmodel-and-state) · [Navegación en Compose](https://developer.android.com/codelabs/basic-android-kotlin-compose-navigation) · [Persistir datos con Room](https://developer.android.com/codelabs/basic-android-kotlin-compose-persisting-data-room) · [Preferences DataStore](https://developer.android.com/codelabs/basic-android-kotlin-compose-datastore)
- **App de referencia:** [Now in Android](https://github.com/android/nowinandroid). Es la app de ejemplo oficial con la arquitectura recomendada, bajo licencia Apache-2.0.
- **Herramientas:** Database Inspector, Dokka, Mermaid.
