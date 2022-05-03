import { newSpecPage } from '@stencil/core/testing';
import { GuxActionItem } from '../gux-action-item';

const components = [GuxActionItem];
const language = 'en';

describe('gux-action-item', () => {
  it('should build', async () => {
    const html = `<gux-action-item></gux-action-item>`;
    const page = await newSpecPage({ components, html, language });
    expect(page.rootInstance).toBeInstanceOf(GuxActionItem);
  });
});
