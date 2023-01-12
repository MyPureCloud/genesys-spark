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
import { trackComponent } from '@utils/tracking/usage';
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

  minimumSizes: { full: number; iconOnly: number; condensed: number } = {
    full: 0,
    iconOnly: 0,
    condensed: 0
  };

  /**
   * Record the minimum size for the current layout.
   */
  private recordLayoutMinSize() {
    readTask(() => {
      const filterWidth = this.filterSlot?.clientWidth | 0;
      const controlWidth = this.actionsContainer?.clientWidth | 0;
      const minSize = filterWidth + controlWidth + MIN_CONTROL_SPACING;
      this.minimumSizes[this.displayedLayout] = minSize;
    });
  }

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
    this.recordLayoutMinSize();
    this.checkResponsiveLayout();
    setAccent(this.menuActionsItems, 'ghost');
  }

  /**
   * When the layout changes, also check one more time to see if further layout
   * changes are needed. This is mostly important at component start when we
   * may need to step down twice, full -> icon and icon -> condensed
   */
  componentDidUpdate() {
    this.recordLayoutMinSize();
    this.checkResponsiveLayout();
  }

  @OnResize()
  checkResponsiveLayout(): void {
    readTask(() => {
      const controlWidth = this.actionsContainer?.clientWidth | 0;
      const toolbarWidth = this.root.clientWidth;

      if (
        toolbarWidth <= this.minimumSizes.full &&
        toolbarWidth >= this.minimumSizes.iconOnly
      ) {
        if (this.displayedLayout == 'full') {
          this.renderIconOnlyLayoutScaleDown(controlWidth);
        } else if (this.displayedLayout == 'condensed') {
          this.renderIconOnlyLayoutScaleUp();
        }
      } else if (toolbarWidth <= this.minimumSizes.iconOnly) {
        this.renderCondensedLayout();
      } else {
        this.renderFullLayout();
      }
    });
  }

  render(): JSX.Element {
    return (
      <Host role="toolbar" aria-orientation="horizontal">
        <div class="search-filter-container">
          <slot name="search-and-filter"></slot>
        </div>
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
