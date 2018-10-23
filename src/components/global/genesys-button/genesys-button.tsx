import { Component, Element, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'genesys-button.scss',
  tag: 'genesys-button'
})
export class GenesysButton {
  @Element() root: HTMLStencilElement
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

  
  @State()
  title: string;

  /**
   * This function is to check color and return a default one
   */
  getAccent() {
    return this.accent === 'primary' ? 'primary' : 'secondary'
  }

  componentDidLoad () {
    this.title = this.root.title;
  }

  render() {
    return (
      <button title={this.title} 
              disabled={this.disabled} 
              class={'genesys-' + this.getAccent()}>
        <slot></slot>
      </button>
    );
  }
}