import { GenesysPaginationButtons } from './genesys-pagination-buttons';

describe('genesys-pagination-buttons', () => {
  it('builds', () => {
    const component = new GenesysPaginationButtons();
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });
});
