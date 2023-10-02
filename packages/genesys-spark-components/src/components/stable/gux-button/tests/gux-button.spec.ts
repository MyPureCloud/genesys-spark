import { newSpecPage } from '@test/specTestUtils';
import { GuxButton } from '../../gux-button/gux-button';

const components = [GuxButton];
const language = 'en';

describe('gux-button', () => {
  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-button>Button</gux-button>'
      },
      {
        description: 'should render primary button',
        html: '<gux-button accent="primary">Button</gux-button>'
      },
      {
        description: 'should render secondary button',
        html: '<gux-button accent="secondary">Button</gux-button>'
      },
      {
        description: 'should render tertiary button',
        html: '<gux-button accent="tertiary">Button</gux-button>'
      },
      {
        description: 'should render ghost button',
        html: '<gux-button accent="ghost">Button</gux-button>'
      },
      {
        description: 'should render danger button',
        html: '<gux-button accent="danger">Button</gux-button>'
      },
      {
        description: 'should render inline button',
        html: '<gux-button accent="inline">Button</gux-button>'
      },
      {
        description: 'should render invalid button',
        html: '<gux-button accent="invalid">Button</gux-button>'
      },
      {
        description: 'should render disabled default button',
        html: '<gux-button disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled primary button',
        html: '<gux-button accent="primary" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled secondary button',
        html: '<gux-button accent="secondary" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled tertiary button',
        html: '<gux-button accent="tertiary" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled ghost button',
        html: '<gux-button accent="ghost" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled danger button',
        html: '<gux-button accent="danger" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled inline button',
        html: '<gux-button accent="inline" disabled>Button</gux-button>'
      },
      {
        description: 'should render disabled invalid button',
        html: '<gux-button accent="invalid" disabled>Button</gux-button>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxButton);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('click', () => {
    it('should fire a click event when an enabled button is clicked', async () => {
      const html = '<gux-button>Button</gux-button>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const clickSpy = jest.fn();

      element.addEventListener('click', clickSpy);

      element.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should fire a click event when an enabled button slot content is clicked', async () => {
      const html = '<gux-button><span>Span</span></gux-button>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const span = page.root.querySelector('span') as HTMLButtonElement;
      const clickSpy = jest.fn();

      element.addEventListener('click', clickSpy);

      span.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not fire a click event when a disabled button slot content is clicked', async () => {
      const html = '<gux-button disabled><span>Span</span></gux-button>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const span = page.root.querySelector('span') as HTMLElement;
      const clickSpy = jest.fn();

      element.addEventListener('click', clickSpy);

      span.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
