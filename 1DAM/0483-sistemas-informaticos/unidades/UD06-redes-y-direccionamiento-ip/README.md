# UD06 · Redes de ordenadores y direccionamiento IP

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 19 h · 23 sesiones de 50 min (≈ 3,8 semanas a 6 sesiones; propuesta del docente) | RA1 (e, f, g; ~30 %) · RA5 (a, b, c, d, e; ~70 %) · refuerza RA5.g |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA1.e | Se han identificado los tipos de redes y sistemas de comunicación. | [RD 405/2023, anexo I, 0483, RA1.e][boe] | P6 (justificación del tipo de red y del acceso) · PE2 |
| RA1.f | Se han identificado los componentes de una red informática. | [RD 405/2023, anexo I, 0483, RA1.f][boe] | P6 (inventario de componentes) · PE2 |
| RA1.g | Se han interpretado mapas físicos y lógicos de una red informática. | [RD 405/2023, anexo I, 0483, RA1.g][boe] | P6 (mapas físico y lógico) · PE2 (interpretación de un mapa dado) |
| RA5.a | Se ha configurado el protocolo TCP/IP. | [RD 405/2023, anexo I, 0483, RA5.a][boe] | P6 (plan de direccionamiento IPv4/VLSM e IPv6) · PE2 (ejercicios de subnetting) |
| RA5.b | Se han configurado redes de área local cableadas. | [RD 405/2023, anexo I, 0483, RA5.b][boe] | P6 (LAN cableada con VLAN en Packet Tracer) |
| RA5.c | Se han configurado redes de área local inalámbricas. | [RD 405/2023, anexo I, 0483, RA5.c][boe] | P6 (red inalámbrica segura) |
| RA5.d | Se han utilizado dispositivos de interconexión de redes. | [RD 405/2023, anexo I, 0483, RA5.d][boe] | P6 (*switch*, *router*, AP; justificación de cada dispositivo) · PE2 |
| RA5.e | Se ha configurado el acceso a redes de área extensa. | [RD 405/2023, anexo I, 0483, RA5.e][boe] | P6 (enlace WAN, NAT y ruta por defecto) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Clasificar las redes por extensión, topología, medio y relación funcional, y valorar sus ventajas e inconvenientes.
2. Explicar los modelos OSI y TCP/IP y situar en ellos protocolos y dispositivos.
3. Identificar los componentes de una red: cableado, conectores, NIC, *switch*, *router*, AP y cortafuegos.
4. Calcular redes, *broadcast* y rangos con máscaras CIDR; dividir en subredes con máscara fija y con VLSM.
5. Escribir, abreviar y clasificar direcciones IPv6 y explicar SLAAC y DHCPv6.
6. Configurar en Packet Tracer una LAN cableada con VLAN, una red inalámbrica segura, DHCP, enrutamiento y acceso WAN con NAT.
7. Dibujar e interpretar mapas físicos y lógicos de una red.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloques «Explotación de sistemas microinformáticos» (redes, tipos, componentes, topologías, cableado, mapas); «Conexión de sistemas en red» ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Redes: características, tipos y sistemas de comunicación (RA1.e)

- **Ventajas de una red:** compartir recursos (ficheros, impresoras, Internet), centralizar la administración y las copias, comunicarse y colaborar.
- **Inconvenientes:** riesgos de seguridad, dependencia de la infraestructura, coste y mantenimiento.

| Criterio | Tipos |
|---|---|
| Extensión | **PAN** (Bluetooth, USB), **LAN** (oficina), **CAN** (campus), **MAN** (ciudad), **WAN** (Internet, redes de operador) |
| Medio | Guiado (cobre, fibra) · no guiado (radio: Wi-Fi, 4G/5G, satélite) |
| Relación funcional | **Cliente-servidor** · **entre iguales (P2P)** |
| Titularidad | Privada · pública (operadores) · VPN (privada sobre pública) |
| Transmisión | Símplex, semidúplex, dúplex completo; conmutación de circuitos (telefonía clásica) frente a conmutación de paquetes (IP) |

