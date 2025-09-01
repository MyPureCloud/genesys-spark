import { NewSpecPageOptions, SpecPage } from '@stencil/core/internal';
import { newSpecPage as stencilSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { RenderConfig } from './commonTestUtils';

type ExtraActionsFn = (page: SpecPage) => Promise<void>;

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
  language: string = 'en',
  extraActions: ExtraActionsFn = () => Promise.resolve()
) {
  renderConfigs.forEach(({ description, html }, index) => {
    it(
      description || `should render component as expected (${index + 1})`,
      async () => {
        const page = await newSpecPage({ components, html, language });

        await extraActions(page);

        expect(page.root).toMatchSnapshot();
      }
    );
  });
}

export { RenderConfig } from './commonTestUtils';
