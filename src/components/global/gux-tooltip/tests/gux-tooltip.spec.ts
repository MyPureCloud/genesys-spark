import { GuxTooltip } from '../gux-tooltip';
import * as Utils from '../../../../common-utils';

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
