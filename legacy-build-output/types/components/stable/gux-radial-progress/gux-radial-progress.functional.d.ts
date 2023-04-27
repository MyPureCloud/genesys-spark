import { FunctionalComponent } from '../../../stencil-public-runtime';
import { GuxRadialProgressScale } from './gux-radial-progress.types';
interface GuxSpinnerStateProps {
  screenreaderText: string;
}
interface GuxPercentageStateProps {
  value: number;
  max: number;
  dropshadowId: string;
  scale: GuxRadialProgressScale;
  screenreaderText: string;
}
interface GuxSpinnerStateProps {
  screenreaderText: string;
}
export declare const GuxPercentageState: FunctionalComponent<GuxPercentageStateProps>;
export declare const GuxSpinnerState: FunctionalComponent<GuxSpinnerStateProps>;
export {};
