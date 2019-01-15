import { GenesysTooltip } from '../gux-tooltip';
import * as Utils from '../../../../common-utils';

describe('gux-tooltip', () => {
  let component;
  beforeEach(async () => {
    component = new GenesysTooltip();
  });
  it('builds', () => {
    expect(component).toBeTruthy();
  });

  describe('methods', () => {
    it('resize', () => {
      spyOn(Utils, 'getPositionRelativeToTarget');
      component.onWindowEvent();
      expect(Utils.getPositionRelativeToTarget).toHaveBeenCalled();
    });
  });
});
