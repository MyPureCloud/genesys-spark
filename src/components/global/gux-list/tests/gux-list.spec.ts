import { GuxList } from '../gux-list';

describe('gux-list', () => {
  it('builds', () => {
    let obs = false;

    global.MutationObserver = class MutationObserver {
      disconnect() {
        obs = false;
      }

      observe() {
        obs = true;
      }
    };

    expect(new GuxList()).toBeTruthy();
    expect(obs).toBeFalsy();
  });
});
