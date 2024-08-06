#!/bin/bash

sass src/style/reset.scss dist/reset.css
sass src/style/global.scss dist/global.css
sass src/style/ui.scss dist/ui.css

sass src/style:dist/css

mkdir -p dist/scss/
cp src/style/*.scss dist/scss/
