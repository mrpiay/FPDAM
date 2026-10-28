# UD03 · Almacenamiento, sistemas de archivos y cifrado

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 19 h · 23 sesiones de 50 min (≈ 3,8 semanas a 6 sesiones; propuesta del docente) | RA3 (a, b, c, d, g; 100 % de la UD) · refuerza RA6.e |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA3.a | Se han comparado sistemas de archivos. | [RD 405/2023, anexo I, 0483, RA3.a][boe] | P3 (tabla comparativa con pruebas) · PE1 |
| RA3.b | Se ha identificado la estructura y función de los directorios del sistema operativo. | [RD 405/2023, anexo I, 0483, RA3.b][boe] | P3 (mapa de directorios) · PE1 |
| RA3.c | Se han utilizado herramientas en entorno gráfico y comandos para localizar información en el sistema de archivos. | [RD 405/2023, anexo I, 0483, RA3.c][boe] | P3 (batería de búsquedas) · PE1 (tareas en MV) |
| RA3.d | Se han creado diferentes tipos de particiones y unidades lógicas. | [RD 405/2023, anexo I, 0483, RA3.d][boe] | P3 (particiones, LVM, montaje persistente, cifrado) · PE1 |
| RA3.g | Se han instalado y evaluado utilidades relacionadas con la gestión de información. | [RD 405/2023, anexo I, 0483, RA3.g][boe] | P3 (evaluación de utilidades) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Comparar sistemas de archivos (FAT32, exFAT, NTFS, ReFS, ext4, XFS, btrfs) y elegir el adecuado para cada uso.
2. Explicar la jerarquía de directorios de Linux (FHS) y de Windows y moverse por ella con rutas absolutas y relativas.
3. Gestionar archivos, directorios y enlaces por línea de comandos y con el explorador gráfico.
4. Localizar archivos y contenido con `find`, `grep`, `locate`, `Get-ChildItem` y `Select-String`, e identificar el software instalado.
5. Crear tablas de particiones MBR y GPT, particiones primarias, extendidas y lógicas, volúmenes LVM y montajes persistentes.
6. Comprobar, reparar y optimizar volúmenes, y cifrarlos con LUKS y BitLocker.
7. Instalar y evaluar utilidades de gestión de la información con criterios objetivos.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloque «Gestión de la información» ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Sistemas de archivos (RA3.a)

Un **sistema de archivos** organiza los datos de un volumen en archivos y directorios. Para ello guarda:

- **Metadatos**: nombre, tamaño, fechas, propietario y permisos.
- **Mapa de bloques o clústeres** asignados a cada archivo:
  - En **ext4**, los metadatos de cada archivo están en un **inodo**.
  - En **NTFS**, cada archivo tiene una entrada en la **MFT** (*Master File Table*).
- **Registro de transacciones (*journaling*)**: anota los cambios antes de hacerlos para recuperar la coherencia tras un corte de luz.

| Sistema | Tamaño máx. de archivo | Tamaño máx. de volumen | *Journaling* | Permisos/ACL | Lectura/escritura nativa | Uso típico |
|---|---|---|---|---|---|---|
| **FAT32** | 4 GiB − 1 B | 2 TiB (formatear desde Windows: 32 GB) | No | No | Todos | ESP de UEFI, dispositivos antiguos |
| **exFAT** | 16 EiB | 128 PiB | No | No | Windows, macOS, Linux (núcleo ≥ 5.4) | Memorias USB y tarjetas SD de más de 32 GB |
| **NTFS** | 16 TiB-8 PiB (según versión y clúster) | 8 PiB | Sí | ACL, cifrado EFS, compresión, cuotas | Windows; Linux con `ntfs3`/`ntfs-3g` | Sistema y datos en Windows |
| **ReFS** | 35 PB | 35 PB | Integridad por *checksums* | ACL | Windows Server / Dev Drive en Windows 11 | Almacenamiento resiliente, **Dev Drive** |
| **ext4** | 16 TiB | 1 EiB | Sí | POSIX + ACL | Linux | Sistema Linux por defecto (Ubuntu, Debian) |
| **XFS** | 8 EiB | 8 EiB | Sí | POSIX + ACL | Linux | Por defecto en RHEL, Rocky y Alma; archivos grandes |
| **btrfs** | 16 EiB | 16 EiB | Copia en escritura (CoW) | POSIX + ACL | Linux | Instantáneas, subvolúmenes (Fedora, openSUSE) |
| **APFS** | 8 EiB | — | CoW | ACL | macOS/iOS | Equipos Apple |

