import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop,
  Listen,
  Watch,
  forceUpdate
} from '@stencil/core';

import {
  handleTreeNodeSpecificEvent,
  setFirstNodeActive,
  setInitialActiveNode,
  setLastNodeActive,
  setNextNodeActive,
  setPreviousNodeActive,
  setSelectedNode,
  setParentNodeActive,
  setChildNodeActive,
  setSelectedNodeByValue
} from './gux-tree.service';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { logWarn } from '@utils/error/log-error';

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
  private labelId: string;

  @AttachInternals()
  internals: ElementInternals;

  @Prop({ mutable: true })
  value: string;

  @Watch('value')
  handleValueChange(): void {
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  @Listen('click')
  onClick(event: MouseEvent): void {
    handleTreeNodeSpecificEvent({
      event,
      onLeaf: leaf => {
        setSelectedNode(this.root, leaf);
      },
      onBranch: branch => {
        branch.expanded = !branch.expanded;
        setSelectedNode(this.root, branch);
      }
    });
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setNextNodeActive(this.root);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setPreviousNodeActive(this.root);
        break;
      case 'Home':
        event.preventDefault();
        setFirstNodeActive(this.root);
        break;
      case 'End':
        event.preventDefault();
        setLastNodeActive(this.root);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Enter':
        handleTreeNodeSpecificEvent({
          event,
          onLeaf: leaf => {
            switch (event.key) {
              case 'ArrowLeft':
                event.preventDefault();
                setParentNodeActive(this.root);
                break;
              case 'Enter':
                event.preventDefault();
                setSelectedNode(this.root, leaf);
                break;
            }
          },
          onBranch: branch => {
            switch (event.key) {
              case 'ArrowRight':
                event.preventDefault();
                if (!branch.expanded) {
                  branch.expanded = true;
                } else {
                  setChildNodeActive(this.root);
                }
                break;
              case 'ArrowLeft':
                event.preventDefault();
                if (branch.expanded) {
                  branch.expanded = false;
                } else {
                  setParentNodeActive(this.root);
                }
                break;
              case 'Enter':
                event.preventDefault();
                setSelectedNode(this.root, branch);
                break;
            }
          }
        });
        break;
      default:
        return;
    }
  }

  componentWillLoad() {
    trackComponent(this.root);
    this.internals.role = 'tree';
    this.root.setAttribute('role', 'tree');

    setSelectedNodeByValue(this.root, this.value);
    setInitialActiveNode(this.root);
    this.setLabelId();
  }

  private setLabelId(): void {
    const treeLabel = this.root.querySelector('[slot=tree-label]');

    if (!treeLabel) {
      logWarn(this.root, 'Label prop is required for accessibility');
      return;
    }

    this.labelId = treeLabel?.id || randomHTMLId('gux-tree-label');
    treeLabel.id = this.labelId;
    this.root.setAttribute('aria-labelledby', this.labelId);
  }

  private onSlotchange(): void {
    forceUpdate(this.root);
  }

  render(): JSX.Element {
    return (
      <div>
        <slot name="tree-label"></slot>
        <slot onSlotchange={() => this.onSlotchange()} />
      </div>
    ) as JSX.Element;
  }
}
