# UD08 · Recursos compartidos, servidores y dominios

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 19 h · 23 sesiones de 50 min (≈ 3,8 semanas a 6 sesiones; propuesta del docente) | RA6 (a, b, c, d, e, f, g; ~90 %) · refuerza RA4.a, RA4.b, RA4.d, RA1.d, RA1.g |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA6.a | Se ha configurado el acceso a recursos locales y recursos de red. | [RD 405/2023, anexo I, 0483, RA6.a][boe] | P8 (recursos compartidos y unidades asignadas desde clientes Windows y Linux) · PE3 |
| RA6.b | Se han identificado y configurado los derechos de usuario y directivas de seguridad. | [RD 405/2023, anexo I, 0483, RA6.b][boe] | P8 (derechos de usuario, directivas de seguridad y de auditoría, `sudoers`) · PE3 |
| RA6.c | Se han explotado servidores de ficheros, servidores de impresión y servidores de aplicaciones. | [RD 405/2023, anexo I, 0483, RA6.c][boe] | P8 (servidores de ficheros, impresión y aplicaciones en ambos SO) · PE3 |
| RA6.d | Se ha accedido a los servidores utilizando técnicas de conexión remota. | [RD 405/2023, anexo I, 0483, RA6.d][boe] | P8 (administración remota de los servidores con RDP, SSH y RSAT) |
| RA6.e | Se ha evaluado la necesidad de proteger los recursos y el sistema. | [RD 405/2023, anexo I, 0483, RA6.e][boe] | P8 (análisis de riesgos y plan de protección) |
| RA6.f | Se han instalado y evaluado utilidades de seguridad básica. | [RD 405/2023, anexo I, 0483, RA6.f][boe] | P8 (antimalware, auditoría y protección frente a fuerza bruta: instalación y evaluación) |
| RA6.g | Se han configurado y explotado dominios. | [RD 405/2023, anexo I, 0483, RA6.g][boe] | P8 (dominio `dam.test`: OU, usuarios, grupos, equipos, GPO) · PE3 |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Analizar qué recursos y datos hay que proteger, frente a qué amenazas y con qué medidas.
2. Distinguir permisos de recurso compartido, permisos NTFS/POSIX y derechos de usuario, y calcular el acceso efectivo.
3. Montar y explotar servidores de ficheros (SMB en Windows Server y Samba), de impresión (servidor de impresión de Windows y CUPS) y de aplicaciones (Tomcat e IIS).
4. Implantar un dominio de Active Directory: controlador de dominio, DNS, OU, usuarios, grupos con la estrategia AGDLP, unión de equipos y GPO.
5. Configurar derechos de usuario, directivas de seguridad y auditoría.
6. Instalar y evaluar utilidades de seguridad básica y configurar cortafuegos en los servidores.
7. Administrar los servidores en remoto.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloques «Gestión de recursos en una red»; «Configuración de sistemas operativos» (permisos, ACL) ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Necesidad de proteger los recursos (RA6.e)

- **Dimensiones de la seguridad:**
  - **Confidencialidad, integridad y disponibilidad (CID)**.
  - Además, **autenticidad** y **trazabilidad**.
- **Análisis de riesgos (simplificado):**
  1. Identificar los **activos**: código fuente, datos de clientes, credenciales, servidores.
  2. Identificar las **amenazas**: *malware*, *ransomware*, robo de un portátil, error humano, fallo de disco, acceso indebido.
  3. Identificar las **vulnerabilidades**: falta de parches, contraseñas débiles, permisos excesivos, puertos abiertos.
  4. Estimar el **impacto** y la **probabilidad** de cada riesgo.
  5. Decidir las **medidas**.
- **Medidas de protección:**
  - Mínimo privilegio y defensa en profundidad.
  - Actualizaciones.
  - Copias de seguridad (UD05) y cifrado (UD03).
  - Autenticación robusta (UD04).
  - Segmentación y cortafuegos (UD06-07).
  - Registro y auditoría.
  - Formación de las personas usuarias.
