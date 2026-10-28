# Programación didáctica · MP0483 Sistemas informáticos

Datos del módulo: ver la [ficha](README.md).

La secuencia está escalada a 155 h y se ajustará al calendario escolar 2026-27 del centro (modalidad presencial).

## Resumen

**Enfoque.** MP0483 se plantea como *sistemas al servicio del desarrollador*: el alumnado de DAM aprende a evaluar, instalar, administrar, conectar en red, proteger y documentar los equipos y servidores sobre los que va a programar, probar y desplegar. Parte de las orientaciones pedagógicas del módulo, según las cuales las actividades profesionales "se aplican en la explotación de sistemas informáticos en relación al desarrollo de aplicaciones" (fuente: RD 405/2023, anexo I, módulo 0483, orientaciones pedagógicas, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Todo se trabaja en paralelo en un sistema libre y en uno propietario, y siempre por dos vías: herramienta gráfica y línea de comandos.

**Stack de referencia (sustituible).** Laboratorio virtual en **VirtualBox** sobre los PC del aula (modalidad presencial), con **Ubuntu 24.04 LTS** Desktop y Server, **Windows 11 Pro** y **Windows Server 2025** con **Active Directory**. Las redes se diseñan en **Cisco Packet Tracer** con IPv4/VLSM e **IPv6**. Se automatiza con **bash** y **PowerShell** (cron, systemd timers, Programador de tareas), se protegen los datos con **rsync/tar/robocopy** y cifrado **LUKS/BitLocker**, la administración remota se hace con **SSH con claves y RDP**, y los servicios con **Samba, CUPS, Tomcat/IIS** y **ufw/Firewall de Windows**. Toda la documentación se escribe en **Markdown con Git**. Cada tecnología tiene alternativas igual de válidas, y el apartado 2.1 explica cómo adaptar el módulo. Los contenidos básicos de IPv6, tecnologías de virtualización, cifrado e implantación de dominios, y el CE RA5.h sobre protocolos seguros, tienen unidad y rúbrica propias (fuente: RD 405/2023, anexo I, módulo 0483, contenidos básicos y RA5.h, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Según el inventario de [normativa/README.md](../../normativa/README.md), estos elementos son novedad respecto al RD 450/2010; la comparación entre ambas normas es elaboración propia.

**Proyecto integrador.** El curso entero es un encargo realista: poner en marcha la infraestructura de la empresa cliente, una pequeña empresa de software ficticia, y entregar al cliente un dossier técnico (inventario, mapa de red, procedimientos e incidencias). Se apoya en la prospectiva del título (RD 450/2010, art. 8, letras h-k, en la redacción del RD 405/2023). En nueve prácticas encadenadas el alumnado elige su hardware (P1), monta los puestos de desarrollo (P2), organiza y cifra los discos (P3), crea cuentas y permisos (P4), automatiza las copias del código y prepara el entorno de desarrollo con WSL, JDK y Git (P5), diseña la red (P6), la configura y asegura (P7), despliega el dominio y los servidores (P8) y deja una documentación técnica colaborativa (P9). Al terminar, el repositorio Git de cada alumno o alumna es a la vez su portafolio y la evidencia de evaluación.

**Evaluación.** La evaluación es por RA, con los 54 CE cubiertos en la matriz del apartado 4. La nota final es la media ponderada de los siete RA (RA4 20 %; RA2, RA3, RA5 y RA6 15 % cada uno; RA1 y RA7 10 % cada uno) y exige tener cada RA aprobado con un 5 o más. Los instrumentos son las prácticas con rúbrica por CE y verificación en el puesto, tres pruebas prácticas presenciales sobre MV preparadas y la observación directa en el aula. Cada RA se recupera por separado.

## 1. Enfoque del módulo · Propuesta del docente

El módulo se plantea como **"sistemas al servicio del desarrollador"**: el alumnado de DAM no va a administrar un CPD, pero necesita saber montar, mantener, asegurar y documentar los equipos, servidores y redes sobre los que programa, prueba y despliega. Por eso:

- Todo se practica en **máquinas virtuales** propias (laboratorio personal) que el alumnado construye en UD02 y reutiliza hasta UD08. Los errores no rompen nada y las instantáneas permiten volver atrás.
- Cada tarea se hace **por las dos vías**: herramienta gráfica y línea de comandos (**bash** en Linux y **PowerShell** en Windows; `cmd` solo como referencia).
- Se trabaja siempre **un sistema libre y uno propietario** en paralelo. Los CE y contenidos básicos hablan de "sistemas operativos libres y propietarios" (fuente: RD 405/2023, anexo I, módulo 0483, RA2.e, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).
- La documentación se escribe en **Markdown dentro de un repositorio Git**, que actúa como portafolio del curso y evidencia de RA2.i y RA7.c.

### 1.1 Contribución a los objetivos generales y competencias del título

> Fuente: RD 405/2023, anexo I, módulo 0483, orientaciones pedagógicas ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Según esta fuente, el módulo contribuye a los objetivos generales a), b), t), u), v), w) y x) y a las competencias profesionales, personales y sociales a), b), l), t), u), v), w), x) e y). Los extractos de la tabla proceden del art. 9 (objetivos generales) y del art. 5 (competencias) del RD 450/2010, en la redacción dada por el RD 405/2023 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Las filas marcadas como paráfrasis no son cita literal. La columna "Cómo se concreta" es **propuesta del docente**.

