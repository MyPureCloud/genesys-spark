import { newSpecPage } from '@stencil/core/testing';
import { GuxActionListDivider } from '../gux-action-list-divider';

const components = [GuxActionListDivider];
const language = 'en';

describe('gux-action-list-divider', () => {
  it('should build', async () => {
    const html = `<gux-action-list-divider></gux-action-list-divider>`;
    const page = await newSpecPage({ components, html, language });
    expect(page.rootInstance).toBeInstanceOf(GuxActionListDivider);
  });
});
