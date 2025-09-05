import { GuxFilterTypes } from '../gux-dropdown.types';

type FilterType = GuxFilterTypes;

const optionTypes = ['gux-option', 'gux-option-icon'] as const;

const listboxContent = {
  'gux-option': `
    <gux-option value="a">Ant</gux-option>
    <gux-option value="b">Bear Large<span slot="subtext">Large</span></gux-option>
    <gux-option value="be">Bee Small<span slot="subtext">Small</span></gux-option>
    <gux-option value="c">Cat</gux-option>
    <gux-option value="">None</gux-option>
  `,
  'gux-option-icon': `
    <gux-option-icon icon-name="user" value="a">Ant</gux-option-icon>
    <gux-option-icon icon-name="user" value="b">Bear Large<span slot="subtext">Large</span></gux-option-icon>
    <gux-option-icon icon-name="user" value="be"><span slot="subtext">Small</span>Bee Small</gux-option-icon>
    <gux-option-icon icon-name="user" value="c">Cat</gux-option-icon>
    <gux-option-icon icon-name="user" value="">None</gux-option-icon>
  `
};

const groupedListboxContent = {
  'gux-option': `
    <gux-option-group-beta label="Group 1">
      <gux-option value="a">Ant</gux-option>
      <gux-option value="b">Bear Large<span slot="subtext">Large</span></gux-option>
    </gux-option-group-beta>
    <gux-option-group-beta label="Group 2">
      <gux-option value="be">Bee Small<span slot="subtext">Small</span></gux-option>
      <gux-option value="c">Cat</gux-option>
      <gux-option value="">None</gux-option>
    </gux-option-group-beta>
  `,
  'gux-option-icon': `
    <gux-option-group-beta label="Group 1">
      <gux-option-icon icon-name="user" value="a">Ant</gux-option-icon>
      <gux-option-icon icon-name="user" value="b">Bear Large<span slot="subtext">Large</span></gux-option-icon>
    </gux-option-group-beta>
    <gux-option-group-beta label="Group 2">
      <gux-option-icon icon-name="user" value="be"><span slot="subtext">Small</span>Bee Small</gux-option-icon>
      <gux-option-icon icon-name="user" value="c">Cat</gux-option-icon>
      <gux-option-icon icon-name="user" value="">None</gux-option-icon>
    </gux-option-group-beta>
  `
};

function createDropdownHTML(
  filterType: FilterType,
  disabled: boolean,
  error: boolean,
  content: string
) {
  const filterTypeString = filterType ? `filter-type="${filterType}"` : '';
  const errorString = error ? 'has-error' : '';

  return `
    <gux-dropdown ${filterTypeString} lang="en" value="j" ${disabled ? 'disabled' : ''} ${errorString}>
      <gux-listbox aria-label="Favorite Animal">
        ${content}
      </gux-listbox>
    </gux-dropdown>
  `;
}

export const groupedRenderConfigs = [
  {
    description: 'should render gux-option dropdown with grouped options',
    html: createDropdownHTML(null, false, false, groupedListboxContent[0])
  },
  {
    description: 'should render gux-option-icon dropdown with grouped options',
    html: createDropdownHTML(null, false, false, groupedListboxContent[1])
  }
];

const filterRenderConfigs = [
  {
    description: `should render dropdown with no filter`,
    html: createDropdownHTML(null, false, false, listboxContent[0])
  },
  {
    description: `should render dropdown with starts-with filter`,
    html: createDropdownHTML('starts-with', false, false, listboxContent[0])
  },
  {
    description: `should render dropdown with custom filter`,
    html: createDropdownHTML('custom', false, false, listboxContent[0])
  }
];

export const closedRenderConfigs = [
  {
    description: 'should render enabled dropdown',
    html: createDropdownHTML(null, false, false, listboxContent[0])
  },
  {
    description: 'should render disabled dropdown',
    html: createDropdownHTML(null, true, false, listboxContent[0])
  },
  {
    description: 'should render dropdown with error state',
    html: createDropdownHTML(null, false, true, listboxContent[0])
  },
  ...filterRenderConfigs
];

export const openRenderConfigs = [
  ...groupedRenderConfigs,
  {
    description: 'should render open dropdown',
    html: createDropdownHTML(null, false, false, listboxContent[0])
  }
];

export const testData = {
  optionTypes,
  listboxContent,
  groupedListboxContent
};