| Objetivo / competencia | Lo que pide (extracto) | Fuente | Cómo se concreta en el módulo (propuesta del docente) |
|---|---|---|---|
| OG a) · CPPS a) | "Ajustar la configuración lógica del sistema analizando las necesidades…" / "Configurar y explotar sistemas informáticos…" | RD 450/2010 (redacción RD 405/2023), art. 9.a / art. 5.a | El núcleo del módulo: UD02-UD05 y UD07-UD08. Cada configuración parte de una necesidad de la empresa cliente (RA4.h). Justifica trabajar con SO reales y actuales en MV. |
| OG b) · CPPS b) | "Identificar las necesidades de seguridad analizando vulnerabilidades…" / "Aplicar técnicas y procedimientos relacionados con la seguridad en sistemas, servicios y aplicaciones" | RD 450/2010 (redacción RD 405/2023), art. 9.b / art. 5.b | Directivas de contraseñas y permisos (UD04), copias y cifrado (UD03, UD05), SSH con claves, ufw y Firewall de Windows (UD07), GPO, antimalware y auditoría con Lynis (UD08). Justifica BitLocker/LUKS y AD. |
| CPPS l) | "Crear tutoriales, manuales de usuario, de instalación, de configuración y de administración, empleando herramientas específicas" | RD 450/2010 (redacción RD 405/2023), art. 5.l | Cada práctica produce una memoria técnica en Markdown versionada con Git (RA2.i, RA7.c) y P9 produce un manual de administración. Justifica Git + Markdown como herramienta de documentación. |
| OG w) · CPPS w) | Identificar los cambios tecnológicos y mantener el espíritu de innovación y actualización | RD 450/2010 (redacción RD 405/2023), art. 9.w / art. 5.w (paráfrasis) | Versiones actuales (Windows 11/Server 2025, Ubuntu 24.04, IPv6, Wi-Fi 6/7, WSL 2) y actividades de comparación de versiones y lectura de *release notes* (UD01, UD02, UD06). |
| OG t), u) · CPPS t), u) | Roles en el grupo de trabajo, comunicación profesional y resolución de conflictos | RD 450/2010 (redacción RD 405/2023), art. 9.t-u / art. 5.t-u (paráfrasis) | Prácticas de red por parejas (UD06-UD08), revisión cruzada de documentación (UD09) y uso de canales de mensajería e *issues* (RA7.c-d). |
| OG v), x) · CPPS v), x), y) | Carrera profesional, oportunidades de negocio y pequeña empresa, participación crítica y responsable | RD 450/2010 (redacción RD 405/2023), art. 9.v, x / art. 5.v, x, y (paráfrasis) | Análisis de necesidades de software y costes de licencias de una pequeña empresa (UD02, UD09: RA7.a-b), presupuesto de equipos (P1), certificaciones del sector como itinerario (LPI, Microsoft, Cisco) y reciclaje de RAEE (UD01). |

La elección de tecnologías del apartado 2 se apoya en OG a) y w) (configurar y explotar sistemas con tecnología vigente) y en OG b) (seguridad).

### 1.2 Orientación a proyectos reales de empresa

> Fuente: art. 8 del RD 450/2010 (prospectiva del título en el sector), en la redacción dada por el RD 405/2023, art. segundo, apartado cuatro ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Los fragmentos entre comillas son literales y breves; consúltese el texto completo en el BOE. Dice que las administraciones educativas "tendrán en cuenta, al desarrollar el currículo correspondiente", entre otras, estas consideraciones:
>
> - **h)** la necesidad de "asegurar la integridad, consistencia y accesibilidad de los datos";
> - **i)** "Asegurar la funcionalidad y rentabilidad del sistema informático", de modo que apoye al resto de departamentos;
> - **j)** "Las tareas de tratamiento y transferencia de datos", que deben ajustarse a la normativa legal aplicable;
> - **k)** "La tele-operación, asistencia técnica remota y asistencia «on line»", que se consideran imprescindibles en la asistencia técnica.
>
> Además, las orientaciones pedagógicas del módulo indican que sus actividades profesionales "se aplican en la explotación de sistemas informáticos en relación al desarrollo de aplicaciones" (RD 405/2023, anexo I, módulo 0483, orientaciones pedagógicas, [BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)).

