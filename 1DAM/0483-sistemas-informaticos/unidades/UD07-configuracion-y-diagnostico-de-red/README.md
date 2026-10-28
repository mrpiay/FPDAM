# UD07 · Configuración, diagnóstico y seguridad de red en los sistemas operativos

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 12 h · 14 sesiones de 50 min (≈ 2,3 semanas a 6 sesiones; propuesta del docente) | RA5 (a, f, g, h; ~65 %) · RA6 (d; ~25 %) · RA7 (e; ~10 %) · refuerza RA6.f |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA5.a | Se ha configurado el protocolo TCP/IP. | [RD 405/2023, anexo I, 0483, RA5.a][boe] | P7 (configuración estática y dinámica, en doble pila, en ambos SO) · PE3 |
| RA5.f | Se han gestionado puertos de comunicaciones. | [RD 405/2023, anexo I, 0483, RA5.f][boe] | P7 (inventario de puertos y reglas de cortafuegos) · PE3 |
| RA5.g | Se ha verificado el funcionamiento de la red mediante el uso de comandos y herramientas básicas. | [RD 405/2023, anexo I, 0483, RA5.g][boe] | P7 (resolución de averías provocadas) · PE3 (diagnóstico en MV) |
| RA5.h | Se han aplicado protocolos seguros de comunicaciones. | [RD 405/2023, anexo I, 0483, RA5.h][boe] | P7 (SSH con claves, comparativa capturada en Wireshark) |
| RA6.d | Se ha accedido a los servidores utilizando técnicas de conexión remota. | [RD 405/2023, anexo I, 0483, RA6.d][boe] | P7 (SSH y RDP entre MV) · PE3 |
| RA7.e | Se han utilizado los servicios de transferencia de ficheros. | [RD 405/2023, anexo I, 0483, RA7.e][boe] | P7 (`scp`, `sftp`, `rsync` sobre SSH) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Configurar adaptadores de red con IPv4 e IPv6, de forma estática y dinámica, por GUI y por CLI, en Ubuntu (netplan, `nmcli`) y Windows (PowerShell).
2. Identificar los ficheros de configuración de red de cada SO.
3. Explicar TCP y UDP, los rangos de puertos y los puertos de los servicios habituales; ver los puertos en escucha y abrirlos o cerrarlos en el cortafuegos.
4. Diagnosticar averías de conectividad con un método de capas y con las herramientas de cada SO.
5. Sustituir protocolos inseguros por sus equivalentes seguros y justificarlo con capturas.
6. Administrar equipos de forma remota con SSH (claves, configuración segura, túneles) y RDP.
7. Transferir ficheros de forma segura entre equipos.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloques «Conexión de sistemas en red»; «Gestión de recursos en una red» (técnicas de conexión remota, cortafuegos) ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Plan de direccionamiento del laboratorio

Red interna de VirtualBox `labdam`: segundo adaptador de cada MV. El primer adaptador queda en NAT para salir a Internet.

| MV | IPv4 | IPv6 (ULA) | Papel |
|---|---|---|---|
| `UB-SRV` | 192.168.50.10/24 | fd00:50::10/64 | Servidor Linux |
| `WS-DC` | 192.168.50.20/24 | fd00:50::20/64 | Controlador de dominio y DNS (UD08) |
| `UB-DEV` | 192.168.50.21/24 | fd00:50::21/64 | Puesto Linux |
| `W11-DEV` | 192.168.50.30/24 | fd00:50::30/64 | Puesto Windows |

### 2. Configuración de los adaptadores (RA5.a)

**Ubuntu Server: netplan** (YAML en `/etc/netplan/`; el sangrado importa).

```yaml
# /etc/netplan/60-labdam.yaml   (sudo chmod 600)
network:
  version: 2
  ethernets:
    enp0s3:            # NAT de VirtualBox → DHCP
      dhcp4: true
    enp0s8:            # red interna labdam → estática, doble pila
      dhcp4: false
      addresses:
        - 192.168.50.10/24
        - fd00:50::10/64
      nameservers:
        addresses: [192.168.50.20]
        search: [dam.test]
```

