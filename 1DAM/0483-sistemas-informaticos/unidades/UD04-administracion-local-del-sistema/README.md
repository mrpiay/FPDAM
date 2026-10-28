# UD04 · Administración local: usuarios, permisos, procesos y servicios

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 22 h · 26 sesiones de 50 min (≈ 4,3 semanas a 6 sesiones; propuesta del docente) | RA4 (a-g; 100 % de la UD) |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA4.a | Se han configurado cuentas de usuario locales y grupos. | [RD 405/2023, anexo I, 0483, RA4.a][boe] | P4 (altas por script en ambos SO) · PE2 |
| RA4.b | Se ha asegurado el acceso al sistema mediante el uso de directivas de cuenta y directivas de contraseñas. | [RD 405/2023, anexo I, 0483, RA4.b][boe] | P4 (directivas de contraseñas y bloqueo) · PE2 |
| RA4.c | Se han identificado, arrancado y detenido servicios y procesos. | [RD 405/2023, anexo I, 0483, RA4.c][boe] | P4 (servicios y procesos) · PE2 |
| RA4.d | Se ha protegido el acceso a la información mediante el uso de permisos locales y listas de control de acceso. | [RD 405/2023, anexo I, 0483, RA4.d][boe] | P4 (escenario de permisos y ACL) · PE2 |
| RA4.e | Se han utilizado comandos para realizar las tareas básicas de configuración y administración del sistema. | [RD 405/2023, anexo I, 0483, RA4.e][boe] | P4 (todas las tareas por CLI) · PE2 |
| RA4.f | Se ha monitorizado el sistema. | [RD 405/2023, anexo I, 0483, RA4.f][boe] | P4 (informe de monitorización y registros) |
| RA4.g | Se han instalado y evaluado utilidades para el mantenimiento y optimización del sistema. | [RD 405/2023, anexo I, 0483, RA4.g][boe] | P4 (evaluación de utilidades de mantenimiento) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Crear, modificar, bloquear y eliminar cuentas y grupos locales en Linux y Windows, de forma individual y masiva con scripts.
2. Configurar directivas de contraseña y de bloqueo de cuenta, y justificarlas con recomendaciones actuales.
3. Identificar, arrancar, detener y configurar procesos y servicios, y gestionar su prioridad.
4. Aplicar permisos POSIX, bits especiales, ACL de Linux y permisos NTFS con herencia, según el principio de mínimo privilegio.
5. Realizar las tareas básicas de administración por línea de comandos.
6. Monitorizar CPU, memoria, disco y registros del sistema, e interpretar los datos.
7. Instalar y evaluar utilidades de mantenimiento y optimización.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloque «Configuración de sistemas operativos» ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Usuarios y grupos (RA4.a)

| Concepto | Linux | Windows |
|---|---|---|
| Identificador | UID y GID numéricos (root = 0; personas usuarias desde 1000) | SID (`S-1-5-21-…-1001`); grupos integrados con SID fijo: Administradores `S-1-5-32-544`, Usuarios `S-1-5-32-545` |
| Base de datos local | `/etc/passwd`, `/etc/shadow` (hash de la contraseña), `/etc/group`, `/etc/gshadow` | SAM (`C:\Windows\System32\config\SAM`, no legible directamente) |
| Superusuario | `root`; administración con `sudo` (grupo `sudo` en Ubuntu, `wheel` en RHEL) | Grupo Administradores + Control de cuentas de usuario (UAC) |
| Cuentas de servicio | `www-data`, `sshd`… (shell `/usr/sbin/nologin`) | `LocalSystem`, `LocalService`, `NetworkService`, cuentas virtuales |
| GUI | Configuración → Usuarios | Configuración → Cuentas; `lusrmgr.msc` (Pro) |

```bash
sudo adduser ana                                   # interactivo (Debian/Ubuntu): crea home y pide contraseña
sudo useradd -m -s /bin/bash -c "Ana Pérez" -G desarrollo ana   # no interactivo, para scripts
sudo passwd ana
sudo groupadd desarrollo ; sudo groupadd qa
sudo usermod -aG desarrollo,sudo ana               # -a: añadir sin quitar otros grupos (¡imprescindible!)
sudo gpasswd -d ana sudo                           # quitar de un grupo
id ana ; groups ana ; getent passwd ana ; getent group desarrollo
sudo usermod -L ana ; sudo usermod -U ana          # bloquear / desbloquear
sudo userdel -r ana                                # eliminar con su home
```

