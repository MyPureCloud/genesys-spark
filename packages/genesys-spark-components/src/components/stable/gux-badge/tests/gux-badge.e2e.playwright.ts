import { checkRenders, test } from '@test/playwrightTestUtils';

test.describe('gux-badge', () => {
  checkRenders({
    renderConfigs: [
      { html: '<gux-badge>Badge</gux-badge>' },
      { html: '<gux-badge accent="info">Badge</gux-badge>' },
      { html: '<gux-badge accent="success">Badge</gux-badge>' },
      { html: '<gux-badge accent="warning">Badge</gux-badge>' },
      { html: '<gux-badge accent="error">Badge</gux-badge>' },
      { html: '<gux-badge accent="inherit">Badge</gux-badge>' },
      { html: '<gux-badge bold>Badge</gux-badge>' },
      { html: '<gux-badge bold accent="info">Badge</gux-badge>' },
      { html: '<gux-badge bold accent="success">Badge</gux-badge>' },
      { html: '<gux-badge bold accent="warning">Badge</gux-badge>' },
      { html: '<gux-badge bold accent="error">Badge</gux-badge>' },
      { html: '<gux-badge bold accent="inherit">Badge</gux-badge>' },
      {
        html: '<gux-badge><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
      },
      {
        html: '<gux-badge bold accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>>'
      }
    ],
    element: 'gux-badge'
  });
});