**Propuesta del docente.** A partir de esas fuentes, el módulo se plantea como **un encargo profesional realista**. La **empresa cliente**, una pequeña empresa de desarrollo de software **ficticia** (8 personas en desarrollo, 2 en QA y 1 en administración), contrata al alumnado para **poner en marcha su infraestructura**:

- puestos de desarrollo Windows y Linux;
- un servidor Linux y un controlador de dominio;
- almacenamiento organizado y cifrado;
- copias de seguridad automatizadas;
- red cableada e inalámbrica con IPv4 e IPv6;
- acceso remoto seguro.

Como en un proyecto real, el resultado incluye una **documentación técnica para entregar al cliente**: el **dossier técnico de la empresa cliente**. Se construye práctica a práctica en el repositorio Git de cada alumno o alumna:

| Documento del dossier | Se produce en | Relación con la prospectiva (art. 8) |
|---|---|---|
| Inventario de hardware y software, con licencias | P1, P2, P3, P9 | i) funcionalidad y rentabilidad |
| Procedimientos de instalación, recuperación y administración | P2, P4, P5, P8 | i) |
| Política de copias y cifrado, y registro de restauraciones | P3, P5 | h) integridad y accesibilidad de los datos; j) tratamiento de datos |
| Mapa físico y lógico de red y plan de direccionamiento | P6, P7 | i) |
| Procedimiento de acceso remoto seguro (SSH con claves, RDP) | P7, P8 | k) asistencia técnica remota |
| Registro de incidencias y manual de administración | Todas, P9 | k) |

**Prácticas reales del desarrollador** que recorren el módulo (propuesta del docente):

- preparar y documentar un **entorno de desarrollo** reproducible con un script (UD05);
- usar **WSL 2** como entorno Linux en Windows (UD05);
- una **introducción a contenedores**: ejecutar una imagen oficial y entender la diferencia con una MV, sin profundizar (UD02, UD05);
- conectarse a servidores y a Git con **SSH y claves** (UD07);
- mantener los **scripts de automatización versionados en Git**, con mensajes de *commit* significativos (UD05 en adelante);
- documentar en **Markdown** como se hace en un repositorio de proyecto (todas).

Cada práctica evaluable incluye una línea **"Conexión con el mundo real"** que indica a qué tarea profesional equivale.

## 2. Decisiones tecnológicas y aula · Propuesta del docente

La norma no impone ninguna tecnología. La tecnología elegida para cada exigencia del currículo, sus alternativas y el registro de decisión que la justifica están en el [índice de decisiones](decisiones/README.md).

**Requisitos de los PC del aula** (propuesta): CPU de 64 bits con virtualización (VT-x/AMD-V) activada en la UEFI, **16 GB de RAM** (8 GB como mínimo, con una MV encendida a la vez) y **150 GB libres** en SSD, con el hipervisor y el simulador de red elegidos instalados en la imagen del aula.

### 2.1 Cómo se adapta el módulo si el centro usa otra tecnología

Los **CE y las rúbricas evalúan capacidades, no productos**. Por ejemplo, la fila de RA6.g de la rúbrica de P8 dice "configura un dominio, une clientes y aplica directivas", no "usa Windows Server". Cambiar de tecnología solo exige:

