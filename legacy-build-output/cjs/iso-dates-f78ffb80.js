'use strict';

function asIsoDate(date) {
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateStr = date.getDate().toString().padStart(2, '0');
  return `${date.getFullYear()}-${monthStr}-${dateStr}`;
}
function asIsoDateRange(date1, date2) {
  const [start, end] = sortedDates([date1, date2]);
  return `${asIsoDate(start)}/${asIsoDate(end)}`;
}
function fromIsoDate(isoDate) {
  const [yearStr, monthStr, dayStr] = isoDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // zero-indexed month
  const day = parseInt(dayStr, 10);
  return new Date(year, month, day);
}
function fromIsoDateRange(isoDateRange) {
  const [startIsoDate, endIsoDate] = isoDateRange.split('/');
  return [fromIsoDate(startIsoDate), fromIsoDate(endIsoDate)];
}
function sortedDates(dates) {
  return dates.sort((d1, d2) => (d1 < d2 ? -1 : 1));
}

exports.asIsoDate = asIsoDate;
exports.asIsoDateRange = asIsoDateRange;
exports.fromIsoDate = fromIsoDate;
exports.fromIsoDateRange = fromIsoDateRange;