```powershell
$pw = Read-Host -AsSecureString "Contraseña inicial"
New-LocalUser -Name "ana" -FullName "Ana Pérez" -Password $pw
New-LocalGroup -Name "Desarrollo" -Description "Equipo de desarrollo"
Add-LocalGroupMember -Group "Desarrollo" -Member "ana"
Add-LocalGroupMember -SID "S-1-5-32-545" -Member "ana"     # grupo Usuarios, independiente del idioma
Get-LocalUser ; Get-LocalGroupMember -Group "Desarrollo"
Disable-LocalUser -Name "ana" ; Enable-LocalUser -Name "ana"
net user ana /logonpasswordchg:yes                        # obligar a cambiar la contraseña en el siguiente inicio
Remove-LocalUser -Name "ana"                              # el perfil C:\Users\ana se borra aparte
```

**Altas masivas desde CSV.** Así se hace en la práctica:

```bash
#!/usr/bin/env bash
# altas.sh — usuarios.csv: usuario,nombre,grupo (con cabecera)
set -euo pipefail
tail -n +2 usuarios.csv | while IFS=, read -r usuario nombre grupo; do
  getent group "$grupo" >/dev/null || sudo groupadd "$grupo"
  if id "$usuario" &>/dev/null; then echo "Ya existe: $usuario"; continue; fi
  sudo useradd -m -s /bin/bash -c "$nombre" -G "$grupo" "$usuario"
  echo "$usuario:Cambiar.2026!" | sudo chpasswd     # contraseña inicial solo para el laboratorio
  sudo chage -d 0 "$usuario"                         # obliga a cambiarla en el primer inicio
  echo "Creado: $usuario ($grupo)"
done
```

```powershell
# altas.ps1 — mismo CSV
Import-Csv .\usuarios.csv | ForEach-Object {
    if (-not (Get-LocalGroup -Name $_.grupo -ErrorAction SilentlyContinue)) { New-LocalGroup -Name $_.grupo | Out-Null }
    if (Get-LocalUser -Name $_.usuario -ErrorAction SilentlyContinue) { Write-Host "Ya existe: $($_.usuario)"; return }
    $pw = ConvertTo-SecureString "Cambiar.2026!" -AsPlainText -Force   # solo laboratorio
    New-LocalUser -Name $_.usuario -FullName $_.nombre -Password $pw | Out-Null
    Add-LocalGroupMember -Group $_.grupo -Member $_.usuario
    net user $_.usuario /logonpasswordchg:yes | Out-Null
    Write-Host "Creado: $($_.usuario) ($($_.grupo))"
}
```

### 2. Directivas de cuenta y contraseñas (RA4.b)

**Criterio actual.** Las recomendaciones de NIST SP 800-63B priorizan:

- la **longitud** (frases de paso) frente a reglas de composición complejas;
- comparar las contraseñas con listas de contraseñas comprometidas;
- **no forzar caducidades periódicas** salvo sospecha de compromiso;
- añadir un segundo factor.

En el aula se configuran todos los parámetros para aprender a manejarlos, y se discute qué valores elegiría la empresa cliente.

| Parámetro | Linux | Windows (local) |
|---|---|---|
| Longitud mínima y complejidad | `libpam-pwquality`: `/etc/security/pwquality.conf` → `minlen = 12`, `dcredit = -1`, `ucredit = -1` | `secpol.msc` → Directivas de cuenta → Directiva de contraseñas; `net accounts /minpwlen:12` |
| Caducidad y aviso | `/etc/login.defs` (`PASS_MAX_DAYS`, `PASS_MIN_DAYS`, `PASS_WARN_AGE`; solo afecta a cuentas nuevas) · `sudo chage -M 90 -m 1 -W 7 ana` · `chage -l ana` | `net accounts /maxpwage:90 /minpwage:1` |
| Historial | `pam_pwhistory` (`remember=5`) | `net accounts /uniquepw:5` |
| Bloqueo tras intentos fallidos | `pam_faillock` (`/etc/security/faillock.conf`: `deny = 5`, `unlock_time = 900`); en Ubuntu hay que activarlo en `/etc/pam.d/common-auth`, siguiendo la documentación y **con una sesión root abierta** por si se comete un error · `faillock --user ana` | `net accounts /lockoutthreshold:5 /lockoutduration:15 /lockoutwindow:15` |
| Caducidad de la cuenta | `sudo chage -E 2027-06-30 becario` | `net user becario /expires:30/06/2027` (el formato de fecha depende de la configuración regional) |
| Comprobar | `sudo chage -l ana` · `sudo passwd -S ana` | `net accounts` · `net user ana` |

