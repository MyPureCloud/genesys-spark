import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

enum Types {
  Warning = 'warning',
  Error = 'error'
}

@Component({
  styleUrl: 'gux-text-field.less',
  tag: 'gux-text-field'
})
export class GuxTextField {
  @Element()
  root: HTMLStencilElement;

  inputElement: HTMLInputElement;

  /**
   * Indicate the input value
   */
  @Prop({ mutable: true, reflectToAttr: true })
  value: string = '';

  /**
   * Provides a screen reader value (e.g. aria-label) for this control.
   */
  @Prop()
  srLabel: string;

  /**
   * Indicate the input type
   */
  @Prop()
  type: 'text' | 'email' | 'password' | 'number' = 'text';

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * Set the input in readonly mode
   */
  @Prop()
  readonly: boolean = false;

  /**
   * The input placeholder.
   */
  @Prop()
  placeholder: string;

  /**
   * The input validation.
   */
  @Prop()
  validation: any | `(newValue: string) => any` | RegExp = null;

  /**
   * The message displayed on validation failure.
   */
  @Prop({ mutable: true })
  errorMessage: string = '';

  /**
   * The message type (warning or error)
   */
  @Prop({ mutable: true })
  errorMessageType: string = Types.Error;

  /**
   * Timeout between input and validation.
   */
  @Prop()
  debounceTimeout: number = 500;

  /**
   * The label for the erase button
   */
  @Prop()
  eraseLabel: string = '';

  /**
   * Determines whether or not the 'x' clear button is displayed when the input
   * contains text.
   */
  @Prop()
  useClearButton: boolean = true;

  @State()
  classList: string[] = [];

  @State()
  internalErrorMessage: string;
  firstValue: string;
  timeout: any;

  get showClearButton(): boolean {
    return this.useClearButton && this.value && !this.readonly;
  }

  /**
   * Triggered when user inputs.
   * @return The input value
   */
  @Event()
  input: EventEmitter;
  emitInput(event) {
    event.preventDefault();
    event.stopPropagation();
    this.value = event.target.value;
    this.input.emit(event.target.value);
  }

  emitFocusEvent(event) {
    this.root.dispatchEvent(new FocusEvent(event.type, event));
  }

  @Watch('value')
  watchValue(newValue: string) {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this._testValue(newValue);
    }, this.debounceTimeout);
  }

  _testValue(value: string) {
    if (!this.validation) {
      return;
    }
    if (this.validation instanceof RegExp) {
      if (!this.validation.test(value)) {
        this.errorMessageType = Types.Error;
        this.errorMessage = this.internalErrorMessage;
      } else {
        this.errorMessage = '';
      }
    } else if (typeof this.validation === 'function') {
      const validation = this.validation(value);
      if (validation) {
        if (validation.warning) {
          this.errorMessageType = Types.Warning;
          this.errorMessage = validation.warning;
        } else if (validation.error) {
          this.errorMessageType = Types.Error;
          this.errorMessage = validation.error;
        } else {
          this.errorMessage = '';
        }
      } else {
        this.errorMessageType = Types.Error;
        this.errorMessage = this.internalErrorMessage;
      }
    }
  }

  getClassList(): string {
    let classList = [];
    if (this.errorMessage) {
      classList = [...classList, this.errorMessageType];
    }
    if (this.disabled) {
      classList = [...classList, 'disabled'];
    }
    return classList.join(' ');
  }

  componentDidLoad() {
    this.internalErrorMessage = this.errorMessage;
    this.firstValue = this.value;
    this._testValue(this.value);
  }

  getIconByMessageType(type) {
    return type === 'warning'
      ? 'genesys-icon-alert-triangle'
      : 'genesys-icon-alert-octo';
  }

  _clear(event) {
    this.clear();
    this.inputElement.focus();
    this.emitInput(event);
  }

  /**
   * Clears the input.
   */
  @Method()
  clear() {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.inputElement.value = '';
  }

  render() {
    return (
      <div class={this.getClassList()}>
        <div class="gux-field">
          <input
            type={this.type}
            value={this.value}
            ref={el => (this.inputElement = el)}
            aria-label={this.srLabel}
            disabled={this.disabled}
            readonly={this.readonly}
            placeholder={this.placeholder}
            onInput={e => this.emitInput(e)}
            onFocus={e => this.emitFocusEvent(e)}
            onBlur={e => this.emitFocusEvent(e)}
          />
          {this.showClearButton && (
            <button
              type="button"
              class="genesys-icon-close"
              title={this.eraseLabel}
              onClick={e => this._clear(e)}
            />
          )}
        </div>
        {this.errorMessage && (
          <div class="gux-error">
            <i class={this.getIconByMessageType(this.errorMessageType)} />
            <label>{this.errorMessage}</label>
          </div>
        )}
      </div>
    );
  }
}
