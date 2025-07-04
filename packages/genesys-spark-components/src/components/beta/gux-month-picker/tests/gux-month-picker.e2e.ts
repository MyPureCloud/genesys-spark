import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-month-picker.common';

const axeExclusions = [];

describe('gux-month-picker-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-month-picker-beta');

        await a11yCheck(page, axeExclusions);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('gux-month-calendar year navigation', () => {
    it('should update year label when clicking year change buttons', async () => {
      const page = await newSparkE2EPage({
        html: '<gux-month-calendar value="2023-06"></gux-month-calendar>'
      });

      await page.waitForSelector('gux-month-calendar');

      const getYearLabel = () =>
        page.evaluate(() => {
          const calendar = document.querySelector('gux-month-calendar');
          return calendar.shadowRoot.querySelector('[data-testid="year-label"]')
            .textContent;
        });

      const clickYearButton = async (index: number) => {
        await page.evaluate(buttonIndex => {
          const calendar = document.querySelector('gux-month-calendar');
          const buttons =
            calendar.shadowRoot.querySelectorAll('.gux-year-change');
          (buttons[buttonIndex] as HTMLButtonElement).click();
        }, index);
        await page.waitForChanges();
      };

      expect(await getYearLabel()).toContain('2023');

      await clickYearButton(1); // next year
      expect(await getYearLabel()).toContain('2024');

      await clickYearButton(0); // previous year
      await clickYearButton(0); // previous year again
      expect(await getYearLabel()).toContain('2022');
    });
  });
});
