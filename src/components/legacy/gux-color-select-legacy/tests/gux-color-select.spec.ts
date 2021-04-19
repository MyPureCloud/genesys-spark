import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { GuxColorSelectBeta } from '../gux-color-select';

describe('gux-color-select-legacy', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [GuxColorSelectBeta],
      html: `<gux-color-select-legacy></gux-color-select-legacy>`,
      language: 'en'
    });
  });

  it('should build', () => {
    expect(page.rootInstance).toBeInstanceOf(GuxColorSelectBeta);
  });

  describe('#render', () => {
    it('should render as expected', () => {
      expect(page.root).toMatchSnapshot();
    });
  });
});
