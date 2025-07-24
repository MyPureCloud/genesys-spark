import {
  Component,
  Element,
  JSX,
  h,
  Host,
  readTask,
  State,
  forceUpdate
} from '@stencil/core';
import { GuxTableToolbarLayout } from './gux-table-toolbar.types';
import { OnResize } from '@utils/decorator/on-resize';
import { OnMutation } from '@utils/decorator/on-mutation';
import { trackComponent } from '@utils/tracking/usage';
import { setAccent, setActionsIconOnlyProp } from './gux-table-toolbar.service';
import { getSlot } from '@utils/dom/get-slot';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { logWarn } from '@utils/error/log-error';

/**
 * @slot search-and-filter - Slot for search and filter.
 * @slot contextual-actions - Slot for contextual actions.
 * @slot permanent-actions - Slot for permanent actions.
 * @slot menu-actions - Slot for menu actions.
 * @slot primary-action - Slot for a primary action.
 */

@Component({
  styleUrl: 'gux-table-toolbar.scss',
  tag: 'gux-table-toolbar',
  shadow: true
})
export class GuxTableToolbar {
  @Element()
  root: HTMLElement;

  @State()
  displayedLayout: GuxTableToolbarLayout = 'full';

  @State()
  hasContextDivider: boolean = false;

