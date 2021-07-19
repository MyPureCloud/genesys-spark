import { newE2EPage } from '@stencil/core/testing';

describe('gux-radial-progress', () => {
  [
    '<gux-radial-progress lang-"en" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="123" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="200" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="test" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="-123" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="200" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="10" max="test" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="0" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="10" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="10" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
    '<gux-radial-progress lang-"en" value="10" max="10" screenreader-text="Uploading file"></gux-radial-progress>'
  ].forEach((content, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newE2EPage();

      await page.setContent(content);

      const element = await page.find('gux-radial-progress');

      expect(element.innerHTML).toMatchSnapshot();
    });
  });

  it('should render changes to the percentage data', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-radial-progress lang-"en" value="0" screenreader-text="Uploading file"></gux-radial-progress>'
    );

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
    const page = await newE2EPage();

    await page.setContent(
      '<gux-radial-progress lang-"en" value="0" screenreader-text="Uploading file"></gux-radial-progress>'
    );

    const progressbar = await page.find(
      'gux-radial-progress div[role="progressbar"]'
    );

    expect(progressbar.getAttribute('aria-label')).toEqual('Uploading file');
  });
});
