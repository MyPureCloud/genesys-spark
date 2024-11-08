import { newSpecPage } from '@test/specTestUtils';

import { GuxRichTextEditorActionRichStyle } from '../gux-rich-text-editor-action-rich-style';

const components = [GuxRichTextEditorActionRichStyle];
const language = 'en';

describe('gux-rich-text-editor-action-rich-style', () => {
  it('should build and render', async () => {
    const html = `
  <gux-rich-text-editor-beta>
  <gux-rich-text-editor-action-group slot="text-styling">
    <gux-rich-text-editor-action-rich-style>
      <gux-rich-style-list-item text-style="heading-1"
        >Heading 1</gux-rich-style-list-item
      >
      <gux-rich-style-list-item text-style="heading-2"
        >Heading 2</gux-rich-style-list-item
      >
      <gux-rich-style-list-item text-style="heading-3"
        >Heading 3</gux-rich-style-list-item
      >
      <gux-rich-style-list-item text-style="paragraph"
        >Paragraph</gux-rich-style-list-item
      >
    </gux-rich-text-editor-action-rich-style>
  </gux-rich-text-editor-action-group>
  <div class="editorElement" slot="editor"></div>
</gux-rich-text-editor-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRichTextEditorActionRichStyle);
    expect(page.root).toMatchSnapshot();
  });
});
