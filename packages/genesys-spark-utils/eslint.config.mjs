import eslintConfigGenesysSparkComponents from '../../shared-configs/eslint-config-genesys-spark-components/index.mjs';

export default [
  ...eslintConfigGenesysSparkComponents,
  {
    ignores: ['dist/**', 'node_modules/**']
  }
]; 