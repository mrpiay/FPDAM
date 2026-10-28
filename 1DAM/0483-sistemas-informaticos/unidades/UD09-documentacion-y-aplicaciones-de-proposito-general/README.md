# UD09 · Documentación técnica y aplicaciones de propósito general

| Módulo | Curso | Duración orientativa | RA trabajados |
|---|---|---|---|
| MP0483 Sistemas informáticos | 1.º DAM | 9 h · 11 sesiones de 50 min (≈ 1,8 semanas a 6 sesiones; propuesta del docente) | RA7 (a-g; 100 % de la UD) · refuerza RA2.c, RA2.i |

## Criterios de evaluación

| CE | Texto literal | Fuente | Cómo se evalúa |
|---|---|---|---|
| RA7.a | Se ha clasificado software en función de su licencia y propósito. | [RD 405/2023, anexo I, 0483, RA7.a][boe] | P9 (informe de licencias y propósito del software de la empresa cliente) · PE3 |
| RA7.b | Se han analizado las necesidades específicas de software asociadas al uso de sistemas informáticos en diferentes entornos productivos. | [RD 405/2023, anexo I, 0483, RA7.b][boe] | P9 (necesidades de software por entorno) · PE3 |
| RA7.c | Se han realizado tareas de documentación mediante el uso de herramientas ofimáticas y de trabajo colaborativo. | [RD 405/2023, anexo I, 0483, RA7.c][boe] | P9 (dossier técnico y manual en Markdown/ofimática, coeditado y revisado) + calidad de las memorias de P2-P8 |
| RA7.d | Se han utilizado sistemas de correo y mensajería electrónica. | [RD 405/2023, anexo I, 0483, RA7.d][boe] | P9 (cliente de correo, envío profesional, análisis de cabeceras y *phishing*, canal de mensajería) |
| RA7.e | Se han utilizado los servicios de transferencia de ficheros. | [RD 405/2023, anexo I, 0483, RA7.e][boe] | P9 (FTPS/SFTP y enlace compartido) |
| RA7.f | Se han utilizado métodos de búsqueda de documentación técnica mediante el uso de servicios de Internet. | [RD 405/2023, anexo I, 0483, RA7.f][boe] | P9 (registro de búsquedas de documentación) · todas las memorias |
| RA7.g | Se han utilizado herramientas de propósito general. | [RD 405/2023, anexo I, 0483, RA7.g][boe] | P9 (compresión cifrada, recuperación de datos y evaluación de utilidades) |

## Objetivos de aprendizaje · Propuesta del docente

Al terminar la unidad el alumnado será capaz de:

1. Clasificar el software por propósito y licencia, e identificar las obligaciones de cada licencia.
2. Analizar las necesidades de software de distintos entornos productivos y proponer soluciones con criterios de coste, soporte y cumplimiento.
3. Elaborar documentación técnica con herramientas ofimáticas y con Markdown y Git, y trabajar de forma colaborativa: coedición, revisión y control de versiones.
4. Usar el correo y la mensajería de forma profesional y segura.
5. Transferir ficheros con el protocolo adecuado según la seguridad y el destinatario.
6. Buscar documentación técnica de forma eficaz y valorar la fiabilidad de las fuentes.
7. Usar y evaluar utilidades de propósito general: compresión, recuperación de datos, gestión de contraseñas, conversión de documentos.

## Contenidos · Propuesta del docente

