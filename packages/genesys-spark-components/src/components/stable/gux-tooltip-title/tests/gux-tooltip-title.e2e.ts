import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-tooltip-title.common';

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

describe('gux-tooltip-title', () => {
  describe('#render', () => {
    renderConfigs.forEach((renderConfig, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html: renderConfig.html });
        const element = await page.find('gux-tooltip-title');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  it('should render a tooltip if the component text width is greater than the parent container', async () => {
    const page = await newNonrandomE2EPage({
      html: `
        <div style="max-width: 40px">
            <gux-tooltip-title>
                <span>
                <slot aria-hidden="true" onSlotchange={this.onSlotChange.bind(this)}>Some long text to truncate and use a tooltip</slot>
                </span>
            </gux-tooltip-title>
        </div>
    `
    });

    const tooltipElement = await page.find('pierce/gux-tooltip');
    expect(tooltipElement).toBeDefined();
  });

  it('should not render a tooltip if the component text width is less than the parent container', async () => {
    const page = await newNonrandomE2EPage({
      html: `
        <gux-tooltip-title>
            <span>Some short text</span>
        </gux-tooltip-title>
    `
    });

    const tooltipElement = await page.find('pierce/gux-tooltip');
    expect(tooltipElement).toBeNull();
  });

  it('should truncate title text if tooltip is rendered', async () => {
    const page = await newNonrandomE2EPage({
      html: `
        <div style="max-width: 40px">
            <gux-tooltip-title>
                <span>
                <slot aria-hidden="true" onSlotchange={this.onSlotChange.bind(this)}>Some long text to truncate and use a tooltip</slot>
                </span>
            </gux-tooltip-title>
        </div>
    `
    });

    const element = await page.find('gux-tooltip-title');
    expect(element).toHaveClass('gux-overflow-hidden');
  });

  it('Tooltip title text should match screenreader text if gux-icon is being used and no title text is set', async () => {
    const page = await newNonrandomE2EPage({
      html: `
        <div style="max-width: 40px">
            <gux-tooltip-title>
              <span>
                <gux-icon icon-name="unknown" decorative screenreader-text="test screenreader text"></gux-icon>
              </span>
            </gux-tooltip-title>
        </div>
    `
    });

    const tooltipElement = await page.find('gux-tooltip');
    expect(tooltipElement.innerText).toBe('test screenreader text');
  });
});
