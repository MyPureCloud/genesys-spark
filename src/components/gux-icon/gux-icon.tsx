import { Component, h, Prop } from '@stencil/core';
import { getAssetPath } from '@stencil/core';

const SVG_CONTAINER_ID = 'gux-icon-catalog';

@Component({
  styleUrl: 'gux-icon.less',
  tag: 'gux-icon'
})
export class GuxIcon {
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
  screenreaderText: string;

  async componentWillLoad() {
    return await this.loadSvgData();
  }

  componentDidLoad() {
    if (!this.decorative && !this.screenreaderText) {
      throw new Error(
        '[gux-icon] No screenreader-text provided. Either provide a localized screenreader-text property or set `decorative` to true'
      );
    }
  }

  render() {
    return (
      <svg aria-hidden={this.decorative} aria-label={this.screenreaderText}>
        <use xlinkHref={`#gux-icon-${this.iconName}`} />
      </svg>
    );
  }

  private async loadSvgData() {
    if (!document.getElementById(SVG_CONTAINER_ID)) {
      const url = getAssetPath('svg-icons/genesys-icons.svg');
      const svgContainer = document.createElement('div');
      svgContainer.setAttribute('id', SVG_CONTAINER_ID);
      document.head.appendChild(svgContainer);

      const iconResponse = await fetch(url);
      svgContainer.innerHTML = await iconResponse.text();
    }
  }
}
