const singleSelectDropdownConfigs = [
  {
    description: 'should render single select dropdown as expected',
    html: `
      <gux-form-field-dropdown>
        <gux-dropdown>
          <gux-listbox>
            <gux-option value="a" disabled>Ant</gux-option>
            <gux-option value="b">Bat</gux-option>
            <gux-option value="c">Cat</gux-option>
          </gux-listbox>
        </gux-dropdown>
        <label slot="label">Label</label>
      </gux-form-field-dropdown>
    `
  }
];

const multiSelectDropdownConfigs = [
  {
    description: 'should render multi select dropdown as expected',
    html: `
      <gux-form-field-dropdown>
        <gux-dropdown-multi>
          <gux-listbox-multi>
            <gux-option-multi value="a" disabled>Ant</gux-option-multi>
            <gux-option-multi value="b">Bat</gux-option-multi>
            <gux-option-multi value="c">Cat</gux-option-multi>
          </gux-listbox-multi>
        </gux-dropdown-multi>
        <label slot="label">Label</label>
      </gux-form-field-dropdown>
    `
  }
];

const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].flatMap(
  labelPosition => [
    {
      description: `should render single select dropdown as expected when label-position is ${labelPosition}`,
      html: `
        <gux-form-field-dropdown label-position="${labelPosition}">
          <gux-dropdown>
            <gux-listbox>
              <gux-option value="a" disabled>Ant</gux-option>
              <gux-option value="b">Bat</gux-option>
              <gux-option value="c">Cat</gux-option>
            </gux-listbox>
          </gux-dropdown>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
      `
    },
    {
      description: `should render multi select dropdown as expected when label-position is ${labelPosition}`,
      html: `
        <gux-form-field-dropdown label-position="${labelPosition}">
          <gux-dropdown-multi>
            <gux-listbox-multi>
              <gux-option-multi value="a" disabled>Ant</gux-option-multi>
              <gux-option-multi value="b">Bat</gux-option-multi>
              <gux-option-multi value="c">Cat</gux-option-multi>
            </gux-listbox-multi>
          </gux-dropdown-multi>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
      `
    }
  ]
);

const inputAttributeRenderConfigs = ['disabled', 'required'].flatMap(
  inputAttribute => [
    {
      description: `should render single select dropdown as expected when input attribute is "${inputAttribute}"`,
      html: `
        <gux-form-field-dropdown>
          <gux-dropdown ${inputAttribute}>
            <gux-listbox>
              <gux-option value="a" disabled>Ant</gux-option>
              <gux-option value="b">Bat</gux-option>
              <gux-option value="c">Cat</gux-option>
            </gux-listbox>
          </gux-dropdown>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
      `
    },
    {
      description: `should render multi select dropdown as expected when input attribute is "${inputAttribute}"`,
      html: `
        <gux-form-field-dropdown>
          <gux-dropdown-multi ${inputAttribute}>
            <gux-listbox-multi>
              <gux-option-multi value="a" disabled>Ant</gux-option-multi>
              <gux-option-multi value="b">Bat</gux-option-multi>
              <gux-option-multi value="c">Cat</gux-option-multi>
            </gux-listbox-multi>
          </gux-dropdown-multi>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
      `
    }
  ]
);

const indicatorMarkRenderConfigs = ['optional', 'required'].flatMap(
  indicatorMark => [
    {
      description: `should render single select dropdown as expected when indicator-mark is "${indicatorMark}"`,
      html: `
        <gux-form-field-dropdown indicator-mark="${indicatorMark}">
          <gux-dropdown>
            <gux-listbox>
              <gux-option value="a" disabled>Ant</gux-option>
              <gux-option value="b">Bat</gux-option>
              <gux-option value="c">Cat</gux-option>
            </gux-listbox>
          </gux-dropdown>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
      `
    },
    {
      description: `should render multi select dropdown as expected when indicator-mark is "${indicatorMark}"`,
      html: `
        <gux-form-field-dropdown indicator-mark="${indicatorMark}">
          <gux-dropdown-multi>
            <gux-listbox-multi>
              <gux-option-multi value="a" disabled>Ant</gux-option-multi>
              <gux-option-multi value="b">Bat</gux-option-multi>
              <gux-option-multi value="c">Cat</gux-option-multi>
            </gux-listbox-multi>
          </gux-dropdown-multi>
          <label slot="label">Label</label>
        </gux-form-field-dropdown>
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
    description: `should render single select dropdown as expected when an optional "${name}" slot is provided`,
    html: `
      <gux-form-field-dropdown>
        <gux-dropdown>
          <gux-listbox>
            <gux-option value="a" disabled>Ant</gux-option>
            <gux-option value="b">Bat</gux-option>
            <gux-option value="c">Cat</gux-option>
          </gux-listbox>
        </gux-dropdown>
        <label slot="label">Label</label>
        ${html}
      </gux-form-field-dropdown>
    `
  },
  {
    description: `should render multi select dropdown as expected when an optional "${name}" slot is provided`,
    html: `
      <gux-form-field-dropdown>
        <gux-dropdown-multi>
          <gux-listbox-multi>
            <gux-option-multi value="a" disabled>Ant</gux-option-multi>
            <gux-option-multi value="b">Bat</gux-option-multi>
            <gux-option-multi value="c">Cat</gux-option-multi>
          </gux-listbox-multi>
        </gux-dropdown-multi>
        <label slot="label">Label</label>
        ${html}
      </gux-form-field-dropdown>
    `
  }
]);

export const renderConfigs = [
  ...singleSelectDropdownConfigs,
  ...multiSelectDropdownConfigs,
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
