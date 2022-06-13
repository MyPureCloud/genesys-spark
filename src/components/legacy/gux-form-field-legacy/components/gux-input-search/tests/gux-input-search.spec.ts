import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxInputSearch } from '../gux-input-search';

global.InputEvent = Event;

const components = [GuxInputSearch];
const language = 'en';

describe('gux-input-search', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <gux-input-search>
          <input name="search" type="search" />
        </gux-input-search>`,
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxInputSearch);
  });

  describe('#render', () => {
    [
      `<gux-input-search>
        <input name="search" type="search" placeholder="Enter a search" />
      </gux-input-search>`,
      `<gux-input-search>
        <input name="search" type="search" placeholder="Enter a search" value="test" />
      </gux-input-search>`,
      `<gux-input-search>
        <input name="search" type="search" placeholder="Enter a search" disabled/>
      </gux-input-search>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
