import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

const RADIUS = 23.5;
const STROKE_DASH = 2 * Math.PI * RADIUS;

let idCounter = 0;

@Component({
  styleUrl: 'gux-radial-progress.less',
  tag: 'gux-radial-progress'
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
   * Required localized text to provide screen reader accessible label for the component
   */
  @Prop()
  screenreaderText: string = '';

  /**
   * Optional value to specify if the component is being used to represent a static meter element.
   */
  @Prop()
  meter: boolean = false;

  private dropshadowId = `dropshadow-${idCounter++}`;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    if (!this.screenreaderText) {
      throw new Error(
        '[gux-radial-progress] No screenreader-text provided. Provide a localized screenreader-text property for the component.'
      );
    }
  }

  render(): JSX.Element {
    return this.canShowPercentage(this.value, this.max)
      ? this.showPercentageState(
          this.value,
          this.max,
          this.screenreaderText,
          this.meter
        )
      : this.showSpinnerState(this.screenreaderText);
  }

  private canShowPercentage(value, max) {
    return !(isNaN(value) || isNaN(max) || value > max || value < 0);
  }

  private showPercentageState(
    value,
    max,
    screenreaderText,
    meter
  ): JSX.Element {
    return (
      <div
        role={meter ? 'meter' : 'progressbar'}
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
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
            class="gux-dynamic-circle"
            stroke-dashoffset={STROKE_DASH * (1 - value / max)}
            stroke-dasharray={STROKE_DASH}
            filter={'url(#' + this.dropshadowId + ')'}
          />

          <text
            x="50%"
            y="50%"
            dominant-baseline="central"
            class="gux-percentage"
          >
            {`${Math.round((value / max) * 100)}%`}
          </text>
        </svg>
      </div>
    );
  }

  private showSpinnerState(screenreaderText): JSX.Element {
    return (
      <gux-radial-loading
        screenreaderText={screenreaderText}
        context="modal"
      ></gux-radial-loading>
    );
  }
}
