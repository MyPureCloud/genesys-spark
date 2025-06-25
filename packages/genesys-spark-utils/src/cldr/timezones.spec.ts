import { getCldrTimezoneExemplarCity } from './timezones';

describe('getCldrTimezoneExemplarCity', () => {
  const cases: [string, string, string][] = [
    ['en', 'Etc/UTC', 'UTC'],
    ['en', 'America/St_Barthelemy', 'St. Barthélemy'],
    ['en', 'Africa/Asmera', 'Asmara'],
    ['en', 'Africa/Asmara', 'Asmara'],
    ['en', 'America/Indiana/Indianapolis', 'Indianapolis'],
    ['en', 'Pacific/Easter', 'Easter Island'],
    ['fr', 'Etc/UTC', 'UTC'],
    ['fr', 'Africa/Asmera', 'Asmara'],
    ['fr', 'Africa/Asmara', 'Asmara'],
    ['fr', 'America/Indiana/Indianapolis', 'Indianapolis'],
    ['fr', 'Pacific/Easter', 'Île de Pâques'],
    ['xx', 'America/New_York', 'New York'],
    ['en', 'Continent/City', 'City'],
  ];
    test.each(cases)('[%s] %s -> %s', (locale, input, expected) => {
      const result = getCldrTimezoneExemplarCity(input, locale);
      expect(result).toBe(expected);
    });
}); 