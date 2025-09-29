import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Listen,
  State
} from '@stencil/core';

import {
  onClickedNode,
  convertValueToArray,
  getTreeNodes
} from './gux-tree.service';

import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { TreeNodeElement } from './tree-node-types';

/**
 * @slot default - gux-tree-view-branch or gux-tree-view-leaf elements
 */

@Component({
  styleUrl: 'gux-tree.scss',
  tag: 'gux-tree-beta',
  formAssociated: true,
  shadow: true
})
export class GuxTreeBeta {
  @Element()
  root: HTMLGuxTreeBetaElement;

  @AttachInternals()
  internals: ElementInternals;

  @State()
  selectedValues: string[] = [];

  @State()
  treeNodes: TreeNodeElement[] = [];

  @Event()
  internaltreenodesupdated: EventEmitter;

  @Prop({ mutable: true })
  value: string;

  @Listen('click')
  onClick(event: MouseEvent): void {
    let eventFromLeaf = false;
    whenEventIsFrom('gux-leaf', event, (leaf: HTMLGuxLeafElement) => {
      console.info('from leaf', { leaf });
      if (leaf.value) {
        leaf.selected = true;
        onClickedNode(leaf, value => this.updateValue(value));
        eventFromLeaf = true;
      }
    });
    // If it's got a value attribute, that's good enough.
    if (!eventFromLeaf) {
      whenEventIsFrom('gux-branch', event, (branch: HTMLGuxBranchElement) => {
        console.info('from branch', { branch });
        branch.selected = true;
        branch.expanded = !branch.expanded;
        onClickedNode(branch, value => this.updateValue(value));
        return;
      });
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        console.warn('not implemented');
        break;
      case 'ArrowLeft':
        console.warn('not implemented');
        break;
      case 'ArrowDown':
        console.warn('move focus to next visible node');
        break;
      case 'ArrowUp':
        console.warn('move focus to previous visible node');
        break;
      case 'Home':
        console.warn('move focus to fist visible node');
        break;
      case 'End':
        console.warn('move focus to last visible node');
        break;
      case 'Enter':
        console.warn('not implemented');
        break;
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ': {
        console.warn('not implemented');
        break;
      }
    }
  }

  componentWillLoad() {
    trackComponent(this.root);
    this.internals.role = 'tree';
    this.root.setAttribute('role', 'tree');
    this.setTreeNodes();
  }

  componentWillRender(): void {
    this.treeNodes.forEach(treeNode => {
      treeNode.selected = treeNode.value === this.value;
    });
  }

  private setTreeNodes(): void {
    this.selectedValues = convertValueToArray(this.value);
    this.treeNodes = getTreeNodes(this.root);
    this.internaltreenodesupdated.emit();
  }

  render(): JSX.Element {
    return (<slot onSlotchange={() => this.setTreeNodes()} />) as JSX.Element;
  }

  private updateValue(newValue: string): void {
    console.info(this.value, newValue);
    if (this.value !== newValue) {
      this.value = newValue;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }
}
