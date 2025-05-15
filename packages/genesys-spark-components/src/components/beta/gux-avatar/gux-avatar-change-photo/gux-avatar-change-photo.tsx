import { Component, h, JSX, Element, Event, EventEmitter } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import defaultResources from './i18n/en.json';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot avatar - gux-avatar-beta tag
 */

@Component({
  styleUrl: 'gux-avatar-change-photo.scss',
  tag: 'gux-avatar-change-photo-beta',
  shadow: true
})
export class GuxAvatarChangePhoto {
  private i18n: GetI18nValue;

  @Element() root: HTMLElement;

  @Event()
  guxchangephoto: EventEmitter<void>;

  async componentWillLoad(): Promise<void> {
    this.validateSlot();
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  private validateSlot(): void {
    const slottedElement = this.root.querySelector('gux-avatar-beta');
    if (!slottedElement) {
      logWarn(this.root, 'Slotted element must be gux-avatar-beta');
    }
  }

  render(): JSX.Element {
    return (
      <button
        class="gux-change-photo"
        onClick={() => this.guxchangephoto.emit()}
        aria-label={this.i18n('changePhoto')}
      >
        <gux-icon
          class="gux-change-photo-icon"
          icon-name="fa/camera-solid"
          size="small"
          decorative
        ></gux-icon>
        <slot name="avatar" />
        <gux-tooltip-beta placement="top" visualOnly>
          <div slot="content">{this.i18n('changePhoto')}</div>
        </gux-tooltip-beta>
      </button>
    ) as JSX.Element;
  }
}
