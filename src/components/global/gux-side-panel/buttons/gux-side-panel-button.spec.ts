import { GuxSidePanelButton } from './gux-side-panel-button';

describe('gux-side-panel-button', () => {
  it('builds', () => {
    const component = new GuxSidePanelButton();
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });

  it('should return the correct button class if it is selected', () => {
    const component = new GuxSidePanelButton();
    component.isSelected = true;

    expect(component.buttonClass).toEqual('selected');
  });

  it('should return the correct button class if it is not selected', () => {
    const component = new GuxSidePanelButton();
    component.isSelected = false;

    expect(component.buttonClass).toEqual('');
  });
});
