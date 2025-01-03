import { Component, h, JSX, Element, Host, Listen, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import {
  setFocusTarget,
  resetFocusableSibling
} from './gux-avatar-group.service';
import {
  GuxAvatarAccent,
  GuxAvatarGroupQuantity
} from './gux-avatar-group.types';

interface ProcessedItem {
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
  shadow: { delegatesFocus: true }
})
export class GuxAvatarGroup {
  private processedGroupItems: ProcessedItem[] = [];

  @Element()
  root: HTMLElement;

  @Prop()
  quantity: GuxAvatarGroupQuantity = 7;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    if (this.root.querySelectorAll('gux-avatar-group-item-beta').length === 0) {
      logWarn(
        this.root,
        'gux-avatar-group-beta: No gux-avatar-group-item-beta tags found in slot. Please add gux-avatar-group-item-beta tags to the slot.'
      );
    }
  }

  componentDidLoad(): void {
    this.setInitialFocusTarget();
  }

  componentWillRender(): void {
    this.processGroupItems();
  }

  private setInitialFocusTarget(): void {
    const groupItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];
    if (groupItems.length > 0) {
      const firstGroupItem = groupItems[0] as Element;
      setFocusTarget(firstGroupItem);
    }
  }

  @Listen('mouseover')
  onMouseOver(event: MouseEvent): void {
    this.hideCurrentTooltip(event);
  }

  private hideCurrentTooltip(event: Event) {
    const target = event.target as HTMLGuxAvatarGroupItemBetaElement;
    const groupItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];

    const focusedChild = groupItems.find(child =>
      child.matches(':focus-within')
    );

    if (focusedChild && focusedChild !== target) {
      focusedChild.hideTooltip();
    }
  }

  private handleClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLGuxAvatarGroupItemBetaElement;

    if (
      clickedElement.tagName === 'GUX-AVATAR-GROUP-ITEM-BETA' &&
      !clickedElement.classList.contains('gux-hidden')
    ) {
      resetFocusableSibling(clickedElement);
      setFocusTarget(clickedElement);
    }
  }

  private renderOverflowMenu(): JSX.Element | null {
    if (this.root.children.length > this.quantity) {
      const overflowItems = this.processedGroupItems.filter(
        item => item.isOverflow
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

  private hideOverflowGroupItems(): void {
    const overflowItems = this.processedGroupItems.filter(
      item => item.isOverflow
    );

    overflowItems.forEach(item => {
      item.groupItem.classList.add('gux-hidden');
    });
  }

  private validateChildElements(childElements: HTMLElement[]) {
    if (childElements.length === 0) {
      return;
    }

    const validTagNames = ['GUX-AVATAR-GROUP-ITEM-BETA'];
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

  private processGroupItems(): void {
    const groupItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];

    this.validateChildElements(groupItems);

    this.processedGroupItems = groupItems.map((item, index) => {
      return {
        img: item.querySelector('img') ?? null,
        name: item?.name ?? '',
        accent: item?.accent ?? null,
        isOverflow: index >= this.quantity,
        groupItem: item
      } as ProcessedItem;
    });
  }

  render(): JSX.Element {
    this.hideOverflowGroupItems();

    return (
      <Host role="menu" onClick={this.handleClick.bind(this)}>
        <slot></slot>
        {this.renderOverflowMenu()}
      </Host>
    ) as JSX.Element;
  }
}
