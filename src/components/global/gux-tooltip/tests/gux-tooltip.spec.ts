import * as Utils from '../../../../common-utils';
import { GuxTooltip } from '../gux-tooltip';

describe('gux-tooltip', () => {
  let component;
  beforeEach(async () => {
    component = new GuxTooltip();
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
