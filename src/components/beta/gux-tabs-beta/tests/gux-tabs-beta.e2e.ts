import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function mockRandomForE2ESnapshot({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-tabs-beta', () => {
  it('renders', async () => {
    const html = `
    <gux-tabs-beta lang="en">
      <gux-tab-list-beta slot="tab-list">
          <gux-tab-beta tab-id="2-1"><span>Tab Header 1</span></gux-tab-beta>
          <gux-tab-beta tab-id="2-2"><span>Tab Header 2</span></gux-tab-beta>
          <gux-tab-beta tab-id="2-3"><span>Tab Header 3</span></gux-tab-beta>
          <gux-tab-beta gux-disabled tab-id="2-4"
            ><span>Tab Header 4</span></gux-tab-beta
          >
          <gux-tab-beta gux-disabled tab-id="2-5"
            ><span>Tab Header 5</span></gux-tab-beta
          >
      </gux-tab-list-beta>
      <gux-tab-panel-beta tab-id="2-1">Tab content 1</gux-tab-panel-beta>
      <gux-tab-panel-beta tab-id="2-2">Tab content 2</gux-tab-panel-beta>
      <gux-tab-panel-beta tab-id="2-3">Tab content 3</gux-tab-panel-beta>
      <gux-tab-panel-beta tab-id="2-4">Tab content 4</gux-tab-panel-beta>
      <gux-tab-panel-beta tab-id="2-5">Tab content 5</gux-tab-panel-beta>
    </gux-tabs-beta>
    `;
    const page = await mockRandomForE2ESnapshot({ html });
    const element = await page.find('gux-tabs-beta');

    expect(element.outerHTML).toMatchSnapshot();
  });
});
