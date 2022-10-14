import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../../tests/e2eTestUtils';

async function newNonrandomE2EPage(
  {
    html
  }: {
    html: string;
  },
  lang: string = 'en'
): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(`<div lang=${lang}>${html}</div>`);
  await page.waitForChanges();
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-truncate', () => {
  describe('#render', () => {
    [
      '<gux-truncate-beta style="width: 40px">Some text to truncate</gux-truncate-beta>',
      '<gux-truncate-beta style="width: 40px"><span>Some text to truncate in a span</span></gux-truncate-beta>',
      '<gux-truncate-beta style="width: 40px"><div>Div <span>with a span</span> inside</div></gux-truncate-beta>',
      '<gux-truncate-beta style="width: 40px" max-lines="3">This is a long text that should be truncated after three lines of wrapped text</gux-truncate-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-truncate-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