En el dominio (UD08) estas directivas se centralizan con GPO.

### 3. Procesos y servicios (RA4.c)

- **Proceso:** programa en ejecución, con PID, proceso padre (PPID), propietario, estado (ejecución, listo, bloqueado o zombi) y prioridad. Un proceso puede tener varios **hilos**.
- **Servicio o demonio:** proceso en segundo plano que gestiona el sistema de inicio: unidades `.service` de **systemd** en Linux; Administrador de control de servicios (SCM) en Windows.

| Acción | Linux | Windows |
|---|---|---|
| Listar procesos | `ps aux` · `ps -ef --forest` · `pstree -p` · `top` / `htop` | `Get-Process` · `tasklist` · Administrador de tareas (`Ctrl+Mayús+Esc`) |
| Los que más CPU consumen | `ps aux --sort=-%cpu \| head` | `Get-Process \| Sort-Object CPU -Descending \| Select-Object -First 10` |
| Terminar | `kill PID` (SIGTERM) · `kill -9 PID` (SIGKILL) · `pkill -u ana` | `Stop-Process -Id PID` · `Stop-Process -Name notepad -Force` · `taskkill /PID n /F` |
| Prioridad | `nice -n 10 comando` · `renice -n 5 -p PID` (de -20 a 19) | `(Get-Process notepad).PriorityClass = 'BelowNormal'` |
| Segundo plano | `comando &` · `jobs` · `fg %1` · `bg` · `nohup comando &` | `Start-Job { … }` · `Start-Process -WindowStyle Hidden` |
| Estado de un servicio | `systemctl status ssh` | `Get-Service sshd` · `services.msc` |
| Arrancar, detener, reiniciar | `sudo systemctl start\|stop\|restart ssh` | `Start-Service` · `Stop-Service` · `Restart-Service` |
| Inicio automático | `sudo systemctl enable --now cups` · `disable` · `mask` | `Set-Service -Name Spooler -StartupType Automatic\|Manual\|Disabled` |
| Listar servicios | `systemctl list-units --type=service --state=running` · `systemctl list-unit-files --type=service` | `Get-Service \| Where-Object Status -eq Running` · `Get-CimInstance Win32_Service \| Select-Object Name, StartMode, State, StartName` |
| Destino o nivel de arranque | `systemctl get-default` (`graphical.target` / `multi-user.target`) | — |

**Nota sobre Ubuntu 24.04:** el servidor SSH se activa por socket (`ssh.socket`). Al cambiar el puerto, hay que reiniciar el socket o recargar systemd: `sudo systemctl daemon-reload && sudo systemctl restart ssh.socket`.

### 4. Permisos locales y listas de control de acceso (RA4.d)

**Linux: permisos POSIX.**

- Hay tres clases: **propietario (u)**, **grupo (g)** y **otros (o)**.
- Cada clase tiene permisos de lectura (**r** = 4), escritura (**w** = 2) y ejecución (**x** = 1).
- En un directorio, `x` permite entrar y `w` permite crear y borrar archivos dentro.

```bash
ls -l informe.txt                     # -rw-r----- 1 ana desarrollo …
chmod 640 informe.txt                 # rw- r-- ---
chmod u+x,g-w,o= script.sh            # notación simbólica
sudo chown ana:desarrollo informe.txt ; sudo chgrp qa informe.txt
umask                                 # 0002 en Ubuntu: archivos 664, directorios 775
# Bits especiales
sudo chmod g+s /srv/proyectos/app     # setgid: lo creado dentro hereda el grupo del directorio
sudo chmod +t /srv/compartido         # sticky: solo el propietario borra sus archivos (como /tmp)
ls -l /usr/bin/passwd                 # -rwsr-xr-x: setuid, se ejecuta con los permisos del propietario (root)
```

**ACL POSIX** (paquete `acl`): dan permisos a usuarios o grupos concretos además del propietario y el grupo. La **ACL por defecto** de un directorio se hereda en lo que se crea dentro.

