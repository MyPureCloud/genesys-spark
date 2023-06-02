import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-badge-beta', () => {
  describe('#render', () => {
    [
      '<gux-badge-beta>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="warning">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta bold>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="warning">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-badge-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });

    [
      '<gux-badge-beta>Badge</gux-badge-beta>',
      '<gux-badge-beta color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta color="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta bold>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (deprecated) (${
        index + 1
      })`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-badge-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
