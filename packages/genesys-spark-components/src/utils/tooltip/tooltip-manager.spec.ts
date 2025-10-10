import { tooltipManager } from './tooltip-manager';

describe('TooltipManager', () => {
  let mockElement1: HTMLElement;
  let mockElement2: HTMLElement;
  let hideCallback1: jest.Mock;
  let hideCallback2: jest.Mock;

  beforeEach(() => {
    // Create mock elements
    mockElement1 = document.createElement('div');
    mockElement2 = document.createElement('div');

    // Create mock hide callbacks
    hideCallback1 = jest.fn();
    hideCallback2 = jest.fn();

    // Reset tooltip manager state
    tooltipManager.hideCurrent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a tooltip as current', () => {
      tooltipManager.register(mockElement1, hideCallback1);

      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);
      expect(tooltipManager.isCurrent(mockElement2)).toBe(false);
    });

    it('should hide previous tooltip when showing a new one', () => {
      // Show first tooltip
      tooltipManager.register(mockElement1, hideCallback1);
      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);

      // Show second tooltip - should hide first
      tooltipManager.register(mockElement2, hideCallback2);

      expect(hideCallback1).toHaveBeenCalledTimes(1);
      expect(tooltipManager.isCurrent(mockElement1)).toBe(false);
      expect(tooltipManager.isCurrent(mockElement2)).toBe(true);
    });

    it('should not hide tooltip when showing the same tooltip again', () => {
      tooltipManager.register(mockElement1, hideCallback1);
      tooltipManager.register(mockElement1, hideCallback1);

      expect(hideCallback1).not.toHaveBeenCalled();
      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);
    });
  });

  describe('unregister', () => {
    it('should unregister the current tooltip', () => {
      tooltipManager.register(mockElement1, hideCallback1);
      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);

      tooltipManager.unregister(mockElement1);
      expect(tooltipManager.isCurrent(mockElement1)).toBe(false);
    });

    it('should not affect other tooltips', () => {
      tooltipManager.register(mockElement1, hideCallback1);
      tooltipManager.unregister(mockElement2);

      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);
    });
  });

  describe('hideCurrent', () => {
    it('should call the hide callback and clear state', () => {
      tooltipManager.register(mockElement1, hideCallback1);

      tooltipManager.hideCurrent();

      expect(hideCallback1).toHaveBeenCalledTimes(1);
      expect(tooltipManager.isCurrent(mockElement1)).toBe(false);
    });

    it('should handle case when no tooltip is active', () => {
      expect(() => tooltipManager.hideCurrent()).not.toThrow();
    });
  });

  describe('isCurrent', () => {
    it('should return true for current tooltip', () => {
      tooltipManager.register(mockElement1, hideCallback1);

      expect(tooltipManager.isCurrent(mockElement1)).toBe(true);
      expect(tooltipManager.isCurrent(mockElement2)).toBe(false);
    });

    it('should return false when no tooltip is active', () => {
      expect(tooltipManager.isCurrent(mockElement1)).toBe(false);
    });
  });
});
