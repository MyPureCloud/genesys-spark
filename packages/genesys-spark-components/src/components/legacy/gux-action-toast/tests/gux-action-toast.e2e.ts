import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-action-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render action toast',
        html: `
          <gux-action-toast-legacy lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
            <gux-button slot="negative-button">Reject</gux-button>
            <gux-button slot="positive-button" accent="primary">Accept</gux-button>
          </gux-action-toast-legacy>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-action-toast-legacy');
        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
