jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logError: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';

import { GuxButtonSlot } from '../gux-button-slot';

import { logError } from '../../../../utils/error/log-error';

const components = [GuxButtonSlot];
const language = 'en';

describe('gux-button-slot-beta', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-button-slot-beta><button type="button"accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render primary button',
        html: '<gux-button-slot-beta accent="primary"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary button',
        html: '<gux-button-slot-beta accent="secondary"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary button',
        html: '<gux-button-slot-beta accent="tertiary"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render ghost button',
        html: '<gux-button-slot-beta accent="ghost"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render danger button',
        html: '<gux-button-slot-beta accent="danger"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render inline button',
        html: '<gux-button-slot-beta accent="inline"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid button',
        html: '<gux-button-slot-beta accent="invalid"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default button',
        html: '<gux-button-slot-beta><button type="button"accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary button',
        html: '<gux-button-slot-beta accent="primary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary button',
        html: '<gux-button-slot-beta accent="secondary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary button',
        html: '<gux-button-slot-beta accent="tertiary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled ghost button',
        html: '<gux-button-slot-beta accent="ghost"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled danger button',
        html: '<gux-button-slot-beta accent="danger"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled inline button',
        html: '<gux-button-slot-beta accent="inline"><button type="button" accent="primary" disabled>Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render button with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><button type="button" accent="primary">Button</button></gux-button-slot-beta>'
      },
      {
        description: 'should render default input[type=button]',
        html: '<gux-button-slot-beta><input type="button"accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render primary input[type=button]',
        html: '<gux-button-slot-beta accent="primary"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary input[type=button]',
        html: '<gux-button-slot-beta accent="secondary"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary input[type=button]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render ghost input[type=button]',
        html: '<gux-button-slot-beta accent="ghost"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render danger input[type=button]',
        html: '<gux-button-slot-beta accent="danger"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render inline input[type=button]',
        html: '<gux-button-slot-beta accent="inline"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid input[type=button]',
        html: '<gux-button-slot-beta accent="invalid"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default input[type=button]',
        html: '<gux-button-slot-beta><input type="button"accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary input[type=button]',
        html: '<gux-button-slot-beta accent="primary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary input[type=button]',
        html: '<gux-button-slot-beta accent="secondary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary input[type=button]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled ghost input[type=button]',
        html: '<gux-button-slot-beta accent="ghost"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled danger input[type=button]',
        html: '<gux-button-slot-beta accent="danger"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled inline input[type=button]',
        html: '<gux-button-slot-beta accent="inline"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render input[type=button] with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render default input[type=submit]',
        html: '<gux-button-slot-beta><input type="submit"accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render primary input[type=submit]',
        html: '<gux-button-slot-beta accent="primary"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render secondary input[type=submit]',
        html: '<gux-button-slot-beta accent="secondary"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render tertiary input[type=submit]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render ghost input[type=submit]',
        html: '<gux-button-slot-beta accent="ghost"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render danger input[type=submit]',
        html: '<gux-button-slot-beta accent="danger"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render inline input[type=submit]',
        html: '<gux-button-slot-beta accent="inline"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render invalid input[type=submit]',
        html: '<gux-button-slot-beta accent="invalid"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled default input[type=submit]',
        html: '<gux-button-slot-beta><input type="submit"accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled primary input[type=submit]',
        html: '<gux-button-slot-beta accent="primary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled secondary input[type=submit]',
        html: '<gux-button-slot-beta accent="secondary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled tertiary input[type=submit]',
        html: '<gux-button-slot-beta accent="tertiary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled ghost input[type=submit]',
        html: '<gux-button-slot-beta accent="ghost"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled danger input[type=submit]',
        html: '<gux-button-slot-beta accent="danger"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render disabled inline input[type=submit]',
        html: '<gux-button-slot-beta accent="inline"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot-beta>'
      },
      {
        description: 'should render input[type=submit] with invalid accent',
        html: '<gux-button-slot-beta accent="invalid"><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxButtonSlot);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('slot content', () => {
    it('should not log an error if a button element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot-beta><button type="button" accent="primary">Button</button></gux-button-slot-beta>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=button] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot-beta><input type="button" accent="primary" value="Button"/></gux-button-slot-beta>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=submit] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot-beta><input type="submit" accent="primary" value="Button"/></gux-button-slot-beta>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=text] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot-beta id="test"><input type="text" accent="primary" value="Button"/></gux-button-slot-beta>',
        language
      });

      expect(logError).toHaveBeenCalledWith(
        document.getElementById('test'),
        'You must slot a button, input[type="button"] or input[type="submit"] element.'
      );
    });

    it('should not log an error if a button element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot-beta id="test"><div>Not a button</div></gux-button-slot-beta>',
        language
      });

      expect(logError).toHaveBeenCalledWith(
        document.getElementById('test'),
        'You must slot a button, input[type="button"] or input[type="submit"] element.'
      );
    });
  });
});
