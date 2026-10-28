# UD05 · Automatización, copias de seguridad y entorno de desarrollo

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 15 h · 18 sesiones de 50 min (≈ 3 semanas a 6 sesiones; propuesta del docente) | RA3 (e, f; ~45 %) · RA4 (e, h; ~55 %) · refuerza RA2.f, RA2.h, RA7.b |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA3.e | Se han realizado y restaurado copias de seguridad. | [RD 405/2023, anexo I, 0483, RA3.e][boe] | P5 (copia y restauración verificada en ambos SO) · PE2 |
| RA3.f | Se han planificado y automatizado tareas. | [RD 405/2023, anexo I, 0483, RA3.f][boe] | P5 (systemd timer/cron y Programador de tareas) · PE2 |
| RA4.e | Se han utilizado comandos para realizar las tareas básicas de configuración y administración del sistema. | [RD 405/2023, anexo I, 0483, RA4.e][boe] | P5 (scripts bash y PowerShell versionados) · PE2 |
| RA4.h | Se han evaluado las necesidades del sistema informático en relación con el desarrollo de aplicaciones. | [RD 405/2023, anexo I, 0483, RA4.h][boe] | P5 (informe de necesidades y script de entorno de desarrollo) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Escribir scripts sencillos y robustos en bash y PowerShell (parámetros, condiciones, bucles, códigos de salida, registro) y versionarlos con Git.
2. Diseñar una política de copias (qué, cuándo, tipo, dónde, retención, regla 3-2-1, RPO y RTO).
3. Hacer copias completas, incrementales y diferenciales con `tar`, `rsync` y `robocopy`, y **restaurarlas y verificarlas**.
4. Planificar tareas con cron, systemd timers y el Programador de tareas de Windows, y comprobar su ejecución.
5. Evaluar las necesidades de hardware y software de un puesto de desarrollo y prepararlo con un script reproducible, con WSL 2 incluido.
6. Distinguir una máquina virtual de un contenedor (introducción).

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloques «Gestión de la información» (copias de seguridad, tareas automáticas); «Configuración de sistemas operativos» (comandos); «Instalación de sistemas operativos» (actualización y recuperación; instalación de aplicaciones) ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Scripts en bash y PowerShell (RA4.e)

| Elemento | bash | PowerShell |
|---|---|---|
| Cabecera | `#!/usr/bin/env bash` + `set -euo pipefail` (sale ante errores y variables sin definir) | `#Requires -Version 5.1` · `param(...)` · `$ErrorActionPreference = 'Stop'` |
| Variables | `DESTINO="/backup"` · `"$DESTINO"` (siempre entre comillas) | `$Destino = "D:\Backup"` |
| Parámetros | `$1`, `$2`, `$#`, `${1:-valor_por_defecto}` | `param([string]$Origen = "C:\Proyectos")` |
| Condición | `if [[ -d "$DIR" ]]; then …; fi` | `if (Test-Path $Dir) { … }` |
| Bucle | `for f in *.log; do …; done` · `while read -r l; do …; done < f` | `foreach ($f in Get-ChildItem *.log) { … }` |
| Funciones | `log() { echo "$(date '+%F %T') $*" >> "$LOG"; }` | `function Write-Log($m) { Add-Content $Log "$(Get-Date -f s) $m" }` |
| Código de salida | `$?`, `exit 1` | `$LASTEXITCODE` (programas externos), `$?`, `exit 1` |
| Errores | `comando || { log "Fallo"; exit 1; }` | `try { … } catch { Write-Log $_; exit 1 }` |
| Ejecución | `chmod +x copia.sh && ./copia.sh` | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y luego `.\copia.ps1` |

**Versionado con Git** (ver [DEC-SI-08](../../decisiones/DEC-SI-08-contenidos-adicionales.md)):

- Los scripts viven en el repositorio, en `scripts/`, con un `README.md` de uso.
- Se hace un *commit* por cambio con un mensaje que explique el porqué.
- **Nunca** se suben contraseñas ni claves: van en variables de entorno o en ficheros excluidos con `.gitignore`.

```bash
git add scripts/copia.sh && git commit -m "copia: añade retención de 14 días" && git push
```

