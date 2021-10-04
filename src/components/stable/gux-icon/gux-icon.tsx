import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { logError } from '../../../utils/error/log-error';

import { getBaseSvgHtml, getRootIconName } from './gux-icon.service';

@Component({
  assetsDirs: ['icons'],
  styleUrl: 'gux-icon.less',
  tag: 'gux-icon'
})
export class GuxIcon {
  @Element()
  private root: HTMLElement;

  /**
   * Indicate which icon to display
   */
  @Prop()
  iconName: string;

  /**
   * Indicate whether the icon should be ignored by accessibility tools or not
   */
  @Prop()
  decorative: boolean = false;

  /**
   * Localized text describing the intent of this icon (not required if `decorative=true`)
   */
  @Prop()
  screenreaderText: string = '';

  @State()
  private svgHtml?: string;

  @Watch('iconName')
  async prepIcon(iconName: string): Promise<void> {
    if (iconName) {
      const rootIconName = getRootIconName(iconName);

      const baseSvgHtml = await getBaseSvgHtml(rootIconName);
      this.svgHtml = this.getSvgWithAriaAttributes(baseSvgHtml);
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: getRootIconName(this.iconName) });

    await this.prepIcon(this.iconName);
  }

  componentDidLoad(): void {
    if (!this.decorative && !this.screenreaderText) {
      logError(
        'gux-icon',
        'No screenreader-text provided. Either provide a localized screenreader-text property or set `decorative` to true.'
      );
    }
  }

  private getSvgWithAriaAttributes(svgText: string): string {
    const svgElement = new DOMParser().parseFromString(svgText, 'image/svg+xml')
      .firstChild as SVGElement;

    if (this.decorative) {
      svgElement.setAttribute('aria-hidden', String(this.decorative));
    }

    if (this.screenreaderText) {
      svgElement.setAttribute('aria-label', this.screenreaderText);
    }

    return svgElement.outerHTML;
  }

  render(): JSX.Element {
    return (
      this.svgHtml && (
        <div class="gux-icon-container" innerHTML={this.svgHtml}></div>
      )
    );
  }
}
