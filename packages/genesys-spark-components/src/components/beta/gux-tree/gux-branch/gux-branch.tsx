import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop
} from '@stencil/core';

/**
 * @slot label - Required slot for the branch text
 * @slot icon - Optional slot for the icon
 */

@Component({
  styleUrl: 'gux-branch.scss',
  tag: 'gux-branch',
  formAssociated: true,
  shadow: true
})
export class GuxBranch {
  @Element()
  root: HTMLElement;

  @AttachInternals()
  internals: ElementInternals;

  @Prop()
  value: string;

  @Prop()
  expanded: boolean = false;

  componentWillLoad() {
    this.internals.role = 'treeitem';
    this.root.setAttribute('role', 'treeitem');
    this.root.setAttribute('tabIndex', '0');
  }

  componentWillRender() {
    this.internals.ariaExpanded = String(this.expanded);
    this.root.setAttribute('aria-expanded', String(this.expanded));
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-container': true,
          'gux-expanded': this.expanded
        }}
      >
        <div class="gux-target">
          <div class="gux-branch-indicator">
            <gux-icon
              class="gux-arrow-icon"
              decorative
              icon-name="fa/caret-right-solid"
              size="small"
            ></gux-icon>
          </div>
          <div class="gux-icon">
            <slot name="icon"></slot>
          </div>
          <div class="gux-label">
            <slot name="label"></slot>
          </div>
        </div>

        <div role="group" class="gux-treeitems">
          <slot></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
