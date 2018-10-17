import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'genesys-pagination',
  styleUrl: 'genesys-pagination.scss'
})
export class GenesysPagination {
  @Prop()
  currentPage: number;

  @Prop()
  totalPages: number;

  nextPage(): void {
    this.currentPage++;
  }

  render() {
    return <div>Hello, World!</div>;
  }
}
