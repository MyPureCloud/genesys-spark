import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-dropdown-multi-tag.scss',
  tag: 'gux-dropdown-multi-tag',
  shadow: true
})
export class GuxDropdownMultiTag {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  /**
   * Triggered when click on remove button
   */
  @Event()
  internalclearselected: EventEmitter<string>;

  /**
   * Tag is disabled.
   */
  @Prop()
  disabled: boolean = false;

  @Prop()
  numberSelected: number = 0;

  @State()
  label: string = '';

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag(event);
    }
  }

  private removeTag(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      return;
    }
    this.internalclearselected.emit();
  }

  private renderRemoveButton(): JSX.Element {
    return (
      <div
        class="gux-tag-remove-button"
        onClick={this.removeTag.bind(this)}
        role="button"
        tabindex="0"
        aria-disabled={this.disabled.toString()}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            this.removeTag(e);
          }
        }}
      >
        <gux-icon
          class="gux-tag-remove-icon"
          size="small"
          icon-name="fa/xmark-large-regular"
          screenreader-text={this.i18n('clearSelection', {
            numberSelected: this.numberSelected.toString()
          })}
        />
      </div>
    ) as JSX.Element;
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-tag': true,
          'gux-disabled': this.disabled
        }}
        aria-disabled={this.disabled.toString()}
      >
        {this.numberSelected.toString()}
        {this.renderRemoveButton()}
      </div>
    ) as JSX.Element;
  }
}
