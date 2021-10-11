import { newSparkE2EPage } from '../../../../../tests/e2eTestUtils';
import { a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'aria-valid-attr',
    target: '.gux-header',
    exclusionReason: 'Will be addressed in COMUI-608 ticket'
  }
];

describe('gux-accordion', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-accordion></gux-accordion>`
    });
    const element = await page.find('gux-accordion');
    expect(element).toHaveClass('hydrated');
  });
  it('sets sections', async () => {
    const slots = ['First', 'Second', 'Third'];
    const page = await newSparkE2EPage({
      html: `
    <gux-accordion>
      <div slot="${slots[0]}">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
      <p slot="${slots[1]}">I'm a p.</p>
      <span slot="${slots[2]}">I'm a span.</span>
      <h1>I'm an h1, but i'm not a slot.</h1>
    </gux-accordion>
    `
    });
    const element = await page.find('gux-accordion');
    const sections = await element.findAll('gux-accordion section');
    expect(sections.length).toEqual(slots.length);
  });
  it('opens, closes section', async () => {
    const page = await newSparkE2EPage({
      html: `
    <gux-accordion>
      <div slot="First">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
    </gux-accordion>
    `
    });
    await a11yCheck(page, axeExclusions, 'before opening accoridon section');
    const element = await page.find('gux-accordion');
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
