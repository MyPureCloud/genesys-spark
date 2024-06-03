import { Component, Element, JSX, h, Listen, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxTableToolbarActionAccent } from '../gux-table-toolbar-action-accents.types';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
/**
 * @slot text - Slot for action text.
 * @slot icon - Slot for icon.
 */

@Component({
  styleUrl: 'gux-table-toolbar-custom-action.scss',
  tag: 'gux-table-toolbar-custom-action',
  shadow: { delegatesFocus: true }
})
export class GuxTableToolbarCustomAction {
  @Element()
  root: HTMLElement;

  @Prop()
  iconOnly: boolean = false;

  @Prop()
  accent: GuxTableToolbarActionAccent = 'secondary';

  @Prop()
  disabled: boolean = false;

  @Listen('click', { capture: true })
  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private renderTooltip(): JSX.Element {
    if (this.iconOnly) {
      return (
        <gux-tooltip>
          <div slot="content">{getSlotTextContent(this.root, 'text')}</div>
        </gux-tooltip>
      ) as JSX.Element;
    }
  }

  componentWillLoad() {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <gux-button-slot accent={this.accent}>
        <button disabled={this.disabled} type="button" class="gux-action-title">
          <slot name="icon" />
          <span class={{ 'gux-sr-only': this.iconOnly }}>
            <slot name="text" />
          </span>
        </button>
        {this.renderTooltip()}
      </gux-button-slot>
    ) as JSX.Element;
  }
}
