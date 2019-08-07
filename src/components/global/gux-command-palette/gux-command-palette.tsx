import { Component, Element, h, Method, State } from '@stencil/core';
import { matchesFuzzy } from '../../../search';
import { buildI18nForComponent } from '../../i18n';
import { HighlightStrategy } from '../gux-list/text-highlight/highlight-enums';
import paletteResources from './gux-command-palette.i18n.json';

const filterLimit = 50;

function sortActions(
  items: HTMLGuxCommandActionElement[]
): HTMLGuxCommandActionElement[] {
  return items.sort(
    (a: HTMLGuxCommandActionElement, b: HTMLGuxCommandActionElement) => {
      if (a.recent && !b.recent) {
        return -1;
      }

      if (!a.recent && b.recent) {
        return 1;
      }

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
  );
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
  @State()
  filterValue: string = '';

  /**
   * If the command palette is shown.
   */
  @State()
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
    let filteredItems = this.filterItems(allItems);
    let commonList: HTMLGuxListElement;

    if (commonItems.length) {
      commonList = this.createList(
        commonItems,
        this.filterValue,
        this.i18n('commonSearch')
      );
    }

    if (this.filterValue && filteredItems.length) {
      const filterExceeded = filteredItems.length > filterLimit;
      if (filterExceeded) {
        filteredItems = filteredItems.slice(0, filterLimit);
      }

      const filterList = [
        <gux-list highlight={this.filterValue}>{filteredItems}</gux-list>
      ];

      if (filterExceeded) {
        filterList.unshift(<div class="limit">{this.i18n('limited')}</div>);
      }

      if (filteredItems.length !== 1 && commonItems.length) {
        return [filterList, commonList];
      }

      return filterList;
    }

    const lists = [];

    if (recentItems.length && !this.filterValue) {
      lists.push(
        this.createList(
          recentItems,
          this.filterValue,
          this.i18n('recentSearch')
        )
      );
    }

    if (commonList) {
      lists.push(commonList);
    }

    if (!lists.length) {
      return (
        <gux-list>{this.transformCommands(sortActions(allItems))}</gux-list>
      );
    }

    return lists;
  }

  /**
   * Opens the command palette.
   */
  @Method()
  async open() {
    this.visible = true;

    setTimeout(() => {
      this.inputElement.querySelector('input').focus();
    });
  }

  /**
   * Closes the command palette.
   */
  @Method()
  async close() {
    this.filterValue = '';
    this.visible = false;
  }

  private handleInput(event: any) {
    this.filterValue = event.target.value;
  }

  private filterItems(items: HTMLGuxCommandActionElement[]): HTMLElement[] {
    return this.transformCommands(
      sortActions(
        items.filter((item: HTMLGuxCommandActionElement) => {
          return matchesFuzzy(
            this.filterValue,
            `${item.text} + ${item.details}`
          );
        })
      ),
      '',
      true
    );
  }

  private createShortcutItem(
    command: HTMLGuxCommandActionElement
  ): HTMLGuxListItemElement {
    return (
      <gux-list-item value={command.text} onPress={this.handlePress(command)}>
        <div>
          <gux-text-highlight
            text={command.text}
            strategy={HighlightStrategy.Fuzzy}
          />
          <span class="shortcut">{command.shortcut}</span>
        </div>
        {command.details && (
          <gux-text-highlight
            class="details"
            text={command.details}
            strategy={HighlightStrategy.Fuzzy}
          />
        )}
      </gux-list-item>
    );
  }

  private createStandardItem(
    command: HTMLGuxCommandActionElement
  ): HTMLGuxListItemElement {
    return (
      <gux-list-item value={command.text} onPress={this.handlePress(command)}>
        <gux-text-highlight
          text={command.text}
          strategy={HighlightStrategy.Fuzzy}
        />
        {command.details && (
          <gux-text-highlight
            class="details"
            text={command.details}
            strategy={HighlightStrategy.Fuzzy}
          />
        )}
      </gux-list-item>
    );
  }

  private transformCommands(
    commands: HTMLGuxCommandActionElement[],
    header?: string,
    divider?: boolean
  ): HTMLElement[] {
    const retVal = [];

    if (header) {
      retVal.push(<strong>{header}</strong>);
    }

    let needsDivider = divider;

    commands.forEach((command: HTMLGuxCommandActionElement, index: number) => {
      if (index === 0 && !command.recent) {
        needsDivider = false;
      }

      if (needsDivider && !command.recent) {
        needsDivider = false;
        retVal.push(<gux-list-divider />);
      }

      if (command.shortcut) {
        retVal.push(this.createShortcutItem(command));
        return;
      }

      retVal.push(this.createStandardItem(command));
    });

    return retVal;
  }

  private handlePress(command: HTMLGuxCommandActionElement): () => void {
    return () => {
      this.close();
      setTimeout(() => {
        command.invokePress();
      });
    };
  }

  private createList(
    items: HTMLGuxCommandActionElement[],
    filter: string,
    header?: string
  ): HTMLGuxListElement {
    return (
      <gux-list highlight={filter}>
        {this.transformCommands(sortActions(items), header)}
      </gux-list>
    );
  }
}
