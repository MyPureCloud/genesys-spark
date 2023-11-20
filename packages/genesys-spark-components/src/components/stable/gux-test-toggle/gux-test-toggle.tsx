import {
  Component,
  Element,
  EventEmitter,
  Event,
  JSX,
  Prop,
  h,
  State,
  Listen
} from '@stencil/core';
import { GetI18nValue, buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-test-toggle.scss',
  tag: 'gux-test-toggle',
  shadow: true
})
export class GuxTestToggle {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  /**
   * Indicate if the toggle is disabled or not
   */
  @Prop()
  disabled: boolean = false;

  /**
   * Toggle label
   */
  @Prop()
  label: string;

  /**
   * Toggle message text
   */
  @Prop()
  message: string;

  /**
   * Toggle has error message
   */
  @Prop()
  error: boolean = false;

  /**
   * Indicate if the toggle is checked
   */
  @State()
  checked: boolean = false;

  @Event()
  toggleChecked: EventEmitter<boolean>;

  changeState(e: KeyboardEvent | MouseEvent): void {
    if (this.disabled) {
      e.stopPropagation();
      return;
    }
    this.checked = !this.checked;
    this.toggleChecked.emit(this.checked);
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        this.changeState(event);
    }
  }

  private renderToggleMessage(): JSX.Element {
    if (this.message) {
      return (
        <div
          class={{
            'gux-test-toggle-message': true,
            'gux-test-toggle-message-error': this.error
          }}
        >
          {this.renderToggleMessageErrorIcon()}
          <p>{this.message}</p>
        </div>
      ) as JSX.Element;
    }
  }

  private renderToggleMessageErrorIcon(): JSX.Element {
    if (this.error) {
      return (
        <gux-icon
          icon-name="alert-warning-octogon"
          decorative
          screenreader-text={this.i18n('errorMessageAriaLabel')}
        ></gux-icon>
      ) as JSX.Element;
    }
  }

  private renderToggleMessagueSuccessIcon(): JSX.Element {
    if (!this.error) {
      return (
        <gux-icon
          class="gux-test-toggle-success-icon"
          icon-name="alert-success"
          decorative
          screenreader-text={this.i18n('defaultAriaLabel')}
        ></gux-icon>
      ) as JSX.Element;
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <div class="gux-test-toggle">
        <label
          id="label"
          htmlFor="gux-test-toggle"
          aria-labelledby="gux-test-toggle-label-i"
          aria-label={this.i18n('defaultAriaLabel')}
        >
          <div
            class={{
              'gux-test-toggle-slider': true,
              'gux-test-toggle-slider-on': this.checked,
              'gux-test-toggle-slider-error': this.error,
              'gux-test-toggle-slider-disabled': this.disabled
            }}
            tabindex={this.disabled ? '' : '0'}
          >
            <input
              type="checkbox"
              role="switch"
              id="gux-test-toggle"
              aria-checked={this.checked.toString()}
              aria-disabled={this.disabled.toString()}
              disabled={this.disabled}
              checked={this.checked}
            />
            <span onClick={this.changeState.bind(this)}></span>
            {this.renderToggleMessagueSuccessIcon()}
          </div>
          <p class="gux-test-toggle-label">{this.label}</p>
        </label>
        {this.renderToggleMessage()}
      </div>
    ) as JSX.Element;
  }
}
