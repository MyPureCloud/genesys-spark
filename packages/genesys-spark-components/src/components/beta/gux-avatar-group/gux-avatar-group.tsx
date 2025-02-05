import { Component, h, JSX, Element, Host, Listen, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import {
  setFocusTarget,
  resetFocusableSibling
} from './gux-avatar-group.service';
import { GuxAvatarAccent } from '../gux-avatar/gux-avatar.types';

interface ProcessedGroupItem {
  img?: HTMLImageElement | null;
  name: string;
  accent: GuxAvatarAccent;
  isOverflow: boolean;
  groupItem: HTMLGuxAvatarGroupItemBetaElement;
}

/**
 * @slot - slot for gux-avatar-group-item components
 */
@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: true
})
export class GuxAvatarGroup {
  private processedGroupItems: ProcessedGroupItem[] = [];

  @Element()
  root: HTMLElement;

  @Prop()
  quantity: number = 7;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.quantity.toString() });
  }

  componentDidLoad(): void {
    this.setInitialFocusTarget();
  }

  componentWillRender(): void {
    this.processGroupItems();
    this.hideOverflowGroupItems();
  }

  @Listen('mouseover')
  onMouseOver(event: MouseEvent): void {
    this.hideCurrentTooltip(event);
  }

  private getGroupItems(): HTMLGuxAvatarGroupItemBetaElement[] {
    return Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];
  }

  private setInitialFocusTarget(): void {
    const groupItems = this.getGroupItems();

    if (groupItems.length > 0) {
      const firstGroupItem = groupItems[0] as Element;
      setFocusTarget(firstGroupItem);
    }
  }

  private processGroupItems(): void {
    const groupItems = this.getGroupItems();
    this.validateChildElements(groupItems);

    this.processedGroupItems = groupItems.map((item, index) => {
      return {
        img: item.querySelector('img') ?? null,
        name: item?.name ?? '',
        accent: item?.accent ?? null,
        isOverflow: index >= this.quantity,
        groupItem: item
      } as ProcessedGroupItem;
    });
  }

  private hideOverflowGroupItems(): void {
    const overflowItems = this.processedGroupItems.filter(
      item => item.isOverflow
    );

    overflowItems.forEach(item => {
      item.groupItem.setAttribute('hidden', '');
    });
  }

  private hideCurrentTooltip(event: Event) {
    const target = event.target as HTMLElement;
    const groupItems = this.getGroupItems();
    const addToGroup = this.root.shadowRoot.querySelector(
      'gux-avatar-group-add-item-beta'
    ) as HTMLGuxAvatarGroupAddItemBetaElement;
    const itemsWithTooltip = [...groupItems, addToGroup];

    const focusedChild = itemsWithTooltip.find(child =>
      child?.matches(':focus-within')
    );

    if (focusedChild && focusedChild !== target) {
      focusedChild.hideTooltip();
    }
  }

  private handleClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLGuxAvatarGroupItemBetaElement;

    if (
      clickedElement.tagName === 'GUX-AVATAR-GROUP-ITEM-BETA' &&
      !clickedElement.hasAttribute('hidden')
    ) {
      resetFocusableSibling(clickedElement);
      setFocusTarget(clickedElement);
    }
  }

  private validateChildElements(childElements: HTMLElement[]) {
    if (childElements.length === 0) {
      logWarn(
        this.root,
        'gux-avatar-group-beta: No child elements detected. Please add some gux-avatar-item-beta tags to slot'
      );
    }

    const validTagNames = [
      'GUX-AVATAR-GROUP-ITEM-BETA',
      'GUX-AVATAR-GROUP-ADD-ITEM-BETA'
    ];
    const invalidElements = childElements.some(
      el => !validTagNames.includes(el.tagName)
    );

    if (invalidElements) {
      logWarn(
        this.root,
        'gux-avatar-group-beta: Invalid child element detected. All child elements must be either buttons, anchor tags or gux-avatar-beta components'
      );
    }
  }

  private renderOverflowMenu(): JSX.Element | null {
    if (this.root.children.length > this.quantity) {
      const overflowItems = this.processedGroupItems.filter(
        item =>
          item.isOverflow &&
          item.groupItem.tagName === 'GUX-AVATAR-GROUP-ITEM-BETA'
      );

      return (
        <gux-avatar-overflow-beta>
          {
            overflowItems.map(item => {
              return (
                <gux-avatar-overflow-item-beta
                  name={item.name}
                  accent={item.accent}
                  onClick={() => item.groupItem.click()}
                >
                  {item.img ? (
                    <img slot="image" src={item.img?.src} alt={item.img?.alt} />
                  ) : null}
                </gux-avatar-overflow-item-beta>
              );
            }) as JSX.Element[]
          }
        </gux-avatar-overflow-beta>
      ) as JSX.Element;
    } else {
      return null;
    }
  }

  private renderAddToGroup(): JSX.Element | null {
    const hasAddToGroup = this.processedGroupItems.find(
      item => item.groupItem.tagName === 'GUX-AVATAR-GROUP-ADD-ITEM-BETA'
    );
    if (hasAddToGroup && this.root.children.length > this.quantity) {
      return (
        <gux-avatar-group-add-item-beta class="gux-add-item-overflow"></gux-avatar-group-add-item-beta>
      ) as JSX.Element;
    } else {
      return null;
    }
  }

  render(): JSX.Element {
    return (
      <Host role="menu" onClick={this.handleClick.bind(this)}>
        <slot></slot>
        {this.renderOverflowMenu()}
        {this.renderAddToGroup()}
      </Host>
    ) as JSX.Element;
  }
}
