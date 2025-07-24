jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logError: jest.fn()
}));

import { checkRenders, newSpecPage } from '@test/specTestUtils';
import { GuxButtonSlot } from '../gux-button-slot';
import { renderConfigs } from './gux-button-slot.common';

import { logError } from '../../../../utils/error/log-error';

const components = [GuxButtonSlot];
const language = 'en';

describe('gux-button-slot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    checkRenders(renderConfigs, components);
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
