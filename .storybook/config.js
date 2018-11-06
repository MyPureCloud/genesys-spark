import { configure, storiesOf } from '@storybook/polymer';
import 'genesys-webcomponents';

const req = require.context('../src/components', true, /story.tsx$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
configure(loadStories, module);

// HMR interface
if (module.hot) {
  // Capture hot update
  module.hot.accept('genesys-webcomponents', () => {
    document.location.reload();
  });
}