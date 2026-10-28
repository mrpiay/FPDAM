# UD01 · Hardware y arquitectura de un sistema informático

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 15 h · 18 sesiones de 50 min (≈ 3 semanas a 6 sesiones; propuesta del docente) | RA1 (a, b, c, d, h; ~75 % de la UD) · RA2 (a; ~25 %) |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.a | Se han reconocido los componentes físicos de un sistema informático y sus mecanismos de interconexión. | [RD 405/2023, anexo I, 0483, RA1.a][boe] | P1 (inventario y ficha técnica) · PE1 |
| RA1.b | Se han clasificado los tipos de memorias, señalando sus características e identifcando sus prestaciones y la función que desarrollan en el conjunto del sistema. | [RD 405/2023, anexo I, 0483, RA1.b][boe] | P1 (apartado memorias) · PE1 |
| RA1.c | Se ha verificado el proceso de puesta en marcha de un equipo. | [RD 405/2023, anexo I, 0483, RA1.c][boe] | P1 (análisis del arranque) · PE1 |
| RA1.d | Se han clasificado, instalado y configurado diferentes tipos de dispositivos periféricos. | [RD 405/2023, anexo I, 0483, RA1.d][boe] | P1 (instalación de periférico) |
| RA1.h | Se han reconocido las normas de seguridad y prevención de riesgos laborales en el uso de los sistemas informáticos. | [RD 405/2023, anexo I, 0483, RA1.h][boe] | Observación directa en el taller de despiece · PE1 |
| RA2.a | Se han identificado los elementos funcionales de un sistema informático. | [RD 405/2023, anexo I, 0483, RA2.a][boe] | PE1 · P1 (diagrama funcional) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Explicar la arquitectura Von Neumann y el ciclo de instrucción, y relacionar cada componente de la CPU con su función.
2. Identificar en un equipo real los componentes de la placa base, sus formatos, sockets, buses e interfaces.
3. Clasificar las memorias por tecnología, volatilidad, velocidad y función en la jerarquía de memoria.
4. Describir y comprobar las fases de arranque de un equipo UEFI con Secure Boot y TPM.
5. Inventariar el hardware con comandos de Linux y PowerShell, e instalar y configurar periféricos y sus controladores.
6. Aplicar las normas de seguridad eléctrica, ESD, ergonomía y gestión de residuos (RAEE).
7. Elegir y justificar la configuración de un equipo para desarrollo de aplicaciones.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloque «Explotación de sistemas microinformáticos» ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. El sistema informático y sus elementos funcionales (RA2.a)

- **Sistema informático:** conjunto de **hardware** (parte física), **software** (programas y datos) y **componente humano** (personal de usuario, de desarrollo y de administración) que trabaja para tratar información.
- **Elementos funcionales** (modelo Von Neumann, 1945):
  - **Unidad central de proceso (CPU)**, formada por la unidad de control (UC) y la unidad aritmético-lógica (ALU).
  - **Memoria principal**, que guarda **juntos datos e instrucciones**. Esa es la idea clave del modelo: el programa almacenado.
  - **Unidades de entrada/salida** y controladores.
  - **Buses**: de datos, de direcciones y de control.
- **Arquitectura Harvard:** separa memoria de instrucciones y de datos. Se usa en microcontroladores, y en la caché L1 de las CPU actuales (L1i y L1d).
- **Unidades de información:** bit, byte, prefijos decimales SI (kB = 1000 B) frente a binarios IEC (KiB = 1024 B). Un disco "de 1 TB" muestra unos 931 GiB en Windows, que etiqueta los GiB como "GB".

### 2. El procesador

