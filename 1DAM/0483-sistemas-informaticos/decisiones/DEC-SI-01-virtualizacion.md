# DEC-SI-01 · Plataforma de virtualización

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD02-UD08 (todo el laboratorio) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

El módulo se trabaja en un laboratorio de máquinas virtuales (MV) en los PC del aula, en modalidad presencial. La norma exige virtualizar, pero no fija producto:

> «Se han utilizado tecnologías de virtualización para instalar y probar sistemas operativos.» Fuente: RD 405/2023, anexo I, MP0483, RA2.g ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))
>
> «Tecnologías de virtualización. Tipos.» Fuente: RD 405/2023, anexo I, MP0483, contenidos básicos, bloque «Instalación de sistemas operativos» ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

El hipervisor debe ejecutar Windows 11 (UEFI, Secure Boot y TPM 2.0), Windows Server 2025 y Ubuntu, con redes internas entre MV.

## Alternativas evaluadas

| Criterio | A · Oracle VirtualBox 7.x (tipo 2) | B · VMware Workstation Pro (tipo 2) | C · Hyper-V (Windows Pro) | D · Proxmox VE / KVM (tipo 1, servidor del aula) |
|---|---|---|---|---|
| C1 Normativa | ✅ RA2.g; permite comparar con otros tipos (contenido «Tipos») | ✅ RA2.g | ✅ RA2.g | ✅ RA2.g; además ilustra el hipervisor tipo 1 |
| C2 Aplicabilidad profesional | ➖ habitual en entornos de prueba y formación; poco en producción (valoración propia) | ➖ escritorio de pruebas (valoración propia) | ✅ base de la virtualización de Windows Server y de WSL 2 | ✅ hipervisores de servidor usados en producción (valoración propia) |
| C3 Disponibilidad y coste | ✅ gratuito; base con licencia GPLv3 y Extension Pack con licencia propia ([FAQ de licencias](https://www.virtualbox.org/wiki/Licensing_FAQ)); Windows, Linux y macOS Intel | ✅ gratuito desde noviembre de 2024 según anuncio del fabricante; requiere cuenta de Broadcom para descargar | ➖ solo en Windows Pro/Enterprise/Education; no en Linux ni macOS | ✅ libre (AGPLv3); ❌ necesita un servidor dedicado |
| C4 Popularidad y comunidad | ✅ foros oficiales y abundante material educativo (valoración propia) | ✅ comunidad amplia (valoración propia) | ✅ documentación de Microsoft Learn | ✅ foro y wiki oficiales (valoración propia) |
| C5 Vigencia y soporte | ✅ rama 7.x mantenida, con soporte de TPM 2.0 y Secure Boot en el invitado | ✅ mantenido | ✅ incluido en el SO | ✅ versiones mayores periódicas |
| C6 Recursos didácticos | ✅ manual oficial | ➖ documentación oficial | ✅ Microsoft Learn | ➖ documentación oficial; menos material de FP |
| C7 Continuidad curricular | ✅ MV de servidor para BD (MP0484) y servicios (MP0490 en 2.º) | ✅ ídem | ✅ WSL 2 en 1.º y 2.º | ✅ ídem |
| C8 Viabilidad en el aula | ✅ GUI sencilla y CLI (`VBoxManage`); redes internas y OVA para clonar plantillas | ✅ sencillo | ➖ convive mal con otros hipervisores (VirtualBox funciona sobre la plataforma de Hyper-V, más lento) | ➖ requiere un servidor y gestión de red; las MV no viajan con el alumnado |

## Decisión

**A · VirtualBox 7.x** en los PC del aula. Han pesado C3, porque es gratuito y multiplataforma, y C8: interfaz sencilla, `VBoxManage` para automatizar, exportación OVA de plantillas y redes internas que no interfieren con la red del centro. C2 queda cubierto en el aula comparando los tipos de hipervisor (UD02) y con Hyper-V a través de WSL 2 (UD05).

## Consecuencias

- UD02 enseña VirtualBox por GUI y CLI, e incluye la comparación con Hyper-V, Proxmox/KVM y contenedores.
- La imagen del aula debe tener la virtualización activada en la UEFI y, si se usa WSL 2 en el anfitrión, asumir el modo de compatibilidad con Hyper-V.
- **Riesgo:** conflicto con Hyper-V o VBS en el anfitrión. **Mitigación:** comprobar el indicador de modo de ejecución en la MV y documentarlo en la guía del aula.
- **Plan B:** si el centro dispone de servidor, Proxmox VE con una MV por alumno o alumna (equivalencias de comandos: `VBoxManage snapshot` ↔ `qm snapshot`). Con licencias de Windows Pro, Hyper-V (`New-VM`, `Checkpoint-VM`). Las rúbricas no cambian.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [VirtualBox: Licensing FAQ](https://www.virtualbox.org/wiki/Licensing_FAQ) y [manual](https://www.virtualbox.org/manual/) (consulta: 2026-10-27).
- [Hyper-V en Windows](https://learn.microsoft.com/virtualization/hyper-v-on-windows/) (consulta: 2026-10-27).
- [Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment/overview) (consulta: 2026-10-27).
- Gratuidad de VMware Workstation Pro: anuncio de Broadcom de noviembre de 2024. Pendiente de enlazar la página oficial vigente; verificar antes de publicar.
