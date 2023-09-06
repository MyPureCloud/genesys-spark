import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxSortControl } from '../gux-sort-control';

import markup from './gux-sort-control.markup';

const components = [GuxSortControl];
const language = 'en';

describe('gux-sort-control', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

  describe('#render', () => {
    [
      markup.notSorted,
      markup.sortedAscending,
      markup.sortedDescending,
      markup.sortedDescendingUnsortedAllowed
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
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
          const page = await newSpecPage({ components, html, language });
          await page.waitForChanges();

          const guxsortchangedSpy = jest.fn();
          page.win.addEventListener('guxsortchanged', guxsortchangedSpy);

          const sortControl = document.querySelector(
            'th[data-column-name="c1"] > gux-sort-control'
          );
          const sortButton = sortControl.shadowRoot.querySelector(
            'button.gux-sort-button'
          );
          sortButton.click();

          expect(guxsortchangedSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              detail: { columnName: 'c1', sortDirection: onclickSortDirection }
            })
          );
        });
      });
    });
  });
});
