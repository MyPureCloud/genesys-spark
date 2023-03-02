export type GuxISOYearMonth = `${string}-${string}`;
export type GuxYearMonthObject = {
  year: string;
  month: string;
};

export function getISOYearMonth(
  year: string | number,
  month: string | number
): GuxISOYearMonth {
  return `${year}-${month}`;
}

export function getYearMonthObject(
  yearMonthString: GuxISOYearMonth
): GuxYearMonthObject {
  const [year, month] = yearMonthString.split('-');

  return { year, month };
}

export function getCurrentISOYearMonth(): GuxISOYearMonth {
  const newDate = new Date();
  const year = newDate.getFullYear().toString();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');

  return getISOYearMonth(year, month);
}
