import { newSpecPage } from '@test/specTestUtils';

import { GuxCalendar } from '../gux-calendar';

const components = [GuxCalendar];
const language = 'en';

describe('gux-datepicker', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-calendar></gux-calendar>`,
      language
    });
    expect(page.rootInstance).toBeInstanceOf(GuxCalendar);
  });

  describe('#render', () => {
    [
      `<gux-calendar mode="single" value="1997-08-29"></gux-calendar>`,
      `<gux-calendar mode="range" number-of-months="2" value="2019-11-25/2019-12-02"></gux-calendar>`,
      `<gux-calendar mode="single" value="1997-08-29" start-day-of-week="6"></gux-calendar>`,
      `<gux-calendar mode="single" value="1997-08-29" lang="ar"></gux-calendar>`
    ].forEach((input, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({
          components,
          html: input,
          language
        });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
