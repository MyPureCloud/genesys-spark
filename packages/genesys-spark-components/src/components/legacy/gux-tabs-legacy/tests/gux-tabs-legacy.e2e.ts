import { E2EPage, newE2EPage } from '@stencil/core/testing';

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

describe('gux-tabs-legacy', () => {
  it('renders', async () => {
    const html = `
      <gux-tabs-legacy id="interactive" lang="en">
        <gux-tab-legacy tab-id="1" tab-icon-name="lock">
          <span slot="title"> Hello World </span>
          <span slot="dropdown-options">
            <gux-tab-dropdown-option-legacy
              option-id="1"
              icon-name="edit"
              onclick="notify(event)"
            >
              Edit
            </gux-tab-dropdown-option-legacy>
            <gux-tab-dropdown-option-legacy
              option-id="2"
              icon-name="clone"
              onclick="notify(event)"
            >
              Clone
            </gux-tab-dropdown-option-legacy>
            <gux-tab-dropdown-option-legacy
              option-id="3"
              icon-name="share"
              onclick="notify(event)"
            >
              Share
            </gux-tab-dropdown-option-legacy>
            <gux-tab-dropdown-option-legacy
              option-id="4"
              icon-name="download"
              onclick="notify(event)"
            >
              Download
            </gux-tab-dropdown-option-legacy>
          </span>
        </gux-tab>

        <gux-tab-legacy tab-id="2" tab-icon-name="lock">
          <span slot="title"> Hello World 2 </span>
        </gux-tab>
      </gux-tabs-legacy>
    `;
    const page = await newNonrandomE2EPage({ html });
    const element = await page.find('gux-tabs-legacy');

    expect(element.innerHTML).toMatchSnapshot();
  });
});
