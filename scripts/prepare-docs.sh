#!/bin/bash

PROJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/.."
DOCS_DIR="${PROJ_DIR}/docs"


if [ ! -d "${DOCS_DIR}/node_modules" ]; then
  echo "Installing docs dependencies..."
  cd "${DOCS_DIR}"
  npm ci --no-optional
fi
