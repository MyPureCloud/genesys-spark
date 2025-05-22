import { AxeResults } from 'axe-core';
import { expect } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { RenderConfig } from './commonTestUtils';

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

export async function analyze(
  page: E2EPage,
  element?: string,
  extraActions: ExtraActionsFn = () => Promise.resolve(),
  performA11yCheck: boolean = true
) {
  for (const mode of modes) {
    await setMode(page, mode);
    await extraActions(page);
    await snap(page, element, performA11yCheck);
  }
}

export async function snap(
  page: E2EPage,
  element?: string,
  performA11yCheck: boolean = true
) {
  if (performA11yCheck) {
    expect((await runAxe(page)).violations).toHaveLength(0);
  }

  if (await page.locator('gux-tooltip').isVisible()) {
    expect(await page.screenshot()).toMatchSnapshot();
  } else if (element && (await page.locator(element).isVisible())) {
    expect(await page.locator(element).screenshot()).toMatchSnapshot();
  } else {
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

export async function checkRenders(
  renderConfigs: RenderConfig[],
  element?: string,
  extraActions: ExtraActionsFn = () => Promise.resolve(),
  performA11yCheck: boolean = true
) {
  renderConfigs.forEach(({ description, html }, index) => {
    test(
      description || `should render component as expected (${index + 1})`,
      async ({ page }) => {
        await setContent(page, html);
        await analyze(page, element, extraActions, performA11yCheck);
      }
    );
  });
}

type ExtraActionsFn = (page: E2EPage) => Promise<void>;

export { RenderConfig } from './commonTestUtils';
export { test, E2EPage } from '@stencil/playwright';
export { expect } from '@playwright/test';
