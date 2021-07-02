import { newSpecPage } from '@stencil/core/testing';
import { GuxInputRadio } from '../gux-input-radio';

describe('gux-input-radio', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [GuxInputRadio],
      html: `
      <gux-input-radio>
        <input slot="input" type="radio" name="dinner" value="sandwich" disabled>
        <label slot="label">Sandwich</label>
      </gux-input-radio>
      `,
      language: 'en'
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxInputRadio);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
