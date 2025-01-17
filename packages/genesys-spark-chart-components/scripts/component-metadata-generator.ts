#! /usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { JsonDocs, JsonDocsComponent, Config } from '@stencil/core/internal';

const projectPath = join(__dirname, '..');
const componentSpecsOutputFolder = join(projectPath, 'build/component-specs');
const specDestination = join(
  componentSpecsOutputFolder,
  'component-specs.json'
);

if (!existsSync(componentSpecsOutputFolder)) {
  mkdirSync(componentSpecsOutputFolder, { recursive: true });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function componentMetadataGenerator(docs: JsonDocs, _config: Config) {
  const metaData = extractMetadata(docs.components);

  writeFileSync(specDestination, JSON.stringify(metaData, null, 2));
}

function extractMetadata(components: JsonDocsComponent[]) {
  return components.reduce((acc, component) => {
    return Object.assign({}, acc, {
      [component.tag]: {
        tag: component.tag,
        folderName: getFolderName(component),
        example: isExample(component),
        beta: isBeta(component),
        attributes: getAttributes(component),
        events: getEvents(component)
      }
    });
  }, {});
}

function getFolderName(component: JsonDocsComponent) {
  const folders = component.dirPath.split('/');

  return folders[folders.length - 1];
}

function isExample(component: JsonDocsComponent) {
  return existsSync(`${component.dirPath}/example.html`);
}

function isBeta(component: JsonDocsComponent) {
  return component.dirPath?.includes('/components/beta/');
}

function getAttributes(component: JsonDocsComponent) {
  return component.props?.reduce((acc, cv) => {
    return Object.assign({}, acc, { [cv.attr]: getAttributeInput(cv.type) });
  }, {});
}

function getEvents(component: JsonDocsComponent) {
  return component.events?.reduce(
    (acc, cv) => Object.assign({}, acc, { [cv.event]: cv.docs }),
    {}
  );
}

function getAttributeInput(attributeType) {
  if (attributeType === 'boolean') {
    return 'checkbox';
  } else if (attributeType === 'string') {
    return 'text';
  } else if (attributeType === 'number') {
    return 'text';
  } else if (attributeType.includes(' | ')) {
    return attributeType
      .split(' | ')
      .map(option => option.trim().replace(/"/g, ''));
  } else if (attributeType.includes('`')) {
    return 'text';
  } else {
    return 'code';
  }
}
