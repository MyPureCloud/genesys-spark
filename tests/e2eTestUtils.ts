import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { axeConfig } from './axeConfig';

export async function a11yCheck(page: E2EPage, axeExclusions = []) {
  const axeResults = await page.evaluate(
    `window.axe.run('body > *', ${JSON.stringify(axeConfig)})`
  );
  expect(axeResults.violations).toHaveNoViolations(axeExclusions);
}

export async function newSparkE2EPage({ html }): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(html);
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();
  return page;
}
