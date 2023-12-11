import { NewSpecPageOptions } from '@stencil/core/internal';
import { newSpecPage as stencilSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import ResizeObserver from 'resize-observer-polyfill';

export async function newSpecPage(opts: NewSpecPageOptions) {
  global.MutationObserver = MutationObserver;
  global.ResizeObserver = ResizeObserver;
  (global.InputEvent as unknown) = Event;

  const page = await stencilSpecPage(opts);

  return page;
}
