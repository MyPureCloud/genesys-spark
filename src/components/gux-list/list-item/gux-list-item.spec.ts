import { GuxListItem } from './gux-list-item';

describe('gux-list-item', () => {
  let component: GuxListItem;

  beforeEach(() => {
    component = new GuxListItem();
    component.action = {
      emit: jest.fn()
    };
  });

  it('builds', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });
});
