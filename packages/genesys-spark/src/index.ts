// TODO: We'll need some domain wrangling here to ensure same-domain loading when
// possible. See stencil-wrapper.ts in the components for an example.
const CDN_URL = '';
const componentDeployPath = CDN_URL || 'http://localhost:3333/dist';

/**
 * Loads the spark webcomponents from a shared CDN
 * @returns a promise that succeeds if the component script loads successfully.
 */
export function registerSparkComponents() : Promise<void> {
    const scriptSrc = `${componentDeployPath}/genesys-webcomponents/genesys-webcomponents.esm.js`
    const existingTag = document.head.querySelector(`[src="${scriptSrc}"]`);
    if(!existingTag) {
        const styleTag = document.createElement('link');
        styleTag.setAttribute("href", `${componentDeployPath}/genesys-webcomponents/genesys-webcomponents.css`);
        styleTag.setAttribute("rel", "stylesheet");

        const scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "module");
        scriptTag.setAttribute("src", scriptSrc);
        const result = new Promise<void>((resolve, reject) => {
            scriptTag.addEventListener('load', () => {
                resolve();
            })
            scriptTag.addEventListener('error', () => {
                reject();
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