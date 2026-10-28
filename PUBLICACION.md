# Publicación con GitHub Actions

Esta web se genera y se publica sola cada vez que cambia el repositorio. El mecanismo es el mismo que usan los equipos de desarrollo para compilar, probar y desplegar sus aplicaciones, la **integración y el despliegue continuos (CI/CD)**, así que el propio repositorio sirve como caso práctico para el aula.

## Conceptos

| Concepto | Qué es | En este repositorio |
|---|---|---|
| **Integración continua (CI)** | Cada cambio se comprueba de forma automática en cuanto llega al repositorio | En cada *push* se genera la web y se comprueba que no hay enlaces rotos |
| **Despliegue continuo (CD)** | Si la comprobación pasa, el resultado se publica sin intervención manual | La web se sube a GitHub Pages |
| **GitHub Actions** | Servicio de GitHub que ejecuta tareas automáticas en máquinas virtuales cuando ocurre algo en el repositorio | Ejecuta el fichero `.github/workflows/pages.yml` |
| **Workflow** | Fichero YAML que describe cuándo se ejecuta la automatización y qué hace | [`pages.yml`](https://github.com/mrpiay/FPDAM/blob/main/.github/workflows/pages.yml) |
| **Job** | Conjunto de pasos que se ejecutan en una misma máquina | `build` (generar) y `deploy` (publicar) |
| **Step** | Un comando o una acción reutilizable | Instalar MkDocs, generar la web, subirla… |
| **Artefacto** | Fichero o carpeta que un job pasa a otro | La carpeta `site/` con la web generada |
| **GitHub Pages** | Alojamiento gratuito de webs estáticas de GitHub | `https://mrpiay.github.io/FPDAM/` |

## El recorrido de un cambio

1. **Se edita un fichero** Markdown, en local o desde la propia web de GitHub, y se hace *push* a la rama `main`.
2. **GitHub detecta el *push*** y arranca el workflow en una máquina Linux.
3. **Job `build`:**
   1. descarga el repositorio;
   2. instala Python y MkDocs, con versiones fijas para que el resultado sea reproducible;
   3. ejecuta `scripts/build-site.sh`, que prepara el contenido en `docs/`;
   4. ejecuta `mkdocs build --strict`, que genera el HTML en `site/` y **falla si hay un enlace roto**;
   5. empaqueta `site/` como artefacto.
4. **Job `deploy`:** solo empieza si `build` ha terminado bien (`needs: build`), y publica el artefacto en GitHub Pages.
5. **En uno o dos minutos** la web está actualizada.

Si algo falla, el workflow se detiene, la web publicada no cambia y la pestaña **Actions** muestra en rojo el paso que ha fallado, con su registro.

## El fichero, por partes

El fichero completo está comentado línea a línea en el repositorio: [`.github/workflows/pages.yml`](https://github.com/mrpiay/FPDAM/blob/main/.github/workflows/pages.yml).

| Bloque | Para qué sirve |
|---|---|
| `on: push: branches: [main]` y `workflow_dispatch` | Cuándo se ejecuta: con cada *push* a `main`, o a mano desde la pestaña Actions |
| `permissions` | Permisos mínimos del token de la acción: leer el repositorio y publicar en Pages. Es una buena práctica de seguridad no conceder más de lo necesario |
| `concurrency` | Si llegan dos cambios seguidos, cancela la publicación anterior y solo publica la última |
| `jobs: build` | Genera la web. El paso `--strict` hace de **puerta de calidad**: si la comprobación no pasa, no se publica |
| `jobs: deploy` con `needs: build` | Publica solo si la generación ha ido bien |
| `actions/checkout`, `setup-python`, `upload-pages-artifact`, `deploy-pages` | Acciones oficiales de GitHub, reutilizables, que evitan escribir esos pasos a mano |

## Reproducirlo en un *fork*

1. Haz un *fork* del repositorio (botón **Fork** en GitHub).
2. En tu copia: **Settings → Pages → Source: «GitHub Actions»**.
3. En **Actions**, activa los workflows si GitHub lo pide y lanza **Publicar web → Run workflow**.
4. Tu web queda en `https://tu-usuario.github.io/FPDAM/`. Para que los enlaces absolutos apunten a tu copia, cambia `site_url` y `repo_url` en `mkdocs.yml`.

Para generarla en local sin publicar:

```bash
pip install "mkdocs-material==9.8.0" "mkdocs==1.6.1"
bash scripts/build-site.sh
mkdocs serve        # http://127.0.0.1:8000/FPDAM/
```

## Actividades para el aula

> **Propuesta del docente.** Actividades opcionales que usan este repositorio como caso práctico.

| Actividad | Qué se hace | Relación con el currículo |
|---|---|---|
| **A1. Leer un workflow** | Explicar qué hace cada bloque de `pages.yml` y dibujar el recorrido de un cambio | MP0483 · «Se han planificado y automatizado tareas» (RA3.f) |
| **A2. Romper la puerta de calidad** | En un *fork*, introducir un enlace roto, hacer *push*, localizar el fallo en la pestaña Actions y corregirlo | MP0488 · «Se han realizado pruebas de regresión» (RA8.c) |
| **A3. Añadir una comprobación** | Añadir al job `build` un paso nuevo, por ejemplo un corrector de Markdown o un comprobador de enlaces externos | MP0488 · «Se ha establecido una estrategia de pruebas» (RA8.a) |
| **A4. Publicar en otro canal** | Desplegar la misma web en otro servicio de alojamiento estático y comparar los dos canales | MP0488 · «Se ha preparado la aplicación para ser distribuida a través de diferentes canales de distribución» (RA7.h) |
| **A5. Aplicarlo a un proyecto propio** | Crear un workflow que compile y ejecute las pruebas del proyecto integrador en cada *pull request* | MP0485 y MP0488 · proyectos integradores |

Fuente de los criterios: RD 405/2023, anexo I, MP0483 y MP0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). La relación de cada actividad con el criterio es propuesta del docente.

## Documentación oficial

- [GitHub Actions: documentación](https://docs.github.com/es/actions)
- [Sintaxis de los workflows](https://docs.github.com/es/actions/writing-workflows/workflow-syntax-for-github-actions)
- [Publicar en GitHub Pages con un workflow personalizado](https://docs.github.com/es/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [MkDocs](https://www.mkdocs.org/) y [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
