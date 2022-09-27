import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTimePickerBeta } from '../gux-time-picker';

const components = [GuxTimePickerBeta];
const html = `<gux-time-picker-beta value="09:00"></gux-time-picker-beta>`;
const language = 'en';

describe('gux-time-picker-beta', () => {
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

      expect(page.rootInstance).toBeInstanceOf(GuxTimePickerBeta);
      expect(page.root).toMatchSnapshot();
    });
  });
});
