import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';

const validChildren = 'gux-list-item:not([disabled])';

@Component({
  styleUrl: 'gux-list.less',
  tag: 'gux-list'
})
export class GuxList {
  @Element()
  root: HTMLGuxListElement;

  /**
   * The current selection in the list.
   */
  @Prop()
  value: any;

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
  changed: EventEmitter<any>;

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

  emitChanged(value: any) {
    this.changed.emit(value);
  }

  @Listen('selected')
  itemSelected(ev: CustomEvent<any>) {
    if (!ev.detail) {
      return;
    }

    this.value = ev.detail;
  }

  @Watch('value')
  valueHandler(newValue) {
    this.emitChanged(newValue);
  }

  @Method()
  async setFocusOnFirstItem(): Promise<void> {
    this.selectedIndex = 0;
  }

  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.performHighlight(this.highlight);
    this.observer.observe(this.root, { childList: true, subtree: true });
  }

  componentDidUnload() {
    this.observer.disconnect();
  }

  render() {
    this.performHighlight(this.highlight);
    this.updateTabIndexes();
    return (
      <div role="list" tabindex={0} onKeyDown={e => this.onKeyDown(e)}>
        <slot />
      </div>
    );
  }

  private onKeyDown(event: KeyboardEvent): void {
    const validKeys = [KeyCode.Up, KeyCode.Down, KeyCode.End, KeyCode.Home];
    const key = event.keyCode;
    if (validKeys.indexOf(key) === -1) {
      return;
    }

    const filteredList = this.root.querySelectorAll(validChildren);

    let newIndex = -1;
    switch (key) {
      case KeyCode.Up:
        if (this.selectedIndex) {
          newIndex = this.selectedIndex - 1;
        }
        break;
      case KeyCode.Home:
        if (this.selectedIndex) {
          newIndex = 0;
        }
        break;
      case KeyCode.Down:
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = this.selectedIndex + 1;
        }
        break;
      case KeyCode.End:
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }

    if (newIndex !== -1) {
      this.selectedIndex = newIndex;
    }
  }

  private updateTabIndexes(): void {
    const children = this.root.querySelectorAll(validChildren);

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
}
