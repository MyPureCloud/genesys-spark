import { newE2EPage, E2EPage } from '@stencil/core/testing';

describe('genesys-pagination-item-counts', () => {
  let page: E2EPage;

  beforeEach(async () => (page = await newE2EPage()));

  it('renders', async () => {
    await page.setContent(
      '<genesys-pagination-item-counts></genesys-pagination-item-counts>'
    );

    const element = await page.find('genesys-pagination-item-counts');
    expect(element).toHaveClass('hydrated');
  });

  describe('when using the default items per page options', () => {
    it('should display the proper item counts', async () => {
      await page.setContent(
        '<genesys-pagination-item-counts total-items="127" current-page="5" ></genesys-pagination-item-counts>'
      );

      const itemCounts = await page.find('.pagination-item-counts-display');
      expect(itemCounts).toBeTruthy();

      const startCountIndex = itemCounts.textContent.indexOf('101');
      const endCountIndex = itemCounts.textContent.indexOf('125');
      const totalCountIndex = itemCounts.textContent.indexOf('127');

      expect(startCountIndex !== -1).toBe(true);
      expect(endCountIndex !== -1).toBe(true);
      expect(totalCountIndex !== -1).toBe(true);

      expect(startCountIndex).toBeLessThan(endCountIndex);
      expect(totalCountIndex).toBeGreaterThan(endCountIndex);
    });
  });
});
