import {
  Component,
  Element,
  Listen,
  State,
  h,
  JSX,
  Host,
  Prop,
  Event,
  EventEmitter
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import translationResources from '../i18n/en.json';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-pagination-ellipsis-button.less',
  tag: 'gux-pagination-ellipsis-button',
  shadow: true
})
export class GuxPaginationEllipsisButton {
  ellipsisButton: HTMLElement;
  inputElement: HTMLInputElement;

  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @State()
  isOpen: boolean = false;

  @Prop()
  totalPages: number;

  @Event() goToPage: EventEmitter<string>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case 'Escape':
        this.isOpen = false;
        this.ellipsisButton.focus();
        break;

      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.ellipsisButton)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusInputElement();
        }
        break;
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ': {
        const composedPath = event.composedPath();
        if (composedPath.includes(this.ellipsisButton)) {
          this.isOpen = true;
          this.focusInputElement();
        }
        break;
      }
    }
  }

  private toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusInputElement();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  private focusInputElement(): void {
    afterNextRender(() => {
      this.inputElement.focus();
    });
  }

  private applyInputListener(): void {
    this.inputElement?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key == 'Enter' || event.key == ' ') {
        event.preventDefault();
        this.goToPage.emit((event.target as HTMLInputElement).value);
        this.isOpen = false;
      }
    });
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.applyInputListener();
  }

  render(): JSX.Element {
    return (
      <Host>
        <button
          id="popover-target"
          type="button"
          ref={el => (this.ellipsisButton = el)}
          onClick={() => this.toggle()}
          aria-haspopup="true"
          aria-expanded={this.isOpen.toString()}
        >
          <gux-icon
            screenreaderText={this.i18n('goToPage')}
            icon-name="menu-kebab-horizontal"
          ></gux-icon>
        </button>
        <gux-tooltip for="popover-target">{this.i18n('goToPage')}</gux-tooltip>
        <gux-popover-beta is-open={this.isOpen} for="popover-target">
          <span slot="title">{this.i18n('goToPage')}</span>
          <gux-form-field-number>
            <input
              slot="input"
              type="number"
              ref={el => (this.inputElement = el)}
              min="1"
              max={this.totalPages}
              value="1"
            />
            <label slot="label"></label>
          </gux-form-field-number>
        </gux-popover-beta>
      </Host>
    ) as JSX.Element;
  }
}
