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

    expect(element.textContent).toEqual(`0%`);

    element.setProperty('value', 30);

    await page.waitForChanges();

    expect(element.textContent).toEqual(`30%`);

    element.setProperty('value', 100);

    await page.waitForChanges();

    expect(element.textContent).toEqual(`100%`);
  });
});
