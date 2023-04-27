'use strict';

const name = "genesys-spark-components";
const version = "3.81.7";
const description = "Common webcomponents";
const license = "MIT";
const main = "dist/stencil-wrapper.js";
const files = [
	"dist/"
];
const scripts = {
	build: "npm run clean && npm run i18n && npm run generate-gux-icon-types-file && npm run stencil && npm run build-wrapper",
	"build-i18n": "./scripts/build-i18n.js",
	"build-wrapper": "./scripts/wrap-stencil.js",
	"check-a11y": "node ./scripts/check-a11y.js",
	"check-readmes": "./scripts/check-readmes.sh",
	clean: "rm -r ./dist ./build || true",
	"current-version": "cross-var \"echo $npm_package_version\"",
	predev: "npm run i18n && npm run generate-gux-icon-types-file ",
	dev: "npm run stencil.dev",
	eslint: "eslint --fix .",
	"generate-gux-icon-types-file": "./scripts/generate-gux-icon-types-file.js",
	"generate-region-flags-sprite-file": "./scripts/generate-region-flags-sprite-file.js",
	"generate-start-of-week-file": "./scripts/generate-start-of-week-file.js",
	"generate-versions-file": "./scripts/generate-versions-file.mjs",
	i18n: "npm run update-en-i18n && npm run generate-start-of-week-file && npm run build-i18n",
	"lint-all": "npm-run-all \"eslint\" \"prettier\" \"prettier-package-json\" \"svgo\"",
	"lint-staged": "lint-staged",
	"list-checked-a11y-components": "node scripts/list-checked-a11y-components.js",
	"list-component-tracking": "./scripts/list-component-tracking.js",
	"list-i18n-files": "./scripts/list-i18n-files.js",
	"list-shadow-explicitly-set": "./scripts/list-shadow-explicitly-set.js",
	"predev.public": "npm run predev",
	prepare: "npm run i18n",
	prettier: "prettier --loglevel silent --ignore-unknown --write .",
	"prettier-package-json": "prettier-package-json --write ./package.json",
	release: "standard-version",
	stencil: "stencil build --prod",
	"stencil.dev": "stencil build --dev --watch --docs",
	stylelint: "stylelint --fix \"**/*.{css,html,less}\"",
	svgo: "svgo -f ./src/components/stable/gux-icon/icons",
	test: "TZ=UTC stencil test --spec --e2e",
	"test.ci": "TZ=UTC npm run test.ci.spec",
	"test.ci.e2e": "TZ=UTC stencil test --e2e --max-workers=1",
	"test.ci.spec": "TZ=UTC stencil test --spec",
	"test.e2e": "TZ=UTC stencil test --e2e",
	"test.e2e.update-snapshot": "TZ=UTC stencil test --e2e --updateSnapshot",
	"test.screenshot": "TZ=UTC stencil test --e2e --screenshot",
	"test.unit": "TZ=UTC stencil build dev && stencil test --spec",
	"test.unit.update-snapshot": "TZ=UTC stencil test --spec --updateSnapshot",
	"test.update-snapshot": "TZ=UTC stencil test --spec --e2e --updateSnapshot",
	"test.watch": "TZ=UTC stencil test --spec --e2e --watch",
	"update-en-i18n": "./scripts/update-en-i18n.js",
	"version-sync": "npm version --no-git-tag-version --allow-same-version"
};
const config = {
	commitizen: {
		path: "./node_modules/cz-conventional-changelog"
	}
};
const types = "dist/types/index.d.ts";
const dependencies = {
	"@floating-ui/dom": "^1.2.6",
	"@popperjs/core": "^2.11.7",
	"google-libphonenumber": "^3.2.32",
	"intl-messageformat": "^10.3.3",
	"requestanimationframe-timer": "^3.0.3",
	sortablejs: "^1.15.0",
	"stencil-click-outside": "^1.8.0",
	vega: "5.22.1",
	"vega-embed": "6.21.2",
	"vega-lite": "5.5.0"
};
const devDependencies = {
	"@babel/core": "^7.21.4",
	"@babel/preset-env": "^7.21.4",
	"@stencil/core": "^2.22.3",
	"@stencil/less": "^1.0.0",
	"@stencil/react-output-target": "^0.3.1",
	"@stencil/utils": "0.0.5",
	"@types/google-libphonenumber": "^7.4.23",
	"@types/jest": "^27.5.2",
	"@types/new-relic-browser": "^0.1118.2",
	"@types/puppeteer": "^5.4.7",
	"@types/resize-observer-browser": "^0.1.7",
	"@types/sortablejs": "^1.15.1",
	"@typescript-eslint/eslint-plugin": "^5.58.0",
	"@typescript-eslint/parser": "^5.58.0",
	"axe-core": "4.4.2",
	"axe-live": "^1.0.1",
	"babel-loader": "^8.3.0",
	"cross-var": "^1.1.0",
	eslint: "^8.38.0",
	"eslint-config-genesys-spark-components": "file:../../shared-configs/eslint-config-genesys-spark-components",
	"eslint-config-prettier": "^8.8.0",
	"file-loader": "^6.2.0",
	"genesys-spark-tokens": "file:../genesys-spark-tokens",
	glob: "^8.0.3",
	handlebars: "^4.7.7",
	inquirer: "^8.2.5",
	jest: "^27.5.1",
	"jest-cli": "^27.5.1",
	"jest-config": "^27.5.1",
	"jest-environment-node": "^27.5.1",
	"jest-junit": "^13.2.0",
	"jest-silent-reporter": "^0.5.0",
	jsdom: "^20.0.3",
	"lint-staged": "^13.2.1",
	marked: "^4.3.0",
	"mutation-observer": "^1.0.3",
	"node-fetch": "^3.3.1",
	"npm-run-all": "^4.1.5",
	"postcss-html": "^1.5.0",
	"postcss-less": "^6.0.0",
	prettier: "^2.8.7",
	"prettier-config-genesys-spark-components": "file:../../shared-configs/prettier-config-genesys-spark-components",
	"prettier-package-json": "^2.8.0",
	puppeteer: "^14.4.1",
	rollup: "^2.79.1",
	"rollup-plugin-copy": "^3.4.0",
	"rollup-plugin-less": "^1.1.3",
	"semver-sort": "^1.0.0",
	"spritesheet-templates": "^10.5.2",
	spritesmith: "^3.4.1",
	"standard-version": "^9.5.0",
	stylelint: "^14.16.1",
	"stylelint-config-genesys-spark-components": "file:../../shared-configs/stylelint-config-genesys-spark-components",
	"stylelint-config-html": "^1.1.0",
	"stylelint-config-prettier": "^9.0.5",
	"stylelint-config-recess-order": "^3.1.0",
	"stylelint-config-standard": "^25.0.0",
	svgo: "^2.8.0",
	"ts-loader": "^9.4.2",
	typescript: "^4.9.4",
	weekstart: "^1.1.0",
	xmldom: "^0.6.0"
};
const publishConfig = {
	registry: "https://registry.npmjs.org/"
};
const collection = "dist/collection/collection-manifest.json";
const prettier = "prettier-config-genesys-spark-components";
const volta = {
	node: "16.18.0"
};
const packageInfo = {
	name: name,
	version: version,
	description: description,
	license: license,
	main: main,
	files: files,
	scripts: scripts,
	config: config,
	types: types,
	dependencies: dependencies,
	devDependencies: devDependencies,
	publishConfig: publishConfig,
	collection: collection,
	prettier: prettier,
	"standard-version": {
	skip: {
		tag: true
	}
},
	volta: volta
};

