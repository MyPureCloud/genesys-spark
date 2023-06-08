import {
  Component,
  Element,
  Event,
  EventEmitter,
  JSX,
  Prop,
  State,
  h
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import { getClosestElement } from '../../../../utils/dom/get-closest-element';
import { onMutation } from '../../../../utils/dom/on-mutation';

import { GuxTableSortDirection, GuxTableSortState } from '../gux-table.types';
import tableResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-sort-control.less',
  tag: 'gux-sort-control',
  shadow: { delegatesFocus: true }
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

  @State()
  isLeftAlignIcon: boolean = false;

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
    if (this.thObserver) {
      this.thObserver.disconnect();
    }
  }

  private onClick(): void {
    this.guxsortchanged.emit({
      columnName: this.tableHeader.dataset.columnName,
      sortDirection: this.getNextSort(this.sort)
    });
  }

  private setState() {
    this.headerContent = this.tableHeader.textContent;

    this.isLeftAlignIcon =
      this.tableHeader.hasAttribute('data-cell-numeric') ||
      this.tableHeader.hasAttribute('data-cell-action');

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
      <div class="gux-container">
        <button
          class={{
            'gux-sort-button': true,
            'gux-active': this.active
          }}
          type="button"
          onClick={() => this.onClick()}
        >
          <span class="gux-sr-only">{this.getSRText(this.sort)}</span>
          <gux-icon
            class={{
              'gux-sort-icon': true,
              'gux-left': this.isLeftAlignIcon
            }}
            icon-name={this.getIconName(this.sort)}
            decorative
          ></gux-icon>
        </button>

        <div class="gux-resize-spacer"></div>
      </div>
    ) as JSX.Element;
  }
}
