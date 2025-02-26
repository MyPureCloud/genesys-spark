import { newSpecPage } from '@test/specTestUtils';
import { GuxTab } from '../gux-tab';

describe('gux-tab', () => {
  let page: any;
  let component: GuxTab;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [GuxTab],
      html: `<gux-tab></gux-tab>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTab);
  });

  it('should render', async () => {
    expect(component).toMatchSnapshot();
  });

  // it should render disabled
  it('should render disabled', async () => {
    page.root.setAttribute('gux-disabled', 'true');
    await page.waitForChanges();
    expect(component).toMatchSnapshot();
  });
});