Para DAM: Windows 11 incluye **Dev Drive** (ReFS optimizado para repositorios y compilaciones, con Defender en modo de rendimiento), y en Linux el código suele vivir en ext4. Con WSL conviene trabajar dentro del sistema de archivos de Linux y no en `/mnt/c`, por rendimiento.

```bash
lsblk -f                       # dispositivos, sistema de archivos, etiqueta, UUID y punto de montaje
df -hT                         # espacio por sistema de archivos con su tipo
stat archivo.txt               # inodo, bloques, fechas
sudo tune2fs -l /dev/sda2 | head -20   # parámetros de un ext4
```

```powershell
Get-Volume | Format-Table DriveLetter, FileSystemType, FileSystemLabel, Size, SizeRemaining
fsutil fsinfo ntfsinfo C:      # tamaño de clúster, MFT… (administrador)
```

### 2. Estructura de directorios (RA3.b)

**Linux (FHS, *Filesystem Hierarchy Standard*):**

| Directorio | Contenido |
|---|---|
| `/` | Raíz única: todos los discos se montan dentro del árbol |
| `/bin`, `/sbin`, `/lib` | En Ubuntu actual son enlaces a `/usr/bin`, `/usr/sbin` y `/usr/lib` (*usr merge*) |
| `/boot` | Núcleo (`vmlinuz`), `initrd`, GRUB; `/boot/efi` es la ESP |
| `/dev` | Archivos de dispositivo (`/dev/sda`, `/dev/nvme0n1`, `/dev/null`) |
| `/etc` | Configuración del sistema (texto plano) |
| `/home` | Directorios personales; `/root` es el del administrador |
| `/media`, `/mnt` | Montajes automáticos (USB) y manuales |
| `/opt` | Software de terceros autocontenido (p. ej., Android Studio) |
| `/proc`, `/sys` | Sistemas de archivos virtuales con información del núcleo |
| `/run` | Datos volátiles desde el arranque (PID, sockets) |
| `/srv` | Datos servidos (web, Samba, proyectos compartidos) |
| `/tmp` | Temporales (se vacía al reiniciar) |
| `/usr` | Programas y bibliotecas del sistema; `/usr/local` para lo compilado localmente |
| `/var` | Datos variables: `/var/log`, `/var/lib`, `/var/cache`, `/var/www` |

**Windows:**

| Ruta | Contenido |
|---|---|
| `C:\Windows`, `C:\Windows\System32` | SO, controladores (`System32\drivers`), herramientas; `SysWOW64` para 32 bits |
| `C:\Program Files`, `C:\Program Files (x86)` | Aplicaciones de 64 y 32 bits |
| `C:\ProgramData` (oculta) | Datos de aplicaciones comunes a todas las cuentas |
| `C:\Users\<usuario>` | Perfil: Escritorio, Documentos, Descargas; `AppData\Local`, `AppData\Roaming` (oculta) |
| `C:\$Recycle.Bin`, `pagefile.sys`, `hiberfil.sys` | Papelera, paginación, hibernación (ocultos y de sistema) |

Diferencias clave:

