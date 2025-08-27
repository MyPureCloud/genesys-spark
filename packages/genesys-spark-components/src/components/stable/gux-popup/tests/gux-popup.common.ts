function getGuxPopupHtml(expanded: boolean, disabled: boolean): string {
  return `
  <gux-popup ${expanded ? 'expanded' : ''} ${disabled ? 'disabled' : ''}>
    <gux-button slot="target">Target</gux-button>
    <gux-list slot="popup">
      <gux-list-item>Item 1</gux-list-item>
      <gux-list-item>Item 2</gux-list-item>
      <gux-list-item>Item 3</gux-list-item>
    </gux-list>
  </gux-popup>
`;
}

export const renderConfigs = [
  { expanded: false, disabled: false },
  { expanded: true, disabled: false },
  { expanded: false, disabled: true },
  { expanded: true, disabled: true }
].map(({ expanded, disabled }, index) => {
  return {
    description: `should display component as expected (${index + 1})`,
    html: getGuxPopupHtml(expanded, disabled)
  };
});
