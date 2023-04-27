import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxToggleLabelPosition } from './gux-toggle.types';
export declare class GuxToggle {
  private i18n;
  private announceElement;
  private labelId;
  private errorId;
  private root;
  checked: boolean;
  disabled: boolean;
  loading: boolean;
  checkedLabel: string;
  uncheckedLabel: string;
  labelPosition: GuxToggleLabelPosition;
  errorMessage: string;
  displayInline: boolean;
  handleLoading(loading: boolean): void;
  check: EventEmitter<boolean>;
  onClick(): void;
  onKeydown(event: KeyboardEvent): void;
  private toggle;
  private getAriaLabel;
  componentWillLoad(): Promise<void>;
  private renderLoading;
  private renderLabel;
  private renderError;
  render(): JSX.Element;
}
