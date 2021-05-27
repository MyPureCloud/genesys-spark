import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

import { GuxRadialLoadingContext } from './gux-radial-loading.types';

@Component({
  styleUrl: 'gux-radial-loading.less',
  tag: 'gux-radial-loading'
})
export class GuxRadialLoading {
  @Element()
  private root: HTMLElement;

  /**
   * The display context the component is in.
   */
  @Prop()
  context: GuxRadialLoadingContext = 'modal';

  /**
   * Required localized text to provide screen reader accessible label for the component
   */
  @Prop()
  screenreaderText: string = '';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.context });
  }

  componentDidLoad(): void {
    if (!this.screenreaderText) {
      throw new Error(
        '[gux-radial-progress] No screenreader-text provided. Provide a localized screenreader-text property for the component.'
      );
    }
  }

  render(): JSX.Element {
    return (
      <div
        role="progressbar"
        aria-label={this.screenreaderText}
        class={`gux-spinner-container gux-${this.context}`}
      >
        <div role="presentation" class="gux-spin-circle" />
      </div>
    );
  }
}
