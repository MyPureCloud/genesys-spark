import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { GuxInputTextArea } from '../gux-input-textarea';

const components = [GuxInputTextArea];
const language = 'en';

describe('gux-input-textarea', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <gux-input-textarea>
          <textarea slot="input" type="test"></textarea>
        </gux-input-textarea>
      `,
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxInputTextArea);
  });

  describe('#render', () => {
    [
      '<gux-input-textarea><textarea slot="input" type="test"></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="none"><textarea slot="input" type="test"></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="manual"><textarea slot="input" type="test"></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="auto"><textarea slot="input" type="test"></textarea></gux-input-textarea>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
