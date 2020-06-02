import { newSpecPage } from '@stencil/core/testing';
import { GuxButton } from '../../gux-button/gux-button';

const components = [GuxButton];
const language = 'en';

describe('gux-modal', () => {
  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-button title="default">Button</gux-button>'
      },
      {
        description: 'should render primary button',
        html: '<gux-button title="default" accent="primary">Button</gux-button>'
      },
      {
        description: 'should render secondary button',
        html:
          '<gux-button title="default" accent="secondary">Button</gux-button>'
      },
      {
        description: 'should render invalid accent button',
        html:
          '<gux-button title="Invalid accent" accent="invalid">Invalid accent</gux-button>'
      },
      {
        description: 'should render disabled default button',
        html: '<gux-button title="default" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled primary button',
        html:
          '<gux-button title="default" accent="primary" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled secondary button',
        html:
          '<gux-button title="default" accent="secondary" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled invalid accent button',
        html:
          '<gux-button title="Invalid accent" accent="invalid" disabled>Invalid accent</gux-button>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxButton);
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
