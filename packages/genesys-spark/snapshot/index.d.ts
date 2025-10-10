export { sparkIntl as Intl } from 'genesys-spark-utils';

interface registerOptions {
    /**
     * Optional base URL to use for component assets like JS and CSS (i.e. where dist/genesys-webcomponents is hosted).
     * This is meant for testing. In production, assets should be loaded from the default CDN location.
     */
    assetsUrl?: string;
    theme?: 'flare' | 'legacy';
}
/**
 * TODO
 */
declare function loadSparkFonts(opts?: registerOptions): Promise<void>;
/**
 * Loads the spark web components, as well as required CSS and fonts from a
 * shared CDN. Performance can be optimized by pre-loading fonts in static HTML.
 *
 * @returns a promise that succeeds if the component script and styles
 * load successfully. It is not recommended to wait on this promise or to stop
 * application bootstrap if it rejects. Its primary use should be for logging
 * unexpected failures.
 */
declare function registerSparkComponents(opts?: registerOptions): Promise<void>;
/**
 * TODO
 */
declare function registerSparkChartComponents(opts?: registerOptions): Promise<void>;

export { loadSparkFonts, registerSparkChartComponents, registerSparkComponents };
