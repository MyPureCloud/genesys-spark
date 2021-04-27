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

// RegExp escape string from http://stackoverflow.com/a/3561711/23528
const escapeRegexStr = /[-/\\^$*+?.()|[\]{}]/g;
function escapeRegex(input) {
  return input.replace(escapeRegexStr, '\\$&');
}

@Component({
  tag: 'gux-dropdown-option'
})
export class GuxDropdownOption {
  @Element()
  root: HTMLElement;

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
   * If this Boolean attribute is set, the option is not visible to the select control.
   * This does not mean that it clears the selection if it was previously selected.
   *
   * Should only be used by internal users.
   */
  @Prop({ mutable: true, reflect: true })
  filtered: boolean;

  /**
   * If present, this Boolean attribute indicates that the option is currently selected.
   */
  @Prop({ mutable: true, reflect: true })
  selected: boolean;

  @Prop()
  text: string;

  @State()
  highlight: string;
  highlightIndex: number;

  /**
   * Occurs when the item has been selected.
   */
  @Event()
  selectedChanged: EventEmitter<string>;

  /**
   * Gets the value rendered by the drop down item.
   */
  @Method()
  getDisplayedValue(): Promise<string> {
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
    this.highlightIndex = -1;

    if (!searchInput) {
      return Promise.resolve(false);
    }

    const regex = new RegExp(escapeRegex(searchInput), 'gi');

    const regexResult = regex.exec(this.text);
    const filter = regexResult === null;
    if (!filter) {
      this.highlightIndex = regexResult.index;
    }

    return Promise.resolve(filter);
  }

  componentDidLoad() {
    this.root.onclick = () => {
      this.onItemClicked();
    };

    this.root.onkeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          this.selected = true;
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
    return <div>{this.textWithHighlights()}</div>;
  }

  private textWithHighlights() {
    if (!this.highlight || !this.text) {
      return <span>{this.text}</span>;
    }

    if (this.highlightIndex < 0) {
      return <span>{this.text}</span>;
    }

    const preface = this.text.substring(0, this.highlightIndex);
    const actualHighlight = this.text.substring(
      this.highlightIndex,
      this.highlightIndex + this.highlight.length
    );
    const suffix = this.text.substring(preface.length + this.highlight.length);

    return (
      <span>
        {preface}
        <strong>{actualHighlight}</strong>
        {suffix}
      </span>
    );
  }

  private onItemClicked() {
    this.selected = true;
    this.selectedChanged.emit(this.value);
  }
}
