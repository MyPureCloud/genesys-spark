import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';

@Component({
  styleUrl: 'gux-rating.less',
  tag: 'gux-rating'
})
export class GuxRating {
  @Element()
  root: HTMLGuxRatingElement;

  /**
   * Determines if the user can set a rating
   */
  @Prop({ reflectToAttr: true })
  disabled: boolean = false;

  /**
   * The rating
   */
  @Prop({ mutable: true, reflectToAttr: true })
  rating: number = 0;

  /**
   * The maximum rating possible
   */
  @Prop()
  maxRating: number = 5;

  /**
   * Determines if half ratings are allowed
   */
  @Prop()
  allowHalfRatings: boolean = false;

  /**
   * The labels for each stars
   */
  @Prop()
  labels: string[] = [];

  /**
   * The polygon points to create the svg. By default this is a star!
   */
  @Prop()
  svgPoints: string =
    '12,5 14,10 19,10 15.133,13.988 17,19 12,16 7,19 9,14 5,10 10,10 ';

  /**
   * The rating items, set once the component is loaded
   */
  @State()
  ratingItems: any[] = [];

  /**
   * The aria label
   */
  @State()
  ariaLabel: string = '';

  /**
   * The view box for the SVG
   */
  @Prop()
  svgViewBox: string = '0 0 24 24';

  /**
   * Triggered when the value changed
   * @return the current value
   */
  @Event()
  update: EventEmitter;

  updateRating(newRating) {
    newRating = newRating < 0 ? 0 : newRating;
    newRating = newRating > this.maxRating ? this.maxRating : newRating;
    const isUpdated = this.rating === newRating;
    this.rating = newRating;
    if (!isUpdated) {
      this.createRatingItems();
      this.update.emit(this.rating);
    }
  }

  /**
   * Once the component is loaded do the setup
   */
  componentWillLoad() {
    this.rating = this.rating < 0 ? 0 : this.rating;
    this.maxRating = this.maxRating <= 0 ? 5 : this.maxRating;
    this.ariaLabel = this.root.getAttribute('aria-label') || this.root.title;
    this.createRatingItems();
  }

  /**
   * Create rating items
   */
  createRatingItems() {
    const items = [];

    const ratingFloor = Math.floor(this.rating);
    const ratingRemainder = (this.rating % 1) * 100;

    for (let i = 0; i < this.maxRating; i++) {
      const itemPercent =
        i < ratingFloor ? 100 : ratingFloor === i ? ratingRemainder : 0;
      let label = '' + i;
      if (this.labels && this.labels.length > i) {
        label = this.labels[i];
      }
      items.push({
        label,
        percent: itemPercent,
        svgPoints: this.svgPoints
      });
    }

    this.ratingItems = items;
  }

  /**
   * Handle the mouse being pressed and update the internal rating
   */
  onClick(newRating) {
    if (this.disabled) {
      return;
    }
    if (this.allowHalfRatings) {
      newRating += 0.5;
      if (this.rating === newRating) {
        newRating += 0.5;
      } else if (this.rating === newRating + 0.5) {
        newRating = 0;
      }
    } else {
      newRating += 1;
      if (this.rating === newRating) {
        newRating = 0;
      }
    }
    this.updateRating(newRating);
  }

  /**
   * Handle the keyboard being pressed and update the internal rating
   */
  onKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }
    const regxp = new RegExp(
      `${KeyCode.Right}|${KeyCode.Up}|${KeyCode.Left}|${KeyCode.Down}|${KeyCode.End}|${KeyCode.Home}`
    );
    const key = event.keyCode;
    if (!regxp.test('' + key)) {
      return;
    }
    switch (key) {
      case KeyCode.Right:
      case KeyCode.Up:
        this.updateRating(this.rating + (this.allowHalfRatings ? 0.5 : 1));
        break;
      case KeyCode.Left:
      case KeyCode.Down:
        this.updateRating(this.rating - (this.allowHalfRatings ? 0.5 : 1));
        break;
      case KeyCode.End:
        this.updateRating(this.maxRating);
        break;
      case KeyCode.Home:
        this.updateRating(0);
        break;
    }
    // simulate click to be consistent with https://www.quirksmode.org/dom/events/click.html
    this.root.click();
    // to prevent scroll
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    const matches = (this.root.querySelectorAll(
      '.gux-rating > div'
    ) as any) as HTMLDivElement[];
    if (matches.length && matches.length > this.rating - 1) {
      const element = matches[Math.round(this.rating - 1)];
      element.focus();
    }
  }

  /**
   * When the state changes,
   * render the view
   */
  render() {
    return (
      <div class="gux-rating" role="radiogroup" aria-label={this.ariaLabel}>
        {this.ratingItems.map((ratingItem, i) => (
          <div
            class="gux-rating-element"
            role="radio"
            aria-checked={
              this.rating - 1 === i
                ? 'true'
                : this.rating - 1 === i - 0.5
                ? 'mixed'
                : 'false'
            }
            title={ratingItem.label}
            aria-label={ratingItem.label}
            tabindex={
              this.rating - 1 === i ||
              this.rating - 1 === i - 0.5 ||
              (this.rating === 0 && this.rating === i)
                ? '0'
                : '-1'
            }
            onClick={() => this.onClick(i)}
            onKeyDown={e => this.onKeyDown(e)}
          >
            <svg
              role="presentation"
              viewBox={this.svgViewBox}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              class="gux-rating-item"
            >
              <defs>
                <linearGradient
                  id={'fill-' + ratingItem.percent + '-' + i}
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset={ratingItem.percent + '%'} stop-opacity="1" />
                  <stop offset={ratingItem.percent + '%'} stop-opacity="1" />
                </linearGradient>
              </defs>
              <g stroke="none" stroke-width="1">
                <polygon
                  fill={'url(#fill-' + ratingItem.percent + '-' + i + ')'}
                  stroke-width="1"
                  class={
                    'gux-rating-item-shape-default gux-rating-item-shape-fill-percent-' +
                    ratingItem.percent
                  }
                  points={ratingItem.svgPoints}
                />
              </g>
            </svg>
          </div>
        ))}
      </div>
    );
  }
}
