import { Component, Prop } from '@stencil/core';

const RADIUS = 26;
const STROKE_DASH = 2 * Math.PI * RADIUS;

@Component({
  styleUrl: 'gux-radial-progress.less',
  tag: 'gux-radial-progress'
})
export class GuxRadialProgress {
  /**
   * Indicates the percentage displayed in the progress spinner
   */
  @Prop()
  percentage: number;

  render() {
    return (
      <div>
        {this.percentage === undefined ?
          <div class="gux-spinner gux-spinner-animation"/>
          :
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
              stroke-dashoffset={STROKE_DASH * (1 - (this.percentage / 100))}
              stroke-dasharray={STROKE_DASH}
              filter="url(#dropshadow)"
            />

            <text
              x="50%"
              y="50%"
              class="percentage"
            >
              {`${this.percentage}%`}
            </text>
          </svg>
        }
      </div>
    );
  }
}
