const name = "genesys-spark-components";
const version = "3.69.1";
const description = "Common webcomponents";
const license = "MIT";
const main = "dist/stencil-wrapper.js";
const types = "dist/types/index.d.ts";
const collection = "dist/collection/collection-manifest.json";
const files = [
	"dist/"
];
const scripts = {
	build: "npm run clean && npm run i18n && npm run generate-gux-icon-types-file && npm run stencil && npm run docs && npm run build-wrapper",
	"build-wrapper": "./scripts/wrap-stencil.js",
	"build-i18n": "./scripts/build-i18n.js",
	"build:react": "cd ./common-webcomponents-react && npm run build",
	"check-a11y": "node scripts/check-a11y.js",
	"check-readmes": "./scripts/check-readmes.sh",
	clean: "rm -r ./dist || true",
	commit: "git-cz",
	"create-component": "node scripts/create-component.js",
	dev: "npx concurrently  \"npm run stencil.dev\" \"npm run docs.dev\"",
	"dev.public": "npx concurrently  \"npm run stencil.dev\" \"npm run docs.dev.public\"",
	docs: "cd ./docs && npm run build",
	"docs.dev": "cd ./docs && npm run start",
	"docs.dev.public": "cd ./docs && npm run start -- --host 0.0.0.0",
	format: "prettier \"./**/*.{ts,tsx,js,jsx,json,css,html,less}\"",
	"format.check": "npm run format -- --check",
	"format.fix": "npm run format -- --write",
	"generate-region-flags-sprite-file": "./scripts/generate-region-flags-sprite-file.js",
	"generate-start-of-week-file": "./scripts/generate-start-of-week-file.js",
	"generate-gux-icon-types-file": "./scripts/generate-gux-icon-types-file.js",
	"generate-versions-file": "./scripts/generate-versions-file.mjs",
	i18n: "npm run update-en-i18n && npm run generate-start-of-week-file && npm run build-i18n",
	lint: "npm run lint.commit && npm run lint.ts && npm run lint.css && npm run lint.svg",
	"lint.commit": "commitlint --from 30e62e0c73aa2f57776b8932e93750c04957b71f",
	"lint.css": "npx stylelint '**/*.{css,html,less}' --fix",
	"lint.fix": "npm run lint.commit && npm run lint.ts -- --fix && npm run lint.css -- --fix",
	"lint.svg": "svgo -f ./src/components/stable/gux-icon/icons",
	"lint.ts": "TIMING=1 eslint --ext .ts,.tsx ./src",
	"list-checked-a11y-components": "node scripts/list-checked-a11y-components.js",
	"list-component-tracking": "./scripts/list-component-tracking.js",
	"list-i18n-files": "./scripts/list-i18n-files.js",
	"list-shadow-explicitly-set": "./scripts/list-shadow-explicitly-set.js",
	predev: "npm run i18n && npm run generate-gux-icon-types-file ",
	"predev.public": "npm run predev",
	prepare: "./scripts/prepare-docs.sh && npm run i18n && husky install",
	release: "standard-version",
	stencil: "stencil build --prod",
	"stencil.dev": "stencil build --dev --watch --docs",
	test: "TZ=UTC stencil test --spec --e2e",
	"test.ci": "TZ=UTC npm run test.ci.spec && npm run test.ci.e2e",
	"test.ci.e2e": "TZ=UTC stencil test --e2e --max-workers=1",
	"test.ci.spec": "TZ=UTC stencil test --spec",
	"test.e2e": "TZ=UTC stencil test --e2e",
	"test.e2e.update-snapshot": "TZ=UTC stencil test --e2e --updateSnapshot",
	"test.screenshot": "TZ=UTC stencil test --e2e --screenshot",
	"test.unit": "TZ=UTC stencil build dev && stencil test --spec",
	"test.unit.update-snapshot": "TZ=UTC stencil test --spec --updateSnapshot",
	"test.update-snapshot": "TZ=UTC stencil test --spec --e2e --updateSnapshot",
	"test.watch": "TZ=UTC stencil test --spec --e2e --watch",
	"update-en-i18n": "./scripts/update-en-i18n.js"
};
const dependencies = {
	"@floating-ui/dom": "^1.1.0",
	"@popperjs/core": "^2.11.6",
	"google-libphonenumber": "^3.2.31",
	"intl-messageformat": "^10.2.5",
	"requestanimationframe-timer": "^3.0.3",
	sortablejs: "^1.15.0",
	"stencil-click-outside": "^1.8.0",
	vega: "^5.22.1",
	"vega-embed": "^6.21.0",
	"vega-lite": "5.5.0"
};
const devDependencies = {
	"@babel/core": "^7.20.12",
	"@babel/preset-env": "^7.20.2",
	"@commitlint/cli": "^17.4.1",
	"@commitlint/config-conventional": "^17.4.0",
	"@stencil/core": "^2.21.0",
	"@stencil/less": "^1.0.0",
	"@stencil/react-output-target": "^0.3.1",
	"@stencil/utils": "0.0.5",
	"@types/google-libphonenumber": "^7.4.23",
	"@types/jest": "^27.5.2",
	"@types/new-relic-browser": "^0.1118.2",
	"@types/puppeteer": "^5.4.7",
	"@types/resize-observer-browser": "^0.1.7",
	"@types/sortablejs": "^1.15.0",
	"@typescript-eslint/eslint-plugin": "^5.48.1",
	"@typescript-eslint/parser": "^5.48.1",
	"axe-core": "4.4.2",
	"axe-live": "^1.0.1",
	"babel-loader": "^8.3.0",
	commitizen: "^4.2.6",
	concurrently: "^7.6.0",
	"cz-conventional-changelog": "^3.3.0",
	eslint: "^8.31.0",
	"eslint-config-prettier": "^8.6.0",
	"eslint-plugin-jest": "^26.9.0",
	"eslint-plugin-jsdoc": "^39.6.4",
	"eslint-plugin-prefer-arrow": "^1.2.3",
	"eslint-plugin-prettier": "^4.2.1",
	"eslint-plugin-react": "^7.31.11",
	"file-loader": "^6.2.0",
	glob: "^8.0.3",
	handlebars: "^4.7.7",
	husky: "^8.0.3",
	inquirer: "^8.2.5",
	jest: "^27.5.1",
	"jest-cli": "^27.5.1",
	"jest-config": "^27.5.1",
	"jest-environment-node": "^27.5.1",
	"jest-junit": "^13.2.0",
	"jest-silent-reporter": "^0.5.0",
	jsdom: "^20.0.3",
	"lint-staged": "^13.1.0",
	marked: "^4.2.5",
	"mutation-observer": "^1.0.3",
	"node-fetch": "^3.3.0",
	"postcss-html": "^1.5.0",
	"postcss-less": "^6.0.0",
	prettier: "^2.8.2",
	puppeteer: "^14.4.1",
	rollup: "^2.79.1",
	"rollup-plugin-copy": "^3.4.0",
	"rollup-plugin-less": "^1.1.3",
	"semver-sort": "^1.0.0",
	"spritesheet-templates": "^10.5.2",
	spritesmith: "^3.4.0",
	"standard-version": "^9.5.0",
	stylelint: "^14.16.1",
	"stylelint-config-html": "^1.1.0",
	"stylelint-config-prettier": "^9.0.4",
	"stylelint-config-recess-order": "^3.1.0",
	"stylelint-config-standard": "^25.0.0",
	svgo: "^2.8.0",
	"ts-loader": "^9.4.2",
	typescript: "^4.9.4",
	weekstart: "^1.1.0",
	xmldom: "^0.6.0"
};
const config = {
	commitizen: {
		path: "./node_modules/cz-conventional-changelog"
	}
};
const volta = {
	node: "16.18.0"
};
const packageInfo = {
	name: name,
	version: version,
	description: description,
	license: license,
	main: main,
	types: types,
	collection: collection,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	config: config,
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
function trackAction(element, action, actionMetadata) {
  if (!window.newrelic) {
    return;
  }
  ensureTracking();
  actionQueue.push({
    name: 'spark-action',
    metadata: Object.assign(Object.assign({}, actionMetadata), { action, component: element.tagName.toLowerCase() })
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

export { trackComponent as t };