```bash
ip -br link                       # nombres de las interfaces (enp0s3, enp0s8…)
sudo netplan try                  # aplica y revierte en 120 s si no se confirma (evita perder el acceso)
sudo netplan apply
ip -br addr ; ip route ; ip -6 route
resolvectl status                 # DNS por interfaz (systemd-resolved; /etc/resolv.conf apunta a 127.0.0.53)
# Cambios temporales (se pierden al reiniciar):
sudo ip addr add 192.168.50.99/24 dev enp0s8 ; sudo ip link set enp0s8 up
```

**Ubuntu Desktop: NetworkManager.** Se configura desde Configuración → Red, o con `nmcli`:

```bash
nmcli device status
nmcli connection modify "Conexión cableada 2" ipv4.method manual ipv4.addresses 192.168.50.21/24 \
  ipv4.dns 192.168.50.20 ipv6.method manual ipv6.addresses fd00:50::21/64
nmcli connection up "Conexión cableada 2"
```

**Windows:** Configuración → Red e Internet → Ethernet → Asignación de IP. También con PowerShell:

```powershell
Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, MacAddress
New-NetIPAddress -InterfaceAlias "Ethernet 2" -IPAddress 192.168.50.30 -PrefixLength 24
New-NetIPAddress -InterfaceAlias "Ethernet 2" -AddressFamily IPv6 -IPAddress fd00:50::30 -PrefixLength 64
Set-DnsClientServerAddress -InterfaceAlias "Ethernet 2" -ServerAddresses 192.168.50.20
Get-NetIPConfiguration -InterfaceAlias "Ethernet 2"
# Volver a DHCP:
Remove-NetIPAddress -InterfaceAlias "Ethernet 2" -AddressFamily IPv4 -Confirm:$false
Set-NetIPInterface -InterfaceAlias "Ethernet 2" -Dhcp Enabled
Set-DnsClientServerAddress -InterfaceAlias "Ethernet 2" -ResetServerAddresses
ipconfig /all ; ipconfig /release ; ipconfig /renew ; ipconfig /flushdns
```

En una MV conectada a dos redes, la **puerta de enlace** se pone solo en el adaptador que sale a Internet. En la red interna no hace falta.

**Ficheros de configuración de red:**

| Fichero | Linux | Windows |
|---|---|---|
| Interfaces | `/etc/netplan/*.yaml` (Ubuntu), `/etc/NetworkManager/system-connections/` | Registro (`HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces`) |
| Nombre del equipo | `/etc/hostname` | `Rename-Computer` |
| Resolución local | `/etc/hosts` | `C:\Windows\System32\drivers\etc\hosts` |
| DNS | `/etc/resolv.conf` (gestionado por systemd-resolved) | Por adaptador |
| Servicios y puertos | `/etc/services` | `C:\Windows\System32\drivers\etc\services` |

### 3. Protocolos TCP/IP y gestión de puertos (RA5.f)

- **TCP:** orientado a conexión. Establece la conexión en tres pasos (SYN, SYN-ACK, ACK), garantiza el orden y reenvía lo perdido. Lo usan HTTP, SSH, SMB y las bases de datos.
- **UDP:** sin conexión, con menos sobrecarga. Lo usan DNS, DHCP, la voz y el vídeo, y WireGuard.
- **Rangos de puertos:** 0-1023 son puertos *bien conocidos* (abrirlos para escuchar requiere privilegios en Linux), 1024-49151 son *registrados* y 49152-65535 son *dinámicos*, usados como puerto de origen en el cliente.

