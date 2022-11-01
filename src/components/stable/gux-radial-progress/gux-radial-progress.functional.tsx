import { FunctionalComponent, h, VNode } from '@stencil/core';

import {
  getPercentageString,
  RADIUS,
  STROKE_DASH
} from './gux-radial-progress.service';
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

export const GuxPercentageState: FunctionalComponent<
  GuxPercentageStateProps
> = ({ value, max, scale, dropshadowId, screenreaderText }): VNode => {
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
        <filter id={dropshadowId}>
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
          filter={'url(#' + dropshadowId + ')'}
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
            'gux-small': ![0, 1].includes(scale)
          }}
        >
          {getPercentageString(value, max, scale)}
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
