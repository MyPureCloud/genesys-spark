import { GuxColorSelect } from '../gux-color-select';

describe('gux-color-select', () => {
  it('builds', () => {
    expect(new GuxColorSelect()).toBeTruthy();
  });

  describe('render tiles', () => {
    it('returns the number tiles from default tiles', () => {
      const component = new GuxColorSelect();
      expect(component.renderDefaultTiles().length).toEqual(10);
    });

    it('returns number of tiles for custom and blank', () => {
      const component = new GuxColorSelect();
      expect(component.renderBlankTiles().length).toEqual(10);
      component.customColors = ['#000', '#fff'];
      expect(component.renderCustomTiles().length).toEqual(2);
      expect(component.renderBlankTiles().length).toEqual(8);
    });
  });
});