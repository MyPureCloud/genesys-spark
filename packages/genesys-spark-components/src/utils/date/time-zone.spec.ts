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
  // Spot check zones rather than entire list, because this will change depending on the version of node being run, and thus would require an exact node version for each local test run
  it('should should retrieve the list', () => {
    jest.setSystemTime(new Date('2023-09-26'));
    const output = getTimeZoneList();

    expect(output.length).toEqual(576);
    expect(output).toContainEqual({
      name: 'Etc/GMT',
      alternativeName: '',
      group: [],
      continentCode: '',
      continentName: '',
      countryName: '',
      countryCode: '',
      rawOffsetInMinutes: 0,
      abbreviation: 'Etc/GMT',
      rawFormat: '',
      currentTimeOffsetInMinutes: 0,
      currentTimeFormat: '',
      mainCities: []
    });

    expect(output).toContainEqual({
      name: 'America/Toronto',
      alternativeName: 'Eastern Time',
      group: [
        'America/Iqaluit',
        'America/Toronto',
        'America/Pangnirtung',
        'Canada/Eastern',
        'America/Nassau',
        'America/Montreal',
        'America/Nipigon',
        'America/Thunder_Bay'
      ],
      continentCode: 'NA',
      continentName: 'North America',
      countryName: 'Canada',
      countryCode: 'CA',
      mainCities: ['Toronto', 'Montréal', 'Ottawa', 'Mississauga'],
      rawOffsetInMinutes: -300,
      abbreviation: 'EST',
      rawFormat: '-05:00 Eastern Time - Toronto, Montréal, Ottawa, Mississauga',
      currentTimeOffsetInMinutes: -240,
      currentTimeFormat:
        '-04:00 Eastern Time - Toronto, Montréal, Ottawa, Mississauga'
    });
    expect(output).toContainEqual({
      name: 'Europe/Rome',
      alternativeName: 'Central European Time',
      group: ['Europe/Rome', 'Europe/San_Marino', 'Europe/Vatican'],
      continentCode: 'EU',
      continentName: 'Europe',
      countryName: 'Italy',
      countryCode: 'IT',
      mainCities: ['Rome', 'Milan', 'Naples', 'Turin'],
      rawOffsetInMinutes: 60,
      abbreviation: 'CET',
      rawFormat: '+01:00 Central European Time - Rome, Milan, Naples, Turin',
      currentTimeOffsetInMinutes: 120,
      currentTimeFormat:
        '+02:00 Central European Time - Rome, Milan, Naples, Turin'
    });
    expect(output).toContainEqual({
      name: 'Portugal',
      alternativeName: 'Western European Time',
      group: ['Atlantic/Madeira', 'Europe/Lisbon', 'Portugal'],
      continentCode: 'EU',
      continentName: 'Europe',
      countryName: 'Portugal',
      countryCode: 'PT',
      mainCities: ['Lisbon', 'Porto', 'Amadora', 'Braga'],
      rawOffsetInMinutes: 0,
      abbreviation: 'WET',
      rawFormat: '+00:00 Western European Time - Lisbon, Porto, Amadora, Braga',
      currentTimeOffsetInMinutes: 60,
      currentTimeFormat:
        '+01:00 Western European Time - Lisbon, Porto, Amadora, Braga'
    });
  });
});
