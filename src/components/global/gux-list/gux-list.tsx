import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';

@Component({
  styleUrl: 'gux-list.less',
  tag: 'gux-list'
})
export class GuxList {
  @Element()
  root: HTMLGuxListElement;

  @Prop()
  value: HTMLElement;

  @Event()
  changed: EventEmitter<HTMLElement>;
  emitChanged(value: HTMLElement) {
    this.changed.emit(value);
  }

  @Listen('action')
  itemClicked(ev: CustomEvent<HTMLElement>) {
    if (!ev.detail) {
      return;
    }

    this.value = ev.detail;
    this.emitChanged(this.value);
  }

  @Method()
  async setFocusOnFirstItem() {
    const items = this.root.querySelectorAll(
      '[role="listitem"]:not(.divider):not(.disabled), li:not(.divider):not(.disabled)'
    );

    items.forEach((element, index) => {
      if (index !== 0) {
        element.classList.remove('selected');
        element.setAttribute('tabindex', '-1');
      } else {
        element.classList.add('selected');
        element.setAttribute('tabindex', '0');
        (element as HTMLElement).focus();
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const validKeys = [
      KeyCode.Up,
      KeyCode.Down,
      KeyCode.End,
      KeyCode.Home,
      KeyCode.Space,
      KeyCode.Enter
    ];
    const key = event.keyCode;
    if (validKeys.indexOf(key) === -1) {
      return;
    }

    const filteredList = this.root.querySelectorAll(
      '[role="listitem"]:not(.divider):not(.disabled), li:not(.divider):not(.disabled)'
    );
    let currentIndex = -1;
    let currentElement = null;

    filteredList.forEach((element, index) => {
      if (element.classList.contains('selected')) {
        currentIndex = index;
        currentElement = element;
      }
    });

    let newIndex = -1;
    switch (key) {
      case KeyCode.Enter:
      case KeyCode.Space:
        currentElement.click();
        break;
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
      filteredList.forEach((element, index) => {
        if (index !== newIndex) {
          element.classList.remove('selected');
          element.setAttribute('tabindex', '-1');
        } else {
          element.classList.add('selected');
          element.setAttribute('tabindex', '0');
          (element as HTMLElement).focus();
        }
      });
    }
  }

  emitFocusEvent(event, item) {
    this.root.dispatchEvent(
      new CustomEvent(event.type, { ...event, detail: item })
    );
  }

  setFirstTabIndex() {
    const firstFocusable = this.root.querySelector(
      '[role="listitem"]:not(.divider):not(.disabled), li:not(.divider):not(.disabled)'
    );
    if (firstFocusable) {
      firstFocusable.classList.add('selected');
      firstFocusable.setAttribute('tabindex', '0');
      (firstFocusable as HTMLElement).focus();
    }
  }

  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.setFirstTabIndex();
  }
  /**
   * Once the component is updated
   */
  componentDidUpdate() {
    this.setFirstTabIndex();
  }

  render() {
    return (
      <div role="list" tabindex={0} onKeyDown={e => this.onKeyDown(e)}>
        <slot />
      </div>
    );
  }
}
