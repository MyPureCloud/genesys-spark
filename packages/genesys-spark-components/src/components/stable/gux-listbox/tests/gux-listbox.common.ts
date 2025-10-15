export const basicRenderConfig = {
  description: 'should render basic gux-listbox',
  html: `<gux-listbox id="listbox" aria-label="Listbox">
    <gux-option value="option1">Option 1</gux-option>
    <gux-option value="option2">Option 2</gux-option>
    <gux-option value="option3">Option 3</gux-option>
  </gux-listbox>`
};

export const withIconsRenderConfig = {
  description: 'should render gux-listbox with icon options',
  html: `<gux-listbox id="listbox-icons" aria-label="Listbox">
    <gux-option-icon icon-name="user" value="user1">User 1</gux-option-icon>
    <gux-option-icon icon-name="user" value="user2">User 2</gux-option-icon>
    <gux-option-icon icon-name="user" value="user3">User 3</gux-option-icon>
  </gux-listbox>`
};

export const withSubtextRenderConfig = {
  description: 'should render gux-listbox with subtext options',
  html: `<gux-listbox id="listbox-subtext" aria-label="Listbox">
    <gux-option value="option1">
      Primary Text 1
      <span slot="subtext">Subtext 1</span>
    </gux-option>
    <gux-option-icon icon-name="user" value="option2">
      Primary Text 2
      <span slot="subtext">Subtext 2</span>
    </gux-option-icon>
  </gux-listbox>`
};

export const withGroupsRenderConfig = {
  description: 'should render gux-listbox with option groups',
  html: `<gux-listbox id="listbox-groups" aria-label="Listbox">
    <gux-option-group label="Group 1">
      <gux-option value="g1-option1">Group 1 Option 1</gux-option>
      <gux-option value="g1-option2">Group 1 Option 2</gux-option>
    </gux-option-group>
    <gux-option-group label="Group 2">
      <gux-option-icon icon-name="user" value="g2-option1">Group 2 Option 1</gux-option-icon>
      <gux-option-icon icon-name="user" value="g2-option2">Group 2 Option 2</gux-option-icon>
    </gux-option-group>
  </gux-listbox>`
};

export const loadingRenderConfig = {
  description: 'should render gux-listbox in loading state',
  html: `<gux-listbox id="listbox-loading" loading="true" aria-label="Listbox">
    <gux-option value="option1">Option 1</gux-option>
    <gux-option value="option2">Option 2</gux-option>
  </gux-listbox>`
};

export const disabledRenderConfig = {
  description: 'should render gux-listbox in disabled state',
  html: `<gux-listbox id="listbox-disabled" disabled="true" aria-label="Listbox">
    <gux-option value="option1">Option 1</gux-option>
    <gux-option value="option2">Option 2</gux-option>
  </gux-listbox>`
};

export const selectedValueRenderConfig = {
  description: 'should render gux-listbox with selected value',
  html: `<gux-listbox id="listbox-selected" value="option2" aria-label="Listbox">
    <gux-option value="option1">Option 1</gux-option>
    <gux-option value="option2">Option 2</gux-option>
    <gux-option value="option3">Option 3</gux-option>
  </gux-listbox>`
};

export const emptyMessageRenderConfig = {
  description:
    'should render gux-listbox with empty message when all options filtered',
  html: `<gux-listbox id="listbox-empty" filter="xyz" filter-type="starts-with" empty-message="No matches found" aria-label="Listbox">
    <gux-option value="option1">Option 1</gux-option>
    <gux-option value="option2">Option 2</gux-option>
  </gux-listbox>`
};

export const renderConfigs = [
  basicRenderConfig,
  withIconsRenderConfig,
  withSubtextRenderConfig,
  withGroupsRenderConfig,
  loadingRenderConfig,
  disabledRenderConfig,
  selectedValueRenderConfig,
  emptyMessageRenderConfig
];
