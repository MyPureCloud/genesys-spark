import { Component, h, JSX, Prop, Element, Method } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import {
  GuxAvatarSize,
  GuxAvatarAccent,
  GuxAvatarPresence,
  GuxAvatarUcIntegrationApps
} from './gux-avatar.types';
import { render8x8SVG, renderTeamsSVG, renderZoomSVG } from './svg-utils';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import defaultResources from './i18n/en.json';
import { generateInitials } from '@utils/string/generate-initials';
import { getAvatarAccentClass } from './gux-avatar.service';

/**
 * @slot image - Avatar photo.
 */

@Component({
  styleUrl: 'gux-avatar.scss',
  tag: 'gux-avatar-beta',
  shadow: true
})
export class GuxAvatar {
  private i18n: GetI18nValue;
  private parentElement: HTMLElement;
  private tooltip: HTMLGuxTooltipBetaElement;

  @Element()
  root: HTMLElement;

  @Prop()
  size: GuxAvatarSize = 'large';

  /**
   * Name which is shown as initials. Should be formatted 'Lastname Firstname' for JA, zhCN and KO names.
   * Names without blank space will show first 2 characters of string.
   */
  @Prop()
  name!: string;

  /**
   * Manually sets avatar accent
   */
  @Prop()
  accent: GuxAvatarAccent = 'default';

  /**
   * Shows presence such as away or available.
   * Must be combined with badge or ring props to take effect.
   */
  @Prop()
  presence: GuxAvatarPresence = 'none';

  /**
   * Label to display for accessibility
   */
  @Prop()
  label: string;

  /**
   * Controls whether to display a tooltip when the avatar is in a button or link
   */
  @Prop()
  tooltipEnabled: boolean = true;

  /**
   * Shows a ring around the avatar indicating current presence
   */
  @Prop()
  ring: boolean = false;

  /**
   * Shows a badge indicating current presence
   */
  @Prop()
  badge: boolean = false;

  /**
   * Show notifications indicator
   */
  @Prop()
  notifications: boolean = false;

  /**
   * Shows uc integration app logo on large avatar
   */
  @Prop()
  ucIntegration: GuxAvatarUcIntegrationApps = 'none';

  get hasUcIntegration(): boolean {
    return (
      ['zoom', 'teams', '8x8'].includes(this.ucIntegration) &&
      this.size === 'large'
    );
  }

  private validatingInputs(): void {
    const avatarImage = this.root.querySelector('img');
    if (!this.name) {
      logWarn(this.root, 'Name prop is required for accessibility');
    }

    if (avatarImage && !avatarImage.getAttribute('alt')) {
      logWarn(this.root, 'Alt attribute is required for slotted image.');
    }

    if (this.ucIntegration !== 'none' && this.size !== 'large') {
      logWarn(
        this.root,
        'UC Integration app logo can only be shown on large avatar'
      );
    }
  }

  private renderBadge(): JSX.Element | null {
    if (this.notifications) {
      return this.renderNotificationsBadge();
    } else if (this.badge && !['idle', 'none'].includes(this.presence)) {
      return (
        <div
          aria-hidden="true"
          class={{
            'gux-avatar-badge': true,
            [`gux-${this.presence}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getPresenceIcon(this.presence)}
            decorative
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private renderNotificationsBadge(): JSX.Element | null {
    return (
      <div
        aria-hidden="true"
        class={{
          'gux-avatar-badge gux-notifications': true,
          [`gux-${this.size}`]: true
        }}
      >
        <gux-icon icon-name="fa/bell-regular" decorative></gux-icon>
      </div>
    ) as JSX.Element;
  }

  private getPresenceIcon(presence: GuxAvatarPresence): string {
    switch (presence) {
      case 'available':
        return 'fa/circle-check-solid';
      case 'busy':
      case 'meeting':
        return 'fa/ban-outline';
      case 'away':
      case 'break':
      case 'meal':
      case 'training':
        return 'fa/clock-outline';
      case 'on-queue':
        return 'fa/headset-solid';
      case 'offline':
        return 'fa/circle-xmark-regular';
      case 'out-of-office':
        return 'fa/subtract-circle';
      default:
        return 'fa/circle-xmark-regular';
    }
  }

  private renderUcIntegrationsIcon(appName: string): JSX.Element | null {
    switch (appName) {
      case 'teams':
        return renderTeamsSVG();
      case 'zoom':
        return renderZoomSVG();
      case '8x8':
        return render8x8SVG();
      default:
        return null;
    }
  }

  private getUcIntegrationText(appName: string): JSX.Element | null {
    switch (appName) {
      case 'teams':
        return 'Microsoft Teams';
      case 'zoom':
        return 'Zoom';
      case '8x8':
        return '8 by 8';
      default:
        return null;
    }
  }

  private renderUcIntegrationBadge(): JSX.Element | null {
    if (this.hasUcIntegration) {
      return (
        <div class="gux-avatar-integration-badge" aria-hidden="true">
          {this.renderUcIntegrationsIcon(this.ucIntegration)}
        </div>
      ) as JSX.Element;
    }
  }

  private renderTooltip(): JSX.Element | null {
    if (
      this.tooltipEnabled &&
      ['A', 'BUTTON'].includes(this.parentElement.tagName)
    ) {
      return (
        <gux-tooltip-beta
          placement="top"
          ref={el => (this.tooltip = el)}
          visualOnly
        >
          <div slot="content">{this.getDescriptionText()}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    } else {
      return null;
    }
  }

  private getDescriptionText(): string {
    let description = `${this.name}`;

    if (this.notifications) {
      return (description += ` (${this.i18n('notifications')})`);
    }
    if (this.label && this.presence !== 'none') {
      description = description += ` (${this.label})`;
    }

    if (this.hasUcIntegration) {
      description =
        description += ` (${this.getUcIntegrationText(this.ucIntegration)})`;
    }

    return description;
  }

  /*
   * Show tooltip
   */
  @Method()
  async showTooltip(): Promise<void> {
    if (this.tooltipEnabled) {
      return await this.tooltip.showTooltip();
    }
    return;
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    if (this.tooltipEnabled) {
      return await this.tooltip.hideTooltip();
    }
    return;
  }

  async componentWillLoad(): Promise<void> {
    this.parentElement = this.root.parentElement;
    trackComponent(this.root, { variant: this.size });
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  render(): JSX.Element {
    return [
      <div
        class={{
          'gux-avatar': true,
          [`gux-${this.presence}`]: this.ring || this.badge,
          [`gux-${this.size}`]: true,
          'gux-ring': this.ring,
          [getAvatarAccentClass(this.accent, this.name)]: true
        }}
      >
        <div class="gux-content">
          <slot name="image">
            <span role="img" aria-label={this.getDescriptionText()}>
              {generateInitials(this.name)}
            </span>
          </slot>
        </div>
        {this.renderTooltip()}
      </div>,
      this.renderBadge(),
      this.renderUcIntegrationBadge()
    ] as JSX.Element;
  }
}