| Puerto | Servicio | Puerto | Servicio |
|---|---|---|---|
| 20/21 TCP | FTP (inseguro) | 389 / 636 TCP | LDAP / LDAPS |
| **22 TCP** | **SSH, SFTP, SCP** | 443 TCP (y UDP para HTTP/3) | **HTTPS** |
| 23 TCP | Telnet (inseguro) | 445 TCP | SMB |
| 25 / 465 / 587 TCP | SMTP / SMTPS / envío con autenticación | 631 TCP | IPP (CUPS) |
| **53 UDP/TCP** | DNS | 993 / 995 TCP | IMAPS / POP3S |
| 67/68 UDP | DHCP | 3306 / 5432 TCP | MySQL-MariaDB / PostgreSQL |
| 80 TCP | HTTP | **3389 TCP/UDP** | **RDP** |
| 88 TCP/UDP | Kerberos (AD) | 8080 TCP | Tomcat y servidores de desarrollo |

```bash
sudo ss -tulpn                         # puertos TCP/UDP en escucha, con el proceso propietario
sudo lsof -i :22
nc -zv 192.168.50.10 22                # ¿responde ese puerto?
sudo nmap -sT -p 1-1024 192.168.50.30  # solo en el laboratorio propio
```

```powershell
Get-NetTCPConnection -State Listen | Sort-Object LocalPort | Select-Object LocalAddress, LocalPort, OwningProcess, @{n='Proceso'; e={(Get-Process -Id $_.OwningProcess).ProcessName}}
Get-NetUDPEndpoint | Select-Object LocalAddress, LocalPort, OwningProcess
netstat -ano | findstr LISTENING
Test-NetConnection 192.168.50.10 -Port 22
```

**Aviso legal y ético:** escanear puertos de equipos o redes sin autorización puede ser ilícito y está prohibido por las normas del centro. Solo se escanea el laboratorio propio.

**Abrir y cerrar puertos en el cortafuegos.** La política es denegar por defecto y abrir solo lo necesario, y si se puede solo para el origen necesario.

```bash
sudo ufw default deny incoming ; sudo ufw default allow outgoing
sudo ufw allow from 192.168.50.0/24 to any port 22 proto tcp     # SSH solo desde la LAN
sudo ufw allow 8080/tcp
sudo ufw enable
sudo ufw status numbered ; sudo ufw delete 2
```

```powershell
Get-NetFirewallProfile | Format-Table Name, Enabled, DefaultInboundAction
New-NetFirewallRule -DisplayName "Tomcat 8080 LAN" -Direction Inbound -Protocol TCP -LocalPort 8080 -RemoteAddress 192.168.50.0/24 -Action Allow -Profile Private,Domain
New-NetFirewallRule -DisplayName "Ping IPv4 LAN" -Direction Inbound -Protocol ICMPv4 -IcmpType 8 -RemoteAddress 192.168.50.0/24 -Action Allow
Get-NetFirewallRule -DisplayName "Tomcat*" | Get-NetFirewallPortFilter
Remove-NetFirewallRule -DisplayName "Tomcat 8080 LAN"
```

**Perfiles de red de Windows** (Pública, Privada, Dominio): cambian las reglas que se aplican. Una red interna nueva suele clasificarse como *Pública*, que es la más restrictiva. Se cambia con `Set-NetConnectionProfile -InterfaceAlias "Ethernet 2" -NetworkCategory Private`.

### 4. Diagnóstico de la conectividad (RA5.g)

**Método de capas:** se va de abajo arriba y no se pasa a la siguiente capa hasta que la anterior funciona:

1. Enlace.
2. Dirección IP.
3. Puerta de enlace.
4. Red remota.
5. DNS.
6. Puerto o servicio.

