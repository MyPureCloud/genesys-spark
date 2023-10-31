/**
 * Add a script tag to the document if it is not already present.
 * @param scriptSrc The src attribute of the script
 * @returns a promise that resolves if the script loads or is already present
 */
export function checkAndLoadScript(scriptSrc: string): Promise<void> {
  const existingTag = document.querySelector(`script[src="${scriptSrc}"]`);
  if (existingTag) {
    return Promise.resolve();
  } else {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'module');
    scriptTag.setAttribute('src', scriptSrc);
    const result = new Promise<void>((resolve, reject) => {
      scriptTag.addEventListener('load', () => {
        resolve();
      });
      scriptTag.addEventListener('error', () => {
        reject(`Spark script failed to load: ${scriptSrc}`);
      });
    });
    document.head.appendChild(scriptTag);
    return result;
  }
}

/**
 * Add a stylesheet link tag to the document if it is not already present.
 * @param styleHref The href attribute of the stylesheet
 * @returns a promise that resolves if the style loads or is already present
 */
export function checkAndLoadStyle(styleHref: string): Promise<void> {
  const existingTag = document.querySelector(`link[href="${styleHref}"]`);
  if (existingTag) {
    return Promise.resolve();
  } else {
    const styleTag = document.createElement('link');
    styleTag.setAttribute('href', styleHref);
    styleTag.setAttribute('rel', 'stylesheet');
    const result = new Promise<void>((resolve, reject) => {
      styleTag.addEventListener('load', () => {
        resolve();
      });
      styleTag.addEventListener('error', () => {
        reject(`Spark styles failed to load: ${styleHref}`);
      });
    });
    document.head.appendChild(styleTag);
    return result;
  }
}

/**
 * Given an object that maps font-family identifiers to CSS urls e.g:
 * {
 *   "Urbanist": "/urbanist.css",
 *   "Noto Sans": "/noto-sans.css"
 * }
 * This function checks for loaded fonts with those identifiers. If a font is
 * not found, the corresponding stylesheet is added to the document.
 * @param fonts An object mapping font-family identifiers to CSS file urls
 * @returns A promise that resolves once the script tags has finished loading.
 * It does not fail if the script tags fail to load because we don't want to fail
 * the whole component loading process in that situation.
 */
export function checkAndLoadFonts(fonts: {
  [key: string]: string;
}): Promise<void> {
  const fontsToLoad = { ...fonts }; //clone our input so we can safely mutate it.

  document.fonts.forEach(fontFace => {
    // If the family is defined with quotes in CSS (e.g. `font-family: "Noto Sans"),
    // those quotes may be preserved JS, depending on the browser.
    const normalizedFamily = fontFace.family.replace(/"/g, '');
    if (fontsToLoad[normalizedFamily]) {
      // remove the font from the set to load
      delete fontsToLoad[normalizedFamily];
    }
  });

  return Promise.all(
    Object.values(fontsToLoad).map(href => {
      return checkAndLoadStyle(href).catch(() => {
        // Don't fail loading process for fonts, since the components
        // should still be reasonably usable.
        console.info(`genesys-spark: couldn't load font style ${href}`);
      });
    })
  ).then(() => {}); // flatten the promise array
}
