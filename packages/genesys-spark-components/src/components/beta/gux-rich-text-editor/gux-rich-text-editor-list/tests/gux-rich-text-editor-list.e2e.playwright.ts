import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rich-text-editor-list.common';

test.describe('gux-rich-text-editor-list', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-rich-text-editor-list'
  });
});