### 2. Copias de seguridad (RA3.e)

| Tipo | Qué copia | Espacio y tiempo de copia | Para restaurar |
|---|---|---|---|
| **Completa** | Todo | Máximo | Solo la última completa |
| **Incremental** | Lo cambiado desde la **última copia** (de cualquier tipo) | Mínimo | La completa + **todas** las incrementales en orden |
| **Diferencial** | Lo cambiado desde la **última completa** | Crece cada día | La completa + la **última** diferencial |
| **Espejo (sincronización)** | Réplica exacta; borra lo borrado | Pequeño tras la primera | La propia réplica (¡también replica los errores!) |

**Conceptos de la política de copias:**

- **Regla 3-2-1:** 3 copias de los datos, en 2 soportes distintos, 1 de ellas fuera de la sede (o inmutable).
- **RPO:** cuántos datos se pueden perder, es decir, la frecuencia de copia.
- **RTO:** cuánto se puede tardar en recuperar.
- **Retención:** cuánto tiempo se guarda cada copia.
- **Cifrado** de las copias.
- **Una copia que no se ha restaurado nunca no se sabe si sirve.**

Las **instantáneas** de una MV y la papelera **no son copias**. Los repositorios Git remotos protegen el código, pero no la configuración, las bases de datos ni los documentos.

**Linux: `tar` (completa e incremental) y `rsync`:**

```bash
# Completa (nivel 0) + incrementales con el mismo archivo .snar
sudo tar --listed-incremental=/backup/proyectos.snar -czpf /backup/proyectos-$(date +%F).tar.gz -C /srv proyectos
#   (al día siguiente, el mismo comando genera una incremental; para empezar un ciclo nuevo se borra o copia el .snar)
tar -tzvf /backup/proyectos-2026-11-10.tar.gz | head          # comprobar contenido
# Restaurar: la completa y después cada incremental en orden
sudo tar --listed-incremental=/dev/null -xzpf /backup/proyectos-2026-11-10.tar.gz -C /restaurar

# Espejo y copias "instantánea" con enlaces duros (cada día parece completa, pero solo ocupa lo cambiado)
rsync -aAXH --delete --dry-run /srv/proyectos/ /backup/espejo/      # probar primero
HOY=$(date +%F)
rsync -aAXH --delete --link-dest=/backup/ultima /srv/proyectos/ "/backup/$HOY/"
ln -sfn "/backup/$HOY" /backup/ultima
rsync -aAX -e ssh /srv/proyectos/ copia@dn-nas:/copias/proyectos/  # a otro equipo por SSH (UD07)
find /backup -maxdepth 1 -name "20*" -mtime +14 -exec rm -rf {} +   # retención de 14 días
```

**Windows:**

```powershell
# Espejo con registro (robocopy devuelve < 8 si todo fue bien)
robocopy C:\Proyectos E:\Backup\Proyectos /MIR /R:1 /W:1 /XD node_modules build .gradle /LOG+:E:\Backup\robocopy.log
if ($LASTEXITCODE -ge 8) { Write-Error "robocopy falló ($LASTEXITCODE)" }
# Copia comprimida fechada
Compress-Archive -Path C:\Proyectos -DestinationPath "E:\Backup\proyectos-$(Get-Date -f yyyy-MM-dd).zip"
# Restaurar
Expand-Archive E:\Backup\proyectos-2026-11-10.zip -DestinationPath C:\Restaurar
```

- **Herramientas gráficas de Windows 11:** *Historial de archivos* (versiones de las carpetas del usuario en otro disco) y *Copia de seguridad y restauración (Windows 7)*, para crear una imagen del sistema y un disco de reparación.
- **Windows Server:** característica *Copias de seguridad de Windows Server* (`Install-WindowsFeature Windows-Server-Backup`), con el comando `wbadmin`.

### 3. Planificación y automatización de tareas (RA3.f)

**cron:** cada línea de `crontab -e` tiene cinco campos de tiempo seguidos del comando.

| Campo | Minuto | Hora | Día del mes | Mes | Día de la semana |
|---|---|---|---|---|---|
| Valores | 0-59 | 0-23 | 1-31 | 1-12 | 0-7 (0 y 7 = domingo) |

