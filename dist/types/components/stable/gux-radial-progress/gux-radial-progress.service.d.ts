import { GuxRadialProgressScale } from './gux-radial-progress.types';
export declare const RADIUS = 23.5;
export declare const STROKE_DASH: number;
export declare function canShowPercentageState(value: number, max: number): boolean;
export declare function getPercentageString(value: number, max: number, scale: GuxRadialProgressScale): string;
