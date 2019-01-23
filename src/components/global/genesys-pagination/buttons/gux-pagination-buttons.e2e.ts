import { newE2EPage } from '@stencil/core/testing';

describe('gux-pagination-buttons', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-pagination-buttons></gux-pagination-buttons>'
    );
    const element = await page.find('gux-pagination-buttons');
    expect(element).toHaveClass('hydrated');
  });

  it('should update the current page when pressing the pagination buttons', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-pagination-buttons total-pages="10" current-page="2"></gux-pagination-buttons>'
    );

    const firstPageButton = await page.find('.first-page-button');
    const lastPageButton = await page.find('.last-page-button');
    const nextPageButton = await page.find('.next-page-button');
    const previousPageButton = await page.find('.previous-page-button');

    const currentPageInput = await page.find('input');
    expect(await currentPageInput.getProperty('value')).toBe('2');

    const pageChangedSpy = await page.spyOnEvent('currentPageChanged');

    await lastPageButton.click();
    expect(pageChangedSpy.lastEvent.detail).toBe(10);

    await firstPageButton.click();
    expect(pageChangedSpy.lastEvent.detail).toBe(1);

    await nextPageButton.click();
    expect(pageChangedSpy.lastEvent.detail).toBe(3);

    await previousPageButton.click();
    expect(pageChangedSpy.lastEvent.detail).toBe(1);
  });
});
