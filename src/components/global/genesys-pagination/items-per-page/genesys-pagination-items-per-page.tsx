import { Component, Event, EventEmitter, Method, State } from '@stencil/core';

@Component({
  styleUrl: 'genesys-pagination-items-per-page.less',
  tag: 'genesys-pagination-items-per-page'
})
export class GenesysPaginationItemsPerPage {
  @State()
  itemsPerPage: number = 25;
  @State()
  itemsPerPageOptions: number[] = [25, 50, 100];

  @Event()
  itemsPerPageChanged: EventEmitter<number>;

  private select: HTMLSelectElement;

  @Method()
  setItemsPerPage(value: number, options: number[]): void {
    this.itemsPerPageOptions = options;
    this.itemsPerPage = value;
  }

  render() {
    return (
      <div class="pagination-item-counts">
        <select
          class="pagination-items-per-page"
          ref={select => (this.select = select)}
          onChange={() =>
            this.itemsPerPageChanged.emit(parseInt(this.select.value, 10))
          }
        >
          {(this.itemsPerPageOptions || []).map(opt => (
            <option selected={opt === this.itemsPerPage}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
}
