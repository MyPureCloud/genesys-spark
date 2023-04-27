import { newE2EPage } from '@stencil/core/testing';
import { axeConfig } from './axeConfig';
export async function a11yCheck(page, axeExclusions = [], axeScanContext = '') {
  const axeScanDetails = {
    axeExclusions,
    axeScanContext
  };
  const axeResults = await page.evaluate(`window.axe.run('body > *', ${JSON.stringify(axeConfig)})`);
  // eslint-disable-next-line
  expect(axeResults.violations).toHaveNoViolations(axeScanDetails);
}
export async function newSparkE2EPage({ html }, lang = 'en') {
  const page = await newE2EPage();
  await page.setContent(`<div lang=${lang}>${html}</div>`);
  await page.addScriptTag({
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();
  return page;
}
