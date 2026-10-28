# UD02 · Sistemas operativos, virtualización e instalación

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 25 h · 30 sesiones de 50 min (≈ 5 semanas a 6 sesiones; propuesta del docente) | RA2 (b-i; ~90 % de la UD) · RA7 (a; ~10 %) |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA2.b | Se han analizado las características, funciones y arquitectura de un sistema operativo. | [RD 405/2023, anexo I, 0483, RA2.b][boe] | PE1 (preguntas cortas) · P2 (apartado 1) |
| RA2.c | Se han comparado sistemas operativos en base a sus requisitos, características, campos de aplicación y licencias de uso. | [RD 405/2023, anexo I, 0483, RA2.c][boe] | P2 (informe comparativo) · PE1 |
| RA2.d | Se ha planificado el proceso de la instalación de sistemas operativos. | [RD 405/2023, anexo I, 0483, RA2.d][boe] | P2 (plan de instalación) |
| RA2.e | Se han instalado y actualizado sistemas operativos libres y propietarios. | [RD 405/2023, anexo I, 0483, RA2.e][boe] | P2 (instalación de Windows 11 y Ubuntu) · PE1 |
| RA2.f | Se han aplicado técnicas de actualización y recuperación del sistema. | [RD 405/2023, anexo I, 0483, RA2.f][boe] | P2 (actualización, punto de restauración, reparación del arranque) · PE1 |
| RA2.g | Se han utilizado tecnologías de virtualización para instalar y probar sistemas operativos. | [RD 405/2023, anexo I, 0483, RA2.g][boe] | P2 (laboratorio en VirtualBox, instantáneas, redes) · PE1 |
| RA2.h | Se han instalado, desinstalado y actualizado aplicaciones. | [RD 405/2023, anexo I, 0483, RA2.h][boe] | P2 (gestores de paquetes) · PE1 |
| RA2.i | Se han documentado los procesos realizados. | [RD 405/2023, anexo I, 0483, RA2.i][boe] | P2 (memoria e incidencias en Markdown) |
| RA7.a | Se ha clasificado software en función de su licencia y propósito. | [RD 405/2023, anexo I, 0483, RA7.a][boe] | P2 (tabla de licencias) · PE1 |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Explicar las funciones de un sistema operativo, su arquitectura (núcleo, modos de ejecución, llamadas al sistema) y su evolución.
2. Comparar Windows, Linux, macOS, Android y otros sistemas por requisitos, uso y licencia.
3. Planificar una instalación: requisitos, firmware, particionado, licencia, controladores y plan de vuelta atrás.
4. Crear y gestionar máquinas virtuales en VirtualBox (o Hyper-V) por GUI y con `VBoxManage`, incluidos instantáneas, clones y modos de red.
5. Instalar y actualizar Windows 11 Pro y Ubuntu 24.04 LTS, en arranque dual incluido, y configurar y reparar el gestor de arranque.
6. Instalar, actualizar y desinstalar aplicaciones con `apt`, `snap`, `winget` y los instaladores gráficos.
7. Aplicar técnicas de recuperación (puntos de restauración, WinRE, `sfc`/`DISM`, Timeshift, modo de recuperación de GRUB).
8. Documentar la instalación y las incidencias en Markdown.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloques «Instalación de sistemas operativos»; «Explotación de aplicaciones informáticas de propósito general» (software: tipos, requisitos, licencias) ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Qué es y qué hace un sistema operativo (RA2.b)

Un **sistema operativo** es el software de base que gestiona los recursos del hardware y ofrece a las aplicaciones y a las personas usuarias una interfaz para usarlos. Sus funciones son:

| Función | Qué gestiona | Ejemplo observable |
|---|---|---|
| Procesos | Creación, planificación de la CPU, sincronización | `top`, Administrador de tareas |
| Memoria | Asignación, memoria virtual, paginación | `free -h`, `pagefile.sys` |
| Archivos | Sistemas de archivos, permisos | `ls -l`, propiedades NTFS |
| E/S y dispositivos | Controladores, colas, interrupciones | `lsmod`, Administrador de dispositivos |
| Seguridad | Usuarios, autenticación, permisos | `sudo`, Control de cuentas de usuario (UAC) |
| Red | Pila TCP/IP | `ip a`, `ipconfig` |
| Interfaz | CLI (shell) y GUI | bash, PowerShell, GNOME, Explorer |

