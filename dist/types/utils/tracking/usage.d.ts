import NewRelicBrowser from 'new-relic-browser';
interface LibraryEvent {
  name: 'spark-library';
  metadata: {
    majorVersion: string;
    minorVersion: string;
    fullVersion: string;
  };
}
interface ComponentMetadata {
  variant?: string;
}
interface ActionMetadata {
  [key: string]: string | number;
}
/**
 * Submits a component for tracking by NewRelic.
 */
export declare function trackComponent(element: HTMLElement, metadata?: ComponentMetadata): void;
export declare function trackAction(element: HTMLElement, action: string, actionMetadata?: ActionMetadata): void;
export declare function getVersionEvent(packageInfoVersion: string): LibraryEvent;
declare global {
  interface Window {
    newrelic?: typeof NewRelicBrowser;
  }
}
export {};
