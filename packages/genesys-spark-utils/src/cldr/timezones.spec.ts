import { getCldrTimezoneCountryName, getCldrTimezoneExemplarCity, getCldrTimezoneLabel } from './timezones';

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

describe('getCldrTimezoneCountryName', () => {
  const cases: [string, string, string][] = [
    ['en', 'America/New_York', 'United States'],
    ['en', 'Europe/London', 'United Kingdom'],
    ['en', 'America/Los_Angeles', 'United States'],
    ['fr', 'America/New_York', 'États-Unis'],
    ['fr', 'Europe/London', 'Royaume-Uni'],
    ['fr', 'America/Los_Angeles', 'États-Unis'],
    ['xx', 'America/New_York', undefined],
  ];
    test.each(cases)('[%s] %s -> %s', (locale, input, expected) => {
      const result = getCldrTimezoneCountryName(input, locale);
      expect(result).toBe(expected);
    });
});
describe('getCldrTimezoneLabel', () => {
  const cases: [string, string, string][] = [
    ['en', 'Etc/UTC', 'UTC'],
    ['en', 'Africa/Asmera', 'Asmara, Kenya'],
    ['en', 'Africa/Asmara', 'Asmara, Eritrea'],
    ['en', 'America/Indiana/Indianapolis', 'Indianapolis, United States'],
    ['en', 'America/St_Barthelemy', 'St. Barthélemy'],
    ['en', 'Europe/London', 'London, United Kingdom'],
    ['en', 'Pacific/Easter', 'Easter Island, Chile'],
    ['fr', 'Etc/UTC', 'UTC'],
    ['fr', 'Africa/Asmera', 'Asmara, Kenya'],
    ['fr', 'Africa/Asmara', 'Asmara, Érythrée'],
    ['fr', 'America/Indiana/Indianapolis', 'Indianapolis, États-Unis'],
    ['fr', 'Pacific/Easter', 'Île de Pâques, Chili'],
    ['xx', 'America/New_York', 'New York'],
    ['en', 'Continent/City', 'City'],
  ];
    test.each(cases)('[%s] %s -> %s', (locale, input, expected) => {
      const result = getCldrTimezoneLabel(input, locale);
      expect(result).toBe(expected);
    });
}); 