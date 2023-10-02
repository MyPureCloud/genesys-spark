jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logError: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxButtonSlot } from '../gux-button-slot';

import { logError } from '../../../../utils/error/log-error';

const components = [GuxButtonSlot];
const language = 'en';

describe('gux-button-slot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-button-slot><button type="button"accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render primary button',
        html: '<gux-button-slot accent="primary"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render secondary button',
        html: '<gux-button-slot accent="secondary"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render tertiary button',
        html: '<gux-button-slot accent="tertiary"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render ghost button',
        html: '<gux-button-slot accent="ghost"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render danger button',
        html: '<gux-button-slot accent="danger"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render inline button',
        html: '<gux-button-slot accent="inline"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render invalid button',
        html: '<gux-button-slot accent="invalid"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled default button',
        html: '<gux-button-slot><button type="button"accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled primary button',
        html: '<gux-button-slot accent="primary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled secondary button',
        html: '<gux-button-slot accent="secondary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled tertiary button',
        html: '<gux-button-slot accent="tertiary"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled ghost button',
        html: '<gux-button-slot accent="ghost"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled danger button',
        html: '<gux-button-slot accent="danger"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render disabled inline button',
        html: '<gux-button-slot accent="inline"><button type="button" accent="primary" disabled>Button</button></gux-button-slot>'
      },
      {
        description: 'should render button with invalid accent',
        html: '<gux-button-slot accent="invalid"><button type="button" accent="primary">Button</button></gux-button-slot>'
      },
      {
        description: 'should render default input[type=button]',
        html: '<gux-button-slot><input type="button"accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render primary input[type=button]',
        html: '<gux-button-slot accent="primary"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render secondary input[type=button]',
        html: '<gux-button-slot accent="secondary"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render tertiary input[type=button]',
        html: '<gux-button-slot accent="tertiary"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render ghost input[type=button]',
        html: '<gux-button-slot accent="ghost"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render danger input[type=button]',
        html: '<gux-button-slot accent="danger"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render inline input[type=button]',
        html: '<gux-button-slot accent="inline"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render invalid input[type=button]',
        html: '<gux-button-slot accent="invalid"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled default input[type=button]',
        html: '<gux-button-slot><input type="button"accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled primary input[type=button]',
        html: '<gux-button-slot accent="primary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled secondary input[type=button]',
        html: '<gux-button-slot accent="secondary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled tertiary input[type=button]',
        html: '<gux-button-slot accent="tertiary"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled ghost input[type=button]',
        html: '<gux-button-slot accent="ghost"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled danger input[type=button]',
        html: '<gux-button-slot accent="danger"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled inline input[type=button]',
        html: '<gux-button-slot accent="inline"><input type="button" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render input[type=button] with invalid accent',
        html: '<gux-button-slot accent="invalid"><input type="button" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render default input[type=submit]',
        html: '<gux-button-slot><input type="submit"accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render primary input[type=submit]',
        html: '<gux-button-slot accent="primary"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render secondary input[type=submit]',
        html: '<gux-button-slot accent="secondary"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render tertiary input[type=submit]',
        html: '<gux-button-slot accent="tertiary"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render ghost input[type=submit]',
        html: '<gux-button-slot accent="ghost"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render danger input[type=submit]',
        html: '<gux-button-slot accent="danger"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render inline input[type=submit]',
        html: '<gux-button-slot accent="inline"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render invalid input[type=submit]',
        html: '<gux-button-slot accent="invalid"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled default input[type=submit]',
        html: '<gux-button-slot><input type="submit"accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled primary input[type=submit]',
        html: '<gux-button-slot accent="primary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled secondary input[type=submit]',
        html: '<gux-button-slot accent="secondary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled tertiary input[type=submit]',
        html: '<gux-button-slot accent="tertiary"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled ghost input[type=submit]',
        html: '<gux-button-slot accent="ghost"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled danger input[type=submit]',
        html: '<gux-button-slot accent="danger"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render disabled inline input[type=submit]',
        html: '<gux-button-slot accent="inline"><input type="submit" accent="primary" disabled value="Button"/></gux-button-slot>'
      },
      {
        description: 'should render input[type=submit] with invalid accent',
        html: '<gux-button-slot accent="invalid"><input type="submit" accent="primary" value="Button"/></gux-button-slot>'
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
        html: '<gux-button-slot><button type="button" accent="primary">Button</button></gux-button-slot>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=button] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot><input type="button" accent="primary" value="Button"/></gux-button-slot>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=submit] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot><input type="submit" accent="primary" value="Button"/></gux-button-slot>',
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should not log an error if an input[type=text] element is slotted', async () => {
      await newSpecPage({
        components,
        html: '<gux-button-slot id="test"><input type="text" accent="primary" value="Button"/></gux-button-slot>',
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
        html: '<gux-button-slot id="test"><div>Not a button</div></gux-button-slot>',
        language
      });

      expect(logError).toHaveBeenCalledWith(
        document.getElementById('test'),
        'You must slot a button, input[type="button"] or input[type="submit"] element.'
      );
    });
  });
});
