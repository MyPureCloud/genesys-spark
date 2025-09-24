import { Component, JSX, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { getValidTimezone } from '@utils/date/get-valid-timezone';

import translationResources from '../gux-time-zone-picker/i18n/en.json';

import { getLocalizedOffset, shortenZone } from './gux-time-zone.service';

@Component({
  tag: 'gux-time-zone-beta',
  shadow: true
})
export class GuxTimeZoneBeta {
  private i18n: GetI18nValue;

  /**
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * The id of the time zone to display
   */
  @Prop()
  timeZoneId: string;

  /**
   * True to display the zone's offset from UTC
   */
  @Prop()
  offset: boolean;

  /**
   * True to display surround the offset with parentheses
   */
  @Prop()
  surroundOffset: boolean;

  /**
   * True to shorten the displayed zone name: 'Europe/London' -> 'London'
   */
  @Prop()
  shorten: boolean;

  private renderZoneDisplay(): JSX.Element | undefined {
    const normalizedTimezone = getValidTimezone(this.timeZoneId);
    let localizedZone = this.i18n(normalizedTimezone);
    if (this.shorten) {
      localizedZone = shortenZone(localizedZone);
    }
    let displayText = localizedZone;
    if (this.offset) {
      const localizedUTC = this.i18n('UTC');
      const localizedOffset = getLocalizedOffset(
        localizedUTC,
        normalizedTimezone
      );

      displayText = `${localizedZone} ${localizedOffset}`;
      if (this.surroundOffset) {
        displayText = `${localizedZone} (${localizedOffset})`;
      }
    }
    return (<span>{displayText}</span>) as JSX.Element;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(
      this.root,
      translationResources,
      'gux-time-zone-picker'
    );
  }

  render() {
    return (<Host>{this.renderZoneDisplay()}</Host>) as JSX.Element;
  }
}
