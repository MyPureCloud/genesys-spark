import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'aria-valid-attr',
    target: '.gux-header',
    exclusionReason: 'Violation is addressed in the stable accordion component'
  }
];

describe('gux-accordion-legacy', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-accordion-legacy></gux-accordion-legacy>`
    });
    const element = await page.find('gux-accordion-legacy');
    expect(element).toHaveAttribute('hydrated');
  });
  it('sets sections', async () => {
    const slots = ['First', 'Second', 'Third'];
    const page = await newSparkE2EPage({
      html: `
    <gux-accordion-legacy>
      <div slot="${slots[0]}">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
      <p slot="${slots[1]}">I'm a p.</p>
      <span slot="${slots[2]}">I'm a span.</span>
      <h1>I'm an h1, but i'm not a slot.</h1>
    </gux-accordion-legacy>
    `
    });
    const element = await page.find('gux-accordion-legacy');
    const sections = await element.findAll('gux-accordion-legacy section');
    expect(sections.length).toEqual(slots.length);
  });
  it('opens, closes section', async () => {
    const page = await newSparkE2EPage({
      html: `
    <gux-accordion-legacy>
      <div slot="First">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
    </gux-accordion-legacy>
    `
    });
    await a11yCheck(page, axeExclusions, 'before opening accoridon section');
    const element = await page.find('gux-accordion-legacy');
    const section = await element.find('.gux-section');
    const header = await section.find('.gux-header');
    expect(section.className).toEqual('gux-section');
    await header.click();
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions, 'after opening accoridon section');
    expect(section.className).toEqual('gux-section gux-opened');
    await header.click();
    await page.waitForChanges();
    expect(section.className).toEqual('gux-section');
  });
});
