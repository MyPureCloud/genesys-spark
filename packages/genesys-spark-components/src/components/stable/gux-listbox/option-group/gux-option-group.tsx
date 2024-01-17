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
  private parentFilterValue: string = '';

  @State()
  filtered: boolean = false;

  @State()
  hideDivider: boolean = false;

  componentDidLoad(): void {
    this.rootParent = getClosestElement(
      'gux-dropdown',
      this.root
    ) as HTMLElement;

    this.parentObserver = onMutation(this.rootParent, () => {
      this.hideDivider =
        this.parentFilterValue.length > 0 &&
        !this.hasVisibleGroupAfter(this.root);
    });

    if (this.rootParent) {
      this.rootParent.addEventListener(
        'guxfilter',
        this.handleFilterChange.bind(this) as EventListenerOrEventListenerObject
      );
    }
  }

  disconnectedCallback(): void {
    if (this.rootParent) {
      this.rootParent.removeEventListener(
        'guxfilter',
        this.handleFilterChange.bind(this) as EventListenerOrEventListenerObject
      );
      this.parentObserver.disconnect();
    }
  }

  private isOption(item: Element): boolean {
    const optionTypes = ['GUX-OPTION', 'GUX-OPTION-ICON'];
    return optionTypes.includes(item.tagName);
  }

  handleFilterChange(event: CustomEvent<string>) {
    this.parentFilterValue = event.detail;

    const options = Array.from(this.root?.children).filter(child =>
      this.isOption(child)
    ) as ListboxOptionElement[];
    const allOptionsFiltered = !options.some(option =>
      this.matchOption(option, this.parentFilterValue)
    );

    this.filtered = this.parentFilterValue.length > 0 && allOptionsFiltered;
  }

  private hasVisibleGroupAfter(element: Element): boolean {
    let nextOption = element.nextElementSibling;
    if (nextOption === null) return false;
    while (nextOption && nextOption.classList.contains('gux-filtered')) {
      nextOption = nextOption.nextElementSibling;
    }
    return Boolean(nextOption);
  }

  private matchOption(
    option: ListboxOptionElement,
    matchString: string
  ): boolean {
    return option.textContent
      .trim()
      .toLowerCase()
      .startsWith(matchString.toLowerCase());
  }

  render(): JSX.Element {
    return (
      <Host class={{ 'gux-filtered': this.filtered }}>
        <div
          class={{
            'gux-option-group': true,
            'gux-hide-divider': this.hideDivider
          }}
        >
          <div class="gux-option-group-label" role="presentation">
            {this.label}
          </div>
          <div role="group">
            <slot />
          </div>
          <gux-list-divider></gux-list-divider>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
