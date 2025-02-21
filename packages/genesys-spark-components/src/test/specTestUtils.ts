import { NewSpecPageOptions } from '@stencil/core/internal';
import { newSpecPage as stencilSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

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