```bash
sudo setfacl -m g:qa:rx /srv/proyectos/app            # QA puede leer y entrar
sudo setfacl -m u:becario:r /srv/proyectos/app/README.md
sudo setfacl -d -m g:qa:rx /srv/proyectos/app         # ACL por defecto (herencia)
getfacl /srv/proyectos/app
sudo setfacl -x g:qa /srv/proyectos/app ; sudo setfacl -b archivo   # quitar una entrada / todas
```

**Windows: permisos NTFS.**

- **Permisos básicos:** Control total, Modificar, Lectura y ejecución, Mostrar el contenido de la carpeta, Lectura, Escritura.
- **Permisos especiales:** son la versión granular de los básicos.
- **Herencia:** los permisos se propagan del contenedor a los hijos, salvo que se deshabilite.
- **Prevalencia:** una **denegación explícita** prevalece sobre una concesión.
- **Permiso efectivo:** es la suma de los permisos de la persona usuaria y de todos sus grupos. Se consulta en Propiedades → Seguridad → Opciones avanzadas → Acceso efectivo.

```powershell
New-Item -ItemType Directory C:\Proyectos\AppMovil -Force
# Quitar la herencia, copiar después solo lo necesario (SID para no depender del idioma)
icacls C:\Proyectos\AppMovil /inheritance:r
icacls C:\Proyectos\AppMovil /grant:r "*S-1-5-18:(OI)(CI)F" "*S-1-5-32-544:(OI)(CI)F" "Desarrollo:(OI)(CI)M" "QA:(OI)(CI)RX"
icacls C:\Proyectos\AppMovil                       # (OI) objetos, (CI) contenedores: herencia hacia abajo
icacls C:\Proyectos\AppMovil\secreto.txt /deny "becario:(R)"
Get-Acl C:\Proyectos\AppMovil | Format-List Owner, AccessToString
takeown /F C:\Proyectos\AppMovil /R /D S           # tomar posesión (la respuesta S/Y depende del idioma)
```

| | Linux POSIX + ACL | NTFS |
|---|---|---|
| Granularidad | rwx × (u, g, o) + entradas ACL | ~14 permisos especiales por entrada |
| Herencia | Solo con ACL por defecto o setgid (grupo) | Nativa, configurable por entrada |
| Denegar | No hay denegación explícita (se omite el permiso) | Denegación explícita, que prevalece |
| Propietario | Puede cambiar los permisos | Tiene derecho implícito a cambiar los permisos |

### 5. Comandos de configuración y administración (RA4.e)

| Tarea | Linux | Windows |
|---|---|---|
| Ayuda | `man`, `--help`, `tldr`, `apropos` | `Get-Help Get-Service -Examples`, `Update-Help`, `Get-Command *service*` |
| Nombre del equipo | `sudo hostnamectl set-hostname dn-srv-01` | `Rename-Computer -NewName DN-DEV-01 -Restart` |
| Fecha, hora y zona | `timedatectl` · `sudo timedatectl set-timezone Europe/Madrid` | `Get-TimeZone` · `Set-TimeZone -Id "Romance Standard Time"` |
| Información del sistema | `hostnamectl`, `uname -a`, `lsb_release -a` | `Get-ComputerInfo`, `systeminfo` |
| Variables de entorno | `export VAR=valor`; persistente en `~/.bashrc` o `/etc/environment` | `$env:VAR = "valor"`; persistente: `[Environment]::SetEnvironmentVariable("VAR","valor","User")` |
| Reiniciar o apagar | `sudo systemctl reboot` · `sudo shutdown -h +10 "Mantenimiento"` | `Restart-Computer` · `Stop-Computer` · `shutdown /r /t 600` |
| Ejecutar como administrador | `sudo comando` · `sudo -i` · `sudo visudo` | Terminal (Administrador) · `Start-Process pwsh -Verb RunAs` |

### 6. Monitorización del sistema y registros (RA4.f)

| Qué | Linux | Windows |
|---|---|---|
| Carga y tiempo encendido | `uptime` (carga media en 1/5/15 min, que se compara con el número de núcleos) | Administrador de tareas → Rendimiento |
| CPU y memoria en vivo | `top`, `htop`, `btop`, `vmstat 2 5` | Monitor de recursos (`resmon`), `Get-Process` |
| Disco | `df -h`, `du -sh /var/*`, `iostat -xz 2` (paquete sysstat) | `Get-Volume`, Monitor de recursos → Disco |
| Contadores e historial | `sar` (sysstat), Netdata o Glances (ampliación) | Monitor de rendimiento (`perfmon`): contadores y conjuntos de recopiladores de datos |
| Registros | `journalctl -b -p err` · `journalctl -u ssh --since "1 hour ago"` · `journalctl -f` · `/var/log/auth.log` · `last`, `lastb`, `who`, `w` | Visor de eventos (`eventvwr.msc`): Aplicación, Sistema, Seguridad · `Get-WinEvent` |

