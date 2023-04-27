declare const guxButtonMultiAccent: readonly ["primary", "secondary", "tertiary"];
export type GuxButtonMultiAccent = (typeof guxButtonMultiAccent)[number];
export declare function getGuxButtonMultiAccent(maybeGuxButtonMultiAccent: string): GuxButtonMultiAccent;
export {};
