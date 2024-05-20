import { Component, h, Host, JSX, Prop, Element, State } from '@stencil/core';
import { ListboxOptionElement } from '../options/option-types';
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
  // TOOD: GDS-2328

  @State()
  filtered: boolean = false;

  @State()
  showDivider: boolean = true;

  componentDidLoad(): void {
    this.rootParent = this.root.parentNode as HTMLElement;

    if (this.rootParent) {
      this.parentObserver = onMutation(this.rootParent, () => {
        const visibleOptions =
          Array.from(this.root?.children).filter(
            (child: ListboxOptionElement) =>
              this.isOption(child) && !child.filtered
          ).length > 0;

        this.filtered = !visibleOptions;
        if (!this.filtered) {
          this.showDivider =
            this.hasVisibleNextSibling(this.root) && visibleOptions;
        }
      });
    }
  }

  disconnectedCallback(): void {
    if (this.rootParent) {
      this.parentObserver.disconnect();
    }
  }

  private isOption(item: Element): boolean {
    const optionTypes = ['GUX-OPTION', 'GUX-OPTION-ICON'];
    return optionTypes.includes(item.tagName);
  }

  private hasVisibleNextSibling(element: Element): boolean {
    let nextOption = element.nextElementSibling;
    if (nextOption === null) {
      return false;
    }
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
