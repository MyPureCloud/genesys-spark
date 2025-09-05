const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].flatMap(
  labelPosition => [
    {
      description: `should render component as expected when label-position is ${labelPosition}`,
      html: `
        <gux-form-field-file-beta label-position="${labelPosition}">
          <label slot="label">Upload a profile picture</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            slot="input"
          />
        </gux-form-field-file-beta>
    `
    },
    {
      description: `should render component as expected when label-position is ${labelPosition} and drop-and-drag is enabled`,
      html: `
        <gux-form-field-file-beta drag-and-drop label-position="${labelPosition}">
          <label slot="label">Upload a profile picture</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            slot="input"
          />
        </gux-form-field-file-beta>
    `
    }
  ]
);

const inputAttributeRenderConfigs = [
  'disabled',
  'required',
  'multiple'
].flatMap(inputAttribute => [
  {
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
        <gux-form-field-file-beta>
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            ${inputAttribute}
          />
        </gux-form-field-file-beta>
    `
  },
  {
    description: `should render component as expected when input attribute is "${inputAttribute}" and drop-and-drag is enabled`,
    html: `
        <gux-form-field-file-beta drag-and-drop>
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            ${inputAttribute}
          />
        </gux-form-field-file-beta>
    `
  }
]);

const indicatorMarkRenderConfigs = ['optional', 'required'].flatMap(
  indicatorMark => [
    {
      description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
      html: `
        <gux-form-field-file-beta indicator-mark="${indicatorMark}">
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        </gux-form-field-file-beta>
    `
    },
    {
      description: `should render component as expected when indicator-mark is "${indicatorMark}" and drop-and-drag is enabled`,
      html: `
        <gux-form-field-file-beta drag-and-drop indicator-mark="${indicatorMark}">
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        </gux-form-field-file-beta>
    `
    }
  ]
);

const optionalSlotRenderConfigs = [
  { name: 'help', html: `<span slot="help">This is a help message</span>` },
  { name: 'error', html: `<span slot="error">This is an error message</span>` },
  {
    name: 'label-info',
    html: `<gux-label-info-beta slot="label-info">
      <span slot="content">This is some tooltip text</span>
    </gux-label-info-beta>`
  }
].flatMap(({ name, html }) => [
  {
    description: `should render component as expected when an optional "${name}" slot is provided`,
    html: `
      <gux-form-field-file-beta>
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        ${html}
      </gux-form-field-file-beta>
    `
  },
  {
    description: `should render component as expected when an optional "${name}" slot is provided and drop-and-drag is enabled`,
    html: `
      <gux-form-field-file-beta drag-and-drop>
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        ${html}
      </gux-form-field-file-beta>
    `
  }
]);

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
