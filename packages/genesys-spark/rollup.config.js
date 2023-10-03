import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const IS_DEV_MODE = (process.env.ROLLUP_WATCH === "true");

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist'
	},
    plugins: [
		replace({
			values: { 
				'IS_DEV_MODE': IS_DEV_MODE,
				'__ASSET_PREFIX__': IS_DEV_MODE ? '/dist/genesys-webcomponents/' : process.env.COMPONENT_ASSETS_PATH
			},
			preventAssignment: true
		}),
		typescript()
	]
};