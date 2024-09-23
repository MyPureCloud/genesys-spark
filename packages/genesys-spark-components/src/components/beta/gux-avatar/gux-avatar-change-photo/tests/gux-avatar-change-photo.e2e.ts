import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';

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

describe('gux-avatar', () => {
  describe('#render', () => {
    describe('#render', () => {
      [
        `<gux-avatar-change-photo-beta>
          <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
        </gux-avatar-change-photo-beta>`
      ].forEach((html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-avatar-change-photo-beta');

          expect(element.outerHTML).toMatchSnapshot();
        });

        it(`should be accessible (${index + 1})`, async () => {
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page, axeExclusions);
        });
      });
    });
  });
});
