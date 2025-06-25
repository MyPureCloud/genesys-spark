import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { AxeResults } from 'axe-core';

import { axeConfig } from './axeConfig';

export async function a11yCheck(
  page: E2EPage,
  axeExclusions: {
    issueId: string;
    target?: string;
    exclusionReason: string;
  }[] = [],
  axeScanContext: string = ''
) {
  const axeScanDetails = {
    axeExclusions,
    axeScanContext
  };
  const axeResults = (await page.evaluate(
    `window.axe.run('body > *', ${JSON.stringify(axeConfig)})`
  )) as AxeResults;

  // eslint-disable-next-line
  expect(axeResults.violations).toHaveNoViolations(axeScanDetails);
}

export async function newSparkE2EPage(
  {
    html
  }: {
    html: string;
  },
  lang: string = 'en'
): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(`<div lang=${lang}>${html}</div>`);
  await page.addScriptTag({
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();
  return page;
}

export async function waitForTimeout(duration: number) {
  return new Promise(r => setTimeout(r, duration));
}