- **Modos de ejecución.** La CPU distingue **modo núcleo (kernel, anillo 0)** y **modo usuario (anillo 3)**. Las aplicaciones piden servicios al núcleo mediante **llamadas al sistema**, por ejemplo `open`, `read` o `fork` en Linux y `NtCreateFile` en Windows. Se ven en Linux con `strace -c ls`.
- **Arquitecturas del núcleo:**

  | Tipo | Idea | Ejemplos |
  |---|---|---|
  | **Monolítico** (modular) | Todo el núcleo en un único espacio; se cargan módulos | Linux, FreeBSD |
  | **Micronúcleo** | Solo lo mínimo en el núcleo; los servicios corren en espacio de usuario | QNX, seL4, MINIX 3 |
  | **Híbrido** | Mezcla de los dos anteriores | Windows NT (`ntoskrnl.exe`), XNU (macOS/iOS) |

- **Evolución histórica (resumen):**
  1. Proceso por lotes (años 50-60).
  2. Multiprogramación y tiempo compartido: CTSS, MULTICS y UNIX en 1969.
  3. Ordenadores personales: MS-DOS (1981), Mac OS (1984), Windows 3.x/95.
  4. Familia NT (1993) y GNU/Linux (1991-92).
  5. Movilidad: iOS (2007), Android (2008).
  6. Virtualización y nube, y en los años 2020 SO con IA integrada y la transición a ARM (Apple Silicon, Windows on ARM).
- **Clasificación:**
  - Por usuarios: mono o multiusuario.
  - Por tareas: mono o multitarea.
  - Por procesadores: mono o multiprocesador.
  - Por uso: escritorio, servidor, móvil, **tiempo real** (RTOS), embebido, de red y distribuido.
  - Por licencia: libre o propietario.

### 2. Comparativa de sistemas operativos (RA2.c, RA7.a)

| SO | Requisitos mínimos (oficiales) | Campo de aplicación | Licencia |
|---|---|---|---|
| **Windows 11 Pro** | CPU 64 bits compatible de 1 GHz y 2 núcleos, 4 GB de RAM, 64 GB, UEFI con Secure Boot, TPM 2.0 | Escritorio corporativo, desarrollo .NET/juegos | Propietaria (EULA); OEM, Retail o por volumen |
| **Windows Server 2025** | 1,4 GHz 64 bits, 512 MB de RAM (2 GB con escritorio), 32 GB | Dominios, ficheros, IIS, Hyper-V | Propietaria por núcleos + CAL; evaluación de 180 días |
| **Ubuntu 24.04 LTS Desktop** | CPU de 2 núcleos a 2 GHz, 4 GB de RAM, 25 GB | Escritorio de desarrollo, ciencia de datos | Libre (GPL y otras); soporte estándar de 5 años |
| **Ubuntu 24.04 LTS Server** | 1 GB de RAM, 5 GB (recomendado 2-4 GB y 25 GB) | Servidores, nube, contenedores | Libre |
| **Debian 12/13** | Muy bajos | Servidores estables | Libre (DFSG) |
| **macOS** | Hardware Apple | Desarrollo iOS/macOS | Propietaria, ligada al hardware |
| **Android** | — | Móvil, IoT | AOSP (Apache 2.0) + servicios de Google propietarios |
| **ChromeOS Flex**, **FreeBSD** | Varía | Educación, red, almacenamiento | Propietaria / BSD |

Los requisitos se verifican siempre en la documentación oficial vigente, porque cambian con cada versión. La comparativa razonada con licencias es la entrega del apartado 1 de P2.

- **Tipos de aplicaciones:**
  - Por función: sistema, utilidades, ofimática, desarrollo, multimedia, servidor.
  - Por despliegue: escritorio nativa, web, móvil, multiplataforma, SaaS.
  - Por empaquetado: instalador MSI/EXE, MSIX, paquete `.deb`/`.rpm`, Snap, Flatpak, AppImage, contenedor.
