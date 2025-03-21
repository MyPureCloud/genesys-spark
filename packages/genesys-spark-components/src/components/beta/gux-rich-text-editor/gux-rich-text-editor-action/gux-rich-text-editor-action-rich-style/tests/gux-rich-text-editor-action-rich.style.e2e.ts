import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

const axeExclusions = [];

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

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
        const page = await newNonrandomE2EPage({ html });

        const element = await page.find(
          'gux-rich-text-editor-action-rich-style'
        );
        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
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
