jest.mock('../../../../utils/decorator/on-resize', () => ({
  __esModule: true,
  OnResize: jest.fn()
}));

import MutationObserver from 'mutation-observer';
import { newSpecPage } from '@stencil/core/testing';
import { GuxBlankState } from '../gux-blank-state';

const components = [GuxBlankState];
const language = 'en';

beforeEach(async () => {
  global.MutationObserver = MutationObserver;
});

describe('gux-blank-state', () => {
  it(`should render the component as expected`, async () => {
    const html = `
      <gux-blank-state>
        <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
        <div slot="primary-message">Sorry, something went wrong.</div>
        <div slot="additional-guidance">Please refresh this page to try again.</div>
        <button slot="call-to-action" type="button" onclick="notify(event)">Call to action</button>
      </gux-blank-state>`;
    const page = await newSpecPage({ components, language, html });

    expect(page.rootInstance).toBeInstanceOf(GuxBlankState);
    expect(page.root).toMatchSnapshot();
  });
});
