import { newE2EPage } from '@stencil/core/testing';

// Use newSparkE2EPage instead of newE2EPage in the e2e tests to add the axe script to the page
export async function newSparkE2EPage({ html }) {
  const page = await newE2EPage();
  await page.setContent(html);
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();
  return page;
}

// Use axeCheck to check accessibility within the e2e tests
// There is an issue with centralizing this function, so we need to
// add it to each e2e test individually for now

// export async function axeCheck(page, axeExclusions) {
//   const axeResults = await page.evaluate(async axePageConfig => {
//     return await axe.run('body > *', axePageConfig);
//   }, axeConfig);
//   expect(axeResults.violations).toHaveNoViolations(axeExclusions);
// }
