import { JSX } from '../../../../stencil-public-runtime';
export declare class GuxTabLegacy {
  private dropdownOptionsButtonId;
  /**
   * unique id for the tab
   */
  tabId: string;
  /**
   * indicates whether or not the tab is selected
   */
  active: boolean;
  /**
   * indicates the gux-icon to display on the left side of the tab (similar to a favicon in the browser)
   */
  tabIconName: string;
  private popoverHidden;
  private hasAnimated;
  private root;
  private internaltabselected;
  private get hasDropdownOptions();
  private toggleOptions;
  private onSelectDropdownOption;
  private selectTab;
  private popoverOnClick;
  private getDropdownOptions;
  componentDidLoad(): void;
  render(): JSX.Element;
}
