import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State
} from '@stencil/core';

function escapeRegex(input) {
  return input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

@Component({
  tag: 'gux-dropdown-option'
})
export class GuxDropdownOption {
  @Element()
  root: HTMLGuxDropdownOptionElement;

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
   */
  @Prop({ mutable: true, reflectToAttr: true })
  filtered: boolean;

  /**
   * If present, this Boolean attribute indicates that the option is currently selected.
   */
  @Prop({ mutable: true, reflectToAttr: true })
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
  selectedChanged: EventEmitter;

  /**
   * Gets the value rendered by the drop down item.
   */
  @Method()
  getDisplayedValue(): string {
    return this.text;
  }

  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  @Method()
  filter(searchInput: string): boolean {
    this.highlight = searchInput;
    this.highlightIndex = -1;

    if (!searchInput) {
      return false;
    }

    const regex = new RegExp(escapeRegex(searchInput), 'gi');
    const regexResult = regex.exec(this.getDisplayedValue());
    const filter = regexResult === null;
    if (!filter) {
      this.highlightIndex = regexResult.index;
    }

    return filter;
  }

  componentDidLoad() {
    this.root.onclick = () => {
      this._onItemClicked();
    };
  }

  hostData() {
    return {
      tabindex: '0'
    };
  }

  render() {
    return <div>{this._computedText()}</div>;
  }

  private _computedText() {
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

  private _onItemClicked() {
    this.selected = true;
    this.selectedChanged.emit(this.value);
  }
}
