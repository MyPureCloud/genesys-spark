import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop
} from '@stencil/core';

import { trackComponent } from 'usage-tracking';
import { buildI18nForComponent, GetI18nValue } from 'i18n';

import translationResources from './i18n/en.json';
import { GuxPaginationCursorDetail } from './gux-pagination-cursor.types';

@Component({
  styleUrl: 'gux-pagination-cursor.less',
  tag: 'gux-pagination-cursor',
  shadow: true
})
export class GuxPaginationCursor {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  hasPrevious: boolean = false;

  @Prop()
  hasNext: boolean = false;

  @Event()
  private guxPaginationCursorchange: EventEmitter<GuxPaginationCursorDetail>;

  private onButtonClick(paginationDetail: GuxPaginationCursorDetail): void {
    if (
      (paginationDetail === 'previous' && this.hasPrevious) ||
      (paginationDetail === 'next' && this.hasNext)
    ) {
      this.guxPaginationCursorchange.emit(paginationDetail);
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return [
      <gux-button-slot-beta accent="secondary">
        <button
          type="button"
          title={this.i18n('previous')}
          disabled={!this.hasPrevious}
          onClick={() => this.onButtonClick('previous')}
        >
          <gux-icon decorative iconName="ic-chevron-small-left"></gux-icon>
        </button>
      </gux-button-slot-beta>,
      <gux-button-slot-beta accent="secondary">
        <button
          type="button"
          title={this.i18n('next')}
          disabled={!this.hasNext}
          onClick={() => this.onButtonClick('next')}
        >
          <gux-icon decorative iconName="ic-chevron-small-right"></gux-icon>
        </button>
      </gux-button-slot-beta>
    ] as JSX.Element;
  }
}
