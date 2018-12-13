import { GenesysDisclosureButton } from '../genesys-disclosure-button';

describe('genesys-disclosure-button', () => {
  it('builds', () => {
    expect(new GenesysDisclosureButton()).toBeTruthy();
  });

  it('should toggle the isPanelActive property', async () => {
    const disclosureButton = new GenesysDisclosureButton();

    expect(disclosureButton.isPanelActive).toBe(false);
    disclosureButton.togglePanel();
    expect(disclosureButton.isPanelActive).toBe(true);
  });
});
