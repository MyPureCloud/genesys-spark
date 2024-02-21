import { getDesiredLocale } from '../../../i18n';
import * as sparkIntl from '../../../genesys-spark-utils/intl';
import { readRegionalDatesCookie } from '../../../i18n/check-regional-dates-cookie';

import {
  GuxClockType,
  GuxMinuteInterval,
  GuxMinuteStep,
  GuxISOHourMinute
} from './gux-time-picker.type';

export function getTimeDisplayValues(
  minuteInterval: GuxMinuteInterval,
  clockType: GuxClockType
): GuxISOHourMinute[] {
  const minuteOptions = [0, 15, 30, 45]
    .filter(option => Number.isInteger(option / minuteInterval))
    .map(x => String(x).padStart(2, '0'));
  const hourOptions =
    clockType === '12h'
      ? ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
      : Array.from(Array(24).keys()).map(x => String(x).padStart(2, '0'));

  return hourOptions.reduce((acc, hourOption) => {
    return acc.concat(
      minuteOptions.map(
        minuteOption => `${hourOption}:${minuteOption}`
      ) as GuxISOHourMinute[]
    );
  }, [] as GuxISOHourMinute[]);
}

export function getLocaleClockType(root: HTMLElement): GuxClockType {
  let locale: string;
  if (readRegionalDatesCookie()) {
    locale = sparkIntl.determineDisplayLocale(root).toLowerCase();
  } else {
    locale = getDesiredLocale(root).toLowerCase();
  }
  const date = new Date('January 19, 1975 15:00:00 UTC+00:00');
  const time = new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
    timeZone: 'UTC'
  }).format(date);

  // The localization team has requested that some locales be hardcoded to the 24h clock. https://inindca.atlassian.net/browse/LOCAL-9597
  const localesSetTo24h = ['ar', 'ko', 'zh-cn', 'zh-tw'];
  if (
    localesSetTo24h.some(localeSetTo24h => locale.startsWith(localeSetTo24h))
  ) {
    return '24h';
  }

  return new RegExp('.*15.*').test(time) ? '24h' : '12h';
}

export function incrementHour(
  value: GuxISOHourMinute,
  delta: 1 | -1 | 12
): GuxISOHourMinute {
  const [hour, minute] = value.split(':');
  const newHour = ((parseInt(hour, 10) + delta + 24) % 24)
    .toString()
    .padStart(2, '0');

  return `${newHour}:${minute}`;
}

export function incrementMinute(
  value: GuxISOHourMinute,
  delta: 1 | -1,
  step: GuxMinuteStep
): GuxISOHourMinute {
  const [hour, minute] = value.split(':');
  const minuteInt = parseInt(minute, 10);
  let newMinuteInt = (minuteInt + delta + 60) % 60;

  while (newMinuteInt % step !== 0) {
    newMinuteInt = (newMinuteInt + delta + 60) % 60;
  }

  const newMinute = newMinuteInt.toString().padStart(2, '0');

  return `${hour}:${newMinute}`;
}

export function getDisplayValue(
  value: GuxISOHourMinute,
  clockType: GuxClockType
): GuxISOHourMinute {
  const [hour, minute] = value.split(':');

  if (clockType === '12h') {
    return `${(parseInt(hour, 10) % 12 || 12).toString()}:${minute}`;
  }

  return `${hour}:${minute}`;
}

export function getValue(
  displayValue: GuxISOHourMinute,
  clockType: GuxClockType,
  isAm: boolean
): GuxISOHourMinute {
  const [hour, minute] = displayValue.split(':');

  if (clockType === '12h') {
    if (isAm) {
      return `${(parseInt(hour, 10) % 12)
        .toString()
        .padStart(2, '0')}:${minute}`;
    }
    return `${((parseInt(hour, 10) % 12) + 12)
      .toString()
      .padStart(2, '0')}:${minute}`;
  }

  return `${hour}:${minute}`;
}

export function getHourDisplayValue(
  value: GuxISOHourMinute,
  clockType: GuxClockType
): string {
  const [hour] = getDisplayValue(value, clockType).split(':');
  return hour;
}

export function getMinuteDisplayValue(value: GuxISOHourMinute): string {
  const [, minute] = value.split(':');

  return minute;
}

export function isAm(value: GuxISOHourMinute): boolean {
  const [hour] = value.split(':');
  return parseInt(hour, 10) < 12;
}

export function getHoursPattern(clockType: GuxClockType): string {
  if (clockType === '12h') {
    return '^(0?[1-9]|1[012])$';
  }

  return '^([01]?[0-9]|2[0-3])$';
}

export function getMinutesPattern(): string {
  return '^[0-5][0-9]$';
}

export function getValidValueHourChange(
  value: GuxISOHourMinute,
  clockType: GuxClockType,
  change: string,
  selectionStart: number,
  hourInputLength: number
): GuxISOHourMinute {
  const [displayValue, minute] = getDisplayValue(value, clockType).split(':');

  let wantedDisplayValue = displayValue;

  if (change === 'Backspace') {
    if (clockType == '12h' && hourInputLength == 1) {
      wantedDisplayValue = wantedDisplayValue
        .split('')
        .filter((_, i) => i == selectionStart - 1)
        .join('');
    } else {
      wantedDisplayValue = wantedDisplayValue
        .split('')
        .filter((_, i) => i !== selectionStart - 1)
        .join('')
        .padStart(2, '0');
    }
  } else {
    wantedDisplayValue = parseInt(
      wantedDisplayValue.slice(0, selectionStart) +
        change +
        wantedDisplayValue.slice(selectionStart + 1),
      10
    )
      .toString()
      .slice(-2)
      .padStart(2, '0');
  }

  if (!new RegExp(getHoursPattern(clockType)).test(wantedDisplayValue)) {
    if (clockType === '12h') {
      wantedDisplayValue = change;
    } else {
      wantedDisplayValue = change.padStart(2, '0');
    }
  }
  return getValue(`${wantedDisplayValue}:${minute}`, clockType, isAm(value));
}

export function getValidValueMinuteChange(
  value: GuxISOHourMinute,
  change: string,
  selectionStart: number
): GuxISOHourMinute {
  const [hour, minute] = value.split(':');

  let wanted = minute;

  if (change === 'Backspace') {
    wanted = wanted
      .split('')
      .filter((_, i) => i !== selectionStart - 1)
      .join('')
      .padStart(2, '0');
  } else {
    wanted = (
      wanted.slice(0, selectionStart) +
      change +
      wanted.slice(selectionStart + 1)
    )
      .slice(-2)
      .padStart(2, '0');
  }

  if (!new RegExp(getMinutesPattern()).test(wanted)) {
    wanted = change.padStart(2, '0');
  }

  return `${hour}:${wanted}`;
}
