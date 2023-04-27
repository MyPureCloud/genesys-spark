import packageInfo from '../../../package.json';
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
export function trackComponent(element, metadata) {
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
export function trackAction(element, action, actionMetadata) {
  if (!window.newrelic) {
    return;
  }
  ensureTracking();
  actionQueue.push({
    name: 'spark-action',
    metadata: Object.assign(Object.assign({}, actionMetadata), { action, component: element.tagName.toLowerCase() })
  });
}
export function getVersionEvent(packageInfoVersion) {
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
