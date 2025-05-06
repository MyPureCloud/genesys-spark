import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const IS_DEV_MODE = process.env.ROLLUP_WATCH === 'true';
const FOLDER = process.env.OUTDIR || 'dist';

export default [
  {
    input: `src/index.ts`,
    plugins: [
      replace({
        values: {
          IS_DEV_MODE: IS_DEV_MODE,
          __COMPONENT_ASSET_PREFIX__: IS_DEV_MODE
            ? '/build/'
            : process.env.COMPONENT_ASSETS_PATH,
          __CHART_COMPONENT_ASSET_PREFIX__: IS_DEV_MODE
            ? '/dist/genesys-chart-webcomponents/'
            : process.env.CHART_COMPONENT_ASSETS_PATH
        },
        preventAssignment: true
      }),
      esbuild({
        target: 'es6'
      })
    ],
    output: [
      {
        file: `${FOLDER}/index.js`,
        sourcemap: IS_DEV_MODE ? 'inline' : false
      }
    ]
  },
  {
    input: `src/index.ts`,
    plugins: [
      replace({
        values: {
          IS_DEV_MODE: IS_DEV_MODE,
          __COMPONENT_ASSET_PREFIX__: IS_DEV_MODE
            ? '/build/'
            : process.env.COMPONENT_ASSETS_PATH,
          __CHART_COMPONENT_ASSET_PREFIX__: IS_DEV_MODE
            ? '/dist/genesys-chart-webcomponents/'
            : process.env.CHART_COMPONENT_ASSETS_PATH
        },
        preventAssignment: true
      }),
      dts()
    ],
    output: {
      file: `${FOLDER}/index.d.ts`,
      format: 'es'
    }
  }
];