| | Linux | Windows |
|---|---|---|
| Árbol | Uno solo | Uno por letra de unidad |
| Separador | `/` | `\` (PowerShell también acepta `/`) |
| Mayúsculas en nombres | Distingue mayúsculas y minúsculas | No las distingue (salvo que se active por directorio) |
| Ocultos | Por nombre: empiezan por `.` | Por atributo |
| Variables de rutas | `~`, `$HOME` | `%USERPROFILE%` en cmd; `$env:USERPROFILE`, `$env:APPDATA` en PowerShell |

**Gestión básica de archivos** (los alias de PowerShell entre paréntesis):

| Acción | bash | PowerShell |
|---|---|---|
| Listar (con ocultos) | `ls -la` | `Get-ChildItem -Force` (`ls`, `dir`, `gci`) |
| Cambiar de directorio | `cd /etc` · `cd ..` · `cd ~` | `Set-Location C:\Windows` (`cd`) |
| Crear directorio (con padres) | `mkdir -p proyectos/app/src` | `New-Item -ItemType Directory -Path proyectos\app\src -Force` (`mkdir`) |
| Copiar recursivo | `cp -r origen destino` | `Copy-Item origen destino -Recurse` (`cp`) |
| Mover o renombrar | `mv a b` | `Move-Item a b` · `Rename-Item a b` |
| Borrar recursivo | `rm -r dir` (¡cuidado con `-f`!) | `Remove-Item dir -Recurse` (`rm`) |
| Ver contenido | `cat`, `less`, `head -n 20`, `tail -f` | `Get-Content f -TotalCount 20` · `Get-Content f -Tail 10 -Wait` |
| Enlace simbólico | `ln -s /srv/datos ~/datos` | `New-Item -ItemType SymbolicLink -Path C:\datos -Target D:\datos` · `mklink /D` (cmd) |
| Árbol | `tree -L 2` (paquete `tree`) | `tree /F` |
| Espacio por carpeta | `du -sh *` | `Get-ChildItem -Recurse -File \| Measure-Object Length -Sum` |

### 3. Localizar información en el sistema (RA3.c)

**Linux:**

```bash
find /etc -name "*.conf" -mtime -7                # .conf modificados en los últimos 7 días
find ~ -type f -size +100M -exec ls -lh {} \;     # archivos de más de 100 MB
find / -user ana -type f 2>/dev/null              # archivos de ana (descarta errores de permisos)
find ~/proyectos -name "*.java" -newer ~/proyectos/build.gradle
grep -rn --include="*.java" "TODO" ~/proyectos     # contenido, con número de línea
grep -ril "password" /etc 2>/dev/null              # solo nombres de archivo, sin distinguir mayúsculas
sudo apt install plocate && sudo updatedb && locate -i sshd_config   # búsqueda indexada, muy rápida
which java ; type ll ; whereis bash ; file /usr/bin/ls
```

**Windows (PowerShell):**

```powershell
Get-ChildItem C:\Users -Recurse -Filter *.java -ErrorAction SilentlyContinue
Get-ChildItem C:\ -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object Length -gt 100MB | Sort-Object Length -Descending |
  Select-Object -First 10 FullName, @{n='MB'; e={[math]::Round($_.Length / 1MB)}}
Get-ChildItem .\proyectos -Recurse -Include *.java | Select-String -Pattern "TODO"
Get-ChildItem C:\Windows\Logs -Recurse | Where-Object LastWriteTime -gt (Get-Date).AddDays(-7)
Get-Command java ; where.exe java
```

En el entorno gráfico: búsqueda del Explorador de archivos (filtros por tipo, fecha y tamaño en la pestaña *Buscar*), opciones de indexación (`control /name Microsoft.IndexingOptions`) y *Everything* como utilidad indexada; en GNOME, la búsqueda de *Archivos* (Nautilus).

**Identificación del software instalado:**

| | Ubuntu | Windows |
|---|---|---|
| Paquetes del sistema | `dpkg -l` · `apt list --installed` · `apt-mark showmanual` | `winget list` · `Get-Package` (Windows PowerShell 5.1) |
| Formatos universales | `snap list` · `flatpak list` | `Get-AppxPackage \| Select-Object Name, Version` (Store/MSIX) |
| Registro de programas | — | `Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*, HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* \| Select-Object DisplayName, DisplayVersion, Publisher` |
| GUI | Centro de aplicaciones | Configuración → Aplicaciones → Aplicaciones instaladas |

### 4. Particiones, volúmenes y unidades lógicas (RA3.d)

| | **MBR** | **GPT** |
|---|---|---|
| Particiones | 4 primarias, o 3 primarias + 1 **extendida** con **unidades lógicas** dentro | 128 (en Windows), sin extendidas |
| Tamaño máximo de disco | 2 TiB | 8 ZiB |
| Redundancia | No | Cabecera y tabla duplicadas al final del disco, CRC32 |
| Firmware | BIOS *legacy* (UEFI en modo CSM) | UEFI (obligatorio para Windows 11) |

- **LVM** (Linux): agrupa discos físicos en volúmenes lógicos redimensionables. Tiene tres niveles:
  - **PV**: volumen físico (un disco o partición).
  - **VG**: grupo de volúmenes, que suma varios PV.
  - **LV**: volumen lógico, el que se formatea y se monta.

  Ubuntu Server lo usa por defecto. En Windows, el equivalente son los **Espacios de almacenamiento** (y los antiguos discos dinámicos).

**Linux, paso a paso:**

```bash
lsblk                                      # el disco nuevo aparece como /dev/sdb
sudo parted /dev/sdb --script mklabel gpt \
  mkpart datos ext4 1MiB 60% \
  mkpart intercambio 60% 100%
