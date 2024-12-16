import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

describe('gux-rich-text-editor-action-rich-style', () => {
  describe('#render', () => {
    [
      `<gux-rich-text-editor-beta>
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
</gux-rich-text-editor-beta>`
    ].forEach((html, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find(
          'gux-rich-text-editor-action-rich-style'
        );

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    ['disabled'].forEach(property => {
      it(`should be accessible when "${property}" is set`, async () => {
        const html = `<gux-rich-text-editor-action-rich-style ${property}"></gux-rich-text-editor-action-rich-style>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
