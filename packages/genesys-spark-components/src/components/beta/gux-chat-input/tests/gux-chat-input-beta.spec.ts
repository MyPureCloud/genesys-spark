import { newSpecPage } from '@test/specTestUtils';
import { GuxChatInputBeta } from '../gux-chat-input-beta';
import { renderConfigs } from './gux-chat-input-beta.e2e.common';

const components = [GuxChatInputBeta];
const language = 'en';

describe('gux-chat-input-beta', () => {
  renderConfigs.forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxChatInputBeta);
      expect(page.root).toMatchSnapshot();
    });
  });
});
