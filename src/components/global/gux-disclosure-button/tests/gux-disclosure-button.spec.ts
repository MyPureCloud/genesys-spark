import { GuxDisclosureButton } from '../gux-disclosure-button';

describe('gux-disclosure-button', () => {
  it('builds', () => {
    expect(new GuxDisclosureButton()).toBeTruthy();
  });

  it('should toggle the isPanelActive property', async () => {
    const disclosureButton = new GuxDisclosureButton();

    expect(disclosureButton.isPanelActive).toBe(false);
    disclosureButton.togglePanel();
    expect(disclosureButton.isPanelActive).toBe(true);
  });
});
