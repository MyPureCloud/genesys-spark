#! /usr/bin/env node

const spriteSmith = require('spritesmith');
const templater = require('spritesheet-templates');
const fs = require('fs');
const path = require('path');

const basePath = path.resolve(
  __dirname,
  '../src/components/beta/gux-phone-input/components/gux-region-icon/sprite-utils'
);

const flagDir = `${basePath}/region-flags`;
const constantPath = `${basePath}/generate-sprites.ts`;
const styleSheetPath = `${basePath}/generate-sprites.scss`;

const src = fs.readdirSync(flagDir).map(file => `${flagDir}/${file}`);

spriteSmith.run({ src }, function (err, results) {
  if (err) {
    throw err;
  } else {
    console.log('SpriteSmith succeeded with results: ', results);

    fs.writeFileSync(
      constantPath,
      `export const spritesheetDataUrl = 'data:image/png;base64,${results.image.toString(
        'base64'
      )}';\n`
    );

    const sprites = Object.entries(results.coordinates).map(
      ([path, coords]) => ({
        name: path.split('/').pop().split('.')[0],
        ...coords
      })
    );

    const spritesheet = {
      image: '', // path to image file needs to be set in the inline style of the icon instead of here due to asset path issues
      ...results.properties
    };

    const styleSheet = templater(
      { sprites, spritesheet },
      {
        format: 'scss',
        formatOpts: {
          variableNameTransforms: ['toLowerCase']
        }
      }
    );

    fs.writeFileSync(styleSheetPath, styleSheet);
  }
});
