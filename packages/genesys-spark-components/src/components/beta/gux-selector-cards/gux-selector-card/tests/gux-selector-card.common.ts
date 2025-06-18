export const renderConfigs = [
  ...['simple', 'descriptive'].map(variant => ({
    description: `Should render as expected for "${variant}" variant`,
    html: `
    <gux-selector-card-beta variant="${variant}">
      <label slot="label">Card label</label>
      <input slot="input" type="checkbox" name="food-1[]" value="pizza" />
      <span slot="description"
        >A label for a sample selector card. Used in Spark WCL.</span
      >
      <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
    </gux-selector-card-beta>
    `
  }))
];