1. **Sustituir en la [tabla de exigencias del currículo](decisiones/README.md#exigencias-del-curriculo-y-tecnologia-elegida)** la tecnología principal por la alternativa elegida y revisar el criterio. Por ejemplo, Proxmox en lugar de VirtualBox si el centro tiene servidor; Rocky Linux en lugar de Ubuntu si el entorno de prácticas en empresa usa RHEL; Samba AD en lugar de Windows Server si no hay licencias de evaluación.
2. **Usar la tabla de equivalencias de comandos** de cada unidad. Ejemplos:
   - Paquetes: `apt` ↔ `dnf`.
   - Cortafuegos: `ufw` ↔ `firewall-cmd`.
   - Red: netplan ↔ `nmcli`.
   - Instantáneas: `VBoxManage snapshot` ↔ `qm snapshot` (Proxmox) ↔ `Checkpoint-VM` (Hyper-V).
   - Dominio: `New-ADUser` ↔ `samba-tool user create`.
3. **Regenerar las plantillas de MV** (OVA, plantillas de Proxmox o VHDX) con la nueva tecnología antes de empezar la unidad.
4. **Mantener siempre la dualidad** de un sistema libre y uno propietario, porque la exigen los CE (RA2.e) y los contenidos básicos.

La secuencia de unidades, las horas, la matriz CE × UD y las ponderaciones **no cambian**.

### 2.2 Modalidad presencial: organización del aula

> Supuesto de partida: modalidad presencial. La organización es propuesta del docente.

Las prácticas se hacen en los **PC del aula** (requisitos al inicio de este apartado).

- Cada alumno o alumna tiene **puesto fijo** durante el curso. Sus MV se guardan en una carpeta propia del disco local (`D:\VMs\<usuario>`) o, si el aula se restaura al reiniciar (congeladores tipo Deep Freeze o reimagen), en un **SSD externo USB 3** personal de 256 GB o más, que se recomienda desde el inicio de curso.
- El docente prepara **plantillas OVA** (Windows 11, Ubuntu Desktop/Server, Windows Server 2025 ya instalados) para clonarlas cuando una práctica no trate la instalación en sí o cuando alguien pierda su laboratorio.
- La red del aula se usa como "red de la empresa" en UD07-UD08 (adaptador puente) solo cuando el docente lo indica; por defecto se trabaja en redes internas de VirtualBox para no interferir con la red del centro.
- El equipo personal es opcional: sirve para avanzar fuera del aula, pero **la evaluación se hace en el aula**.

### 2.3 Laboratorio del curso

Cada alumno o alumna mantiene este laboratorio en su puesto fijo del aula (o en un SSD externo personal, si el aula se restaura al reiniciar). El laboratorio crece de unidad en unidad:

| MV | Sistema | Se crea en | Uso |
|---|---|---|---|
| `W11-DEV` | Windows 11 Pro | UD02 | Puesto de desarrollo Windows; cliente del dominio en UD08 |
| `UB-DEV` | Ubuntu 24.04 LTS Desktop | UD02 | Puesto de desarrollo Linux |
| `UB-SRV` | Ubuntu 24.04 LTS Server | UD03 | Servidor Linux: Samba, CUPS, SSH, Tomcat |
| `WS-DC` | Windows Server 2025 | UD08 | Controlador de dominio `dam.test`, servidor de ficheros e impresión |

Topología de red del laboratorio desde UD07: red interna de VirtualBox `labdam` (`192.168.50.0/24` y `fd00:50::/64`), más un adaptador NAT para salir a Internet.

## 3. Secuencia y temporalización · Propuesta del docente

> Total de horas: Xunta, catálogo FP, ciclo D3IFC000200 ([edu.xunta.gal](https://www.edu.xunta.gal/fp/ciclo/D3IFC000200)). El reparto por unidades y trimestres es propuesta del docente.

| UD | Título | Horas | Sesiones de 50 min | Trimestre | RA principales |
|---|---|---|---|---|---|
| [UD01](unidades/UD01-hardware-y-arquitectura/README.md) | Hardware y arquitectura de un sistema informático | 15 | 18 | 1.º | RA1, RA2 |
| [UD02](unidades/UD02-sistemas-operativos-y-virtualizacion/README.md) | Sistemas operativos, virtualización e instalación | 25 | 30 | 1.º | RA2, RA7 |
| [UD03](unidades/UD03-almacenamiento-y-sistemas-de-archivos/README.md) | Almacenamiento, sistemas de archivos y cifrado | 19 | 23 | 1.º | RA3 |
| [UD04](unidades/UD04-administracion-local-del-sistema/README.md) | Administración local: usuarios, permisos, procesos y servicios | 22 | 26 | 2.º | RA4 |
| [UD05](unidades/UD05-automatizacion-copias-y-entorno-de-desarrollo/README.md) | Automatización, copias de seguridad y entorno de desarrollo | 15 | 18 | 2.º | RA3, RA4 |
| [UD06](unidades/UD06-redes-y-direccionamiento-ip/README.md) | Redes de ordenadores y direccionamiento IP | 19 | 23 | 2.º | RA1, RA5 |
| [UD07](unidades/UD07-configuracion-y-diagnostico-de-red/README.md) | Configuración, diagnóstico y seguridad de red en los SO | 12 | 14 | 3.º | RA5, RA6, RA7 |
| [UD08](unidades/UD08-recursos-en-red-y-dominios/README.md) | Recursos compartidos, servidores y dominios | 19 | 23 | 3.º | RA6, RA4 |
| [UD09](unidades/UD09-documentacion-y-aplicaciones-de-proposito-general/README.md) | Documentación técnica y aplicaciones de propósito general | 9 | 11 | 3.º (y transversal) | RA7, RA2 |
| | **Total** | **155** | **186** | | |

> **Sesiones (estimación, propuesta del docente):** se suponen sesiones de 50 min, de modo que sesiones = horas × 60 / 50. Cada centro debe ajustarlas a su horario y calendario.

Reparto por trimestre: 1.º 59 h (71 sesiones) · 2.º 56 h (67 sesiones) · 3.º 40 h (48 sesiones) (6 sesiones semanales; el tercer trimestre es más corto). Las 55 h que el currículo gallego añade a las 100 h mínimas se dedican a más práctica guiada en el aula, a las sesiones de verificación en el puesto y a los retos de ampliación (LVM, Samba, IPv6 en profundidad, Linux en el dominio), sin añadir contenidos ajenos a los contenidos básicos del RD 405/2023, anexo I, módulo 0483. UD09 tiene pocas horas propias porque **Git, Markdown y la búsqueda de documentación se usan desde la primera semana** (se presentan en la sesión de acogida y se evalúan con las memorias de todas las prácticas).

**Hilo conductor** (ver apartado 1.2). El encargo de poner en marcha la infraestructura de la empresa cliente ficticia se resuelve práctica a práctica, y cada práctica añade un documento al dossier técnico para el cliente: elegir equipos (P1), montar puestos (P2), organizar discos (P3), crear cuentas y permisos (P4), automatizar copias del código (P5), diseñar la red (P6), conectarla y asegurarla (P7), montar el dominio y los servidores (P8) y documentarlo todo (P9).

## 4. Matriz CE × UD

> Fuente de los CE: RD 405/2023, anexo I, módulo 0483, RA1-RA7 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221); texto literal en [curriculo-boe.md](curriculo-boe.md)). Las etiquetas de la columna CE son **resúmenes propios**, y la asignación a unidades es **propuesta del docente**.

«Se trabaja y evalúa en»: unidades donde el CE se trabaja y tiene evaluación propia. «Se refuerza en»: unidades donde se vuelve a trabajar o se refuerza.

| CE | Se trabaja y evalúa en | Se refuerza en |
|---|---|---|
| RA1.a Componentes físicos e interconexión | UD01 | — |
| RA1.b Tipos de memorias | UD01 | — |
| RA1.c Puesta en marcha de un equipo | UD01 | UD02 |
| RA1.d Dispositivos periféricos | UD01 | UD08 |
| RA1.e Tipos de redes y sistemas de comunicación | UD06 | — |
| RA1.f Componentes de una red | UD06 | — |
| RA1.g Mapas físicos y lógicos de red | UD06 | UD08 |
| RA1.h Seguridad y PRL | UD01 | — |
| RA2.a Elementos funcionales de un SI | UD01 | UD02 |
| RA2.b Características, funciones y arquitectura de un SO | UD02 | — |
| RA2.c Comparación de SO (requisitos, licencias…) | UD02 | UD09 |
| RA2.d Planificación de la instalación | UD02 | — |
| RA2.e Instalación y actualización de SO libres y propietarios | UD02 | UD08 |
| RA2.f Actualización y recuperación del sistema | UD02 | UD05 |
| RA2.g Virtualización | UD02 | UD03, UD04, UD05, UD07, UD08 |
| RA2.h Instalar, desinstalar y actualizar aplicaciones | UD02 | UD05 |
| RA2.i Documentación de los procesos | UD02 | UD03, UD04, UD05, UD06, UD07, UD08, UD09 |
| RA3.a Comparación de sistemas de archivos | UD03 | — |
| RA3.b Estructura y función de directorios | UD03 | — |
| RA3.c Localizar información (GUI y comandos) | UD03 | — |
| RA3.d Particiones y unidades lógicas | UD03 | — |
| RA3.e Copias de seguridad y restauración | UD05 | — |
| RA3.f Planificar y automatizar tareas | UD05 | — |
| RA3.g Utilidades de gestión de información | UD03 | UD05 |
| RA4.a Cuentas de usuario locales y grupos | UD04 | UD08 |
| RA4.b Directivas de cuenta y contraseñas | UD04 | UD08 |
| RA4.c Servicios y procesos | UD04 | — |
| RA4.d Permisos locales y ACL | UD04 | UD08 |
| RA4.e Comandos de configuración y administración | UD04, UD05 | — |
| RA4.f Monitorización del sistema | UD04 | — |
| RA4.g Utilidades de mantenimiento y optimización | UD04 | — |
| RA4.h Necesidades del sistema para desarrollo | UD05 | — |
| RA5.a Configuración de TCP/IP | UD06, UD07 | — |
| RA5.b LAN cableadas | UD06 | — |
| RA5.c LAN inalámbricas | UD06 | — |
| RA5.d Dispositivos de interconexión | UD06 | — |
| RA5.e Acceso a redes de área extensa | UD06 | — |
| RA5.f Gestión de puertos | UD07 | — |
| RA5.g Verificación con comandos y herramientas | UD07 | UD06 |
| RA5.h Protocolos seguros | UD07 | — |
| RA6.a Acceso a recursos locales y de red | UD08 | — |
| RA6.b Derechos de usuario y directivas de seguridad | UD08 | — |
| RA6.c Servidores de ficheros, impresión y aplicaciones | UD08 | — |
| RA6.d Conexión remota | UD07, UD08 | — |
| RA6.e Necesidad de proteger recursos y sistema | UD08 | UD03 |
| RA6.f Utilidades de seguridad básica | UD08 | UD07 |
| RA6.g Dominios | UD08 | — |
| RA7.a Clasificación de software por licencia y propósito | UD02, UD09 | — |
| RA7.b Necesidades de software en entornos productivos | UD09 | UD05 |
| RA7.c Documentación con ofimática y trabajo colaborativo | UD09 | UD02, UD03, UD04, UD05, UD06, UD07, UD08 |
| RA7.d Correo y mensajería electrónica | UD09 | — |
| RA7.e Transferencia de ficheros | UD07, UD09 | — |
| RA7.f Búsqueda de documentación técnica | UD09 | UD02 |
| RA7.g Herramientas de propósito general | UD09 | — |

**Cobertura** (comprobación propia sobre el texto del anexo I): los 54 CE del módulo (RA1: 8, RA2: 9, RA3: 7, RA4: 8, RA5: 8, RA6: 7, RA7: 7) tienen al menos una unidad en la columna «Se trabaja y evalúa en». Cada CE de esa columna está ligado a una fila de la rúbrica de la práctica de esa unidad o a una pregunta de la prueba trimestral.

## 5. Evaluación · Propuesta del docente

> Los RA y CE son los del RD 405/2023, anexo I, módulo 0483 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). El RD no fija ponderaciones, instrumentos ni criterios de calificación: todo este apartado es **propuesta del docente**. Debe contrastarse con la normativa de evaluación de FP de Galicia vigente para el curso 2026-27 (pendiente de citar con su referencia DOG) y con el proyecto curricular del centro.

