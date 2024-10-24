import { Component, h, JSX, Element, Prop, State, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Some list items with gux-avatar-focusable in them
 */
@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  @Element() root: HTMLElement;

  @Prop() count: number = 0;

  @State() expanded: boolean = false;

  @Listen('internalcollapsed')
  onInternalCollapsed(event: CustomEvent): void {
    event.stopPropagation();
    this.expanded = false;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  private toggleOverflowList(): void {
    this.expanded = !this.expanded;
  }

  render(): JSX.Element {
    return (
      <gux-popup
        expanded={this.expanded}
        disabled={false}
        exceedTargetWidth={true}
      >
        <div class="gux-target" slot="target">
          <button
            class="gux-avatar-overflow"
            onClick={() => this.toggleOverflowList()}
          >
            <div class="gux-avatar-overflow-wrapper">
              <div class="gux-avatar-overflow-content"> +{this.count}</div>
            </div>
          </button>
        </div>
        <div slot="popup" class="gux-list-container">
          <slot></slot>
        </div>
      </gux-popup>
    ) as JSX.Element;
  }
}
