#! /usr/bin/env node

const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const proc = require('child_process');

const CDN_URL = process.env.CDN_URL || '';
console.log(`Wrapping stencil loader. CDN URL will be: ${CDN_URL}`);

const tscPath = require.resolve('.bin/tsc');
const templateFile = path.join(__dirname, './stencil-wrapper.ts');
const sourceOutputFolder = path.join(__dirname, '../build');
const sourceOutputFile = path.join(sourceOutputFolder, 'stencil-wrapper.ts');
const distDir = path.join(__dirname, '../dist');
const template = Handlebars.compile(fs.readFileSync(templateFile, 'utf8'));

const source = template({ cdn_url: CDN_URL });

if (!fs.existsSync(sourceOutputFolder)) {
  fs.mkdirSync(sourceOutputFolder, { recursive: true });
}
fs.writeFileSync(sourceOutputFile, source);

proc.execSync(`${tscPath} ${sourceOutputFile} --outDir ${distDir}`);
