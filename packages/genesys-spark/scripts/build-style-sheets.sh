#!/bin/bash

FOLDER="${OUTDIR:-dist}"

sass --version

sass --style=expanded src/style/reset.scss $FOLDER/reset.css
sass --style=expanded src/style/global.scss $FOLDER/global.css
sass --style=expanded src/style/ui.scss $FOLDER/ui.css

sass --style=expanded src/style:$FOLDER/css

mkdir -p $FOLDER/scss/
cp src/style/*.scss $FOLDER/scss/
