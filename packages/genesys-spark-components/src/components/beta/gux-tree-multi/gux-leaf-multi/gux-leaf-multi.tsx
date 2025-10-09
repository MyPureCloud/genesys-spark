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
 * @slot label - Required slot for the text
 * @slot icon - Optional slot for an icon
 */

@Component({
  styleUrl: 'gux-leaf-multi.scss',
  tag: 'gux-leaf-multi',
  formAssociated: true,
  shadow: true
})
export class GuxLeafMulti {
  private labelId: string;

  @Element()
  root: HTMLElement;

  @AttachInternals()
  internals: ElementInternals;

  @Prop()
  value: string;

  @Prop()
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  active: boolean = false;

  @Prop()
  filtered: boolean = false;

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
    this.labelId = randomHTMLId('gux-leaf-label');
    this.internals.role = 'treeitem';
    this.root.setAttribute('role', 'treeitem');
    this.root.setAttribute('tabIndex', this.active ? '0' : '');
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-target': true,
          'gux-disabled': this.disabled,
          'gux-selected': this.selected
        }}
      >
        <div class="gux-checkbox-container">
          <input
            type="checkbox"
            checked={this.selected}
            disabled={this.disabled}
            aria-labelledby={this.labelId}
          />
        </div>
        <div class="gux-icon">
          <slot name="icon"></slot>
        </div>
        <div class="gux-label" id={this.labelId}>
          <slot name="label"></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
