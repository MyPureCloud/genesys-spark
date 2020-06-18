import { Component, getAssetPath, h, Prop, State, Watch } from '@stencil/core';

const svgCache: Map<string, Promise<SVGElement>> = new Map();

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
  private viewBox?: string;

  @State()
  private dataUri?: string;

  @Watch('iconName')
  async prepIcon(iconName: string) {
    if (iconName) {
      const svg = await this.loadSvgData(iconName);

      if (svg) {
        // Ideally, we'd use consistent scale for all icons and this would be unnecessary
        this.viewBox = svg.getAttribute('viewBox') || null;
        this.dataUri = this.getDataUri(svg);
      }
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
      this.dataUri && (
        <svg
          aria-hidden={this.decorative}
          aria-label={this.screenreaderText}
          viewBox={this.viewBox}
        >
          <use xlinkHref={this.dataUri} />
        </svg>
      )
    );
  }

  private getIconId(iconName): string {
    return `gux-icon-${iconName}`;
  }

  private getDataUri(svg: SVGElement): string {
    return `data:image/svg+xml;utf8,${svg.outerHTML}#${svg.getAttribute('id')}`;
  }

  private loadSvgData(iconName: string): Promise<SVGElement> {
    const id = this.getIconId(iconName);
    const cachedSvgElement = svgCache.get(id);

    if (cachedSvgElement) {
      return cachedSvgElement;
    }

    const iconUrl = getAssetPath(`./icons/${this.iconName}.svg`);
    const getSvgElement = fetch(iconUrl)
      .then(response => {
        if (response.status === 200) {
          return response.text();
        }
        throw new Error(
          `[gux-icon] fetching failed for icon "${this.iconName}" with status "${response.statusText} (${response.status})".`
        );
      })
      .then(svgText => {
        const svgElement = new DOMParser().parseFromString(
          svgText,
          'image/svg+xml'
        ).firstChild as SVGElement;
        svgElement.setAttribute('id', id);

        return svgElement;
      })
      .catch(err => {
        setTimeout(() => {
          throw err;
        }, 0);
        return null;
      });

    svgCache.set(id, getSvgElement);

    return getSvgElement;
  }
}
