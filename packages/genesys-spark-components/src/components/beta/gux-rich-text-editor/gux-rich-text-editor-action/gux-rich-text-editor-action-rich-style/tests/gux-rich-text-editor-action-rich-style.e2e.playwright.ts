import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rich-text-editor-action-rich-style.common';

test.describe('gux-rich-text-editor-action-rich-style', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-rich-text-editor-beta'
  });
});
