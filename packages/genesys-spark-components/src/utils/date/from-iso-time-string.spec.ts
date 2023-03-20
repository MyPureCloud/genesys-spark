import { fromIsoTime } from './from-iso-time-string';

describe('#fromIsoTime', () => {
  [{ input: '01:02:03', expectedOutput: [1, 2, 3] }].forEach(
    ({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const [expectedHours, expectedMinutes, expectedSeconds] =
          expectedOutput;
        const output = fromIsoTime(input);

        expect(output.getUTCHours()).toBe(expectedHours);
        expect(output.getUTCMinutes()).toBe(expectedMinutes);
        expect(output.getUTCSeconds()).toBe(expectedSeconds);
        expect(output.getUTCMilliseconds()).toBe(0);
      });
    }
  );
});
