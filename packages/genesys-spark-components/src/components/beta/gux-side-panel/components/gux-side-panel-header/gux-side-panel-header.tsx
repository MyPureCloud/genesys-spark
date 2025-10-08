import { Component, Element, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { hasSlot } from '@utils/dom/has-slot';
import { SlotName } from './gux-side-panel-header.types';

/**
 * @slot icon - Icon component displayed on the left side of the header
 * @slot title - Title for the side panel
 * @slot description - Description truncated to 3 lines
 * @slot badge - Badge displayed on the right hand side
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
        <div class="gux-title-description">
          {hasTitle && <slot name="title" />}
          {hasDescription && (
            <gux-truncate max-lines="2">
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
        {this.renderSlot('expand')}
        {this.renderSlot('collapse')}
      </div>
    ) as JSX.Element;
  }
}
