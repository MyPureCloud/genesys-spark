#! /usr/bin/env node

const spriteSmith = require('spritesmith');
const templater = require('spritesheet-templates');
const fs = require('fs');
const path = require('path');

const basePath = path.resolve(
  __dirname,
  '../src/components/beta/gux-flag-icon/sprite-utils'
);

const flagDir = `${basePath}/region-flags`;
const constantPath = `${basePath}/sprites.generated.ts`;
const styleSheetPath = `${basePath}/sprites.generated.scss`;

const files = fs.readdirSync(flagDir);

const src = files.map(file => `${flagDir}/${file}`);
const flagCodes = files.map(file => file.replace('.png', ''));

spriteSmith.run({ src }, function (err, results) {
  if (err) {
    throw err;
  } else {
    console.log('SpriteSmith succeeded with results: ', results);

    fs.writeFileSync(
      constantPath,
      `export const spritesheetDataUrl = 'data:image/png;base64,${results.image.toString(
        'base64'
      )}';

export type GuxFlagCode = ${flagCodes.map(code => `'${code}'`).join(' | ')};\n`
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

    const styleSheet =
      `` +
      templater(
        { sprites, spritesheet },
        {
          format: 'scss',
          formatOpts: {
            variableNameTransforms: ['toLowerCase']
          }
        }
      );

    const modifiedStylesheet = `@use 'sass:list';

    ${styleSheet.replaceAll('nth(', 'list.nth(')}
    `;

    fs.writeFileSync(styleSheetPath, modifiedStylesheet);
  }
});