```bash
crontab -e
# Copia de lunes a viernes a las 02:30; salida al registro
30 2 * * 1-5  /opt/scripts/copia.sh >> /var/log/copia.log 2>&1
# Cada 15 minutos
*/15 * * * *  /opt/scripts/comprobar_espacio.sh
crontab -l ; grep CRON /var/log/syslog
```

**systemd timer:** es la alternativa moderna a cron. Registra las ejecuciones en el *journal* y, con `Persistent=true`, recupera las ejecuciones perdidas si el equipo estaba apagado.

```ini
# /etc/systemd/system/copia-proyectos.service
[Unit]
Description=Copia de seguridad de /srv/proyectos

[Service]
Type=oneshot
ExecStart=/opt/scripts/copia.sh
```

```ini
# /etc/systemd/system/copia-proyectos.timer
[Unit]
Description=Copia diaria de proyectos

[Timer]
OnCalendar=Mon..Fri 02:30
Persistent=true

[Install]
WantedBy=timers.target
```

```bash
systemd-analyze calendar "Mon..Fri 02:30"         # comprobar la expresión
sudo systemctl daemon-reload
sudo systemctl enable --now copia-proyectos.timer
systemctl list-timers
sudo systemctl start copia-proyectos.service       # ejecución manual de prueba
journalctl -u copia-proyectos.service -n 20
```

**Programador de tareas de Windows** (`taskschd.msc` o PowerShell):

```powershell
$accion   = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File C:\Scripts\copia.ps1"
$disparo  = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday -At 2:30am
$ajustes  = New-ScheduledTaskSettingsSet -StartWhenAvailable    # equivalente a Persistent=true
Register-ScheduledTask -TaskName "Empresa\CopiaProyectos" -Action $accion -Trigger $disparo -Settings $ajustes -User "SYSTEM" -RunLevel Highest
Start-ScheduledTask -TaskName "Empresa\CopiaProyectos"
Get-ScheduledTask -TaskName "CopiaProyectos" -TaskPath "\Empresa\" | Get-ScheduledTaskInfo   # LastRunTime, LastTaskResult (0 = correcto)
# Equivalente clásico: schtasks /create /tn "CopiaProyectos" /tr "C:\Scripts\copia.bat" /sc daily /st 02:30
```

### 4. Necesidades del sistema para el desarrollo de aplicaciones (RA4.h)

Para evaluar un puesto de desarrollo se analizan:

| Necesidad | Qué se comprueba | Cómo |
|---|---|---|
| Hardware | CPU con virtualización, RAM para IDE + emulador o MV + navegador, SSD con espacio para SDK y cachés | Requisitos oficiales de cada herramienta (Android Studio, Visual Studio, Xcode…) frente al inventario de P1 |
| Virtualización | Emulador de Android, WSL 2 y contenedores necesitan aceleración por hardware (Hyper-V/WHPX en Windows, KVM en Linux) | `systeminfo`, `lscpu \| grep -i virtual`, `kvm-ok` (paquete cpu-checker) |
| SDK y entornos de ejecución | JDK LTS, Android SDK, .NET, Node.js, Python; **versiones fijadas** por proyecto | `java -version`, `sdkmanager --list` |
| Variables de entorno | `JAVA_HOME`, `ANDROID_HOME`, `PATH` | `echo $JAVA_HOME`, `$env:JAVA_HOME` |
| Herramientas | Git, IDE, cliente de BD, cliente SSH | `winget list`, `apt list --installed` |
| Permisos | Trabajar como **usuario estándar**; elevar solo para instalar | UD04 |
| Almacenamiento | Repositorios en un disco rápido (Dev Drive en Windows; en WSL, dentro de su sistema de archivos); exclusiones del antivirus solo donde lo indique la documentación | UD03 |
| Red | Acceso a repositorios de paquetes, *proxy* corporativo, puertos locales de los servidores de desarrollo | UD07 |

**WSL 2 (Subsistema de Windows para Linux):**

```powershell
wsl --install -d Ubuntu-24.04         # instala WSL y la distribución (requiere reinicio la primera vez)
wsl -l -v                             # distribuciones y versión (1 o 2)
wsl --set-default-version 2
wsl -d Ubuntu-24.04 -- uname -a
wsl --shutdown
```

