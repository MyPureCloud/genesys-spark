import { Component, h, JSX, Prop } from '@stencil/core';

export type GuxRadialLoadingContext = 'full-page' | 'input' | 'modal';

@Component({
  styleUrl: 'gux-radial-loading.less',
  tag: 'gux-radial-loading-beta'
})
export class GuxRadialLoading {
  /**
   * The display context the component is in.
   */
  @Prop()
  context: GuxRadialLoadingContext = 'modal';

  render(): JSX.Element {
    return (
      <div class={`spinner-container ${this.context}`} aria-busy="true">
        <div class="spin-circle" />
      </div>
    );
  }
}
