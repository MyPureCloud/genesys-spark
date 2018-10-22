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
   * Set the input as required.
   */
  @Prop()
  required: boolean = false;

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
   * The input validation.
   */
  @Prop()
  validation: any | `(newValue: string) => boolean` | RegExp = null;

  /**
   * The message displayed on validation failure.
   */
  @Prop()
  validationMessage: string;

  /**
   * Shows/Hides the update indicator.
   */
  @Prop()
  updateIndicator: boolean = true;

  /**
   * Timeout between input and validation.
   */
  @Prop()
  debounceTimeout: number = 500;

  @State()
  classList: string[] = ['genesys-text-field'];

  @State()
  showError: boolean = false;

  @State()
  messageType: string;
  timeout: NodeJS.Timer;
  firstValidationMessage: string;

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
    this.showError = false;
  }

  @Watch('value')
  watchValue(newValue: string) {
    this.clearValidation();
    this.timeout = setTimeout(() => {
      switch (true) {
        case !newValue:
          if (this.required) {
            this.showError = true;
            this.messageType = Types.Error;
          } else {
            this.showError = false;
          }
          break;
        case this.validation && typeof this.validation === 'object':
          if (!this.validation.test(newValue)) {
            this.messageType = Types.Error;
            this.showError = true;
          } else {
            this.messageType = '';
            this.showError = false;
          }
          break;
        case this.validation && typeof this.validation === 'function':
          const validation = this.validation(newValue);
          if (validation) {
            if (validation.error) {
              this.messageType = Types.Error;
              this.validationMessage = validation.error;
              this.showError = true;
            } else if (validation.warning) {
              this.messageType = Types.Warning;
              this.validationMessage = validation.warning;
              this.showError = true;
            }
          } else {
            this.messageType = '';
            this.showError = false;
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
    if (this.messageType) {
      this.classList = [...this.classList, this.messageType];
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
  }

  componentDidLoad() {
    this.firstValidationMessage = this.validationMessage + '';
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
    this.validationMessage = this.firstValidationMessage;
    this.showError = false;
    this.inputElement.focus();
  }

  render() {
    return (
      <div class={this.classList.join(' ')}>
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
        {this.showError && (
          <div class="genesys-error">
            <i class={this.getIconByMessageType(this.messageType)} />
            <label>{this.validationMessage}</label>
          </div>
        )}
      </div>
    );
  }
}
