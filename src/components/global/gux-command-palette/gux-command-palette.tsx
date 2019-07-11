import { Component, h, Prop } from '@stencil/core';
import { ListTypeEnum } from '../../../common-enums';
import { ICommand, IListItem } from '../../../common-interfaces';

@Component({
  styleUrl: 'gux-command-palette.less',
  tag: 'gux-command-palette'
})
export class GuxCommandPalette {
  /**
   * The recent list.
   * The user specific list of recent activities.
   */
  @Prop()
  recentItems: ICommand[] = [];

  /**
   * The full command list.
   */
  @Prop()
  allItems: ICommand[] | undefined = [];

  @Prop()
  filterValue: string;

  /**
   * test
   */
  filteredItems: IListItem[] = [];

  render() {
    return (
      <div class="gux-command-palette">
        <gux-text-field
          use-clear-button
          onInput={(e: any) => {
            this.handleInput(e);
          }}
        />
        {this.filterValue && <gux-list items={this.filteredItems} />}
        {!this.filterValue && (
          <div>
            <gux-list
              items={this.transformCommands(this.recentItems, 'Recent Items')}
            />
            <gux-list
              items={this.transformCommands(this.allItems, 'Common Items')}
            />
          </div>
        )}
      </div>
    );
  }

  private handleInput(event: any) {
    this.filterValue = event.target.value;

    if (!this.filterValue) {
      return;
    }

    this.filterItems(this.filterValue);
  }

  private filterItems(value: string) {
    this.filteredItems = this.transformCommands(
      this.allItems
        .filter((item: ICommand) => {
          return item.text.includes(value);
        })
        .sort((a: ICommand, b: ICommand) => {
          const aText = a.text.toUpperCase();
          const bText = b.text.toUpperCase();

          if (aText < bText) {
            return -1;
          }

          if (aText > bText) {
            return 1;
          }

          return 0;
        })
    );
  }

  private transformCommands(
    commands: ICommand[],
    header?: string
  ): IListItem[] {
    const retVal = [];

    if (header) {
      retVal.push({
        text: header,
        type: ListTypeEnum.Header
      });
    }

    commands.forEach((command: ICommand) => {
      if (command.shortcut) {
        retVal.push(this.createShortcutCommand(command));
        return;
      }

      retVal.push({
        callback: command.callback,
        text: command.text
      });
    });

    return retVal;
  }

  private createShortcutCommand(command: ICommand): IListItem {
    return {
      callback: command.callback,
      description: command.shortcut,
      text: command.text,
      type: ListTypeEnum.Item
    };
  }
}
