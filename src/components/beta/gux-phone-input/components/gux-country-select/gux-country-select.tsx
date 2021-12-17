import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { trackComponent } from '../../../../../usage-tracking';
import { countryCodeMap } from './CountryCodeMap';
import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import countryResources from '../../i18n/en.json';

@Component({
  tag: 'gux-country-select',
  shadow: true
})
export class GuxCountrySelect {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  countryCode: string;

  @Prop()
  defaultCountry: string;

  @State()
  expanded: boolean;

  private i18n: GetI18nValue;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, countryResources);
  }

  selectClicked(event): void {
    this.expanded = !this.expanded;
    const popup = event.target.closest('gux-popup-beta');
    popup.expanded = !popup.expanded;
  }

  render(): JSX.Element {
    const options = [];
    for (const [key, val] of Object.entries(countryCodeMap)) {
      const countryName = this.i18n(key);
      options.push(
        <gux-list-item value={key}>
          <div>
            <gux-country-icon countryCode={key} countryName={countryName} />
            <span>{countryName}</span>
            <span>{val}</span>
          </div>
        </gux-list-item>
      );
    }

    const selectedCountry = this.countryCode || this.defaultCountry || 'us';
    const selectedCountryName = this.i18n(selectedCountry);

    return (
      <gux-popup-beta>
        <span slot="target" onClick={this.selectClicked}>
          <gux-country-icon
            countryCode={selectedCountry}
            countryName={selectedCountryName}
          />
          {this.expanded ? (
            <gux-icon iconName="arrow-solid-down" />
          ) : (
            <gux-icon iconName="arrow-solid-right" />
          )}
        </span>
        <gux-list slot="popup">{options}</gux-list>
      </gux-popup-beta>
    );
  }
}
