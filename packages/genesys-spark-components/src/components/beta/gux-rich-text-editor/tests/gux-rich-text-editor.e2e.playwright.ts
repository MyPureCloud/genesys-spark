import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rich-text-editor.common';

test.describe('gux-rich-text-editor', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-rich-text-editor-beta'
  });
});