| Elemento | Función |
|---|---|
| **Unidad de control (UC)** | Decodifica instrucciones y genera las señales de control. |
| **ALU** | Ejecuta operaciones aritméticas y lógicas; actualiza el **registro de estado** (*flags*: cero, acarreo, desbordamiento, signo). |
| **Contador de programa (PC)** | Guarda la dirección de la siguiente instrucción. |
| **Registro de instrucción (IR)** | Contiene la instrucción que se está ejecutando. |
| **MAR / MBR** | Registros de dirección y de datos de memoria: hacen de interfaz con el bus. |
| **Registros generales** | Datos de trabajo (en x86-64: RAX, RBX…; en ARM64: X0-X30). |
| **Reloj** | Marca el ritmo de trabajo (GHz). La frecuencia no basta para comparar CPU: también cuentan las instrucciones por ciclo, los núcleos y la caché. |

- **Ciclo de instrucción:** *fetch* (lectura: PC → MAR → memoria → MBR → IR; PC++) → decodificación → ejecución → escritura del resultado. Las CPU modernas solapan fases mediante **segmentación (*pipeline*)**, ejecución fuera de orden y predicción de saltos.
- **Juego de instrucciones (ISA):** el "contrato" entre hardware y software.
  - **CISC**: x86-64 (Intel, AMD).
  - **RISC**: ARM64/AArch64 (Apple M, Snapdragon X, la mayoría de móviles) y RISC-V (abierta, libre de licencias).
  - Importa para DAM: un binario o una imagen Docker **amd64** no se ejecuta de forma nativa en **arm64**, y el emulador de Android usa imágenes x86_64 o arm64 según el anfitrión.
- **Interrupciones:** son señales que piden a la CPU que pause lo que está haciendo para atender un evento.
  - De **hardware**, que llegan por IRQ, o mejor dicho por MSI/MSI-X en PCIe; por ejemplo, al pulsar una tecla o al terminar la lectura de un disco.
  - De **software** o llamadas al sistema, como `syscall` o `int 0x80`.
  - **Excepciones**, como dividir por cero o un fallo de página.
  - La CPU guarda el contexto, ejecuta la rutina de servicio (ISR) y lo restaura.
  - **DMA** permite que un periférico copie datos a memoria sin ocupar la CPU.
- **Multinúcleo e hilos:** núcleos físicos, SMT/Hyper-Threading y núcleos híbridos (P-cores de rendimiento y E-cores de eficiencia en Intel desde la 12.ª generación). La GPU integrada y la NPU (aceleración de IA) ya forman parte del SoC.

```bash
# Linux: información de la CPU
lscpu                      # arquitectura, núcleos, hilos, cachés, flags (vmx/svm = virtualización)
grep -c ^processor /proc/cpuinfo
grep -Eo 'vmx|svm' /proc/cpuinfo | sort -u   # ¿admite VT-x / AMD-V?
```

```powershell
# Windows: información de la CPU
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed, VirtualizationFirmwareEnabled
```

### 3. Jerarquía y tipos de memoria (RA1.b)

| Nivel | Tecnología | Volátil | Latencia típica | Capacidad típica | Función |
|---|---|---|---|---|---|
| Registros | Biestables | Sí | < 1 ns | bytes | Operandos de la ALU |
| Caché L1/L2/L3 | **SRAM** | Sí | 1-15 ns | KB-MB (L3 32-128 MB) | Ocultar la latencia de la RAM |
| Memoria principal | **DRAM** (DDR4, **DDR5**, LPDDR5X) | Sí | 60-100 ns | 8-64 GB | Programas y datos en ejecución |
| Memoria de vídeo | GDDR6/GDDR7, HBM | Sí | — | 8-24 GB | GPU |
| Firmware | **Flash NOR / EEPROM** | No | — | 16-32 MB | UEFI/BIOS, configuración |
| Almacenamiento | **Flash NAND** (SSD NVMe/SATA), discos magnéticos (HDD) | No | 20-100 µs (SSD) · 5-10 ms (HDD) | 0,5-20 TB | Datos persistentes |

- **ROM y sus variantes ("xPROM"):**

  | Tipo | Cómo se graba y se borra | Uso actual |
  |---|---|---|
  | ROM de máscara | Se graba en fábrica | — |
  | **PROM** | Programable una vez | — |
  | **EPROM** | Se borra con luz ultravioleta | — |
  | **EEPROM** | Se borra eléctricamente, byte a byte | Datos SPD de los módulos de RAM |
  | **Flash** | EEPROM borrable por bloques | Firmware de la placa, SSD, USB |

