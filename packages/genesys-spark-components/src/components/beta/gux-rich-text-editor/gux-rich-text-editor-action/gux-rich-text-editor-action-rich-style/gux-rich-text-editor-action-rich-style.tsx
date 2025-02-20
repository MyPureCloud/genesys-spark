import {
  Component,
  Element,
  h,
  Prop,
  Listen,
  Watch,
  State,
  forceUpdate
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { hasDisabledParent } from '../../gux-rich-text-editor.service';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRender } from '@utils/dom/after-next-render';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from '../i18n/en.json';

/** 
@slot - for a collection of gux-rich-style-list-item elements.
*/

@Component({
  tag: 'gux-rich-text-editor-action-rich-style',
  styleUrl: 'gux-rich-text-editor-action-rich-style.scss',
  shadow: { delegatesFocus: true }
})
export class GuxRichTextEditorActionRichStyle {
  private i18n: GetI18nValue;
  actionButton: HTMLElement;
  listElement: HTMLGuxRichTextEditorListElement;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  @State()
  expanded: boolean = false;

  @Prop()
  disabled: boolean = false;

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  @Watch('value')
  watchValue(newValue: string) {
    this.validateValue(newValue, this.listElement);
  }

  @Watch('disabled')
  watchDisabled(disabled: boolean) {
    if (disabled) {
      this.expanded = false;
    }
  }

  @Listen('internallistitemsupdated')
  onInternallistitemsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    const isButtonEvent = event.composedPath().includes(this.actionButton);
    const isListEvent = event.composedPath().includes(this.listElement);

    switch (event.key) {
      case 'Escape':
        if (isListEvent) {
          event.preventDefault();
          this.expanded = false;
          this.actionButton.focus();
        }
        break;
      case 'ArrowDown':
      case 'Enter': {
        if (isButtonEvent && !this.expanded) {
          event.preventDefault();
          this.expanded = true;
          this.focusFirstListItem();
        }
        break;
      }
      case 'Tab':
        this.expanded = false;
        break;
      case 'ArrowUp':
        if (isButtonEvent && !this.expanded) {
          event.preventDefault();
          this.expanded = true;
          this.focusLastListItem();
        }
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ': {
        if (event.composedPath().includes(this.actionButton)) {
          event.preventDefault();
          this.expanded = true;
          this.focusFirstListItem();
        }
        break;
      }
    }
  }

  private focusFirstListItem(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }

  private focusLastListItem(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusLastItem();
    });
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  componentWillRender(): void {
    if (this?.listElement) {
      this.validateValue(this.value, this.listElement);
    }
  }

  private validateValue(
    newValue: string,
    listElement: HTMLGuxRichTextEditorListElement
  ): void {
    if (newValue === undefined) {
      listElement.value = newValue;
      return;
    }

    const selectedListItem = this.getListItemElementByValue(newValue);

    if (selectedListItem) {
      listElement.value = newValue;
      return;
    }
  }

  get listItemElements(): HTMLGuxRichStyleListItemElement[] {
    const slot = this.listElement.querySelector('slot');
    if (slot) {
      return Array.from(
        slot.assignedElements() as HTMLGuxRichStyleListItemElement[]
      );
    }
  }

  private getListItemElementByValue(value: string): HTMLElement {
    return this.listItemElements.find(itemElement => {
      return itemElement.value === value;
    });
  }

  private renderTargetDisplay(): JSX.Element {
    if (this?.listElement) {
      const selectedListItemElement = this.getListItemElementByValue(
        this.value
      );
      if (selectedListItemElement) {
        return (
          <span>
            {this.renderListItem(
              selectedListItemElement as HTMLGuxRichTextEditorListElement
            )}
          </span>
        ) as JSX.Element;
      }
    }
  }

  private renderMenu(): JSX.Element {
    return (
      <div class="gux-target-display">
        {this.renderTargetDisplay()}
        <gux-icon
          icon-name={
            this.expanded
              ? 'custom/chevron-up-small-regular'
              : 'custom/chevron-down-small-regular'
          }
          screenreader-text={this.i18n('richStyleDropdown')}
        ></gux-icon>
      </div>
    );
  }

  private renderListItem(item: HTMLGuxRichTextEditorListElement): JSX.Element {
    return (
      <gux-truncate max-lines={1}>{item.textContent}</gux-truncate>
    ) as JSX.Element;
  }

  private renderTooltip(): JSX.Element {
    if (!this.disabled && !this.expanded) {
      return (
        <gux-tooltip-beta>
          <div slot="content">{this.i18n('richStyle')}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    }
  }

  private onActionButtonClick(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusFirstListItem();
    }
  }

  private updateValue(newValue: string): void {
    if (this.value !== newValue) {
      this.value = newValue;
    }
  }

  private onListClick(event: MouseEvent): void {
    // Ensure we get the closest `gux-rich-style-list-item` if the click is on a nested element eg h1,h2,h3.
    const listItem = (event.target as HTMLElement).closest(
      'gux-rich-style-list-item'
    );
    if (listItem) {
      this.expanded = false;
      this.updateValue((listItem as HTMLGuxRichStyleListItemElement).value);
      this.actionButton.focus();
    }
  }

  private renderPopup(): JSX.Element {
    return (
      <div class="gux-list-container" slot="popup">
        <gux-rich-text-editor-list
          ref={el => (this.listElement = el)}
          onClick={e => this.onListClick(e)}
        >
          <slot />
        </gux-rich-text-editor-list>
      </div>
    ) as JSX.Element;
  }

  private renderTarget(): JSX.Element {
    return (
      <gux-button-slot accent="ghost" slot="target" icon-only>
        <button
          type="button"
          ref={el => (this.actionButton = el)}
          class={{ 'gux-is-pressed': this.expanded }}
          onClick={() => this.onActionButtonClick()}
          disabled={this.disabled || hasDisabledParent(this.root)}
          aria-haspopup="true"
          aria-expanded={this.expanded.toString()}
        >
          {this.renderMenu()}
        </button>
        {this.renderTooltip()}
      </gux-button-slot>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup
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