  minimumSizes: { full: number; iconOnly: number; condensed: number } = {
    full: 0,
    iconOnly: 0,
    condensed: 0
  };

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasContextDivider = this.needsContextDivider();
    forceUpdate(this.root);
  }

  /**
   * Record the minimum size for the current layout.
   */
  private recordLayoutMinSize() {
    readTask(() => {
      const filterWidth = this.searchAndFilterContainer?.clientWidth | 0;
      const controlWidth = this.actionsContainer?.clientWidth | 0;
      const minControlSize = this.minControlSize?.clientWidth | 0;
      const minSize = filterWidth + controlWidth + minControlSize;
      this.minimumSizes[this.displayedLayout] = minSize;
    });
  }

  get minControlSize(): HTMLElement | null {
    return this.root.shadowRoot.querySelector('.section-spacing');
  }

  get actionsContainer(): HTMLElement | null {
    return this.root.shadowRoot.querySelector(
      '.gux-contextual-permanent-primary'
    );
  }

  get searchAndFilterContainer(): HTMLElement | null {
    return this.root.shadowRoot.querySelector('.search-filter-container');
  }

  get filterSlot(): Element | null {
    return getSlot(this.root, 'search-and-filter');
  }

  get menuActionSlot(): Element | null {
    return getSlot(this.root, 'menu-actions');
  }

  get permanentSlot(): Element | null {
    // If permanent actions are not located at the root, then they are assumed to be located within the menu actions.
    // Permanent actions will be located in the menu actions if the previous display layout was condensed.
    return (
      getSlot(this.root, 'permanent-actions') ||
      (this.menuActionSlot &&
        getSlot(this.menuActionSlot as HTMLElement, 'permanent-actions'))
    );
  }

  get contextualSlot(): Element | null {
    return getSlot(this.root, 'contextual-actions');
  }

  get primaryAction(): HTMLGuxTableToolbarCustomActionElement | null {
    return this.root?.querySelector('gux-table-toolbar-custom-action[slot]');
  }

  get permanentActions(): HTMLGuxTableToolbarCustomActionElement[] {
    if (this.permanentSlot?.hasChildNodes) {
      return Array.from(
        this.permanentSlot?.querySelectorAll(
          'gux-table-toolbar-action, gux-table-toolbar-custom-action'
        )
      );
    }
    return [];
  }

  get menuActionsItems(): HTMLGuxTableToolbarCustomActionElement[] | null {
    if (this.menuActionSlot?.hasChildNodes) {
      return Array.from(
        this.menuActionSlot?.querySelectorAll(
          'gux-table-toolbar-action, gux-table-toolbar-custom-action'
        )
      );
    }
  }

  get contextualActions(): HTMLGuxTableToolbarCustomActionElement[] {
    if (this.contextualSlot?.hasChildNodes) {
      return Array.from(
        this.contextualSlot?.querySelectorAll(
          'gux-table-toolbar-action, gux-table-toolbar-custom-action'
        )
      );
    }
    return [];
  }

  get filterActions(): HTMLGuxTableToolbarCustomActionElement[] {
    if (this.filterSlot?.hasChildNodes) {
      return Array.from(
        this.filterSlot?.querySelectorAll(
          'gux-table-toolbar-action, gux-table-toolbar-custom-action'
        )
      );
    }
    return [];
  }

  get allFilterContextual(): HTMLGuxTableToolbarCustomActionElement[] {
    return this.filterActions?.concat(this.contextualActions);
  }

  private needsContextDivider(): boolean {
    return (
      this.contextualActions?.length &&
      this.contextualSlot !== this.root.lastElementChild
    );
  }

  private renderMenu(): boolean {
    return Boolean(
      this.menuActionsItems?.length || this.displayedLayout == 'condensed'
    );
  }

  private renderFullLayout(): void {
    this.displayedLayout = 'full';
    setActionsIconOnlyProp(
      false,
      this.primaryAction,
      ...this.allFilterContextual,
      ...this.permanentActions
    );
  }

  private renderIconOnlyLayoutScaleDown(): void {
    this.displayedLayout = 'iconOnly';
    setActionsIconOnlyProp(
      true,
      this.primaryAction,
      ...this.allFilterContextual,
      ...this.permanentActions
    );
  }

  private renderIconOnlyLayoutScaleUp(): void {
    this.displayedLayout = 'iconOnly';
    setAccent(this.permanentActions, 'secondary');
    setAccent(this.primaryAction, 'primary');
    setActionsIconOnlyProp(
      true,
      this.primaryAction,
      ...this.allFilterContextual,
      ...this.permanentActions
    );
    if (this.permanentActions) {
      this.root?.appendChild(this.permanentSlot);
    }
    if (this.primaryAction) {
      this.root?.appendChild(this.primaryAction);
    }
  }

  private renderCondensedLayout(): void {
    this.displayedLayout = 'condensed';
    if (this.permanentActions) {
      this.menuActionSlot?.appendChild(this.permanentSlot);
    }
    if (this.primaryAction) {
      this.menuActionSlot?.appendChild(this.primaryAction);
    }
    setActionsIconOnlyProp(true, ...this.allFilterContextual);
    setActionsIconOnlyProp(false, ...this.permanentActions);
    setActionsIconOnlyProp(false, this.primaryAction);
    setAccent(this.menuActionsItems, 'ghost');
  }

  private validateSlot(slotName: string): void {
    const slottedElement = this.root.querySelector(`[slot=${slotName}]`);
    if (!slottedElement) {
      logWarn(this.root, `gux-table-toolbar requires a ${slotName} slot`);
    }
  }

  componentWillRender(): void {
    trackComponent(this.root);
    this.hasContextDivider = this.needsContextDivider();
  }

  componentWillLoad(): void {
    this.validateSlot('menu-actions');
  }

  componentDidLoad(): void {
    // This timeout is required to calculate the correct size of the containers when the component loads. By including a timeout of 1 second the containers calculate correctly.
    afterNextRenderTimeout(() => {
      this.recordLayoutMinSize();
      this.checkResponsiveLayout();
    });
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
      const toolbarWidth = this.root.clientWidth;

      if (toolbarWidth <= this.minimumSizes.iconOnly) {
        if (this.displayedLayout == 'iconOnly') {
          this.renderCondensedLayout();
        }
      } else if (toolbarWidth <= this.minimumSizes.full) {
        if (this.displayedLayout == 'full') {
          this.renderIconOnlyLayoutScaleDown();
        } else if (this.displayedLayout == 'condensed') {
          this.renderIconOnlyLayoutScaleUp();
        }
      } else if (this.minimumSizes.iconOnly > this.minimumSizes.full) {
        this.renderIconOnlyLayoutScaleUp();
      } else {
        this.renderFullLayout();
      }
    });
  }

  render(): JSX.Element {
    return (
      <Host
        role="toolbar"
        aria-orientation="horizontal"
        gs-layout={this.displayedLayout}
      >
        <div class="search-filter-container">
          <slot name="search-and-filter"></slot>
        </div>
        <div class="section-spacing" />
        <div class="gux-contextual-permanent-primary">
          <div
            class={{
              'gux-contextual-wrapper': this.hasContextDivider
            }}
          >
            <slot name="contextual-actions"></slot>
          </div>
          <div class="gux-permanent-menu-primary-wrapper">
            <slot name="permanent-actions"></slot>
            <gux-table-toolbar-menu-button show-menu={this.renderMenu()}>
              <slot name="menu-actions"></slot>
            </gux-table-toolbar-menu-button>
            <slot name="primary-action"></slot>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
