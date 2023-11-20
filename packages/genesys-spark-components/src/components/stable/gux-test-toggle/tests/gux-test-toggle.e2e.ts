import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-test-toggle', () => {
  describe('#render', () => {
    [
      `<gux-test-toggle></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch"></gux-test-toggle>`,
      `<gux-test-toggle error></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" error></gux-test-toggle>`,
      `<gux-test-toggle disabled></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" disabled></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" message="Some helper text"></gux-test-toggle>`,
      `<gux-test-toggle message="Some helper text"></gux-test-toggle>`,
      `<gux-test-toggle message="Some helper text" error></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" message="Some helper text" error></gux-test-toggle>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-test-toggle');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  // describe('#interactions', () => {
  //   it('should emit toggleChecked if clicked', async () => {
  //     const html = `<gux-test-toggle></gux-test-toggle>`;
  //     const page = await newSparkE2EPage({ html });
  //     const element = await page.find('gux-toggle-test');
  //     const guxTestToggleSpan = await element.find(
  //       '.gux-test-toggle-slider span'
  //     );
  //     const toggleCheckedEventSpy = await page.spyOnEvent('togglChecked');

  //     await guxTestToggleSpan.click();
  //     await page.waitForChanges();
  //     expect(toggleCheckedEventSpy).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         detail: true
  //       })
  //     );
  //   });
  // });
});
