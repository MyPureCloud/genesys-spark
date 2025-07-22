import { checkRenders } from '@test/specTestUtils';
import { GuxRichTextEditorActionLink } from '../gux-rich-text-editor-action-link';
import { renderConfigs } from './gux-rich-text-editor-action-link.common';

const components = [GuxRichTextEditorActionLink];

describe('gux-rich-text-editor-action-link', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
