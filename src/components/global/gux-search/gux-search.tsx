import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch
} from '@stencil/core';

@Component({
  styleUrl: 'gux-search.less',
  tag: 'gux-search'
})
export class GuxSearch {
  @Element()
  root: HTMLStencilElement;

  /**
   * Indicate the input search value
   */
  @Prop({ mutable: true, reflectToAttr: true })
  value: string = '';

  /**
   * The input label.
   */
  @Prop()
  label: string;

  /**
   * The input label position (can be left or top) if not defined the position depends of the label width.
   */
  @Prop()
  labelPosition: 'left' | 'top';

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The input placeholder.
   */
  @Prop()
  placeholder: string;

  /**
   * Operate the search control using dynamic searching
   * as the input value is updated.  Searches debounced
   * to execute every searchTimeout.
   */
  @Prop()
  dynamicSearch: boolean = false;

  /**
   * Timeout between input and search.
   */
  @Prop()
  searchTimeout: number = 500;

  /**
   * Triggered when a search is requested.
   */
  @Event()
  search: EventEmitter;

  /**
   * Triggered when the user inputs data into the control.
   * @return The input value.
   */
  @Event()
  input: EventEmitter;

  @State()
  timeout: number;

  @Watch('value')
  watchValue() {
    if (!this.dynamicSearch) {
      return;
    }

    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this._emitSearch();
    }, this.searchTimeout);
  }

  render() {
    return (
      <div class={this.getClassList()}>
        {this.label && <label>{this.label}</label>}
        <div class="gux-search-input">
          <gux-text-field
            value={this.value}
            srLabel={this.label}
            disabled={this.disabled}
            placeholder={this.placeholder}
            onInput={e => this._onInput(e)}
            onKeyDown={e => this._onKeyDown(e)}
          />
          <div class="gux-search-icon">
            <i class="genesys-icon-search" />
          </div>
        </div>
      </div>
    );
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this._emitSearch();
    }
  }

  private _onInput(event: any) {
    this.value = event.target.value;
    this.input.emit(event);
  }

  private _emitSearch() {
    this.search.emit(this.value);
  }

  private getClassList(): string {
    let classList = [];
    if (['left', 'top'].includes(this.labelPosition)) {
      if (this.labelPosition === 'left') {
        classList = [...classList, 'flex'];
      }
    } else if (this.label && this.label.length < 10) {
      classList = [...classList, 'flex'];
    }

    if (this.disabled) {
      classList = [...classList, 'disabled'];
    }
    return classList.join(' ');
  }
}
