import { Component, Element, h, Method, Prop, Watch } from '@stencil/core';

@Component({
  styleUrl: 'gux-option.less',
  tag: 'gux-option'
})
export class GuxOption {
  @Element()
  root: HTMLElement;
  slotContent: HTMLElement;

  /**
   * The content of this attribute represents the value to be submitted on 'input' changes,
   * should this option be selected. If this attribute is omitted, the value is taken from
   * the text content of the option element.
   */
  @Prop()
  value: string;

  /**
   * If this Boolean attribute is set, this option is not checkable. It won't receive any
   * browsing events, like mouse clicks or focus-related ones.
   */
  @Prop()
  disabled: boolean;

  /**
   * The content of this attribute represents the value to be displayed,
   * If this attribute is omitted, the value is taken from the text content of the slot.
   * This attribute takes precedence over slot value
   */
  @Prop({ mutable: true })
  text: string;

  @Prop({ reflect: true })
  selected: boolean;

  @Watch('selected')
  updateParentSelection() {
    this.getParentGuxDropdown().setSelected();
  }

  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  @Method()
  shouldFilter(searchInput: string): Promise<boolean> {
    if (!searchInput) {
      return Promise.resolve(false);
    }
    return Promise.resolve(
      !this.text.toLowerCase().startsWith(searchInput.toLowerCase())
    );
  }

  private getParentGuxDropdown(): HTMLGuxDropdownElement {
    return this.root.closest('gux-dropdown');
  }

  componentWillLoad() {
    if (!this.text) {
      this.text = this.root.textContent;
    }
  }

  hostData() {
    return {
      tabindex: '0'
    };
  }

  render() {
    return (
      <div title={this.text}>
        <span
          ref={el => (this.slotContent = el as HTMLElement)}
          style={{ display: 'none' }}
        >
          <slot />
        </span>
        {this.text}
      </div>
    );
  }
}
