import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

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

describe('gux-form', () => {
  describe('#render', () => {
    [
      `
      <gux-skip-navigation-list>
        <gux-skip-navigation-item>
          <a href="#" onclick="notify(event)">Navigation Link 1</a>
        </gux-skip-navigation-item>
        <gux-skip-navigation-item>
          <a href="#" onclick="notify(event)">Navigation Link 2 that is long</a>
        </gux-skip-navigation-item>
        <gux-skip-navigation-item>
          <a href="#" onclick="notify(event)">Navigation Link 3</a>
        </gux-skip-navigation-item>
        <gux-skip-navigation-item>
          <a href="#" onclick="notify(event)">Link 4</a>
        </gux-skip-navigation-item>
      </gux-skip-navigation-list>
    `
    ].forEach((html, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-skip-navigation-list');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it('should be accessible', async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
