import { getAssetsHost } from "./hosts";

const ASSET_PREFIX = "__ASSET_PREFIX__";
const SCRIPT_PATH = "genesys-webcomponents.esm.js";
const STYLE_PATH = "genesys-webcomponents.css";

const scriptSrc = `https://${getAssetsHost()}${ASSET_PREFIX}${SCRIPT_PATH}`;
const styleHref = `https://${getAssetsHost()}${ASSET_PREFIX}${STYLE_PATH}`;


/**
 * Loads the spark webcomponents from a shared CDN
 * @returns a promise that succeeds if the component script loads successfully.
 */
export function registerSparkComponents() : Promise<void> {
    const existingTag = document.head.querySelector(`[src="${scriptSrc}"]`);
    if(!existingTag) {
        const styleTag = document.createElement('link');
        styleTag.setAttribute("href", styleHref);
        styleTag.setAttribute("rel", "stylesheet");

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

        document.head.appendChild(styleTag);
        document.head.appendChild(scriptTag);
        return result;
    } else {
        return Promise.resolve();
    }
}

// TODO: Build out utility functions where components aren't the right solution
// export function formatDate(...)