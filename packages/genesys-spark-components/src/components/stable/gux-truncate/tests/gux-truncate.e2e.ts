import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

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
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-truncate', () => {
  describe('#render', () => {
    [
      '<gux-truncate style="width: 40px">Some text to truncate</gux-truncate>',
      '<gux-truncate style="width: 40px"><span>Some text to truncate in a span</span></gux-truncate>',
      '<gux-truncate style="width: 40px"><div>Div <span>with a span</span> inside</div></gux-truncate>',
      '<gux-truncate style="width: 40px" max-lines="3">This is a long text that should be truncated after three lines of wrapped text</gux-truncate>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-truncate');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  it('should truncate text if the component text width is greater than the parent container', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-truncate style="width: 40px">
        <div>Div <span>with a span</span> inside</div>
      </gux-truncate>
    `
    });

    const element = await page.find('pierce/.gux-truncate-slot-container');
    expect(element).toHaveClass('gux-overflow-hidden');
  });

  it('should not truncate text if the component text width is less than the parent container', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-truncate style="width: 400px">
        <div>Div <span>with a span</span> inside</div>
      </gux-truncate>
    `
    });

    const element = await page.find('pierce/.gux-truncate-slot-container');
    expect(element.classList.contains('gux-overflow-hidden')).toBe(false);
  });

  it('should truncate text after 3 lines of wrapped text', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-truncate max-lines="3">
        <div>This is a long text that should be truncated after three lines of wrapped text</div>
      </gux-truncate>
    `
    });

    const truncateMultiContainer = await page.find(
      'pierce/.gux-truncate-multi-line'
    );
    expect(truncateMultiContainer).toBeDefined();
  });

  it('should not truncate wrapped text if max-lines attribute is not defined on the gux-truncate tag', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-truncate>
        <div>This is a long text that should not be truncated</div>
      </gux-truncate>
    `
    });

    const truncateContainer = await page.find(
      'pierce/.gux-truncate-multi-line'
    );
    expect(truncateContainer).toBeNull();
  });
});
