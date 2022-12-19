import { Component, Element, getAssetPath, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '../../../../../usage-tracking';

@Component({
  tag: 'gux-region-icon',
  assetsDirs: ['assets'],
  styleUrls: [
    getAssetPath('assets/sprites/region-flags.less'),
    'gux-region-icon.less'
  ],
  shadow: true
})
export class GuxRegionIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  region: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <i class={'flag flag-' + this.region.toLowerCase()} />
    ) as JSX.Element;
  }
}
