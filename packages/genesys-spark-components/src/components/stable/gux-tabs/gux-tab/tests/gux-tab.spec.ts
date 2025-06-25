import { newSpecPage } from '@test/specTestUtils';
import { GuxTab } from '../gux-tab';

describe('gux-tab', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components: [GuxTab],
      html: `<gux-tab></gux-tab>`,
      language: 'en'
    });

    expect(page.rootInstance).toBeInstanceOf(GuxTab);
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [GuxTab],
      html: `<gux-tab></gux-tab>`,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });

  it('should render disabled', async () => {
    const page = await newSpecPage({
      components: [GuxTab],
      html: `<gux-tab gux-disabled="true"></gux-tab>`,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
