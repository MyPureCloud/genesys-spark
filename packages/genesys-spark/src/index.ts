import { getAssetsOrigin, getFontOrigin } from "./hosts";

const ASSET_PREFIX = "__ASSET_PREFIX__";
const SCRIPT_PATH = "genesys-webcomponents.esm.js";
const STYLE_PATH = "genesys-webcomponents.css";

const assetsOrigin = getAssetsOrigin();
const SCRIPT_SRC = `${assetsOrigin}${ASSET_PREFIX}${SCRIPT_PATH}`;
const STYLE_HREF = `${assetsOrigin}${ASSET_PREFIX}${STYLE_PATH}`;
const fontOrigin = getFontOrigin();
const FONT_STYLE_HREFS = [
    `${fontOrigin}/webfonts/urbanist.css`,
    `${fontOrigin}/webfonts/noto-sans.css`
]


/**
 * Loads the spark webcomponents from a shared CDN
 * @returns a promise that succeeds if the component script and styles
 * load successfully.
 */
export function registerSparkComponents() : Promise<void> {
    return Promise.all([
        checkAndLoadScript(SCRIPT_SRC),
        checkAndLoadStyle(STYLE_HREF),
        ...(FONT_STYLE_HREFS.map(checkAndLoadStyle))
    ]).then()
}

function checkAndLoadScript(scriptSrc: string): Promise<void> {
    const existingTag = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingTag) {
        return Promise.resolve();
    } else {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "module");
        scriptTag.setAttribute("src", scriptSrc);
        const result = new Promise<void>((resolve, reject) => {
            scriptTag.addEventListener('load', () => {
                resolve();
            })
            scriptTag.addEventListener('error', () => {
                reject(`Spark script failed to load: ${scriptSrc}`);
            })
        });  
        document.head.appendChild(scriptTag);
        return result;
    }
}

function checkAndLoadStyle(styleHref: string): Promise<void> {
    const existingTag = document.querySelector(`link[href="${styleHref}"]`);
    if (existingTag) {
        return Promise.resolve();
    } else {
        const styleTag = document.createElement('link');
        styleTag.setAttribute("href", styleHref);
        styleTag.setAttribute("rel", "stylesheet");
        const result = new Promise<void>((resolve, reject) => {
            styleTag.addEventListener('load', () => {
                resolve();
            })
            styleTag.addEventListener('error', () => {
                reject(`Spark styles failed to load: ${styleHref}`);
            })
        });  
        document.head.appendChild(styleTag);
        return result;
    }
}
// TODO: Build out utility functions where components aren't the right solution
// export function formatDate(...)