**Modelos de referencia:**

| OSI | TCP/IP | Unidad (PDU) | Ejemplos de protocolos | Dispositivo |
|---|---|---|---|---|
| 7 Aplicación · 6 Presentación · 5 Sesión | Aplicación | Datos | HTTP(S), DNS, DHCP, SSH, SMB, SMTP, IMAP | Servidores, cortafuegos de aplicación |
| 4 Transporte | Transporte | Segmento (TCP) / datagrama (UDP) | TCP, UDP | — |
| 3 Red | Internet | Paquete | IPv4, IPv6, ICMP, ICMPv6 | *Router*, *switch* de capa 3 |
| 2 Enlace | Acceso a la red | Trama | Ethernet (802.3), Wi-Fi (802.11), ARP | *Switch*, AP, puente |
| 1 Física | Acceso a la red | Bits | Señal eléctrica, óptica o radio | Cable, conectores, repetidor, (*hub*) |

**Encapsulación:** cada capa añade su cabecera al bajar y la retira al subir. En el modo Simulación de Packet Tracer se ve paso a paso.

### 2. Componentes de una red y topologías (RA1.f)

**Componentes:**

- **Tarjeta de red (NIC):** tiene una dirección **MAC** de 48 bits. Los 24 primeros bits son el OUI, que identifica al fabricante.
- **Medios y conectores:** cable de cobre o fibra, RJ45, LC/SC.
- **Dispositivos de interconexión:** apartado 4.
- **Servidores y clientes.**
- **Servicios de red:** DHCP, DNS.

| Topología | Física / lógica | Ventaja | Inconveniente |
|---|---|---|---|
| Bus | Histórica (coaxial) | Barata | Un fallo tumba la red; colisiones |
| **Estrella / estrella extendida** | La LAN actual con *switches* | Aísla fallos; fácil de ampliar | Punto central crítico |
| Anillo | Fibra de operador (lógica en algunos protocolos) | Determinista | Requiere redundancia |
| Malla (total o parcial) | Troncales, Wi-Fi *mesh* | Redundancia | Coste |
| Árbol / jerárquica | Acceso, distribución, núcleo | Escalable | Diseño más complejo |

### 3. Redes cableadas: cableado y conectores (RA5.b)

| Categoría (TIA) | Ancho de banda | Uso típico | Distancia máx. del enlace |
|---|---|---|---|
| Cat 5e | 100 MHz | 1000BASE-T (1 Gbit/s) | 100 m |
| Cat 6 | 250 MHz | 1 Gbit/s; 10GBASE-T hasta ~55 m | 100 m (1 Gbit/s) |
| **Cat 6A** | 500 MHz | **10GBASE-T** | 100 m |
| Cat 8 | 2000 MHz | 25/40GBASE-T en CPD | 30 m |

- **Apantallamiento:**
  - **U/UTP:** sin apantallar.
  - **F/UTP:** con pantalla global.
  - **S/FTP:** con pantalla global y por pares.

  Se elige según las interferencias del entorno.
- **Conector RJ45 (8P8C).** La norma **T568B** es la más habitual en instalaciones nuevas en España; T568A es la alternativa.
  - Cable **directo**: la misma norma en los dos extremos.
  - Cable **cruzado**: una norma distinta en cada extremo. Hoy casi nunca hace falta gracias a **Auto-MDIX**.
- **Fibra óptica:**
  - **Multimodo** (OM3/OM4): distancias cortas, dentro de un edificio o un CPD.
  - **Monomodo** (OS2): kilómetros, como las redes de operador o FTTH.
  - Conectores **LC** (los más comunes en equipos) y **SC**.
  - Módulos **SFP/SFP+**.
