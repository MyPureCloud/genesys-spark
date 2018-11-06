import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-pagination-items-per-page.less',
  tag: 'genesys-pagination-items-per-page'
})
export class GenesysPaginationItemsPerPage {
  @Prop()
  itemsPerPage: number = 25;

  @Prop()
  itemsPerPageOptions: number[] = [25, 50, 100];

  @Event()
  itemsPerPageChanged: EventEmitter<number>;

  private select: HTMLSelectElement;

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
