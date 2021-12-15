import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusionsIfDisabled = [
  {
    issueId: 'color-contrast',
    target: 'gux-tag-beta,.gux-tag-text',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
  }
];

describe('gux-tag-beta', () => {
  describe('#render', () => {
    [
      '<gux-tag-beta lang="en">default</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="default">default (explicit)</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="navy">navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" icon="bolt" color="navy">navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable disabled>navy</gux-tag-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const elementIsDisabled = await element.getProperty('disabled');
        const axeExclusions = elementIsDisabled ? axeExclusionsIfDisabled : [];

        await a11yCheck(page, axeExclusions);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('delete', () => {
    describe('click', () => {
      it('should not have a delete button if tag is not removable', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3">navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );

        expect(deleteButton).toBeNull();
      });

      it('should emit guxdelete if tag is removable and not disabled', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should not emit guxdelete if tag is removable and disabled', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable disabled>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveReceivedEvent();
      });
    });

    describe('keypress', () => {
      it('should emit guxdelete if tag is focused and removable and "Delete" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await element.press('Delete');
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should emit guxdelete if tag is focused and removable and "Backspace" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await element.press('Backspace');
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should not emit guxdelete if tag is focused and not removable and "Delete" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3">navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await element.press('Delete');
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveReceivedEvent();
      });

      it('should not emit guxdelete if tag is focused and not removable and "Backspace" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="navy" value="3">navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await element.press('Backspace');
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveReceivedEvent();
      });
    });
  });

  describe('a11y', () => {
    [
      'default',
      'navy',
      'blue',
      'electric-purple',
      'aqua-green',
      'fuscha',
      'dark-purple',
      'bubblegum-pink',
      'olive-green',
      'lilac',
      'alert-yellow-green'
    ].forEach(color => {
      it(`should be accessible when color is "${color}"`, async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="${color}" value="3" removable>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const axeExclusions = [
          {
            issueId: 'color-contrast',
            target: 'gux-tag-beta,.gux-tag-text',
            exclusionReason:
              'Specified in Spark. May be addressed by https://inindca.atlassian.net/browse/COMUI-794'
          }
        ];

        await a11yCheck(page, axeExclusions);
      });

      it(`should be accessible when disabled and color is "${color}"`, async () => {
        const html = `<gux-tag-beta lang="en" icon="bolt" color="${color}" value="3" removable disabled>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusionsIfDisabled);
      });
    });
  });
});
