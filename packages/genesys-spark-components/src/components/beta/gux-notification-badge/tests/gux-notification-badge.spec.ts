import { checkRenders } from '@test/specTestUtils';

import { GuxNotificationBadge } from '../gux-notification-badge';
import { renderConfigs } from './gux-notification-badge.common';

const components = [GuxNotificationBadge];

describe('gux-notification-badge', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
