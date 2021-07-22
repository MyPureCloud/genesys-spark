import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('gux-dismiss-button-beta', () => {
  it('should build', async () => {
    const page = await newE2EPage({
      html: '<gux-dismiss-button-beta lang="en"></gux-dismiss-button-beta>'
    });

    const element = await page.find('gux-dismiss-button-beta');

    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    ['<gux-dismiss-button-beta lang="en"></gux-dismiss-button-beta>'].forEach(
      (html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newE2EPage({ html });
          const element = await page.find('gux-dismiss-button-beta');

          expect(element.innerHTML).toMatchSnapshot();
        });
      }
    );
  });
});
