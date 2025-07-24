import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rich-text-editor-action-text-highlight.common';

test.describe('gux-rich-text-editor-action-text-highlight', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-rich-text-editor-beta'
  });
});