- **Acceso a los archivos entre sistemas:**
  - Desde Linux, Windows está en `/mnt/c`.
  - Desde Windows, Linux está en `\\wsl$\Ubuntu-24.04` (o `\\wsl.localhost\…`).
  - Por rendimiento, los repositorios se guardan **dentro** de Linux, en `~/proyectos`.
- **Dentro de una MV de VirtualBox:** WSL 2 necesita virtualización anidada, que no siempre funciona. En el aula se prueba en el PC anfitrión, si la imagen lo permite, o se usa WSL 1 (`wsl --set-default-version 1`).

**Contenedores (introducción, sin profundizar):**

- Un contenedor empaqueta una aplicación con sus dependencias y **comparte el núcleo del anfitrión**, por lo que arranca en segundos y ocupa poco.
- Una MV, en cambio, virtualiza un equipo completo con su propio núcleo.
- Se usan para tener entornos de desarrollo y prueba **reproducibles**, por ejemplo la misma base de datos para todo el equipo.

```bash
sudo apt install -y docker.io            # Docker Engine desde los repositorios de Ubuntu
sudo docker run --rm hello-world
sudo docker run --rm -it ubuntu:24.04 bash   # un "Ubuntu" mínimo en segundos; comparar con arrancar UB-DEV
```

Docker Desktop en Windows tiene condiciones de licencia propias para uso empresarial: hay que revisarlas en la web oficial antes de recomendarlo a una empresa. Docker Engine en Linux y Podman son libres.

**Script de aprovisionamiento del puesto** (entorno reproducible):

```powershell
# setup-dev.ps1 (W11-DEV) — idempotente: winget no reinstala lo que ya existe
$paquetes = "Git.Git", "Microsoft.VisualStudioCode", "EclipseAdoptium.Temurin.21.JDK"
foreach ($p in $paquetes) { winget install --id $p -e --accept-package-agreements --accept-source-agreements }
git config --global user.name  "Nombre Apellido"
git config --global user.email "alumno@ejemplo.org"
# winget export -o apps.json   /   winget import -i apps.json   (replicar en otro puesto)
```

```bash
#!/usr/bin/env bash
# setup-dev.sh (UB-DEV)
set -euo pipefail
sudo apt update
sudo apt install -y git openjdk-25-jdk curl build-essential
command -v code >/dev/null || sudo snap install code --classic
grep -q JAVA_HOME ~/.bashrc || echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
java -version && git --version
```

### 5. Equivalencias en otras tecnologías

| Tarea | Ubuntu | Fedora/Rocky | Windows | macOS |
|---|---|---|---|---|
| Tareas programadas | cron, systemd timers | cron (`cronie`), systemd timers | Programador de tareas | `launchd` |
| Copias integradas | `tar`, `rsync`, Déjà Dup | `tar`, `rsync` | Historial de archivos, `robocopy` | Time Machine |
| Aprovisionamiento | `apt`, `snap` | `dnf`, `flatpak` | `winget`, `winget import` | Homebrew (`brew bundle`) |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. Del comando al script.** Convertir en un script con parámetros y control de errores una secuencia de comandos de UD04 (por ejemplo, el informe de los procesos que más consumen) en bash y en PowerShell. Primer *commit* del repositorio de scripts.
- **A2. Simulacro de desastre.** Hacer una copia completa y dos incrementales con cambios entre ellas. Después, el docente "borra" el proyecto y hay que restaurarlo al estado del martes. Cronometrar el tiempo (RTO real).
- **A3. ¿Se ejecutó?** Programar la misma tarea con cron, con un timer y con el Programador de tareas, apagar la MV durante la hora programada y comprobar qué pasa al encenderla (`Persistent`, `StartWhenAvailable`).
- **A4. Requisitos reales.** Por parejas, buscar los requisitos oficiales de Android Studio, IntelliJ IDEA y Docker, y compararlos con los PC del aula. ¿Qué perfiles de la empresa cliente necesitan más RAM?
- **A5. MV frente a contenedor.** Medir el tiempo de arranque y el espacio ocupado de `UB-DEV` frente a `docker run ubuntu:24.04` y explicar la diferencia.

