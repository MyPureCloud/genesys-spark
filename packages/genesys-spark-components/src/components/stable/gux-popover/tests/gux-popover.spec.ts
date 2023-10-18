import { newSpecPage } from '@test/specTestUtils';
import * as floatingUi from '@floating-ui/dom';

import { GuxPopover } from '../gux-popover';

const components = [GuxPopover];
const language = 'en';
const html = `
  <div>
    <div id="popover-target">
      Example Element
    </div>
    <gux-popover id="popover-example" position="top" for="popover-target" is-open>
      <span slot="title">Title</span>
      <div>popover content</div>
    </gux-popover>
  </div>`;

describe('gux-popover', () => {
  afterEach(async () => {
    jest.spyOn(floatingUi, 'autoUpdate').mockRestore();
  });

  describe('#render', () => {
    it('should render popover', async () => {
      jest.spyOn(floatingUi, 'autoUpdate').mockReturnValue(jest.fn());

      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPopover);
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('#interaction', () => {
    it('should open and close', async () => {
      const cleanupSpy = jest.fn();
      const autoUpdateSpy = jest
        .spyOn(floatingUi, 'autoUpdate')
        .mockReturnValue(cleanupSpy);

      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxPopoverElement;
      const elementWrapper = element.shadowRoot.querySelector(
        '.gux-popover-wrapper'
      );
      expect(elementWrapper).not.toHaveClass('gux-hidden');
      expect(autoUpdateSpy).toBeCalledTimes(1);
      expect(cleanupSpy).not.toBeCalled();

      element.isOpen = false;
      await page.waitForChanges();
      expect(elementWrapper).toHaveClass('gux-hidden');
      expect(cleanupSpy).toBeCalledTimes(1);

      element.isOpen = true;
      await page.waitForChanges();
      expect(autoUpdateSpy).toBeCalledTimes(2);
      expect(cleanupSpy).toBeCalledTimes(1);
    });
  });
});
