import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { logError } from '../../../utils/error/log-error';

@Component({
  styleUrl: 'gux-tooltip-title.less',
  tag: 'gux-tooltip-title-beta',
  shadow: false
})
export class GuxTooltipTitle {
  private titleName: string = '';

  @Element()
  private root: HTMLElement;

  @Prop()
  tabWidth: number;

  @State() private showTooltip: boolean = true;

  componentWillLoad() {
    if (
      this.root.querySelector('gux-icon') &&
      this.root.children.length === 1
    ) {
      if (
        this.root.querySelector('gux-icon').hasAttribute('screenreader-text')
      ) {
        this.titleName = this.root
          .querySelector('gux-icon')
          .getAttribute('screenreader-text');
      } else {
        logError(
          'gux-tooltip-title-beta',
          'No screenreader-text provided. Provide a localized screenreader-text property for the gux-icon. The screenreader-text property is used for the icon screenreader text and the tooltip.'
        );
      }
    } else {
      const children = Array.from(this.root.children);
      children.map(element => {
        if (element.tagName !== 'GUX-ICON') {
          this.titleName += element.innerHTML;
        } else {
          element.classList.add('gux-tooltip-icon-decorative');
        }
      });
      this.checkForTooltipHideOrShow();
    }
  }

  private checkForTooltipHideOrShow() {
    const clientWidth = this.root.clientWidth;
    if (this.tabWidth && clientWidth < this.tabWidth) {
      this.showTooltip = false;
      return;
    }
  }

  render(): JSX.Element {
    return [
      <span class="gux-title-container">
        <slot />
      </span>,
      this.renderTooltip()
    ];
  }

  private renderTooltip() {
    if (this.showTooltip) {
      return <gux-tooltip>{this.titleName}</gux-tooltip>;
    }
  }
}
