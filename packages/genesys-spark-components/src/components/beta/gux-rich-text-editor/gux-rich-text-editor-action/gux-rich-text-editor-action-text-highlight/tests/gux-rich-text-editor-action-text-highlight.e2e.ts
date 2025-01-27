import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';

describe('gux-rich-text-editor-action-text-highlight', () => {
  describe('#render', () => {
    [
      `<gux-rich-text-editor-beta>
    <gux-rich-text-editor-action-group slot="text-styling">
    <gux-rich-text-editor-action-text-highlight>
      <gux-rich-highlight-list-item
        highlight="tomato"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="coral"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="pear"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="mango"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="raspberry"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="blueberry"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="mineral"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        highlight="islandaqua"
      ></gux-rich-highlight-list-item>
      <gux-rich-highlight-list-item
        class="custom-highlight"
        highlight="inherit"
      ></gux-rich-highlight-list-item>
    </gux-rich-text-editor-action-text-highlight>
    </gux-rich-text-editor-action-group>
    <div class="editorElement" slot="editor"></div>
  </gux-rich-text-editor-beta>`
    ].forEach((html, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find(
          'gux-rich-text-editor-action-text-highlight'
        );

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    ['disabled'].forEach(property => {
      it(`should be accessible when "${property}" is set`, async () => {
        const html = `<gux-rich-text-editor-action-text-highlight ${property}"></gux-rich-text-editor-action-text-highlight>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
