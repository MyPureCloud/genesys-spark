export type GuxISOYearMonth = `${string}-${string}`;
export type GuxYearMonthObject = {
  year: string;
  month: string;
};
export declare function getISOYearMonth(year: string | number, month: string | number): GuxISOYearMonth;
export declare function getYearMonthObject(yearMonthString: GuxISOYearMonth): GuxYearMonthObject;
export declare function getCurrentISOYearMonth(): GuxISOYearMonth;
