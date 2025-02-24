#!/bin/bash

FOLDER="${OUTDIR:-dist}"

sass --version

sass src/style/reset.scss $FOLDER/reset.css
sass src/style/global.scss $FOLDER/global.css
sass src/style/ui.scss $FOLDER/ui.css

sass src/style:$FOLDER/css

mkdir -p $FOLDER/scss/
cp src/style/*.scss $FOLDER/scss/
