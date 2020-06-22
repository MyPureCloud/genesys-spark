import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State
} from '@stencil/core';

@Component({
  tag: 'gux-option'
})
export class GuxOption {
  @Element()
  root: HTMLGuxOptionElement;

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

  @Prop()
  text: string;

  @State()
  highlight: string;

  /**
   * Occurs when the item has been selected.
   */
  @Event()
  selectedChanged: EventEmitter<string>;

  /**
   * Occurs when the item has been focused.
   */
  @Event()
  onFocus: EventEmitter<string>;

  /**
   * Gets the text rendered by the drop down item.
   */
  @Method()
  getDisplayedText(): Promise<string> {
    return Promise.resolve(this.text);
  }

  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  @Method()
  shouldFilter(searchInput: string): Promise<boolean> {
    this.highlight = searchInput;

    if (!searchInput) {
      return Promise.resolve(false);
    }
    return Promise.resolve(!this.text.startsWith(searchInput));
  }

  componentDidLoad() {
    this.root.onfocus = () => this.onFocus.emit(this.text);
    this.root.onclick = () => {
      this.onItemClicked();
    };

    this.root.onkeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          this.selectedChanged.emit(this.value);
          break;
      }
    };
  }

  hostData() {
    return {
      tabindex: '0'
    };
  }

  render() {
    return (
      <div>
        <gux-text-highlight
          text={this.text}
          highlight={this.highlight ? this.highlight : ''}
        />
      </div>
    );
  }

  private onItemClicked() {
    this.selectedChanged.emit(this.value);
  }
}