- **Características que se comparan:** capacidad, velocidad (MT/s en DDR5, por ejemplo DDR5-5600), latencia (CL), número de canales (*dual channel*), formato del módulo (DIMM o SO-DIMM; LPDDR va soldada) y corrección de errores (**ECC**, en servidores).
- **Memoria virtual:** el SO amplía la RAM usando el disco: archivo de paginación `pagefile.sys` en Windows y partición o archivo *swap* en Linux. La MMU traduce direcciones virtuales a físicas.

```bash
free -h                              # RAM y swap
sudo dmidecode -t memory | grep -E 'Size|Speed|Type:|Locator'   # módulos instalados
swapon --show
```

```powershell
Get-CimInstance Win32_PhysicalMemory | Select-Object BankLabel, Capacity, Speed, Manufacturer, PartNumber
Get-CimInstance Win32_PageFileUsage
```

### 4. Placa base, buses e interfaces (RA1.a)

- **Formatos:**

  | Formato | Medidas | Uso habitual |
  |---|---|---|
  | **ATX** | 305 × 244 mm | Sobremesa estándar |
  | **micro-ATX** | 244 × 244 mm | Equipos compactos y de oficina |
  | **mini-ITX** | 170 × 170 mm | Equipos pequeños, HTPC |
  | **E-ATX** | — | Estaciones de trabajo |
  | Propietario | — | Portátiles y equipos de marca |

- **Componentes de la placa:**
  - *Socket* de la CPU: AM5 en AMD; LGA1700 y LGA1851 en Intel.
  - *Chipset*: hace de concentrador de E/S; se conecta a la CPU por DMI en Intel o por PCIe en AMD.
  - Zócalos DIMM, ranuras PCIe y M.2.
  - Conectores SATA, cabeceras USB y de panel frontal.
  - Chip del firmware UEFI y pila CR2032.
  - VRM (alimentación de la CPU) y conectores ATX de 24 pines y EPS de 8 pines.
- **Buses e interfaces:**

  | Interfaz | Tipo | Velocidad aproximada | Uso |
  |---|---|---|---|
  | **PCIe 4.0 / 5.0** | Serie, punto a punto, por carriles (x1, x4, x16) | ~2 / ~4 GB/s por carril | GPU, SSD NVMe, tarjetas de red |
  | **M.2** | Formato físico (llave M o B) | Según protocolo | SSD NVMe (PCIe) o SATA |
  | **SATA III** | Serie | 6 Gbit/s (~550 MB/s reales) | HDD, SSD de 2,5″ |
  | **USB 3.2 Gen 2 / Gen 2x2 / USB4** | Serie | 10 / 20 / 40-80 Gbit/s | Periféricos, discos externos |
  | **Thunderbolt 4/5** | Serie (sobre USB-C) | 40 / 80-120 Gbit/s | Docks, pantallas, eGPU |
  | **HDMI 2.1 / DisplayPort 2.1** | Vídeo digital | 48 / 80 Gbit/s | Monitores |
  | **RJ45 Ethernet** | Red | 1-10 Gbit/s | LAN |

- **Adaptadores para conectar dispositivos:** tarjetas PCIe (red, captura, controladoras RAID/HBA), adaptadores USB-C a HDMI, Ethernet o SATA, *docks*, **raisers** y adaptadores M.2 a PCIe. Conviene leer siempre qué **protocolo** viaja por un conector: un USB-C puede llevar USB 2.0 o Thunderbolt.

```bash
lspci -nn                 # dispositivos PCI/PCIe (con IDs de fabricante:dispositivo)
lsusb -t                  # árbol USB con velocidades
sudo lshw -short          # resumen de todo el hardware
inxi -Fxz                 # informe legible (sudo apt install inxi)
```

