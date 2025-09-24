import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Prop,
  Listen
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';

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
  root: HTMLElement;

  @AttachInternals()
  internals: ElementInternals;

  @Prop({ mutable: true })
  value: string;

  @Listen('click')
  onClick(event: MouseEvent): void {
    // If it's got a value attribute, that's good enough.
    whenEventIsFrom('gux-branch', event, (branch: HTMLGuxBranchElement) => {
      console.info({ branch });
      branch.expanded = !branch.expanded;

      if (branch.value) {
        this.updateValue(branch.value);
      }
    });

    whenEventIsFrom('gux-leaf', event, (leaf: HTMLGuxLeafElement) => {
      console.info({ leaf });
      if (leaf.value) {
        leaf.selected = true;
        this.updateValue(leaf.value);
      }
    });
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
  }

  render(): JSX.Element {
    return (
      <slot onSlotchange={() => this.setListboxOptions()} />
    ) as JSX.Element;
  }

  private updateValue(newValue: string): void {
    console.info(this.value, newValue);
    if (this.value !== newValue) {
      this.value = newValue;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  private setListboxOptions(): void {
    this.listboxOptions = getListOptions(this.root);
    this.internallistboxoptionsupdated.emit();
  }
}
