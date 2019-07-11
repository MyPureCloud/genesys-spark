import { Component, h, Method, Prop, State } from '@stencil/core';
import { ActionTypeEnum, ListTypeEnum } from '../../../common-enums';
import { ICommand, IListItem } from '../../../common-interfaces';
import { GuxList } from '../gux-list/gux-list';

function getCommandText(command: ICommand): string {
  if (!command.details) {
    return command.text;
  }

  return `${command.text}: ${command.details}`;
}

function createList(
  items: ICommand[],
  filter: string,
  header?: string
): GuxList {
  return (
    <gux-list
      items={this.transformCommands(items, header)}
      highlight={filter}
    />
  );
}

@Component({
  styleUrl: 'gux-command-palette.less',
  tag: 'gux-command-palette'
})
export class GuxCommandPalette {
  /**
   * The full command list.
   */
  @Prop()
  items: ICommand[] | undefined = [];

  /**
   * The current search value.
   */
  @Prop()
  filterValue: string;

  /**
   * If the command palette is shown.
   */
  @Prop()
  visible: boolean = false;

  @State()
  foundItem: boolean = false;

  private filteredItems: IListItem[] = [];

  private input: HTMLElement;

  render() {
    return (
      <div class={`gux-command-palette ${this.visible ? '' : 'hidden'}`}>
        <gux-text-field
          use-clear-button
          onInput={(e: any) => {
            this.handleInput(e);
          }}
          value={this.filterValue}
          ref={el => (this.input = el)}
        />
        {this.renderLists()}
      </div>
    );
  }

  renderLists() {
    const recentItems = this.getSpecificActions(ActionTypeEnum.Recent);
    const commonItems = this.getSpecificActions(ActionTypeEnum.Common);
    let recentList: GuxList;
    let commonList: GuxList;

    if (commonItems.length) {
      commonList = createList(commonItems, this.filterValue, 'Common Searches');
    }

    if (recentItems.length) {
      recentList = createList(
        commonItems,
        this.filterValue,
        'Recently Searched'
      );
    }

    if (this.filterValue && this.filteredItems.length) {
      const filterList = (
        <gux-list items={this.filteredItems} highlight={this.filterValue} />
      );

      if (!this.foundItem || !commonItems.length) {
        return filterList;
      }

      return [filterList, commonList];
    }

    const lists = [];

    if (recentList && !this.filterValue) {
      lists.push(recentList);
    }

    if (commonList) {
      lists.push(commonList);
    }

    if (!lists.length) {
      return <gux-list items={this.transformCommands(this.items)} />;
    }

    return lists;
  }

  @Method()
  async open() {
    this.visible = true;

    setTimeout(() => {
      this.input.querySelector('input').focus();
    });
  }

  @Method()
  async close() {
    this.filterValue = '';
    this.visible = false;
  }

  private handleInput(event: any) {
    this.filterValue = event.target.value;

    if (!this.filterValue) {
      return;
    }

    this.filterItems(this.filterValue);
  }

  private getSpecificActions(type: ActionTypeEnum): ICommand[] {
    return this.items.filter(item => {
      return item.type && item.type === type;
    });
  }

  private filterItems(value: string) {
    let exactMatch = false;
    this.filteredItems = this.transformCommands(
      this.items
        .filter((item: ICommand) => {
          if (item.text === value) {
            exactMatch = true;
          }

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

    this.foundItem = exactMatch;
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
        callback: this.createCallback(command.callback),
        text: getCommandText(command)
      });
    });

    return retVal;
  }

  private createShortcutCommand(command: ICommand): IListItem {
    return {
      callback: this.createCallback(command.callback),
      description: command.shortcut,
      text: getCommandText(command),
      type: ListTypeEnum.Item
    };
  }

  private createCallback(callback: () => void): () => void {
    return () => {
      this.close();
      setTimeout(callback);
    };
  }
}
