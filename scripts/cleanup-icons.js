#! /usr/bin/env node

/**
 * This script fixes icons with fixed pixel heights and widths.
 * We should be getting assets with correct scaling, but I'm
 * leaving it here in case we need to fix more in the future.
 * - Matt Cheely 4/14/2020
 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { DOMParser, XMLSerializer } = require('xmldom');

glob('src/components/stable/gux-icon/icons/**/*.svg', (err, files) => {
  if (err) {
    console.error('Error encountered while trying to find the svg files');
    console.error(err);
    process.exit(1);
  }

  files.forEach(fixSvg);
});

function fixSvg(file) {
  const svgStr = fs.readFileSync(file, 'utf8');
  const dom = new DOMParser().parseFromString(svgStr);
  const svg = dom.documentElement;
  const width = svg.getAttribute('width');
  const height = svg.getAttribute('height');

  if (height && width) {
    console.log(
      `Correcting icon with fixed size ${width}x${height}  ${path.basename(
        file
      )}`
    );
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const newSvgStr = new XMLSerializer().serializeToString(svg);
    fs.writeFileSync(file, newSvgStr, 'utf8');
  } else if (height || width) {
    console.log(`${file} is weird and has only one fixed dimension`);
    exit(1);
  }
}
