import { JSX } from '../../../stencil-public-runtime';
import { GuxRadialProgressScale } from './gux-radial-progress.types';
export declare class GuxRadialProgress {
  private dropshadowId;
  private root;
  /**
   * The progress made in the progress spinner compared to the max value
   */
  value: number;
  /**
   * The max value of the progress spinner
   */
  max: number;
  /**
   * The max number of decimal places that will be displayed
   */
  scale: GuxRadialProgressScale;
  /**
   * Required localized text to provide an accessible label for the component
   */
  screenreaderText: string;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): JSX.Element;
}
