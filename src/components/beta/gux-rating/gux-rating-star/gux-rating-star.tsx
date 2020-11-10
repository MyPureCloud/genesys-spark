import { Component, h, Listen, JSX, Prop } from '@stencil/core';

import { randomHTMLId } from '../../../../utils/dom/random-html-id';

import { GuxRatingStarFill } from './gux-rating-star.types';

@Component({
  styleUrl: 'gux-rating-star.less',
  tag: 'gux-rating-star'
})
export class GuxRatingStar {
  private id = randomHTMLId('gux-rating-star');

  @Prop()
  fill: GuxRatingStarFill = 'empty';

  @Prop()
  disabled: boolean = false;

  @Listen('click')
  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

  render(): JSX.Element {
    let percent = 0;

    switch (this.fill) {
      case 'empty':
        percent = 0;
        break;

      case 'half':
        percent = 50;
        break;

      case 'full':
        percent = 100;
        break;
    }

    return (
      <svg
        role="presentation"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={this.id} x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${percent}%`} stop-opacity="1" />
            <stop offset={`${percent}%`} stop-opacity="1" />
          </linearGradient>
        </defs>
        <g stroke="none" stroke-width="1">
          <polygon
            class={`gux-rating-item-shape-default gux-rating-star-fill-percent-${percent}`}
            fill={`url(#${this.id})`}
            stroke-width="1"
            points="12,5 14,10 19,10 15.133,13.988 17,19 12,16 7,19 9,14 5,10 10,10"
          />
        </g>
      </svg>
    );
  }
}
