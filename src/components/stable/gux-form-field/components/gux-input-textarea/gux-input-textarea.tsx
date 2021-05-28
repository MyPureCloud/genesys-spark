import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { GuxInputTextAreaResize } from './gux-input-textarea.types';

/**
 * @slot input - Required slot for textarea
 */
@Component({
  styleUrl: 'gux-input-textarea.less',
  tag: 'gux-input-textarea'
})
export class GuxInputTextArea {
  private input: HTMLTextAreaElement;
  private containerElement: HTMLDivElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  resize: GuxInputTextAreaResize = 'none';

  componentWillLoad(): void {
    this.input = this.root.querySelector('textarea[slot="input"]');

    this.input.addEventListener('input', () => {
      this.updateHeight();
    });
  }

  componentDidLoad(): void {
    this.updateHeight();
  }

  private updateHeight(): void {
    if (this.resize === 'auto') {
      this.containerElement.dataset.replicatedValue = this.input.value;
      this.containerElement.style.maxHeight = this.input.style.maxHeight;
    }
  }

  render(): JSX.Element {
    return (
      <div
        ref={el => (this.containerElement = el)}
        class={`gux-resize-${this.resize}`}
      >
        <slot name="input" />
      </div>
    );
  }
}
