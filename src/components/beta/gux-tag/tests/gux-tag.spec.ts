import { newSpecPage } from '@stencil/core/testing';
import { GuxTag } from '../gux-tag';

describe('gux-tag-beta', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [GuxTag],
      html: `
        <gux-tag-beta>Test</gux-tag-beta>
      `,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
