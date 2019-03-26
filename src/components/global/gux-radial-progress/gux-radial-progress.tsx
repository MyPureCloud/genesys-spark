import { Component, Prop } from '@stencil/core';

const RADIUS = 26;
const STROKE_DASH = 2 * Math.PI * RADIUS;

@Component({
  styleUrl: 'gux-radial-progress.less',
  tag: 'gux-radial-progress'
})
export class GuxRadialProgress {
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

  render() {
    return (
      this.value === undefined ?
        (
          <div aria-busy="true">
            <div class="gux-spinner gux-spinner-animation"/>
          </div>
        ) :
        (
          <div role="progressbar" aria-valuenow={this.value} aria-valuemin="0" aria-valuemax={this.max}>
            <svg class="svg-container" width="65px" height="65px" viewBox="0 0 65 65">
              <filter id="dropshadow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                <feOffset dx="0" dy="0" result="offsetblur"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <circle
                cx="50%"
                cy="50%"
                r={RADIUS}
                class="static-circle"
              />
              <circle
                cx="50%"
                cy="50%"
                r={RADIUS}
                class="dynamic-circle"
                stroke-dashoffset={STROKE_DASH * (1 - (this.value / this.max))}
                stroke-dasharray={STROKE_DASH}
                filter="url(#dropshadow)"
              />

              <text
                x="50%"
                y="50%"
                class="percentage"
              >
                {`${Math.round(this.value / this.max * 100)}%`}
              </text>
            </svg>
          </div>
        )
    );
  }
}
