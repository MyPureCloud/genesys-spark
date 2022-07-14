import { Component, h, Host, JSX, State, Listen, Element } from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { GuxTableSortState } from '../gux-table.types';
import tableResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-sort-control.less',
  tag: 'gux-sort-control',
  shadow: true
})
export class GuxSortControl {
  private i18n: GetI18nValue;
  /* Reference Host Element */
  @Element() root: HTMLElement;

  /* State label to indicate column text content */
  @State()
  colLabel: string;

  /* State label to store direction of sort */
  @State()
  colSortDirection: string;

  @Listen('guxsortchanged', { target: 'body' })
  sortDirectionEvent(event: CustomEvent<GuxTableSortState>) {
    this.colSortDirection = event.detail.sortDirection;
    this.colLabel = event.detail.columnName;
  }

  private renderSrText(): JSX.Element {
    return (
      <div class="gux-sr-only">
        {this.i18n(this.getSrTextLocalisationKey(), {
          colLabel: this.colLabel
        })}
      </div>
    ) as JSX.Element;
  }

  private getSrTextLocalisationKey(): string {
    return `${this.colSortDirection}ColumnSort`;
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tableResources);
  }

  componentDidLoad() {
    this.colLabel = this.root.closest('th').getAttribute('data-column-name');
    this.colSortDirection = this.root.closest('th').getAttribute('aria-sort');
  }

  render(): JSX.Element {
    return (
      <Host>
        <button type="button">
          <gux-icon
            icon-name={
              this.colSortDirection === 'ascending'
                ? 'arrow-solid-down'
                : 'arrow-solid-up'
            }
            decorative
          />
          {this.renderSrText()}
        </button>
      </Host>
    ) as JSX.Element;
  }
}