- **PoE (802.3af/at/bt):** alimenta los AP, las cámaras y los teléfonos IP por el mismo cable.
- **Cableado estructurado:** toma de usuario → latiguillo → cable horizontal → panel de parcheo (*patch panel*) → *switch* en el *rack*. **Todo se etiqueta**.
- **Seguridad de la LAN cableada:**
  - Desactivar los puertos sin uso.
  - Seguridad de puerto (*port security*) por MAC.
  - Separar con VLAN.
  - 802.1X con autenticación contra un servidor RADIUS.

### 4. Dispositivos de interconexión (RA5.d)

| Dispositivo | Capa | Qué hace | Dominio de colisión / de difusión |
|---|---|---|---|
| *Hub* (obsoleto) | 1 | Repite la señal por todos los puertos | Un único dominio de colisión |
| **Switch** | 2 | Aprende las MAC (tabla CAM) y reenvía solo al puerto destino; **VLAN** para separar redes lógicas | Un dominio de colisión por puerto; un dominio de difusión por VLAN |
| **Router** | 3 | Encamina entre redes IP según su tabla de rutas; NAT; DHCP | Separa dominios de difusión |
| *Switch* de capa 3 | 2-3 | Enruta entre VLAN a velocidad de *switch* | — |
| **Punto de acceso (AP)** | 2 | Puente entre la red inalámbrica y la cableada | — |
| Cortafuegos | 3-7 | Filtra el tráfico según reglas | — |
| Módem / ONT | 1-2 | Adapta la señal del medio del operador (cable, fibra GPON) | — |

El "*router* Wi-Fi doméstico" combina *router*, NAT, *switch*, AP, servidor DHCP y cortafuegos básico en un solo aparato.

### 5. Redes inalámbricas (RA5.c)

| Estándar IEEE | Nombre comercial | Bandas | Notas |
|---|---|---|---|
| 802.11n | Wi-Fi 4 | 2,4 / 5 GHz | MIMO |
| 802.11ac | Wi-Fi 5 | 5 GHz | MU-MIMO (bajada) |
| **802.11ax** | **Wi-Fi 6 / 6E** | 2,4 / 5 / **6 GHz (6E)** | OFDMA; mejor con muchas estaciones |
| 802.11be | Wi-Fi 7 | 2,4 / 5 / 6 GHz | MLO (enlace multibanda), canales de 320 MHz |

- **Banda de 2,4 GHz:** más alcance, pero más interferencias. Solo los **canales 1, 6 y 11** no se solapan.
- **Bandas de 5 y 6 GHz:** más canales y velocidad, menos alcance.
- **Modos:**
  - **Infraestructura**, con AP: el habitual.
  - **Ad hoc**: entre equipos, sin AP.
  - **Malla (*mesh*)**: varios AP que se enlazan entre sí.
- **Seguridad:**

  | Opción | Estado | Uso |
  |---|---|---|
  | **WPA3-Personal (SAE)** | Recomendada | Oficina pequeña |
  | WPA2-Personal (AES/CCMP) | Aceptable, con clave larga | Equipos que no admiten WPA3 |
  | **WPA2/WPA3-Enterprise (802.1X + RADIUS)** | Recomendada | Empresas: cada persona entra con sus credenciales |
  | WEP, WPA-TKIP, WPS | **Inseguras**: se desactivan | — |

  Además, conviene tener una **red de invitados aislada** (otra VLAN u otro SSID con aislamiento de clientes). Ocultar el SSID **no** aporta seguridad.

### 6. Acceso a redes de área extensa (RA5.e)

| Tecnología | Medio | Uso |
|---|---|---|
| **FTTH** (GPON / XGS-PON) | Fibra hasta la vivienda u oficina; ONT del operador | Acceso fijo habitual en España |
| Cable HFC (DOCSIS) | Fibra + coaxial | Zonas con red de cable |
| xDSL (ADSL, VDSL) | Par de cobre telefónico | En retirada |
| **4G/5G** fijo o móvil | Radio | Respaldo, zonas sin fibra, IoT |
| Satélite (GEO / órbita baja) | Radio | Zonas rurales |
| Líneas dedicadas, MPLS, SD-WAN | Operador | Unir sedes de una empresa con calidad garantizada |
| **VPN** (IPsec, WireGuard, OpenVPN) | Sobre Internet | Teletrabajo y unión de sedes (UD07) |