### 5.1 Principios

- **Evaluación por RA.** Cada RA se califica de 0 a 10 a partir de sus CE. Salvo que la rúbrica diga otra cosa, **todos los CE de un RA pesan lo mismo**.
- **Nota final del módulo = media ponderada de los RA**, con la condición de que **cada RA tenga al menos un 5**. Si algún RA queda por debajo de 5, la nota final será la menor entre 4 y la media ponderada.
- Las notas de las evaluaciones trimestrales son **informativas**: media ponderada de los RA (o de la parte de cada RA) evaluados hasta ese momento.
- Redondeo: al entero más próximo solo en la nota final (x,5 sube) y solo si todos los RA están superados.

### 5.2 Ponderación de los RA

| RA | Peso | Horas aprox. | Justificación |
|---|---|---|---|
| RA1 Evalúa sistemas informáticos (hardware, redes físicas) | **10 %** | ~20 h | Base conceptual, mucho contenido identificativo; se vuelve a usar en el resto del módulo. |
| RA2 Instala sistemas operativos | **15 %** | ~25 h | Habilita todo el laboratorio; incluye virtualización y recuperación. |
| RA3 Gestiona la información del sistema | **15 %** | ~25 h | Discos, sistemas de archivos, búsquedas, copias y automatización: tareas diarias del desarrollador. |
| RA4 Gestiona sistemas operativos | **20 %** | ~31 h | Núcleo profesional del módulo (usuarios, permisos, servicios, comandos) y el único RA que pide explícitamente el vínculo con el desarrollo de aplicaciones (RA4.h). |
| RA5 Interconecta sistemas en red | **15 %** | ~22 h | Toda aplicación multiplataforma se comunica en red; incluye IPv6 y protocolos seguros. |
| RA6 Opera sistemas en red | **15 %** | ~22 h | Servidores, dominios y seguridad; integra RA4 y RA5. |
| RA7 Elabora documentación y usa aplicaciones de propósito general | **10 %** | ~10 h + transversal | Competencia transversal: se evalúa sobre todo a través de la calidad de la documentación de todas las prácticas. |

