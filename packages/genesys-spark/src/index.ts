import {
  getComponentAssetsOrigin,
  getChartComponentAssetsOrigin,
  getFontOrigin
} from './hosts';
import {
  checkAndLoadScript,
  checkAndLoadStyle,
  checkAndLoadFonts
} from './loading';

const COMPONENT_ASSET_PREFIX = '__COMPONENT_ASSET_PREFIX__';
const CHART_COMPONENT_ASSET_PREFIX = '__CHART_COMPONENT_ASSET_PREFIX__';

interface registerOptions {
  theme?: 'flare' | 'legacy';
}

/**
 * TODO
 */
export function loadSparkFonts(opts?: registerOptions): Promise<void> {
  const fontOrigin = getFontOrigin();
  const flareFonts = {
    Urbanist: `${fontOrigin}/webfonts/urbanist.css`,
    'Noto Sans': `${fontOrigin}/webfonts/noto-sans.css`
  };
  const legacyFonts = {
    Roboto: `${fontOrigin}/webfonts/roboto.css`
  };

  const FONTS = opts?.theme === 'legacy' ? legacyFonts : flareFonts;

  return checkAndLoadFonts(FONTS);
}

/**
 * Loads the spark web components, as well as required CSS and fonts from a
 * shared CDN. Performance can be optimized by pre-loading fonts in static HTML.
 *
 * @returns a promise that succeeds if the component script and styles
 * load successfully. It is not recommended to wait on this promise or to stop
 * application bootstrap if it rejects. Its primary use should be for logging
 * unexpected failures.
 */
export function registerSparkComponents(opts?: registerOptions): Promise<void> {
  const SCRIPT_PATH = 'genesys-webcomponents.esm.js';
  const STYLE_PATH = opts?.theme
    ? `genesys-webcomponents-${opts.theme}.css`
    : 'genesys-webcomponents.css';

  const assetsOrigin = getComponentAssetsOrigin();
  const SCRIPT_SRC = `${assetsOrigin}${COMPONENT_ASSET_PREFIX}${SCRIPT_PATH}`;
  const STYLE_HREF = `${assetsOrigin}${COMPONENT_ASSET_PREFIX}${STYLE_PATH}`;

  return Promise.all([
    checkAndLoadScript(SCRIPT_SRC),
    checkAndLoadStyle(STYLE_HREF),
    loadSparkFonts(opts)
  ]).then();
}

/**
 * TODO
 */
export function registerSparkChartComponents(): Promise<void> {
  const SCRIPT_PATH = 'genesys-chart-webcomponents.esm.js';

  const assetsOrigin = getChartComponentAssetsOrigin();
  const SCRIPT_SRC = `${assetsOrigin}${CHART_COMPONENT_ASSET_PREFIX}${SCRIPT_PATH}`;

  return Promise.all([checkAndLoadScript(SCRIPT_SRC)]).then();
}

// Re-export of utility modules
export * as Intl from './utils/intl';