sudo mkfs.ext4 -L datos /dev/sdb1
sudo mkfs.exfat -n INTERCAMBIO /dev/sdb2   # paquete exfatprogs
sudo mkdir -p /srv/datos && sudo mount /dev/sdb1 /srv/datos
sudo blkid /dev/sdb1                       # copiar el UUID
# /etc/fstab  →  UUID=<uuid>  /srv/datos  ext4  defaults,nofail  0  2
sudo findmnt --verify && sudo systemctl daemon-reload && sudo mount -a

# MBR con extendida y lógicas (fdisk interactivo): o → n p → n e → n l → n l → w
sudo fdisk /dev/sdc

# LVM con dos discos
sudo pvcreate /dev/sdd /dev/sde
sudo vgcreate vg_proyectos /dev/sdd /dev/sde
sudo lvcreate -n lv_repos -L 6G vg_proyectos
sudo mkfs.ext4 /dev/vg_proyectos/lv_repos
sudo lvextend -r -L +2G /dev/vg_proyectos/lv_repos   # -r amplía también el sistema de archivos
sudo pvs ; sudo vgs ; sudo lvs
```

**Windows (Administración de discos `diskmgmt.msc`, `diskpart` o PowerShell):**

```powershell
Get-Disk
Get-Disk | Where-Object PartitionStyle -eq 'RAW' |
  Initialize-Disk -PartitionStyle GPT -PassThru |
  New-Partition -DriveLetter E -Size 20GB |
  Format-Volume -FileSystem NTFS -NewFileSystemLabel "Datos" -Confirm:$false