```powershell
Get-PnpDevice -PresentOnly | Sort-Object Class | Format-Table Class, FriendlyName, Status
msinfo32                  # Información del sistema (GUI)
```

### 5. Puesta en marcha de un equipo (RA1.c)

1. **Alimentación:** la fuente da la señal *Power Good* y la CPU arranca en el vector de *reset*, que apunta al firmware.
2. **POST** (*Power-On Self-Test*): comprobación de CPU, RAM y vídeo. Los errores se señalan con pitidos, LED de diagnóstico (*Q-LED*) o códigos POST.
3. **Firmware:**
   - El **UEFI** (sustituto de la BIOS *legacy*) inicializa los dispositivos, lee la configuración de la NVRAM y aplica el **orden de arranque**.
   - **Secure Boot** verifica la firma del cargador de arranque.
   - El **TPM 2.0** mide el arranque y guarda las claves, por ejemplo las de BitLocker.
4. **Cargador de arranque:**

   | Firmware | Particionado | Dónde está el cargador | Cargador |
   |---|---|---|---|
   | UEFI | GPT | Fichero `.efi` en la **partición de sistema EFI (ESP)**, en FAT32 | `bootmgfw.efi` (Windows), `shimx64.efi` → `grubx64.efi` (Ubuntu) |
   | BIOS *legacy* | MBR | Primer sector del disco | — |

5. **Núcleo del SO** y su sistema de inicio: `systemd` en Linux, `wininit`/`services.exe` en Windows. Después vienen el inicio de sesión y el escritorio.

| BIOS *legacy* | UEFI |
|---|---|
| Modo real de 16 bits, 1 MB direccionable | 32/64 bits, controladores propios, interfaz gráfica |
| MBR: máx. 4 particiones primarias, discos ≤ 2 TiB | GPT: 128 particiones, discos de hasta 8 ZiB |
| Sin verificación del cargador | **Secure Boot** |
| — | Requisito de Windows 11 (junto con TPM 2.0) |

```bash
[ -d /sys/firmware/efi ] && echo "Arranque UEFI" || echo "Arranque BIOS legacy"
mokutil --sb-state            # estado de Secure Boot
systemd-analyze               # tiempo de firmware, cargador, kernel y espacio de usuario
systemd-analyze blame | head  # servicios que más retrasan el arranque
journalctl -b -p warning      # avisos del arranque actual
```

```powershell
Confirm-SecureBootUEFI        # True si Secure Boot está activo (requiere administrador)
Get-Tpm                       # presencia y estado del TPM
bcdedit /enum firmware        # entradas de arranque de la NVRAM (cmd o PowerShell como administrador)
# msinfo32 → "Modo de BIOS: UEFI" y "Estado de arranque seguro"
```

### 6. Periféricos (RA1.d)

- **Clasificación:**
  - **Entrada:** teclado, ratón, escáner, micrófono, cámara, lector biométrico.
  - **Salida:** monitor, impresora, altavoces.
  - **Entrada/salida:** pantalla táctil, multifunción, casco de RV.
  - **Almacenamiento:** discos externos, USB, lectores de tarjetas.
  - **Comunicación:** adaptadores Wi-Fi o Bluetooth, módem.
- **Características que se comparan:**
  - Monitores: resolución, frecuencia de refresco (Hz), tipo de panel (IPS, VA, OLED), espacio de color.
  - Impresoras: láser frente a inyección, ppm, conectividad, consumibles.
  - Escáneres: resolución.
- **Instalación y configuración:**
  - **Plug and Play:** el SO identifica el dispositivo por su ID (VID:PID en USB, VEN/DEV en PCI) y carga el controlador. En Linux casi todos los controladores vienen en el núcleo como módulos; en Windows llegan por Windows Update o del fabricante.
  - **Linux:** `udev` crea los nodos en `/dev` y `dmesg` muestra los eventos.
  - **Windows:** Administrador de dispositivos (`devmgmt.msc`).

```bash
sudo dmesg -w                 # conectar un USB y ver cómo se detecta
lsmod | head ; modinfo usb_storage
lsblk                         # el pendrive aparece como /dev/sdX
```

