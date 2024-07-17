#!/bin/bash

sass src/style/reset.scss dist/reset.css
sass src/style/global.scss dist/global.css
sass src/style/ui.scss dist/ui.css

sass src/style/reset.scss dist/css/reset.css
sass src/style/global.scss dist/css/global.css
sass src/style/ui.scss dist/css/ui.css

sass src/style/flare/global.scss dist/css/flare/global.css
sass src/style/flare/ui.scss dist/css/flare/ui.css

sass src/style/legacy/global.scss dist/css/legacy/global.css
sass src/style/legacy/ui.scss dist/css/legacy/ui.css

mkdir -p dist/scss/
cp src/style/*.scss dist/scss/
