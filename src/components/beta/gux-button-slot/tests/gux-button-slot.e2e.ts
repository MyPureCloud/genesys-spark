import { newE2EPage } from '@stencil/core/testing';

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
        description: 'should render invalid button',
        html: '<gux-button-slot-beta accent="invalid"><button type="button" title="Invalid">Button</button></gux-button-slot-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-button-slot-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
