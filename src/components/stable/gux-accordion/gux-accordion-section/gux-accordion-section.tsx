import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import { logError } from '../../../../utils/error/log-error';

import { GuxAccordionSectionArrowPosition } from './gux-accordion-section.types';

@Component({
  styleUrl: 'gux-accordion-section.less',
  tag: 'gux-accordion-section',
  shadow: true
})
export class GuxAccordionSection {
  private sectionId: string = randomHTMLId('gux-accordion-section');

  @Element()
  root: HTMLElement;

  @Prop()
  arrowPosition: GuxAccordionSectionArrowPosition = 'default';

  @Prop({ mutable: true })
  open: boolean = false;

  @Prop()
  disabled: boolean = false;

  private toggle() {
    this.open = !this.open;
  }

  private onHeaderSlotChange(): void {
    const header = this.root.querySelector('[slot="header"]');

    if (!header || !/^H[1-6]$/.test(header.nodeName)) {
      logError(
        'gux-accordion-section',
        'For accessibility reasons the header slot should be filled with a HTML heading tag (h1 - h6).'
      );
    }
  }

  private renderHeaderSpacer(
    arrowPosition: GuxAccordionSectionArrowPosition
  ): JSX.Element {
    if (arrowPosition === 'beside-text') {
      return null;
    }

    return <div class="gux-header-spacer"></div>;
  }

  render(): JSX.Element {
    return (
      <section class={{ 'gux-disabled': this.disabled }}>
        <button
          class="gux-header"
          aria-expanded={this.open.toString()}
          aria-controls={this.sectionId}
          disabled={this.disabled}
          onClick={this.toggle.bind(this)}
        >
          <div class="gux-header-text">
            <slot
              onSlotchange={this.onHeaderSlotChange.bind(this)}
              name="header"
            ></slot>
          </div>
          {this.renderHeaderSpacer(this.arrowPosition)}
          <div
            class={{
              'gux-header-icon': true,
              'gux-expanded': this.open
            }}
          >
            <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
          </div>
        </button>
        <div
          id={this.sectionId}
          class={{
            'gux-content': true,
            'gux-expanded': this.open
          }}
        >
          <slot name="content"></slot>
        </div>
      </section>
    );
  }
}
