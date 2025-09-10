/**
 * @jest-environment jsdom
 */

import { trackComponent, trackAction, getVersionEvent } from './usage';
import packageInfo from '../../../package.json';

const component = document.createElement('gux-button');
const addPageAction = jest.fn();

describe('tracking/usage', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    addPageAction.mockClear();
    (window.newrelic as any) = {
      addPageAction
    };
    window.document.contains = jest.fn().mockReturnValue(true);
  });

  describe('Component usage tracking', () => {
    test("Doesn't throw when newrelic is not present", () => {
      window.newrelic = undefined;
      expect(() => {
        trackComponent(component);
      }).not.toThrow();
    });

    test('Logs the library after the first component loads', () => {
      trackComponent(component);
      jest.runOnlyPendingTimers();
      expect(addPageAction).toHaveBeenCalledTimes(2);
      expect(addPageAction.mock.calls[0][0]).toBe('spark-library');
      const versionInfo = addPageAction.mock.calls[0][1];
      expect(versionInfo.fullVersion).toBe(packageInfo.version);
      expect(packageInfo.version.startsWith(versionInfo.majorVersion)).toBe(
        true
      );
      expect(packageInfo.version.startsWith(versionInfo.minorVersion)).toBe(
        true
      );
    });

    test('Logs the tag name when a component is tracked', () => {
      trackComponent(component);
      jest.runOnlyPendingTimers();
      expect(addPageAction).toHaveBeenCalledWith('spark-component', {
        component: 'gux-button',
        version: packageInfo.version,
        queueDepth: 0
      });
    });

    test('Optionally logs a tag variant', () => {
      trackComponent(component, { variant: 'test' });
      jest.runOnlyPendingTimers();
      expect(addPageAction).toHaveBeenCalledWith('spark-component', {
        component: 'gux-button',
        version: packageInfo.version,
        variant: 'test',
        queueDepth: 0
      });
    });
  });

  describe('Component action tracking', () => {
    test("Doesn't throw when newrelic is not present", () => {
      window.newrelic = undefined;
      expect(() => {
        trackAction(component, 'click');
      }).not.toThrow();
    });

    test('Logs the component tag and action', () => {
      trackAction(component, 'click');
      jest.runOnlyPendingTimers();
      expect(addPageAction).toHaveBeenCalledWith('spark-action', {
        component: 'gux-button',
        action: 'click',
        queueDepth: 0
      });
    });

    test('Optionally logs metadata', () => {
      trackAction(component, 'click', { strength: 'real hard' });
      jest.runOnlyPendingTimers();
      expect(addPageAction).toHaveBeenCalledWith('spark-action', {
        component: 'gux-button',
        action: 'click',
        strength: 'real hard',
        queueDepth: 0
      });
    });
  });
});

describe('getVersionObject', () => {
  [
    {
      packageLockVersion: '0.0.1',
      expectedVersionObject: {
        fullVersion: '0.0.1',
        majorVersion: '0',
        minorVersion: '0.0'
      }
    },
    {
      packageLockVersion: '0.1.1',
      expectedVersionObject: {
        fullVersion: '0.1.1',
        majorVersion: '0',
        minorVersion: '0.1'
      }
    },
    {
      packageLockVersion: '1.1.1',
      expectedVersionObject: {
        fullVersion: '1.1.1',
        majorVersion: '1',
        minorVersion: '1.1'
      }
    },
    {
      packageLockVersion: '2.0.0-alpha.0',
      expectedVersionObject: {
        fullVersion: '2.0.0-alpha.0',
        majorVersion: '2',
        minorVersion: '2.0'
      }
    }
  ].forEach(({ packageLockVersion, expectedVersionObject }, index) => {
    it(`should return expected versionObject (${index + 1})`, async () => {
      const versionEvent = getVersionEvent(packageLockVersion);

      expect(versionEvent.metadata).toEqual(expectedVersionObject);
    });
  });
});
