#! /usr/bin/env node
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const projectPath = path.join(__dirname, '..');
const specDestination = path.join(projectPath, 'docs/component-specs.json');
const componentExampleGlob = path.join(
  projectPath,
  'src/components/**/example.html'
);
const styleExampleGlob = path.join(projectPath, 'src/style/examples/*.html');

module.exports = function generateMetadata() {
  fs.writeFileSync(
    specDestination,
    JSON.stringify(generateComponentSpec(), null, 2)
  );
};

function generateComponentSpec() {
  let componentExamples = glob.sync(componentExampleGlob);
  let componentsSpec = componentExamples.reduce((spec, examplePath) => {
    let componentPath = examplePath.replace('/example.html', '');
    spec[getComponentName(componentPath)] = getComponentMetadata(componentPath);
    return spec;
  }, {});

  let styleExamples = glob.sync(styleExampleGlob);
  let stylesSpec = styleExamples.reduce((spec, examplePath) => {
    const name = path.basename(examplePath, '.html');
    spec[name] = { styles: true };
    return spec;
  }, {});

  return { ...componentsSpec, ...stylesSpec };
}

function getComponentName(path) {
  return path.replace(/.*\//, '').replace(/-beta$/, '');
}

function getComponentMetadata(path) {
  let { attributes, events } = parseComponentMarkdown(`${path}/readme.md`);

  return {
    beta: path.includes('/components/beta/'),
    attributes,
    events
  };
}

function parseComponentMarkdown(readmePath) {
  const mdStr = fs.readFileSync(readmePath).toString();

  return {
    events: parseEventTable(mdStr),
    attributes: parseAttributeTable(mdStr)
  };
}

function parseEventTable(mdStr) {
  let eventRegEx = new RegExp(/## Events\s(.*?)\n\n/, 'gms');
  let eventMatch = eventRegEx.exec(mdStr);
  let events = [];
  if (eventMatch !== null) {
    let eventMd = eventMatch[1].trim();
    let data = mdTableToArray(eventMd);

    events = data.reduce((events, [name, description, type]) => {
      events[name] = description;
      return events;
    }, {});
  }

  return events;
}

function parseAttributeTable(mdStr) {
  let attrRegEx = new RegExp(/## Properties\s(.*?)\s##/, 'gms');
  let match = attrRegEx.exec(mdStr);
  let attributes = [];
  if (match !== null) {
    let attrMd = match[1].trim();
    let data = mdTableToArray(attrMd);

    attributes = data.reduce(
      (attributes, [prop, attribute, description, type, defaultVal]) => {
        attributes[attribute] = attributeType(type);
        return attributes;
      },
      {}
    );
  }

  return attributes;
}

function attributeType(type) {
  if (type == 'boolean') {
    return 'checkbox';
  } else if (type.startsWith('string') || type == 'number') {
    return 'text';
  } else {
    let options = type.split('|');
    if (options.length > 0) {
      return options.map(option => {
        return option.trim().replace(/&quot;/g, '');
      });
    } else {
      throw `Unknown attribute type ${type}`;
    }
  }
}

function mdTableToArray(tableMd) {
  let cur_row = [];
  let table = [];

  marked(tableMd, {
    renderer: {
      table(header, body) {},
      tablerow(content) {
        table.push(cur_row);
        cur_row = [];
      },
      tablecell(content, flags) {
        if (!flags.header) {
          cur_row.push(content);
        }
      },
      codespan(text) {
        return text;
      },
      text(text) {
        return text;
      }
    }
  });

  return table.filter(e => {
    return e.length > 0;
  });
}
