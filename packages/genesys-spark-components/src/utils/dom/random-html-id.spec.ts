import { randomHTMLId } from './random-html-id';

describe('#randomHTMLId', () => {
  it('should return an id with a default prefix', () => {
    const output = randomHTMLId();

    expect(output.startsWith('gux-')).toBe(true);
    expect(output.length).toBeGreaterThan(4);
  });

  it('should return an id with a supplied prefix', () => {
    const prefix = 'test';
    const output = randomHTMLId(prefix);

    expect(output.startsWith(`${prefix}-`)).toBe(true);
    expect(output.length).toBeGreaterThan(`${prefix}-`.length);
  });
});
