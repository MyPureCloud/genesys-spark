import {
  Component,
  Prop,
  State,
  Element,
  EventEmitter,
  Event,
  Listen,
  h,
  Host
} from '@stencil/core';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from '../i18n/en.json';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  tag: 'gux-rich-text-editor-action-link',
  styleUrl: 'gux-rich-text-editor-action-link.scss',
  shadow: true
})
export class GuxRichTextEditorActionLink {
  private i18n: GetI18nValue;
  actionButton: HTMLElement;
  linkAddressInputElement: HTMLInputElement;
  textToDisplayInputElement: HTMLInputElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @State()
  isOpen: boolean = false;

  @Event() linkOptions: EventEmitter<{ textToDisplay: string; href: string }>;

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    const composedPath = event.composedPath();
    switch (event.key) {
      case 'Escape':
        this.isOpen = false;
        this.actionButton.focus();
        break;
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.actionButton)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusTextToDisplayInputElement();
        }
        break;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  private emitLinkOptions(): void {
    const linkOptions = {
      textToDisplay: this.textToDisplayInputElement.value,
      href: this.linkAddressInputElement.value
    };
    this.linkOptions.emit(linkOptions);

    this.textToDisplayInputElement.value = null;
    this.linkAddressInputElement.value = null;

    this.isOpen = false;
  }

  private togglePopover(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusTextToDisplayInputElement();
    } else {
      this.actionButton.focus();
    }
  }

  private focusTextToDisplayInputElement(): void {
    afterNextRender(() => {
      this.textToDisplayInputElement.focus();
    });
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
            class={{ 'gux-is-pressed': this.isOpen }}
            onClick={() => this.togglePopover()}
            ref={el => (this.actionButton = el)}
            type="button"
            disabled={this.disabled}
            aria-label={this.i18n('link')}
            aria-haspopup="true"
            aria-expanded={this.isOpen.toString()}
          >
            <gux-icon
              size="small"
              icon-name="fa/link-simple-regular"
              decorative
            ></gux-icon>
          </button>
          {this.renderTooltip()}
        </gux-button-slot>
        <gux-popover is-open={this.isOpen} for="popover-target">
          <div class="gux-popover-content-wrapper">
            <gux-form-field-text-like>
              <input
                id="textToDisplay"
                ref={el => (this.textToDisplayInputElement = el)}
                slot="input"
                type="text"
              />
              <label slot="label">{this.i18n('textToDisplay')}</label>
            </gux-form-field-text-like>
            <gux-form-field-text-like>
              <input
                ref={el => (this.linkAddressInputElement = el)}
                slot="input"
                type="text"
              />
              <label slot="label">{this.i18n('linkAddress')}</label>
            </gux-form-field-text-like>
            <gux-cta-group align="end">
              <gux-button onClick={() => this.emitLinkOptions()} slot="primary">
                {this.i18n('insert')}
              </gux-button>
              <gux-button onClick={() => this.togglePopover()} slot="dismiss">
                {this.i18n('cancel')}
              </gux-button>
            </gux-cta-group>
          </div>
        </gux-popover>
      </Host>
    ) as JSX.Element;
  }
}
