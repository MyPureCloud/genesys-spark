import { GenesysPaginationItemCounts } from './genesys-pagination-item-counts';

describe('genesys-pagination-item-counts', () => {
  let component: GenesysPaginationItemCounts;

  beforeEach(() => (component = new GenesysPaginationItemCounts()));

  it('builds', () => {
    expect(component).toBeTruthy();
  });
});
