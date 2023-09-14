import { Component, Element, h, Host, JSX, Method, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '../../../utils/dom/after-next-render';

import { GuxAnnouncePoliteness } from './gux-announce.types';

/**
 * @slot - element
 */
@Component({
  styleUrl: 'gux-announce.scss',
  tag: 'gux-announce-beta',
  shadow: true
})
export class GuxAnnounce {
  private containerElement: HTMLDivElement;

  @Element() root: HTMLElement;

  @Prop()
  politeness: GuxAnnouncePoliteness = 'polite';

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxAnnounce(text: string): Promise<void> {
    this.containerElement.innerText = '';
    afterNextRender(() => {
      this.containerElement.innerText = text;
    });
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host aria-live={this.politeness}>
        <slot />
        <div ref={el => (this.containerElement = el)}></div>
      </Host>
    ) as JSX.Element;
  }
}
