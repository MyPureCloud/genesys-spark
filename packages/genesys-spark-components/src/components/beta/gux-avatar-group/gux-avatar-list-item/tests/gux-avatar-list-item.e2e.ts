import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';

describe('gux-avatar-list-item', () => {
  describe('#render', () => {
    [
      `<div role="list"> <gux-avatar-list-item-beta><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta></div>`,
      `<div role="list"><gux-avatar-list-item-beta interactive-element="a"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta></div>`,
      `<div role="list"><gux-avatar-list-item-beta focusable="true"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta></div>`,
      `<div role="list"><gux-avatar-list-item-beta layout="plus-name"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta></div>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-list-item-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
