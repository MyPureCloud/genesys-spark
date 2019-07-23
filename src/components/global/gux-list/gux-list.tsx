import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  Watch
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';

const validChildren = 'gux-list-item:not(.disabled)';

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
   * Triggered when the list's selection is changed.
   */
  @Event()
  changed: EventEmitter<any>;
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

  @Watch('highlight')
  highlightHandler(newValue: string): void {
    this.performHighlight(newValue);
  }

  @Watch('value')
  valueHandler(newValue) {
    this.emitChanged(newValue);
  }

  @Method()
  async setFocusOnFirstItem(): Promise<void> {
    this.setFirstTabIndex();
  }

  setFirstTabIndex(): void {
    const items = this.root.querySelectorAll(validChildren);

    items.forEach((element: HTMLGuxListItemElement, index: number) => {
      if (index !== 0) {
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

  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.setFirstTabIndex();
    this.performHighlight(this.highlight);
  }

  render() {
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
    let currentIndex = -1;

    filteredList.forEach((element: HTMLElement, index: number) => {
      if (element.tabIndex === 0) {
        currentIndex = index;
      }
    });

    let newIndex = -1;
    switch (key) {
      case KeyCode.Up:
        if (currentIndex) {
          newIndex = currentIndex - 1;
        }
        break;
      case KeyCode.Home:
        if (currentIndex) {
          newIndex = 0;
        }
        break;
      case KeyCode.Down:
        if (currentIndex !== filteredList.length - 1) {
          newIndex = currentIndex + 1;
        }
        break;
      case KeyCode.End:
        if (currentIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }

    if (newIndex !== -1) {
      filteredList.forEach((element: HTMLGuxListItemElement, index: number) => {
        if (index !== newIndex) {
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
  }

  private performHighlight(value: string): void {
    const items = this.root.querySelectorAll('gux-text-highlight');

    if (!items) {
      return;
    }

    items.forEach((element: HTMLGuxTextHighlightElement) => {
      element.setHighlight(value);
    });
  }
}
