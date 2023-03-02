import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-dismiss-button', () => {
  it('should build', async () => {
    const page = await newSparkE2EPage({
      html: '<gux-dismiss-button lang="en"></gux-dismiss-button>'
    });

    const element = await page.find('gux-dismiss-button');

    expect(element).toHaveAttribute('hydrated');
  });

  describe('#render', () => {
    ['<gux-dismiss-button lang="en"></gux-dismiss-button>'].forEach(
      (html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSparkE2EPage({ html });
          const element = await page.find('gux-dismiss-button');
          await a11yCheck(page);
          expect(element.innerHTML).toMatchSnapshot();
        });
      }
    );
  });
});
