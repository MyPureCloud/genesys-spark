import { GuxDisclosureButton } from '../gux-disclosure-button';

describe('gux-disclosure-button', () => {
  it('builds', () => {
    expect(new GuxDisclosureButton()).toBeTruthy();
  });

  it('should toggle the isOpen property', async () => {
    const disclosureButton = new GuxDisclosureButton();

    expect(disclosureButton.isOpen).toBe(false);
    disclosureButton.togglePanel();
    expect(disclosureButton.isOpen).toBe(true);
  });
});
