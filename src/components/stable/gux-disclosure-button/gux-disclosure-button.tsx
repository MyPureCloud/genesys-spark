import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { trackComponent } from '../../../usage-tracking';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { ILocalizedComponentResources } from '../../../i18n/fetchResources';

import translationResources from './i18n/en.json';
import { GuxDisclosureButtonPosition } from './gux-disclosure-button.types';

@Component({
  styleUrl: 'gux-disclosure-button.less',
  tag: 'gux-disclosure-button',
  shadow: true
})
export class GuxDisclosureButton {
  private i18n: GetI18nValue;
  private panelId: string = randomHTMLId('gux-disclosure-button-panel');

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the position of the button panel
   */
  @Prop()
  position: GuxDisclosureButtonPosition = 'left';

  /**
   * Indicates the label for the disclosure button
   */
  @Prop()
  label: string = (translationResources as ILocalizedComponentResources)
    .defaultLabel;

  /**
   * Used to open or close the disclosure panel
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  /**
   * Indicated image used by button
   */
  @State()
  icon: string = 'arrow-solid-right';

  /**
   * Return the state of the components panel on state change
   * @return the panel state
   */
  @Event()
  active: EventEmitter<boolean>;

  @Watch('isOpen')
  watchIsOpen(): void {
    this.updateIcon();
  }

  changeState(): void {
    this.togglePanel();
    this.active.emit(this.isOpen);
  }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  updateIcon(): void {
    if (this.position === 'right') {
      this.icon = this.isOpen ? 'arrow-solid-right' : 'arrow-solid-left';
    } else {
      this.icon = this.isOpen ? 'arrow-solid-left' : 'arrow-solid-right';
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.position });

    this.i18n = await buildI18nForComponent(this.root, translationResources);

    this.updateIcon();
  }

  render(): JSX.Element {
    return (
      <div class={`gux-disclosure-button-container gux-${this.position}`}>
        <button
          class="gux-disclosure-button"
          onClick={() => this.changeState()}
          aria-controls={this.panelId}
          aria-expanded={this.isOpen.toString()}
          aria-label={this.label || this.i18n('defaultLabel')}
        >
          <gux-icon icon-name={`${this.icon}`} decorative></gux-icon>
        </button>
        <div
          id={this.panelId}
          class={{
            'gux-disclosure-panel': true,
            'gux-active': this.isOpen
          }}
          role="region"
        >
          <slot name="panel-content" />
        </div>
      </div>
    ) as JSX.Element;
  }
}