- **Licencias (introducción; se amplía en UD09):**
  - **Propietaria:** EULA; modelos OEM, Retail, volumen o suscripción.
  - **Freeware** y **shareware**.
  - **Libre copyleft:** GPL, LGPL, AGPL.
  - **Libre permisiva:** MIT, BSD, Apache 2.0.
  - **Dominio público.**
  - Para elegir licencia o comprobar una: [choosealicense.com](https://choosealicense.com/) y la [lista de SPDX](https://spdx.org/licenses/).

### 3. Virtualización (RA2.g)

- **Concepto:** un **hipervisor** reparte el hardware real entre varias **máquinas virtuales (MV)** aisladas. Requiere extensiones de CPU (Intel VT-x o AMD-V, más EPT/RVI para la memoria).

| Tipo | Funcionamiento | Ejemplos |
|---|---|---|
| **Hipervisor tipo 1 (*bare-metal*)** | Se ejecuta directamente sobre el hardware | Hyper-V, Proxmox VE (KVM), VMware ESXi, Xen |
| **Hipervisor tipo 2 (alojado)** | Es una aplicación sobre un SO anfitrión | VirtualBox, VMware Workstation, UTM |
| **Paravirtualización** | El invitado sabe que está virtualizado y usa controladores optimizados | Controladores virtio, Guest Additions |
| **Contenedores** | Comparten el núcleo del anfitrión; aíslan procesos | Docker, Podman, LXC |
| **Emulación** | Traduce otra arquitectura de CPU | QEMU (arm64 sobre x86), emulador de Android |

- **Modos de red en VirtualBox:**

| Modo | La MV ve… | Desde fuera se ve la MV | Uso en el curso |
|---|---|---|---|
| **NAT** | Internet a través del anfitrión | No (salvo reenvío de puertos) | Actualizar paquetes |
| **Red NAT** | Internet y otras MV de la misma red NAT | No | Varias MV con salida a Internet |
| **Adaptador puente** | La red física del aula | Sí, con IP de la red del aula | Prácticas por parejas (UD07-08), con permiso |
| **Red interna** | Solo otras MV de la misma red interna | No | Laboratorio `labdam` |
| **Solo anfitrión** | El anfitrión y otras MV | Solo desde el anfitrión | Acceso SSH desde el anfitrión |

```powershell
# VBoxManage (Windows: "C:\Program Files\Oracle\VirtualBox\VBoxManage.exe"; añadirlo al PATH)
VBoxManage createvm --name "UB-SRV" --ostype Ubuntu_64 --register
VBoxManage modifyvm "UB-SRV" --memory 2048 --cpus 2 --firmware efi --nic1 nat --nic2 intnet --intnet2 labdam
VBoxManage createmedium disk --filename "D:\VMs\UB-SRV\UB-SRV.vdi" --size 25600
VBoxManage storagectl "UB-SRV" --name SATA --add sata --controller IntelAhci
VBoxManage storageattach "UB-SRV" --storagectl SATA --port 0 --device 0 --type hdd --medium "D:\VMs\UB-SRV\UB-SRV.vdi"
VBoxManage storageattach "UB-SRV" --storagectl SATA --port 1 --device 0 --type dvddrive --medium "D:\ISO\ubuntu-24.04-live-server-amd64.iso"
VBoxManage snapshot "UB-SRV" take "recien-instalada" --description "Tras la instalación y actualizar"
VBoxManage snapshot "UB-SRV" list
VBoxManage snapshot "UB-SRV" restore "recien-instalada"     # con la MV apagada
VBoxManage startvm "UB-SRV" --type headless
VBoxManage clonevm "UB-SRV" --name "UB-SRV-2" --register --options=link --snapshot "recien-instalada"
VBoxManage export "UB-SRV" --output "D:\OVA\ub-srv.ova"
```

Hyper-V como alternativa (Windows 11 Pro):

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All   # reiniciar
New-VM -Name "UB-SRV" -Generation 2 -MemoryStartupBytes 2GB -NewVHDPath "D:\VMs\UB-SRV.vhdx" -NewVHDSizeBytes 25GB -SwitchName "Default Switch"
Set-VMFirmware -VMName "UB-SRV" -SecureBootTemplate MicrosoftUEFICertificateAuthority   # necesario para Linux con Secure Boot
Checkpoint-VM -Name "UB-SRV" -SnapshotName "recien-instalada"
```

**Aviso para el aula:** si Hyper-V, WSL 2 o la "Integridad de memoria" (VBS) están activos en el anfitrión, VirtualBox funciona sobre la plataforma de Hyper-V, más lento y a veces sin virtualización anidada. Se comprueba con el icono de la tortuga en la barra de estado de la MV.

- **Instantánea frente a clon frente a copia de seguridad.**
  - La **instantánea** guarda el estado en un disco diferencial: es rápida, pero no sirve como copia porque depende del disco base.
  - El **clon enlazado** comparte el disco base con la MV original.
  - El **clon completo** y la **exportación OVA** son independientes.

### 4. Planificación de la instalación (RA2.d)

Lista de comprobación de la plantilla de P2:

1. **Finalidad y software necesario.** Para qué es el equipo, quién lo usa y qué aplicaciones requiere.
2. **Requisitos.** CPU, RAM, disco, firmware UEFI, Secure Boot, TPM. En Windows, se comprueba con la aplicación *Comprobación de estado del PC*.
3. **Compatibilidad del hardware y controladores.** Red, almacenamiento NVMe/RAID (Intel VMD/RST puede necesitar controlador en la instalación de Windows) y gráfica.
4. **Licencia y edición.** Home o Pro, clave OEM en el firmware, activación.
5. **Esquema de particionado.** GPT, ESP, MSR y particiones de sistema, datos y recuperación. Se detalla en UD03.
6. **Copia de seguridad previa** y plan de vuelta atrás (instantánea en las MV).
7. **Medio de instalación.** ISO oficial con suma SHA-256 verificada; USB con Rufus, Ventoy o la herramienta de creación de medios.
8. **Parámetros.** Idioma y teclado, zona horaria, nombre de equipo (convención `DN-DEV-01`), cuentas, red.
9. **Tareas posteriores.** Actualizaciones, controladores, Guest Additions, software base, documentación.

```bash
sha256sum ubuntu-24.04*-desktop-amd64.iso   # comparar con SHA256SUMS de releases.ubuntu.com
```

```powershell
Get-FileHash .\Win11_*_Spanish_x64.iso -Algorithm SHA256
```

### 5. Instalación de sistemas libres y propietarios (RA2.e)

**Windows 11 Pro en VirtualBox 7:**

- Configuración de la MV: tipo Windows 11 (64 bits), 4 GB de RAM o más, 2 CPU, 64 GB de disco, EFI + Secure Boot + **TPM 2.0** (VirtualBox los activa al elegir ese tipo).
- Elegir la **edición Pro** en el asistente.
- **Instalación personalizada:** sobre espacio sin asignar crea automáticamente las particiones ESP (100 MB), MSR (16 MB), Windows y Recuperación.
- **Cuenta local:** Microsoft ha ido cerrando en la configuración inicial (OOBE) los atajos para crear cuentas locales sin cuenta Microsoft. El docente debe comprobar el método vigente para la versión usada (por ejemplo, un archivo de respuestas `autounattend.xml` o la opción de cuenta profesional o educativa en Pro) y dejarlo en la guía del aula.
- **Tras la instalación:** Guest Additions (menú Dispositivos → Insertar imagen de CD de las Guest Additions → `VBoxWindowsAdditions.exe`) y Windows Update.

```powershell
winver                                       # versión y compilación (p. ej., 25H2 o 26H2)
Get-ComputerInfo -Property OsName, OsVersion, OsBuildNumber, WindowsEditionId
slmgr /dlv                                   # estado de la licencia y la activación
```

**Ubuntu 24.04 LTS Desktop y Server:**

- **Desktop:** el instalador gráfico permite instalación normal o mínima, controladores de terceros y particionado (automático, junto a otro SO, o manual con ext4 o btrfs y cifrado LUKS opcional).
- **Server:** instalador de texto *Subiquity*.
  - Red: DHCP o estática.
  - Disco: LVM por defecto.
  - Perfil: usuario y nombre de equipo.
  - **OpenSSH server**: conviene marcarlo.
  - *Snaps* opcionales.

```bash
lsb_release -a ; uname -r ; hostnamectl
sudo apt update && sudo apt full-upgrade -y
# Guest Additions en Ubuntu Desktop (desde el CD virtual):
sudo apt install -y build-essential dkms linux-headers-$(uname -r)
sudo /media/$USER/VBox_GAs_*/VBoxLinuxAdditions.run
```

**Arranque dual y gestores de arranque.**

- **Orden recomendado:** primero Windows y después Linux, porque GRUB detecta Windows y Windows no detecta Linux.
- **Detección de Windows:** en Ubuntu 24.04 `os-prober` está desactivado por defecto en GRUB. Para que aparezca Windows en el menú hay que añadir `GRUB_DISABLE_OS_PROBER=false` en `/etc/default/grub` y ejecutar `sudo update-grub`.

```bash
# /etc/default/grub (fragmento)
GRUB_DEFAULT=saved          # recordar la última opción elegida (requiere GRUB_SAVEDEFAULT=true)
GRUB_SAVEDEFAULT=true
GRUB_TIMEOUT_STYLE=menu
GRUB_TIMEOUT=10
GRUB_DISABLE_OS_PROBER=false
```

```bash
sudo update-grub                       # regenera /boot/grub/grub.cfg (no se edita a mano)
efibootmgr -v                          # entradas UEFI: ubuntu, Windows Boot Manager…
sudo efibootmgr -o 0001,0000           # cambiar el orden de arranque en la NVRAM
```

```powershell
bcdedit /enum                          # almacén BCD de Windows (como administrador)
bcdedit /timeout 10
bcdedit /set "{bootmgr}" displaybootmenu yes
```

**Reparación del arranque:**

- **GRUB dañado o borrado.** Arrancar con la ISO *live*, montar el sistema y reinstalar el cargador:

  ```bash
  sudo mount /dev/sda3 /mnt                 # partición raíz (comprobar con lsblk -f)
  sudo mount /dev/sda1 /mnt/boot/efi        # ESP
  for d in dev proc sys run; do sudo mount --rbind /$d /mnt/$d; done
  sudo chroot /mnt
  grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ubuntu
  update-grub
  exit
  ```

  Alternativa gráfica: Boot-Repair (PPA `yannubuntu/boot-repair`).
- **Windows no arranca.** Entrar en el Entorno de recuperación (WinRE) → Solucionar problemas → Símbolo del sistema y ejecutar:

  ```
  diskpart          → list vol → select vol <ESP> → assign letter=S → exit
  bcdboot C:\Windows /s S: /f UEFI
  ```

  `bootrec /rebuildbcd` sirve para MBR y BIOS *legacy*; en UEFI `bootrec /fixboot` suele dar "acceso denegado", y la vía correcta es `bcdboot`.

### 6. Actualización y recuperación (RA2.f)

| Tarea | Ubuntu | Windows |
|---|---|---|
| Actualizar el sistema | `sudo apt update && sudo apt upgrade` (`full-upgrade` si cambian dependencias) | Configuración → Windows Update; pausar o diferir; canal de actualización |
| Actualizaciones automáticas de seguridad | `unattended-upgrades` (activo por defecto); `sudo dpkg-reconfigure -plow unattended-upgrades` | Directivas de Windows Update (`gpedit.msc` → Plantillas administrativas → Windows Update) |
| Cambio de versión | `sudo do-release-upgrade` (de LTS a LTS cuando se publica la `.1`) | Actualización de características anual (25H2 → 26H2…); cada versión de Home/Pro tiene 24 meses de soporte |
| Historial | `/var/log/apt/history.log`, `/var/log/dpkg.log` | `Get-HotFix`, Historial de actualizaciones |
| Desinstalar una actualización | `apt install paquete=versión` (bajar de versión), `apt-mark hold` | `wusa /uninstall /kb:NNNNNNN` |
| Punto de restauración | Timeshift (instantáneas rsync o btrfs) | `Enable-ComputerRestore -Drive "C:\"` + `Checkpoint-Computer -Description "Antes de P2" -RestorePointType MODIFY_SETTINGS` (Windows PowerShell 5.1) |
| Reparar archivos del sistema | `sudo apt install --reinstall paquete`, `debsums` | `sfc /scannow`; `DISM /Online /Cleanup-Image /RestoreHealth` |
| Arranque de rescate | GRUB → Opciones avanzadas → *recovery mode* (shell de root, `fsck`, `dpkg --configure -a`) | WinRE (`reagentc /info`), Inicio avanzado, Restablecer este PC |
| En la MV | Instantánea | Instantánea / punto de control |

### 7. Instalación, actualización y desinstalación de aplicaciones (RA2.h)

| Acción | Ubuntu (`apt` / `snap` / `flatpak`) | Windows (`winget` / GUI) |
|---|---|---|
| Buscar | `apt search vlc` · `snap find code` | `winget search vscode` |
| Información | `apt show git` · `apt policy git` | `winget show --id Git.Git` |
| Instalar | `sudo apt install git` · `sudo snap install code --classic` · `sudo dpkg -i paquete.deb` (y `sudo apt -f install`) | `winget install --id Git.Git -e` · MSI: `msiexec /i app.msi /qn` · Microsoft Store |
| Listar instaladas | `apt list --installed` · `dpkg -l` · `snap list` | `winget list` · Configuración → Aplicaciones |
| Actualizar | `sudo apt upgrade` · `sudo snap refresh` | `winget upgrade --all` |
| Desinstalar | `sudo apt remove git` · `sudo apt purge git` (+ configuración) · `sudo apt autoremove` · `sudo snap remove code` | `winget uninstall --id Git.Git` · Configuración → Aplicaciones |
| Repositorios | `/etc/apt/sources.list.d/ubuntu.sources` (formato *deb822* en 24.04), PPA con `add-apt-repository` | Orígenes: `winget source list` |

Al elegir una aplicación se comprueban siempre los **requisitos** (SO, arquitectura amd64/arm64, dependencias como JRE o .NET), la **versión** (LTS o última) y la **licencia** (RA7.a).

### 8. Documentación de la instalación y de las incidencias (RA2.i)

Plantilla mínima de la memoria (`P2/README.md`):

```markdown
# Instalación de W11-DEV
## Plan (requisitos, licencia, particionado, parámetros)
## Procedimiento (pasos numerados con capturas)
## Verificación (comandos y salidas)
## Incidencias
| Fecha | Síntoma | Causa | Solución | Fuente consultada |
## Estado final e instantáneas
```

### 9. Equivalencias en otras tecnologías

| Tarea | VirtualBox | Hyper-V | Proxmox VE | Ubuntu/Debian | Fedora/Rocky |
|---|---|---|---|---|---|
| Instantánea | `VBoxManage snapshot X take n` | `Checkpoint-VM -Name X` | `qm snapshot <id> n` | — | — |
| Instalar un paquete | — | — | — | `apt install` | `dnf install` |
| Actualizar el sistema | — | — | — | `apt update && apt upgrade` | `dnf upgrade` |
| Regenerar la configuración de GRUB | — | — | — | `update-grub` | `grub2-mkconfig -o /boot/grub2/grub.cfg` |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. Observar el núcleo.** Con `strace -c ls`, `ps -eo pid,comm,cls,ni | head` y el Monitor de recursos de Windows, distinguir procesos de usuario e hilos del núcleo. Explicar qué es una llamada al sistema.
- **A2. Tabla comparativa de SO para la empresa cliente.** Por grupos: requisitos oficiales, coste de licencias para 11 puestos y 1 servidor, ciclo de soporte y casos de uso. Cada dato con la URL de la fuente oficial.
- **A3. Laboratorio por CLI.** Crear `UB-SRV` solo con `VBoxManage` (apartado 3), tomar una instantánea, romper algo a propósito (`sudo rm /etc/hostname`) y restaurarla.
- **A4. Modos de red.** Dos MV Ubuntu: comprobar con `ip a` y `ping` qué se ve en NAT, red NAT, red interna y solo anfitrión. Completar la tabla de modos con los resultados.
- **A5. Romper y reparar el arranque.** En una MV de arranque dual (clon de la de la práctica), borrar la entrada de Ubuntu con `sudo efibootmgr -b XXXX -B` y repararla desde la ISO *live*.
- **A6. Carrera de paquetes.** Instalar, actualizar y desinstalar Git, VS Code y 7-Zip o p7zip en ambos SO solo por línea de comandos, y comprobar qué queda tras `remove` frente a `purge`.

### Práctica evaluable

**P2 · Puestos de desarrollo de la empresa cliente.** Montar el laboratorio base y documentarlo:

1. **Informe comparativo** (1-2 páginas) para elegir el SO de los puestos de desarrollo y QA: requisitos, campo de aplicación, licencias y coste. Debe incluir una tabla con la licencia y el propósito de cada aplicación que se instalará (RA7.a).
2. **Plan de instalación** según la lista del apartado 4.
3. **MV `W11-DEV`** (Windows 11 Pro) y **MV `UB-DEV`** (Ubuntu 24.04 Desktop) instaladas, actualizadas, con Guest Additions e instantánea "base".
4. **MV `DUAL`** con Windows 11 y Ubuntu en el mismo disco virtual:
   - GRUB configurado: Windows visible, tiempo de espera de 10 s, recordar la última opción.
   - Reparación documentada tras borrar la entrada UEFI de Ubuntu.
5. **Actualización y recuperación:**
   - Punto de restauración en Windows.
   - Instalación de un controlador o programa y vuelta atrás.
   - `sfc /scannow`.
   - Timeshift o instantánea en Ubuntu, y restauración tras un cambio.
6. **Aplicaciones:** con `winget` y `apt`/`snap`, instalar Git, VS Code, un JDK LTS y un navegador. Actualizarlos y desinstalar uno. Exportar la lista con `winget export -o apps.json` y `apt-mark showmanual > apps.txt`.
7. **Memoria** con registro de incidencias.

Se verifica en el puesto al terminar: el docente pide arrancar `DUAL` en cada SO y mostrar una restauración.

**Conexión con el mundo real:** equivale a preparar los puestos de una nueva incorporación (*onboarding*): instalar, actualizar, dejar el software base y documentar el procedimiento para repetirlo.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA2.b | Explica funciones y arquitectura del SO relacionándolas con observaciones propias (llamadas al sistema, procesos del núcleo). | Explica funciones y tipos de núcleo correctamente. | Definiciones incompletas o erróneas. |
| RA2.c | Comparativa con fuentes oficiales, coste real y recomendación razonada. | Comparativa correcta con requisitos y licencias. | Datos sin fuente o incorrectos. |
| RA2.d | Plan completo (9 puntos) que se sigue y se contrasta con lo ocurrido. | Plan con los puntos esenciales. | Sin plan o plan genérico. |
| RA2.e | Ambos SO y el arranque dual funcionan, actualizados y configurados; GRUB ajustado. | Ambos SO instalados y actualizados; arranque dual con algún ajuste pendiente. | Algún SO no instalado o sin actualizar. |
| RA2.f | Restaura en ambos SO y repara el arranque UEFI explicando cada comando. | Restaura en ambos SO; repara el arranque con ayuda. | No consigue restaurar ni reparar. |
| RA2.g | Gestiona MV por GUI y `VBoxManage`, instantáneas, clones y modos de red justificados. | Crea y configura MV e instantáneas por GUI. | MV mal configuradas (sin EFI/TPM, red errónea). |
| RA2.h | Instala, actualiza y desinstala por CLI en ambos SO, distingue `remove`/`purge` y exporta la lista. | Instala, actualiza y desinstala en ambos SO. | Solo GUI o falta alguna operación. |
| RA2.i | Memoria reproducible, con incidencias, causas y fuentes. | Memoria completa con capturas. | Memoria incompleta o no reproducible. |
| RA7.a | Clasifica todo el software por licencia y propósito, con implicaciones de uso empresarial. | Clasifica correctamente la mayoría. | Clasificación errónea o ausente. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Windows: [Requisitos de Windows 11](https://learn.microsoft.com/windows/whats-new/windows-11-requirements) · [Windows Server 2025: requisitos](https://learn.microsoft.com/windows-server/get-started/hardware-requirements) · [Opciones de BCDBoot](https://learn.microsoft.com/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di) · [winget](https://learn.microsoft.com/windows/package-manager/winget/).
  - Ubuntu y GRUB: [Guía de instalación de Ubuntu Server](https://documentation.ubuntu.com/server/) · [Manual de GRUB](https://www.gnu.org/software/grub/manual/grub/).
  - Virtualización: [Manual de VirtualBox](https://www.virtualbox.org/manual/) · [Hyper-V en Windows](https://learn.microsoft.com/virtualization/hyper-v-on-windows/).
- **Herramientas:** VirtualBox 7.x, ISO oficiales (Microsoft, releases.ubuntu.com), Rufus o Ventoy, Timeshift, Boot-Repair.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
