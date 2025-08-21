import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Watch
} from '@stencil/core';
import { GuxTreeViewLayout } from '../gux-tree-view-types';
import { randomHTMLId } from '@utils/dom/random-html-id';

/**
 * @slot branch-label - Required slot for the branch text
 * @slot branch-icon - Optional slot for the icon
 */

@Component({
  styleUrl: 'gux-tree-view-branch.scss',
  tag: 'gux-tree-view-branch-beta',
  shadow: true
})
export class GuxTreeViewBranchBeta {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  open: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  layout: GuxTreeViewLayout = 'comfy';

  @Event()
  guxselected: EventEmitter<string>;

  @Event()
  guxunselected: EventEmitter<string>;

  @Prop({ mutable: true })
  selected: boolean = false;

  @Watch('selected')
  watchSelected() {
    if (this.selected) {
      this.guxselected.emit(this.root.id);
    } else {
      this.guxunselected.emit(this.root.id);
    }
  }

  async componentWillLoad(): Promise<void> {
    this.root.id = this.root.id || randomHTMLId('gux-tree-view-branch');
  }

  private toggle() {
    this.open = !this.open;
    this.selected = true;
  }

  render(): JSX.Element {
    return (
      <div>
        <button
          class={{
            'gux-tree-view-branch-target': true,
            'gux-selected': this.selected,
            'gux-disabled': this.disabled,
            'gux-compact': this.layout === 'compact',
            'gux-comfy': this.layout === 'comfy'
          }}
          type="button"
          aria-expanded={this.open.toString()}
          disabled={this.disabled}
          onClick={this.toggle.bind(this)}
        >
          <div
            class={{
              'gux-header-icon': true,
              'gux-expanded': this.open
            }}
          >
            <gux-icon
              class="gux-arrow-icon"
              decorative
              icon-name="fa/caret-right-solid"
              size="small"
            ></gux-icon>
          </div>{' '}
          <slot name="branch-label"></slot>
        </button>

        <div
          class={{
            'gux-content': true,
            'gux-expanded': this.open
          }}
        >
          <slot></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
