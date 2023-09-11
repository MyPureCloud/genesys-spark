import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '../../../utils/error/log-error';

import {
  GuxPercentageState,
  GuxSpinnerState
} from './gux-radial-progress.functional';
import { canShowPercentageState } from './gux-radial-progress.service';

@Component({
  styleUrl: 'gux-radial-progress.scss',
  tag: 'gux-radial-progress',
  shadow: true
})
export class GuxRadialProgress {
  @Element()
  private root: HTMLElement;

  /**
   * The progress made in the progress spinner compared to the max value
   */
  @Prop()
  value: number;

  /**
   * The max value of the progress spinner
   */
  @Prop()
  max: number = 100;

  /**
   * Required localized text to provide an accessible label for the component
   */
  @Prop()
  screenreaderText: string = '';

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    if (
      !this.screenreaderText &&
      canShowPercentageState(this.value, this.max)
    ) {
      logWarn(
        this.root,
        'No screenreader-text provided. Provide a localized screenreader-text property for the component.'
      );
    }
  }

  render(): JSX.Element {
    return canShowPercentageState(this.value, this.max)
      ? ((
          <GuxPercentageState
            value={this.value}
            max={this.max}
            screenreaderText={this.screenreaderText}
          />
        ) as JSX.Element)
      : ((
          <GuxSpinnerState screenreaderText={this.screenreaderText} />
        ) as JSX.Element);
  }
}
