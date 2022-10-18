import {
  Component,
  Element,
  JSX,
  h,
  Host,
  readTask,
  State
} from '@stencil/core';
import { GuxTableToolbarLayout } from './gux-table-toolbar.types';
import { MIN_CONTROL_SPACING } from './gux-table-toolbar.constants';
import { OnResize } from '@utils/decorator/on-resize';
import { trackComponent } from 'usage-tracking';
import {
  setAccent,
  expandActions,
  collapseActions,
  collapseActionsAll,
  expandActionsAll
} from './gux-table-toolbar.service';
import { getSlot } from '@utils/dom/get-slot';

/**
 * @slot search-and-filter - Slot for search and filter.
 * @slot contextual-actions - Slot for contextual actions.
 * @slot permanent-actions - Slot for permanent actions.
 * @slot menu-actions - Slot for menu actions.
 * @slot primary-action - Slot for a primary action.
 */

@Component({
  styleUrl: 'gux-table-toolbar.less',
  tag: 'gux-table-toolbar-beta',
  shadow: true
})
export class GuxTableToolbar {
  @Element()
  root: HTMLElement;

  @State()
  displayedLayout: GuxTableToolbarLayout = 'full';

  expandAt: number;

  iconOnlySectionWidth: number;

  get actionsContainer(): HTMLElement | null {
    return this.root.shadowRoot.querySelector(
      '.gux-contextual-permanent-primary'
    );
  }

  get filterSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'search-and-filter');
  }

  get menuActionSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'menu-actions');
  }

  get permanentSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'permanent-actions');
  }

  get contextualSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'contextual-actions');
  }

  get primaryAction(): HTMLGuxTableToolbarCustomActionElement | null {
    return this.root?.querySelector('gux-table-toolbar-custom-action[slot]');
  }

  get permanentActions(): HTMLGuxTableToolbarCustomActionElement[] | null {
    return Array.from(
      this.permanentSlot?.querySelectorAll(
        'gux-table-toolbar-action, gux-table-toolbar-custom-action'
      )
    );
  }

  get menuActionsItems(): HTMLGuxTableToolbarCustomActionElement[] | null {
    return Array.from(
      this.menuActionSlot?.querySelectorAll(
        'gux-table-toolbar-action, gux-table-toolbar-custom-action'
      )
    );
  }

  get contextualActions(): HTMLGuxTableToolbarCustomActionElement[] | null {
    return Array.from(
      this.contextualSlot?.querySelectorAll(
        'gux-table-toolbar-action, gux-table-toolbar-custom-action'
      )
    );
  }

  get filterActions(): HTMLGuxTableToolbarCustomActionElement[] | null {
    return Array.from(
      this.filterSlot?.querySelectorAll(
        'gux-table-toolbar-action, gux-table-toolbar-custom-action'
      )
    );
  }

  get allFilterContextual(): HTMLGuxTableToolbarCustomActionElement[] | null {
    return this.filterActions.concat(this.contextualActions);
  }

  private initialToolbarSize(
    filterWidth: number,
    controlWidth: number,
    minSpacing: number
  ): number {
    return filterWidth + controlWidth + minSpacing;
  }

  private renderFullLayout(): void {
    this.displayedLayout = 'full';
    expandActionsAll(
      this.allFilterContextual,
      this.permanentActions,
      this.primaryAction
    );
  }

  private renderIconOnlyLayoutScaleDown(controlWidth: number): void {
    this.displayedLayout = 'iconOnly';
    collapseActionsAll(
      this.allFilterContextual,
      this.permanentActions,
      this.primaryAction
    );
    //Save the width of the iconOnly section so when resizing backup we have a reference point.
    this.iconOnlySectionWidth = controlWidth;
  }

  private renderIconOnlyLayoutScaleUp(): void {
    this.displayedLayout = 'iconOnly';
    setAccent(this.permanentActions, 'secondary');
    setAccent(this.primaryAction, 'primary');
    collapseActionsAll(
      this.allFilterContextual,
      this.permanentActions,
      this.primaryAction
    );
    this.root?.appendChild(this.permanentSlot);
    this.root?.appendChild(this.primaryAction);
  }

  private renderCondensedLayout(): void {
    this.displayedLayout = 'condensed';
    this.menuActionSlot?.appendChild(this.permanentSlot);
    this.menuActionSlot?.appendChild(this.primaryAction);
    collapseActions(this.allFilterContextual);
    expandActions(this.permanentActions);
    expandActions(this.primaryAction);
    setAccent(this.menuActionsItems, 'ghost');
  }

  componentWillLoad() {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.checkResponsiveLayout();
    setAccent(this.menuActionsItems, 'ghost');
  }

  @OnResize()
  checkResponsiveLayout(): void {
    readTask(() => {
      const filterWidth = this.filterSlot?.clientWidth | 0;
      const controlWidth = this.actionsContainer?.clientWidth | 0;
      const toolbarWidth = this.root.clientWidth;
      const gapSize = toolbarWidth - (filterWidth + controlWidth);
      const elRect = this.actionsContainer.getBoundingClientRect();
      /* The initial displayed layout is full as we wont know the size in advance and will shrink if there is not enough space for it. */
      if (this.displayedLayout === 'full') {
        /* expandAt tracks the size at which the full layout should be displayed(or should be tested again) */
        this.expandAt = this.initialToolbarSize(
          filterWidth,
          controlWidth,
          MIN_CONTROL_SPACING
        );
      }
      /* If the toolbarWidth is greater than the expandAt value then we can expand the actions ie (show label/icon). This would mean the gap between filter and controls is greater than 72. */
      if (this.displayedLayout == 'full' && toolbarWidth > this.expandAt) {
        this.displayedLayout = 'full';
      }
      /* If the gapSize between the filter and controls is less than 72px displayedLayout will be set to iconOnly. */
      if (gapSize < MIN_CONTROL_SPACING) {
        this.renderIconOnlyLayoutScaleDown(controlWidth);
      }
      /* If the element is only partially visible in the viewport then we will switch to the condensed layout. */
      if (
        elRect.right >
        (window.innerWidth || document.documentElement.clientWidth)
      ) {
        this.renderCondensedLayout();
      }

      if (
        this.displayedLayout == 'condensed' &&
        toolbarWidth >
          this.iconOnlySectionWidth + filterWidth + MIN_CONTROL_SPACING
      ) {
        this.renderIconOnlyLayoutScaleUp();
      }

      if (this.displayedLayout == 'iconOnly' && toolbarWidth > this.expandAt) {
        this.renderFullLayout();
      }
    });
  }

  render(): JSX.Element {
    return (
      <Host role="toolbar" aria-orientation="horizontal">
        <slot name="search-and-filter"></slot>
        <div class="section-spacing" />
        <div class="gux-contextual-permanent-primary">
          <slot name="contextual-actions"></slot>
          <div class="separator" />
          <slot name="permanent-actions"></slot>
          <gux-table-toolbar-menu-button>
            <slot name="menu-actions"></slot>
          </gux-table-toolbar-menu-button>
          <slot name="primary-action"></slot>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
