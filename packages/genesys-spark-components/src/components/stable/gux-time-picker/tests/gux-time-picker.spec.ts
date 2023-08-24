import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTimePicker } from '../gux-time-picker';

const components = [GuxTimePicker];
const html = `<gux-time-picker value="09:00"></gux-time-picker>`;
const language = 'en';

describe('gux-time-picker', () => {
  beforeEach(() => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxTimePicker);
      expect(page.root).toMatchSnapshot();
    });
  });
});
