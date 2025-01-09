import { newSpecPage } from '@test/specTestUtils';

import { GuxRichTextEditorActionLink } from '../gux-rich-text-editor-action-link';

const components = [GuxRichTextEditorActionLink];
const language = 'en';

describe('gux-rich-text-editor-action-link', () => {
  it('should build and render', async () => {
    const html = `
  <gux-rich-text-editor-beta>
  <gux-rich-text-editor-action-group slot="inserting">
    <gux-rich-text-editor-action-link></gux-rich-text-editor-action-link>
  </gux-rich-text-editor-action-group>
  <div class="editorElement" slot="editor"></div>
</gux-rich-text-editor-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRichTextEditorActionLink);
    expect(page.root).toMatchSnapshot();
  });
});