### 5.3 Instrumentos

| Código | Instrumento | Momento |
|---|---|---|
| P1–P9 | **Prácticas evaluables** en MV o Packet Tracer, hechas en el aula durante las sesiones de la unidad, con memoria en Markdown y rúbrica ligada a CE (una por unidad). El docente **comprueba en el puesto** el resultado final (verificación en vivo) antes de dar la práctica por entregada. | Al final de cada UD |
| PE1, PE2, PE3 | **Prueba práctica trimestral presencial** en los PC del aula: tareas cronometradas sobre MV preparadas por el docente (plantillas OVA), sin acceso a Internet salvo a la documentación oficial que se indique (`man`, `Get-Help`, documentación local), más una parte breve de preguntas cortas o test para los CE conceptuales (RA1, RA2.b-c, RA7.a). | Final de cada trimestre |
| OD | **Observación directa** en el aula con lista de control por CE: procedimiento seguido en las prácticas guiadas (instantánea previa, uso de CLI y GUI, verificación del resultado), normas de seguridad y PRL en la manipulación de hardware (RA1.h) y trabajo en equipo. Se registra en el cuaderno del docente y sirve para **matizar ±1 punto** la nota del CE observado y para validar la autoría de las prácticas. | Continuo |
| AC | Actividades de clase y cuestionarios: **no puntúan**, sirven de evaluación formativa y como requisito para presentarse a la recuperación de prácticas. | Continuo |

