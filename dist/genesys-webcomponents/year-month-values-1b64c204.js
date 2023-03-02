function getISOYearMonth(year, month) {
  return `${year}-${month}`;
}
function getYearMonthObject(yearMonthString) {
  const [year, month] = yearMonthString.split('-');
  return { year, month };
}
function getCurrentISOYearMonth() {
  const newDate = new Date();
  const year = newDate.getFullYear().toString();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  return getISOYearMonth(year, month);
}

export { getISOYearMonth as a, getCurrentISOYearMonth as b, getYearMonthObject as g };