> Fuente de los contenidos básicos que se cubren: RD 405/2023, anexo I, módulo 0483, bloque «Explotación de aplicaciones informáticas de propósito general» ([BOE-A-2023-13221][boe]; texto literal en [curriculo-boe.md](../../curriculo-boe.md#contenidos-basicos)). El desarrollo, los ejemplos y los comandos son **propuesta del docente**.

### 1. Software: tipos, requisitos y licencias (RA7.a)

**Tipos por propósito:**

| Tipo | Ejemplos |
|---|---|
| Software de sistema | SO, controladores, *firmware* |
| Software de programación | IDE, compiladores, SDK |
| Aplicación de propósito general | Ofimática, navegador, correo, compresión |
| Aplicación de propósito específico o vertical | ERP, TPV, CAD, software de clínica |

Requisitos que se comprueban siempre: SO y arquitectura, hardware, dependencias, conectividad, licencia.

| Licencia | Familia | Qué permite y qué obliga | Ejemplos |
|---|---|---|---|
| **Propietaria** (EULA) | Privativa | Uso según contrato. Modalidades OEM (ligada al equipo), Retail o por volumen, y suscripción; en servidores, además, CAL de acceso | Windows, Microsoft 365, Adobe |
| Freeware / *shareware* / prueba | Privativa gratuita o temporal | Uso gratuito, a veces solo personal o con límite de tiempo | — |
| **GPL** (v2/v3) | Libre, *copyleft* fuerte | Usar, estudiar, modificar y distribuir; **las obras derivadas que se distribuyan deben ser GPL** con el código | Linux (GPLv2), Git |
| LGPL, MPL | *Copyleft* débil | Se puede enlazar desde software propietario; las modificaciones de la propia biblioteca se comparten | Bibliotecas |
| AGPL | *Copyleft* de red | Como la GPL, pero también obliga cuando el software se ofrece como servicio en red | Algunos servidores |
| **MIT, BSD, Apache 2.0** | Permisivas | Casi todo permitido; hay que mantener el aviso de autoría. Apache 2.0 añade una concesión de patentes | VS Code (código fuente), Kotlin, Android (AOSP) |
| **Creative Commons** | Contenidos, no software | BY (atribución), SA (compartir igual), NC (no comercial), ND (sin obras derivadas) | **Este material: CC BY-NC-SA 4.0** (fichero LICENSE del repositorio) |
| Dominio público / CC0 | — | Sin restricciones | — |

- **Software libre y código abierto:**
  - El **software libre** se define por las cuatro libertades de la FSF: usar, estudiar, distribuir y mejorar.
  - El **código abierto** se define por los criterios de la OSI.
  - En la práctica, casi todas las licencias se reconocen en ambos sitios.
- **Identificadores SPDX:** nombres normalizados de licencias, como `GPL-3.0-only`, `MIT` o `Apache-2.0`. Se usan en el fichero `LICENSE` y en los manifiestos de los proyectos.
- **Licencias educativas:**
  - Varias empresas ofrecen licencias gratuitas para estudiantes, por ejemplo GitHub Education o JetBrains.
  - Hay que revisar sus condiciones: normalmente **prohíben el uso comercial**.

### 2. Necesidades de software según el entorno productivo (RA7.b)

| Entorno | Software habitual | Particularidades |
|---|---|---|
| **Empresa de desarrollo** (la empresa cliente) | IDE, control de versiones, CI, gestor de incidencias, contenedores, mensajería, gestor de contraseñas | Licencias por persona, entornos reproducibles, seguridad del código |
| Oficina y administración | Ofimática, correo, ERP y CRM (MP0491 SGE en 2.º), firma electrónica | Formatos interoperables, copias |
| Comercio | TPV, tienda en línea, facturación | Normativa de facturación; disponibilidad |
| Industria | SCADA, MES, PLC, mantenimiento | Disponibilidad, redes aisladas (OT) |
| Sanidad, educación, sector público | Software específico, plataformas de aprendizaje | **Protección de datos** reforzada; requisitos de accesibilidad |
| Diseño y multimedia | CAD, edición de imagen y vídeo | Hardware gráfico, licencias caras |

**Criterios de elección:**

- Requisitos funcionales.
- Compatibilidad con el sistema y con otras aplicaciones (interoperabilidad, formatos abiertos como ODF o PDF/A).
- **Coste total**: licencias, formación, soporte, migración.
- Soporte y vigencia.
- Seguridad.
- Cumplimiento normativo.
- Facilidad de uso.
- Dependencia de un único proveedor.

### 3. Herramientas ofimáticas y de trabajo colaborativo (RA7.c)

- **Suites ofimáticas:**
  - En la nube: Microsoft 365, Google Workspace (según la plataforma del centro).
  - De escritorio: LibreOffice, OnlyOffice.
- **Documento técnico bien hecho:**
  - **Estilos** de título y de cuerpo, en lugar de dar formato a mano.
  - **Índice automático**, numeración de figuras y tablas.
  - **Plantillas**.
  - Encabezado con versión y fecha, y una tabla de control de cambios.
  - Exportación a PDF.
- **Hoja de cálculo:**
  - Inventario y presupuesto con fórmulas: `SUMA`, `SI`, `BUSCARX` o `BUSCARV`.
  - Formato condicional y tablas dinámicas.
  - Validación de datos.
- **Trabajo colaborativo:**
  - Coedición en tiempo real.
  - Permisos de compartición (ver, comentar, editar) con caducidad.
  - Comentarios y sugerencias (control de cambios).
  - Historial de versiones.
  - Tableros de tareas (GitHub Projects, Planner, Trello).
- **Documentación como código** (ver [DEC-SI-07](../../decisiones/DEC-SI-07-herramientas-colaborativas-y-documentacion.md)): Markdown en un repositorio Git, con revisión mediante *pull request* o *merge request*.

```bash
git switch -c revision-p9                 # rama para proponer cambios
git add . && git commit -m "P9: añade capítulo de copias de seguridad"
git push -u origin revision-p9            # luego se abre la PR y la revisa un compañero o compañera
pandoc dossier.md -o dossier.docx         # Markdown → Word
pandoc dossier.md -o dossier.html --standalone --toc
# A PDF: pandoc dossier.md -o dossier.pdf (requiere un motor LaTeX) o exportar desde la suite ofimática
```

Los diagramas se pueden escribir en Markdown con Mermaid (los renderizan GitHub y GitLab) o dibujar con diagrams.net.

### 4. Correo y mensajería electrónica (RA7.d)

| Elemento | Descripción |
|---|---|
| MUA (cliente) | Thunderbird, Outlook, webmail |
| MTA / MDA | Servidores que transportan y entregan el correo |
| **SMTP** | Envío: 587 con STARTTLS o 465 con TLS implícito, ambos con autenticación; 25 entre servidores |
| **IMAP** (993, TLS) | Los mensajes se quedan en el servidor y se sincronizan entre dispositivos |
| POP3 (995, TLS) | Descarga los mensajes al equipo |

- **Uso profesional:**
  - Asunto claro.
  - CC para quien debe estar informado; **CCO** para envíos a muchas personas, para no exponer direcciones.
  - Firma con nombre, cargo y empresa.
  - Archivos grandes como **enlace** con permisos, no como adjunto.
  - Respuestas en hilo; tono adecuado.
- **Seguridad del correo:**
  - **Señales de *phishing*:** remitente o dominio parecido al real, urgencia, enlaces cuyo destino no coincide con el texto, adjuntos inesperados.
  - **Comprobar las cabeceras:** en Thunderbird, *Ver código fuente*; en Gmail, *Mostrar original*. Se miran los resultados de **SPF, DKIM y DMARC**.
  - **Cifrado y firma:** S/MIME u OpenPGP (Thunderbird incorpora OpenPGP).
- **Mensajería de equipo** (Teams, Slack, Google Chat, Element/Matrix):
  - Canales por tema y mensajes directos.
  - Menciones y estados de disponibilidad.
  - Integraciones, como los avisos del repositorio.
  - Nunca se comparten contraseñas por el chat: se usa el gestor de contraseñas.
- **Para desarrollo:** herramientas como **Mailpit** capturan el correo que envía una aplicación en pruebas sin mandarlo a nadie. Por ejemplo: `docker run -d -p 8025:8025 -p 1025:1025 axllent/mailpit`.

### 5. Servicios de transferencia de ficheros (RA7.e)

| Opción | Puerto | Seguridad | Uso |
|---|---|---|---|
| FTP | 21 (control), 20 o puertos pasivos (datos) | **Ninguna**: credenciales en claro | Sistemas heredados |
| **FTPS** | 21 (explícito) / 990 (implícito) | TLS | Intercambio con proveedores que lo exigen |
| **SFTP / SCP** | 22 | SSH (UD07) | Servidores Linux, despliegues |
| HTTPS (nube: OneDrive, Drive, Nextcloud) | 443 | TLS + permisos del enlace | Compartir con clientes, con caducidad y contraseña |
| `rsync` sobre SSH | 22 | SSH | Sincronizar y hacer copias |

- **FTP activo:** el servidor abre la conexión de datos hacia el cliente.
- **FTP pasivo:** el cliente abre ambas conexiones. Funciona mejor con NAT y cortafuegos.

**Servidor FTPS de laboratorio en `UB-SRV`:**

```bash
sudo apt install -y vsftpd
# /etc/vsftpd.conf (fragmento)
#   anonymous_enable=NO
#   local_enable=YES
#   write_enable=YES
#   chroot_local_user=YES
#   allow_writeable_chroot=YES
#   ssl_enable=YES                 # usa el certificado autofirmado de ssl-cert (rsa_cert_file / rsa_private_key_file)
#   force_local_logins_ssl=YES
#   pasv_min_port=40000
#   pasv_max_port=40100
sudo systemctl restart vsftpd
sudo ufw allow from 192.168.50.0/24 to any port 21 proto tcp
sudo ufw allow from 192.168.50.0/24 to any port 40000:40100 proto tcp
```

**Clientes:** FileZilla o WinSCP (FTPS explícito o SFTP), `lftp`, `curl`. Se comprueba la **integridad** de lo transferido con `sha256sum` o `Get-FileHash`.

### 6. Búsqueda de documentación técnica (RA7.f)

**Orden de consulta recomendado:**

1. **Documentación local:** `man`, `--help`, `tldr`, `Get-Help -Examples`.
2. **Documentación oficial y notas de versión:** Microsoft Learn, documentación de Ubuntu, manuales de los proyectos, RFC.
3. **Bases de conocimiento y *issues*** del proyecto en GitHub o GitLab.
4. **Foros moderados:** Stack Overflow, Ask Ubuntu, Server Fault.
5. **Blogs y vídeos**, siempre contrastados.

**Operadores de búsqueda:**

| Operador | Uso | Ejemplo |
|---|---|---|
| `"…"` | Frase exacta | `"Failed to start" tomcat10` |
| `site:` | Limitar a un sitio | `site:learn.microsoft.com New-SmbShare` |
| `filetype:` | Tipo de archivo | `filetype:pdf "guía de bastionado"` |
| `-` | Excluir | `netplan bridge -wifi` |
| `intitle:`, `OR` | Título, alternativas | — |
| `before:`, `after:` | Filtrar por fecha | Útil para descartar soluciones de versiones antiguas |

- **Fiabilidad de una fuente:**
  - ¿Es oficial?
  - ¿Para qué **versión** es?
  - ¿Tiene fecha?
  - ¿Quién la firma?
  - ¿Coincide con otras fuentes?
  - ¿Se ha probado en un entorno seguro, como una MV con instantánea?
- **Asistentes de IA:**
  - Son útiles para orientarse, pero **se verifica todo lo que se ejecuta**.
  - Nunca se pegan secretos ni datos personales.
  - En la memoria se indica cuándo se han usado.
- **En las memorias:** cada incidencia cita la fuente consultada con su fecha de consulta.

### 7. Utilidades de propósito general (RA7.g)

| Utilidad | Herramientas | Ejemplo |
|---|---|---|
| Compresión y empaquetado | 7-Zip / NanaZip, `tar`, `zip`, `Compress-Archive` | `7z a -p -mhe=on dossier.7z P9/` (AES-256 y nombres de archivo cifrados) |
| Recuperación de datos | **TestDisk / PhotoRec** (multiplataforma), **Windows File Recovery** (`winfr`) | `winfr E: C:\Recuperados /regular /n *.docx` · `sudo photorec /dev/sdb` |
| Gestión de contraseñas | KeePassXC, Bitwarden | Base de datos cifrada; generador de contraseñas |
| Conversión de documentos | Pandoc, LibreOffice en modo consola | `soffice --headless --convert-to pdf informe.docx` |
| Capturas y grabación | Recortes, Flameshot, OBS Studio | Evidencias de las memorias |
| PDF | PDF24, `qpdf`, `pdftk` | Unir, dividir y proteger |
| Antimalware, mantenimiento, correo, transferencia | UD08, UD04, apartados 4-5 | — |

La recuperación funciona mejor cuanto **antes** se intenta y **sin escribir** en el disco afectado. La regla es trabajar sobre una imagen del disco o recuperar hacia otro disco.

## Actividades · Propuesta del docente

### Actividades de clase (no evaluables)

- **A1. ¿Puedo usarlo en la empresa cliente?** Diez programas y bibliotecas reales: identificar la licencia (SPDX), si se pueden usar comercialmente, qué obligaciones imponen y su coste.
- **A2. El mismo informe, tres formas.** Un informe breve en Markdown, convertido con Pandoc a DOCX y HTML, y maquetado en la suite ofimática con estilos e índice. Comparar los resultados.
- **A3. Caza del *phishing*.** Analizar cinco correos (proporcionados por el docente, inofensivos) y sus cabeceras SPF, DKIM y DMARC.
- **A4. Reto de búsqueda.** Tres incidencias reales del curso, resueltas buscando con operadores y anotando la consulta, la fuente, la versión y la fiabilidad.
- **A5. Recuperar lo borrado.** En un disco virtual con archivos borrados, recuperarlos con PhotoRec o `winfr` y explicar por qué unos se recuperan y otros no.

### Práctica evaluable

**P9 · Entrega final del proyecto la empresa cliente: dossier técnico y comunicación con el cliente.**

1. **Informe de software** (RA7.a, RA7.b): inventario del software instalado en P2-P8 con su propósito, licencia SPDX, modalidad y coste anual estimado. Necesidades por entorno (desarrollo, QA, administración) y una propuesta justificada con criterios de coste total y soporte.
2. **Dossier técnico y manual de administración** (RA7.c):
   - Integra las memorias de P1-P8 en un documento estructurado: índice, control de versiones, procedimientos, mapa de red, política de copias, incidencias.
   - Se escribe en Markdown en el repositorio y se exporta a DOCX o PDF.
   - Incluye una **hoja de cálculo** de inventario y presupuesto compartida en la suite del centro, con permisos de comentario para el "cliente" (docente).
   - **Revisión cruzada:** una compañera o compañero revisa un capítulo con comentarios o *pull request*, y el autor o autora integra los cambios.
3. **Correo y mensajería** (RA7.d):
   - Configurar Thunderbird (u otro cliente) con la cuenta del centro por IMAP y SMTP con TLS. En la parte de desarrollo, alternativa con Mailpit.
   - Enviar al "cliente" el correo de entrega con un formato profesional.
   - Analizar las cabeceras de un correo recibido.
   - Comunicar una incidencia por el canal de mensajería del grupo.
4. **Transferencia** (RA7.e): publicar el dossier en el servidor FTPS de `UB-SRV` y por SFTP. Comparar ambos con capturas o configuración, verificar el *hash* y compartirlo además con un enlace en la nube con caducidad.
5. **Búsqueda** (RA7.f): registro de las búsquedas de 3 incidencias del curso, con la consulta, la fuente, la versión, la fecha de consulta y la valoración de su fiabilidad.
6. **Utilidades** (RA7.g):
   - Paquete 7z cifrado del dossier, con la contraseña custodiada en KeePassXC.
   - Ejercicio de recuperación de datos.
   - Evaluación de dos utilidades de la misma categoría.

**Conexión con el mundo real:** equivale al cierre de un proyecto de implantación: la entrega al cliente de la documentación técnica y del inventario de licencias, la comunicación profesional de la entrega y el traspaso seguro de los ficheros.

Verificación en el puesto: el docente abre el dossier exportado, comprueba el historial de revisiones y descarga el paquete por SFTP verificando el *hash*.

| CE | Excelente (10-9) | Adecuado (8-5) | Insuficiente (<5) |
|---|---|---|---|
| RA7.a | Todo el software clasificado por propósito y licencia (SPDX), con sus obligaciones y su uso comercial explicados. | Clasificación correcta de la mayoría. | Clasificación errónea o incompleta. |
| RA7.b | Necesidades por entorno analizadas con criterios (coste total, soporte, cumplimiento) y propuesta razonada. | Necesidades identificadas con una propuesta. | Lista de programas sin análisis. |
| RA7.c | Dossier profesional (estilos, índice, versiones), exportado; hoja de cálculo funcional compartida con permisos; revisión entre pares integrada. | Dossier completo y hoja de cálculo compartida. | Documentación desordenada o sin colaboración. |
| RA7.d | Cliente configurado con TLS, correo profesional, análisis de cabeceras correcto y uso adecuado de la mensajería. | Cliente configurado y correo enviado correctamente. | Sin configurar o comunicación inadecuada. |
| RA7.e | FTPS y SFTP funcionando, comparados y verificados con *hash*; enlace en la nube con caducidad. | Transfiere por un canal seguro y comparte el enlace. | Usa FTP en claro o no transfiere. |
| RA7.f | Búsquedas con operadores, fuentes oficiales priorizadas y fiabilidad valorada. | Búsquedas documentadas con fuentes. | Sin registro o con fuentes no contrastadas. |
| RA7.g | Usa y evalúa las utilidades con criterios; recuperación lograda y explicada. | Usa correctamente las utilidades. | No las usa o no las evalúa. |

## Recursos · Propuesta del docente

- **Documentación oficial:**
  - Licencias: [SPDX License List](https://spdx.org/licenses/) · [choosealicense.com](https://choosealicense.com/) · [Creative Commons](https://creativecommons.org/licenses/?lang=es) · [GNU: categorías de software libre](https://www.gnu.org/philosophy/categories.es.html).
  - Documentación y colaboración: [Pandoc](https://pandoc.org/MANUAL.html) · [Pro Git (es)](https://git-scm.com/book/es/v2).
  - Correo y transferencia: [Thunderbird: OpenPGP](https://support.mozilla.org/es/kb/openpgp-thunderbird-howto-and-faq) · [vsftpd](https://security.appspot.com/vsftpd.html).
  - Utilidades y seguridad: [TestDisk/PhotoRec](https://www.cgsecurity.org/) · [Windows File Recovery](https://support.microsoft.com/es-es/windows/recuperar-archivos-perdidos-en-windows-10-61f5b28a-f5b8-3cc2-0f8e-a63cb4e1d4c4) · [INCIBE: *phishing*](https://www.incibe.es/).
- **Decisiones relacionadas:** [DEC-SI-07](../../decisiones/DEC-SI-07-herramientas-colaborativas-y-documentacion.md) · [DEC-SI-08](../../decisiones/DEC-SI-08-contenidos-adicionales.md).
- **Herramientas:** suite ofimática del centro, Git, Pandoc, Thunderbird, FileZilla o WinSCP, 7-Zip, KeePassXC, TestDisk/PhotoRec.

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
