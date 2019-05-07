import { GuxDatepicker } from '../gux-datepicker';

describe('gux-datepicker', () => {
  let component: GuxDatepicker;
  beforeEach(async () => {
    component = new GuxDatepicker();
    component.textFieldElement = {
      querySelector() {
        return null;
      }
    } as any;
    component.change = {
      emit: jest.fn()
    };
    component.root = {
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      }
    } as any;
  });
  it('builds', () => {
    component.componentWillLoad();
    component.componentDidLoad();
    component.render();
    expect(component).toBeTruthy();
  });
});
