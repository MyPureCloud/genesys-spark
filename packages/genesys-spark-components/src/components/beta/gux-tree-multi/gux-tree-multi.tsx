import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop,
  Listen,
  Watch,
  forceUpdate,
  Method
} from '@stencil/core';

import {
  handleTreeNodeSpecificEvent,
  setFirstNodeActive,
  setInitialActiveNode,
  setLastNodeActive,
  setNextNodeActive,
  setPreviousNodeActive,
  setParentNodeActive,
  setChildNodeActive,
  toggleNodeSelection,
  setSelectedNodesByValue,
  expandSelectedNodes
} from './gux-tree-multi.service';

import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '@utils/dom/simulate-native-event';

/**
 * @slot label - slot for label
 * @slot search - slot for search
 * @slot default - gux-branch-multi or gux-leaf-multi elements
 */

@Component({
  styleUrl: 'gux-tree-multi.scss',
  tag: 'gux-tree-multi-beta',
  formAssociated: true,
  shadow: true
})
export class GuxTreeMulti {
  @Element()
  root: HTMLGuxTreeMultiBetaElement;

  @AttachInternals()
  internals: ElementInternals;

  @Prop({ mutable: true })
  value: string = '';

  @Method()
  async guxexpandselected(): Promise<void> {
    expandSelectedNodes(this.root);
  }

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
        if (this.isSelectionClick(event)) {
          toggleNodeSelection(this.root, leaf);
        }
      },
      onBranch: branch => {
        if (this.isSelectionClick(event)) {
          toggleNodeSelection(this.root, branch);
        } else {
          branch.expanded = !branch.expanded;
        }
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
      case ' ':
        handleTreeNodeSpecificEvent({
          event,
          onLeaf: leaf => {
            switch (event.key) {
              case 'ArrowLeft':
                event.preventDefault();
                setParentNodeActive(this.root);
                break;
              case 'Enter':
              case ' ':
                event.preventDefault();
                toggleNodeSelection(this.root, leaf);
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
              case ' ':
                event.preventDefault();
                toggleNodeSelection(this.root, branch);
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
    this.internals.ariaMultiSelectable = 'true';
    this.root.setAttribute('aria-multiselectable', 'true');

    setSelectedNodesByValue(this.root, this.value);
    setInitialActiveNode(this.root);
  }

  private onDefaultSlotchange(): void {
    forceUpdate(this.root);
  }

  private isSelectionClick(event: Event): boolean {
    const path = event.composedPath();
    const selectTargets = ['gux-selection-target'];
    return path.some(el => {
      const element = el as HTMLElement;
      return (
        element.classList &&
        selectTargets.some(target => element.classList.contains(target))
      );
    });
  }

  render(): JSX.Element {
    return (
      <slot onSlotchange={() => this.onDefaultSlotchange()} />
    ) as JSX.Element;
  }
}
