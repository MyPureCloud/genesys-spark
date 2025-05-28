export const renderConfigs = [
  {
    description: 'should have default politeness',
    html: '<gux-announce-beta> This is some text to read </gux-announce-beta>'
  },
  {
    description: 'should have assertive politeness',
    html: '<gux-announce-beta politeness="assertive"> This is some text to read </gux-announce-beta>'
  },
  {
    description: 'should have off politeness',
    html: '<gux-announce-beta politeness="off"> This is some text to read </gux-announce-beta>'
  },
  {
    description: 'should have polite politeness',
    html: '<gux-announce-beta politeness="polite"> This is some text to read </gux-announce-beta>'
  }
];
