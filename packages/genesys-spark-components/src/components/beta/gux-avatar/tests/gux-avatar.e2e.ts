import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-avatar', () => {
  describe('#render', () => {
    [
      '<gux-avatar-beta name="John Doe"></gux-avatar-beta>',
      '<gux-avatar-beta name="JohnDoe"></gux-avatar-beta>',
      '<gux-avatar-beta name="山田 太郎"></gux-avatar-beta>',
      '<gux-avatar-beta name="이 영수"></gux-avatar-beta>',
      '<gux-avatar-beta name="邓 小平"></gux-avatar-beta>',
      '<gux-avatar-beta name="John Doe"><img slot="image" alt="John Doe Image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    [
      'auto',
      'default',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      'invalid-accent'
    ].forEach(accent => {
      it(`should be accessible when accent is "${accent}"`, async () => {
        const html = `<gux-avatar-beta name="John Doe" accent="${accent}"></gux-avatar-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });

    [
      'xsmall',
      'small',
      'medium',
      'large',
      'medium-rare',
      'invalid-size'
    ].forEach(size => {
      it(`should be accessible when size is "${size}"`, async () => {
        const html = `<gux-avatar-beta name="John Doe" size="${size}"></gux-avatar-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });

    [
      'available',
      'busy',
      'away',
      'on-queue',
      'offline',
      'out-of-office',
      'invalid-presence'
    ].forEach(presence => {
      it(`should be accessible when presence is "${presence}"`, async () => {
        const html = `<gux-avatar-beta name="John Doe" has-badge presence="${presence}" presence-ring></gux-avatar-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