| Paso | Linux | Windows |
|---|---|---|
| 1. ¿Hay enlace? | `ip -br link`, `ethtool enp0s8`, cable conectado en VirtualBox | `Get-NetAdapter` |
| 2. ¿IP y máscara correctas? ¿APIPA? | `ip -br addr` | `ipconfig /all` · `Get-NetIPAddress` |
| 3. ¿Llego a la puerta de enlace o al vecino? | `ping -c 3 192.168.50.10` · `ip neigh` | `ping` · `Test-Connection` · `Get-NetNeighbor` / `arp -a` |
| 4. ¿Ruta hacia fuera? | `ip route` · `tracepath` / `traceroute` · `mtr` | `route print` · `Get-NetRoute` · `tracert` · `pathping` · `Test-NetConnection -TraceRoute` |
| 5. ¿Resuelve el DNS? | `resolvectl query ub-srv.dam.test` · `dig` · `nslookup` | `Resolve-DnsName` · `nslookup` |
| 6. ¿El servicio escucha y el cortafuegos lo deja pasar? | `ss -tulpn` · `nc -zv` · `curl -I http://host:8080` · `sudo ufw status` | `Test-NetConnection -Port` · `Get-NetTCPConnection` · reglas del cortafuegos |
| Capturar tráfico | `sudo tcpdump -i enp0s8 icmp` · Wireshark | Wireshark · `pktmon` |
| IPv6 | `ping -6 fd00:50::10` · `ip -6 addr` | `ping -6` · `Get-NetIPAddress -AddressFamily IPv6` |

**Monitorización de la red:**

- **Linux:** `iftop` o `nload` para el tráfico en tiempo real; `vnstat` para el histórico.
- **Windows:** Monitor de recursos → Red.
- **Ambos:** las estadísticas de Wireshark (*Statistics → Conversations / Protocol Hierarchy*).

### 5. Protocolos seguros de comunicaciones (RA5.h)

