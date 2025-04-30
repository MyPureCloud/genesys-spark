import { AxeResults } from 'axe-core';
import { expect } from '@playwright/test';
import { E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

const modes = ['light', 'dark'] as const;
type Mode = (typeof modes)[number];

async function setMode(page: E2EPage, mode: Mode) {
  const html = page.locator('html');
  await html.evaluate(
    (element, mode) => element.setAttribute('flare-mode', mode),
    mode
  );
}

async function runAxe(page: E2EPage): Promise<AxeResults> {
  return new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      // 'wcag2aaa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa'
    ])
    .analyze();
}

export async function analyze(page: E2EPage) {
  for (const mode of modes) {
    await setMode(page, mode);
    expect((await runAxe(page)).violations).toHaveLength(0);
    expect(await page.screenshot()).toMatchSnapshot();
  }
}

async function setupPage(page: E2EPage) {
  await Promise.all([
    page.addStyleTag({
      url: 'https://apps.inindca.com/webfonts/urbanist.css'
    }),
    page.addStyleTag({
      url: 'https://apps.inindca.com/webfonts/noto-sans.css'
    }),
    page.addStyleTag({
      path: 'public/build/genesys-webcomponents.css'
    }),
    page.addStyleTag({
      content: `
        html {
          color: var(--gse-semantic-foreground-container-highEmphasis);
          background-color: var(--gse-semantic-background-container-page-default);
        }
      `
    })
  ]);
}

export async function setContent(page: E2EPage, html: string) {
  await page.setContent(html);
  await setupPage(page);
}

export { test, E2EPage } from '@stencil/playwright';
export { expect } from '@playwright/test';
