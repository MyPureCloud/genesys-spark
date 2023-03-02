import { hasContent } from '../gux-form-field.service';

describe('gux-form-field.service', () => {
  describe('#hasContent', () => {
    [
      { input: undefined, expectedOutput: false },
      { input: null, expectedOutput: false },
      { input: { value: undefined }, expectedOutput: false },
      { input: { value: null }, expectedOutput: false },
      { input: { value: '' }, expectedOutput: false },
      { input: { value: 'test' }, expectedOutput: true },
      { input: { value: '0' }, expectedOutput: true },
      { input: { value: 'false' }, expectedOutput: true }
    ].forEach(({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, async () => {
        expect(hasContent(input as HTMLInputElement)).toBe(expectedOutput);
      });
    });
  });
});
