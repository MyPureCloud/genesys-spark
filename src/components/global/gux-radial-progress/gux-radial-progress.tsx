import { Component, Prop } from '@stencil/core';

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
        <svg class="svgContainer" width="65px" height="65px" viewBox="0 0 65 65">
          <filter id="dropshadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
            <feOffset dx="0" dy="0" result="offsetblur"/>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <circle
            cx="50%"
            cy="50%"
            r="26"
            class="staticCircle"
          />
          <circle
            cx="50%"
            cy="50%"
            r="26"
            class="dynamicCircle"
            stroke-dashoffset={163.28 * (1 - (this.percentage / 100))}
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
      </div>
    );
  }
}
