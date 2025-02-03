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
    const [prefix, theme, mode] = name.split('-');

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
          getPlatform(
            prefix,
            theme,
            mode,
            'scss',
            'css/variables',
            outputFolder
          ),
          getPlatform(prefix, theme, mode, 'json', 'json/nested', outputFolder)
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

function getPlatform(prefix, theme, mode, type, format, outputFolder) {
  return {
    [type]: {
      transformGroup: 'tokens-studio',
      transforms: ['color/gse', 'name/gse'],
      prefix,
      buildPath: `${outputFolder}/${type}/`,
      expand: {
        typesMap: expandTypesMap,
        // eslint-disable-next-line no-unused-vars
        exclude: (token, config, platformConfig) => {
          if (type === 'json') {
            return false;
          }

          return [
            // "border",
            'shadow'
            // "typography"
          ].includes(token.type);
        }
      },
      files: [
        {
          destination: `${prefix}-core.${type}`,
          format,
          filter: token => {
            return token.filePath.endsWith('core.json');
          }
        },
        {
          destination: `${prefix}-semantic-${theme}.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/theme/${theme}`);
          }
        },
        {
          destination: `${prefix}-semantic-${theme}-global.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/global`);
          }
        },
        {
          destination: `${prefix}-semantic-${theme}-${mode}.${type}`,
          format,
          filter: token => {
            return token.filePath.includes(`/semantic/mode/${mode}`);
          }
        },
        {
          destination: `${prefix}-ui-${theme}-${mode}.${type}`,
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
