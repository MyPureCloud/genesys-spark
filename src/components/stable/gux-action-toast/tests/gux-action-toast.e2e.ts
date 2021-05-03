import { newE2EPage } from '@stencil/core/testing';

describe('gux-action-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render action toast',
        html: `
          <gux-action-toast lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
            <gux-button slot="negative-button">Reject</gux-button>
            <gux-button slot="positive-button" accent="primary">Accept</gux-button>
          </gux-action-toast>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-action-toast');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
