import { newE2EPage } from '@stencil/core/testing';

describe('genesys-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-pagination></genesys-pagination>');
    const element = await page.find('genesys-pagination');
    expect(element).toHaveClass('hydrated');
  });

  it('should update the display when paging back and forth', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<genesys-pagination total-items="152" current-page="2"></genesys-paginiation>'
    );

    const firstPageButton = await page.find('.first-page-button');
    const lastPageButton = await page.find('.last-page-button');
    const nextPageButton = await page.find('.next-page-button');
    const previousPageButton = await page.find('.previous-page-button');

    const display = await page.find('.pagination-item-counts-display');

    let text = (await display.textContent).trim();
    expect(text).toBe('26 - 50 of 152');

    await firstPageButton.click();
    text = (await display.textContent).trim();
    expect(text).toBe('1 - 25 of 152');

    await nextPageButton.click();
    text = (await display.textContent).trim();
    expect(text).toBe('26 - 50 of 152');

    await lastPageButton.click();
    text = (await display.textContent).trim();
    expect(text).toBe('151 - 152 of 152');

    await previousPageButton.click();
    text = (await display.textContent).trim();
    expect(text).toBe('126 - 150 of 152');
  });

  it('should update the item counts when selecting a new items per page', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<genesys-pagination total-items="75" current-page="2"></genesys-paginiation>'
    );

    const display = await page.find('.pagination-item-counts-display');

    await page.select('.pagination-items-per-page', '50');
    await page.waitForChanges();

    const text = (await display.textContent).trim();
    expect(text).toBe('51 - 75 of 75');
  });

  it('should update the current page if the new items per page selection make current page invalid', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<genesys-pagination total-items="75" current-page="2"></genesys-paginiation>'
    );

    const itemCountDisplay = await page.find('.pagination-item-counts-display');
    const currentPageInput = await page.find('.pagination-current-page-input');

    await page.select('.pagination-items-per-page', '100');
    await page.waitForChanges();

    const text = (await itemCountDisplay.textContent).trim();
    expect(text).toBe('1 - 75 of 75');

    expect(await currentPageInput.getProperty('value')).toBe('1');
  });
});
