import { newE2EPage } from '@stencil/core/testing';

describe('gux-input-textarea', () => {
  it('renders', async () => {
    const html = `
      <gux-input-textarea lang="en">
        <textarea slot="input" type="test"></textarea>
      </gux-input-textarea>
    `;
    const page = await newE2EPage({ html });
    const element = await page.find('gux-input-textarea');

    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-input-textarea><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="none"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="manual"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="auto"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="auto"><textarea type="text" slot="input"/>Test</textarea></gux-input-textarea>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage({ html });

        const element = await page.find('gux-input-textarea');

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
