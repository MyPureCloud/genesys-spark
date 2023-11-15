import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import {
  GuxTimeZoneListing,
  GuxTimeZoneOption
} from './gux-time-zone-picker.types';
import { getTimeZoneList, formatOffset } from '@utils/date/time-zone';

@Component({
  styleUrl: 'gux-time-zone-picker.scss',
  tag: 'gux-time-zone-picker-beta',
  shadow: true
})
export class GuxTimeZonePickerBeta {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  public value: string;

  @Prop()
  public workspaceDefault: string;

  @Prop()
  public localDefault: string;

  @Prop()
  hasError: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  required: boolean = false;

  @State()
  private searchString: string = '';

  @State()
  private timeZoneOptionElements: JSX.Element[];

  @State()
  private timeZoneList: GuxTimeZoneOption[];

  @State()
  private filteredZoneList: GuxTimeZoneOption[];

  @Listen('guxfilter')
  on(event: CustomEvent): void {
    this.searchString = event.detail;
    this.filteredZoneList = this.filterTimeZoneList(this.timeZoneList);
    this.timeZoneOptionElements = this.renderTimeZones(this.filteredZoneList);
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.timeZoneList = this.getTimeZoneOptionsList();
    this.filteredZoneList = this.timeZoneList;
    this.timeZoneOptionElements = this.renderTimeZones(this.filteredZoneList);
  }

  componentDidLoad(): void {
    const dropdownElement = this.root?.shadowRoot.querySelector('gux-dropdown');
    dropdownElement.addEventListener('change', (event: Event) => {
      const selectedElement = event.target as HTMLInputElement;
      const selectedValue = selectedElement?.value;
      this.value = selectedValue;
      simulateNativeEvent(this.root, 'change');
    });
  }

  private filterTimeZoneList(timeZoneList: GuxTimeZoneOption[]) {
    const searchString = this.searchString;
    return timeZoneList.filter(tzOption => {
      return tzOption.displayTextName
        .toLowerCase()
        .includes(searchString.toLowerCase());
    });
  }

  private getTimeZoneOption(timeZone: GuxTimeZoneListing): GuxTimeZoneOption {
    const localizedName = this.i18n(timeZone.name);
    if (!localizedName) {
      return;
    }
    const formattedOffset = formatOffset(timeZone.currentTimeOffsetInMinutes);
    const localizedUTC = this.i18n('UTC');
    const displayTextName = `${localizedName}`;
    const displayTextOffset = ` (${localizedUTC}${formattedOffset})`;
    const baseDisplayOffsetText = `${displayTextOffset}`;
    return {
      value: timeZone.name,
      localizedName,
      formattedOffset,
      displayTextName,
      displayTextOffset,
      baseDisplayOffsetText
    };
  }
  private getTimeZoneOptionsList(): GuxTimeZoneOption[] {
    const allTimeZones = getTimeZoneList();
    const timeZoneOptionsList: GuxTimeZoneOption[] = [];
    allTimeZones.forEach(timeZone => {
      const zone = this.getTimeZoneOption(timeZone);
      //Filter out zones we don't have a translation for; helps filter out deprecated module zones we don't want to use.
      if (!zone) {
        return;
      }
      timeZoneOptionsList.push(zone);
    });

    return timeZoneOptionsList.sort((a, b) => {
      return a.displayTextName?.localeCompare(b.displayTextName) || 0;
    });
  }

  private getDefaultZones(): string[] {
    const defaultZones: string[] = [];
    if (this.workspaceDefault) {
      defaultZones.push(this.workspaceDefault);
    }
    if (this.localDefault) {
      defaultZones.push(this.localDefault);
    }
    return defaultZones;
  }

  private getDefaultZoneList(): GuxTimeZoneOption[] {
    const defaultZones = this.getDefaultZones();
    const defaultZoneOptions: GuxTimeZoneOption[] = this.timeZoneList.reduce(
      (defaults: GuxTimeZoneOption[], tz) => {
        if (defaultZones.includes(tz.value)) {
          return defaults.concat([Object.assign({}, tz)]);
        }

        return defaults;
      },
      []
    );

    defaultZoneOptions.forEach(option => {
      const baseDisplayOffsetText = option.baseDisplayOffsetText;
      if (
        defaultZoneOptions.length === 1 &&
        this.workspaceDefault === this.localDefault
      ) {
        defaultZoneOptions[0].displayTextOffset = `${
          defaultZoneOptions[0].displayTextOffset
        } ${this.i18n('localAndWorkspaceDefault')}`;
      } else if (option.value === this.workspaceDefault) {
        option.displayTextOffset = `${baseDisplayOffsetText} ${this.i18n(
          'workspaceDefault'
        )}`;
      } else if (option.value === this.localDefault) {
        option.displayTextOffset = `${baseDisplayOffsetText} ${this.i18n(
          'localDefault'
        )}`;
      }
    });

    return defaultZoneOptions;
  }

  private renderTimeZones(zoneList: GuxTimeZoneOption[]): JSX.Element[] {
    return zoneList.map(tzOption => {
      return (
        <gux-option value={tzOption.value}>
          {tzOption.displayTextName}
          <span class="tz-utc">{tzOption.displayTextOffset}</span>
        </gux-option>
      ) as JSX.Element;
    });
  }

  private renderDefaultsList(): JSX.Element[] | undefined {
    const defaults = this.renderTimeZones(this.getDefaultZoneList());
    if (defaults.length) {
      return defaults;
    }
  }

  render(): JSX.Element {
    return (
      <gux-dropdown
        class={{
          'has-defaults': !!this.workspaceDefault || !!this.localDefault
        }}
        filter-type="custom"
        placeholder={this.i18n('selectZone')}
        value={this.value}
        hasError={this.hasError}
        disabled={this.disabled}
      >
        <gux-listbox aria-label={this.i18n('timeZones')}>
          <div class="zone-header">{this.i18n('default')}</div>
          {this.renderDefaultsList()}
          <gux-list-divider></gux-list-divider>
          <div class="zone-header">{this.i18n('all')}</div>
          {this.timeZoneOptionElements}
        </gux-listbox>
      </gux-dropdown>
    ) as JSX.Element;
  }
}
