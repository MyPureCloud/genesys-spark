import { Component, Prop } from '@stencil/core'
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

  onKeyDown(event: KeyboardEvent) {
    const regxp = new RegExp(`|${KeyCode.Up}||${KeyCode.Down}|${KeyCode.End}|${KeyCode.Home}`);
    const key = event.keyCode;
    if (!regxp.test(''+ key)) {
      return;
    }
    // here we need to add the keyboard navigation
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
              onClick={() => this.onItemClicked(item)}
              onKeyDown={(e) => this.onKeyDown(e)}>
            {item.text}
          </li>
        )}
      </ul>
    );
  }
}