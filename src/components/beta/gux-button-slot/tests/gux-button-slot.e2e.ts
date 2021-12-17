import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-button-slot-beta', () => {
  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-button-slot-beta><button type="button" title="Default">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render primary button',
        html: '<gux-button-slot-beta accent="primary"><button type="button" title="Primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary button',
        html: '<gux-button-slot-beta accent="secondary"><button type="button" title="Secondary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary button',
        html: '<gux-button-slot-beta accent="tertiary"><button type="button" title="Tertiary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid button',
        html: '<gux-button-slot-beta accent="invalid"><button type="button" title="Invalid">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default button',
        html: '<gux-button-slot-beta><button type="button" title="Default" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary button',
        html: '<gux-button-slot-beta accent="primary"><button type="button" title="Primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary button',
        html: '<gux-button-slot-beta accent="secondary"><button type="button" title="Secondary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary button',
        html: '<gux-button-slot-beta accent="tertiary"><button type="button" title="Tertiary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render button with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><button type="button" title="Invalid">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render default input[type=button]',
        html: '<gux-button-slot-beta><input type="button" title="Default" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render primary input[type=button]',
        html: '<gux-button-slot-beta accent="primary"><input type="button" title="Primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary input[type=button]',
        html: '<gux-button-slot-beta accent="secondary"><input type="button" title="Secondary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary input[type=button]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="button" title="Tertiary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid input[type=button]',
        html: '<gux-button-slot-beta accent="invalid"><input type="button" title="Invalid" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default input[type=button]',
        html: '<gux-button-slot-beta><input type="button" title="Default" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary input[type=button]',
        html: '<gux-button-slot-beta accent="primary"><input type="button" title="Primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary input[type=button]',
        html: '<gux-button-slot-beta accent="secondary"><input type="button" title="Secondary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary input[type=button]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="button" title="Tertiary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render input[type=button] with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><input type="button" title="Invalid" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render default input[type=submit]',
        html: '<gux-button-slot-beta><input type="submit" title="Default" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render primary input[type=submit]',
        html: '<gux-button-slot-beta accent="primary"><input type="submit" title="Primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary input[type=submit]',
        html: '<gux-button-slot-beta accent="secondary"><input type="submit" title="Secondary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary input[type=submit]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="submit" title="Tertiary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid input[type=submit]',
        html: '<gux-button-slot-beta accent="invalid"><input type="submit" title="Invalid" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default input[type=submit]',
        html: '<gux-button-slot-beta><input type="submit" title="Default" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary input[type=submit]',
        html: '<gux-button-slot-beta accent="primary"><input type="submit" title="Primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary input[type=submit]',
        html: '<gux-button-slot-beta accent="secondary"><input type="submit" title="Secondary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary input[type=submit]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="submit" title="Tertiary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render input[type=submit] with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><input type="submit" title="Invalid" value="Button"/></gux-button-slot-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-button-slot-beta');

        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
