import { newSpecPage } from '@test/specTestUtils';

import { GuxRichTextEditorList } from '../gux-rich-text-editor-list';

const components = [GuxRichTextEditorList];
const language = 'en';

describe('gux-rich-text-editor-list', () => {
  it('should build and render', async () => {
    const html = `
    <gux-rich-text-editor-list>
      <gux-rich-style-list-item value="heading-1"><h1>Heading 1</h1></gux-rich-style-list-item>
      <gux-rich-style-list-item value="heading-2"><h2>Heading 2</h2></gux-rich-style-list-item>
      <gux-rich-style-list-item value="heading-3"><h3>Heading 3</h3></gux-rich-style-list-item>
      <gux-rich-style-list-item value="paragraph"><p>Paragraph</p></gux-rich-style-list-item>
    </gux-rich-text-editor-list>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRichTextEditorList);
    expect(page.root).toMatchSnapshot();
  });
});
