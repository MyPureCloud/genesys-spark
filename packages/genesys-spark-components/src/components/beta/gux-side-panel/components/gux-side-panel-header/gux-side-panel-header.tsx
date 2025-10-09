import {
  Component,
  Element,
  h,
  State,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core';
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

  @Prop()
  expandable: boolean = false;

  @State()
  private expanded: boolean = false;

  @Event()
  guxexpanded: EventEmitter<void>;

  @Event()
  guxcollapsed: EventEmitter<void>;

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

  private toggleExpandableState(): void {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.guxexpanded.emit();
    } else {
      this.guxcollapsed.emit();
    }
  }

  private renderExpandOrCollapse(): JSX.Element | null {
    if (!this.expandable) {
      return null;
    }

    if (this.expanded) {
      return (
        <gux-button-slot accent="ghost" icon-only>
          <button
            class="gux-collapse"
            onClick={() => this.toggleExpandableState()}
          >
            <gux-icon decorative size="small" icon-name="collapse"></gux-icon>
          </button>
        </gux-button-slot>
      );
    } else {
      return (
        <gux-button-slot accent="ghost" icon-only>
          <button
            class="gux-expand"
            onClick={() => this.toggleExpandableState()}
          >
            <gux-icon decorative size="small" icon-name="expand"></gux-icon>
          </button>
        </gux-button-slot>
      );
    }
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
      <div
        class={{
          'title-block': true,
          'gux-expandable': this.expandable
        }}
      >
        {this.renderSlot('icon')}
        {this.renderTitleDesc()}
        {this.renderSlot('badge')}
        {this.renderExpandOrCollapse()}
      </div>
    ) as JSX.Element;
  }
}
