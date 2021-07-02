import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { logError } from '../../../utils/error/log-error';

import { getSvgHtml, getRootIconName } from './gux-icon.service';

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

      this.svgHtml = await getSvgHtml(
        rootIconName,
        this.decorative,
        this.screenreaderText
      );
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

  render(): JSX.Element {
    return (
      this.svgHtml && (
        <div class="gux-icon-container" innerHTML={this.svgHtml}></div>
      )
    );
  }
}
