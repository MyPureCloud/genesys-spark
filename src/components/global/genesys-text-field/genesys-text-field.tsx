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
   * The input type.
   */
  @Prop()
  type: string = 'text';

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
  errorMessage: string;

  /**
   * The message type (warning or error)
   */
  @Prop({ mutable: true })
  errorMessageType: string = Types.Error;

  /**
   * Shows/Hides the update indicator.
   */
  @Prop()
  updateIndicator: boolean = false;

  /**
   * Timeout between input and validation.
   */
  @Prop()
  debounceTimeout: number = 500;

  @State()
  classList: string[] = [];

  @State()
  internalErrorMessage: string;

  timeout: NodeJS.Timer;

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

  clearValidation() {
    clearTimeout(this.timeout);
  }

  @Watch('value')
  watchValue(newValue: string) {
    if (!this.validation) {
      return;
    }
    this.clearValidation();
    this.timeout = setTimeout(() => {
      switch (true) {
        case this.validation && typeof this.validation === 'object':
          if (!this.validation.test(newValue)) {
            this.errorMessageType = Types.Error;
            this.errorMessage = this.internalErrorMessage;
          } else {
            this.errorMessage = ''
          }
          break;
        case this.validation && typeof this.validation === 'function':
          const validation = this.validation(newValue);
          if (validation) {
            if (validation.error) {
              this.errorMessageType = Types.Error;
              this.errorMessage = validation.error;
            } else if (validation.warning) {
              this.errorMessageType = Types.Warning;
              this.errorMessage = validation.warning;
            }
          }
          break;
      }
      this.updateClassList(true);
    }, this.debounceTimeout);
  }

  updateClassList(isUpdated) {
    for (const type in Types) {
      if (this.classList.indexOf(Types[type]) !== -1) {
        this.classList.splice(this.classList.indexOf(Types[type]), 1);
      }
    }
    if (this.updateIndicator && isUpdated) {
      if (this.classList.indexOf('updated') === -1) {
        this.classList = [...this.classList, 'updated'];
      }
    } else {
      if (this.classList.indexOf('updated') !== -1) {
        this.classList.splice(this.classList.indexOf('updated'), 1);
      }
    }

    if (this.label && this.label.length < 10) {
      this.classList = [...this.classList, 'flex'];
    }

    if (this.errorMessage && !this.validation) {
      this.classList = [...this.classList, this.errorMessageType];
    }
  }

  componentDidLoad() {
    this.internalErrorMessage = this.errorMessage;
    this.updateClassList(false);
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
    this.updateClassList(false);
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
              type={this.type}
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
