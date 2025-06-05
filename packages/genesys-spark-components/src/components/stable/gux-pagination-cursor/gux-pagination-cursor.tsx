import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';
import { GuxPaginationCursorDetail } from './gux-pagination-cursor.types';

import { GuxItemsPerPage } from '../gux-pagination/gux-pagination.types';

@Component({
  styleUrl: 'gux-pagination-cursor.scss',
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

  @Prop()
  label: string;

  /**
   * Optional. Shows items per page dropdown when set. Only available with layout set to 'advanced'
   */
  @Prop()
  itemsPerPage: GuxItemsPerPage;

  @Prop()
  layout: 'simple' | 'advanced' = 'simple';

  @Event()
  private guxPaginationCursorchange: EventEmitter<GuxPaginationCursorDetail>;

  @Event()
  private guxitemsperpagechange: EventEmitter<number>;

  private handleInternalitemsperpagechange(event: CustomEvent): void {
    this.guxitemsperpagechange.emit(event.detail as number);
  }

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

  renderSimpleLayout(): JSX.Element {
    return [
      <nav aria-label={this.label} class="gux-pagination-button-container">
        <gux-button-slot accent="ghost">
          <button
            class="gux-simple-button"
            type="button"
            disabled={!this.hasPrevious}
            onClick={() => this.onButtonClick('previous')}
          >
            <gux-icon
              iconName="custom/chevron-left-small-regular"
              decorative
              size="small"
            ></gux-icon>
            <gux-screen-reader-beta>
              {this.i18n('previous')}
            </gux-screen-reader-beta>
          </button>
        </gux-button-slot>
        <gux-button-slot accent="ghost">
          <button
            class="gux-simple-button"
            type="button"
            disabled={!this.hasNext}
            onClick={() => this.onButtonClick('next')}
          >
            <gux-icon
              iconName="custom/chevron-right-small-regular"
              decorative
              size="small"
            ></gux-icon>
            <gux-screen-reader-beta>{this.i18n('next')}</gux-screen-reader-beta>
          </button>
        </gux-button-slot>
      </nav>
    ] as JSX.Element;
  }

  renderAdvancedLayout(): JSX.Element {
    return [
      <nav aria-label={this.label} class="gux-pagination-button-container">
        <gux-button-slot accent="ghost">
          <button
            type="button"
            disabled={!this.hasPrevious}
            onClick={() => this.onButtonClick('previous')}
          >
            <div class="gux-button-align-content">
              <gux-icon
                decorative
                iconName="custom/chevron-left-small-regular"
                size="small"
              ></gux-icon>
              <span>{this.i18n('previous')}</span>
            </div>
          </button>
        </gux-button-slot>
        <gux-button-slot accent="ghost">
          <button
            type="button"
            disabled={!this.hasNext}
            onClick={() => this.onButtonClick('next')}
          >
            <div class="gux-button-align-content">
              <span>{this.i18n('next')}</span>
              <gux-icon
                decorative
                iconName="custom/chevron-right-small-regular"
                size="small"
              ></gux-icon>
            </div>
          </button>
        </gux-button-slot>
      </nav>,
      this.renderItemsPerPage()
    ] as JSX.Element;
  }

  renderItemsPerPage(): JSX.Element {
    return (
      this.itemsPerPage &&
      ((
        <gux-pagination-items-per-page
          items-per-page={this.itemsPerPage}
          onInternalitemsperpagechange={this.handleInternalitemsperpagechange.bind(
            this
          )}
        ></gux-pagination-items-per-page>
      ) as JSX.Element)
    );
  }

  render(): JSX.Element {
    return this.layout === 'advanced'
      ? this.renderAdvancedLayout()
      : this.renderSimpleLayout();
  }
}