### Práctica evaluable

**P5 · Copias automatizadas y puestos reproducibles para la empresa cliente.**

1. **Política de copias** de la empresa cliente (1 página): qué datos (mapa de P3), tipo y frecuencia, destino, retención, regla 3-2-1, RPO y RTO, y responsable.
2. **`copia.sh` en `UB-SRV`.** Debe:
   - copiar `/srv/proyectos` y `/etc`, con una completa semanal y copias diarias incrementales o con `--link-dest`;
   - registrar con fecha;
   - aplicar la retención;
   - devolver un código de salida distinto de 0 si falla.

   Se planifica con un **systemd timer**, además de una alternativa con cron comentada.
3. **`copia.ps1` en `W11-DEV`.** Debe:
   - copiar `C:\Proyectos` con `robocopy` a `E:` (el volumen BitLocker de P3) y generar un ZIP fechado;
   - controlar `$LASTEXITCODE`.

   Se planifica con el **Programador de tareas**.
4. **Pruebas de restauración** en ambos SO: borrar un archivo y una carpeta, restaurarlos y comprobar la integridad con `sha256sum` / `Get-FileHash`. Documentar el RTO medido.
5. **Informe de necesidades** de los puestos *Android* y *backend Java* de la empresa cliente, con fuentes oficiales, y **scripts `setup-dev`** para ambos SO que dejen el puesto listo (Git, JDK, IDE, variables). Demostración de WSL (en el anfitrión o WSL 1) y de un contenedor `hello-world`.
6. Todo **versionado en Git**, con un historial de *commits* significativo y un `README.md` de uso de los scripts.

**Conexión con el mundo real:** equivale a dos tareas habituales:

- la automatización de copias que exige la continuidad del negocio (con la restauración probada);
- los scripts de aprovisionamiento con los que los equipos de desarrollo preparan un puesto nuevo en minutos.

Verificación en el puesto: el docente borra un archivo elegido al azar y pide restaurarlo; se comprueba `systemctl list-timers` y el último resultado de la tarea programada.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA3.e | Política completa y coherente; copias de distintos tipos en ambos SO; restauración verificada con *hashes* y RTO medido. | Copias y restauración correctas en ambos SO. | Copias sin restauración comprobada o en un solo SO. |
| RA3.f | Tareas programadas en ambos SO con recuperación de ejecuciones perdidas y comprobación del resultado (registro o código de salida). | Tareas programadas que se ejecutan en ambos SO. | No programa o no comprueba la ejecución. |
| RA4.e | Scripts robustos (parámetros, errores, registro, idempotencia), comentados y versionados con *commits* significativos. | Scripts funcionales y versionados. | Scripts que fallan o no versionados. |
| RA4.h | Informe con requisitos oficiales citados y contrastados con el hardware; scripts de entorno reproducibles en ambos SO; WSL y contenedor explicados. | Informe correcto y script de entorno en al menos un SO. | Informe genérico sin fuentes o sin script. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Copias y tareas programadas: `man rsync`, `man tar`, `man 5 crontab`, [systemd.timer](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html) · [robocopy](https://learn.microsoft.com/windows-server/administration/windows-commands/robocopy) · [ScheduledTasks](https://learn.microsoft.com/powershell/module/scheduledtasks/).
  - Entorno de desarrollo: [WSL](https://learn.microsoft.com/windows/wsl/) · [Docker: Get started](https://docs.docker.com/get-started/) · [Requisitos de Android Studio](https://developer.android.com/studio#system-requirements-a) · [Pro Git (es)](https://git-scm.com/book/es/v2).
- **Decisiones relacionadas:** [DEC-SI-05](../../decisiones/DEC-SI-05-shell-scripting.md) · [DEC-SI-06](../../decisiones/DEC-SI-06-copias-de-seguridad.md) · [DEC-SI-08](../../decisiones/DEC-SI-08-contenidos-adicionales.md).
- **Herramientas:** Git, VS Code (con ShellCheck y la extensión de PowerShell), Restic o Borg (ampliación), Docker Engine.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
