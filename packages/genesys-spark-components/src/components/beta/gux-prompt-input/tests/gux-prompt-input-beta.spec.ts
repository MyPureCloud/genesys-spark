import { newSpecPage } from '@test/specTestUtils';
import { GuxPromptInputBeta } from '../gux-prompt-input-beta';
import { renderConfigs } from './gux-prompt-input-beta.e2e.common';

const components = [GuxPromptInputBeta];
const language = 'en';

describe('gux-prompt-input-beta', () => {
  renderConfigs.forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPromptInputBeta);
      expect(page.root).toMatchSnapshot();
    });
  });
});
