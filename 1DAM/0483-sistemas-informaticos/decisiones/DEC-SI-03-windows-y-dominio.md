# DEC-SI-03 · Sistema propietario y servicio de dominio

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD02, UD03, UD04, UD08 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han instalado y actualizado sistemas operativos libres y propietarios.» Fuente: RD 405/2023, anexo I, MP0483, RA2.e
>
> «Se han configurado y explotado dominios.» Fuente: RD 405/2023, anexo I, MP0483, RA6.g
>
> «Implantación y explotación de dominios.» Fuente: RD 405/2023, anexo I, MP0483, contenidos básicos, bloque «Gestión de recursos en una red»
>
> ([BOE-A-2023-13221][boe])

Hacen falta un SO cliente propietario con cifrado de volumen, directivas locales y host RDP, y un servicio de directorio para RA6.g.

## Alternativas evaluadas

| Criterio | A · Windows 11 Pro + Windows Server 2025 (AD DS) | B · Windows 11 Pro + Samba AD DC (Ubuntu) | C · Windows 11 Pro + Windows Server 2022 |
|---|---|---|---|
| C1 Normativa | ✅ RA2.e, RA3.d (BitLocker), RA4.b, RA6.b, RA6.g | ✅ RA6.g (dominio compatible con clientes Windows; las GPO se administran con RSAT) | ✅ |
| C2 Aplicabilidad profesional | ✅ AD DS es el directorio habitual en organizaciones con puestos Windows (valoración propia) | ➖ uso más limitado (valoración propia) | ✅ |
| C3 Disponibilidad y coste | ✅ Windows Server en evaluación de 180 días; Windows 11 Pro con licencias del centro o programa educativo | ✅ servidor libre; el cliente Windows sigue necesitando licencia | ✅ evaluación |
| C4 Popularidad y comunidad | ✅ Microsoft Learn, comunidad amplia (valoración propia) | ➖ wiki de Samba (valoración propia) | ✅ |
| C5 Vigencia y soporte | ✅ Server 2025: soporte principal hasta el 14/11/2029 y extendido hasta el 15/11/2034 ([ciclo de vida](https://learn.microsoft.com/lifecycle/products/windows-server-2025)). Windows 11: versiones 25H2 (hasta el 13/10/2027) y 26H2 (hasta el 10/10/2028) en Home/Pro ([ciclo de vida](https://learn.microsoft.com/lifecycle/products/windows-11-home-and-pro)) | ✅ Samba con soporte de la distribución | ➖ versión anterior |
| C6 Recursos didácticos | ✅ Microsoft Learn | ➖ wiki de Samba | ✅ |
| C7 Continuidad curricular | ✅ SQL Server o IIS en módulos posteriores, si se usan | ➖ | ✅ |
| C8 Viabilidad en el aula | ✅ 4 GB de RAM para el controlador con escritorio; asistentes gráficos y PowerShell | ✅ más ligero; más CLI | ✅ |

## Decisión

**A · Windows 11 Pro + Windows Server 2025 con AD DS.** Han pesado C2 y C5: es la versión de servidor actual y tiene soporte más allá del curso. C3 queda cubierto con la evaluación de 180 días, que basta para UD08. La edición Home queda descartada por C1, porque no incluye BitLocker completo, `secpol.msc`, host RDP ni unión a dominio.

## Consecuencias

- `WS-DC` se crea al empezar UD08 para que la evaluación de 180 días no caduque durante la unidad.
- Dominio de laboratorio: `dam.test` (TLD reservado para pruebas por el RFC 2606).
- **Riesgo:** caducidad o activación de las licencias. **Mitigación:** crear las MV desde plantillas OVA y ampliar la evaluación (`slmgr /rearm`, si procede).
- **Plan B:** Samba AD DC sobre `UB-SRV` (`samba-tool domain provision`, `samba-tool user create`) con clientes Windows 11 Pro. Los CE RA6.b y RA6.g se evalúan igual. La rúbrica de P8 es independiente del producto.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [Ciclo de vida de Windows Server 2025](https://learn.microsoft.com/lifecycle/products/windows-server-2025) (consulta: 2026-10-27).
- [Ciclo de vida de Windows 11 Home y Pro](https://learn.microsoft.com/lifecycle/products/windows-11-home-and-pro) (consulta: 2026-10-27).
- [Samba AD DC](https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller) (consulta: 2026-10-27).
- [RFC 2606](https://www.rfc-editor.org/rfc/rfc2606) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
