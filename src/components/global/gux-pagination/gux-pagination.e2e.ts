import { newE2EPage } from '@stencil/core/testing';
import { E2EGuxDropdown } from '../gux-dropdown/gux-dropdown.e2eelement';

describe('gux-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-pagination></gux-pagination>');
    const element = await page.find('gux-pagination');
    expect(element).toHaveClass('hydrated');
  });

  it('should update the display when paging back and forth', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-pagination total-items="152" current-page="2"></genesys-paginiation>'
    );

    const firstPageButton = await page.find('.first-page-button');
    const lastPageButton = await page.find('.last-page-button');
    const nextPageButton = await page.find('.next-page-button');
    const previousPageButton = await page.find('.previous-page-button');

    const display = await page.find('.pagination-item-counts-display');
    const itemCountDisplay = await page.find('.total-item-count');

    let text = (await display.textContent).trim();
    let itemTotalText = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('26 - 50');
    expect(itemTotalText).toBe('of 152');

    await firstPageButton.click();
    text = (await display.textContent).trim();
    itemTotalText = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('1 - 25');
    expect(itemTotalText).toBe('of 152');

    await nextPageButton.click();
    text = (await display.textContent).trim();
    itemTotalText = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('26 - 50');
    expect(itemTotalText).toBe('of 152');

    await lastPageButton.click();
    text = (await display.textContent).trim();
    itemTotalText = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('151 - 152');
    expect(itemTotalText).toBe('of 152');

    await previousPageButton.click();
    text = (await display.textContent).trim();
    itemTotalText = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('126 - 150');
    expect(itemTotalText).toBe('of 152');
  });

  it('should update the item counts when selecting a new items per page', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-pagination total-items="75" current-page="2"></genesys-paginiation>'
    );

    const display = await page.find('.pagination-item-counts-display');

    const dropdown = new E2EGuxDropdown(page, '.pagination-items-per-page');
    await dropdown.select('50');
    await page.waitForChanges();

    const text = (await display.textContent).trim();
    const itemCountDisplay = await page.find('.total-item-count');
    const itemTotalText = (await itemCountDisplay.textContent).trim();

    expect(text).toBe('51 - 75');
    expect(itemTotalText).toBe('of 75');
  });

  it('should update the current page if the new items per page selection make current page invalid', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-pagination total-items="75" current-page="2"></genesys-paginiation>'
    );

    const itemCountDisplay = await page.find('.pagination-item-counts-display');
    const currentPageInput = await page.find('.pagination-current-page-input');

    const dropdown = new E2EGuxDropdown(page, '.pagination-items-per-page');
    await dropdown.select('100');
    await page.waitForChanges();

    const text = (await itemCountDisplay.textContent).trim();
    const itemTotalDisplay = await page.find('.total-item-count');
    const itemTotalText = (await itemTotalDisplay.textContent).trim();

    expect(text).toBe('1 - 75');
    expect(itemTotalText).toBe('of 75');

    expect(await currentPageInput.getProperty('value')).toBe('1');
  });

  it('should hide the items per page dropdown if there are no items per page options', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-pagination></genesys-paginiation>');

    const component = await page.find('gux-pagination');
    await component.callMethod('setItemsPerPage', 30, []);
    await page.waitForChanges();

    const currentPageInput = await page.find('.pagination-items-per-page');
    expect(currentPageInput).toBeFalsy();
  });
});
