import { AxeResults } from 'axe-core';
import { expect as baseExpect } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { RenderConfig } from './commonTestUtils';

import {
  toHaveNoViolations,
  AxeExclusion,
  AxeScanDetails
} from './expectToHaveNoViolations';

const modes = ['light', 'dark'] as const;
type Mode = (typeof modes)[number];

export const expect = baseExpect.extend({ toHaveNoViolations });

async function setMode(page: E2EPage, mode: Mode) {
  const html = page.locator('html');
  await html.evaluate(
    (element, mode) => element.setAttribute('flare-mode', mode),
    mode
  );
}

export async function runAxe(page: E2EPage): Promise<AxeResults> {
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
  performA11yCheck: boolean = true,
  disableAnimations: boolean = false,
  axeScanDetails: AxeScanDetails = { axeExclusions: [] }
) {
  for (const mode of modes) {
    await setMode(page, mode);
    await extraActions(page);
    await snap(
      page,
      element,
      performA11yCheck,
      disableAnimations,
      axeScanDetails
    );
  }
}

export async function snap(
  page: E2EPage,
  element?: string,
  performA11yCheck: boolean = true,
  disableAnimations: boolean = false,
  axeScanDetails: AxeScanDetails = { axeExclusions: [] }
) {
  if (performA11yCheck) {
    expect((await runAxe(page)).violations).toHaveNoViolations(axeScanDetails);
  }

  const animations = disableAnimations ? 'disabled' : 'allow';

  if (await page.locator('gux-tooltip').isVisible()) {
    expect(await page.screenshot({ animations })).toMatchSnapshot();
  } else if (element && (await page.locator(element).isVisible())) {
    expect(
      await page.locator(element).screenshot({ animations })
    ).toMatchSnapshot();
  } else {
    expect(await page.screenshot({ animations })).toMatchSnapshot();
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
      url: 'https://apps.inindca.com/webfonts/noto-sans-mono.css'
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

type CheckRendersParams = {
  renderConfigs: RenderConfig[];
  element?: string;
  extraActions?: ExtraActionsFn;
  performA11yCheck?: boolean;
  disableAnimations?: boolean;
  skip?: boolean;
  axeExclusions?: AxeExclusion[];
};

export async function checkRenders({
  renderConfigs,
  element,
  extraActions = () => Promise.resolve(),
  performA11yCheck = true,
  disableAnimations = false,
  skip = false,
  axeExclusions = []
}: CheckRendersParams) {
  renderConfigs.forEach(({ description, html }, index) => {
    (skip ? test.skip : test)(
      description || `should render component as expected (${index + 1})`,
      async ({ page }) => {
        await setContent(page, html);
        await analyze(
          page,
          element,
          extraActions,
          performA11yCheck,
          disableAnimations,
          { axeExclusions }
        );
      }
    );
  });
}

type ExtraActionsFn = (page: E2EPage) => Promise<void>;

export { RenderConfig } from './commonTestUtils';
export { test, E2EPage } from '@stencil/playwright';
export { AxeExclusion, AxeScanDetails } from './expectToHaveNoViolations';
