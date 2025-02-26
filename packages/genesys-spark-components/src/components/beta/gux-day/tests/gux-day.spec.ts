import { newSpecPage } from '@test/specTestUtils';
import { GuxDay } from '../gux-day';

const components = [GuxDay];
const language = 'en';
const html = `
<gux-calendar-beta>
  <input type="date" value="2023-05-19" min="2023-04-28" max="2023-06-18" />
</gux-calendar-beta>
`;

describe('gux-calendar', () => {
  it('should build', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxDay);
  });

  it('renders', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.root).toMatchSnapshot();
  });
});
