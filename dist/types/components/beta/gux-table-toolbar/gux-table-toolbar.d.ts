import { JSX } from '../../../stencil-public-runtime';
import { GuxTableToolbarLayout } from './gux-table-toolbar.types';
/**
 * @slot search-and-filter - Slot for search and filter.
 * @slot contextual-actions - Slot for contextual actions.
 * @slot permanent-actions - Slot for permanent actions.
 * @slot menu-actions - Slot for menu actions.
 * @slot primary-action - Slot for a primary action.
 */
export declare class GuxTableToolbar {
  root: HTMLElement;
  displayedLayout: GuxTableToolbarLayout;
  hasContextDivider: boolean;
  minimumSizes: {
    full: number;
    iconOnly: number;
    condensed: number;
  };
  onMutation(): void;
  /**
   * Record the minimum size for the current layout.
   */
  private recordLayoutMinSize;
  iconOnlySectionWidth: number;
  get actionsContainer(): HTMLElement | null;
  get filterSlot(): HTMLSlotElement | null;
  get menuActionSlot(): HTMLSlotElement | null;
  get permanentSlot(): HTMLSlotElement | null;
  get contextualSlot(): HTMLSlotElement | null;
  get primaryAction(): HTMLGuxTableToolbarCustomActionElement | null;
  get permanentActions(): HTMLGuxTableToolbarCustomActionElement[] | null;
  get menuActionsItems(): HTMLGuxTableToolbarCustomActionElement[] | null;
  get contextualActions(): HTMLGuxTableToolbarCustomActionElement[] | null;
  get filterActions(): HTMLGuxTableToolbarCustomActionElement[] | null;
  get allFilterContextual(): HTMLGuxTableToolbarCustomActionElement[] | null;
  private needsContextDivider;
  private renderMenu;
  private renderFullLayout;
  private renderIconOnlyLayoutScaleDown;
  private renderIconOnlyLayoutScaleUp;
  private renderCondensedLayout;
  componentWillLoad(): void;
  componentDidLoad(): void;
  /**
   * When the layout changes, also check one more time to see if further layout
   * changes are needed. This is mostly important at component start when we
   * may need to step down twice, full -> icon and icon -> condensed
   */
  componentDidUpdate(): void;
  checkResponsiveLayout(): void;
  render(): JSX.Element;
}
