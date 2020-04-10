import * as componentViewer from './component-viewer/app.js';
import * as componentListing from './component-listing/app.js';
import './styles/component-listing.less';
import './styles/component-viewer.less';

import 'genesys-webcomponents';

window.webcomponentsDocsMain = (example = '', renderCallback = () => {}) =>
  componentViewer.bootstrap(example.trim(), renderCallback);

window.frameManagerMain = () => componentListing.bootstrap();
