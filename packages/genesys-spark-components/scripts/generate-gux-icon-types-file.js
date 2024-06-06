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
    if (fileStatus.isDirectory()) {
      variants.push(...getAllVariants(file));
    } else if (file.includes('legacy/fa/')) {
      const fileName = file.split('legacy/fa/').pop();
      variants.push(`legacy/fa/${fileName}`, `fa/${fileName}`);
    } else if (file.includes('deprecated/')) {
      const fileName = file.split('deprecated/').pop();
      variants.push(`deprecated/${fileName}`, `${fileName}`);
    } else {
      variants.push(file.split('icons/').pop());
    }
  });

  return (
    variants
      .filter(filename => filename.match(svgExtensionRegex))
      .map(filename => filename.replace(svgExtensionRegex, ''))
      .map(filename => `'${filename}'`)
      .sort()
      // deduplicate the array
      .filter(function (item, position, array) {
        return !position || item !== array[position - 1];
      })
      .join(' | ')
  );
};

const content = `export type GuxIconIconName = ${getAllVariants(
  __dirname + '/../src/components/stable/gux-icon/icons'
)}

export type GuxIconSize = 'inherit' | 'small' | 'medium' | 'large';
`;

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
