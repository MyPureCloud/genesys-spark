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
      spyOn(component, 'setPosition');
      component.resize();
      expect(component.setPosition).toHaveBeenCalled();
    });
  });
});