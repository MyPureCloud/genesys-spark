import { Component, Element, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'genesys-button.less',
  tag: 'genesys-button'
})
export class GenesysButton {
  @Element()
  root: HTMLStencilElement;
  button: HTMLButtonElement
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

  render() {
    return (
      <button
        title={this.title}
        ref={el => this.button = el}
        disabled={this.disabled}
        class={'genesys-' + this.getAccent()}
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
