export const renderConfigs = [
  {
    description: 'should render default control no props',
    html: '<gux-content-search><input aria-label="Search" type="text"/></gux-content-search>'
  },
  {
    description: 'should render default control no props With placeholder',
    html: '<gux-content-search><input type="text" placeholder="Search"/></gux-content-search>'
  },
  {
    description: 'should render default control with all props',
    html: `<gux-content-search current-match="1"match-count="10">
          <input type="text" placeholder="Search" value="Default Search Text"/>
        </gux-content-search>`
  },
  {
    description: 'should render default control with all props with no match',
    html: `<gux-content-search current-match="0" match-count="0">
          <input type="text" placeholder="Search" value="Default Search Text"/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with long text no match',
    html: `<gux-content-search current-match="0" match-count="0">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
         </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with long text 1 match',
    html: `<gux-content-search current-match="1" match-count="1">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with short text 100000 match',
    html: `<gux-content-search current-match="1000" match-count="100000">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor "/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with long text 100000 match',
    html: `<gux-content-search current-match="1000" match-count="100000">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with invalid  match count',
    html: `<gux-content-search current-match="1000" match-count="abc">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props with invalid current match',
    html: `<gux-content-search current-match="100000" match-count="100">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  },
  {
    description: 'should render default control with all props in disable mode',
    html: `<gux-content-search current-match="10" match-count="10">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled"/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props in disable mode with no match',
    html: `<gux-content-search current-match="0" match-count="0">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with no Match"/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props in disable mode with 1 match',
    html: `<gux-content-search current-match="1" match-count="1">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with 1 match"/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props in disable mode with 100000000 match',
    html: `<gux-content-search current-match="10000" match-count="100000000">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with big match"/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props in disable mode with long value',
    html: `<gux-content-search current-match="1" match-count="1">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  },
  {
    description:
      'should render default control with all props in disable mode with long value with 100000000 match',
    html: `<gux-content-search current-match="1100" match-count="100000001">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-content-search>`
  }
];