- **IP pública frente a privada.** La red interna usa direcciones privadas, y el *router* aplica **NAT/PAT** para salir a Internet con una única IP pública.
- **CG-NAT.** Algunos operadores aplican NAT también en su propia red. Entonces el cliente no tiene una IP pública propia, lo que impide abrir puertos hacia dentro.
- **IPv6.** Con IPv6 cada equipo puede tener una dirección global y el NAT deja de ser necesario. El cortafuegos sigue siendo imprescindible.

### 7. Direccionamiento IPv4 (RA5.a)

- **Dirección IPv4:** 32 bits en 4 octetos (`192.168.1.10`).
- **Máscara:** indica qué bits son de red. Se escribe en notación decimal (`255.255.255.0`) o **CIDR** (`/24`).
- **Cálculos de una red:**
  - **Dirección de red:** IP AND máscara.
  - **Difusión (*broadcast*):** todos los bits de *host* a 1.
  - **Hosts utilizables:** 2^(bits de host) − 2.
- **Puerta de enlace:** el *router* de la red.
- **DNS:** el servidor de nombres.
- **Configuración estática o dinámica:**
  - **Estática:** para servidores e impresoras.
  - **Dinámica por DHCP:** sigue el proceso **DORA** (*Discover*, *Offer*, *Request*, *Ack*). Si falla, Windows se autoasigna una **APIPA** (169.254.x.x).

| Bloque | Uso |
|---|---|
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | Privadas (RFC 1918) |
| `127.0.0.0/8` | *Loopback* |
| `169.254.0.0/16` | Enlace local (APIPA) |
| `100.64.0.0/10` | CG-NAT de operador (RFC 6598) |
| `0.0.0.0` · `255.255.255.255` | "Esta red" / difusión limitada |
| Clases A/B/C | Concepto histórico (direccionamiento con clases); hoy se usa CIDR |

**Ejemplo de subredes con máscara fija.** Dividir `192.168.10.0/24` en 4 subredes:

- Hacen falta 2 bits prestados, así que la máscara pasa a `/26` = `255.255.255.192`.
- Cada subred tiene 64 direcciones y 62 *hosts* utilizables.

| Subred | Red | Primer *host* | Último *host* | Difusión |
|---|---|---|---|---|
| 1 | 192.168.10.0/26 | .1 | .62 | .63 |
| 2 | 192.168.10.64/26 | .65 | .126 | .127 |
| 3 | 192.168.10.128/26 | .129 | .190 | .191 |
| 4 | 192.168.10.192/26 | .193 | .254 | .255 |

**VLSM para la empresa cliente** con `172.16.50.0/24`. Se ordenan las redes de mayor a menor:

| Red | *Hosts* necesarios (con crecimiento) | Prefijo | Red | Rango útil | Difusión | Puerta de enlace |
|---|---|---|---|---|---|---|
| Invitados (Wi-Fi) | 50 | /26 | 172.16.50.0 | .1-.62 | .63 | .1 |
| Desarrollo | 25 | /27 | 172.16.50.64 | .65-.94 | .95 | .65 |
| QA | 10 | /28 | 172.16.50.96 | .97-.110 | .111 | .97 |
| Servidores | 5 | /29 | 172.16.50.112 | .113-.118 | .119 | .113 |
| Enlace con el *router* del ISP | 2 | /30 | 172.16.50.120 | .121-.122 | .123 | — |

```bash
sudo apt install ipcalc && ipcalc 172.16.50.64/27    # comprobar cálculos (también sipcalc, que admite IPv6)
```

### 8. Direccionamiento IPv6 (RA5.a)

