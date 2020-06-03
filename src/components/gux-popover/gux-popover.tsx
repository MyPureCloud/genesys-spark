import { createPopper, Instance } from '@popperjs/core';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch
} from '@stencil/core';
import { buildI18nForComponent } from '../i18n';
import modalComponentResources from './i18n/en.json';

export type PopperPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

@Component({
  styleUrl: 'gux-popover.less',
  tag: 'gux-popover'
})
export class GuxPopover {
  i18n: (resourceKey: string, context?: any) => string;

  /**
   * Triggered when the close button gets clicked
   */
  @Event()
  close: EventEmitter;

  /**
   * Indicate position of popover element arrow (follow popper js position attribute api)
   */
  @Prop()
  position: PopperPosition = 'top';

  /**
   * Indicate if the close button is displayed
   */
  @Prop()
  hideClose: boolean;

  /**
   * Indicate if the popover is hidden
   */
  @Prop({ mutable: true })
  hidden: boolean = false;

  /**
   * Indicates the id of the element the popover should anchor to
   */
  @Prop()
  for: string;

  popperInstance: Instance;

  @Element() private element: HTMLElement;

  @Watch('hidden')
  hiddenHandler(hidden: boolean) {
    if (!hidden && !this.popperInstance) {
      this.runPopper();
    }
  }

  runPopper() {
    const referenceElement = document.getElementById(this.for);
    if (referenceElement) {
      this.popperInstance = createPopper(referenceElement, this.element, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 7]
            }
          }
        ],
        placement: this.position
      });
    } else {
      console.error(
        `GUX-Popover: invalid element supplied to 'for': "${this.for}"`
      );
    }
  }

  destroyPopper() {
    const instance = this.popperInstance;
    if (instance) {
      instance.destroy();
      this.popperInstance = null;
    }
  }

  closePopover() {
    this.hidden = true;
    this.destroyPopper();
    this.close.emit();
  }

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(
      this.element,
      modalComponentResources
    );
  }

  componentDidLoad() {
    if (!this.hidden && !this.popperInstance) {
      this.runPopper();
    }
  }

  componentDidUnload() {
    this.destroyPopper();
  }

  render() {
    return (
      <div class={`popover-wrapper ${this.hidden ? 'hidden' : ''}`}>
        <div class="arrow" data-popper-arrow />
        {!this.hideClose && (
          <div class="title-bar">
            <gux-icon
              class="close"
              icon-name="close"
              screenreader-text={this.i18n('close')}
              onClick={this.closePopover.bind(this)}
            />
          </div>
        )}
        <div class="popover-content">
          <slot />
        </div>
      </div>
    );
  }
}
