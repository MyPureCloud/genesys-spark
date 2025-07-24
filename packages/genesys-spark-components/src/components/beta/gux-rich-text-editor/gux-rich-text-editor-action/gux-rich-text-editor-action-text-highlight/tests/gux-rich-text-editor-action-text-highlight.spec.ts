import { checkRenders } from '@test/specTestUtils';
import { GuxRichTextEditorActionTextHighlight } from '../gux-rich-text-editor-action-text-highlight';
import { renderConfigs } from './gux-rich-text-editor-action-text-highlight.common';

const components = [GuxRichTextEditorActionTextHighlight];

describe('gux-rich-text-editor-action-text-highlight', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
