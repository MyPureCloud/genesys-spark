import { newE2EPage } from '@stencil/core/testing';

describe('gux-radial-progress', () => {
  [
    '<gux-radial-progress></gux-radial-progress>',
    '<gux-radial-progress value="123"></gux-radial-progress>',
    '<gux-radial-progress value="200"></gux-radial-progress>',
    '<gux-radial-progress value="test" max="100"></gux-radial-progress>',
    '<gux-radial-progress value="-123" max="100"></gux-radial-progress>',
    '<gux-radial-progress value="200" max="100"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="test"></gux-radial-progress>',
    '<gux-radial-progress value="0"></gux-radial-progress>',
    '<gux-radial-progress value="10"></gux-radial-progress>',
    '<gux-radial-progress value="100"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="100"></gux-radial-progress>',
    '<gux-radial-progress value="10" max="10"></gux-radial-progress>'
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
      '<gux-radial-progress value="0"></gux-radial-progress>'
    );

    const element = await page.find('gux-radial-progress');

    const progressSvg = await page.find('gux-radial-progress svg');

    expect(progressSvg.textContent).toEqual(`0%`);

    element.setProperty('value', 30);

    await page.waitForChanges();

    expect(progressSvg.textContent).toEqual(`30%`);

    element.setProperty('value', 100);

    await page.waitForChanges();

    expect(progressSvg.textContent).toEqual(`100%`);
  });

  it('should communicate loading progress to assistive technologies', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-radial-progress value="0"></gux-radial-progress>'
    );

    const element = await page.find('gux-radial-progress');

    const srText = await page.find('gux-radial-progress .gux-progress-alert');

    expect(srText.textContent).toEqual(`0%`);

    element.setProperty('value', 30);

    await page.waitForChanges();

    expect(srText.textContent).toEqual(`30%`);

    element.setProperty('value', 100);

    await page.waitForChanges();

    expect(srText.textContent).toEqual(`100%`);
  });
});
