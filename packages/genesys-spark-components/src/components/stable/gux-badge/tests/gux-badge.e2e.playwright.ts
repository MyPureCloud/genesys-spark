import { analyze, setContent, test } from '@test/playwrightTestUtils';

test.describe('gux-badge', () => {
  [
    '<gux-badge>Badge</gux-badge>',
    '<gux-badge accent="info">Badge</gux-badge>',
    '<gux-badge accent="success">Badge</gux-badge>',
    '<gux-badge accent="warning">Badge</gux-badge>',
    '<gux-badge accent="error">Badge</gux-badge>',
    '<gux-badge accent="inherit">Badge</gux-badge>',
    '<gux-badge bold>Badge</gux-badge>',
    '<gux-badge bold accent="info">Badge</gux-badge>',
    '<gux-badge bold accent="success">Badge</gux-badge>',
    // '<gux-badge bold accent="warning">Badge</gux-badge>',
    '<gux-badge bold accent="error">Badge</gux-badge>',
    '<gux-badge bold accent="inherit">Badge</gux-badge>',
    '<gux-badge><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge bold><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge bold accent="info"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge bold accent="success"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    // '<gux-badge bold accent="warning"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge bold accent="error"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>',
    '<gux-badge bold accent="inherit"><gux-icon icon-name="subtract" decorative></gux-icon>Badge</gux-badge>'
  ].forEach((html, index) => {
    test(`should render component as expected (${index + 1})`, async ({
      page
    }) => {
      await setContent(page, html);
      await analyze(page);
    });
  });
});