// The number of actions to process every interval
const ACTION_BATCH_SIZE = 20;
const NR_LIMIT_INTERVAL = 30000; // 30s
/**
 * A queue of events that should be tracked by NewRelic.
 * We initialize it with the library version to make sure that's always reported.
 */
const actionQueue = [
  getVersionEvent(packageInfo.version)
];
/**
 * Process the next batch items in the queue, set a timeout to recur.
 * We use a recurring timeout instead of an interval because it guarantees
 * a minimum of NR_LMIT_INTERVAL between batches, even if the browser is
 * held up by processing elsewhere.
 */
function processActionQueue() {
  const newrelic = window.newrelic;
  if (!newrelic) {
    return;
  }
  for (let i = 0; i < ACTION_BATCH_SIZE; i++) {
    if (actionQueue.length == 0) {
      setTimeout(processActionQueue, NR_LIMIT_INTERVAL);
      return;
    }
    const action = actionQueue.shift();
    newrelic.addPageAction(action.name, Object.assign(Object.assign({}, action.metadata), { queueDepth: actionQueue.length }));
  }
  setTimeout(processActionQueue, NR_LIMIT_INTERVAL);
}
let trackingStarted = false;
/**
 * Begin action processing loop if it hasn't started.
 */
function ensureTracking() {
  if (!trackingStarted) {
    trackingStarted = true;
    processActionQueue();
  }
}
/**
 * Submits a component for tracking by NewRelic.
 */
function trackComponent(element, metadata) {
  if (!window.newrelic) {
    return;
  }
  ensureTracking();
  // Ignore components in the shadow DOM of another component
  // e.g. Only track components used directly by the app
  if (!document.contains(element)) {
    return;
  }
  actionQueue.push({
    name: 'spark-component',
    metadata: Object.assign(Object.assign({}, metadata), { component: element.tagName.toLowerCase(), version: packageInfo.version })
  });
}
function getVersionEvent(packageInfoVersion) {
  const [major, minor, ...patch] = packageInfoVersion.split('.');
  return {
    name: 'spark-library',
    metadata: {
      fullVersion: `${major}.${minor}.${patch.join('.')}`,
      majorVersion: major,
      minorVersion: `${major}.${minor}`
    }
  };
}

exports.trackComponent = trackComponent;
