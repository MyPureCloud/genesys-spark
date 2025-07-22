import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rich-text-editor-action-link.common';

test.describe('gux-rich-text-editor-action-link', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-rich-text-editor-beta'
  });
});
