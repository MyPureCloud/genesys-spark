import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'

describe('genesys-tooltip', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent('<genesys-tooltip></genesys-tooltip>');
    element = await page.find('genesys-tooltip');
    expect(element).toHaveClass('hydrated');
  });
  it('shows/hides the tooltip', async () => {
    await page.setContent(`
    <div id="parent">
      <button>Button</button>
      <genesys-tooltip
        parent="parent"
        text='Tooltip content'>
      </genesys-tooltip>
    </div>
    <div id="dummy"></div>
    `);
    const parent = await page.find('#parent');
    const dummy = await page.find('#dummy');
    element = await page.find('genesys-tooltip div.genesys-tooltip');
    expect(element.classList.contains('shown')).toEqual(false);
    parent.hover();
    setTimeout(() => {
      expect(element.classList.contains('shown')).toEqual(true);
      dummy.hover();
      setTimeout(() => {
        expect(element.classList.contains('shown')).toEqual(false);
      }, 1300);
    }, 300);
  });
});
