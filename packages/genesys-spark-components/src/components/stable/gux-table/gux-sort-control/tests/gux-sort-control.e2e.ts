import { E2EPage, newE2EPage } from '@stencil/core/testing';

import { a11yCheck } from '../../../../../test/e2eTestUtils';

import markup from './gux-sort-control.markup';

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

describe('gux-sort-control', () => {
  describe('#render', () => {
    [
      markup.notSorted,
      markup.sortedAscending,
      markup.sortedDescending,
      markup.sortedDescendingUnsortedAllowed
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-sort-control');
        await a11yCheck(page);

        expect(element).toHaveAttribute('hydrated');
        expect(element.shadowRoot.innerHTML).toMatchSnapshot();
      });
    });
  });

  describe('#events', () => {
    describe('guxsortchanged', () => {
      [
        markup.notSorted,
        markup.sortedAscending,
        markup.sortedDescending,
        markup.sortedDescendingUnsortedAllowed
      ].forEach(({ description, html, onclickSortDirection }) => {
        it(description, async () => {
          const page = await newNonrandomE2EPage({ html });
          await page.waitForChanges();

          const guxsortchangedSpy = await page.spyOnEvent('guxsortchanged');

          const th = await page.find('th[data-column-name="c1"]');
          await th.click();

          expect(guxsortchangedSpy).toHaveFirstReceivedEventDetail({
            columnName: 'c1',
            sortDirection: onclickSortDirection
          });
        });
      });
    });
  });
});
