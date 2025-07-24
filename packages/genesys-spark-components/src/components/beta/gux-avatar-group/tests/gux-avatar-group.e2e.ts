import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-avatar-group.common';

const axeExclusions = [];

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-avatar-group', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-group-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`${description} should be accessible`, async () => {
        const page = await newSparkE2EPage({ html });
        await a11yCheck(page, axeExclusions);
      });
    });
  });

  describe('#interaction', () => {
    it(`should handles tabindex on navigation as expected without overflow`, async () => {
      const html = `<gux-avatar-group-beta>
        <gux-avatar-group-item-beta name="Conor Darcy">
          </gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Elliot Fitzgerald"
        ></gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Greg Hayes"
        ></gux-avatar-group-item-beta>
        </gux-avatar-group-beta>`;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-avatar-group-beta');
      const firstAvatarGroupItem = await page.find(
        'gux-avatar-group-item-beta[name="Conor Darcy"]'
      );
      const firstItemButton = await firstAvatarGroupItem.find('pierce/button');
      const secondAvatarGroupItem = await page.find(
        'gux-avatar-group-item-beta[name="Elliot Fitzgerald"]'
      );
      const secondItemButton =
        await secondAvatarGroupItem.find('pierce/button');
      const lastAvatarGroupItem = await page.find(
        'gux-avatar-group-item-beta[name="Greg Hayes"]'
      );
      const lastItemButton = await lastAvatarGroupItem.find('pierce/button');
      await element.press('Tab');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
      // correct initially
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to next group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('0');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to last group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('0');
      // navigate to first group item going right
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to last group item going left
      await element.press('ArrowLeft');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('0');
      await element.press('Home');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('-1');
      await element.press('End');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('0');
      // navigate out of group, keeps correct tab index
      await element.press('Tab');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('0');
      // click on second item
      await secondAvatarGroupItem.click();
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('0');
      expect(lastItemButton.getAttribute('tabindex')).toEqual('-1');
    });
    it(`should handles tabindex on navigation as expected with overflow`, async () => {
      const html = `<gux-avatar-group-beta quantity="2">
        <gux-avatar-group-item-beta name="Conor Darcy">
          </gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Elliot Fitzgerald"
        ></gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Greg Hayes"
        ></gux-avatar-group-item-beta>
        </gux-avatar-group-beta>`;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-avatar-group-beta');
      const firstAvatarGroupItem = await page.find(
        'gux-avatar-group-item-beta[name="Conor Darcy"]'
      );
      const firstItemButton = await firstAvatarGroupItem.find('pierce/button');
      const secondAvatarGroupItem = await page.find(
        'gux-avatar-group-item-beta[name="Elliot Fitzgerald"]'
      );
      const secondItemButton =
        await secondAvatarGroupItem.find('pierce/button');
      await element.press('Tab');
      await page.waitForChanges();
      const overflow = await page.find('pierce/gux-avatar-overflow-beta');
      const overflowButton = await overflow.find('pierce/button');
      expect(element.outerHTML).toMatchSnapshot();
      // correct initially
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to next group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('0');
      expect(overflowButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to last group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('0');
      // navigate to first group item going right
      await element.press('ArrowRight');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('-1');
      // navigate to last group item going left
      await element.press('ArrowLeft');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('0');
      await element.press('Home');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('0');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('-1');
      await element.press('End');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('0');
      // navigate out of group, keeps correct tab index
      await element.press('Tab');
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('0');
      // click on overflow item
      await overflow.click();
      await page.waitForChanges();
      expect(firstItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(secondItemButton.getAttribute('tabindex')).toEqual('-1');
      expect(overflowButton.getAttribute('tabindex')).toEqual('0');
    });
  });
});
