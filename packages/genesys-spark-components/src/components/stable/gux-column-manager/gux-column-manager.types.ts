export type InternalOrderChange = {
  oldIndex: number;
  newIndex: number;
};

export type InternalHighlightResults = {
  matchCount: number;
  currentMatch: number;
};

export type GuxOrder = string[];

export type InternalKeyboardReorderMove = {
  delta: number;
  column: string;
};
