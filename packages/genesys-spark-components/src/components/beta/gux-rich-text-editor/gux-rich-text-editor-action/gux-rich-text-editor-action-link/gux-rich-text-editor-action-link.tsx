import {
  Component,
  Element,
  State,
  h,
  Host,
  Listen,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core';
import { GetI18nValue, buildI18nForComponent } from 'i18n';
import translationResources from '../i18n/en.json';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '@utils/dom/after-next-render';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { calculateDisabledState } from '../../gux-rich-text-editor.service';

@Component({
  tag: 'gux-rich-text-editor-action-link',
  styleUrl: 'gux-rich-text-editor-action-link.scss',
  shadow: false
})
export class GuxRichTextEditorActionLink {
  private i18n: GetI18nValue;
  actionButton: HTMLElement;
  inputElement: HTMLInputElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @State()
  isOpen: boolean = false;

  @Event() linkAddress: EventEmitter<string>;

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case 'Escape':
        this.isOpen = false;
        this.actionButton.focus();
        break;
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.actionButton)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusInputElement();
        }
        break;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.disabled = calculateDisabledState(this.root);
  }

  private emitLinkAddressEvent(): void {
    this.linkAddress.emit(this.inputElement.value);
  }

  private togglePopover(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusInputElement();
    }
  }

  private focusInputElement(): void {
    afterNextRender(() => {
      this.inputElement.focus();
    });
  }

  private closePopover(): void {
    this.isOpen = false;
  }

  private renderTooltip(): JSX.Element {
    if (!this.disabled) {
      return (
        <gux-tooltip>
          <div slot="content">{this.i18n('link')}</div>
        </gux-tooltip>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <gux-button-slot accent="ghost" icon-only>
          <button
            id="popover-target"
            onClick={() => this.togglePopover()}
            ref={el => (this.actionButton = el)}
            type="button"
            disabled={this.disabled}
            aria-haspopup="true"
            aria-expanded={this.isOpen.toString()}
          >
            <gux-icon icon-name="fa/link-simple-regular" decorative></gux-icon>
          </button>
        </gux-button-slot>
        {this.renderTooltip()}
        <gux-popover is-open={this.isOpen} for="popover-target">
          <div class="gux-popover-content-wrapper">
            <gux-form-field-text-like>
              <input
                ref={el => (this.inputElement = el)}
                slot="input"
                type="text"
              />
              <label slot="label">{this.i18n('linkAddress')}</label>
            </gux-form-field-text-like>
            <gux-cta-group align="end">
              <gux-button
                onClick={() => this.emitLinkAddressEvent()}
                slot="primary"
              >
                {this.i18n('insert')}
              </gux-button>
              <gux-button onClick={() => this.closePopover()} slot="dismiss">
                {this.i18n('cancel')}
              </gux-button>
            </gux-cta-group>
          </div>
        </gux-popover>
      </Host>
    ) as JSX.Element;
  }
}
