import { checkRenders } from '@test/specTestUtils';
import { GuxRichTextEditorActionRichStyle } from '../gux-rich-text-editor-action-rich-style';
import { renderConfigs } from './gux-rich-text-editor-action-rich-style.common';

const components = [GuxRichTextEditorActionRichStyle];

describe('gux-rich-text-editor-action-rich-style', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
