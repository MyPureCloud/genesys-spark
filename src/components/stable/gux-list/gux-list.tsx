import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

const validChildren = [
  'gux-list-item:not([disabled])',
  'gux-action-item:not([disabled])'
].join(',');

@Component({
  styleUrl: 'gux-list.less',
  tag: 'gux-list',
  shadow: true
})
export class GuxList {
  @Element()
  root: HTMLElement;

  /**
   * The current selection in the list.
   */
  @Prop({ mutable: true })
  value: unknown;

  /**
   * The highlight value
   */
  @Prop()
  highlight: string;

  /**
   * The currently selected index.
   */
  @State()
  selectedIndex: number = -1;

  /**
   * Triggered when the list's selection is changed.
   */
  @Event()
  changed: EventEmitter<unknown>;

  /**
   * Using a mutation observer because component loading order is not quite right.
   * In this case we are attempting to update a component that updates a component.
   * What ends up happening is that there is no hook to make sure all components have loaded.
   * When the DOM load order gets fixed we should be able to remove this logic.
   * https://github.com/ionic-team/stencil/issues/1261
   */
  private observer: MutationObserver = new MutationObserver(() => {
    this.performHighlight(this.highlight);
  });

  emitChanged(value: unknown) {
    this.changed.emit(value);
  }

  @Listen('selected')
  itemSelected(ev: CustomEvent<unknown>) {
    if (!ev.detail) {
      return;
    }

    this.value = ev.detail;
  }

  @Watch('value')
  valueHandler(newValue: unknown) {
    this.emitChanged(newValue);
  }

  /*
   * Sets focus to the fist item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setFocusOnFirstItem(): Promise<void> {
    this.selectedIndex = 0;
    this.updateTabIndexes();
  }

  /*
   * Sets focus to the last item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setFocusOnLastItem(): Promise<void> {
    const filteredList = this.getFilteredList();
    this.selectedIndex = filteredList.length - 1;
    this.updateTabIndexes();
  }

  /**
   * Returns whether the last item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isLastItemSelected(): Promise<boolean> {
    const filteredList = this.getFilteredList();
    return this.selectedIndex === filteredList.length - 1;
  }

  /**
   * Returns whether the first item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isFirstItemSelected(): Promise<boolean> {
    return this.selectedIndex <= 0;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.performHighlight(this.highlight);
    this.observer.observe(this.root, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  render(): JSX.Element {
    this.performHighlight(this.highlight);
    this.updateTabIndexes();
    return (
      <div
        class="gux-list-items-container"
        role="list"
        tabindex={0}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <slot />
      </div>
    ) as JSX.Element;
  }

  private onKeyDown(event: KeyboardEvent): void {
    const validKeys = ['ArrowUp', 'ArrowDown', 'End', 'Home'];
    if (!validKeys.includes(event.key)) {
      return;
    }

    const filteredList = this.getFilteredList();

    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIndex !== 0) {
          event.preventDefault();
          newIndex = this.selectedIndex - 1;
          event.stopPropagation();
        } else if (!this.isCommandPaletteList()) {
          event.preventDefault();
          newIndex = filteredList.length - 1;
        }
        break;
      case 'Home':
        if (this.selectedIndex) {
          newIndex = 0;
        }
        break;
      case 'ArrowDown':
        if (this.selectedIndex !== filteredList.length - 1) {
          event.preventDefault();
          newIndex = this.selectedIndex + 1;
          event.stopPropagation();
        } else if (!this.isCommandPaletteList()) {
          event.preventDefault();
          newIndex = 0;
          event.stopPropagation();
        }
        break;
      case 'End':
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }

    if (newIndex !== -1) {
      this.selectedIndex = newIndex;
    }
  }

  // delete this once gux-command-palette-legacy is removed from library
  private isCommandPaletteList(): boolean {
    return Boolean(this.root.closest('gux-command-palette-legacy'));
  }

  private updateTabIndexes(): void {
    const children = this.getFilteredList();

    if (!children || this.selectedIndex === -1) {
      return;
    }

    children.forEach((element: HTMLGuxListItemElement, index: number) => {
      if (index !== this.selectedIndex) {
        element.setAttribute('tabindex', '-1');
      } else {
        element.setAttribute('tabindex', '0');
        element.focus();
        setTimeout(() => {
          this.value = element.value;
        });
      }
    });
  }

  private performHighlight(value: string): void {
    const items = this.root.querySelectorAll('gux-text-highlight');

    if (!items) {
      return;
    }

    items.forEach((element: HTMLGuxTextHighlightElement) => {
      element.highlight = value;
    });
  }

  private getFilteredList(): Element[] {
    const slot = this.root.querySelector('slot');

    if (slot) {
      return slot
        .assignedElements()
        .filter(element => element.matches(validChildren));
    }

    return Array.from(this.root.querySelectorAll(validChildren));
  }
}
