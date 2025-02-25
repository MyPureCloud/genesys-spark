const DEFAULT_DOMAIN = "mypurecloud.com";
const NON_STANDARD_DOMAINS = [
  "inindca.com",
  "inintca.com",
  "mypurecloud.com.au",
  "mypurecloud.com",
  "mypurecloud.de",
  "mypurecloud.ie",
  "mypurecloud.jp"
  // 'use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP. It should fall back to the default domain.
];
function getComponentAssetsOrigin() {
  return getAssetsOrigin();
}
function getChartComponentAssetsOrigin() {
  return getAssetsOrigin();
}
function getAssetsOrigin() {
  const matchedDomain = getRegionDomain();
  return `https://app.${matchedDomain || DEFAULT_DOMAIN}`;
}
function getFontOrigin() {
  return getComponentAssetsOrigin();
}
function getRegionDomain() {
  const pageHost = window.location.hostname;
  if (pageHost.endsWith(".pure.cloud")) {
    return pageHost.split(".").slice(-3).join(".");
  }
  return NON_STANDARD_DOMAINS.find(
    (regionDomain) => pageHost.endsWith(regionDomain)
  );
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function checkAndLoadScript(scriptSrc) {
  const existingTag = document.querySelector(`script[src="${scriptSrc}"]`);
  if (existingTag) {
    return Promise.resolve();
  } else {
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "module");
    scriptTag.setAttribute("src", scriptSrc);
    const result = new Promise((resolve, reject) => {
      scriptTag.addEventListener("load", () => {
        resolve();
      });
      scriptTag.addEventListener("error", () => {
        reject(`Spark script failed to load: ${scriptSrc}`);
      });
    });
    document.head.appendChild(scriptTag);
    return result;
  }
}
function checkAndLoadStyle(styleHref) {
  const existingTag = document.querySelector(`link[href="${styleHref}"]`);
  if (existingTag) {
    return Promise.resolve();
  } else {
    const styleTag = document.createElement("link");
    styleTag.setAttribute("href", styleHref);
    styleTag.setAttribute("rel", "stylesheet");
    const result = new Promise((resolve, reject) => {
      styleTag.addEventListener("load", () => {
        resolve();
      });
      styleTag.addEventListener("error", () => {
        reject(`Spark styles failed to load: ${styleHref}`);
      });
    });
    document.head.appendChild(styleTag);
    return result;
  }
}
function checkAndLoadFonts(fonts) {
  const fontsToLoad = __spreadValues({}, fonts);
  document.fonts.forEach((fontFace) => {
    const normalizedFamily = fontFace.family.replace(/"/g, "");
    if (fontsToLoad[normalizedFamily]) {
      delete fontsToLoad[normalizedFamily];
    }
  });
  return Promise.all(
    Object.values(fontsToLoad).map((href) => {
      return checkAndLoadStyle(href).catch(() => {
        console.info(`genesys-spark: couldn't load font style ${href}`);
      });
    })
  ).then(() => {
  });
}

function getClosestElement(baseElement, selector) {
  function closest(element) {
    if (!element || element === document || element === window) {
      return null;
    }
    if (element.assignedSlot) {
      element = element.assignedSlot;
    }
    const found = element.closest(selector);
    return found ? found : closest(element.getRootNode().host);
  }
  return closest(baseElement);
}

function dateTimeFormat(localeOrOptions, options) {
  let locale = void 0;
  if (typeof localeOrOptions === "string") {
    locale = localeOrOptions;
  } else {
    options = localeOrOptions;
  }
  if (locale != void 0) {
    return new Intl.DateTimeFormat(locale, options);
  } else {
    const userLocale = determineDisplayLocale();
    return new Intl.DateTimeFormat(userLocale, options);
  }
}
function relativeTimeFormat(localeOrOptions, options) {
  let locale = void 0;
  if (typeof localeOrOptions === "string") {
    locale = localeOrOptions;
  } else {
    options = localeOrOptions;
  }
  if (locale != void 0) {
    return new Intl.RelativeTimeFormat(locale, options);
  } else {
    const userLocale = determineDisplayLocale();
    return new Intl.RelativeTimeFormat(userLocale, options);
  }
}
function determineDisplayLocale(element = document.body) {
  var _a;
  const domLocale = (_a = getClosestElement(element, "*[lang]")) == null ? void 0 : _a.lang;
  if (!domLocale || browserHasRegionData(domLocale)) {
    return navigator.language;
  } else {
    return domLocale;
  }
}
function browserHasRegionData(localeString) {
  var _a;
  return browserLocaleOverride(localeString) || localeString.length == 2 && ((_a = navigator.language) == null ? void 0 : _a.startsWith(`${localeString}-`));
}
function browserLocaleOverride(localeString) {
  var _a, _b;
  switch (localeString.toLowerCase()) {
    case "zh-cn":
      return Boolean((_a = navigator.language) == null ? void 0 : _a.toLowerCase().startsWith("zh-sg"));
    case "zh-tw":
      return Boolean((_b = navigator.language) == null ? void 0 : _b.toLowerCase().startsWith("zh-hk"));
    default:
      return false;
  }
}
function getFormat(locale) {
  const date = /* @__PURE__ */ new Date("July 5, 2000 15:00:00 UTC+00:00");
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  const dateTimeFormat2 = new Intl.DateTimeFormat(
    locale,
    options
  );
  const parts = dateTimeFormat2.formatToParts(date);
  const dateString = parts.map(({ type, value }) => {
    switch (type) {
      case "day":
        return `dd`;
      case "month":
        return `mm`;
      case "year":
        return `yyyy`;
      default:
        return value;
    }
  }).join("");
  return dateString.replace(/\s/g, "").replace(/‏/g, "");
}

var intl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  dateTimeFormat: dateTimeFormat,
  determineDisplayLocale: determineDisplayLocale,
  getFormat: getFormat,
  relativeTimeFormat: relativeTimeFormat
});

