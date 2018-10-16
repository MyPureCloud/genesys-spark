import { configure, storiesOf } from '@storybook/polymer';

const req = require.context('../src/components', true, /story.tsx$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
configure(loadStories, module);