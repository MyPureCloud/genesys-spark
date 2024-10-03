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
import { MockHTMLElement } from '@stencil/core/mock-doc';

import { GuxPopover } from '../gux-popover';

//Mocks
const showPopover = jest.fn();

const components = [GuxPopover];
const language = 'en';
const html = `
  <div>
    <button id="popover-target">
      Example Element
    </button>
    <gux-popover id="popover-example" position="top" for="popover-target" is-open="false">
      <span slot="title">Title</span>
      <div>popover content</div>
    </gux-popover>
  </div>`;

describe('gux-popover', () => {
  beforeAll(() => {
    Object.assign(MockHTMLElement.prototype, {
      showPopover: showPopover
    });
  });

  afterEach(async () => {
    jest.spyOn(floatingUi, 'autoUpdate').mockRestore();
  });

  describe('#render', () => {
    it('should render popover', async () => {
      jest.spyOn(floatingUi, 'autoUpdate').mockReturnValue(jest.fn());
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
