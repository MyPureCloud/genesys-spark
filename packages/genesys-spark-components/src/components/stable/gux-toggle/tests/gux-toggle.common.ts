const currentRenderConfigs = [
  {
    description: 'should render basic toggle',
    html: '<gux-toggle></gux-toggle>'
  },
  {
    description: 'should render checked toggle',
    html: '<gux-toggle checked></gux-toggle>'
  },
  {
    description: 'should render disabled toggle',
    html: '<gux-toggle disabled></gux-toggle>'
  },
  {
    description: 'should render checked disabled toggle',
    html: '<gux-toggle checked disabled></gux-toggle>'
  },
  {
    description: 'should render loading toggle',
    html: '<gux-toggle loading></gux-toggle>'
  },
  {
    description: 'should render checked loading toggle',
    html: '<gux-toggle checked loading></gux-toggle>'
  },
  {
    description: 'should render toggle with label',
    html: '<gux-toggle label="On"></gux-toggle>'
  },
  {
    description: 'should render checked toggle with label',
    html: '<gux-toggle checked label="on"></gux-toggle>'
  },
  {
    description: 'should render toggle with error message',
    html: '<gux-toggle label="On" error-message="This field is required"></gux-toggle>'
  },
  {
    description: 'should render checked toggle with error message',
    html: '<gux-toggle checked label="On" error-message="Invalid selection"></gux-toggle>'
  },
  {
    description: 'should render inline toggle',
    html: '<gux-toggle display-inline></gux-toggle>'
  },
  {
    description: 'should render inline toggle with label',
    html: '<gux-toggle display-inline label="On"></gux-toggle>'
  },
  {
    description: 'should render toggle with left-positioned label',
    html: `<gux-toggle
    label="On"
    label-position="left"
  ></gux-toggle>`
  },
  {
    description: 'should render checked toggle with right-positioned label',
    html: `<gux-toggle
    checked
    label="on"
    label-position="right"
  ></gux-toggle>`
  },
  {
    description: 'should render toggle with long left-positioned label',
    html: `<gux-toggle
    label="This is a long label for the toggle to test how it works"
    label-position="left"
  ></gux-toggle>`
  },
  {
    description:
      'should render checked toggle with long right-positioned label',
    html: `<gux-toggle
    checked
    label="This is a long label for the toggle to test how it works"
    label-position="right"
  ></gux-toggle>`
  },

  {
    description: 'should render disabled toggle with label and error',
    html: '<gux-toggle disabled label="On" error-message="Cannot be changed"></gux-toggle>'
  },
  {
    description: 'should render loading toggle with label',
    html: '<gux-toggle loading label="Processing"></gux-toggle>'
  },
  {
    description: 'should render toggle inside heading element',
    html: '<h1><gux-toggle label="On"></gux-toggle></h1>'
  }
];

// remove deprecated props COMUI-3368
const deprecatedRenderConfigs = [
  {
    description:
      'should render toggle with deprecated checked/unchecked labels',
    html: '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>'
  },
  {
    description: 'should render checked toggle with deprecated labels',
    html: '<gux-toggle checked checked-label="on" unchecked-label="off"></gux-toggle>'
  },
  {
    description:
      'should render toggle with deprecated labels and left position',
    html: `<gux-toggle
    checked-label="On"
    unchecked-label="Off"
    label-position="left"
  ></gux-toggle>`
  },
  {
    description:
      'should render checked toggle with deprecated labels and right position',
    html: `<gux-toggle
    checked
    checked-label="on"
    unchecked-label="off"
    label-position="right"
  ></gux-toggle>`
  },
  {
    description:
      'should render toggle with long deprecated labels and left position',
    html: `<gux-toggle
    checked-label="This is a long label for the toggle to test how it works"
    unchecked-label="This is another long label for the toggle to test how it works"
    label-position="left"
  ></gux-toggle>`
  },
  {
    description:
      'should render checked toggle with long deprecated labels and right position',
    html: `<gux-toggle
    checked
    checked-label="This is a long label for the toggle to test how it works"
    unchecked-label="This is another long label for the toggle to test how it works"
    label-position="right"
  ></gux-toggle>`
  }
];

const regressTestRenderConfigs = [
  {
    description: 'COMUI-3436: TargetSize Violation for toggles in tables',
    html: `
    <gux-table compact>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="first-name">First name</th>
            <th data-column-name="last-name">Last name</th>
            <th data-column-name="toggle">Toggle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td><gux-toggle></gux-toggle></td>
          </tr>
        </tbody>
      </table>
    </gux-table>`
  }
];

export const renderConfigs = [
  ...currentRenderConfigs,
  ...deprecatedRenderConfigs,
  ...regressTestRenderConfigs
];
