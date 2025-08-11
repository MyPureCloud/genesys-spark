export const renderConfigs = [
  {
    description: 'Should render basic pagination',
    html: '<gux-pagination total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render simple layout',
    html: '<gux-pagination layout="simple" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render advanced layout',
    html: '<gux-pagination layout="advanced" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render disabled pagination',
    html: '<gux-pagination disabled total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with current page set',
    html: '<gux-pagination current-page="3" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with 25 items per page',
    html: '<gux-pagination items-per-page="25" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with 50 items per page',
    html: '<gux-pagination items-per-page="50" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with 75 items per page',
    html: '<gux-pagination items-per-page="75" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with 100 items per page',
    html: '<gux-pagination items-per-page="100" total-items="100"></gux-pagination>'
  },
  {
    description: 'Should render with small dataset',
    html: '<gux-pagination total-items="10"></gux-pagination>'
  },
  {
    description: 'Should render with large dataset',
    html: '<gux-pagination total-items="1000" current-page="15"></gux-pagination>'
  },
  {
    description: 'Should render with single page',
    html: '<gux-pagination total-items="20" items-per-page="25"></gux-pagination>'
  },
  {
    description: 'Should render with zero items',
    html: '<gux-pagination total-items="0"></gux-pagination>'
  },
  {
    description:
      'Should render advanced layout with current page and custom items per page',
    html: '<gux-pagination layout="advanced" current-page="5" items-per-page="50" total-items="500"></gux-pagination>'
  },
  {
    description: 'Should render simple layout with disabled state',
    html: '<gux-pagination layout="simple" disabled current-page="2" total-items="150"></gux-pagination>'
  },
  {
    description: 'Should render with maximum pages scenario',
    html: '<gux-pagination current-page="40" items-per-page="25" total-items="1000"></gux-pagination>'
  }
];
