#! /usr/bin/env node

const fs = require('fs');
const prettier = require('prettier');

const svgExtentionRegex = new RegExp('.svg$', 'i');

const variants = fs
  .readdirSync(__dirname + '/../src/components/stable/gux-icon/icons')
  .filter(filename => filename.match(svgExtentionRegex))
  .map(filename => filename.replace(svgExtentionRegex, ''))
  .map(filename => `'${filename}'`)
  .sort()
  .join(' | ');

const content = `export type GuxIconIconName = ${variants};`;

const filePath =
  __dirname + '/../src/components/stable/gux-icon/gux-icon.types.ts';

prettier.resolveConfig(filePath).then(options => {
  const formatted = fs.writeFileSync(
    filePath,
    prettier.format(content, {
      ...options,
      parser: 'babel'
    })
  );
});
