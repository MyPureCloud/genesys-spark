declare const guxActionButtonAccent: readonly ["primary", "secondary", "tertiary", "danger"];
export type GuxActionButtonAccent = (typeof guxActionButtonAccent)[number];
export declare function getGuxActionButtonAccent(maybeGuxActionButtonAccent: string): GuxActionButtonAccent;
export type GuxActionButtonType = 'button' | 'submit' | 'reset';
export {};
