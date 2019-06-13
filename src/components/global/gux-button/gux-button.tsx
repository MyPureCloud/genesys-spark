import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State
} from '@stencil/core';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
  @Element()
  root: HTMLStencilElement;
  button: HTMLButtonElement;
  /**
   * Triggered when the action button is clicked
   */
  @Event()
  actionClick: EventEmitter;

  /**
   * Indicate if the button is disabled or not
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The component accent (secondary or primary).
   */
  @Prop()
  accent: string = 'secondary';

  /**
   * The component text.
   */
  @Prop()
  text: string = '';

  /**
   * The component left icon.
   */
  @Prop()
  leftIcon: string = '';

  /**
   * The component right icon.
   */
  @Prop()
  rightIcon: string = '';

  @State()
  title: string;

  /**
   * This function is to check color and return a default one
   */
  getAccent() {
    return this.accent === 'primary' ? 'primary' : 'secondary';
  }

  componentDidLoad() {
    this.title = this.root.title;
  }

  formatIcon(iconName: string) {
    return iconName.indexOf('genesys-icon') === 0
      ? iconName
      : 'genesys-icon-' + iconName;
  }

  onActionClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.actionClick.emit(event);
  }

  render() {
    return (
      <button
        title={this.title}
        ref={el => (this.button = el)}
        disabled={this.disabled}
        class={'gux-' + this.getAccent()}
        onClick={e => this.onActionClick(e)}
      >
        {this.leftIcon ? (
          <span
            class={
              this.formatIcon(this.leftIcon) +
              ' left-icon' +
              (this.text ? ' margin' : '')
            }
          />
        ) : (
          ''
        )}
        {this.text}
        {this.rightIcon ? (
          <span
            class={
              this.formatIcon(this.rightIcon) +
              ' right-icon' +
              (this.text ? ' margin' : '')
            }
          />
        ) : (
          ''
        )}
      </button>
    );
  }
}
