import { GenesysTooltip } from '../genesys-tooltip';
import * as Utils from '../../../../common-utils';

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
      component.resize();
      expect(Utils.getPositionRelativeToTarget).toHaveBeenCalled();
    });
  });
});
