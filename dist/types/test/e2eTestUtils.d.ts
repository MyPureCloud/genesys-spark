import { E2EPage } from '@stencil/core/testing';
export declare function a11yCheck(page: E2EPage, axeExclusions?: {
  issueId: string;
  target?: string;
  exclusionReason: string;
}[], axeScanContext?: string): Promise<void>;
export declare function newSparkE2EPage({ html }: {
  html: string;
}, lang?: string): Promise<E2EPage>;
