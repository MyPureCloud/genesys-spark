import {
  Component,
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
  styleUrl: 'genesys-text-field.less',
  tag: 'genesys-text-field'
})
export class GenesysTextField {
  inputElement: HTMLInputElement;

  /**
   * Indicate the input value
   */
  @Prop({ mutable: true, reflectToAttr: true })
  value: string = '';

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The input placeholder.
   */
  @Prop()
  placeholder: string;

  /**
   * The input label.
   */
  @Prop()
  label: string;

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

  @State()
  classList: string[] = [];

  @State()
  internalErrorMessage: string;
  firstValue: string;
  timeout: any;

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

  @Watch('value')
  watchValue(newValue: string) {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this._testValue(newValue); 
    }, this.debounceTimeout);
  }

  _testValue(value: string) {
    if (!this.validation) {
      this.updateClassList();
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
    this.updateClassList();
  }

  updateClassList() {
    this.classList = [];
    if (this.label && this.label.length < 10) {
      this.classList = [...this.classList, 'flex'];
    }

    if (this.errorMessage && !this.validation) {
      this.classList = [...this.classList, this.errorMessageType];
    }
  }

  componentDidLoad() {
    this.internalErrorMessage = this.errorMessage;
    this.firstValue = this.value;
    this._testValue(this.value); 
  }

  getIconByMessageType(type) {
    switch (type) {
      case 'warning':
        return 'genesys-icon-alert-triangle';
      default:
      case 'error':
        return 'genesys-icon-alert-octo';
    }
  }

  _clear(event) {
    this.clear();
    this.emitInput(event);
    this.updateClassList();
  }

  /**
   * Clears the input.
   */
  @Method()
  clear() {
    this.value = '';
    this.inputElement.value = '';
    this.inputElement.focus();
  }

  render() {
    return (
      <div class={this.classList.join(' ')}>
        <div class="genesys-text-field">
          <label>{this.label}</label>
          <div class="genesys-field">
            <input
              aria-label={this.label}
              type='text'
              value={this.value}
              ref={el => (this.inputElement = el)}
              disabled={this.disabled}
              placeholder={this.placeholder}
              onInput={e => this.emitInput(e)}
            />
            {this.value && (
              <button
                type="button"
                class="genesys-icon-close"
                onClick={e => this._clear(e)}
              />
            )}
          </div>
        </div>
        {this.errorMessage && (
          <div class="genesys-error">
            <i class={this.getIconByMessageType(this.errorMessageType)} />
            <label>{this.errorMessage}</label>
          </div>
        )}
      </div>
    );
  }
}
