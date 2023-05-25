import { newSpecPage } from '@stencil/core/testing';
import { GuxBadge } from '../gux-badge';

const components = [GuxBadge];
const language = 'en';

describe('gux-badge-beta', () => {
  describe('#render', () => {
    [
      '<gux-badge-beta>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="warn">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="warn">Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="warn">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="info">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="success">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="warn">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="error">Badge</gux-badge-beta>',
      '<gux-badge-beta accent="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="warn"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="warn"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="warn"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="warn"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    [
      '<gux-badge-beta>Badge</gux-badge-beta>',
      '<gux-badge-beta color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="neutral">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="green">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="yellow">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="red">Badge</gux-badge-beta>',
      '<gux-badge-beta color="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="inherit">Badge</gux-badge-beta>',
      '<gux-badge-beta><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta bold color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="neutral"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="green"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed bold color="red"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta color="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>',
      '<gux-badge-beta dimmed color="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (deprecated) (${
        index + 1
      })`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
