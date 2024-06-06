import { temporaryWriteTask } from 'tempy';
import StyleDictionary from 'style-dictionary';
import { camelCase } from 'change-case';

import Color from 'tinycolor2';

function isColor(token) {
  return Color(token.value).isValid();
}

StyleDictionary.registerTransform({
  name: 'name/gse',
  type: 'name',
  transitive: false,
  filter: () => true,
  transform: (token, options) => {
    return [options.prefix].concat(token.path.map(camelCase)).join('-');
  }
});

StyleDictionary.registerTransform({
  name: 'color/gse',
  type: 'value',
  transitive: false,
  filter: isColor,
  transform: function (token) {
    const color = Color(token.original.value);
    if (color.getAlpha() === 1) {
      return color.toHexString();
    } else {
      return color.toHex8String();
    }
  }
});

export function outputStyles(
  rootFolder,
  setName,
  styleDictionaryReadableTokens
) {
  const formattedSetName = camelCase(setName);

  let prefix = `gse-${formattedSetName}`;
  let destinationFilename = `gse-${formattedSetName}`;

  if (!['core', 'semantic', 'ui'].includes(formattedSetName)) {
    prefix = `gse-ui`;
    destinationFilename = `gse-ui-${formattedSetName}`;
  }

  return temporaryWriteTask(
    JSON.stringify(styleDictionaryReadableTokens),
    tempPath => {
      const styleDictionary = new StyleDictionary(
        {
          source: [tempPath],
          platforms: {
            css: {
              transformGroup: 'css',
              transforms: ['name/gse', 'size/px', 'color/gse'],
              prefix,
              buildPath: `${rootFolder}/css/`,
              files: [
                {
                  destination: `${destinationFilename}.css`,
                  format: 'css/variables'
                }
              ],
              options: {
                showFileHeader: false
              }
            },
            less: {
              transformGroup: 'less',
              transforms: ['name/gse', 'size/px', 'color/gse'],
              prefix,
              buildPath: `${rootFolder}/less/`,
              files: [
                {
                  destination: `${destinationFilename}.less`,
                  format: 'less/variables'
                }
              ],
              options: {
                showFileHeader: false,
                outputReferences: false
              }
            },
            scss: {
              transformGroup: 'scss',
              transforms: ['name/gse', 'size/px', 'color/gse'],
              prefix,
              buildPath: `${rootFolder}/scss/`,
              files: [
                {
                  destination: `_${destinationFilename}.scss`,
                  format: 'scss/variables'
                }
              ],
              options: {
                showFileHeader: false
              }
            },
            json: {
              transformGroup: 'js',
              transforms: ['size/px', 'color/gse'],
              buildPath: `${rootFolder}/json/`,
              files: [
                {
                  destination: `${destinationFilename}.json`,
                  format: 'json/nested'
                }
              ],
              options: {
                showFileHeader: false
              }
            }
          }
        },
        {
          verbosity: 'verbose'
        }
      );

      styleDictionary.buildAllPlatforms();
    },
    { extension: 'json' }
  );
}
