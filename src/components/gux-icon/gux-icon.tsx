import { Component, getAssetPath, h, Prop, State, Watch } from '@stencil/core';

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

  @State()
  viewBox?: string;

  @Watch('iconName')
  async prepIcon(iconName: string) {
    if (iconName) {
      const svg = await this.loadSvgData(iconName);
      // Ideally, we'd use consistent scale for all icons and this would be unnecessary
      this.viewBox = (svg && svg.getAttribute('viewBox')) || null;
    }
  }

  async componentWillLoad() {
    await this.prepIcon(this.iconName);
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
      this.iconName && (
        <svg
          aria-hidden={this.decorative}
          aria-label={this.screenreaderText}
          viewBox={this.viewBox}
        >
          <use xlinkHref={`#${iconId(this.iconName)}`} />
        </svg>
      )
    );
  }

  private loadSvgData(iconName: string): Promise<Element> {
    const id = iconId(iconName);
    const svgContainer = this.getSvgContainer();
    let svgElement = svgContainer.querySelector(`#${id}`);
    if (svgElement) {
      const pendingFetch = (svgElement as any).pending;
      // If some other instance is loading the icon, wait on that
      if (pendingFetch) {
        return pendingFetch;
      } else {
        return Promise.resolve(svgElement);
      }
    } else {
      // Create a placholder element so other icons on page won't try to
      // simultanously fetch while we're waiting on the icon to load
      const placeholder = document.createElement('div');
      placeholder.setAttribute('id', id);
      svgContainer.appendChild(placeholder);

      // Fetch the icon and replace the placeholder with it
      const iconUrl = getAssetPath(`./icons/${this.iconName}.svg`);
      const svgPromise = fetch(iconUrl)
        .then(response => {
          return response.text();
        })
        .then(svgText => {
          svgElement = new DOMParser().parseFromString(svgText, 'image/svg+xml')
            .firstChild as Element;
          svgElement.setAttribute('id', id);
          placeholder.replaceWith(svgElement);
          return svgElement;
        });
      // This is an ugly kludge to make this promise accessible to other icons
      // waiting on the same svg
      (placeholder as any).pending = svgPromise;
      return svgPromise;
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
