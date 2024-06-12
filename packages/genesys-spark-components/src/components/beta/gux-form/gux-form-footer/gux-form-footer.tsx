import { Component, h, JSX, Prop, Element, Host } from '@stencil/core';
import { GuxFormFooterPlacement } from './gux-form-footer.types';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Slot for footer element.
 */

@Component({
  styleUrl: 'gux-form-footer.scss',
  tag: 'gux-form-footer',
  shadow: true
})
export class GuxFormFooter {
  @Element()
  root: HTMLElement;

  @Prop()
  placement: GuxFormFooterPlacement = 'page-desktop';

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.placement });
  }

  render(): JSX.Element {
    return (
      <Host
        class={{
          [`gux-form-footer-${this.placement}`]: true
        }}
      >
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
