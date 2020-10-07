import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop
} from '@stencil/core';

import { buildI18nForComponent } from '../../../i18n';

import modalComponentResources from './i18n/en.json';
import { GuxSimpleToastAccent } from './gux-simple-toast.types';

/**
 * @slot icon - Required slot for gux-icon
 * @slot message - Required slot for the simple toast message
 */
@Component({
  styleUrl: 'gux-simple-toast.less',
  tag: 'gux-simple-toast'
})
export class GuxSimpleToast {
  /**
   * The component accent.
   */
  @Prop()
  accent: GuxSimpleToastAccent = 'neutral';

  @Event()
  guxdismiss: EventEmitter<void>;

  private getI18nValue: (resourceKey: string, context?: any) => string;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      modalComponentResources
    );
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={`icon ${this.accent}`}>
          <slot name="icon" />
        </div>

        <div class="message">
          <slot name="message" />
        </div>

        <button
          class="dismiss-button"
          title={this.getI18nValue('dismiss')}
          onClick={this.onDismissClickHandler.bind(this)}
        >
          <gux-icon
            screenreader-text={this.getI18nValue('dismiss')}
            icon-name="ic-close"
          ></gux-icon>
        </button>
      </Host>
    );
  }

  private onDismissClickHandler(event: MouseEvent): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
}
