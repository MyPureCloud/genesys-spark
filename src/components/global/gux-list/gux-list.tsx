import { Component, Element, Method, Prop } from '@stencil/core';
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
   * an item could have the poperty isDisabled
   */
  @Prop()
  items: IListItem[] = [];
  onItemClicked(item: IListItem) {
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
    if (firstFocusable) {
      firstFocusable.el.focus();
    }
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
  /**
   * Once the component is loaded set the tabindex
   */
  componentDidLoad() {
    const firstFocusable = this.items.find(item => {
      return (
        item.el &&
        !item.isDisabled &&
        (!item.type || item.type === ListTypeEnum.Item)
      );
    });
    firstFocusable.el.setAttribute('tabindex', '0');
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
              >
                {item.text}
              </li>
            )
        )}
      </ul>
    );
  }
}