```powershell
devmgmt.msc
pnputil /enum-devices /connected
pnputil /add-driver C:\Drivers\*.inf /subdirs /install   # instalar un controlador desde INF
Get-Printer ; Add-Printer -Name "PDF-Aula" -DriverName "Microsoft Print To PDF" -PortName "PORTPROMPT:"
```

Las impresoras en red y su compartición se tratan en UD08 (CUPS y servidor de impresión de Windows).

### 7. Seguridad y prevención de riesgos laborales (RA1.h)

| Riesgo | Medidas |
|---|---|
| **Eléctrico** | Desconectar el cable de alimentación (no basta con apagar), no abrir fuentes de alimentación ni monitores CRT, regletas con protección. |
| **Descarga electrostática (ESD)** | Pulsera antiestática conectada a masa, alfombrilla ESD, bolsas antiestáticas, coger los módulos por los bordes. |
| **Mecánico** | Cuidado con los bordes de chapa y los ventiladores; mover los equipos pesados entre dos personas. |
| **Pantallas de visualización** | Borde superior del monitor a la altura de los ojos, distancia de 50-70 cm, pausas (regla 20-20-20), silla regulable, iluminación sin reflejos. |
| **Baterías de litio** | No perforar; retirar las hinchadas; almacenarlas a media carga. |
| **Residuos (RAEE)** | Punto limpio o gestor autorizado, borrado seguro de los discos antes de desechar. |
| **Ruido y térmico** | Los CPD tienen requisitos propios de climatización y ruido. |

