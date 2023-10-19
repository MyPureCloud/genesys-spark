import { getAssetsOrigin, getFontOrigin } from "./hosts";
import { checkAndLoadScript, checkAndLoadStyle, checkAndLoadFonts } from "./loading";

const ASSET_PREFIX = "__ASSET_PREFIX__";
const SCRIPT_PATH = "genesys-webcomponents.esm.js";
const STYLE_PATH = "genesys-webcomponents.css";

const assetsOrigin = getAssetsOrigin();
const SCRIPT_SRC = `${assetsOrigin}${ASSET_PREFIX}${SCRIPT_PATH}`;
const STYLE_HREF = `${assetsOrigin}${ASSET_PREFIX}${STYLE_PATH}`;
const fontOrigin = getFontOrigin();
const FONTS = {
    "Urbanist": `${fontOrigin}/webfonts/urbanist.css`,
    "Noto Sans": `${fontOrigin}/webfonts/noto-sans.css`
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
export function registerSparkComponents() : Promise<void> {
    return Promise.all([
        checkAndLoadScript(SCRIPT_SRC),
        checkAndLoadStyle(STYLE_HREF),
        checkAndLoadFonts(FONTS)
    ]).then()
}


// TODO: Build out utility functions where components aren't the right solution
// export function formatDate(...)

