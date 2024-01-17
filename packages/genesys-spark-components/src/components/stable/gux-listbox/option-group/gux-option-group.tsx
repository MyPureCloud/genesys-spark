import { Component, h, Host, JSX, Prop, Element, State } from '@stencil/core';
import { ListboxOptionElement } from '../options/option-types';
import { getClosestElement } from '@utils/dom/get-closest-element';
import { onMutation } from '@utils/dom/on-mutation';

/**
 * @slot - collection of elements conforming to the ListboxOptionElement interface
 */
@Component({
  styleUrl: 'gux-option-group.scss',
  tag: 'gux-option-group-beta',
  shadow: true
})
export class GuxOptionGroup {
  private rootParent: HTMLElement;
  private parentObserver: MutationObserver;

  @Element() root: HTMLGuxOptionGroupBetaElement;

  @Prop()
  label!: string;

  // @Prop()
  // disabled: boolean;
  // TOOD: Add disabled state once design work is complete

  @State()
  filtered: boolean = false;

  @State()
  showDivider: boolean = true;

  componentDidLoad(): void {
    this.rootParent = getClosestElement(
      'gux-dropdown',
      this.root
    ) as HTMLElement;

    this.parentObserver = onMutation(this.rootParent, () => {
      const groupOptions = Array.from(this.root?.children).filter(child =>
        this.isOption(child)
      ) as ListboxOptionElement[];
      const allOptionsFiltered = groupOptions.every(option => option.filtered);

      this.showDivider =
        this.hasVisibleNextSibling(this.root) && !allOptionsFiltered;

      this.filtered = allOptionsFiltered;
    });
  }

  disconnectedCallback(): void {
    this.parentObserver.disconnect();
  }

  private isOption(item: Element): boolean {
    const optionTypes = ['GUX-OPTION', 'GUX-OPTION-ICON'];
    return optionTypes.includes(item.tagName);
  }

  private hasVisibleNextSibling(element: Element): boolean {
    let nextOption = element.nextElementSibling;
    if (nextOption === null) return false;
    while (nextOption && nextOption.classList.contains('gux-filtered')) {
      nextOption = nextOption.nextElementSibling;
    }
    return Boolean(nextOption);
  }

  renderDivider(): JSX.Element {
    if (this.showDivider) {
      return (<gux-list-divider></gux-list-divider>) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host class={{ 'gux-filtered': this.filtered }}>
        <div class="gux-option-group">
          <div class="gux-option-group-label" role="presentation">
            {this.label}
          </div>
          <div role="group">
            <slot />
          </div>
          {this.renderDivider()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
