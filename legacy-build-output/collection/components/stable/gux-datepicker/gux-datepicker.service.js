export function getCalendarLabels(labelString, mode, defaultLabels) {
  const labels = labelString.split(',').map(label => label.trim());
  if (mode === "range" /* CalendarModes.Range */) {
    return [labels[0] || defaultLabels[0], labels[1] || defaultLabels[1]];
  }
  else if (mode !== "range" /* CalendarModes.Range */ && !labels[0]) {
    return [defaultLabels[2]];
  }
  return [labels[0]];
}
export function isOutOfBoundsDate(value, min, max) {
  return (max && max < value) || (min && min > value);
}
export function getClampedMonthValue(unclampedMonthValue) {
  let clampedMonthValue = unclampedMonthValue;
  while (clampedMonthValue < 0) {
    clampedMonthValue += 12;
  }
  clampedMonthValue = clampedMonthValue % 12;
  return clampedMonthValue;
}
export function incrementDay(delta, focusedDateValue) {
  let newDay = new Date(focusedDateValue.getTime());
  newDay.setDate(newDay.getDate() + delta);
  if (delta < 0) {
    if (newDay.getDate() > focusedDateValue.getDate()) {
      newDay = new Date(focusedDateValue.getFullYear(), focusedDateValue.getMonth() + 1, 0, 0, 0, 0);
    }
  }
  else {
    if (newDay.getDate() < focusedDateValue.getDate()) {
      newDay.setMonth(newDay.getMonth() - 1);
    }
  }
  return newDay;
}
export function incrementMonth(delta, focusedDateValue) {
  const newMonth = new Date(focusedDateValue.valueOf());
  const newMonthValue = getClampedMonthValue(newMonth.getMonth() + delta);
  newMonth.setMonth(newMonthValue);
  newMonth.setFullYear(focusedDateValue.getFullYear());
  if (newMonth.getMonth() !== newMonthValue) {
    return incrementMonth(delta, incrementDay(-1, focusedDateValue));
  }
  return newMonth;
}
export function incrementYear(delta, focusedDateValue) {
  const newYear = new Date(focusedDateValue.valueOf());
  newYear.setFullYear(focusedDateValue.getFullYear() + delta);
  return newYear;
}
export function getFormattedDay(date) {
  return `0${date.getDate().toString()}`.slice(-2);
}
export function getFormattedMonth(date) {
  return `0${(date.getMonth() + 1).toString()}`.slice(-2);
}
export function getFormattedYear(date, yearFormat) {
  if (yearFormat === 'yyyy') {
    return date.getFullYear().toString();
  }
  else {
    return date.getFullYear().toString().slice(-2);
  }
}
export function getFormattedDate(date, format) {
  const formatSeparator = getFormatSeparator(format);
  const dateString = format
    .split(formatSeparator)
    .map(intervalFormat => {
    switch (intervalFormat[0]) {
      case 'd':
        return getFormattedDay(date);
      case 'm':
        return getFormattedMonth(date);
      case 'y':
        return getFormattedYear(date, intervalFormat);
    }
  })
    .join(formatSeparator);
  return dateString;
}
export function getIntervalLetter(format, index) {
  const intervalLetter = format[index];
  if (!intervalLetter || intervalLetter === '/') {
    return format[index - 1];
  }
  return intervalLetter;
}
export function getFormatSeparator(format) {
  return format.match(/\W/)[0];
}
export function getPreviousIntervalRange(format, currentIntervalRange) {
  const intervalOrder = getIntervalOrder(format);
  const currentIntervalLetter = getIntervalLetter(format, currentIntervalRange.selectionStart);
  const currentIntervalOrderIndex = intervalOrder.indexOf(currentIntervalLetter);
  const newIntervalOrderIndex = (currentIntervalOrderIndex + intervalOrder.length - 1) %
    intervalOrder.length;
  const newIntervalLetter = intervalOrder[newIntervalOrderIndex];
  return getIntervalRange(format, newIntervalLetter);
}
export function getNextIntervalRange(format, currentIntervalRange) {
  const intervalOrder = getIntervalOrder(format);
  const currentIntervalLetter = getIntervalLetter(format, currentIntervalRange.selectionStart);
  const currentIntervalOrderIndex = intervalOrder.indexOf(currentIntervalLetter);
  const newIntervalOrderIndex = (currentIntervalOrderIndex + 1) % intervalOrder.length;
  const newIntervalLetter = intervalOrder[newIntervalOrderIndex];
  return getIntervalRange(format, newIntervalLetter);
}
export function getIntervalOrder(format) {
  const formatSeperator = getFormatSeparator(format);
  return format
    .split(formatSeperator)
    .reduce((acc, cv) => acc.concat(cv[0]), []);
}
export function getIntervalRange(format, intervalLetter) {
  const selectionStart = format.indexOf(intervalLetter);
  const selectionEnd = format.lastIndexOf(intervalLetter) + 1;
  return { selectionStart, selectionEnd };
}
