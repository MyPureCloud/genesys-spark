import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function newNonrandomE2EPage({
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

describe('gux-tabs', () => {
  it('renders', async () => {
    const html = `
      <gux-tabs id="interactive" lang="en">
        <gux-tab tab-id="1" tab-icon-name="lock">
          <span slot="title"> Hello World </span>
          <span slot="dropdown-options">
            <gux-tab-dropdown-option
              option-id="1"
              icon-name="edit"
              onclick="notify(event)"
            >
              Edit
            </gux-tab-dropdown-option>
            <gux-tab-dropdown-option
              option-id="2"
              icon-name="clone"
              onclick="notify(event)"
            >
              Clone
            </gux-tab-dropdown-option>
            <gux-tab-dropdown-option
              option-id="3"
              icon-name="share"
              onclick="notify(event)"
            >
              Share
            </gux-tab-dropdown-option>
            <gux-tab-dropdown-option
              option-id="4"
              icon-name="download"
              onclick="notify(event)"
            >
              Download
            </gux-tab-dropdown-option>
          </span>
        </gux-tab>

        <gux-tab tab-id="2" tab-icon-name="lock">
          <span slot="title"> Hello World 2 </span>
        </gux-tab>
      </gux-tabs>
    `;
    const page = await newNonrandomE2EPage({ html });
    const element = await page.find('gux-tabs');

    expect(element.innerHTML).toMatchSnapshot();
  });
});
