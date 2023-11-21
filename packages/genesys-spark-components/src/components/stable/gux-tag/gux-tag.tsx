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

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import tagResources from './i18n/en.json';
import { GuxTagAccent } from './gux-tag.types';

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-tag.scss',
  tag: 'gux-tag',
  shadow: true
})
export class GuxTag {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxTagAccent = 'default';

  @Prop()
  disabled: boolean = false;

  @Prop()
  removable: boolean = false;

  @State()
  label: string;

  @Event()
  guxdelete: EventEmitter<string>;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }

  private removeTag(): void {
    if (this.disabled || !this.removable) {
      return;
    }

    this.guxdelete.emit();
  }

  private onSlotChange(event: Event) {
    const slotAssignedNodes = (
      event.composedPath()[0] as HTMLSlotElement
    ).assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }

  private renderTagTitle(): JSX.Element {
    return (
      <gux-truncate>
        <span>
          <slot
            aria-hidden="true"
            onSlotchange={this.onSlotChange.bind(this)}
          />
        </span>
      </gux-truncate>
    ) as JSX.Element;
  }

  private renderSrText(): JSX.Element {
    return (
      <div class="gux-sr-only">
        {this.disabled
          ? this.i18n('tag-disabled', { label: this.label })
          : this.i18n('tag', { label: this.label })}
      </div>
    ) as JSX.Element;
  }

  private renderRemoveButton(): JSX.Element {
    if (this.removable) {
      return (
        <button
          class="gux-tag-remove-button"
          onClick={this.removeTag.bind(this)}
          type="button"
          disabled={this.disabled}
        >
          <gux-icon
            class="gux-tag-remove-icon"
            icon-name="close"
            screenreader-text={this.i18n('remove-tag', { label: this.label })}
          />
        </button>
      ) as JSX.Element;
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, {
      variant: this.removable ? 'removable' : 'permanent'
    });
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tagResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-tag': true,
          [`gux-accent-${this.accent}`]: true,
          'gux-disabled': this.disabled
        }}
        aria-disabled={this.disabled.toString()}
      >
        {this.renderTagTitle()}
        {this.renderSrText()}
        {this.renderRemoveButton()}
      </div>
    ) as JSX.Element;
  }
}
