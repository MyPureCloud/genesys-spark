import { newSpecPage } from '@stencil/core/testing';
import { GuxActionToast } from '../gux-action-toast';

const components = [GuxActionToast];
const language = 'en';

describe('gux-action-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render action toast',
        html: `
          <gux-action-toast accent="neutral">
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
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxActionToast);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
