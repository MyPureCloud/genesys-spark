jest.mock('@floating-ui/dom', () => {
  const originalModule = jest.requireActual('@floating-ui/dom');

  return {
    __esModule: true,
    ...originalModule,
    autoUpdate: jest.fn()
  } as unknown;
});

import { newSpecPage } from '@test/specTestUtils';
import * as floatingUi from '@floating-ui/dom';

import { GuxPopoverList } from '../gux-popover-list';

const components = [GuxPopoverList];
const language = 'en';
const html = `
  <div>
    <div id="popover-target">
      Example Element
    </div>
    <gux-popover-list-beta id="popover-example" position="top" for="popover-target" is-open="false" popover="manual">
      <div>popover content</div>
    </gux-popover-list-beta>
  </div>`;

describe('gux-popover-list', () => {
  afterEach(async () => {
    jest.spyOn(floatingUi, 'autoUpdate').mockRestore();
  });

  describe('#render', () => {
    it('should render popover', async () => {
      jest.spyOn(floatingUi, 'autoUpdate').mockReturnValue(jest.fn());

      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPopoverList);
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
      const targetElement = document.getElementById(
        'popover-target'
      ) as HTMLInputElement;
      const elementWrapper = element.shadowRoot.querySelector(
        '.gux-popover-wrapper'
      );
      targetElement.click();
      element.isOpen = true;
      await page.waitForChanges();
      expect(elementWrapper).not.toHaveClass('gux-hidden');
      expect(autoUpdateSpy).toHaveBeenCalledTimes(1);
      expect(cleanupSpy).not.toBeCalled();

      element.isOpen = false;
      await page.waitForChanges();
      expect(elementWrapper).toHaveClass('gux-hidden');
      expect(cleanupSpy).toHaveBeenCalledTimes(1);

      element.isOpen = true;
      await page.waitForChanges();
      expect(autoUpdateSpy).toHaveBeenCalledTimes(2);
      expect(cleanupSpy).toHaveBeenCalledTimes(2);
    });
  });
});
