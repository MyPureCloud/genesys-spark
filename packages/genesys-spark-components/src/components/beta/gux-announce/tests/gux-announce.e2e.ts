import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-announce-beta', () => {
  describe('#render', () => {
    [
      '<gux-announce-beta> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="assertive"> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="off"> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="polite"> This is some text to read </gux-announce-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-announce-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
