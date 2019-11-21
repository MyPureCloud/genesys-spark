import { Component, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-icon.less',
  tag: 'gux-icon'
})
export class GuxIcon {
  /**
   * Indicate which icon to display
   */
  @Prop()
  iconname: string;

  /**
   * Indicate whether the icon should be ignored by accessibility tools or not
   */
  @Prop()
  decorative: boolean = false;

  /**
   * Localized text describing the intent of this icon (not required if `decorative=true`)
   */
  @Prop()
  label: string;

  /**
   * Sets the height and width of the icon (in pixels)
   */
  @Prop()
  size: number;

  componentDidLoad() {
    if (!this.decorative && !this.label) {
      console.error(
        '[gux-icon] No arialabel provided. Either provide a localized arialabel property or set `decorative` to true'
      );
    }
  }

  render() {
    return (
      <svg
        aria-hidden={this.decorative}
        aria-label={this.label}
        height={this.size}
        width={this.size}
      >
        <use xlinkHref={`svg-icons/genesys-icons.svg#${this.iconname}`} />
      </svg>
    );
  }
}
