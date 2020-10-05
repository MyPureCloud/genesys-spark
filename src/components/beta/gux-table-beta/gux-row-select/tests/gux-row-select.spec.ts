import { newSpecPage } from '@stencil/core/testing';
import { GuxRowSelect } from '../gux-row-select';

const components = [GuxRowSelect];
const language = 'en';

describe('gux-row-select', () => {
  it('should build', async () => {
    const html = '<gux-row-select></gux-row-select>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRowSelect);
  });
});