New-Partition -DiskNumber 1 -UseMaximumSize -DriveLetter F | Format-Volume -FileSystem exFAT -NewFileSystemLabel "Intercambio"
Resize-Partition -DriveLetter E -Size 25GB             # si hay espacio libre contiguo
New-Item -ItemType Directory C:\Proyectos
Add-PartitionAccessPath -DriveLetter F -AccessPath "C:\Proyectos"   # montar un volumen en una carpeta NTFS vacía
```

```
diskpart
list disk
select disk 2
clean
convert mbr
create partition primary size=4096
create partition extended
create partition logical size=2048
format fs=ntfs quick label=Logica1
assign letter=L
```

### 5. Chequeo, desfragmentación y salud del disco

| Tarea | Linux | Windows |
|---|---|---|
| Comprobar y reparar el sistema de archivos | `sudo umount /dev/sdb1 && sudo fsck -f /dev/sdb1` (nunca montado) | `chkdsk E: /f` · `Repair-Volume -DriveLetter E -Scan` / `-OfflineScanAndFix` |
| Estado SMART | `sudo smartctl -a /dev/sda` (paquete smartmontools; limitado en MV) | `Get-PhysicalDisk \| Get-StorageReliabilityCounter` |
| Desfragmentar (HDD) | `sudo e4defrag -c /home` (rara vez necesario en ext4) | `Optimize-Volume -DriveLetter C -Analyze -Verbose` · `defrag C: /A /V` |
| TRIM (SSD) | `sudo fstrim -av` (`fstrim.timer` semanal activo) | `Optimize-Volume -DriveLetter C -ReTrim -Verbose` |

En un SSD **no se desfragmenta**: se ejecuta TRIM, que Windows y Ubuntu ya programan automáticamente.

### 6. Cifrado de volúmenes

El cifrado de volúmenes protege los datos si se pierde o roban el disco o el portátil. Esta parte enlaza con RA6.e (necesidad de proteger los recursos).

**LUKS (Linux):**

```bash
sudo apt install cryptsetup
sudo cryptsetup luksFormat --type luks2 /dev/sdb3       # pide confirmación (YES) y frase de paso
sudo cryptsetup open /dev/sdb3 rrhh                      # crea /dev/mapper/rrhh
sudo mkfs.ext4 -L rrhh /dev/mapper/rrhh
sudo mkdir -p /srv/rrhh && sudo mount /dev/mapper/rrhh /srv/rrhh
sudo umount /srv/rrhh && sudo cryptsetup close rrhh      # vuelve a quedar cifrado
sudo cryptsetup luksDump /dev/sdb3                        # ranuras de clave, algoritmo (aes-xts-plain64)
sudo cryptsetup luksAddKey /dev/sdb3                      # segunda clave de recuperación
sudo cryptsetup luksHeaderBackup /dev/sdb3 --header-backup-file rrhh-header.img
# Desbloqueo al arrancar: /etc/crypttab → rrhh UUID=<uuid-luks> none luks
#                         /etc/fstab   → /dev/mapper/rrhh /srv/rrhh ext4 defaults,nofail 0 2
```

**BitLocker (Windows 11 Pro):**

- **Unidad del sistema:** usa el TPM (VirtualBox 7 ofrece TPM 2.0 virtual).
- **Unidades de datos:** usan contraseña o desbloqueo automático.
- **Unidades extraíbles:** BitLocker To Go.

```powershell
$pw = Read-Host -AsSecureString "Contraseña de BitLocker"
Enable-BitLocker -MountPoint "E:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -PasswordProtector -Password $pw
Add-BitLockerKeyProtector -MountPoint "E:" -RecoveryPasswordProtector
(Get-BitLockerVolume -MountPoint "E:").KeyProtector      # anotar la clave de recuperación de 48 dígitos
manage-bde -status
manage-bde -lock E:
Unlock-BitLocker -MountPoint "E:" -Password $pw
```

**Dónde se guarda la clave de recuperación:** en una cuenta Microsoft, en Active Directory o Entra ID, o impresa y custodiada. Si se pierde, los datos no se recuperan. Alternativa multiplataforma: **VeraCrypt** (volúmenes y contenedores).

### 7. Utilidades de gestión de la información (RA3.g)

| Necesidad | Linux | Windows | Multiplataforma |
|---|---|---|---|
| Uso de disco | `ncdu`, Analizador de uso de disco (Baobab) | WizTree, WinDirStat | — |
| Particiones | GParted | Administración de discos, MiniTool (versión gratuita) | GParted Live |
| Búsqueda indexada | `plocate`, Tracker (GNOME) | Everything | — |
| Duplicados | `fdupes`, Czkawka | Czkawka | Czkawka |
| Compresión | `tar`, `zip`, `7z` (p7zip) | 7-Zip, NanaZip, `Compress-Archive` | 7-Zip |
| Cifrado de archivos | `gpg`, `age` | 7-Zip (AES-256), EFS | VeraCrypt, Cryptomator |

**Criterios de evaluación de una utilidad** (para la práctica):

- Licencia y coste.
- Mantenimiento: fecha de la última versión.
- Fuente de descarga oficial o firma.
- Consumo de recursos.
- Funciones frente a la necesidad.
- Facilidad de uso.
- Disponibilidad en CLI para automatizar.
- Privacidad y telemetría.

### 8. Equivalencias en otras tecnologías

| Concepto | Ubuntu/Debian | Fedora/Rocky/Alma | Windows | macOS |
|---|---|---|---|---|
| Sistema de archivos por defecto | ext4 | btrfs (Fedora) / XFS (Rocky) | NTFS | APFS |
| Software instalado | `dpkg -l` | `rpm -qa` · `dnf list --installed` | `winget list` | `brew list`, `system_profiler SPApplicationsDataType` |
| Particionado CLI | `parted`, `fdisk` | `parted`, `fdisk` | `diskpart`, `Storage` | `diskutil` |
| Cifrado | LUKS | LUKS | BitLocker | FileVault |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. El límite de FAT32.** Formatear un USB virtual en FAT32, intentar copiar un archivo de 5 GB (`fallocate -l 5G grande.bin` o `fsutil file createnew grande.bin 5368709120`), y repetir en exFAT y NTFS. Explicar el resultado.
- **A2. Búsqueda del tesoro.** El docente esconde 10 "pistas" en una MV plantilla (archivo con un texto concreto, archivo de más de 200 MB, archivo modificado ayer, archivo de un usuario, enlace roto…). Hay que encontrarlas solo con comandos, primero en Linux y después en Windows.
- **A3. Mapa de directorios.** Completar una tabla con la ruta, en ambos SO, de: configuración de red, registros del sistema, programas instalados, perfil del usuario, temporales, controladores y cargador de arranque.
- **A4. MBR frente a GPT.** En un disco de 8 GB, crear 3 primarias, una extendida y 2 lógicas en MBR con `fdisk` y con `diskpart`. Convertirlo a GPT y comparar.
- **A5. Ampliar en caliente.** Añadir un tercer disco al VG `vg_proyectos` y ampliar `lv_repos` sin desmontar.

### Práctica evaluable

**P3 · Almacenamiento de la empresa cliente.** Sobre `UB-SRV` (con 4 discos virtuales nuevos de 5-10 GB) y `W11-DEV` (con 2 discos nuevos):

1. **Comparativa de sistemas de archivos.** Tabla de 6 sistemas como mínimo, con pruebas propias en las MV (límite de tamaño de archivo, permisos, lectura cruzada Windows/Linux de un USB virtual) y una recomendación para cada uso de la empresa cliente: sistema, datos de proyectos, USB de intercambio, ESP.
2. **Mapa de directorios** de ambos SO, indicando dónde viven los datos que la empresa cliente debe incluir en las copias (se usará en UD05).
3. **Particionado en `UB-SRV`:**
   - Disco GPT con `datos` (ext4) e `intercambio` (exFAT).
   - Disco MBR con una extendida y dos lógicas.
   - LVM `vg_proyectos/lv_repos` sobre dos discos, montado en `/srv/proyectos`.
   - Todo persistente en `/etc/fstab` con UUID y comprobado tras reiniciar.
4. **Volumen cifrado** `/srv/rrhh` con LUKS: dos claves y copia de la cabecera.
5. **En `W11-DEV`:**
   - Disco GPT con `E:` en NTFS.
   - Carpeta `C:\Proyectos` montada sobre un volumen.
   - `E:` cifrada con BitLocker y clave de recuperación custodiada (no se entrega la clave real).
6. **Mantenimiento:** `fsck` y `chkdsk` documentados; análisis de optimización.
7. **Batería de 10 búsquedas** (enunciado del docente), resueltas en los dos SO con comando y salida; inventario del software instalado exportado a archivo.
8. **Evaluación de dos utilidades** de la misma categoría (por ejemplo, `ncdu` frente a Baobab, o WizTree frente a WinDirStat) con los criterios del apartado 7 y una conclusión.

Verificación en el puesto: reiniciar `UB-SRV` y mostrar `lsblk -f`, `df -hT` y el desbloqueo de LUKS; bloquear y desbloquear `E:`.

**Conexión con el mundo real:** equivale a preparar el almacenamiento de un servidor de proyectos y aplicar la política de cifrado de equipos que exige la protección de datos de la empresa.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA3.a | Comparativa con pruebas propias y recomendaciones razonadas por uso. | Comparativa correcta de 6 sistemas con recomendación. | Tabla incompleta, errónea o copiada sin pruebas. |
| RA3.b | Mapa completo en ambos SO y relación con copias y permisos. | Mapa correcto de los directorios principales. | Confunde funciones de directorios clave. |
| RA3.c | Resuelve las 10 búsquedas en ambos SO con comandos eficientes (filtros, tuberías) e inventario completo. | Resuelve al menos 7 búsquedas en ambos SO. | Menos de 7 o solo en un SO / solo GUI. |
| RA3.d | Todos los esquemas funcionan tras reiniciar (GPT, MBR con lógicas, LVM, montaje en carpeta, LUKS, BitLocker) y explica cada paso. | Particiones, LVM y montajes persistentes correctos; algún fallo menor en el cifrado. | Montajes no persistentes, sin LVM o sin cifrado. |
| RA3.g | Instala y evalúa las dos utilidades con todos los criterios, mediciones y conclusión fundamentada. | Evaluación correcta con la mayoría de criterios. | Descripción sin evaluación. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Linux: [Filesystem Hierarchy Standard 3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html) · [Ubuntu Server: almacenamiento y LVM](https://documentation.ubuntu.com/server/) · `man find`, `man cryptsetup`, `man fstab`.
  - Windows: [Cmdlets de Storage](https://learn.microsoft.com/powershell/module/storage/) · [BitLocker](https://learn.microsoft.com/windows/security/operating-system-security/data-protection/bitlocker/) · [Dev Drive](https://learn.microsoft.com/windows/dev-drive/).
- **Herramientas:** GParted, `ncdu`, Baobab, WizTree, WinDirStat, Everything, VeraCrypt, `smartmontools`.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
