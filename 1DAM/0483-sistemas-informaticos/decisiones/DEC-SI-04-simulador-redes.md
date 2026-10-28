# DEC-SI-04 · Simulación de redes

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0483 · UD06 (y apoyo en UD07) |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

> «Se han configurado redes de área local cableadas.» RA5.b · «Se han configurado redes de área local inalámbricas.» RA5.c · «Se han utilizado dispositivos de interconexión de redes.» RA5.d · «Se ha configurado el acceso a redes de área extensa.» RA5.e · «Se han interpretado mapas físicos y lógicos de una red informática.» RA1.g
>
> Fuente: RD 405/2023, anexo I, MP0483 ([BOE-A-2023-13221][boe])

El aula no tiene por qué disponer de *switches*, *routers* y puntos de acceso para cada pareja. Hace falta una herramienta para diseñar y configurar redes con IPv4 e IPv6.

## Alternativas evaluadas

| Criterio | A · Cisco Packet Tracer | B · GNS3 | C · Equipos físicos del aula |
|---|---|---|---|
| C1 Normativa | ✅ RA5.b-e (incluye Wi-Fi y WAN simulados), RA1.g | ➖ RA5.c: la parte inalámbrica es difícil de simular | ✅ todos, si hay material suficiente |
| C2 Aplicabilidad profesional | ➖ simulador; la CLI se parece a la de los equipos reales (valoración propia) | ✅ ejecuta imágenes reales de sistemas de red | ✅ máxima |
| C3 Disponibilidad y coste | ✅ gratuito con cuenta de Cisco Networking Academy; Windows, Linux y macOS | ✅ libre; las imágenes de fabricante tienen sus propias licencias | ❌ coste de equipamiento |
| C4 Popularidad y comunidad | ✅ muy usado en formación de redes (valoración propia) | ✅ comunidad técnica (valoración propia) | — |
| C5 Vigencia y soporte | ✅ mantenido por Cisco | ✅ mantenido | ➖ el material envejece |
| C6 Recursos didácticos | ✅ cursos de NetAcad | ➖ | ➖ |
| C7 Continuidad curricular | ➖ DAM no tiene más módulos de redes; es útil para comprender despliegues | ➖ | ➖ |
| C8 Viabilidad en el aula | ✅ ligero, modo simulación paso a paso, actividades evaluables | ➖ pesado y de configuración compleja para 1.º | ➖ montaje y desmontaje en cada sesión |

## Decisión

**A · Packet Tracer** para diseño y configuración (UD06). Han pesado C3, C6 y C8. La parte "real" se cubre en UD07 configurando las redes de las MV con los SO reales y, si el aula lo permite, con un *switch* o AP físico como demostración (alternativa C).

## Consecuencias

- El alumnado necesita una cuenta de Networking Academy. El docente la gestiona al inicio de UD06.
- **Plan B:** GNS3 o Containerlab para quien quiera ampliar; equipos físicos para demostración. La rúbrica de P6 evalúa el diseño, el direccionamiento y la verificación, no la herramienta.

## Fuentes

- RD 405/2023, anexo I, MP0483 (consulta: 2026-10-27).
- [Cisco Packet Tracer](https://www.netacad.com/cisco-packet-tracer) (consulta: 2026-10-27).
- [GNS3](https://www.gns3.com/) (consulta: 2026-10-27).

[boe]: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221
