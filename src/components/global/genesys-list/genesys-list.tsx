import { Component, Method, Prop } from '@stencil/core'
import { KeyCode } from '../../../common-enum'
import { ListTypeEnum } from './genesys-list-enums'
import { IListItem } from './genesys-list-interfaces'


@Component({
  styleUrl: 'genesys-list.less',
  tag: 'genesys-list'
})
export class GenesysList {

  /**
   * The list.
   * each item should contain a text and a type 
   * an item could have the poperty isDisabled
   */
  @Prop() items: IListItem[] = []
    
  onItemClicked(item: IListItem) {
    if (item.callback) {
      item.callback(item)
    }
  }

  @Method()
  focus() {
    this.items.forEach((i) => {
      if (i.el) {
        i.el.setAttribute('tabindex', '-1');
      }
    });
    const firstFocusable = this.items.find((item) => {
      return item.el && !item.isDisabled && (!item.type || item.type === ListTypeEnum.Item);
    });
    firstFocusable.el.setAttribute('tabindex', '0')
    if (firstFocusable) {
      firstFocusable.el.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, item: IListItem) {
    const regxp = new RegExp(`|${KeyCode.Up}||${KeyCode.Down}|${KeyCode.End}|${KeyCode.Home}|${KeyCode.Enter}|${KeyCode.Space}`);
    const key = event.keyCode;
    if (!regxp.test(''+ key) || !item.el) {
      return;
    }
    const filteredList = this.items.filter((i) => {
      return i.el && !i.isDisabled && (!i.type || i.type === ListTypeEnum.Item);
    })
    const currentIndex = filteredList.indexOf(item);
    let el = null;
    switch (key) {
      case KeyCode.Enter:
      case KeyCode.Space:
        item.el.click();
        break;
      case KeyCode.Up:
        if (currentIndex) {
          item.el.setAttribute('tabindex', '-1');
          const i = this.items.indexOf(filteredList[currentIndex - 1]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.Home:
        if (currentIndex) {
          item.el.setAttribute('tabindex', '-1');
          const i = this.items.indexOf(filteredList[0]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.Down:
        if (currentIndex !== filteredList.length - 1) {
          item.el.setAttribute('tabindex', '-1');
          const i = this.items.indexOf(filteredList[currentIndex + 1]);
          el = this.items[i].el;
        }
        break;
      case KeyCode.End:
        if (currentIndex !== filteredList.length - 1) {
          item.el.setAttribute('tabindex', '-1');
          const i = this.items.indexOf(filteredList[filteredList.length - 1]);
          el = this.items[i].el;
        }
        break;
    }
    if (el) {
      el.setAttribute('tabindex', '0');
      el.focus();
    }
  }

  /**
   * Once the component is loaded set the tabindex
   */
  componentDidLoad () {
    const firstFocusable = this.items.find((item) => {
      return item.el && !item.isDisabled && (!item.type || item.type === ListTypeEnum.Item);
    });
    firstFocusable.el.setAttribute('tabindex', '0')
  }

  render() {
    return (
      <ul>
        {this.items.map((item) =>
          item.type === ListTypeEnum.Divider ?
          <li class='divider' role='presentation'
              tabIndex={-1}
              >
          </li>
          : 
          <li class={item.isDisabled ? 'disabled' : '' } 
              tabIndex={-1} 
              ref={el => item.el = el}
              onClick={() => this.onItemClicked(item)}
              onKeyDown={(e) => this.onKeyDown(e, item)}>
            {item.text}
          </li>
        )}
      </ul>
    );
  }
}