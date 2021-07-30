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
  await page.setContent(`<div lang="en">${html}</div>`);
  await page.waitForChanges();

  return page;
}

describe('gux-radial-progress', () => {
  [
    '<gux-radial-progress lang="en" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="123" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="200" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="test" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="-123" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="200" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="test" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="0" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="10" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="10" screenreader-text="Uploading file"></gux-radial-progress>'
  ].forEach((html, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-radial-progress');

      expect(element.innerHTML).toMatchSnapshot();
    });
  });

  it('should render changes to the percentage data', async () => {
    const page = await newNonrandomE2EPage({
      html: '<gux-radial-progress value="0" screenreader-text="Uploading file"></gux-radial-progress>'
    });

    const element = await page.find('gux-radial-progress');

    expect(element.textContent).toEqual(`0%`);

    element.setProperty('value', 30);
    await page.waitForChanges();

    expect(element.textContent).toEqual(`30%`);

    element.setProperty('value', 100);
    await page.waitForChanges();

    expect(element.textContent).toEqual(`100%`);
  });

  it('should add an aria-label with the provided screenreader-text to the progressbar', async () => {
    const page = await newNonrandomE2EPage({
      html: '<gux-radial-progress value="0" screenreader-text="Uploading file"></gux-radial-progress>'
    });

    const progressbar = await page.find('[role="progressbar"]');

    expect(progressbar.getAttribute('aria-label')).toEqual('Uploading file');
  });
});
