import { checkRenders, test } from '@test/playwrightTestUtils';

test.describe('gux-blank-state', () => {
  checkRenders([
    {
      html: `
    <gux-blank-state lang="en">
      <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
      <div slot="primary-message">Sorry, something went wrong.</div>
      <div slot="additional-guidance">Please refresh this page to try again.</div>
      <button slot="call-to-action" type="button" onclick="notify(event)">
        Call to action
      </button>
    </gux-blank-state>
    `
    }
  ]);
});