> Marco normativo de referencia:
>
> - Ley 31/1995, de Prevención de Riesgos Laborales ([BOE](https://www.boe.es/eli/es/l/1995/11/08/31)).
> - RD 488/1997, sobre trabajos con equipos que incluyen pantallas de visualización ([BOE](https://www.boe.es/eli/es/rd/1997/04/14/488)), y su guía técnica del INSST.
> - RD 110/2015, sobre residuos de aparatos eléctricos y electrónicos ([BOE](https://www.boe.es/eli/es/rd/2015/02/20/110)).
>
> Las medidas de la tabla son una **síntesis propia** con fines didácticos, no un extracto literal de esas normas.

### 8. Un equipo para desarrollar

| Perfil | CPU | RAM | Almacenamiento | Observaciones |
|---|---|---|---|---|
| Web/backend ligero | 6 núcleos | 16 GB | SSD NVMe 512 GB | Suficiente para IDE y una MV |
| Android / multiplataforma | 8 núcleos con virtualización | **32 GB** | NVMe 1 TB | El emulador de Android y Gradle consumen mucha memoria |
| Laboratorio de MV / contenedores | 8-12 núcleos | 32-64 GB | NVMe 1-2 TB | La RAM suele ser el cuello de botella |
| Desarrollo iOS | Mac con Apple Silicon | 16-32 GB | 512 GB-1 TB | Xcode solo funciona en macOS |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. Taller de despiece (2 h, por parejas, con equipos de baja).** Aplicar el protocolo de PRL (pulsera ESD, desconexión), identificar y fotografiar cada componente y montar de nuevo hasta conseguir el POST. El docente observa con una lista de control (RA1.h).
- **A2. Mapa de la placa.** Sobre el manual PDF de una placa base actual (ASUS, MSI o Gigabyte), localizar *socket*, chipset, ranuras PCIe (y cuántos carriles tienen), M.2 y cabeceras. Responder: ¿qué ranura comparte carriles con qué M.2?
- **A3. Comparativa de memorias.** Tabla con 3 módulos reales (DDR4 de sobremesa, DDR5 de sobremesa y SO-DIMM DDR5): velocidad, latencia CL, voltaje, precio por GB. Calcular la latencia real en ns como `CL × 2000 / MT/s`.
- **A4. Inventario por comandos.** En la MV y en el anfitrión, sacar CPU, RAM, discos y modo de arranque con los comandos de los apartados 2-5, y comparar qué ve el invitado frente al anfitrión.
- **A5. Ciclo de instrucción en papel.** Seguir un programa de 4 instrucciones (LOAD, ADD, STORE, JMP) indicando el valor de PC, IR, MAR, MBR y el acumulador en cada fase.

### Práctica evaluable

**P1 · Ficha técnica y propuesta de equipos para la empresa cliente.** La empresa cliente va a renovar sus puestos. El alumnado debe:

1. Hacer el **inventario** del PC de su puesto con comandos de Linux (desde una sesión *live* de Ubuntu o desde la MV) y de PowerShell. Entrega: salidas comentadas de CPU, RAM (módulos), discos, PCIe/USB y modo de arranque.
2. Dibujar el **diagrama funcional** del equipo (CPU, memorias, chipset, buses e interfaces) con indicación de velocidades.
3. Clasificar las **memorias** del equipo según la jerarquía y explicar la función de cada una.
4. Documentar la **secuencia de arranque** del equipo, con capturas de la UEFI (orden de arranque, Secure Boot, TPM o fTPM), `systemd-analyze` y `msinfo32`.
5. **Instalar y configurar un periférico**: impresora (real o PDF), webcam o disco USB. Indicar cómo se identifica (VID:PID), qué controlador se usa y cómo se comprueba.
6. **Proponer dos configuraciones** (puesto de desarrollo Android y puesto de QA) con presupuesto razonado de componentes compatibles (*socket*, RAM, formato, potencia de la fuente).

Entregables: `P1/README.md` en el repositorio del curso con capturas y tablas. Evalúa RA1.a, RA1.b, RA1.c, RA1.d y RA2.a. RA1.h se evalúa por observación en A1 y en PE1.

**Conexión con el mundo real:** equivale al inventario de activos y a la propuesta de compra de equipos que prepara un técnico o técnica de sistemas antes de dotar a un equipo de desarrollo.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA1.a | Inventario completo por comandos en ambos SO; identifica buses e interfaces con versión y velocidad; propuestas totalmente compatibles y justificadas. | Inventario correcto con alguna omisión menor; propuestas compatibles con justificación breve. | Inventario incompleto o propuestas con incompatibilidades (*socket*, RAM, formato). |
| RA1.b | Clasifica todas las memorias del equipo (incluido el firmware y la caché) con sus prestaciones y explica la jerarquía. | Clasifica RAM, caché y almacenamiento con sus características principales. | Confunde tipos o no relaciona la memoria con su función. |
| RA1.c | Describe todas las fases con evidencias propias (UEFI, Secure Boot, TPM, tiempos de arranque) y explica qué falla si se altera cada fase. | Describe las fases y aporta evidencias de modo UEFI y Secure Boot. | Descripción genérica copiada sin evidencias del equipo. |
| RA1.d | Instala y configura el periférico, identifica VID:PID y el controlador, y documenta la prueba y la desinstalación. | Instala y prueba el periférico con capturas. | No consigue que funcione o no lo documenta. |
| RA2.a | Diagrama funcional correcto, con buses y unidades, y relación explícita con el modelo Von Neumann. | Diagrama correcto con imprecisiones menores. | Diagrama ausente o erróneo. |

## Recursos · Propuesta del docente

- **Documentación oficial:** [Requisitos de Windows 11](https://learn.microsoft.com/windows/whats-new/windows-11-requirements) · [`man lshw`, `man dmidecode`](https://manpages.ubuntu.com/) · [Especificación UEFI](https://uefi.org/specifications) · [INSST: Guía técnica de pantallas de visualización](https://www.insst.es/) · [RD 488/1997](https://www.boe.es/eli/es/rd/1997/04/14/488) · [RD 110/2015 (RAEE)](https://www.boe.es/eli/es/rd/2015/02/20/110).
- **Herramientas:** `lshw`, `inxi`, `dmidecode`, HWiNFO o CPU-Z (Windows), manuales PDF de placas base, configuradores como PCPartPicker para comprobar compatibilidad.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
