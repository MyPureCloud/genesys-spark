import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core';
import { getTimeZones } from '@vvo/tzdb';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import {
  GuxTimeZoneListing,
  GuxTimeZoneOption
} from './gux-time-zone-picker.types';

import { genericTimeZones } from './generic-zones';

@Component({
  styleUrl: 'gux-time-zone-picker.less',
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
    this.timeZoneList = this.getTimeZoneList();
    this.filteredZoneList = this.timeZoneList;
    this.timeZoneOptionElements = this.renderTimeZones(this.filteredZoneList);
  }

  componentDidLoad(): void {
    const dropdownElement = this.root?.shadowRoot.querySelector('gux-dropdown');
    dropdownElement.addEventListener('change', () => {
      simulateNativeEvent(this.root, 'change');
    });
  }

  /**
   * @desc create a formatted offset string
   * @param {number} offset timezone offset in minutes
   * @returns {string} formatted offset string
   * @example '+HH:mm' or '-HH:mm'
   */
  private formatOffset(offset?: number) {
    const isValidOffset = typeof offset === 'number';

    if (!isValidOffset) {
      return '';
    }

    const mins = Math.abs(offset) % 60;
    const stringMins = mins.toString().padStart(2, '0');

    const hrs = Math.floor(Math.abs(offset) / 60);
    const stringHrs = hrs.toString().padStart(2, '0');

    if (offset >= 0) {
      return `+${stringHrs}:${stringMins}`;
    }

    return `-${stringHrs}:${stringMins}`;
  }

  /**
   * @desc Adds 'group' zones that are the same as other zones to the top-level list. Modifies the original list.
   * @param GuxTimeZoneListing[] timeZoneList base list of timezones. Group zones found in this list will be added to it.
   */
  private addGroupZonesToList(timeZoneList: GuxTimeZoneListing[]) {
    timeZoneList.forEach(zone => {
      zone.group.forEach(groupZone => {
        const existing = timeZoneList.find(zone => zone.name === groupZone);
        if (!existing && groupZone !== zone.name) {
          const groupZoneItem = Object.assign({}, zone);
          groupZoneItem.name = groupZone;
          timeZoneList.push(groupZoneItem);
        }
      });
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
    const formattedOffset = this.formatOffset(
      timeZone.currentTimeOffsetInMinutes
    );
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
  private getTimeZoneList(): GuxTimeZoneOption[] {
    const moduleTimeZones = getTimeZones();
    const allTimeZones = [...genericTimeZones, ...moduleTimeZones];
    this.addGroupZonesToList(allTimeZones);

    const timeZoneList: GuxTimeZoneOption[] = [];
    allTimeZones.forEach(timeZone => {
      const zone = this.getTimeZoneOption(timeZone);
      //Filter out zones we don't have a translation for; helps filter out deprecated module zones we don't want to use.
      if (!zone) {
        return;
      }
      timeZoneList.push(zone);
    });

    return timeZoneList.sort((a, b) => {
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
    const defaultZoneOptions = this.timeZoneList.filter(tz =>
      defaultZones.includes(tz.value)
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

  private renderDefaultsList(): JSX.Element | undefined {
    const defaults = this.renderTimeZones(this.getDefaultZoneList());
    if (defaults.length) {
      return (
        <span>
          <div class="zone-header">Default</div>
          {defaults}
          <gux-list-divider></gux-list-divider>
          <div class="zone-header">All</div>
        </span>
      ) as JSX.Element;
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
      >
        <gux-listbox aria-label={this.i18n('timeZones')}>
          {this.renderDefaultsList()}
          {this.timeZoneOptionElements}
        </gux-listbox>
      </gux-dropdown>
    ) as JSX.Element;
  }
}
