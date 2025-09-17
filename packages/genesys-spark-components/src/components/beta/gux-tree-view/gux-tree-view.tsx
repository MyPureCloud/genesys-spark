import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { GuxTreeViewLayout } from './gux-tree-view-types';
import { randomHTMLId } from '@utils/dom/random-html-id';

// import simulateNativeEvent from '@utils/dom/simulate-native-event';

/**
 * @slot default - gux-tree-view-branch or gux-tree-view-leaf elements
 * @slot tree-label - label for the tree
 */

@Component({
  styleUrl: 'gux-tree-view.scss',
  tag: 'gux-tree-view-beta',
  shadow: true
})
export class GuxTreeViewBeta {
  private labelId: string = randomHTMLId('gux-tree-view-label');
  private childIds: string;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  layout: GuxTreeViewLayout = 'comfy';

  @Prop()
  searchable: boolean = false;

  @State()
  selectableElements: Element[] = [];

  @Listen('guxselected')
  onguxselected(event: CustomEvent): void {
    this.selectableElements.forEach(element => {
      if (element.id !== event.detail) {
        (
          element as
            | HTMLGuxTreeViewBranchBetaElement
            | HTMLGuxTreeViewLeafBetaElement
        ).selected = false;
      }
    });
    this.value = event.detail;
  }

  componentWillLoad() {
    this.getTreeViewChildren(this.root);
    this.setLabelId();
    this.setOwnedIds();
    trackComponent(this.root);
  }

  private setLabelId() {
    const treeLabel = this.root.querySelector('[slot="tree-view-heading"]');
    if (treeLabel) {
      treeLabel.id = this.labelId;
    }
  }

  private getSelectableElements(): void {
    this.selectableElements = Array.from(
      this.root.querySelectorAll('GUX-TREE-VIEW-BRANCH-BETA')
    ).concat(Array.from(this.root.querySelectorAll('gux-tree-view-leaf-beta')));
  }

  private setOwnedIds(): void {
    this.childIds = Array.from(this.root.children)
      .filter(
        child =>
          child.nodeName === 'GUX-TREE-VIEW-BRANCH-BETA' ||
          child.nodeName === 'GUX-TREE-VIEW-LEAF-BETA'
      )
      .map(
        element =>
          `${
            (
              element as
                | HTMLGuxTreeViewBranchBetaElement
                | HTMLGuxTreeViewLeafBetaElement
            ).id
          }`
      )
      .join(' ');
  }

  private setSelected() {
    this.getSelectableElements();
    this.selectableElements.forEach(element => {
      if (element.id !== this.value) {
        (
          element as
            | HTMLGuxTreeViewBranchBetaElement
            | HTMLGuxTreeViewLeafBetaElement
        ).selected = false;
      } else {
        (
          element as
            | HTMLGuxTreeViewBranchBetaElement
            | HTMLGuxTreeViewLeafBetaElement
        ).selected = true;
      }
    });
  }

  private getSetSize(parent: Element) {
    return Array.from(parent.children).filter(
      child =>
        child.nodeName === 'GUX-TREE-VIEW-BRANCH-BETA' ||
        child.nodeName === 'GUX-TREE-VIEW-LEAF-BETA'
    ).length;
  }

  private getTreeViewChildren(parent: Element, depth = 0): void {
    this.setSelected();
    Array.from(parent.children).forEach((child, index) => {
      if (
        child.nodeName === 'GUX-TREE-VIEW-BRANCH-BETA' ||
        child.nodeName === 'GUX-TREE-VIEW-LEAF-BETA'
      ) {
        child.setAttribute('layout', this.layout);
        child.setAttribute('aria-posinset', depth.toString());
        child.setAttribute('aria-posinset', index.toString());
        child.setAttribute('aria-setsize', this.getSetSize(parent).toString());
        // if (depth === 1) {
        //   child.classList.add('gux-child-node');
        // } else if (depth === 2) {
        //   child.classList.add('gux-grandchild-node');
        // } else if (depth >= 3) {
        //   child.classList.add('gux-greatgrandchild-node');
        // }
        this.getTreeViewChildren(child, depth + 1);
      }
    });
  }

  private renderSearch(): JSX.Element {
    if (this.searchable) {
      return (
        <gux-form-field-search>
          <input slot="input" type="search" name="lp-1" />
          <label slot="label">Default</label>
        </gux-form-field-search>
      );
    }
  }

  render(): JSX.Element {
    return (
      <Host
        role="tree"
        aria-labelledby={this.labelId}
        aria-owns={this.childIds}
      >
        <div
          class={{
            'gux-tree-view-comfy': this.layout === 'comfy',
            'gux-tree-view-compact': this.layout === 'compact'
          }}
        >
          <div class="gux-tree-view-header" id={this.labelId}>
            <slot name="tree-view-heading"></slot>
            {this.renderSearch()}
          </div>
          <slot></slot>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
