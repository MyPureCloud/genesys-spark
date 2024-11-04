import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';

describe('gux-avatar-overflow', () => {
  describe('#render', () => {
    [
      `<div role="list"><gux-avatar-overflow-beta count="2"></gux-avatar-overflow-beta></div>`,
      `<div role="list"><gux-avatar-overflow-beta count="2">
        <li>1</li>
        <li>2</li>
      </gux-avatar-overflow-beta></div>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-overflow-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
