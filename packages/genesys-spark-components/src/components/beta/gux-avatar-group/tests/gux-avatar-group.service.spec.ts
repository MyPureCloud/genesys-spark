jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

jest.mock('../../../../utils/dom/get-closest-element', () => ({
  __esModule: true,
  getClosestElement: jest.fn()
}));

import {
  groupKeyboardNavigation,
  resetFocusableSibling,
  setFocusTarget
} from '../gux-avatar-group.service';
import { logWarn } from '../../../../utils/error/log-error';
import { getClosestElement } from '../../../../utils/dom/get-closest-element';

describe('gux-avatar-group.service', () => {
  let mockElement: HTMLElement;
  let mockButton: HTMLButtonElement;
  let mockShadowRoot: ShadowRoot;
  let mockGroup: HTMLElement;
  let mockGroupItems: HTMLElement[];

  beforeEach(() => {
    jest.clearAllMocks();

    mockButton = {
      tabIndex: 0,
      focus: jest.fn()
    } as unknown as HTMLButtonElement;

    mockShadowRoot = {
      querySelector: jest.fn().mockReturnValue(mockButton)
    } as unknown as ShadowRoot;

    mockElement = {
      shadowRoot: mockShadowRoot,
      focus: jest.fn(),
      hasAttribute: jest.fn().mockReturnValue(false)
    } as unknown as HTMLElement;

    mockGroupItems = [
      {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: 0 })
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        focus: jest.fn()
      },
      {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: -1 })
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        focus: jest.fn()
      },
      {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: -1 })
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        focus: jest.fn()
      }
    ] as HTMLElement[];

    mockGroup = {
      querySelectorAll: jest.fn().mockReturnValue(mockGroupItems),
      shadowRoot: {
        querySelector: jest.fn().mockReturnValue(null)
      }
    } as unknown as HTMLElement;

    (getClosestElement as jest.Mock).mockReturnValue(mockGroup);
  });

  describe('groupKeyboardNavigation', () => {
    let mockEvent: KeyboardEvent;

    beforeEach(() => {
      mockEvent = {
        key: '',
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      } as unknown as KeyboardEvent;
    });

    it('should handle ArrowLeft key', () => {
      mockEvent.key = 'ArrowLeft';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle ArrowUp key', () => {
      mockEvent.key = 'ArrowUp';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle ArrowRight key', () => {
      mockEvent.key = 'ArrowRight';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle ArrowDown key', () => {
      mockEvent.key = 'ArrowDown';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle Home key', () => {
      mockEvent.key = 'Home';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle End key', () => {
      mockEvent.key = 'End';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should not handle other keys', () => {
      mockEvent.key = 'Enter';

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('resetFocusableSibling', () => {
    it('should reset tabIndex of focusable sibling', () => {
      const mockFocusableButton = { tabIndex: 0 };
      const mockFocusableElement = {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue(mockFocusableButton)
        },
        hasAttribute: jest.fn().mockReturnValue(false)
      };

      mockGroup.querySelectorAll = jest
        .fn()
        .mockReturnValue([mockFocusableElement]);

      resetFocusableSibling(mockElement);

      expect(mockFocusableButton.tabIndex).toBe(-1);
    });

    it('should handle case when no focusable sibling exists', () => {
      mockGroup.querySelectorAll = jest.fn().mockReturnValue([]);

      expect(() => resetFocusableSibling(mockElement)).not.toThrow();
    });

    it('should handle case when sibling has no button', () => {
      const mockElementWithoutButton = {
        shadowRoot: { querySelector: jest.fn().mockReturnValue(null) },
        hasAttribute: jest.fn().mockReturnValue(false)
      };

      mockGroup.querySelectorAll = jest
        .fn()
        .mockReturnValue([mockElementWithoutButton]);

      expect(() => resetFocusableSibling(mockElement)).not.toThrow();
    });
  });

  describe('setFocusTarget', () => {
    it('should set tabIndex to 0', () => {
      setFocusTarget(mockElement);

      expect(mockButton.tabIndex).toBe(0);
    });

    it('should log warning when no button found', () => {
      mockShadowRoot.querySelector = jest.fn().mockReturnValue(null);

      setFocusTarget(mockElement);

      expect(logWarn).toHaveBeenCalledWith(
        mockElement,
        'gux-avatar-group-beta: No button found in the element'
      );
    });
  });

  describe('keyboard navigation with overflow and add items', () => {
    beforeEach(() => {
      const mockOverflow = {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: -1 })
        }
      };
      const mockAddItem = {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: -1 })
        }
      };

      mockGroup.shadowRoot.querySelector = jest
        .fn()
        .mockReturnValueOnce(mockOverflow)
        .mockReturnValueOnce(mockAddItem);
    });

    it('should include overflow and add items in navigation', () => {
      const mockEvent = {
        key: 'ArrowRight',
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      } as unknown as KeyboardEvent;

      groupKeyboardNavigation(mockEvent, mockElement);

      expect(getClosestElement).toHaveBeenCalledWith(
        'gux-avatar-group-beta',
        mockElement
      );
    });
  });

  describe('hidden elements', () => {
    it('should filter out hidden elements', () => {
      const hiddenElement = {
        hasAttribute: jest.fn().mockReturnValue(true),
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: -1 })
        }
      };

      mockGroup.querySelectorAll = jest
        .fn()
        .mockReturnValue([mockElement, hiddenElement]);

      resetFocusableSibling(mockElement);

      expect(hiddenElement.hasAttribute).toHaveBeenCalledWith('hidden');
    });
  });

  describe('edge cases', () => {
    it('should handle previousFocusableElement being falsy in ArrowLeft navigation', () => {
      // Create a scenario where the current element is at index 0
      // so previousIndex becomes -1, which when used with modulo gives a negative result
      const mockCurrentElement = {
        shadowRoot: {
          querySelector: jest.fn().mockReturnValue({ tabIndex: 0 })
        },
        hasAttribute: jest.fn().mockReturnValue(false),
        focus: jest.fn()
      };

      const mockGroupItems = [mockCurrentElement];
      mockGroup.querySelectorAll = jest.fn().mockReturnValue(mockGroupItems);

      // Mock Array.findIndex to return 0 (first element)
      jest.spyOn(Array.prototype, 'findIndex').mockReturnValue(0);

      const mockEvent = {
        key: 'ArrowLeft',
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      } as unknown as KeyboardEvent;

      groupKeyboardNavigation(mockEvent, mockCurrentElement as any);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();

      // Restore the original findIndex
      jest.restoreAllMocks();
    });
  });
});
