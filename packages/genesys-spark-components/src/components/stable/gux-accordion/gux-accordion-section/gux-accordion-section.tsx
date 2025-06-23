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

import { randomHTMLId } from '@utils/dom/random-html-id';
import { logError } from '@utils/error/log-error';

import {
  GuxAccordionSectionArrowPosition,
  GuxAccordionSectionContentLayout
} from './gux-accordion-section.types';

/**
 * @slot header - Required slot for the heading
 * @slot subheader - Optional slot for a subheader
 * * @slot icon - Optional slot for an icon
 */

@Component({
  styleUrl: 'gux-accordion-section.scss',
  tag: 'gux-accordion-section',
  shadow: true
})
export class GuxAccordionSection {
  private sectionId: string = randomHTMLId('gux-accordion-section');
  private headerId: string = randomHTMLId('gux-accordion-header');
  private hasIconSlot: boolean;

  @Element()
  root: HTMLElement;

  /**
   * Position of the arrow chevron icon. Position can be 'start' or 'end'.
   */
  @Prop()
  arrowPosition: GuxAccordionSectionArrowPosition = 'end';

  /**
   * The content layout used in the accordion section. 'text' layout provides default padding, 'custom' removes default padding.
   */
  @Prop()
  contentLayout: GuxAccordionSectionContentLayout = 'text';

  @Prop({ mutable: true })
  open: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  reverseHeadings: boolean = false;

  @Event()
  guxopened: EventEmitter<void>;

  @Event()
  guxclosed: EventEmitter<void>;

  @Watch('open')
  watchOpen(open: boolean): void {
    if (open) {
      this.guxopened.emit();
    } else {
      this.guxclosed.emit();
    }
  }

  @State()
  headingLevel: number;

  private toggle() {
    this.open = !this.open;
  }

  private isArrowPositionBeforeText(): boolean {
    return this.arrowPosition === 'start';
  }

  private handleSlotChange(slotname: 'header' | 'subheader'): void {
    const slot = this.root.querySelector(`[slot="${slotname}"]`);

    slot.role = 'presentation';

    if (!slot || !/^H[1-6]$/.test(slot.nodeName)) {
      logError(
        this.root,
        `For accessibility reasons the ${slotname} slot should be filled with a HTML heading tag (h1 - h6).`
      );
    }

    if (slotname == 'header') {
      this.headingLevel = parseInt(slot.nodeName.replace('H', ''), 10);
    }
  }

  componentWillLoad() {
    this.hasIconSlot = !!this.root.querySelector('[slot="icon"]');
  }

  render(): JSX.Element {
    return (
      <section class={{ 'gux-disabled': this.disabled }}>
        <div id={this.headerId} role="heading" aria-level={this.headingLevel}>
          <button
            class={{
              'gux-header': true,
              'gux-reverse-headings': this.reverseHeadings
            }}
            type="button"
            aria-expanded={this.open.toString()}
            aria-controls={this.sectionId}
            disabled={this.disabled}
            onClick={this.toggle.bind(this)}
          >
            {this.hasIconSlot && <slot name="icon"></slot>}

            <div
              class={{
                'gux-header-text': true
              }}
            >
              <slot
                onSlotchange={() => this.handleSlotChange('header')}
                name="header"
              ></slot>
              <slot
                onSlotchange={() => this.handleSlotChange('subheader')}
                name="subheader"
              ></slot>
            </div>
            <div
              class={{
                'gux-header-icon': true,
                'gux-expanded': this.open,
                'gux-arrow-position-start': this.isArrowPositionBeforeText()
              }}
            >
              <gux-icon
                decorative
                icon-name="custom/chevron-down-small-regular"
                size="small"
              ></gux-icon>
            </div>
          </button>
        </div>

        <div
          id={this.sectionId}
          role="region"
          aria-labelledby={this.headerId}
          class={{
            'gux-content': true,
            'gux-expanded': this.open,
            'gux-text-content-layout': this.contentLayout === 'text'
          }}
        >
          <slot name="content"></slot>
        </div>
      </section>
    ) as JSX.Element;
  }
}