const COMPONENT_ASSET_PREFIX = "undefined";
const CHART_COMPONENT_ASSET_PREFIX = "undefined";
function loadSparkFonts(opts) {
  const fontOrigin = getFontOrigin();
  const flareFonts = {
    Urbanist: `${fontOrigin}/webfonts/urbanist.css`,
    "Noto Sans": `${fontOrigin}/webfonts/noto-sans.css`
  };
  const legacyFonts = {
    Roboto: `${fontOrigin}/webfonts/roboto.css`
  };
  const FONTS = (opts == null ? void 0 : opts.theme) === "legacy" ? legacyFonts : flareFonts;
  return checkAndLoadFonts(FONTS);
}
function registerSparkComponents(opts) {
  const SCRIPT_PATH = "genesys-webcomponents.esm.js";
  const STYLE_PATH = (opts == null ? void 0 : opts.theme) === "legacy" ? `genesys-webcomponents-${opts.theme}.css` : "genesys-webcomponents.css";
  const assetsOrigin = getComponentAssetsOrigin();
  let assetsUrl = `${assetsOrigin}${COMPONENT_ASSET_PREFIX}`;
  if (opts == null ? void 0 : opts.assetsUrl) {
    assetsUrl = opts.assetsUrl;
    if (!assetsUrl.endsWith("/")) {
      assetsUrl += "/";
    }
  }
  const SCRIPT_SRC = `${assetsUrl}${SCRIPT_PATH}`;
  const STYLE_HREF = `${assetsUrl}${STYLE_PATH}`;
  return Promise.all([
    checkAndLoadScript(SCRIPT_SRC),
    checkAndLoadStyle(STYLE_HREF),
    loadSparkFonts(opts)
  ]).then();
}
function registerSparkChartComponents(opts) {
  const SCRIPT_PATH = "genesys-chart-webcomponents.esm.js";
  const assetsOrigin = getChartComponentAssetsOrigin();
  let assetsUrl = `${assetsOrigin}${CHART_COMPONENT_ASSET_PREFIX}`;
  if (opts == null ? void 0 : opts.assetsUrl) {
    assetsUrl = opts.assetsUrl;
    if (!assetsUrl.endsWith("/")) {
      assetsUrl += "/";
    }
  }
  const SCRIPT_SRC = `${assetsUrl}${SCRIPT_PATH}`;
  return Promise.all([checkAndLoadScript(SCRIPT_SRC)]).then();
}

export { intl as Intl, loadSparkFonts, registerSparkChartComponents, registerSparkComponents };
