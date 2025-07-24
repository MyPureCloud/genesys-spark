export const renderConfigs = [
  {
    description: 'should render as gux-radial-progress as expected',
    html: '<gux-radial-progress screenreader-text="Uploading file" ></gux-radial-progress>'
  },
  {
    description: 'should render with value 25',
    html: '<gux-radial-progress screenreader-text="Uploading file" value="25"></gux-radial-progress>'
  },
  {
    description: 'should render with value 50',
    html: '<gux-radial-progress screenreader-text="Uploading file" value="50"></gux-radial-progress>'
  },
  {
    description: 'should render with value 75',
    html: '<gux-radial-progress screenreader-text="Uploading file" value="75"></gux-radial-progress>'
  },
  {
    description: 'should render with value 100',
    html: '<gux-radial-progress screenreader-text="Uploading file" value="100"></gux-radial-progress>'
  },
  {
    description: 'should render with max 50 and value 25',
    html: '<gux-radial-progress screenreader-text="Uploading file" max="50" value="25"></gux-radial-progress>'
  },
  {
    description: 'should render with max 200 and value 150',
    html: '<gux-radial-progress screenreader-text="Uploading file" max="200" value="150"></gux-radial-progress>'
  }
];
