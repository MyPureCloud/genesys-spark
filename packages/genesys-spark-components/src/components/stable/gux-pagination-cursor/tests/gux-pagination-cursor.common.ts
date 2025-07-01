export const renderConfigs = [
  ...['simple', 'advanced'].map(layout => ({
    description: `Should render as expected for "${layout}" layout`,
    html: `
        <gux-pagination-cursor layout=${layout}
            label="Pagination for default example"
        ></gux-pagination-cursor>
    `
  })),
  {
    description: 'Should render as expected for has-previous',
    html: `
        <gux-pagination-cursor has-previous
            label="Pagination for default example"
        ></gux-pagination-cursor>
    `
  },
  {
    description: 'Should render as expected for has-next',
    html: `
        <gux-pagination-cursor has-next
            label="Pagination for default example"
        ></gux-pagination-cursor>
    `
  },
  {
    description: 'Should render as expected for has-previous and has-next',
    html: `
        <gux-pagination-cursor has-previous has-next
            label="Pagination for default example"
        ></gux-pagination-cursor>
    `
  },
  {
    description:
      'Should render as expected for has-previous and has-next and layout advanced',
    html: `
        <gux-pagination-cursor has-previous has-next layout="advanced"
            label="Pagination for default example"
        ></gux-pagination-cursor>
    `
  }
];
