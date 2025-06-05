import { Component, Element, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { hasSlot } from '@utils/dom/has-slot';
import { SlotName } from './gux-side-panel-header.types';
/**
 * @slot
 */

@Component({
  tag: 'gux-side-panel-header',
  styleUrl: 'gux-side-panel-header.scss',
  shadow: true
})
export class GuxSidePanelHeader {
  private internals: ElementInternals;

  @Element()
  private root: HTMLElement;

  private renderSlot(slotName: SlotName): JSX.Element | null {
    if (hasSlot(this.root, slotName)) {
      return (
        <div class={`${slotName}`}>
          <slot name={`${slotName}`} />
        </div>
      );
    }
    return null;
  }

  private renderTitleDesc(): JSX.Element | null {
    const hasTitle = hasSlot(this.root, 'title');
    const hasDescription = hasSlot(this.root, 'description');

    if (hasTitle || hasDescription) {
      return (
        <div class="titledesc">
          {hasTitle && <slot name="title" />}
          {hasDescription && (
            <gux-truncate max-lines="3">
              <slot name="description" />
            </gux-truncate>
          )}
        </div>
      );
    }
    return null;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  connectedCallback() {
    this.internals = this.root.attachInternals();
    this.internals.role = 'banner';
  }

  render(): JSX.Element {
    return (
      <div class="title-block">
        {this.renderSlot('icon')}
        {this.renderTitleDesc()}
        {this.renderSlot('badge')}
      </div>
    ) as JSX.Element;
  }
}
