# Sobre esta web

## Idea

Una web de consulta para docentes: que se navegue por **curso → módulo → unidad**, que se lea bien en el ordenador y en el móvil, y que se mantenga editando ficheros de texto, sin base de datos ni servidor propio.

## Herramientas

| Pieza | Herramienta | Por qué |
|---|---|---|
| Contenido | Ficheros **Markdown** en el [repositorio de GitHub](https://github.com/mrpiay/FPDAM) | Texto plano, versionable con Git y legible también desde GitHub |
| Generador | [**MkDocs**](https://www.mkdocs.org/) con el tema [**Material for MkDocs**](https://squidfunk.github.io/mkdocs-material/) | Convierte el Markdown en una web estática con buscador, menú y diseño adaptable al móvil |
| Diagramas | SVG propio en la portada · [Mermaid](https://mermaid.js.org/) en algunas unidades | El SVG permite un diseño con la paleta de la web; Mermaid escribe diagramas como texto dentro del Markdown |
| Publicación | **GitHub Actions** y **GitHub Pages** | Cada cambio en la rama principal regenera y publica la web de forma automática y gratuita |

## Diseño

- **Portada propia** ([`web/index.md`](https://github.com/mrpiay/FPDAM/blob/main/web/index.md)), distinta del README de GitHub:
  - Banner centrado con título, subtítulo y botones.
  - Fila de cifras clave.
  - Módulos agrupados por curso, con un borde lateral rojo para 1.º y gris oscuro para 2.º.
  - Cuatro fichas que resumen cómo está hecho el material.
  - Itinerario entre módulos: diagrama propio en SVG y una ficha por cada relación.
- **Navegación en dos niveles:** barra principal (Inicio · 1.º DAM · 2.º DAM · Normativa · Plantillas · FP·onboard · Acerca de) y, al entrar en un curso, una segunda barra en gris oscuro con sus dos módulos; el activo se marca con un bloque gris más claro. Las dos barras quedan fijas al desplazarse.
- **Menú lateral:** muestra solo el módulo abierto (ficha, programación, currículo, unidades y decisiones). Los grupos se pliegan con su flecha, y el índice de la página abierta aparece integrado en el menú y también se pliega con su flecha. El apartado que se está leyendo se resalta en rojo.
- **Ancho:** dos columnas (menú y contenido) y un ancho máximo amplio, para que las tablas se lean bien.
- **Paleta:** fondo claro, cabecera en rojo `#c22622` y textos en gris oscuro `#333333`. 1.º se asocia al rojo y 2.º al gris oscuro en toda la portada.
- **Enlaces externos** (BOE, DOG, documentación oficial): se abren en una pestaña nueva.
- **Iconos** de Material Design, Octicons y Font Awesome, incluidos en el tema.

Los estilos y el comportamiento propios están en la carpeta [`web/`](https://github.com/mrpiay/FPDAM/tree/main/web):

| Fichero | Función |
|---|---|
| `index.md` | Portada |
| `extra.css` | Paleta, portada, segunda barra, menú lateral y tablas |
| `modulos.js` | Segunda barra con los módulos del curso, menú lateral limitado al módulo abierto e índice plegable |
| `external-links.js` | Abre los enlaces externos en una pestaña nueva |
| `favicon.svg` | Icono de la pestaña del navegador |

## Cómo se genera

1. El contenido vive en la raíz del repositorio, ordenado por curso y módulo. El script [`scripts/build-site.sh`](https://github.com/mrpiay/FPDAM/blob/main/scripts/build-site.sh) lo copia a `docs/` y añade la portada y los estilos.
2. `mkdocs build --strict` genera la web y **falla si hay un enlace roto**, así no se publica nada con errores.
3. La acción [`.github/workflows/pages.yml`](https://github.com/mrpiay/FPDAM/blob/main/.github/workflows/pages.yml) repite estos pasos en GitHub y publica el resultado.

El proceso de publicación automática, con los conceptos de integración y despliegue continuos y actividades para el aula, se explica en [Publicación con GitHub Actions](PUBLICACION.md).

Para verla en local:

```bash
pip install "mkdocs-material==9.8.0" "mkdocs==1.6.1"
bash scripts/build-site.sh
mkdocs serve        # http://127.0.0.1:8000/FPDAM/
```

## Contenido

El contenido parte de la normativa oficial (ver [Normativa](normativa/README.md)). Para la redacción se usó inteligencia artificial generativa (Claude, de Anthropic) bajo la dirección y revisión del autor. Se han comprobado con scripts la cobertura de los criterios de evaluación, las citas literales contra el texto del BOE, que no haya enlaces rotos y que el contenido no se repita entre las páginas de cada módulo. Falta pilotar las unidades en el aula y probar todo el código de ejemplo.

Si encuentras un error, abre una *issue* en el [repositorio](https://github.com/mrpiay/FPDAM/issues).
