import { checkRenders } from '@test/specTestUtils';
import { GuxRichTextEditor } from '../gux-rich-text-editor-beta';
import { renderConfigs } from './gux-rich-text-editor.common';

const components = [GuxRichTextEditor];

describe('gux-rich-text-editor', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
