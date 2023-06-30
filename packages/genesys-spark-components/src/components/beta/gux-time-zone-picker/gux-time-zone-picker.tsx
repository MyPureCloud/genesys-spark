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
  tag: 'gux-time-zone-picker-beta',
  shadow: true
})
export class GuxTimeZonePickerBeta {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  public value: string;

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
    this.timeZoneOptionElements = this.renderTimeZones();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.timeZoneList = this.getTimeZoneList();
    this.filteredZoneList = this.timeZoneList;
    this.timeZoneOptionElements = this.renderTimeZones();
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
      return tzOption.displayText
        .toLowerCase()
        .includes(searchString.toLowerCase());
    });
  }

  private getTimeZoneList(): GuxTimeZoneOption[] {
    const moduleTimeZones = getTimeZones();
    const allTimeZones = [...genericTimeZones, ...moduleTimeZones];
    this.addGroupZonesToList(allTimeZones);

    const timeZoneList: GuxTimeZoneOption[] = [];
    allTimeZones.forEach(timeZone => {
      const localizedName = this.i18n(timeZone.name);

      //Filter out zones we don't have a translation for; helps filter out deprecated module zones we don't want to use.
      if (!localizedName) {
        return;
      }

      const formattedOffset = this.formatOffset(
        timeZone.currentTimeOffsetInMinutes
      );
      const localizedUTC = this.i18n('UTC');
      const displayText = `${localizedName} (${localizedUTC}${formattedOffset})`;
      timeZoneList.push({
        value: timeZone.name,
        localizedName,
        formattedOffset,
        displayText
      });
    });

    return timeZoneList.sort((a, b) => {
      return a.displayText?.localeCompare(b.displayText) || 0;
    });
  }

  private renderTimeZones(): JSX.Element[] {
    return this.filteredZoneList.map(tzOption => {
      return (
        <gux-option value={tzOption.value}>{tzOption.displayText}</gux-option>
      ) as JSX.Element;
    });
  }

  render(): JSX.Element {
    return (
      <gux-dropdown
        filter-type="custom"
        placeholder={this.i18n('selectZone')}
        value={this.value}
      >
        <gux-listbox aria-label={this.i18n('timeZones')}>
          {this.timeZoneOptionElements}
        </gux-listbox>
      </gux-dropdown>
    ) as JSX.Element;
  }
}