```powershell
# Errores del sistema de las últimas 24 h
Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 2; StartTime = (Get-Date).AddDays(-1) }
# Inicios de sesión fallidos (4625) y correctos (4624) — requiere administrador
Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4625 } -MaxEvents 20
# Uso de CPU sin depender del idioma de los nombres de contadores
Get-CimInstance Win32_PerfFormattedData_PerfOS_Processor -Filter "Name='_Total'" | Select-Object PercentProcessorTime
```

```bash
sudo journalctl -u ssh --since today | grep -i "failed password"
sudo journalctl --disk-usage
```

### 7. Utilidades de mantenimiento y optimización (RA4.g)

| Tarea | Linux | Windows |
|---|---|---|
| Liberar espacio | `sudo apt autoremove --purge` · `sudo apt clean` · `sudo journalctl --vacuum-time=2weeks` · BleachBit | Sensor de almacenamiento · `cleanmgr` · `Dism /Online /Cleanup-Image /StartComponentCleanup` |
| Programas de inicio | `systemctl list-unit-files --state=enabled` · Aplicaciones al inicio (GNOME) | Administrador de tareas → Aplicaciones de arranque · Sysinternals **Autoruns** |
| Análisis de procesos | `htop`, `btop` | Sysinternals **Process Explorer**, **Process Monitor** |
| Arranque | `systemd-analyze blame` · `systemd-analyze critical-chain` | Visor de eventos → Diagnostics-Performance |
| Reinicios pendientes | `needrestart`, `/var/run/reboot-required` | Windows Update |

Criterios para evaluar una utilidad (los mismos de UD03): licencia y origen, mantenimiento, consumo, función real frente a la que promete y riesgos. **Se desaconsejan los "optimizadores milagro"**: limpiadores del registro y aceleradores de RAM.

### 8. Equivalencias en otras tecnologías

| Tarea | Ubuntu | Fedora/Rocky | Windows Server (sin dominio) | macOS |
|---|---|---|---|---|
| Grupo con permisos de administración | `sudo` | `wheel` | Administradores | `admin` |
| Alta de usuario | `adduser` / `useradd` | `useradd` | `New-LocalUser` | `sysadminctl -addUser` |
| Servicios | `systemctl` | `systemctl` | `Get-Service` | `launchctl` |
| Registros | `journalctl` | `journalctl` | `Get-WinEvent` | `log show` |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. Anatomía de `/etc/passwd` y `/etc/shadow`.** Identificar cada campo, el algoritmo de *hash* (`$y$` = yescrypt en Ubuntu 24.04) y la caducidad. ¿Por qué `/etc/shadow` no es legible por cualquiera?
- **A2. El proceso desbocado.** Lanzar `yes > /dev/null &` (Linux) y un bucle `while($true){}` en PowerShell. Localizarlos por consumo, bajarles la prioridad y terminarlos con señales distintas. Comparar SIGTERM con SIGKILL.
- **A3. Reto de permisos.** Diez situaciones del tipo "QA debe leer pero no modificar; el becario solo un archivo". Resolverlas en Linux (chmod, setgid, ACL) y en Windows (icacls), y comprobarlas iniciando sesión con cada usuario (`su - becario`, `runas /user:becario cmd`).
- **A4. Debate sobre contraseñas.** Comparar las recomendaciones de NIST SP 800-63B con la política "clásica" (caducidad de 30 días y complejidad). Acordar la política de la empresa cliente.
- **A5. Línea base.** Medir el sistema en reposo y con carga (compilar un proyecto o ejecutar `stress-ng`) y registrar CPU, memoria y E/S.

### Práctica evaluable

**P4 · Cuentas, permisos y servicios de la empresa cliente.** En `UB-SRV` y `W11-DEV`:

