import { newSpecPage, SpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxInputSelect } from '../gux-input-select';

const components = [GuxInputSelect];
const language = 'en';

describe('gux-input-select', () => {
  let page: SpecPage;

  beforeEach(async () => {
    global.MutationObserver = MutationObserver;

    page = await newSpecPage({
      components,
      html: `
        <gux-input-select>
          <select slot="input">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </<gux-input-select>
      `,
      language
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxInputSelect);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
