import { Component, Element, Prop, h, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxHighlightColor } from './gux-rich-highlight-list-item.types';
import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import translationResources from '../../gux-rich-text-editor-action/i18n/en.json';
import { getClosestElement } from '@utils/dom/get-closest-element';

@Component({
  tag: 'gux-rich-highlight-list-item',
  styleUrl: 'gux-rich-highlight-list-item.scss',
  shadow: { delegatesFocus: true }
})
export class GuxRichHighlightListItem {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLGuxRichHighlightListItemElement;

  @Prop()
  disabled: boolean = false;

  @Prop()
  highlight: GuxHighlightColor = 'orange';

  @Prop()
  value: string;

  @Listen('mouseup')
  onMouseUp(): void {
    this.focusParentList();
  }

  @Listen('mouseover')
  onMouseOver(): void {
    this.focusParentList();
  }

  private focusParentList(): void {
    const parentList = getClosestElement(
      'gux-rich-text-editor-list',
      this.root
    ) as HTMLElement;

    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.highlight });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  private renderTooltip(): JSX.Element {
    if (!this.disabled && this.highlight !== 'inherit') {
      return (
        <gux-tooltip-beta>
          <div slot="content">{this.i18n(`${this.highlight}`)}</div>
        </gux-tooltip-beta>
      );
    }
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-highlight': true,
          [`gux-${this.highlight}`]: true
        }}
        role="listitem"
      >
        <button
          type="button"
          aria-label={this.i18n(`${this.highlight}`)}
          tabIndex={-1}
          disabled={this.disabled}
        ></button>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
