import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';
import { trackComponent } from '../../../../../usage-tracking';
import { getImgSource } from './gux-region-select.service';

@Component({
  tag: 'gux-region-icon',
  assetsDirs: ['assets'],
  shadow: true
})
export class GuxRegionIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  region: string;

  @Prop()
  regionName: string;

  @State()
  private imgSrc: string;

  @Watch('region')
  async prepIcon(iconName: string): Promise<void> {
    if (iconName) {
      this.imgSrc = await getImgSource(iconName);
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    await this.prepIcon(this.region);
  }

  render(): JSX.Element {
    return (<img src={this.imgSrc} alt={this.regionName} />) as JSX.Element;
  }
}
