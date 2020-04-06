import { Component, getAssetPath, h, Prop } from '@stencil/core';

const SVG_CONTAINER_ID = 'gux-icon-catalog';

@Component({
  assetsDirs: ['icons'],
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
    if (this.iconName) {
      await this.loadSvgData(this.iconName);
    }
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
        <use xlinkHref={`#${iconId(this.iconName)}`} />
      </svg>
    );
  }

  private async loadSvgData(iconName) {
    const id = iconId(iconName);
    const svgContainer = this.getSvgContainer();
    if (svgContainer.querySelector(`#${id}`)) {
      return;
    } else {
      // Create a placholder element so other icons on page won't try to
      // simultanously fetch while we're waiting on the icon to load
      const placeholder = document.createElement('div');
      placeholder.setAttribute('id', id);
      svgContainer.appendChild(placeholder);

      // Fetch the icon and replace the placeholder with it
      const iconUrl = getAssetPath(`./icons/${this.iconName}.svg`);
      const iconResponse = await fetch(iconUrl);
      const svgText = await iconResponse.text();
      const svgElement = new DOMParser().parseFromString(
        svgText,
        'image/svg+xml'
      ).firstChild as Element;
      svgElement.setAttribute('id', id);
      placeholder.replaceWith(svgElement);
    }
  }

  private getSvgContainer() {
    let svgContainer = document.getElementById(SVG_CONTAINER_ID);
    if (!svgContainer) {
      svgContainer = document.createElement('div');
      svgContainer.setAttribute('id', SVG_CONTAINER_ID);
      document.head.appendChild(svgContainer);
    }
    return svgContainer;
  }
}

function iconId(iconName) {
  return `gux-icon-${iconName}`;
}
