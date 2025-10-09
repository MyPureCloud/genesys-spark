import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop,
  Watch
} from '@stencil/core';

/**
 * @slot label - Required slot for the text
 * @slot icon - Optional slot for an icon
 */

@Component({
  styleUrl: 'gux-leaf.scss',
  tag: 'gux-leaf',
  formAssociated: true,
  shadow: true
})
export class GuxLeaf {
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
        <div class="gux-icon">
          <slot name="icon"></slot>
        </div>
        <div class="gux-label">
          <slot name="label"></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
