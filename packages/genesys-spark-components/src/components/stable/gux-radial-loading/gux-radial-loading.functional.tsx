import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxRadialLoadingContext } from './gux-radial-loading.types';
import {
  largeSpinner,
  largeBorder,
  smallSpinner,
  smallBorder
} from './gux-radial-loading.service';

interface GuxSpinnerStateProps {
  context: GuxRadialLoadingContext;
  screenreaderText: string;
}

export const GuxSpinnerState: FunctionalComponent<GuxSpinnerStateProps> = ({
  context = 'modal',
  screenreaderText
}): VNode => {
  let size = largeSpinner;
  let radius = largeSpinner * 0.5 - largeBorder * 0.5;

  if (context === 'input') {
    size = smallSpinner;
    radius = smallSpinner * 0.5 - smallBorder * 0.5;
  }

  return (
    <div
      class={`gux-${context}`}
      role="progressbar"
      aria-label={screenreaderText}
    >
      <svg
        class="gux-svg-container"
        viewBox={`0 0 ${size} ${size}`}
        role="presentation"
      >
        <circle cx="50%" cy="50%" r={radius} class="gux-static-circle" />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          class="gux-dynamic-circle"
          stroke-linecap="round"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          class="gux-dynamic-circle-mask"
          stroke-linecap="round"
        />
      </svg>
    </div>
  ) as VNode;
};
