# DEC-DI-06 · Empaquetado, instaladores, firma y distribución

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD08 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han generado paquetes de instalación utilizando el entorno de desarrollo.» · «Se han generado paquetes de instalación utilizando herramientas externas.» · «Se han firmado digitalmente las aplicaciones para su distribución.» · «Se han generado paquetes instalables en modo desatendido.» Fuente: RD 405/2023, anexo I, 0488, RA7.c, RA7.d, RA7.e y RA7.f ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> Contenido básico: «Canales de distribución: repositorios (stores), ad-hoc, sitios web, correo electrónico, entre otros.» Fuente: ídem, bloque «Distribución de aplicaciones».

Los criterios RA7.c y RA7.d obligan a usar **dos vías distintas**: una desde el entorno de desarrollo y otra con una herramienta externa.

## Alternativas evaluadas

| Criterio | A. jpackage (desde Maven/IDE) + Inno Setup | B. jpackage + WiX directo | C. MSIX (MSIX Packaging Tool) | D. Install4j / Advanced Installer |
|---|---|---|---|---|
| C1 Normativa | ✅ jpackage cubre RA7.c. Inno Setup cubre RA7.d con asistente personalizable (RA7.b), `/VERYSILENT` (RA7.f) y desinstalador (RA7.g) | ✅ Cubre los mismos CE, pero personalizar el asistente en WiX es más costoso | ➖ No hay un asistente clásico que personalizar (RA7.b) | ✅ |
| C2 Aplicabilidad profesional | ✅ Inno Setup está muy extendido en software de escritorio para Windows (valoración propia) | ✅ WiX se usa en instaladores corporativos MSI (valoración propia) | ✅ Formato moderno de Windows | ✅ Comerciales |
| C3 Disponibilidad y coste | ✅ jpackage incluido en el JDK; Inno Setup gratuito ([jrsoftware.org](https://jrsoftware.org/isinfo.php)) | ✅ WiX libre | ✅ Gratuito | ❌ De pago (con licencias para proyectos libres o de educación, según el fabricante) |
| C4 Popularidad y comunidad | ✅ (valoración propia) | ✅ (valoración propia) | ➖ | ➖ |
| C5 Vigencia y soporte | ✅ jpackage forma parte del JDK desde la versión 16. En JDK 25 el tipo MSI funciona con WiX 3 y con WiX 4 o posterior (la documentación de `jpackage` incluye un conversor de WiX v3 a v4 «when WiX v4 or newer is used») | ✅ | ✅ | ✅ |
| C6 Recursos didácticos | ✅ Documentación oficial | ➖ | ➖ | ➖ |
| C7 Continuidad curricular | ✅ Conecta con Sistemas informáticos (instalación de software, registro) | ✅ | ✅ | ➖ |
| C8 Viabilidad en el aula | ✅ Se hace en una VM de Windows. La firma se practica con un certificado autofirmado | ➖ Curva de aprendizaje alta en XML | ✅ | ❌ Licencias |

**Firma.** `signtool` (Windows SDK) con un certificado autofirmado creado con `New-SelfSignedCertificate` y `jarsigner` para los JAR. Se explica la diferencia con un certificado comercial y los servicios de firma en la nube. El certificado autofirmado solo se usa en el aula.

**Canales.** GitHub Releases (sitio web), manifiesto de **winget** (repositorio), Microsoft Store (se describe y se simula, sin publicar) y distribución *ad hoc* (enlace o correo).

## Decisión

**Alternativa A**, con WiX Toolset instalado solo como requisito de `jpackage --type msi` en JDK 25. Han pesado C1 (las dos vías obligatorias y la personalización del asistente), C3 y C8.

## Consecuencias

- La UD08 genera dos instaladores: MSI con jpackage y EXE con Inno Setup a partir de la *app-image* de jpackage.
- **Riesgo:** SmartScreen bloquea los ejecutables con firma autofirmada. Se explica como parte del contenido y se instala el certificado en la VM del aula.
- **Plan B:** WiX directo o MSIX. En Linux, DEB con `jpackage --type deb`.

## Fuentes

- RD 405/2023: ver la [fuente común](README.md).
- Oracle, *The jpackage Command* ([docs.oracle.com, JDK 25](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jpackage.html)). Consultado el 2026-10-27.
- Inno Setup ([jrsoftware.org](https://jrsoftware.org/isinfo.php)) · WiX Toolset ([wixtoolset.org](https://wixtoolset.org/)) · Microsoft, SignTool ([learn.microsoft.com](https://learn.microsoft.com/es-es/windows/win32/seccrypto/signtool)) · winget ([learn.microsoft.com](https://learn.microsoft.com/es-es/windows/package-manager/)). Consultados el 2026-10-27.
