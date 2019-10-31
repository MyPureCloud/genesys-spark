import { GuxList } from '../gux-list';

describe('gux-list', () => {
  let obs = false;

  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {
        obs = false;
      }

      observe() {
        obs = true;
      }
    };
  });

  it('builds', () => {
    expect(new GuxList()).toBeTruthy();
    expect(obs).toBeFalsy();
  });

  afterEach(() => {
    delete global.MutationObserver;
  });
});
