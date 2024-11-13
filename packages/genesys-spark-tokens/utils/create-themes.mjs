import {
  register,
  permutateThemes,
  expandTypesMap
} from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';
import { camelCase } from 'change-case';

export async function createThemes(sourceFolder, outputFolder) {
  register(StyleDictionary, {
    'ts/color/modifiers': {
      format: 'hex'
    }
  });

  const $themes = JSON.parse(
    await promises.readFile(`${sourceFolder}/$themes.json`, 'utf-8')
  );

  const themes = permutateThemes($themes, { separator: '-' });

  delete themes['gse-legacy-dark-ui'];

  const sdThemes = Object.entries(themes).map(([name, tokensets]) => {
    const baseName = name.replace(/-ui$/, '');

    return new StyleDictionary(
      {
        source: tokensets.map(tokenset => `${sourceFolder}/${tokenset}.json`),
        preprocessors: ['tokens-studio'],
        expand: {
          typesMap: expandTypesMap
        },
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
              transform: (token, options) => {
                const set = token.filePath.replace('.json', '').split('/')[1];

                return [options.prefix, set]
                  .concat(token.path.map(camelCase))
                  .join('-');
              }
            }
          }
        },
        platforms: Object.assign(
          getPlatform(baseName, 'scss', 'css/variables', outputFolder),
          getPlatform(baseName, 'json', 'json/nested', outputFolder)
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

function getPlatform(name, type, format, outputFolder) {
  const themeName = name.match(/(?<=gse-).*(?=-)/)[0]; // We get the theme from the nme
  const modeRegExp = new RegExp(`(?<=gse-${themeName}-).*`);
  const modeName = name.match(modeRegExp)[0]; // we get the mode name

  return {
    [type]: {
      transformGroup: 'tokens-studio',
      transforms: ['color/gse', 'name/gse'],
      prefix: 'gse',
      buildPath: `${outputFolder}/${type}/`,
      files: [
        {
          //We only need one core file for everything
          destination: `gse-core.${type}`,
          format,
          filter: token => {
            return token.filePath.endsWith('core.json');
          }
        },
        {
          //We only need one set of semantic/theme tokens per theme
          destination: `gse-${themeName}-semantic-theme.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/theme/${themeName}`);
          }
        },

        {
          // We do need 1 set of semantic/mode tokens per mode-theme permutation
          destination: `${name}-semantic-mode.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/mode/${modeName}`);
          }
        },

        {
          destination: `${name}-semantic-global.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/global`);
          }
        },

        {
          // We do need 1 set of semantic/global tokens per mode-theme permutation
          destination: `${name}-ui.${type}`,
          format,
          filter: token => {
            return token.filePath.includes('/ui/');
          }
        }
      ],
      options: {
        showFileHeader: false,
        outputReferences: false,
        selector: '@mixin tokens',
        formatting: {
          commentStyle: 'none'
        }
      }
    }
  };
}
