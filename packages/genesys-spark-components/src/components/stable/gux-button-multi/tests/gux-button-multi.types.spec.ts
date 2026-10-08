import { getGuxButtonMultiAccent } from '../gux-button-multi.types';

describe('getGuxButtonMultiAccent', () => {
  it('returns danger when accent is danger', () => {
    expect(getGuxButtonMultiAccent('danger')).toBe('danger');
  });

  it('returns secondary for unknown accent values', () => {
    expect(getGuxButtonMultiAccent('inline')).toBe('secondary');
    expect(getGuxButtonMultiAccent('not-an-accent')).toBe('secondary');
  });
});
