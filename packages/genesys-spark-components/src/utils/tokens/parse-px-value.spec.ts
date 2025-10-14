import { parsePxValue } from './parse-px-value';

describe('parsePxValue', () => {
  [
    { input: '4px', expected: 4 },
    { input: '16px', expected: 16 },
    { input: '0px', expected: 0 },
    { input: '-5px', expected: -5 },
    { input: '1.5px', expected: 1.5 },
    { input: '999999px', expected: 999999 },
    { input: '.5px', expected: 0.5 },
    { input: '4em', expected: 0 },
    { input: '16rem', expected: 0 },
    { input: '100%', expected: 0 },
    { input: 'auto', expected: 0 },
    { input: '', expected: 0 },
    { input: 'invalid', expected: 0 }
  ].forEach(({ input, expected }) => {
    it(`should parse ${input} correctly`, () => {
      expect(parsePxValue(input)).toBe(expected);
    });
  });
});
