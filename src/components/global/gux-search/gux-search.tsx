import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

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

  render() {
    return (
      <div>
        <div class="search-input">
          <gux-text-field
            value={this.value}
            disabled={this.disabled}
            placeholder={this.placeholder}
            onInput={e => this._onInput(e)}
            onKeyDown={e => this._onKeyDown(e)}
          />
          <div class="search-icon">
            <i class="genesys-icon-search" />
          </div>
        </div>
      </div>
    );
  }

  private _onInput(event: any) {
    this.input.emit(event);
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this._emitSearch();
    }
  }

  private _emitSearch() {
    this.search.emit(this.value);
  }
}
