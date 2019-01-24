import { Component, Element, Event, EventEmitter, Method, Prop } from '@stencil/core';
import { KeyCode, ListTypeEnum } from '../../../common-enums';
import { IListItem } from '../../../common-interfaces';
@Component({
  styleUrl: 'gux-list.less',
  tag: 'gux-list'
})
export class GuxList {
  @Element()
  root: HTMLStencilElement;
  /**
   * The list.
   * each item should contain a text and a type
   * an item could have the property isDisabled
   */
  @Prop()
  items: IListItem[] = [];
  /**
   * Highlights to bold.
   */
  @Prop()
  highlight: string = '';

  onItemClicked(item: IListItem) {
    this.emitChange(item.text);
    if (item.callback) {
      item.callback(item);
    }
    item.el.setAttribute('tabindex', '0');
    this.items.forEach(i => {
      if (i.el && i !== item) {
        i.el.setAttribute('tabindex', '-1');
      }
    });
  }

  @Event()
  change: EventEmitter;
  emitChange(value: string) {
    this.change.emit(value);
  }

  _computedText (text: string) {
    if (this.highlight && text.startsWith(this.highlight)) {
      return <span><strong>{this.highlight}</strong>{text.replace(this.highlight, '')}</span>;
    } else {
      return text;
    }
  }

  @Method()
  setFocusOnFirstItem() {
    this.items.forEach(i => {
      if (i.el) {
        i.el.setAttribute('tabindex', '-1');
      }
    });
    const firstFocusable = this.items.find(item => {
      return (
        item.el &&
        !item.isDisabled &&
        (!item.type || item.type === ListTypeEnum.Item)
      );
    });
    firstFocusable.el.setAttribute('tabindex', '0');
    if (firstFocusable) { firstFocusable.el.focus(); }
  }

  onKeyDown(event: KeyboardEvent, item: IListItem) {
    const validKeys = [
      KeyCode.Up,
      KeyCode.Down,
      KeyCode.End,
      KeyCode.Home,
      KeyCode.Enter,
      KeyCode.Space
    ];
    const key = event.keyCode;
    if (validKeys.indexOf(event.keyCode) === -1) {
      return;
    }
    const filteredList = this.items.filter(i => {
      return i.el && !i.isDisabled && (!i.type || i.type === ListTypeEnum.Item);
    });
    const currentIndex = filteredList.indexOf(item);
    let el = null;
    switch (key) {
      case KeyCode.Enter:
      case KeyCode.Space:
        item.el.click();
        break;
      case KeyCode.Up:
        if (currentIndex) {
          const i = this.items.indexOf(filteredList[currentIndex - 1]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.Home:
        if (currentIndex) {
          const i = this.items.indexOf(filteredList[0]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.Down:
        if (currentIndex !== filteredList.length - 1) {
          const i = this.items.indexOf(filteredList[currentIndex + 1]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.End:
        if (currentIndex !== filteredList.length - 1) {
          const i = this.items.indexOf(filteredList[filteredList.length - 1]);
          el = this.items[i].el;
        }
        break;
    }
    if (el) {
      item.el.setAttribute('tabindex', '-1');
      el.setAttribute('tabindex', '0');
      el.focus();
    }
  }

  emitFocusEvent (event, item) {
    this.root.dispatchEvent(new CustomEvent(event.type, { ...event, detail: item}));
  }

  setFirstTabIndex () {
    const firstFocusable = this.items.find(item => {
      return (
        item.el &&
        !item.isDisabled &&
        (!item.type || item.type === ListTypeEnum.Item)
      );
    });
    if (firstFocusable) { firstFocusable.el.setAttribute('tabindex', '0'); }
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
  componentDidUpdate () {
    this.setFirstTabIndex();
  }

  render() {
    return (
      <ul>
        {this.items.map(
          item =>
            item.type === ListTypeEnum.Divider ? (
              <li class="divider" role="presentation" tabIndex={-1} />
            ) : (
              <li
                class={item.isDisabled ? 'disabled' : ''}
                tabIndex={-1}
                ref={el => (item.el = el)}
                onClick={() => this.onItemClicked(item)}
                onKeyDown={e => this.onKeyDown(e, item)}
                onFocus={(e) => this.emitFocusEvent(e, item)}
              >
                {this._computedText(item.text)}
              </li>
            )
        )}
      </ul>
    );
  }
}
