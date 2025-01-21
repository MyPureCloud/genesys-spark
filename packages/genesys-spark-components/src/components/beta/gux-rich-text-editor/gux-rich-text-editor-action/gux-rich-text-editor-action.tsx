import { Component, Element, Prop, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from './i18n/en.json';
import { GuxRichTextEditorActionTypes } from './gux-rich-text-editor-action.types';
import {
  hasDisabledParent,
  returnActionTypeIcon
} from '../gux-rich-text-editor.service';

@Component({
  tag: 'gux-rich-text-editor-action',
  styleUrl: 'gux-rich-text-editor-action.scss',
  shadow: true
})
export class GuxRichTextEditorAction {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  action: GuxRichTextEditorActionTypes;

  @Prop()
  disabled: boolean = false;

  @Prop()
  isActive: boolean = false;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  private renderTooltip(): JSX.Element {
    if (!this.disabled) {
      return (
        <gux-tooltip-beta>
          <div slot="content">{this.i18n(this.action)}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    }
  }

  private renderActionButton(): JSX.Element {
    return (
      <gux-button-slot accent="ghost" icon-only>
        <button
          type="button"
          disabled={this.disabled || hasDisabledParent(this.root)}
          class={{ 'gux-is-pressed': this.isActive }}
          aria-pressed={this.isActive.toString()}
        >
          <gux-icon
            icon-name={returnActionTypeIcon(this.action)}
            screenreader-text={this.i18n(this.action)}
            size="small"
          ></gux-icon>
        </button>
        {this.renderTooltip()}
      </gux-button-slot>
    );
  }

  render(): JSX.Element {
    return this.renderActionButton();
  }
}