- **Marco legal de referencia para datos personales:** Reglamento (UE) 2016/679, RGPD ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)), y LO 3/2018, LOPDGDD ([BOE](https://www.boe.es/eli/es/lo/2018/12/05/3)). Aquí solo se citan como contexto de por qué hay que proteger los datos; el estudio de sus obligaciones excede el módulo. Guías prácticas para pymes: [INCIBE](https://www.incibe.es/empresas).

### 2. Permisos y derechos en red (RA6.a, RA6.b)

| Concepto | Qué controla | Dónde |
|---|---|---|
| **Permiso de recurso compartido** | Acceso **por la red** a una carpeta compartida: Lectura, Cambiar, Control total | Propiedades → Compartir → Uso compartido avanzado · `Grant-SmbShareAccess` · Samba: `valid users`, `read only`, `write list` |
| **Permiso NTFS / POSIX** | Acceso **local y por la red** a archivos y carpetas, con herencia | UD04 (`icacls`, `setfacl`) |
| **Derecho de usuario** | **Acciones sobre el sistema**: iniciar sesión localmente o por RDP, apagar, cambiar la hora, iniciar sesión como servicio… | `secpol.msc` / GPO → Asignación de derechos de usuario · Linux: `sudoers`, `/etc/security/access.conf` |
| **Directiva de seguridad** | Contraseñas, bloqueo, auditoría, opciones de seguridad (UAC, mensaje legal al iniciar sesión, nombre de la cuenta de administrador) | `secpol.msc` local o GPO de dominio |

- **Acceso efectivo a un recurso compartido de Windows** = el **más restrictivo** entre el permiso de recurso compartido y el permiso NTFS.
- **Práctica recomendada:** dar en el recurso compartido "Cambiar" a un grupo amplio y afinar con NTFS. **Enumeración basada en el acceso (ABE):** cada persona solo ve las carpetas a las que tiene acceso.
- **Recursos locales y de red:**
  - **Recurso local:** una unidad o impresora conectada al propio equipo.
  - **Recurso de red:** se accede por una ruta UNC (`\\servidor\recurso`), una unidad asignada (`P:`) o un punto de montaje (`/mnt/proyectos`).

### 3. Servidores de ficheros (RA6.c)

**Windows Server (SMB):**

```powershell
Install-WindowsFeature FS-FileServer
New-Item -ItemType Directory D:\Proyectos
New-SmbShare -Name "Proyectos" -Path "D:\Proyectos" -ChangeAccess "DAM\DL_Proyectos_M" -ReadAccess "DAM\DL_Proyectos_L" -FolderEnumerationMode AccessBased
icacls D:\Proyectos /grant "DAM\DL_Proyectos_M:(OI)(CI)M" "DAM\DL_Proyectos_L:(OI)(CI)RX"
Get-SmbShare ; Get-SmbShareAccess -Name Proyectos ; Get-SmbSession
```

**Cliente Windows:**

```powershell
New-SmbMapping -LocalPath "P:" -RemotePath "\\WS-DC\Proyectos" -Persistent $true
net use                       # unidades asignadas (equivalente clásico: net use P: \\WS-DC\Proyectos /persistent:yes)
```

**Samba en `UB-SRV`.** Recurso para los artefactos de compilación:

```bash
sudo apt install -y samba
sudo mkdir -p /srv/samba/artefactos
sudo chgrp desarrollo /srv/samba/artefactos && sudo chmod 2770 /srv/samba/artefactos
sudo smbpasswd -a ana                      # Samba tiene su propia base de contraseñas (si no se une al dominio)
```

```ini
# Añadir al final de /etc/samba/smb.conf
[artefactos]
   path = /srv/samba/artefactos
   valid users = @desarrollo @qa
   write list = @desarrollo
   read only = yes
   create mask = 0660
   directory mask = 2770
```

```bash
testparm                                    # valida la configuración
sudo systemctl restart smbd
sudo ufw allow from 192.168.50.0/24 to any app Samba
smbclient -L //192.168.50.10 -U ana         # listar recursos
smbclient //192.168.50.10/artefactos -U ana
# Montar desde Linux (paquete cifs-utils):
sudo mount -t cifs //192.168.50.10/artefactos /mnt/artefactos -o username=ana,uid=$(id -u),gid=$(id -g)
```

Desde Windows: `\\192.168.50.10\artefactos` en el Explorador. Desde GNOME: *Otras ubicaciones* → `smb://192.168.50.10/artefactos`.

### 4. Servidores de impresión (RA6.c, RA1.d)

**CUPS en `UB-SRV`.** La impresora virtual PDF permite practicar sin hardware.

```bash
sudo apt install -y cups printer-driver-cups-pdf
sudo usermod -aG lpadmin ana                # puede administrar CUPS
sudo cupsctl --share-printers --remote-admin
sudo lpadmin -p PDF -o printer-is-shared=true
sudo ufw allow from 192.168.50.0/24 to any port 631 proto tcp
lpstat -t                                   # estado de impresoras y colas
lp -d PDF /etc/hostname ; lpq -P PDF ; cancel -a PDF
# Interfaz web de administración: https://192.168.50.10:631
```

**Servidor de impresión de Windows Server:**

```powershell
Install-WindowsFeature Print-Server -IncludeManagementTools
Add-PrinterPort -Name "IP_192.168.50.200" -PrinterHostAddress "192.168.50.200"
Add-PrinterDriver -Name "Microsoft PS Class Driver"
Add-Printer -Name "IMP-DEV" -DriverName "Microsoft PS Class Driver" -PortName "IP_192.168.50.200" -Shared -ShareName "IMP-DEV"
Get-Printer ; printmanagement.msc
# Cliente:
Add-Printer -ConnectionName "\\WS-DC\IMP-DEV"
```

En el laboratorio la IP .200 no corresponde a ninguna impresora real: los trabajos se quedan en la cola, lo que sirve para practicar la gestión de colas. Las impresoras también se pueden desplegar a los equipos con GPO (Administración de impresión → *Implementar con directiva de grupo*).

### 5. Servidores de aplicaciones (RA6.c)

| Tipo | Función | Ejemplos |
|---|---|---|
| Servidor web | Sirve contenido estático y hace de *proxy* | nginx, Apache httpd, IIS |
| **Servidor de aplicaciones** | Ejecuta la lógica de negocio de una aplicación | **Apache Tomcat** (Jakarta EE web), WildFly, Node.js, Kestrel (.NET) |
| Servidor de bases de datos | Persistencia | MariaDB/MySQL, PostgreSQL, SQL Server (MP0484) |

**Tomcat 10 en `UB-SRV`:**

```bash
sudo apt install -y tomcat10 tomcat10-admin
systemctl status tomcat10                   # escucha en el 8080
sudo ss -tlpn | grep 8080
# Despliegue: copiar un .war a /var/lib/tomcat10/webapps/ (p. ej., la aplicación de ejemplo de la documentación de Tomcat)
sudo cp sample.war /var/lib/tomcat10/webapps/
curl -I http://localhost:8080/sample/
# Usuario del Manager en /etc/tomcat10/tomcat-users.xml (rol manager-gui) → http://192.168.50.10:8080/manager/html
sudo ufw allow from 192.168.50.0/24 to any port 8080 proto tcp
journalctl -u tomcat10 -n 50 ; ls /var/log/tomcat10/
```

**IIS en Windows Server:**

```powershell
Install-WindowsFeature Web-Server -IncludeManagementTools
Get-Website ; Start-Process "http://localhost"
# Contenido en C:\inetpub\wwwroot ; administrador: inetmgr
```

### 6. Dominios con Active Directory (RA6.g)

**Conceptos:**

- **Dominio:** límite administrativo y de seguridad con una base de datos de directorio común.
- **Controlador de dominio (DC):** guarda y replica el directorio y autentica con **Kerberos**.
- **Bosque y árbol:** agrupación de dominios.
- **Unidad organizativa (OU):** contenedor al que se aplican GPO y se delega la administración.
- **Objetos:** usuarios, grupos y equipos.
- **DNS:** imprescindible, porque los clientes localizan el DC con registros SRV.

| Ámbito de grupo | Miembros | Uso (estrategia **AGDLP**) |
|---|---|---|
| **Global (GG_)** | Cuentas del mismo dominio | Agrupar a las **personas** por función: `GG_Desarrollo`, `GG_QA` |
| **Local de dominio (DL_)** | Cuentas y grupos de cualquier dominio del bosque | Dar **permisos** sobre un recurso: `DL_Proyectos_M` (modificar) |
| Universal | Del bosque | Bosques multidominio |

**AGDLP:** las cuentas (**A**) se meten en grupos globales (**G**), los globales en grupos locales de dominio (**DL**), y los permisos (**P**) se asignan a los DL.

**Implantación** (en `WS-DC`, con IP estática 192.168.50.20 y nombre ya cambiado):

```powershell
Rename-Computer -NewName WS-DC -Restart
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Install-ADDSForest -DomainName "dam.test" -DomainNetbiosName "DAM" -InstallDns `
  -SafeModeAdministratorPassword (Read-Host -AsSecureString "Contraseña DSRM")   # reinicia al terminar
Get-ADDomain ; Get-ADDomainController ; Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.dam.test
```

**OU, grupos y usuarios:**

```powershell
$base = "DC=dam,DC=test"
New-ADOrganizationalUnit -Name "Empresa" -Path $base
"Desarrollo","QA","Admin","Equipos" | ForEach-Object { New-ADOrganizationalUnit -Name $_ -Path "OU=Empresa,$base" }
New-ADGroup -Name "GG_Desarrollo" -GroupScope Global -GroupCategory Security -Path "OU=Desarrollo,OU=Empresa,$base"
New-ADGroup -Name "DL_Proyectos_M" -GroupScope DomainLocal -GroupCategory Security -Path "OU=Empresa,$base"
Add-ADGroupMember -Identity "DL_Proyectos_M" -Members "GG_Desarrollo"

# Altas desde CSV: usuario,nombre,ou
Import-Csv .\usuarios-ad.csv | ForEach-Object {
  New-ADUser -Name $_.nombre -SamAccountName $_.usuario -UserPrincipalName "$($_.usuario)@dam.test" `
    -Path "OU=$($_.ou),OU=Empresa,$base" -Enabled $true -ChangePasswordAtLogon $true `
    -AccountPassword (ConvertTo-SecureString "Cambiar.2026!" -AsPlainText -Force)   # solo laboratorio
  Add-ADGroupMember -Identity "GG_$($_.ou)" -Members $_.usuario
}
Get-ADUser -Filter * -SearchBase "OU=Empresa,$base" | Select-Object Name, SamAccountName, Enabled
```

**Unir un equipo al dominio.** En `W11-DEV`, con el DNS apuntando a 192.168.50.20:

```powershell
Add-Computer -DomainName "dam.test" -Credential "DAM\Administrador" -OUPath "OU=Equipos,OU=Empresa,DC=dam,DC=test" -Restart
# Después: iniciar sesión como DAM\ana ; whoami /upn ; nltest /dsgetdc:dam.test
```

**Directivas de grupo (GPO):**

- **Orden de aplicación:** Local → Sitio → Dominio → OU (**LSDO**). Si dos GPO configuran lo mismo, prevalece la última que se aplica.
- **Partes de una GPO:** *Configuración del equipo*, que se aplica al iniciar el equipo, y *Configuración de usuario*, que se aplica al iniciar sesión.
- **Directiva de contraseñas del dominio:** se define en la *Default Domain Policy* o con `Set-ADDefaultDomainPasswordPolicy`.

```powershell
Set-ADDefaultDomainPasswordPolicy -Identity dam.test -MinPasswordLength 12 -PasswordHistoryCount 5 `
  -LockoutThreshold 5 -LockoutDuration 00:15:00 -LockoutObservationWindow 00:15:00
New-GPO -Name "Empresa-QA-Restricciones" | New-GPLink -Target "OU=QA,OU=Empresa,DC=dam,DC=test"
Set-GPRegistryValue -Name "Empresa-QA-Restricciones" -Key "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" `
  -ValueName "NoControlPanel" -Type DWord -Value 1          # ejemplo: sin Panel de control
# En el cliente:
gpupdate /force ; gpresult /r /scope user
```

- La **asignación de unidades de red** por GPO se hace desde la consola gráfica (`gpmc.msc` → Preferencias → Configuración de Windows → Asignaciones de unidad).
- **Administración remota:** las herramientas **RSAT** del cliente Windows 11 (Configuración → Sistema → Características opcionales) permiten gestionar el dominio sin entrar en el servidor.

**Ampliación:** unir `UB-DEV` al dominio con `realmd` y `sssd`:

```bash
sudo apt install realmd sssd-ad sssd-tools adcli
realm discover dam.test
sudo realm join -U Administrador dam.test
```

La alternativa libre al controlador de dominio de Windows (Samba AD DC) se describe en [DEC-SI-03](../../decisiones/DEC-SI-03-windows-y-dominio.md).

### 7. Derechos de usuario, directivas de seguridad y auditoría (RA6.b)

| Derecho o directiva (Windows) | Uso en la empresa cliente |
|---|---|
| Permitir inicio de sesión a través de Servicios de Escritorio remoto | En los servidores, solo `GG_Admin` |
| Denegar el inicio de sesión local | Cuentas de servicio |
| Apagar el sistema | Solo administración en los servidores |
| Auditar eventos de inicio de sesión (correcto/erróneo) | Detectar ataques de fuerza bruta (eventos 4624 y 4625) |
| Opciones de seguridad → Inicio de sesión interactivo: texto del mensaje | Aviso legal al iniciar sesión |

```powershell
auditpol /get /category:*                         # directiva de auditoría efectiva
secedit /export /cfg C:\Temp\secpol.inf           # exportar la directiva local para documentarla
```

**Linux: delegar tareas concretas sin dar root.** Se hace con un fichero en `/etc/sudoers.d/`, editado siempre con `visudo`:

```bash
sudo visudo -f /etc/sudoers.d/desarrollo
# Contenido:
%desarrollo ALL=(root) /usr/bin/systemctl restart tomcat10, /usr/bin/journalctl -u tomcat10*
sudo -l -U ana                                    # comprobar qué puede hacer ana
```

### 8. Utilidades de seguridad básica y cortafuegos (RA6.f)

| Función | Windows | Linux |
|---|---|---|
| Antimalware | **Microsoft Defender**: `Get-MpComputerStatus`, `Update-MpSignature`, `Start-MpScan -ScanType QuickScan`, `Get-MpThreatDetection` | **ClamAV**: `sudo apt install clamav`, `sudo freshclam` (con el servicio `clamav-freshclam` parado), `clamscan -r --infected /srv` |
| Prueba segura del antivirus | Archivo de prueba estándar **EICAR** ([eicar.org](https://www.eicar.org/)); no es *malware* | Ídem |
| Auditoría de configuración | Microsoft Security Compliance Toolkit y *baselines* de seguridad | **Lynis**: `sudo lynis audit system` (índice de bastionado y sugerencias) |
| Protección frente a fuerza bruta | Directiva de bloqueo de cuenta (UD04) | **fail2ban**: `sudo apt install fail2ban`; `sudo fail2ban-client status sshd` |
| Cortafuegos | Firewall de Windows Defender; reglas por GPO | `ufw` (UD07) |
| Gestor de contraseñas | KeePassXC, Bitwarden | KeePassXC, Bitwarden |

Criterios para evaluar una utilidad de seguridad:

- Detección o eficacia comprobada con pruebas seguras.
- Falsos positivos.
- Consumo de recursos.
- Actualización de firmas o reglas.
- Licencia.
- Administración centralizada.
- Registro de eventos.

### 9. Equivalencias en otras tecnologías

| Servicio | Opción de la UD | Alternativas |
|---|---|---|
| Directorio | Windows Server AD DS | Samba AD DC, FreeIPA (entornos Linux) |
| Ficheros | SMB (Windows), Samba | NFS, Nextcloud |
| Impresión | Servidor de impresión de Windows, CUPS | CUPS en cualquier distribución |
| Aplicaciones | Tomcat, IIS | WildFly, nginx + Node.js, Kestrel |
| Cortafuegos | ufw, Firewall de Windows | firewalld, nftables |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. Análisis de riesgos de la empresa cliente.** Por grupos: 6 activos, sus amenazas y vulnerabilidades, una matriz sencilla de impacto por probabilidad y las medidas, enlazadas con las UD del curso.
- **A2. Calcular el acceso efectivo.** Ocho casos de permiso de recurso compartido × NTFS × pertenencia a grupos. Resolverlos en papel y comprobarlos con *Acceso efectivo*.
- **A3. Montar el dominio paso a paso** (práctica guiada): IP estática, nombre, rol AD DS, promoción, comprobación del DNS y unión de `W11-DEV`. Instantánea antes de promocionar.
- **A4. GPO en vivo.** Crear una GPO en la OU de QA, iniciar sesión con un usuario de QA y con uno de Desarrollo, y explicar la diferencia con `gpresult /r`.
- **A5. Ataque y defensa (en el laboratorio).** Por parejas, provocar intentos fallidos de SSH y de inicio de sesión de Windows. Ver cómo actúan fail2ban y la directiva de bloqueo, y localizar los eventos.
- **A6. Desplegar una aplicación.** Desplegar un `.war` sencillo (por ejemplo, uno hecho en MP0485) en Tomcat y acceder desde `W11-DEV`. Analizar los registros cuando la aplicación falla.

### Práctica evaluable

**P8 · Dominio y servicios de red de la empresa cliente.** Por parejas en el aula (dos puestos conectados por adaptador puente, con autorización del docente) o de forma individual en la red interna. **La memoria es individual.**

1. **Plan de protección** (RA6.e): análisis de riesgos resumido y medidas, enlazadas con lo implantado durante el curso.
2. **Dominio `dam.test`** en `WS-DC`:
   - OU `Empresa/{Desarrollo, QA, Admin, Equipos}`.
   - Usuarios dados de alta desde CSV.
   - Grupos con la estrategia AGDLP.
   - `W11-DEV` unido al dominio en la OU `Equipos`.
3. **GPO:**
   - Directiva de contraseñas y bloqueo del dominio.
   - Una GPO de restricciones para QA.
   - Asignación de la unidad `P:` para Desarrollo.
   - RDP en los servidores solo para `GG_Admin` (derecho de usuario).
   - Auditoría de inicios de sesión activada y comprobada en el Visor de eventos.
4. **Servidores de ficheros:**
   - Recurso `\\WS-DC\Proyectos` con permisos de recurso compartido y NTFS según AGDLP, y ABE.
   - Recurso Samba `artefactos` en `UB-SRV`.
   - Acceso comprobado desde `W11-DEV` (con un usuario del dominio) y desde `UB-DEV`.
5. **Impresión:** cola compartida en `WS-DC` desplegada a los clientes, e impresora PDF de CUPS compartida y usada desde Windows.
6. **Aplicaciones:** Tomcat en `UB-SRV` con una aplicación desplegada, accesible solo desde la LAN, con un usuario de `sudoers` limitado a reiniciar el servicio. IIS con una página de bienvenida de la empresa cliente.
7. **Seguridad básica** (RA6.f): Defender y ClamAV (con la prueba EICAR), Lynis (índice de bastionado antes y después de aplicar 3 sugerencias), fail2ban protegiendo SSH. Evaluación comparada.
8. **Administración remota** (RA6.d): RSAT desde `W11-DEV`, SSH a `UB-SRV` y RDP a `WS-DC` con un usuario de `GG_Admin`.
9. **Actualizar el mapa lógico** de P6/P7 con los servidores y servicios.

**Conexión con el mundo real:** equivale a la puesta en marcha del directorio y de los servicios compartidos de una pequeña empresa: cuentas centralizadas, carpetas por departamento, impresoras, un servidor donde desplegar la aplicación interna y una protección básica documentada.

Verificación en el puesto: el docente inicia sesión en `W11-DEV` con un usuario de QA y otro de Desarrollo, comprueba las unidades, las GPO (`gpresult`) y el acceso a `Proyectos`, y prueba el despliegue en Tomcat.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA6.a | Recursos locales y de red accesibles desde Windows y Linux, con unidades asignadas por GPO y ABE; acceso efectivo explicado. | Recursos compartidos accesibles desde ambos clientes. | Recursos inaccesibles o con permisos excesivos. |
| RA6.b | Derechos de usuario, directivas de seguridad y auditoría configurados y comprobados; `sudoers` mínimo. | Directivas de contraseñas y algún derecho de usuario configurados. | Sin directivas o sin comprobación. |
| RA6.c | Ficheros, impresión y aplicaciones en ambos SO, funcionando y documentados (configuración, registros, puertos). | Los tres tipos de servidor funcionando, aunque alguno en un solo SO. | Falta algún tipo de servidor. |
| RA6.d | Administra todos los servidores en remoto con la herramienta adecuada y acceso restringido. | Administra en remoto al menos dos servidores. | Solo administración local. |
| RA6.e | Análisis de riesgos coherente con medidas concretas, implantadas y trazables. | Análisis de riesgos con medidas generales. | Sin análisis o genérico. |
| RA6.f | Instala, prueba con métodos seguros y compara las utilidades; aplica las mejoras sugeridas y mide su efecto. | Instala y usa las utilidades con sus resultados. | No instala o no evalúa. |
| RA6.g | Dominio con OU, AGDLP, alta masiva, equipo unido y GPO aplicadas y verificadas con `gpresult`. | Dominio funcional con usuarios, grupos, equipo unido y una GPO. | No hay dominio o el cliente no se une. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Windows Server: [AD DS: instalación de un bosque](https://learn.microsoft.com/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-) · [Módulo ActiveDirectory](https://learn.microsoft.com/powershell/module/activedirectory/) · [GroupPolicy](https://learn.microsoft.com/powershell/module/grouppolicy/) · [SmbShare](https://learn.microsoft.com/powershell/module/smbshare/).
  - Linux: [Samba wiki](https://wiki.samba.org/) · [CUPS](https://www.cups.org/documentation.html) · [Apache Tomcat 10.1](https://tomcat.apache.org/tomcat-10.1-doc/) · [Lynis](https://cisofy.com/lynis/) · [ClamAV](https://docs.clamav.net/).
  - Seguridad y protección de datos: [INCIBE: empresas](https://www.incibe.es/empresas).
- **Decisión relacionada:** [DEC-SI-03](../../decisiones/DEC-SI-03-windows-y-dominio.md).
- **Herramientas:** RSAT, `gpmc.msc`, `printmanagement.msc`, `smbclient`, Lynis, ClamAV, fail2ban, KeePassXC.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
