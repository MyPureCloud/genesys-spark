import * as Utils from '../../../../common-utils';
import { GenesysTooltip } from '../genesys-tooltip';

describe('genesys-tooltip', () => {
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