Peso de cada instrumento **dentro** de cada RA:

| RA | Instrumentos (peso dentro del RA) |
|---|---|
| RA1 | P1 40 % · P6, apartado de componentes y mapas de red (RA1.e-g) 20 % · PE1 25 % · PE2 15 % |
| RA2 | P2 60 % · PE1 40 % |
| RA3 | P3 40 % · P5, apartado de copias y tareas programadas (RA3.e-f) 20 % · PE1 25 % · PE2 15 % |
| RA4 | P4 50 % · P5, apartado de scripts y entorno de desarrollo (RA4.e, RA4.h) 15 % · PE2 35 % |
| RA5 | P6 40 % · P7 30 % · PE2 15 % · PE3 15 % |
| RA6 | P8 60 % · P7, apartado SSH/RDP (RA6.d) 10 % · PE3 30 % |
| RA7 | P9 60 % · calidad de la documentación de P2–P8 (RA7.c, RA2.i) 20 % · PE3 20 % |

### 5.4 Criterios de calificación de las prácticas

- Se realizan **en el aula** en las sesiones reservadas para ello (indicadas en cada UD). Al terminar, el alumno o alumna pide la **verificación en el puesto**: el docente comprueba el estado de las MV (por ejemplo, que el recurso compartido funciona o que la copia se restaura) y anota el nivel provisional de cada CE.
- La memoria se entrega en la plataforma del centro como **enlace al repositorio** (o ZIP del repositorio) con el `README.md`, capturas y los scripts o ficheros de configuración. Las capturas deben mostrar el **nombre de usuario o equipo del alumno o alumna** (prompt, fondo o *hostname*) para garantizar la autoría.
- Rúbrica de 3 niveles por CE (Excelente 10-9, Adecuado 8-5, Insuficiente <5). La nota de la práctica para cada CE es la del nivel alcanzado.
- Entrega fuera de plazo (hasta 7 días): nota máxima de 7 en esa práctica. Después, solo en recuperación.
- **Copia o plagio** (incluido texto generado por IA presentado como propio sin indicarlo): la práctica se califica con 0 y se recupera en la convocatoria ordinaria final. El uso de asistentes de IA está permitido si se indica en la memoria qué se ha consultado y se verifica lo que se ejecuta.
- En las prácticas puede pedirse una **defensa oral breve** en el puesto (5 min) en la que el alumnado repite una parte delante del docente. Si no sabe explicar su trabajo, la práctica no se considera superada.
- La **asistencia** es la propia de la modalidad presencial: la pérdida del derecho a la evaluación continua se rige por el reglamento del centro y la normativa autonómica. Quien no pueda hacer la verificación en el puesto por una falta justificada la hace en la sesión siguiente.

### 5.5 Recuperación

