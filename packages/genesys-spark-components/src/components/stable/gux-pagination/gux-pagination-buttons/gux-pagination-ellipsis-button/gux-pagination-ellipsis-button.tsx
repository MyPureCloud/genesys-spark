import {
  Component,
  Element,
  Listen,
  State,
  h,
  JSX,
  Prop,
  Event,
  EventEmitter,
  Watch
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import translationResources from '../i18n/en.json';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-pagination-ellipsis-button.scss',
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

  @Prop()
  disabled: boolean = false;

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

  @Watch('disabled')
  watchIsDisabled(newValue: boolean): void {
    if (newValue) {
      this.isOpen = false;
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
      const inputValue = (event.target as HTMLInputElement).value.trim();
      if (event.key == 'Enter' || event.key == ' ') {
        if (inputValue == '') {
          event.preventDefault();
        } else {
          event.preventDefault();
          this.goToPage.emit((event.target as HTMLInputElement).value);
          this.isOpen = false;
        }
      }
    });
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(
      this.root,
      translationResources,
      'gux-pagination-buttons'
    );
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.applyInputListener();
  }

  render(): JSX.Element {
    return [
      <gux-button
        accent="ghost"
        id="popover-target"
        type="button"
        disabled={this.disabled}
        ref={el => (this.ellipsisButton = el)}
        onClick={() => this.toggle()}
        aria-haspopup="true"
        aria-expanded={this.isOpen.toString()}
      >
        <gux-icon
          screenreaderText={this.i18n('goToPage')}
          icon-name="fa/ellipsis-regular"
        ></gux-icon>
      </gux-button>,
      <gux-tooltip for="popover-target">
        <div slot="content">{this.i18n('goToPage')}</div>
      </gux-tooltip>,
      <gux-popover is-open={this.isOpen} for="popover-target">
        <span slot="title">{this.i18n('goToPage')}</span>
        <gux-form-field-number>
          <input
            slot="input"
            type="number"
            ref={el => (this.inputElement = el)}
            min="1"
            max={this.totalPages}
            value="1"
            onKeyDown={evt =>
              ['e', 'E', '+', '-', '.'].includes(evt.key) &&
              evt.preventDefault()
            }
          />
          <label slot="label"></label>
        </gux-form-field-number>
      </gux-popover>
    ] as JSX.Element;
  }
}