- **Dirección IPv6:** 128 bits escritos como 8 grupos de 4 dígitos hexadecimales.
- **Abreviatura** (RFC 5952): se quitan los ceros a la izquierda de cada grupo y la secuencia más larga de grupos a cero se sustituye por `::`, **una sola vez**. Si hay empate, se abrevia la primera secuencia.
  - Ejemplo: `2001:0db8:0000:0000:0a00:0000:0000:0001` → `2001:db8::a00:0:0:1`.
- **Prefijo:** una LAN usa **/64**. Los 64 bits restantes identifican la interfaz.

| Tipo | Prefijo | Ejemplo / uso |
|---|---|---|
| Global unicast (GUA) | `2000::/3` | Direcciones públicas enrutables; `2001:db8::/32` está reservado para documentación |
| Única local (ULA) | `fc00::/7` (en la práctica `fd00::/8`) | Equivalente a las privadas: `fd00:50::/64` en el laboratorio |
| Enlace local | `fe80::/10` | Toda interfaz IPv6 la tiene; no se enruta |
| Multidifusión | `ff00::/8` | `ff02::1` (todos los nodos), `ff02::2` (todos los *routers*); **no hay *broadcast*** |
| *Loopback* / no especificada | `::1` / `::` | — |

- **Configuración automática:**
  - El *router* envía mensajes de anuncio (**RA**, *Router Advertisement*) con el prefijo.
  - Con **SLAAC**, cada equipo genera su propia dirección a partir del prefijo. El identificador de interfaz puede derivar de la MAC (EUI-64) o ser **aleatorio y temporal** por privacidad, que es lo que hacen Windows y Ubuntu.
  - **DHCPv6** puede ser *stateless* (solo entrega DNS) o *stateful* (asigna direcciones). Lo indican los flags M y O del RA.
- **NDP** (*Neighbor Discovery*) sustituye a ARP.
- **Doble pila (*dual stack*):** IPv4 e IPv6 conviven en el mismo equipo.

### 9. Configuración en Packet Tracer (RA5.b-e)

**Esquema:**

- *Router* `R-LABDAM` (2911) con una única interfaz troncal hacia el *switch* (*router-on-a-stick*), una subinterfaz por VLAN y otra interfaz hacia el *router* del ISP.
- *Switch* 2960 con VLAN 10 (Desarrollo), 20 (QA), 30 (Servidores) y 40 (Invitados).
- AP conectado a un puerto de acceso de la VLAN 40.

```text
! Switch
enable
configure terminal
hostname SW-LABDAM
vlan 10
 name DESARROLLO
vlan 20
 name QA
vlan 30
 name SERVIDORES
vlan 40
 name INVITADOS
interface range fa0/1 - 10
 switchport mode access
 switchport access vlan 10
interface fa0/24
 switchport mode access
 switchport access vlan 40          ! AP de invitados
interface g0/1
 switchport mode trunk              ! hacia el router
end
show vlan brief
```

```text
! Router
enable
configure terminal
hostname R-LABDAM
ipv6 unicast-routing                     ! activa el enrutamiento y los RA (SLAAC) en IPv6
interface g0/0
 no shutdown
interface g0/0.10
 encapsulation dot1Q 10
 ip address 172.16.50.65 255.255.255.224
 ipv6 address 2001:db8:50:10::1/64
 ip nat inside
interface g0/0.40
 encapsulation dot1Q 40
 ip address 172.16.50.1 255.255.255.192
 ipv6 address 2001:db8:50:40::1/64
 ip nat inside
! (subinterfaces .20 y .30 análogas)
interface g0/1
 ip address 172.16.50.121 255.255.255.252
 ipv6 address 2001:db8:50:ff::1/64
 ip nat outside
 no shutdown
ip dhcp excluded-address 172.16.50.65 172.16.50.69
ip dhcp pool DESARROLLO
 network 172.16.50.64 255.255.255.224
 default-router 172.16.50.65
 dns-server 172.16.50.114
ip route 0.0.0.0 0.0.0.0 172.16.50.122                 ! ruta por defecto hacia el ISP
ipv6 route ::/0 2001:db8:50:ff::2
access-list 1 permit 172.16.50.0 0.0.0.127
ip nat inside source list 1 interface g0/1 overload    ! PAT
end
copy running-config startup-config
show ip interface brief
show ipv6 interface brief
show ip route
show ip dhcp binding
```