- **Durante el curso:** las prácticas con CE no superados pueden reentregarse corregidas una vez, en un plazo de dos semanas desde la corrección (nota máxima 7 en esos CE). Cada prueba trimestral tiene una recuperación al inicio del trimestre siguiente (la PE3, en la semana previa a la evaluación final).
- **Convocatoria ordinaria final:** el alumnado con algún RA <5 se examina **solo de los RA pendientes** con una prueba práctica por RA y, si el docente lo indica, entrega las prácticas que faltan.
- **Convocatoria extraordinaria** (según la normativa autonómica de evaluación): prueba práctica de los RA pendientes más un plan de trabajo con prácticas equivalentes a las del curso.
- Se conservan las notas de los RA superados en todas las convocatorias del mismo curso académico.

## 6. Metodología · Propuesta del docente

> Las líneas de actuación que el RD 405/2023 recomienda (anexo I, módulo 0483, orientaciones pedagógicas) incluyen, entre otras, "la utilización de tecnologías de virtualización para simular sistemas", "la correcta interpretación de documentación técnica" y "la elaboración de documentación técnica". La concreción que sigue es propia.

- **Modalidad presencial, aula-taller con PC.** Bloques de 2 o 3 sesiones de 50 min con esta estructura: explicación breve con demostración en el proyector (15-20 min), práctica guiada en el puesto con el docente circulando y resolviendo dudas (observación directa), y cierre de 10 min con una puesta en común de errores frecuentes. Aproximadamente el **70 % de las horas son prácticas en el puesto**.
- **Aprender haciendo en laboratorio virtual.** Las tareas se plantean como incidencias o peticiones de la empresa cliente.
- **Trabajo por parejas en las prácticas de red** (UD06-UD08): dos puestos vecinos conectan sus MV (adaptador puente o red interna del aula autorizada por el docente) para probar recursos compartidos, SSH o el dominio "de verdad" entre equipos distintos. La memoria es individual.
- **Hardware real en UD01:** se dispone de equipos de despiece o de baja en el aula para identificar componentes y montar/desmontar con las medidas de PRL, ya que la modalidad presencial lo permite.
- **Instantánea antes de cada práctica.** Norma del aula: antes de tocar una MV se toma una instantánea con nombre descriptivo (`VBoxManage snapshot "UB-SRV" take "antes-P4"`). Se puede romper todo.
- **Doble vía GUI/CLI y doble SO.** Las actividades aparecen en pares Linux/Windows para que el alumnado compare conceptos (no solo comandos).
- **Documentar mientras se trabaja.** Cada práctica se documenta en Markdown en el repositorio del curso; el docente revisa *commits* y da *feedback* en *issues* o comentarios.
- **Lectura de documentación técnica.** En cada unidad se resuelve al menos una tarea consultando `man`, `--help`, `Get-Help` o la documentación oficial antes de buscar en foros, en línea con la orientación pedagógica citada arriba.
- **Aula invertida en contenidos conceptuales** (UD01, UD06): el alumnado lee o ve material antes de clase y en clase se resuelven casos.
- **Coordinación con MP0485 Programación**: la UD05 prepara el entorno (JDK, IDE, Git) que se usa en Programación; los scripts de UD05 refuerzan variables, condicionales y bucles.

Propuesta complementaria fuera del módulo: [FP·onboard](../../fponboard/README.md)

## 7. Atención a la diversidad · Propuesta del docente

- **Ritmos distintos:** cada práctica tiene una parte mínima (nivel Adecuado) y retos de ampliación marcados como ⭐ para quien termina antes (por ejemplo, LVM, Samba AD, VLSM con IPv6, WireGuard).
- **Equipamiento:** las prácticas se hacen con los PC del aula, de modo que nadie depende de tener equipo propio. Si un PC del aula se queda corto de RAM, se usan versiones *Server* sin entorno gráfico (1-2 GB de RAM), se encienden menos MV a la vez o se usa un servidor Proxmox del centro.
- **Necesidades específicas de apoyo educativo:** adaptaciones de acceso (tiempo extra en pruebas, enunciados con lectura fácil, contraste y tamaño de letra, lector de pantalla compatible con el material en Markdown) sin modificar los RA ni los CE, que son enseñanzas mínimas (RD 405/2023, anexo I).
- **Alumnado con experiencia previa** (por ejemplo, otro ciclo o trabajo en soporte): puede actuar como mentor en las prácticas guiadas y realizar directamente los retos de ampliación.

## 8. Recursos generales · Propuesta del docente

- Hipervisor, ISOs y licencias: VirtualBox, Ubuntu 24.04 LTS, Windows 11 (ISO oficial y licencias de Azure Dev Tools for Teaching si el centro está adherido), Windows Server 2025 Evaluation Center, Packet Tracer (Cisco Networking Academy).
- Currículo: [curriculo-boe.md](curriculo-boe.md).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
