import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  JSX,
  Prop,
  State,
  h
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { trackComponent } from '../../../../usage-tracking';
import { getClosestElement } from '../../../../utils/dom/get-closest-element';
import { onMutation } from '../../../../utils/dom/on-mutation';

import { GuxTableSortDirection, GuxTableSortState } from '../gux-table.types';
import tableResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-sort-control.less',
  tag: 'gux-sort-control',
  shadow: {
    delegatesFocus: true
  }
})
export class GuxSortControl {
  private tableHeader: HTMLTableCellElement;
  private thObserver: MutationObserver;
  private i18n: GetI18nValue;

  @Element() root: HTMLElement;

  @Prop()
  includeUnsorted: boolean = false;

  @State()
  headerContent: string;

  @State()
  active: boolean = false;

  @State()
  sort: GuxTableSortDirection = 'none';

  @Event()
  guxsortchanged: EventEmitter<GuxTableSortState>;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.i18n = await buildI18nForComponent(
      this.root,
      tableResources,
      'gux-table'
    );

    this.tableHeader = getClosestElement(
      'th',
      this.root
    ) as HTMLTableCellElement;
    this.tableHeader.addEventListener('click', () => {
      this.guxsortchanged.emit({
        columnName: this.tableHeader.dataset.columnName,
        sortDirection: this.getNextSort(this.sort)
      });
    });
    this.thObserver = onMutation(
      this.tableHeader,
      () => {
        this.setState();
      },
      {
        attributes: true,
        childList: false,
        subtree: false
      }
    );

    this.setState();
  }

  disconnectedCallback() {
    this.thObserver.disconnect();
  }

  private setState() {
    this.headerContent = this.tableHeader.textContent;

    const ariaSort = this.tableHeader.getAttribute('aria-sort');

    switch (ariaSort) {
      case 'ascending':
      case 'descending':
        this.active = true;
        this.sort = ariaSort;
        break;
      default:
        this.active = false;
        this.sort = 'none';
    }
  }

  private getIconName(colSortDirection: GuxTableSortDirection): string {
    switch (colSortDirection) {
      case 'descending':
        return 'arrow-solid-up';
      case 'ascending':
      default:
        return 'arrow-solid-down';
    }
  }

  private getNextSort(
    colSortDirection: GuxTableSortDirection
  ): GuxTableSortDirection {
    switch (colSortDirection) {
      case 'none':
        return 'ascending';
      case 'ascending':
        return 'descending';
      case 'descending':
      default: {
        if (this.includeUnsorted) {
          return 'none';
        }

        return 'ascending';
      }
    }
  }

  private getSRText(colSortDirection: GuxTableSortDirection): string {
    switch (colSortDirection) {
      case 'ascending':
        return this.i18n('ascendingColumnSort', {
          headerContent: this.headerContent
        });
      case 'descending': {
        if (this.includeUnsorted) {
          return this.i18n('descendingColumnSortIncludeUnsorted', {
            headerContent: this.headerContent
          });
        }

        return this.i18n('descendingColumnSort', {
          headerContent: this.headerContent
        });
      }

      default:
        return this.i18n('noColumnSort', { headerContent: this.headerContent });
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <button
          class={{
            'gux-sort': true,
            'gux-active': this.active
          }}
          type="button"
        >
          <span class="gux-sr-only">{this.getSRText(this.sort)}</span>
        </button>
        <gux-icon
          class={{
            'gux-active': this.active
          }}
          icon-name={this.getIconName(this.sort)}
          decorative
        ></gux-icon>
      </Host>
    ) as JSX.Element;
  }
}