**Red inalámbrica en Packet Tracer:** en la pestaña *Config* del AP se configuran el SSID `Empresa-Invitados`, la autenticación WPA2-PSK (o WPA3, si la versión de Packet Tracer lo ofrece) y una clave de 16 caracteres o más. A los portátiles se les pone el módulo inalámbrico y se conectan desde *Desktop → PC Wireless*.

### 10. Mapas físicos y lógicos (RA1.g)

| Mapa físico | Mapa lógico |
|---|---|
| **Dónde** está cada elemento: planta, *rack*, rosetas, recorrido y categoría del cableado, etiquetas, ubicación de los AP | **Cómo** se comunican: subredes, VLAN, direcciones IP, puertas de enlace, rutas, servicios (DHCP, DNS), zonas de seguridad |
| Sirve para instalar y mantener | Sirve para configurar, diagnosticar y asegurar |

Herramientas: vistas *Physical* y *Logical* de Packet Tracer, [diagrams.net](https://www.diagrams.net/) (draw.io) con la biblioteca de símbolos de red. Símbolos y convenciones: *router* (círculo con flechas), *switch* (rectángulo con flechas), nube para Internet o WAN, rotulación de interfaces y direcciones.

**Interpretar un mapa:** dado un mapa, responder qué equipos están en el mismo dominio de difusión, qué ruta sigue un paquete de QA a un servidor, qué ocurre si cae un *switch* y qué falta para dar redundancia.

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. De la capa al dispositivo.** Clasificar 20 tarjetas (protocolos, dispositivos, PDU) en capas OSI y TCP/IP. En el modo Simulación de Packet Tracer, seguir un `ping` y una petición web y señalar las cabeceras.
- **A2. Taller de cableado** (si hay material): crimpar un latiguillo T568B, comprobarlo con un comprobador e identificar Cat 5e, 6 y 6A y fibra LC/SC entre muestras reales. Normas de PRL con las herramientas.
- **A3. Subnetting rápido.** Diez ejercicios cronometrados de red, difusión, rango y número de *hosts*, y dos de VLSM. Autocorrección con `ipcalc`.
- **A4. IPv6 a mano.** Abreviar y expandir direcciones, clasificarlas por tipo y ver con `ip -6 addr` e `ipconfig` las direcciones de enlace local y temporales de las MV.
- **A5. Interpretar un mapa.** Por parejas, analizar el mapa físico y lógico de una red ficticia, detectar 5 errores (máscara incoherente, puerta de enlace fuera de la red, VLAN mal asignada…) y corregirlos.
- **A6. Elegir el acceso WAN.** Comparar tres ofertas de acceso para la empresa cliente (fibra, 5G y respaldo) por velocidad, latencia, IP fija y precio, con las fichas de los operadores.

### Práctica evaluable

**P6 · Diseño de la red de la empresa cliente.** Se trabaja en Packet Tracer y se documenta en el repositorio.

1. **Análisis:** tipo de red, topología, cableado y acceso WAN elegidos, con justificación (RA1.e).
2. **Inventario de componentes** con el modelo y la función de cada uno: NIC, cableado por categoría, *switch*, *router*, AP, ONT, *patch panel* (RA1.f).
3. **Plan de direccionamiento:**
   - IPv4 con VLSM sobre `172.16.50.0/24` para las cuatro redes, el enlace y un 30 % de crecimiento.
   - IPv6 con un /64 por VLAN sobre `2001:db8:50::/48`.
   - Direcciones fijas para servidores e impresoras.
4. **Red en Packet Tracer (`.pkt`):**
   - VLAN y troncal.
   - *Router-on-a-stick* con doble pila.
   - DHCP IPv4 y SLAAC IPv6.
   - AP para invitados con WPA2/WPA3 y clave robusta.
   - Enlace con el *router* del ISP, NAT/PAT y ruta por defecto.
   - Al menos 2 equipos por VLAN, un servidor y un portátil inalámbrico.
5. **Verificación:** `ping` y `tracert` entre VLAN y hacia el "ISP" en IPv4 e IPv6, `show` de interfaces, rutas, DHCP y tabla MAC, con una explicación de cada salida.
6. **Mapas físico** (planta de la oficina, *rack*, rosetas etiquetadas) **y lógico** (VLAN, subredes, IP, servicios), hechos con diagrams.net o Packet Tracer.

**Conexión con el mundo real:** equivale al diseño de red y al plan de direccionamiento que un integrador entrega a su cliente antes de cablear una oficina y poner en marcha sus equipos de red.

Verificación en el puesto: el docente desconecta un enlace o cambia una VLAN, y el alumno o alumna debe diagnosticar el fallo con `show` y `ping`.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA1.e | Clasifica la red y justifica topología, medio y WAN comparando alternativas. | Clasifica correctamente con justificación breve. | Clasificación incorrecta o sin justificar. |
| RA1.f | Inventario completo con función, capa y modelo de cada componente. | Inventario correcto de los componentes principales. | Inventario incompleto o confuso. |
| RA1.g | Mapas físico y lógico completos, coherentes con el `.pkt` y con convenciones; interpreta correctamente un mapa ajeno. | Mapas correctos con omisiones menores. | Mapas ausentes o incoherentes con la red. |
| RA5.a | VLSM sin solapamientos y con crecimiento; IPv6 bien planificado y abreviado; todo verificado. | Direccionamiento correcto con algún error menor. | Solapamientos, máscaras erróneas o sin IPv6. |
| RA5.b | VLAN, troncal y asignación de puertos correctas; seguridad de puertos o desactivación de los no usados. | LAN cableada con VLAN funcionando. | La LAN no funciona o no hay VLAN. |
| RA5.c | Red inalámbrica aislada (VLAN de invitados), WPA2/WPA3 con clave robusta y cliente conectado. | Red inalámbrica segura funcionando. | Red abierta, WEP o sin cliente conectado. |
| RA5.d | Configura *switch*, *router* y AP y justifica cada dispositivo según su capa y sus dominios. | Configura los dispositivos correctamente. | Dispositivos sin configurar o mal elegidos. |
| RA5.e | NAT/PAT y rutas por defecto IPv4 e IPv6 verificadas hasta el ISP, con la tecnología de acceso justificada. | Salida al ISP funcionando en IPv4. | Sin conectividad WAN. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Packet Tracer: [Cisco Networking Academy](https://www.netacad.com/cisco-packet-tracer).
  - Estándares: [RFC 1918](https://www.rfc-editor.org/rfc/rfc1918) · [RFC 4291 (arquitectura IPv6)](https://www.rfc-editor.org/rfc/rfc4291) · [RFC 5952 (formato IPv6)](https://www.rfc-editor.org/rfc/rfc5952) · [RFC 3849 (prefijo de documentación)](https://www.rfc-editor.org/rfc/rfc3849).
  - Wi-Fi: [Wi-Fi Alliance: seguridad](https://www.wi-fi.org/discover-wi-fi/security).
  - Diagramas: [diagrams.net](https://www.diagrams.net/).
- **Decisión relacionada:** [DEC-SI-04](../../decisiones/DEC-SI-04-simulador-redes.md).
- **Herramientas:** Packet Tracer 8.x, `ipcalc` o `sipcalc`, diagrams.net, comprobador de cables y crimpadora (aula).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
