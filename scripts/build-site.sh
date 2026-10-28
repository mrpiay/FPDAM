#!/usr/bin/env bash
# Copia el contenido del repo a docs/ para que MkDocs lo compile. La portada de la web es web/index.md;
# el README.md raíz es la portada de GitHub y no se copia.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf docs
mkdir -p docs/assets
for item in ROADMAP.md SOBRE-ESTA-WEB.md PUBLICACION.md LICENSE 1DAM 2DAM normativa plantillas fponboard; do
  [ -e "$item" ] && cp -r "$item" docs/
done
cp web/index.md docs/index.md
cp web/extra.css docs/assets/extra.css
cp web/favicon.svg docs/assets/favicon.svg
cp web/external-links.js docs/assets/external-links.js
cp web/modulos.js docs/assets/modulos.js
