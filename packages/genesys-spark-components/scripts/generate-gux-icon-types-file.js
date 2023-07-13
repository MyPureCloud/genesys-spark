#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const svgExtensionRegex = new RegExp('.svg$', 'i');
let variants = [];

const getAllVariants = directory => {
  const fileList = fs.readdirSync(directory);
  fileList.forEach(file => {
    file = path.join(directory, file);
    const fileStatus = fs.statSync(file);
    if (fileStatus.isDirectory() && !file.includes('legacy')) {
      // Recursively search sub directories excluding legacy.
      variants = variants.concat(getAllVariants(file));
    } else {
      variants.push(file.split('icons/').pop());
    }
  });

  return variants
    .filter(filename => filename.match(svgExtensionRegex))
    .map(filename => filename.replace(svgExtensionRegex, ''))
    .map(filename => `'${filename}'`)
    .sort()
    .join(' | ');
};

const content = `export type GuxIconIconName = ${getAllVariants(
  __dirname + '/../src/components/stable/gux-icon/icons'
)}`;

const filePath =
  __dirname + '/../src/components/stable/gux-icon/gux-icon.types.ts';

prettier
  .resolveConfig(filePath)
  .then(options => {
    return prettier.format(content, {
      ...options,
      parser: 'typescript'
    });
  })
  .then(formattedFileContent => {
    fs.writeFileSync(filePath, formattedFileContent, { encoding: 'utf8' });
  });
