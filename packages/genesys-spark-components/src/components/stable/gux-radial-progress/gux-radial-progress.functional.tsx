import { FunctionalComponent, h, VNode } from '@stencil/core';

import {
  getPercentageString,
  STROKE_DASH,
  RADIUS,
  OVERALL_SIZE
} from './gux-radial-progress.service';

interface GuxSpinnerStateProps {
  screenreaderText: string;
}

interface GuxPercentageStateProps {
  value: number;
  max: number;
  screenreaderText: string;
}

interface GuxSpinnerStateProps {
  screenreaderText: string;
}

export const GuxPercentageState: FunctionalComponent<
  GuxPercentageStateProps
> = ({ value, max, screenreaderText }): VNode => {
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
        viewBox={`0 0 ${OVERALL_SIZE} ${OVERALL_SIZE}`}
        role="presentation"
      >
        <circle cx="50%" cy="50%" r={RADIUS} class="gux-static-circle" />
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
          class="gux-percentage"
        >
          {getPercentageString(value, max)}
        </text>
      </svg>
    </div>
  ) as VNode;
};

export const GuxSpinnerState: FunctionalComponent<GuxSpinnerStateProps> = ({
  screenreaderText
}): VNode => {
  return (
    <gux-radial-loading
      screenreader-text={screenreaderText}
      context="modal"
    ></gux-radial-loading>
  ) as VNode;
};
