import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop,
  Watch
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';

/**
 * @slot label - Required slot for the branch text
 * @slot icon - Optional slot for the icon
 */

@Component({
  styleUrl: 'gux-branch-multi.scss',
  tag: 'gux-branch-multi',
  formAssociated: true,
  shadow: true
})
export class GuxBranchMulti {
  private labelId: string;

  @Element()
  root: HTMLElement;

  @AttachInternals()
  internals: ElementInternals;

  @Prop()
  value: string;

  @Prop()
  expanded: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  filtered: boolean = false;

  @Prop()
  active: boolean = false;

  @Prop()
  selected: boolean = false;

  @Prop()
  indeterminate: boolean = false;

  @Watch('selected')
  handleSelectedChange(newValue: boolean) {
    this.internals.ariaSelected = newValue.toString();
    this.root.setAttribute('aria-selected', newValue.toString());
  }

  @Watch('active')
  handleActiveChange(active: boolean) {
    this.root.setAttribute('tabIndex', active ? '0' : '');

    if (active) {
      this.root.focus();
    }
  }

  componentWillLoad() {
    this.labelId = randomHTMLId('gux-branch-label');
    this.internals.role = 'treeitem';
    this.root.setAttribute('role', 'treeitem');
    this.root.setAttribute('tabIndex', this.active ? '0' : '');
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
        <div
          class={{
            'gux-target': true,
            'gux-disabled': this.disabled,
            'gux-selected': this.selected
          }}
        >
          <div class="gux-branch-indicator">
            <gux-icon
              class="gux-arrow-icon"
              decorative
              icon-name="fa/caret-right-solid"
              size="small"
            ></gux-icon>
          </div>
          <div class="gux-checkbox-container">
            <input
              type="checkbox"
              checked={this.selected}
              disabled={this.disabled}
              aria-labelledby={this.labelId}
              ref={el => {
                if (el) {
                  el.indeterminate = this.indeterminate;
                }
              }}
            />
          </div>
          <div class="gux-icon">
            <slot name="icon"></slot>
          </div>
          <div class="gux-label" id={this.labelId}>
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
