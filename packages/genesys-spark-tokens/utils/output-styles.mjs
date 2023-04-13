import { temporaryWriteTask } from 'tempy';
import StyleDictionary from 'style-dictionary';

export function outputStyles(
  rootFolder,
  filename,
  styleDictionaryReadableTokens
) {
  return temporaryWriteTask(
    JSON.stringify(styleDictionaryReadableTokens),
    tempPath => {
      const styleDictionary = StyleDictionary.extend({
        source: [tempPath],
        platforms: {
          css: {
            transformGroup: 'css',
            prefix: 'gse',
            buildPath: `${rootFolder}/css/`,
            files: [
              {
                destination: `${filename}.css`,
                format: 'css/variables'
              }
            ],
            options: {
              showFileHeader: false
            }
          },
          less: {
            transformGroup: 'less',
            prefix: 'gse',
            buildPath: `${rootFolder}/less/`,
            files: [
              {
                destination: `${filename}.less`,
                format: 'less/variables'
              }
            ],
            options: {
              showFileHeader: false
            }
          },
          scss: {
            transformGroup: 'scss',
            prefix: 'gse',
            buildPath: `${rootFolder}/scss/`,
            files: [
              {
                destination: `_${filename}.scss`,
                format: 'scss/variables'
              }
            ],
            options: {
              showFileHeader: false
            }
          },
          json: {
            transformGroup: 'js',
            prefix: 'gse',
            buildPath: `${rootFolder}/json/`,
            files: [
              {
                destination: `${filename}.json`,
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
