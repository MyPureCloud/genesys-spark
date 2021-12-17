import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';
import { trackComponent } from '../../../../../usage-tracking';
import { getImgSource } from './gux-country-select.service';

@Component({
  tag: 'gux-country-icon',
  assetsDirs: ['assets'],
  shadow: true
})
export class GuxCountryIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  countryCode: string;

  @Prop()
  countryName: string;

  @State()
  private imgSrc: string;

  @Watch('countryCode')
  async prepIcon(iconName: string): Promise<void> {
    if (iconName) {
      this.imgSrc = await getImgSource(iconName);
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    await this.prepIcon(this.countryCode);
  }

  render(): JSX.Element {
    return <img src={this.imgSrc} alt={this.countryName} />;
  }
}
