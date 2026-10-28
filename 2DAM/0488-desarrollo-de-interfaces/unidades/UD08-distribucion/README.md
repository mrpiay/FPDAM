# UD08 · Distribución de aplicaciones

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0488 Desarrollo de interfaces · Bloque MP0488_22 Despliegue de aplicaciones | 2.º DAM | 17 h · ≈ 20 sesiones de 50 min (estimación; semanas 28–30) | RA7 (a–h, principal) · RA3.g y RA6.f (refuerzo) |

> Tecnología: jlink + jpackage (MSI/DEB) e Inno Setup; `signtool`; GitHub Releases y winget. Justificación en [DEC-DI-06](../../decisiones/DEC-DI-06-empaquetado-y-distribucion.md).
> **Entorno:** todas las instalaciones de prueba se hacen en una **máquina virtual Windows restaurable**, nunca en el PC del aula.

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA7.a | Se han empaquetado los componentes que requiere la aplicación. | [RD 405/2023, anexo I, 0488, RA7.a](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: inventario de componentes y *runtime* con jlink |
| RA7.b | Se ha personalizado el asistente de instalación. | [RD 405/2023, anexo I, 0488, RA7.b](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: Inno Setup con imágenes, licencia, idioma, página personalizada y tareas |
| RA7.c | Se han generado paquetes de instalación utilizando el entorno de desarrollo. | [RD 405/2023, anexo I, 0488, RA7.c](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: MSI y DEB con jpackage, lanzado desde Maven en el IDE |
| RA7.d | Se han generado paquetes de instalación utilizando herramientas externas. | [RD 405/2023, anexo I, 0488, RA7.d](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: instalador EXE con Inno Setup |
| RA7.e | Se han firmado digitalmente las aplicaciones para su distribución. | [RD 405/2023, anexo I, 0488, RA7.e](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: `signtool` sobre el ejecutable y el instalador, con verificación |
| RA7.f | Se han generado paquetes instalables en modo desatendido. | [RD 405/2023, anexo I, 0488, RA7.f](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8 y prueba práctica breve en aula: instalación con `/VERYSILENT` y `msiexec /qn` |
| RA7.g | Se ha preparado el paquete de instalación para que la aplicación pueda ser correctamente desinstalada. | [RD 405/2023, anexo I, 0488, RA7.g](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: desinstalación limpia, con opción de conservar los datos |
| RA7.h | Se ha preparado la aplicación para ser distribuida a través de diferentes canales de distribución. | [RD 405/2023, anexo I, 0488, RA7.h](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221) | P8: GitHub Release automatizada, manifiesto winget y página de descarga con *hash* |

## Contenidos básicos del currículo

> **[Normativo]** Bloque «Distribución de aplicaciones», texto literal. Fuente: [RD 405/2023, anexo I, módulo 0488, contenidos básicos](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221).

- Componentes de una aplicación. Empaquetado.
- Instaladores.
- Paquetes autoinstalables.
- Firma digital de aplicaciones.
- Herramientas para crear paquetes de instalación.
- Personalización de la instalación: Logotipos, fondos, diálogos, botones, idioma, entre otros.
- Asistentes de instalación y desinstalación.
- Canales de distribución: repositorios (stores), ad-hoc, sitios web, correo electrónico, entre otros.

## Objetivos de aprendizaje

> **[Propuesta del docente]**

Al terminar la unidad el alumnado será capaz de:

1. Identificar todos los componentes que necesita la aplicación en el equipo de destino y separar los ficheros de programa de los datos de usuario.
2. Crear un *runtime* reducido con jlink y paquetes nativos con jpackage desde el entorno de desarrollo.
3. Crear un instalador personalizado con Inno Setup: asistente, idioma, imágenes, páginas propias y desinstalación.
4. Firmar digitalmente ejecutables e instaladores, verificar la firma y explicar la cadena de confianza.
5. Instalar y desinstalar en modo desatendido.
6. Publicar versiones en distintos canales y automatizar la publicación.

## Contenidos desarrollados

> **[Propuesta del docente]**

### 1. Componentes de una aplicación (RA7.a)

| Componente | En el gestor de taller | Dónde va |
|---|---|---|
| Código de la aplicación | `gestor-taller-app.jar` | Directorio de instalación (solo lectura) |
| Dependencias | `gestor-taller-controls.jar` (UD04), sqlite-jdbc (con biblioteca nativa), JasperReports, Vosk (+ JNA) | Directorio de instalación |
| *Runtime* | JRE reducido con jlink (módulos Java + JavaFX) | Directorio de instalación (`runtime/`) |
| Recursos | FXML, CSS, `.jasper`, imágenes e iconos (`.ico`/`.png`) | Dentro de los JAR |
| Ayuda | Carpeta `site/` de la UD07 | Directorio de instalación (`ayuda/`) |
| Modelo de voz | `vosk-model-small-es-*` | Directorio de instalación o descarga opcional |
| Base de datos inicial | `plantilla.db` (esquema y datos de ejemplo) | Se copia la primera vez a la carpeta de datos del usuario |
| Datos del usuario | `gestor-taller.db`, preferencias, *logs* | `%LOCALAPPDATA%\el gestor de taller` (Windows) o `~/.local/share/gestor-taller` (Linux) |

**Regla clave:** el directorio de instalación (`Program Files`) es de solo lectura para el usuario. Los datos se guardan en el perfil del usuario, lo que además facilita desinstalar y actualizar sin perderlos.

```java
public static Path carpetaDatos() {
    String so = System.getProperty("os.name").toLowerCase();
    Path base = so.contains("win")
            ? Path.of(System.getenv("LOCALAPPDATA"), "GestorTaller")
            : Path.of(System.getProperty("user.home"), ".local", "share", "gestor-taller");
    try {
        Files.createDirectories(base);
    } catch (IOException e) {
        throw new UncheckedIOException(e);
    }
    return base;
}

public static Path baseDeDatos() throws IOException {
    Path db = carpetaDatos().resolve("gestor-taller.db");
    if (Files.notExists(db)) {                     // primer arranque: copiar la plantilla
        try (InputStream in = App.class.getResourceAsStream("/datos/plantilla.db")) {
            Files.copy(Objects.requireNonNull(in, "Falta plantilla.db"), db);
        }
    }
    return db;
}
```

### 2. *Runtime* con jlink y paquetes con jpackage (RA7.a, c)

**Qué módulos necesita la aplicación.** `jdeps` analiza el JAR y sus dependencias:

```bat
jdeps --multi-release 21 --ignore-missing-deps --print-module-deps ^
      --class-path "target\lib\*" target\gestor-taller-app-1.0.0.jar
```

**Runtime reducido con JavaFX.** Hacen falta los *jmods* de JavaFX 25 de Gluon, de la misma versión que la dependencia de Maven:

```bat
jlink --module-path "%JAVA_HOME%\jmods;C:\javafx-jmods-25.0.1" ^
      --add-modules java.base,java.desktop,java.sql,java.naming,java.logging,java.xml,java.prefs,java.scripting,jdk.httpserver,jdk.unsupported,javafx.controls,javafx.fxml,javafx.swing ^
      --strip-debug --no-header-files --no-man-pages --compress=zip-6 ^
      --output target\runtime
```

> Como JavaFX va dentro del *runtime*, los JAR de JavaFX **no** deben copiarse también a `target\lib`, para evitar duplicados.

**Imagen de la aplicación y MSI con jpackage.** En JDK 25, el tipo `msi` requiere **WiX Toolset** (3.x, o 4 o posterior) en el `PATH`:

```bat
jpackage --type app-image --name GestorTaller --app-version 1.0.0 ^
         --vendor "Equipo GestorTaller (DAM)" --description "Gestión de taller" ^
         --input target\lib --main-jar gestor-taller-app-1.0.0.jar ^
         --main-class es.fpdam.gestortaller.Launcher ^
         --runtime-image target\runtime --icon src\main\packaging\gestor-taller.ico ^
         --dest target\dist

jpackage --type msi --app-image target\dist\GestorTaller --name GestorTaller --app-version 1.0.0 ^
         --win-menu --win-menu-group "GestorTaller" --win-shortcut --win-dir-chooser ^
         --win-upgrade-uuid 7b3c1d2e-0000-4a5b-9c8d-123456789abc ^
         --license-file LICENSE.txt --dest target\dist
```

- `Launcher` es una clase con `main` que **no** extiende `Application` y llama a `App.main(args)`. Evita el error «JavaFX runtime components are missing» cuando la aplicación arranca desde el *classpath*.
- `--win-upgrade-uuid` debe ser **el mismo en todas las versiones**: así una versión nueva sustituye a la anterior en lugar de instalarse al lado.
- `--resource-dir` permite sustituir las plantillas e imágenes del instalador WiX que genera jpackage. Es una personalización limitada.
- En Linux: `jpackage --type deb ... --linux-shortcut --linux-menu-group Office`.

**Desde el entorno de desarrollo (RA7.c).** Se encadenan en Maven, y se lanzan con un clic desde el IDE (configuración de ejecución `mvn -Ppaquete package`):

1. `maven-dependency-plugin` (`copy-dependencies` a `target/lib`, excluyendo `org.openjfx`).
2. `exec-maven-plugin` para `jlink`/`jpackage`, o un *plugin* específico de jpackage para Maven.

### 3. Instalador personalizado con Inno Setup (RA7.b, d, g)

`instalador/gestor-taller.iss`:

```ini
#define AppName "GestorTaller"
#define AppVersion "1.0.0"

[Setup]
AppId={{7B3C1D2E-0000-4A5B-9C8D-123456789ABC}
AppName={#AppName}
AppVersion={#AppVersion}
AppPublisher=Equipo GestorTaller (DAM)
DefaultDirName={autopf}\{#AppName}
DefaultGroupName={#AppName}
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
ArchitecturesInstallIn64BitMode=x64compatible
OutputDir=..\target\dist
OutputBaseFilename=GestorTaller-{#AppVersion}-setup
SetupIconFile=imagenes\gestor-taller.ico
WizardImageFile=imagenes\lateral.bmp
WizardSmallImageFile=imagenes\cabecera.bmp
WizardStyle=modern
LicenseFile=..\LICENSE.txt
InfoBeforeFile=leeme-antes.txt
Compression=lzma2
SolidCompression=yes
UninstallDisplayIcon={app}\GestorTaller.exe
; Firma (ver apartado 4): herramienta «aula» configurada en el compilador de Inno Setup
SignTool=aula
SignedUninstaller=yes

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "escritorio"; Description: "Crear un acceso directo en el escritorio"; Flags: unchecked
Name: "ejemplo";    Description: "Instalar datos de ejemplo"; Flags: unchecked

[Files]
Source: "..\target\dist\GestorTaller\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\site\*"; DestDir: "{app}\ayuda"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "datos\ejemplo.db"; DestDir: "{localappdata}\GestorTaller"; DestName: "gestor-taller.db"; Tasks: ejemplo; Flags: onlyifdoesntexist uninsneveruninstall

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\GestorTaller.exe"
Name: "{group}\Ayuda de {#AppName}"; Filename: "{app}\ayuda\index.html"
Name: "{group}\Desinstalar {#AppName}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#AppName}"; Filename: "{app}\GestorTaller.exe"; Tasks: escritorio

[Run]
Filename: "{app}\GestorTaller.exe"; Description: "Abrir {#AppName}"; Flags: nowait postinstall skipifsilent unchecked

[Code]
var
  PaginaDatos: TInputDirWizardPage;

procedure InitializeWizard;
begin
  { Página personalizada: carpeta de datos (por defecto, el perfil del usuario) }
  PaginaDatos := CreateInputDirPage(wpSelectDir, 'Carpeta de datos',
    '¿Dónde se guardará la base de datos del gestor de taller?',
    'Se recomienda mantener la ubicación propuesta. Pulsa Siguiente para continuar.', False, '');
  PaginaDatos.Add('');
  PaginaDatos.Values[0] := ExpandConstant('{localappdata}\GestorTaller');
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
    SaveStringToFile(ExpandConstant('{app}\gestor-taller.cfg'),
      'datos=' + PaginaDatos.Values[0] + #13#10, False);
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  { Desinstalación: preguntar si se borran los datos del usuario (en modo silencioso se conservan) }
  if (CurUninstallStep = usPostUninstall) and not UninstallSilent then
    if MsgBox('¿Quieres borrar también tus datos (clientes, órdenes) de ' +
              ExpandConstant('{localappdata}\GestorTaller') + '?' + #13#10 +
              'Esta acción no se puede deshacer.', mbConfirmation, MB_YESNO or MB_DEFBUTTON2) = IDYES then
      DelTree(ExpandConstant('{localappdata}\GestorTaller'), True, True, True);
end;
```

Qué personaliza cada parte (RA7.b):

- `WizardImageFile` y `WizardSmallImageFile`: imágenes lateral y de cabecera.
- `SetupIconFile`: icono.
- `[Languages]`: idioma. Inno Setup incluye el castellano en las traducciones oficiales; para el gallego hay traducciones aportadas por la comunidad en la web de Inno Setup.
- `LicenseFile` e `InfoBeforeFile`: diálogos de licencia e información.
- `[Tasks]`: casillas de opciones.
- `[Code]`: páginas propias y lógica, en Pascal Script.
- `WizardStyle=modern`: aspecto del asistente.

**Desinstalación limpia (RA7.g).** Inno Setup registra lo que instala y lo elimina. Lo que crea la aplicación fuera de `{app}` se gestiona de forma explícita: los datos del usuario se conservan por defecto y se pregunta antes de borrarlos. Para restos de `{app}` (por ejemplo, *logs* creados en ejecución) se usa `[UninstallDelete]`. Se comprueba en la VM que no queda nada en el directorio de instalación, en el menú Inicio ni en «Aplicaciones instaladas».

### 4. Firma digital (RA7.e)

**Conceptos.** Para firmar se calcula el *hash* del ejecutable y se cifra con la **clave privada** del editor. El certificado (con la clave pública), emitido por una **autoridad de certificación (CA)**, permite a Windows verificar **la integridad** (no se ha modificado) y **la autoría** (quién lo publica). El **sellado de tiempo** mantiene la firma válida aunque el certificado caduque. Sin firma, o con una firma no confiable, aparece el aviso de «editor desconocido» y SmartScreen puede bloquear la ejecución.

**Práctica con un certificado autofirmado** (válido solo para aprender; en producción se usa un certificado de una CA o un servicio de firma en la nube):

```powershell
# 1. Crear el certificado de firma de código en el almacén del usuario
$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=GestorTaller Aula DAM" `
        -CertStoreLocation Cert:\CurrentUser\My -KeyAlgorithm RSA -KeyLength 3072 `
        -NotAfter (Get-Date).AddYears(1)

# 2. Exportarlo a PFX (clave privada: NUNCA al repositorio)
$pwd = Read-Host -AsSecureString "Contraseña del PFX"
Export-PfxCertificate -Cert $cert -FilePath "$env:USERPROFILE\gestor-taller-aula.pfx" -Password $pwd

# 3. En la VM de pruebas: confiar en el certificado (Personas de confianza + Entidades raíz)
Export-Certificate -Cert $cert -FilePath gestor-taller-aula.cer
```

```bat
:: 4. Firmar (signtool viene con el Windows SDK) con sellado de tiempo RFC 3161
signtool sign /fd SHA256 /f "%USERPROFILE%\gestor-taller-aula.pfx" /p %PFX_PASS% ^
         /tr http://timestamp.digicert.com /td SHA256 target\dist\GestorTaller\GestorTaller.exe

:: 5. Verificar
signtool verify /pa /v target\dist\GestorTaller-1.0.0-setup.exe
```

- En Inno Setup se registra la herramienta en *Tools › Configure Sign Tools* con el nombre `aula` y el comando `signtool sign /fd SHA256 /f ... /tr ... /td SHA256 $f`. Con `SignTool=aula` se firman el instalador y el desinstalador.
- **JAR:** `jarsigner -keystore gestor-taller.p12 -tsa http://timestamp.digicert.com app.jar alias` y `jarsigner -verify -verbose app.jar`.
- **Linux:** los repositorios de paquetes firman con GPG. Basta con mencionarlo.
- **Secretos:** en CI, el PFX y su contraseña se guardan como *secrets* cifrados del repositorio, nunca en el código.

### 5. Instalación y desinstalación desatendidas (RA7.f)

| Paquete | Instalar sin interfaz | Desinstalar sin interfaz |
|---|---|---|
| Inno Setup (EXE) | `GestorTaller-1.0.0-setup.exe /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /TASKS="escritorio" /LOG="%TEMP%\gt-install.log"` | `"%LOCALAPPDATA%\Programs\el gestor de taller\unins000.exe" /VERYSILENT /SUPPRESSMSGBOXES` (la ruta depende del modo de instalación) |
| MSI (jpackage) | `msiexec /i GestorTaller-1.0.0.msi /qn /l*v gt-install.log` | `msiexec /x GestorTaller-1.0.0.msi /qn` |

- `/SILENT` muestra solo la barra de progreso y `/VERYSILENT` no muestra nada.
- Con `/DIR="..."` se cambia la carpeta de instalación.
- `skipifsilent` en `[Run]` evita abrir la aplicación al final de una instalación desatendida.
- En la empresa, la instalación desatendida es la base del despliegue masivo: *scripts*, GPO, Intune y winget.

### 6. Canales de distribución (RA7.h)

| Canal | Cómo | Para quién |
|---|---|---|
| **GitHub Releases** (sitio web) | *Workflow* que, al crear una etiqueta `v*`, compila en `windows-latest`, empaqueta, firma y adjunta los instaladores y el *changelog* | Clientes y testers |
| **Página de descarga propia** | Enlace al instalador + **SHA-256** (`Get-FileHash -Algorithm SHA256 GestorTaller-1.0.0-setup.exe`) + requisitos | Clientes |
| **winget** (repositorio) | Manifiesto YAML con `PackageIdentifier`, `PackageVersion`, `InstallerType: inno`, `InstallerUrl`, `InstallerSha256` e `InstallerSwitches`. Se valida con `winget validate` y se prueba con `winget install --manifest`. Publicar en el repositorio comunitario requiere una PR a `microsoft/winget-pkgs` (en la práctica se prepara, pero no se envía) | Técnicos y administradores |
| **Microsoft Store** | Admite aplicaciones Win32 (MSI/EXE) con requisitos como instalación silenciosa y firma con un certificado de confianza (consultar la documentación vigente de Partner Center). Se analiza y se simula | Público general |
| **Repositorios Linux** | DEB en un repositorio APT propio, Flathub o Snap (se describe) | Usuarios de Linux |
| **Ad hoc / correo electrónico** | Envío directo del instalador o de un enlace temporal, siempre con el *hash* y firmado | Cliente único (el taller) |

*Workflow* de *release* (fragmento):

```yaml
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '21', cache: maven }
      - run: mvn -B -Ppaquete package          # jlink + jpackage
      - run: iscc instalador\gestor-taller.iss      # Inno Setup (instalarlo antes en el runner si no está)
      # firma con el PFX decodificado desde un secret...
      - uses: softprops/action-gh-release@v2
        with:
          files: target/dist/*.exe
```

> **Alternativa.** En .NET: MSIX o ClickOnce y `dotnet publish` con `--self-contained`. En Electron: electron-builder (NSIS, MSI, DEB, AppImage). En Compose Multiplatform: tareas `packageMsi` y `packageDeb`. Los CE son los mismos: componentes, asistente, paquete desde el IDE y con herramienta externa, firma, modo silencioso, desinstalación y canales.

## Actividades

> **[Propuesta del docente]**

### Actividades de clase (no evaluables)

- **A1. Inventario de componentes.** Listar todo lo que necesita el gestor de taller en un equipo «limpio» y comprobarlo ejecutando el JAR en la VM sin JDK. Ver qué falla.
- **A2. *Runtime* a dieta.** Comparar el tamaño del JDK completo con el del *runtime* de jlink. Probar qué ocurre si falta un módulo, por ejemplo `java.sql`.
- **A3. Primer MSI.** Generar el MSI con jpackage, instalar, actualizar a la versión 1.0.1 con el mismo `upgrade-uuid` y desinstalar.
- **A4. Asistente a medida.** En Inno Setup: imágenes propias, idioma, licencia, una tarea y una página personalizada.
- **A5. Firma y confianza.** Firmar, verificar, modificar un byte del ejecutable y volver a verificar. Explicar el resultado.
- **A6. Despliegue en silencio.** Script `.bat` que instala en modo desatendido, comprueba que el ejecutable existe y desinstala. Revisar el *log*.

### Práctica evaluable

**P8 · Distribución del gestor de taller 1.0 (hito H8, `v1.0.0`).**

1. *Runtime* con jlink y MSI con jpackage desde Maven/IDE (y DEB opcional).
2. Instalador Inno Setup personalizado: imágenes, idioma, licencia, tareas, página propia, ayuda y modelo de voz incluidos, datos en el perfil del usuario.
3. Ejecutables e instaladores firmados, con verificación documentada.
4. Instalación y desinstalación desatendidas probadas con un script.
5. Desinstalación limpia que pregunta antes de borrar los datos.
6. *Release* automatizada en GitHub con *changelog* y *hash*, y manifiesto de winget validado.
7. Manuales de instalación y administración (UD07) actualizados con los parámetros reales (HU21).

Cada miembro del equipo se encarga de una parte (empaquetado, instalador o canales) y revisa la PR de otro.

**Conexión con el mundo real:** el cliente necesita instalar la aplicación en varios PC sin intervención, actualizarla sin perder datos y fiarse de que el ejecutable no ha sido manipulado. Así funciona la entrega de cualquier software de escritorio: versiones etiquetadas, artefactos firmados, notas de la versión y despliegue silencioso con herramientas como winget.

Entregables: etiqueta `v1.0.0` con la *release* publicada, `instalador/` (script `.iss`, imágenes y *scripts* de despliegue), `docs/instalacion.md` y `docs/administracion.md` actualizados, y capturas del asistente y de la verificación de la firma. **Prueba práctica breve en aula:** generar el paquete e instalarlo en modo desatendido en la VM (RA7, 20 %).

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA7.a | Inventario completo, *runtime* mínimo justificado con jdeps y datos separados de los binarios | Empaquetado completo sin optimizar | Faltan componentes; no funciona en un equipo limpio |
| RA7.b | Asistente con imágenes, idioma, licencia, tareas y página propia funcional | Personalización parcial | Asistente por defecto |
| RA7.c | MSI (y DEB) generados desde Maven/IDE con `upgrade-uuid` y actualización probada | MSI generado a mano desde la consola | Sin paquete desde el entorno |
| RA7.d | Instalador de Inno Setup completo, reproducible y en CI | Instalador funcional generado a mano | Sin herramienta externa |
| RA7.e | Firma con sellado de tiempo de los EXE e instaladores; verificación y explicación de la cadena de confianza | Firma sin sellado de tiempo o sin verificar | Sin firma |
| RA7.f | Instalación y desinstalación silenciosas con *script* y *log* revisado | Solo la instalación silenciosa | Sin modo desatendido |
| RA7.g | Desinstalación sin restos y con pregunta sobre los datos (conservados en modo silencioso) | Quedan restos menores | La desinstalación falla o deja la aplicación |
| RA7.h | *Release* automatizada, *hash*, manifiesto de winget validado y análisis de la Store | Release manual con *hash* | Un solo canal sin verificación |

## Recursos

> **[Propuesta del docente]**

- **Documentación oficial:**
  - [`jpackage` (JDK 25)](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jpackage.html) · [`jlink`](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jlink.html) · [`jdeps`](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jdeps.html) · [JavaFX jmods (Gluon)](https://gluonhq.com/products/javafx/)
  - [Inno Setup: documentación y parámetros de línea de comandos](https://jrsoftware.org/ishelp/)
  - [SignTool](https://learn.microsoft.com/es-es/windows/win32/seccrypto/signtool) · [New-SelfSignedCertificate](https://learn.microsoft.com/es-es/powershell/module/pki/new-selfsignedcertificate)
  - [winget: crear manifiestos](https://learn.microsoft.com/es-es/windows/package-manager/package/manifest) · [Microsoft Store: aplicaciones MSI/EXE](https://learn.microsoft.com/es-es/windows/apps/publish/publish-your-app/msi/overview)
  - [GitHub Actions](https://docs.github.com/es/actions)
- **Herramientas:** JDK 25, WiX Toolset, Inno Setup 6, Windows SDK (signtool), VM de Windows 11, GitHub Actions.
