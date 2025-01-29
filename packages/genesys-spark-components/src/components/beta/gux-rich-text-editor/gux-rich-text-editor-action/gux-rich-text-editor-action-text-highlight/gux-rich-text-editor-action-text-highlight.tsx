import {
  Component,
  State,
  Prop,
  Watch,
  Element,
  Event,
  EventEmitter,
  Listen,
  h
} from '@stencil/core';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from '../i18n/en.json';
import { hasDisabledParent } from '../../gux-rich-text-editor.service';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { afterNextRender } from '@utils/dom/after-next-render';
import { eventIsFrom } from '@utils/dom/event-is-from';

/**
 * @slot - for a collection of gux-rich-highlight-list-item.
 */

@Component({
  tag: 'gux-rich-text-editor-action-text-highlight',
  styleUrl: 'gux-rich-text-editor-action-text-highlight.scss',
  shadow: { delegatesFocus: true }
})
export class GuxRichTextEditorActionTextHighlight {
  private i18n: GetI18nValue;
  actionButton: HTMLElement;
  noHighlightActionButton: HTMLElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @Prop()
  isActive: boolean = false;

  @State()
  expanded: boolean = false;

  @Event() noHighlightAction: EventEmitter<void>;

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  @Watch('disabled')
  watchDisabled(disabled: boolean) {
    if (disabled) {
      this.expanded = false;
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    const isHighlightItemEvent = eventIsFrom(
      'gux-rich-highlight-list-item',
      event
    );

    const composedPath = event.composedPath();
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        this.actionButton.focus();
        break;
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.actionButton)) {
          event.preventDefault();
          this.expanded = true;
          this.focusNoHighlightActionButton();
        }
        break;
      case 'Tab':
        if (event.shiftKey) {
          return;
        }
        if (isHighlightItemEvent) {
          this.expanded = false;
        }
        break;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  private togglePopup(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusNoHighlightActionButton();
    } else {
      this.actionButton.focus();
    }
  }

  private focusNoHighlightActionButton(): void {
    afterNextRender(() => {
      this.noHighlightActionButton.focus();
    });
  }

  private renderTooltip(): JSX.Element {
    if (!this.disabled && !this.expanded) {
      return (
        <gux-tooltip-beta>
          <div slot="content">{this.i18n('textHighlight')}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    }
  }

  private renderPopup(): JSX.Element {
    return (
      <div class="gux-text-highlight-popup" slot="popup">
        {this.renderNoHighlightAction()}
        {this.renderTextHighlightColors()}
      </div>
    ) as JSX.Element;
  }

  private renderNoHighlightAction(): JSX.Element {
    return (
      <gux-button-slot accent="tertiary">
        <button
          type="button"
          ref={el => (this.noHighlightActionButton = el)}
          onClick={() => this.emitNoHighlightAction()}
        >
          <gux-truncate max-lines={1}>{this.i18n('noHighlight')}</gux-truncate>
        </button>
      </gux-button-slot>
    ) as JSX.Element;
  }

  private onListClick(event: MouseEvent): void {
    whenEventIsFrom('gux-rich-highlight-list-item', event, () => {
      this.expanded = false;
      this.actionButton.focus();
    });
  }

  private renderTextHighlightColors(): JSX.Element {
    return (
      <gux-rich-text-editor-list
        onClick={(e: MouseEvent) => this.onListClick(e)}
      >
        <slot />
      </gux-rich-text-editor-list>
    ) as JSX.Element;
  }

  private emitNoHighlightAction(): void {
    this.noHighlightAction.emit();
    this.expanded = false;
    this.actionButton.focus();
  }

  private renderTarget(): JSX.Element {
    return (
      <gux-button-slot accent="ghost" icon-only slot="target">
        <button
          type="button"
          ref={el => (this.actionButton = el)}
          onClick={() => this.togglePopup()}
          disabled={this.disabled || hasDisabledParent(this.root)}
          class={{ 'gux-is-pressed': this.isActive || this.expanded }}
          aria-haspopup="true"
          aria-expanded={this.expanded.toString()}
          aria-pressed={this.isActive.toString()}
        >
          <gux-icon
            size="small"
            icon-name="fa/highlighter-line-regular"
            screenreader-text={this.i18n('textHighlight')}
          ></gux-icon>
        </button>
        {this.renderTooltip()}
      </gux-button-slot>
    );
  }

  render(): JSX.Element {
    return (
      <gux-popup
        disabled={this.disabled}
        expanded={this.expanded}
        exceedTargetWidth
        placement="bottom-start"
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
