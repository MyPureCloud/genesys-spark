import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { getBaseSvgHtml, getRootIconName } from './gux-icon.service';
import { GuxIconIconName } from './gux-icon.types';
import { logError } from '@utils/error/log-error';

@Component({
  assetsDirs: ['icons'],
  styleUrl: 'gux-icon.less',
  tag: 'gux-icon',
  shadow: true
})
export class GuxIcon {
  private baseSvgHtml: string;

  @Element()
  private root: HTMLElement;

  /**
   * Indicate which icon to display
   */
  @Prop()
  // Using (string & {}) preserves autocomplete, otherwise TS collapses this type to just `string`
  // See https://github.com/microsoft/TypeScript/issues/49220
  // eslint-disable-next-line @typescript-eslint/ban-types
  iconName: (string & {}) | GuxIconIconName;

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
  private svgHtml: string;

  @Watch('iconName')
  async prepIcon(iconName: string): Promise<void> {
    if (iconName) {
      const rootIconName = getRootIconName(iconName);

      this.baseSvgHtml = await getBaseSvgHtml(rootIconName);
      this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
    }
  }

  @Watch('decorative')
  watchDecorative(decorative: boolean): void {
    this.validateProps(decorative, this.screenreaderText);

    this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
  }

  @Watch('screenreaderText')
  watchScreenreaderText(screenreaderText: string): void {
    this.validateProps(this.decorative, screenreaderText);

    this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: getRootIconName(this.iconName) });

    await this.prepIcon(this.iconName);
  }

  componentDidLoad(): void {
    this.validateProps(this.decorative, this.screenreaderText);
  }

  private validateProps(decorative: boolean, screenreaderText: string): void {
    // skip validation if root is not attached to DOM
    if (!this.root.isConnected) {
      return;
    }

    if (!decorative && !screenreaderText) {
      logError(
        this.root,
        'No screenreader-text provided. Either provide a localized screenreader-text property or set `decorative` to true.'
      );
    }
  }

  private getSvgWithAriaAttributes(svgText: string): string {
    const svgElement = new DOMParser().parseFromString(svgText, 'image/svg+xml')
      .firstChild as SVGElement;

    if (this.decorative) {
      svgElement.setAttribute('aria-hidden', String(this.decorative));
    } else {
      svgElement.setAttribute('aria-hidden', 'false');
    }

    if (this.screenreaderText) {
      svgElement.setAttribute('aria-label', this.screenreaderText);
    } else {
      svgElement.removeAttribute('aria-label');
    }

    return svgElement.outerHTML;
  }

  render(): JSX.Element {
    return (this.svgHtml && (
      <div class="gux-icon-container" innerHTML={this.svgHtml}></div>
    )) as JSX.Element;
  }
}
