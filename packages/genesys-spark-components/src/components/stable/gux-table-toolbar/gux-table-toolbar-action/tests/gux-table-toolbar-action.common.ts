export const renderConfigs = [
  {
    description: 'should render delete toolbar-action',
    html: '<gux-table-toolbar-action action="delete"></gux-table-toolbar-action>'
  },
  {
    description: 'should render export toolbar-action',
    html: '<gux-table-toolbar-action action="export"></gux-table-toolbar-action>'
  },
  {
    description: 'should render refresh toolbar-action',
    html: '<gux-table-toolbar-action action="refresh"></gux-table-toolbar-action>'
  },
  {
    description: 'should render revert toolbar-action',
    html: '<gux-table-toolbar-action action="revert"></gux-table-toolbar-action>'
  },
  {
    description: 'should render import toolbar-action',
    html: '<gux-table-toolbar-action action="import"></gux-table-toolbar-action>'
  },
  {
    description: 'should render a primary toolbar-action',
    html: '<gux-table-toolbar-action slot="primary-action" accent="primary" action="export"></gux-table-toolbar-action>'
  },
  {
    description: 'should render a disabled toolbar-action',
    html: '<gux-table-toolbar-action disabled action="export"></gux-table-toolbar-action>'
  }
];
