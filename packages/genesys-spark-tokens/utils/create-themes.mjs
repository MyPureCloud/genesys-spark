import {
  registerTransforms,
  permutateThemes
} from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';
import { camelCase } from 'change-case';

export async function createThemes(sourceFolder, outputFolder) {
  registerTransforms(StyleDictionary, {
    expand: {
      composition: true,
      border: true,
      typography: true,
      shadow: true
    }
  });

  const $themes = JSON.parse(
    await promises.readFile(`${sourceFolder}/$themes.json`, 'utf-8')
  );

  const themes = permutateThemes($themes, { separator: '-' });

  const sdThemes = Object.entries(themes).map(([name, tokensets]) => {
    const baseName = name.replace(/-ui$/, '');

    return new StyleDictionary(
      {
        source: tokensets.map(tokenset => `${sourceFolder}/${tokenset}.json`),
        preprocessors: ['tokens-studio'],
        hooks: {
          transforms: {
            'color/gse': {
              type: 'value',
              transitive: false,
              filter: () => true,
              transform: token => {
                if (token.type === 'color') {
                  return token.value.toLowerCase();
                }
                return token.value;
              }
            },
            'name/gse': {
              type: 'name',
              transitive: false,
              filter: () => true,
              transform: (token, options, a, s, d) => {
                const set = token.filePath.replace('.json', '').split('/')[1];

                return [options.prefix, set]
                  .concat(token.path.map(camelCase))
                  .join('-');
              }
            }
          }
        },
        platforms: Object.assign(
          getPlatform(
            baseName,
            'css',
            'css/variables',
            'tokens-studio',
            outputFolder
          ),
          getPlatform(
            baseName,
            'less',
            'less/variables',
            'tokens-studio',
            outputFolder
          ),
          getPlatform(
            baseName,
            'scss',
            'scss/variables',
            'tokens-studio',
            outputFolder
          ),
          getPlatform(baseName, 'json', 'json/nested', 'js', outputFolder)
        )
      },
      {
        verbosity: 'verbose'
      }
    );
  });

  for (const sdTheme of sdThemes) {
    await sdTheme.buildAllPlatforms();
  }
}

function getPlatform(name, type, format, transformGroup, outputFolder) {
  return {
    [type]: {
      transformGroup,
      transforms: ['color/gse', 'name/gse'],
      prefix: 'gse',
      buildPath: `${outputFolder}/${type}/`,
      files: [
        {
          destination: `${name}-core.${type}`,
          format,
          filter: token => {
            return token.filePath.endsWith('core.json');
          }
        },
        {
          destination: `${name}-semantic.${type}`,
          format,
          filter: token => {
            return token.filePath.includes('/semantic/');
          }
        },
        {
          destination: `${name}-ui.${type}`,
          format,
          filter: token => {
            return token.filePath.includes('/ui/');
          }
        }
      ],
      options: {
        showFileHeader: false,
        outputReferences: false
      }
    }
  };
}
