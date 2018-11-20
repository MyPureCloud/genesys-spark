import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('genesys-accordion', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent(`
    <genesys-accordion></genesys-accordion>
    `);
    element = await page.find('genesys-accordion');
    expect(element).toHaveClass('hydrated');
  });
  it('sets sections', async () => {
    const slots = ['First', 'Second', 'Third'];
    await page.setContent(`
    <genesys-accordion>
      <div slot="${slots[0]}">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
      <p slot="${slots[1]}">I'm a p.</p>
      <span slot="${slots[2]}">I'm a span.</span>
      <h1>I'm an h1, but i'm not a slot.</h1>
    </genesys-accordion>
    `);
    element = await page.find('genesys-accordion');
    const sections = await element.findAll('genesys-accordion li');
    expect(sections.length).toEqual(slots.length);
  });
  it('opens, closes section', async () => {
    await page.setContent(`
    <genesys-accordion>
      <div slot="First">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
    </genesys-accordion>
    `);
    element = await page.find('genesys-accordion');
    const section = await element.find('genesys-accordion li');
    const header = await section.find('.header');
    expect(section.className).toEqual('section');
    header.click();
    await page.waitForChanges();
    expect(section.className).toEqual('section opened');
    header.click();
    await page.waitForChanges();
    expect(section.className).toEqual('section');
  });
});
