import { NewSpecPageOptions } from '@stencil/core/internal';
import { newSpecPage as stencilSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { RenderConfig } from './commonTestUtils';

export async function newSpecPage(opts: NewSpecPageOptions) {
  global.MutationObserver = MutationObserver;
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  (global.InputEvent as unknown) = Event;

  const page = await stencilSpecPage(opts);

  return page;
}

export async function checkRenders(
  renderConfigs: RenderConfig[],
  components: unknown[],
  language: string = 'en'
) {
  renderConfigs.forEach(({ description, html }, index) => {
    it(
      description || `should render component as expected (${index + 1})`,
      async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      }
    );
  });
}

export { RenderConfig } from './commonTestUtils';
