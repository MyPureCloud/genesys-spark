import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { logError } from '../../../utils/error/log-error';
import { randomHTMLId } from '../../../utils/dom/random-html-id';

import {
  canShowPercentageState,
  getPercentageString,
  RADIUS,
  STROKE_DASH
} from './gux-radial-progress.service';
import { GuxRadialProgressScale } from './gux-radial-progress.types';

@Component({
  styleUrl: 'gux-radial-progress.less',
  tag: 'gux-radial-progress',
  shadow: true
})
export class GuxRadialProgress {
  private dropshadowId = randomHTMLId('gux-dropshadow');

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
   * The max number of decimal places that will be displayed
   */
  @Prop()
  scale: GuxRadialProgressScale = 0;

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
      logError(
        'gux-radial-progress',
        'No screenreader-text provided. Provide a localized screenreader-text property for the component.'
      );
    }
  }

  render(): JSX.Element {
    return canShowPercentageState(this.value, this.max)
      ? this.renderPercentageState(
          this.value,
          this.max,
          this.scale,
          this.screenreaderText
        )
      : this.renderSpinnerState(this.screenreaderText);
  }

  private renderPercentageState(
    value: number,
    max: number,
    scale: GuxRadialProgressScale,
    screenreaderText: string
  ): JSX.Element {
    return (
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-label={screenreaderText}
      >
        <svg
          class="gux-svg-container"
          width="60px"
          height="60px"
          viewBox="0 0 60 60"
          role="presentation"
        >
          <filter id={this.dropshadowId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <circle cx="50%" cy="50%" r={RADIUS} class="gux-static-circle" />
          <circle
            cx="50%"
            cy="50%"
            r={RADIUS}
            class="gux-dynamic-circle-shadow"
            stroke-dashoffset={STROKE_DASH * (1 - value / max)}
            stroke-dasharray={STROKE_DASH}
            stroke-linecap="round"
            filter={'url(#' + this.dropshadowId + ')'}
          />
          <circle
            cx="50%"
            cy="50%"
            r={RADIUS}
            class="gux-dynamic-circle"
            stroke-dashoffset={STROKE_DASH * (1 - value / max)}
            stroke-dasharray={STROKE_DASH}
            stroke-linecap="round"
          />

          <text
            x="50%"
            y="50%"
            dominant-baseline="central"
            class={{
              'gux-percentage': true,
              'gux-small': ![0, 1].includes(this.scale)
            }}
          >
            {getPercentageString(value, max, scale)}
          </text>
        </svg>
      </div>
    );
  }

  private renderSpinnerState(screenreaderText: string): JSX.Element {
    return (
      <gux-radial-loading
        screenreader-text={screenreaderText}
        context="modal"
      ></gux-radial-loading>
    );
  }
}
