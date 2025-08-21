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
 * @slot leaf-label - Required slot for the text
 * @slot leaf-icon - Optional slot for an icon
 */

@Component({
  styleUrl: 'gux-tree-view-leaf.scss',
  tag: 'gux-tree-view-leaf-beta',
  shadow: true
})
export class GuxTreeViewLeafBeta {
  @Element()
  root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @Prop({ mutable: true })
  selected: boolean = false;

  @Prop()
  layout: GuxTreeViewLayout = 'comfy';

  @Event()
  guxselected: EventEmitter<string>;

  @Event()
  guxunselected: EventEmitter<string>;

  @Watch('selected')
  watchSelected() {
    if (this.selected) {
      this.guxselected.emit(this.root.id);
    } else {
      this.guxunselected.emit(this.root.id);
    }
  }

  private selectLeaf(): void {
    this.selected = true;
  }
  async componentWillLoad(): Promise<void> {
    this.root.id = this.root.id || randomHTMLId('gux-tree-view-branch');
  }
  render(): JSX.Element {
    return (
      <div>
        <button
          aria-checked={this.selected.toString()}
          onClick={() => this.selectLeaf()}
          class={{
            'gux-tree-view-leaf-target': true,
            'gux-selected': this.selected,
            'gux-disabled': this.disabled,
            'gux-compact': this.layout === 'compact',
            'gux-comfy': this.layout === 'comfy'
          }}
        >
          <slot name="leaf-icon"></slot>
          <slot name="leaf-label"></slot>
        </button>
      </div>
    ) as JSX.Element;
  }
}
