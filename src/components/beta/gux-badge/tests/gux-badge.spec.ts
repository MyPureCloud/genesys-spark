import { newSpecPage } from '@stencil/core/testing';
import { GuxBadge } from '../gux-badge';

const components = [GuxBadge];
const language = 'en';

describe('gux-badge-beta', () => {
  describe('#render', () => {
    [
      '<gux-badge-beta>default</gux-badge-beta>',
      '<gux-badge-beta color="neutral">default explicit</gux-badge-beta>',
      '<gux-badge-beta color="green">sucess</gux-badge-beta>',
      '<gux-badge-beta color="yellow">warning</gux-badge-beta>',
      '<gux-badge-beta color="red">danger</gux-badge-beta>',
      '<gux-badge-beta bold color="green">success bold</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow">warning bold</gux-badge-beta>',
      '<gux-badge-beta bold color="red">danger bold</gux-badge-beta>',
      '<gux-badge-beta color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>warning icon</gux-badge-beta>',
      '<gux-badge-beta color="red"><gux-icon icon-name="subtract" decorative></gux-icon>danger icon</gux-badge-beta>',
      '<gux-badge-beta color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>warning icon</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>warning bold icon</gux-badge-beta>',
      '<gux-badge-beta bold color="red"><gux-icon icon-name="subtract" decorative></gux-icon>danger bold icon</gux-badge-beta>',
      '<gux-badge-beta bold color="yellow"><gux-icon icon-name="subtract" decorative></gux-icon>warning bold icon</gux-badge-beta>',
      '<gux-badge-beta bold><gux-icon icon-name="subtract" decorative></gux-icon>default bold</gux-badge-beta>',
      '<gux-badge-beta bold><gux-icon icon-name="subtract" decorative></gux-icon>default bold icon</gux-badge-beta>',
      '<gux-badge-beta color="inherit">inherit</gux-badge-beta>',
      '<gux-badge-beta color="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>inherit with icon</gux-badge-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
