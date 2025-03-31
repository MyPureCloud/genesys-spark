import { newSpecPage } from '@test/specTestUtils';
import { GuxDay } from '../gux-day';

const components = [GuxDay];
const language = 'en';
const html = `
<gux-day-beta day="2025-03-05"></gux-day-beta>
`;

describe('gux-day', () => {
  it('should build', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxDay);
  });

  it('renders', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.root).toMatchSnapshot();
  });
});
