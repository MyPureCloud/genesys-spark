import { JSX } from '../../../stencil-public-runtime';
export declare class GuxTooltipTitle {
  private tooltipElement;
  private root;
  private hasTooltip;
  private showTooltip;
  private iconOnly;
  private titleName;
  onmouseenter(event: MouseEvent): void;
  onmouseleave(): void;
  onmousedown(): void;
  setShowTooltip(): Promise<void>;
  setHideTooltip(): Promise<void>;
  onMutation(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private logWarnNoIconSrText;
  private addIconDecorative;
  private getTitleElements;
  private getTitleTextContent;
  private setTooltipTitleText;
  private checkForTooltipHideOrShow;
  render(): JSX.Element;
  private renderTooltip;
}