| Inseguro (texto en claro) | Seguro | Cómo protege |
|---|---|---|
| Telnet, rlogin | **SSH** | Cifrado; autenticación del servidor (*fingerprint*) y de la persona usuaria (claves) |
| FTP | **SFTP** (sobre SSH) o **FTPS** (FTP + TLS) | Cifrado del canal y de las credenciales |
| HTTP | **HTTPS** (TLS 1.2/1.3) | Certificado X.509 firmado por una CA (p. ej., Let's Encrypt) |
| SMTP, POP3, IMAP sin TLS | SMTPS/STARTTLS (465/587), IMAPS (993), POP3S (995) | TLS |
| SMB 1 | SMB 3 con cifrado | Se desactiva SMB 1 |
| RDP sin NLA | RDP con **NLA** y TLS, a través de VPN | Autenticación previa; no se expone el 3389 a Internet |
| Wi-Fi WEP/WPA-TKIP | WPA3 / WPA2-AES | UD06 |
| Acceso remoto expuesto | **VPN** (WireGuard, IPsec, OpenVPN) | Túnel cifrado hasta la red interna |
| DNS en claro | DNS sobre TLS/HTTPS | Privacidad de las consultas |

**Demostración en el aula:**

1. Arrancar un servidor HTTP de prueba (`python3 -m http.server 8000`) y un FTP de laboratorio.
2. Capturar con Wireshark: se ven el contenido y la contraseña.
3. Repetir con SSH/SFTP: solo se ve tráfico cifrado.

### 6. Conexión remota (RA6.d)

**SSH con claves.** Así acceden los equipos de desarrollo a servidores y repositorios.

```bash
# Servidor Ubuntu
sudo apt install -y openssh-server && systemctl status ssh
# Cliente (Linux, macOS o Windows 10/11, que trae el cliente OpenSSH)
ssh-keygen -t ed25519 -C "ana@labdam"          # frase de paso; claves en ~/.ssh/id_ed25519(.pub)
ssh-copy-id ana@192.168.50.10                    # copia la clave pública a ~/.ssh/authorized_keys
ssh ana@192.168.50.10                            # la primera vez se comprueba la huella (known_hosts)
```

```powershell
# Desde Windows (no trae ssh-copy-id):
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh ana@192.168.50.10 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

```text
# ~/.ssh/config — alias para no repetir parámetros
Host srv
    HostName 192.168.50.10
    User ana
    IdentityFile ~/.ssh/id_ed25519
```

**Configuración segura del servidor.** Se usa un fichero propio en `sshd_config.d`, sin tocar el original:

```text
# /etc/ssh/sshd_config.d/10-labdam.conf
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
AllowGroups desarrollo admin
```

```bash
sudo sshd -t && sudo systemctl restart ssh        # validar la sintaxis antes; probar desde OTRA terminal antes de cerrar la sesión
ssh -L 8080:localhost:8080 srv                    # túnel: ver en el navegador local la app que corre en el servidor
ssh -T git@github.com                             # la misma clave pública, añadida a GitHub o GitLab, sirve para Git
```

**Servidor OpenSSH en Windows** (Windows 11 o Server):

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd ; Set-Service sshd -StartupType Automatic
Get-NetFirewallRule -Name *OpenSSH*            # la regla de entrada se crea al instalar
```

Para cuentas administradoras, Windows lee las claves de `C:\ProgramData\ssh\administrators_authorized_keys`.

**Escritorio remoto (RDP):**

- **Host:** requiere Windows 11 **Pro** o Server; se activa en Configuración → Sistema → Escritorio remoto.
- **Cuentas que pueden conectarse:** las del grupo *Usuarios de escritorio remoto* (SID `S-1-5-32-555`) y las administradoras.
- **Cliente Windows:** `mstsc /v:192.168.50.30`.
- **Cliente Linux:** Remmina.
- **Ubuntu 24.04 como host:** Configuración → Sistema → Escritorio remoto, también por RDP.

```powershell
Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name fDenyTSConnections -Value 0
Enable-NetFirewallRule -DisplayGroup "Escritorio remoto"     # "Remote Desktop" en un Windows en inglés
Add-LocalGroupMember -SID "S-1-5-32-555" -Member "ana"
```

### 7. Transferencia segura de ficheros (RA7.e)

```bash
scp informe.pdf srv:/srv/proyectos/docs/               # usa el alias de ~/.ssh/config
scp -r srv:/var/log/apache2 ./logs-servidor/
sftp srv            # sesión interactiva: ls, cd, get, put, mkdir, bye
rsync -avz -e ssh ./proyecto/ srv:/srv/proyectos/proyecto/   # sincroniza solo lo que cambia
```

- **En Windows:** los mismos `scp` y `sftp` en PowerShell, o clientes gráficos como **WinSCP** y **FileZilla** (protocolo SFTP, puerto 22).
- **FTP y FTPS** se tratan en UD09.

### 8. Equivalencias en otras tecnologías

| Tarea | Ubuntu Server | Fedora/Rocky | Debian (sin netplan) | Windows |
|---|---|---|---|---|
| IP estática | netplan | `nmcli` | `/etc/network/interfaces` | `New-NetIPAddress` · `netsh interface ip set address` |
| Cortafuegos | `ufw` | `firewall-cmd --add-service=ssh --permanent` | `ufw` / `nftables` | `New-NetFirewallRule` · `netsh advfirewall` |
| Puertos en escucha | `ss -tulpn` | `ss -tulpn` | `ss -tulpn` | `Get-NetTCPConnection` |

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. De DHCP a estática y vuelta.** En las cuatro MV, por GUI y por CLI, documentando qué fichero o clave cambia en cada caso. `netplan try` con un error a propósito para ver la reversión automática.
- **A2. Averías.** El docente distribuye MV con fallos ocultos (máscara errónea, DNS inexistente, interfaz caída, regla de cortafuegos, servicio parado). Hay que aplicar el método de capas y anotar la evidencia de cada paso.
- **A3. ¿Quién escucha?** Inventario de puertos en escucha de cada MV, relacionándolos con su servicio y decidiendo cuáles cerrar.
- **A4. Wireshark: claro frente a cifrado.** Capturar un inicio de sesión por HTTP o FTP y otro por SSH o HTTPS en la red interna y comparar lo que se ve.
- **A5. Git por SSH.** Crear una clave, añadirla a la cuenta de GitHub o GitLab, clonar el repositorio del curso por SSH y hacer un *push*.

### Práctica evaluable

**P7 · Conectar y asegurar el laboratorio de la empresa cliente.**

1. **Direccionamiento** del apartado 1 aplicado por CLI en `UB-SRV` (netplan), `UB-DEV` (`nmcli`) y `W11-DEV` (PowerShell), con IPv4 e IPv6, y verificación cruzada con `ping` y `ping -6`. Entrada en `hosts` para `srv`.
2. **Diagnóstico:** resolver 3 averías que introduce el docente en el puesto, documentando el método, las evidencias y la solución.
3. **Puertos y cortafuegos:**
   - Inventario de puertos en escucha antes y después.
   - `ufw` con denegación por defecto, SSH solo desde la LAN y 8080 abierto.
   - Reglas del Firewall de Windows para RDP y ping solo desde la LAN.
   - Prueba con `nc` y `Test-NetConnection` de que lo cerrado está cerrado.
4. **SSH:**
   - Claves ed25519 desde `UB-DEV` y desde `W11-DEV` hacia `UB-SRV`.
   - Alias en `~/.ssh/config`.
   - Acceso por contraseña y de root desactivados (probado).
   - Un túnel `-L` hacia un servicio del servidor.
   - Repositorio del curso clonado y actualizado por SSH.
5. **RDP** de `UB-DEV` (Remmina) a `W11-DEV` con NLA y solo para un grupo.
6. **Transferencia:** `scp`, `sftp` y `rsync -e ssh` para llevar la copia de P5 a otro equipo (la "copia fuera de la sede" de la regla 3-2-1).
7. **Informe de protocolos seguros:** capturas de Wireshark comparando un protocolo en claro con su equivalente cifrado.

**Conexión con el mundo real:** equivale a la puesta en marcha y el bastionado básico de la red y del acceso remoto a los servidores, y al modo en que un equipo de desarrollo se conecta de forma segura para desplegar y versionar código.

Verificación en el puesto: el docente intenta entrar por SSH con contraseña (debe fallar) y comprueba un puerto que debería estar cerrado.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA5.a | Doble pila estática y dinámica en los tres SO por CLI; explica cada fichero o parámetro. | Configuración IPv4 e IPv6 correcta en los tres SO. | Configuración incompleta o sin IPv6. |
| RA5.f | Inventario de puertos, cierre de lo innecesario y reglas restringidas por origen, con pruebas. | Abre y cierra puertos correctamente en ambos SO. | Cortafuegos desactivado o reglas sin comprobar. |
| RA5.g | Resuelve las 3 averías con método de capas y evidencias en cada paso. | Resuelve al menos 2 averías con evidencias. | Resuelve menos de 2 o sin método. |
| RA5.h | Sustituye los protocolos inseguros, configura SSH seguro y demuestra la diferencia con capturas. | SSH con claves y comparativa básica. | Sigue usando contraseñas o protocolos en claro. |
| RA6.d | SSH (con túnel y Git) y RDP restringido funcionando en ambos sentidos. | SSH y RDP funcionando. | Conexión remota no funcional. |
| RA7.e | `scp`, `sftp` y `rsync` sobre SSH usados para un caso real (copia externa). | Transfiere ficheros con `scp` o `sftp`. | Sin transferencia o por un canal inseguro. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Ubuntu: [Netplan](https://netplan.readthedocs.io/) · [Ubuntu Server: OpenSSH](https://documentation.ubuntu.com/server/) · `man ufw`, `man ss`, `man ssh_config`.
  - Windows: [NetTCPIP](https://learn.microsoft.com/powershell/module/nettcpip/) · [NetSecurity (cortafuegos)](https://learn.microsoft.com/powershell/module/netsecurity/) · [OpenSSH en Windows](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse).
  - Herramientas: [Wireshark](https://www.wireshark.org/docs/).
- **Decisión relacionada:** [DEC-SI-08](../../decisiones/DEC-SI-08-contenidos-adicionales.md) (SSH con claves).
- **Herramientas:** Wireshark, `nmap` (solo en el laboratorio), Remmina, WinSCP o FileZilla, `mtr`.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
