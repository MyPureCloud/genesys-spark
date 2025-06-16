export const renderConfigs = [
  ...['single', 'range'].map(calendarMode => ({
    description: `should render as expected for "${calendarMode}" calendar`,
    html: `<gux-calendar mode="${calendarMode}" number-of-months="2" value="2019-11-25/2019-12-02">`
  })),
  {
    description: 'should render as expected',
    html: `<gux-calendar value="2019-11-25/2019-12-02">`
  },
  {
    description: 'should render as expected for numberOfMonths',
    html: `<gux-calendar number-of-months="3" value="2019-11-25/2019-12-02">`
  },
  {
    description: 'should render as expected for startDayOfWeek',
    html: `<gux-calendar start-day-of-week="2" value="2019-11-25/2019-12-02">`
  }
];