1. **Altas masivas** con `altas.sh` y `altas.ps1`, a partir de un `usuarios.csv` con 4 personas de desarrollo, 2 de QA, 1 de administración y 1 becario. Grupos `desarrollo`, `qa` y `admin`. Bajas con un script inverso.
2. **Directivas:**
   - Longitud mínima de 12, historial de 5 y bloqueo tras 5 intentos durante 15 min.
   - Caducidad de la cuenta del becario a final de curso.
   - Justificación de los valores elegidos.
3. **Escenario de permisos** en `/srv/proyectos/appmovil` y `C:\Proyectos\AppMovil`:
   - `desarrollo` puede modificar; `qa` puede leer y ejecutar; el becario solo lee `docs/`; el resto no tiene acceso.
   - Lo nuevo que se cree dentro hereda estos permisos.
   - Se comprueba con cada usuario.
4. **Servicios y procesos:**
   - Inventario de los servicios activos.
   - Desactivar dos innecesarios para un servidor, con justificación (por ejemplo, `cups-browsed` o `ModemManager` en Linux; Fax o Xbox en Windows) y comprobando que el sistema sigue funcionando.
   - Instalar un servicio (`apache2` o `nginx`), gestionarlo y comprobar que arranca con el sistema.
   - Localizar y terminar un proceso desbocado.
5. **Monitorización:** informe con la línea base en reposo y con carga, los 5 procesos que más consumen y las entradas de registro de los inicios de sesión fallidos provocados durante la práctica (`journalctl`, `Get-WinEvent` 4625).
6. **Mantenimiento:** limpieza de espacio documentada (antes y después) y evaluación de dos utilidades (por ejemplo, BleachBit y el Sensor de almacenamiento, o Autoruns y el Administrador de tareas).

Los scripts se versionan en el repositorio, en `P4/scripts/`.

**Conexión con el mundo real:** equivale a la gestión de altas y bajas de personal (*onboarding/offboarding*) y al control de accesos según el principio de mínimo privilegio, tareas habituales del soporte de sistemas de una empresa de software.

Verificación en el puesto: el docente inicia sesión como `qa1` y como `becario` e intenta escribir en las carpetas protegidas.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA4.a | Scripts de alta y baja idempotentes (no fallan si el usuario existe) en ambos SO; grupos correctos. | Altas y grupos correctos en ambos SO, con script en al menos uno. | Altas manuales incompletas o grupos erróneos. |
| RA4.b | Todas las directivas aplicadas y verificadas (bloqueo provocado y comprobado) en ambos SO, con justificación basada en recomendaciones actuales. | Directivas aplicadas en ambos SO con alguna sin verificar. | Directivas ausentes o en un solo SO. |
| RA4.c | Inventaría, desactiva con justificación, instala y gestiona un servicio, y controla procesos con señales y prioridades. | Gestiona servicios y procesos correctamente en ambos SO. | No distingue proceso de servicio o no completa las tareas. |
| RA4.d | Escenario completo con herencia (setgid/ACL por defecto, OI/CI), comprobado con cada usuario en ambos SO. | Escenario correcto con algún fallo de herencia. | Permisos excesivos (777, Todos: Control total) o no comprobados. |
| RA4.e | Todo por CLI, con scripts comentados y versionados. | La mayor parte por CLI. | Mayoritariamente por GUI. |
| RA4.f | Informe con línea base, interpretación de los datos y correlación con los registros. | Informe con datos y registros relevantes. | Capturas sin interpretación. |
| RA4.g | Evalúa dos utilidades con criterios y mediciones antes y después. | Usa y describe dos utilidades. | Sin evaluación. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Linux: [Ubuntu Server: usuarios y seguridad](https://documentation.ubuntu.com/server/) · `man useradd`, `man chage`, `man setfacl`, `man systemctl`, `man journalctl` · [pam_faillock](https://man7.org/linux/man-pages/man8/pam_faillock.8.html).
  - Windows: [Microsoft.PowerShell.LocalAccounts](https://learn.microsoft.com/powershell/module/microsoft.powershell.localaccounts/) · [icacls](https://learn.microsoft.com/windows-server/administration/windows-commands/icacls) · [Get-WinEvent](https://learn.microsoft.com/powershell/module/microsoft.powershell.diagnostics/get-winevent) · [Sysinternals](https://learn.microsoft.com/sysinternals/).
  - Contraseñas: [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html) · [INCIBE](https://www.incibe.es/).
- **Herramientas:** `htop`, `btop`, `sysstat`, `stress-ng`, BleachBit, Sysinternals Suite.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
