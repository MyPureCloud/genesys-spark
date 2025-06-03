import { formatOffset, getTimeZoneList } from './time-zone';

describe('#formattOffset', () => {
  [
    { input: 0, expectedOutput: '+00:00' },
    { input: 60, expectedOutput: '+01:00' },
    { input: -60, expectedOutput: '-01:00' },
    { input: -720, expectedOutput: '-12:00' },
    { input: +720, expectedOutput: '+12:00' }
  ].forEach(({ input, expectedOutput }, index) => {
    it(`should work as expected (${index + 1})`, () => {
      const output = formatOffset(input);

      expect(output).toBe(expectedOutput);
    });
  });
});

describe('#getTimeZoneList', () => {
  it('should should retrieve the list', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-09-26'));
    const output = getTimeZoneList();

    expect(output.length).toBe(584);
  });
});
