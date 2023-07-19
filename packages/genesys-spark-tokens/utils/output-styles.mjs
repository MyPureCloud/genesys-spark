import { temporaryWriteTask } from 'tempy';
import StyleDictionary from 'style-dictionary';
import { camelCase } from 'change-case';

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
            transforms: ['name/gse'],
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
            transforms: ['name/gse'],
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
      });

      styleDictionary.buildAllPlatforms();
    },
    { extension: 'json' }
  );
}
