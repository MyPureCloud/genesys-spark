import { temporaryWriteTask } from 'tempy';
import StyleDictionary from 'style-dictionary';
import { camelCase } from 'change-case';

export function outputStyles(
  rootFolder,
  setName,
  styleDictionaryReadableTokens
) {
  const formattedSetName = camelCase(setName);

  return temporaryWriteTask(
    JSON.stringify(styleDictionaryReadableTokens),
    tempPath => {
      const styleDictionary = StyleDictionary.extend({
        source: [tempPath],
        transform: {
          'name/gse': {
            type: 'name',
            transitive: false,
            matcher: () => true,
            transformer: (token, options) => {
              return [options.prefix]
                .concat(token.path.map(camelCase))
                .join('-');
            }
          }
        },
        platforms: {
          css: {
            transformGroup: 'css',
            transforms: ['name/gse'],
            prefix: `gse-${formattedSetName}`,
            buildPath: `${rootFolder}/css/`,
            files: [
              {
                destination: `gse-${formattedSetName}.css`,
                format: 'css/variables'
              }
            ],
            options: {
              showFileHeader: false
            }
          },
          less: {
            transformGroup: 'less',
            transforms: ['name/gse'],
            prefix: `gse-${formattedSetName}`,
            buildPath: `${rootFolder}/less/`,
            files: [
              {
                destination: `gse-${formattedSetName}.less`,
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
            transforms: ['name/gse'],
            prefix: `gse-${formattedSetName}`,
            buildPath: `${rootFolder}/scss/`,
            files: [
              {
                destination: `_gse-${formattedSetName}.scss`,
                format: 'scss/variables'
              }
            ],
            options: {
              showFileHeader: false
            }
          },
          json: {
            transformGroup: 'js',
            buildPath: `${rootFolder}/json/`,
            files: [
              {
                destination: `gse-${formattedSetName}.json`,
                format: 'json/nested'
              }
            ],
            options: {
              showFileHeader: false
            }
          }
        }
      });

      styleDictionary.buildAllPlatforms();
    },
    { extension: 'json' }
  );
}
