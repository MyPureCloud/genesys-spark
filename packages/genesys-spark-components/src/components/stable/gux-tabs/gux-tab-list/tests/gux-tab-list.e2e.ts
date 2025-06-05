import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { renderConfig } from './gux-tab-list.common';

describe('gux-tab-list', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it(renderConfig.description, async () => {
    await page.setContent(renderConfig.html);
    element = await page.find('gux-tab-list');
    expect(element).toHaveAttribute('hydrated');
  });
});
