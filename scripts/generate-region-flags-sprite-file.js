#! /usr/bin/env node

const spriteSmith = require('spritesmith');
const templater = require('spritesheet-templates');
const fs = require('fs');
const path = require('path');

const flagDir =
  '../src/components/beta/gux-phone-input/components/gux-region-icon/assets/region-flags';
const spritePath = path.resolve(
  __dirname,
  '../src/components/beta/gux-phone-input/components/gux-region-icon/assets/sprites/region-flags.png'
);
const styleSheetPath = path.resolve(
  __dirname,
  '../src/components/beta/gux-phone-input/components/gux-region-icon/assets/sprites/region-flags.less'
);

const src = fs
  .readdirSync(path.resolve(__dirname, flagDir))
  .map(file => path.resolve(__dirname, `${flagDir}/${file}`));

spriteSmith.run({ src }, function (err, results) {
  if (err) {
    throw err;
  } else {
    console.log('SpriteSmith succeeded with results: ', results);

    fs.writeFileSync(spritePath, results.image);

    const sprites = Object.entries(results.coordinates).map(
      ([path, coords]) => ({
        name: path.split('/').pop().split('.')[0],
        ...coords
      })
    );

    const spritesheet = {
      image: 'assets/sprites/region-flags.png',
      ...results.properties
    };

    const styleSheet = templater(
      {
        sprites,
        spritesheet
      },
      {
        format: 'less',
        formatOpts: {
          variableNameTransforms: ['toLowerCase']
        }
      }
    );

    fs.writeFileSync(styleSheetPath, styleSheet);

    let compiledStyle = '';
    for (let sprite of sprites) {
      compiledStyle += `
.flag-${sprite.name.toLowerCase()} {
  .sprite(@${sprite.name.toLowerCase()})
}
      `;
    }

    compiledStyle += `
.flag {
  display: inline-block;
}
    `;
    fs.appendFileSync(styleSheetPath, compiledStyle);
  }
});
