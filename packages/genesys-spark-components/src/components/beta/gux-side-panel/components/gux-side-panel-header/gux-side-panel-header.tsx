import {
  Component,
  Element,
  h,
  State,
  Event,
  EventEmitter
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { hasSlot } from '@utils/dom/has-slot';
import { SlotName } from './gux-side-panel-header.types';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from '../../i18n/en.json';

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
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @State()
  private expanded: boolean = false;

  @State()
  private expandable: boolean = false;

  @Event()
  guxexpanded: EventEmitter<void>;

  @Event()
  guxcollapsed: EventEmitter<void>;

  @Event()
  sidePanelDismiss: EventEmitter<void>;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    const parent = this.root.parentElement;
    if (parent) {
      this.expandable = Boolean(parent.getAttribute('expandable'));
    }
  }

  private onDismissHandler(): void {
    this.sidePanelDismiss.emit();
  }

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
            aria-expanded={this.expanded.toString()}
            onClick={() => this.toggleExpandableState()}
          >
            <gux-icon decorative size="small" icon-name="collapse"></gux-icon>
            <gux-screen-reader-beta>
              {this.i18n('collapse')}
            </gux-screen-reader-beta>
          </button>
        </gux-button-slot>
      );
    } else {
      return (
        <gux-button-slot accent="ghost" icon-only>
          <button
            class="gux-expand"
            aria-expanded={this.expanded.toString()}
            onClick={() => this.toggleExpandableState()}
          >
            <gux-icon decorative size="small" icon-name="expand"></gux-icon>
            <gux-screen-reader-beta>
              {this.i18n('expand')}
            </gux-screen-reader-beta>
          </button>
        </gux-button-slot>
      );
    }
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
        {this.expandable && (
          <gux-dismiss-button
            position="inherit"
            onClick={this.onDismissHandler.bind(this)}
            iconType="toolbar"
          ></gux-dismiss-button>
        )}
      </div>
    ) as JSX.Element;
  }
}
