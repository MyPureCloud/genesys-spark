import { newSpecPage } from '@stencil/core/testing';
import { GuxInputTextLikeBeta } from '../gux-input-text-like-beta';

const components = [GuxInputTextLikeBeta];
const language = 'en';

describe('gux-input-text-like-beta', () => {
  it('should build', async () => {
    const html = `<gux-input-text-like-beta><input slot="input" type="test"></gux-input-text-like-beta>`;
    const page = await newSpecPage({ components, html, language });
    const component = page.rootInstance;

    expect(component).toBeInstanceOf(GuxInputTextLikeBeta);
  });
});
