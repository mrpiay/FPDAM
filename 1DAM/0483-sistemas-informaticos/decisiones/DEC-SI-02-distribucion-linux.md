# DEC-SI-02 · Sistema operativo libre (distribución Linux)

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD02-UD08 |
| Estado | Propuesta; revisar para 2027-28 |
| Fecha | 2026-10-27 |

## Contexto

> «Se han instalado y actualizado sistemas operativos libres y propietarios.» Fuente: RD 405/2023, anexo I, MP0483, RA2.e ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

Hace falta una distribución para escritorio de desarrollo y para servidor (Samba, CUPS, SSH, Tomcat) que tenga soporte durante todo el curso y la FCT, y que coincida con lo que el alumnado usará en WSL y en la nube.

## Alternativas evaluadas

| Criterio | A · Ubuntu 24.04 LTS | B · Ubuntu 26.04 LTS | C · Debian 13 | D · Rocky Linux / AlmaLinux (familia RHEL) |
|---|---|---|---|---|
| C1 Normativa | ✅ RA2-RA6 | ✅ | ✅ | ✅ |
| C2 Aplicabilidad profesional | ✅ distribución por defecto de WSL ([documentación de WSL](https://learn.microsoft.com/windows/wsl/install)); habitual en nube y CI (valoración propia) | ✅ ídem | ✅ servidores; base de muchas imágenes de contenedor (valoración propia) | ✅ entornos empresariales con RHEL (valoración propia) |
| C3 Disponibilidad y coste | ✅ gratuita | ✅ gratuita | ✅ gratuita | ✅ gratuita |
| C4 Popularidad y comunidad | ✅ Ask Ubuntu y Discourse oficiales (valoración propia) | ➖ menos material específico por ser reciente (valoración propia) | ✅ (valoración propia) | ➖ (valoración propia) |
| C5 Vigencia y soporte | ✅ publicada en abril de 2024; mantenimiento estándar hasta **mayo de 2029** y ESM hasta mayo de 2034 ([ciclo de Ubuntu](https://ubuntu.com/about/release-cycle)) | ✅ publicada en abril de 2026; mantenimiento estándar hasta **mayo de 2031** ([ciclo de Ubuntu](https://ubuntu.com/about/release-cycle)) | ✅ versión estable actual | ✅ ciclo largo |
| C6 Recursos didácticos | ✅ documentación oficial de Ubuntu Server | ➖ documentación oficial recién actualizada | ✅ | ➖ |
| C7 Continuidad curricular | ✅ mismo SO en WSL para MP0485, MP0484 y servicios de 2.º | ✅ | ➖ | ➖ |
| C8 Viabilidad en el aula | ✅ comandos y capturas del material probados en esta versión; netplan, ufw, `apt` | ➖ habría que revisar el material (cambios de versión en paquetes y herramientas) | ✅ ligera; `ifupdown` en lugar de netplan | ➖ `dnf`, firewalld, SELinux: más curva para 1.º |

## Decisión

**A · Ubuntu 24.04 LTS** (Desktop y Server) para el curso 2026-27. Han pesado C8, porque el material está probado en esta versión, y C5, porque tiene soporte estándar hasta 2029, más allá del ciclo del alumnado. **B · Ubuntu 26.04 LTS** es la LTS más reciente y la candidata para 2027-28 tras revisar el material (regla 4 de revisión anual). Se acepta también como alternativa para quien la use en su equipo, porque los conceptos y casi todos los comandos coinciden.

## Consecuencias

- Los comandos de UD02-UD08 se escriben para 24.04: netplan, `ubuntu.sources` en formato deb822, `ssh.socket`, `plocate`.
- **Riesgo:** desfase con la LTS más reciente. **Mitigación:** actividad de lectura de las notas de versión de 26.04 en UD02 y migración planificada del material.
- **Plan B:** con Debian, cambiar netplan por `/etc/network/interfaces` o NetworkManager. Con la familia RHEL: `apt` → `dnf`, `ufw` → `firewall-cmd`, netplan → `nmcli`, ext4 → XFS. Ver la tabla de equivalencias en [UD03](../unidades/UD03-almacenamiento-y-sistemas-de-archivos/README.md) y siguientes.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [Ubuntu release cycle](https://ubuntu.com/about/release-cycle) (consulta: 2026-10-27): 24.04 LTS, abril de 2024 → mayo de 2029 (estándar), mayo de 2034 (ESM); 26.04 LTS, abril de 2026 → mayo de 2031 (estándar).
- [Instalación de WSL](https://learn.microsoft.com/windows/wsl/install) (consulta: 2026-10-27).
