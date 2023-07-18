import { Component, Element, getAssetPath, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

@Component({
  tag: 'gux-region-icon',
  assetsDirs: ['assets'],
  styleUrls: ['assets/sprites/region-flags.less'],
  shadow: true
})
export class GuxRegionIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  region: string;

  @Prop()
  screenreaderText: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    const regionFlagImgPath = getAssetPath('assets/sprites/region-flags.png');
    return (
      <span
        role={this.screenreaderText ? 'img' : ''}
        class={'flag flag-' + this.region?.toLowerCase()}
        style={{ backgroundImage: `url(${regionFlagImgPath})` }}
        aria-label={this.screenreaderText}
      />
    ) as JSX.Element;
  }
}
