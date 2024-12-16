import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';

describe('gux-rich-text-editor-list', () => {
  [
    `<gux-rich-text-editor-list>
      <gux-rich-style-list-item value="heading-1"><h1>Heading 1</h1></gux-rich-style-list-item>
      <gux-rich-style-list-item value="heading-2"><h2>Heading 2</h2></gux-rich-style-list-item>
      <gux-rich-style-list-item value="heading-3"><h3>Heading 3</h3></gux-rich-style-list-item>
      <gux-rich-style-list-item value="paragraph"><p>Paragraph</p></gux-rich-style-list-item>
    </gux-rich-text-editor-list>`
  ].forEach((html, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newSparkE2EPage({ html });

      const element = await page.find('gux-rich-text-editor-list');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
