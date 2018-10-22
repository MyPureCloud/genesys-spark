import { GenesysPagination } from './genesys-pagination';

describe('genesys-pagination', () => {
  let component: GenesysPagination;

  beforeEach(() => {
    component = new GenesysPagination();
  });

  it('builds', () => {
    expect(component).toBeTruthy();
  });
});
