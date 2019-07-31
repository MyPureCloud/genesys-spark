import { Component, Element, h, Method, Prop } from '@stencil/core';
import { buildI18nForComponent } from '../../i18n';
import { GuxList } from '../gux-list/gux-list';
import paletteResources from './gux-command-palette.i18n.json';

function getCommandText(command: HTMLGuxCommandActionElement): string {
  if (!command.details) {
    return command.text;
  }

  return `${command.text}: ${command.details}`;
}

@Component({
  styleUrl: 'gux-command-palette.less',
  tag: 'gux-command-palette'
})
export class GuxCommandPalette {
  @Element()
  element: HTMLElement;

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

  private inputElement: HTMLElement;

  private i18n: (resourceKey: string, context?: any) => string;

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.element, paletteResources);
  }

  render() {
    return (
      <div class={`gux-command-palette ${this.visible ? '' : 'hidden'}`}>
        <gux-search
          use-clear-button
          onInput={(e: any) => {
            this.handleInput(e);
          }}
          value={this.filterValue}
          ref={el => (this.inputElement = el)}
        />
        {this.renderLists()}
      </div>
    );
  }

  renderLists() {
    const allItems = Array.from(this.element.children).slice(0, -1) as any[];
    const recentItems = allItems.filter(item => item.recent);
    const commonItems = allItems.filter(item => item.common);
    const filteredItems = this.filterItems(allItems);
    let recentList: GuxList;
    let commonList: GuxList;

    if (commonItems.length) {
      commonList = this.createList(
        commonItems,
        this.filterValue,
        this.i18n('commonSearch')
      );
    }

    if (recentItems.length) {
      recentList = this.createList(
        recentItems,
        this.filterValue,
        this.i18n('recentSearch')
      );
    }

    if (this.filterValue && filteredItems.length) {
      const filterList = (
        <gux-list highlight={this.filterValue}>{filteredItems}</gux-list>
      );

      if (filteredItems.length !== 1 || !commonItems.length) {
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
      return <gux-list>{this.transformCommands(allItems)}</gux-list>;
    }

    return lists;
  }

  @Method()
  async open() {
    this.visible = true;

    setTimeout(() => {
      this.inputElement.querySelector('input').focus();
    });
  }

  @Method()
  async close() {
    this.filterValue = '';
    this.visible = false;
  }

  private handleInput(event: any) {
    this.filterValue = event.target.value;
  }

  private filterItems(
    items: HTMLGuxCommandActionElement[]
  ): HTMLGuxListItemElement[] {
    return this.transformCommands(
      items
        .filter((item: HTMLGuxCommandActionElement) => {
          return item.text.includes(this.filterValue);
        })
        .sort(
          (a: HTMLGuxCommandActionElement, b: HTMLGuxCommandActionElement) => {
            const aText = a.text.toUpperCase();
            const bText = b.text.toUpperCase();

            if (aText < bText) {
              return -1;
            }

            if (aText > bText) {
              return 1;
            }

            return 0;
          }
        )
    );
  }

  private transformCommands(
    commands: HTMLGuxCommandActionElement[],
    header?: string
  ): HTMLGuxListItemElement[] {
    const retVal = [];

    if (header) {
      retVal.push(
        <gux-list-item value={header} text={header} class="header" />
      );
    }

    commands.forEach((command: HTMLGuxCommandActionElement) => {
      const commandText = getCommandText(command);

      if (command.shortcut) {
        retVal.push(
          <gux-list-item
            value={command.text}
            onPress={this.handlePress(command)}
          >
            <gux-text-highlight text={commandText} />
            <span class="shortcut">{command.shortcut}</span>
          </gux-list-item>
        );
        return;
      }

      retVal.push(
        <gux-list-item
          value={command.text}
          text={commandText}
          onPress={this.handlePress(command)}
        />
      );
    });

    return retVal;
  }

  private handlePress(command: HTMLGuxCommandActionElement): () => void {
    return () => {
      this.close();
      setTimeout(() => {
        command.invokeAction();
      });
    };
  }

  private createList(
    items: HTMLGuxCommandActionElement[],
    filter: string,
    header?: string
  ): GuxList {
    return (
      <gux-list highlight={filter}>
        {this.transformCommands(items, header)}
      </gux-list>
    );
  }
}
