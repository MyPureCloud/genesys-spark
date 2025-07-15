import {
  checkRenders,
  E2EPage,
  expect,
  test,
  setContent
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-rating.common';

type ExpectedStarCount = {
  emptyStars: number;
  halfStars: number;
  fullStars: number;
};

test.describe('gux-rating', () => {
  /* eslint playwright/expect-expect: ["error", { "assertFunctionNames": ["assertStarCounts"] }] */
  async function assertStarCounts(
    page: E2EPage,
    { emptyStars, fullStars, halfStars }: ExpectedStarCount
  ): Promise<void> {
    const rating = page.locator('gux-rating');

    await expect(
      rating.locator('gux-icon[icon-name="fa/star-regular"]')
    ).toHaveCount(emptyStars);
    await expect(
      rating.locator('gux-icon[icon-name="fa/star-sharp-half-stroke-regular"]')
    ).toHaveCount(halfStars);
    await expect(
      rating.locator('gux-icon[icon-name="fa/star-solid"]')
    ).toHaveCount(fullStars);
  }

  async function clickStar(
    page: E2EPage,
    position: number,
    force: boolean = false
  ): Promise<void> {
    const rating = page.locator('gux-rating');
    const starIcon = rating.locator('gux-icon').nth(position - 1);

    await starIcon.locator('.gux-icon-container').click({ force });
  }

  checkRenders({
    renderConfigs,
    element: 'gux-rating'
  });

  test.describe('# count stars', () => {
    [
      {
        html: '<gux-rating aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0.5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 4, fullStars: 0, halfStars: 1 }
      },
      {
        html: '<gux-rating value="1" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 4, fullStars: 1, halfStars: 0 }
      },
      {
        html: '<gux-rating value="1.5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 3, fullStars: 1, halfStars: 1 }
      },
      {
        html: '<gux-rating value="2" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
      },
      {
        html: '<gux-rating value="2.5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 2, fullStars: 2, halfStars: 1 }
      },
      {
        html: '<gux-rating value="3" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3.5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 1, fullStars: 3, halfStars: 1 }
      },
      {
        html: '<gux-rating value="4" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 1, fullStars: 4, halfStars: 0 }
      },
      {
        html: '<gux-rating value="4.5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 0, fullStars: 4, halfStars: 1 }
      },
      {
        html: '<gux-rating value="5" aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 0, fullStars: 5, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0" max-value=10 aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 10, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="5" max-value=10 aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 5, fullStars: 5, halfStars: 0 }
      },
      {
        html: '<gux-rating value="10" max-value=10 aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 0, fullStars: 10, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3" disabled aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3" readonly aria-label="Feedback"></gux-rating>',
        expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      }
    ].forEach(({ html, expectedStarCounts }, index) => {
      test(`should render stars as expected (${index + 1})`, async ({
        page
      }) => {
        await setContent(page, html);
        await assertStarCounts(page, expectedStarCounts);
      });
    });
  });

  test.describe('# interactions', () => {
    test.describe('# click', () => {
      test.describe('default', () => {
        const stars = [1, 2, 3, 4, 5];

        stars.forEach(starToClick => {
          test(`disabled component - star ${starToClick} click has no effect`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating disabled aria-label="Feedback"></gux-rating>'
            );
            await clickStar(page, starToClick, true);
            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });

          test(`readonly component - star ${starToClick} click has no effect`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating readonly aria-label="Feedback"></gux-rating>'
            );
            await clickStar(page, starToClick);
            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });

          test(`clicking star ${starToClick} sets rating to ${starToClick}`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating aria-label="Feedback"></gux-rating>'
            );
            await clickStar(page, starToClick);
            await assertStarCounts(page, {
              emptyStars: 5 - starToClick,
              fullStars: starToClick,
              halfStars: 0
            });
          });

          test(`double-clicking star ${starToClick} resets rating to 0`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating aria-label="Feedback"></gux-rating>'
            );
            await clickStar(page, starToClick);
            await clickStar(page, starToClick);
            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });
        });
      });

      test.describe('half', () => {
        [
          { starToClick: 1 },
          { starToClick: 2 },
          { starToClick: 3 },
          { starToClick: 4 },
          { starToClick: 5 }
        ].forEach(({ starToClick }) => {
          test(`should render 0 if star ${starToClick} is clicked but the component is disabled`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating increment="half" disabled aria-label="Feedback"></gux-rating>'
            );

            await clickStar(page, starToClick, true);

            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });

          test(`should render 0 if star ${starToClick} is clicked but the component is readonly`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating increment="half" readonly aria-label="Feedback"></gux-rating>'
            );

            await clickStar(page, starToClick);

            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });

          test(`should render ${
            starToClick - 0.5
          } if star ${starToClick} is clicked`, async ({ page }) => {
            await setContent(
              page,
              '<gux-rating increment="half" aria-label="Feedback"></gux-rating>'
            );

            await clickStar(page, starToClick);

            await assertStarCounts(page, {
              emptyStars: 5 - starToClick,
              fullStars: starToClick - 1,
              halfStars: 1
            });
          });

          test(`should render ${starToClick} if star ${starToClick} is clicked twice`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating increment="half" aria-label="Feedback"></gux-rating>'
            );

            await clickStar(page, starToClick);
            await clickStar(page, starToClick);

            await assertStarCounts(page, {
              emptyStars: 5 - starToClick,
              fullStars: starToClick,
              halfStars: 0
            });
          });

          test(`should render 0 if star ${starToClick} is clicked three times`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating increment="half" aria-label="Feedback"></gux-rating>'
            );

            await clickStar(page, starToClick);
            await clickStar(page, starToClick);
            await clickStar(page, starToClick);

            await assertStarCounts(page, {
              emptyStars: 5,
              fullStars: 0,
              halfStars: 0
            });
          });
        });
      });
    });

    test.describe('keyboard', () => {
      test.describe('default', () => {
        [
          {
            press: 'ArrowDown',
            expectedStarCounts: { emptyStars: 4, fullStars: 1, halfStars: 0 }
          },
          {
            press: 'ArrowRight',
            expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
          },
          {
            press: 'ArrowUp',
            expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
          },
          {
            press: 'ArrowLeft',
            expectedStarCounts: { emptyStars: 4, fullStars: 1, halfStars: 0 }
          },
          {
            press: 'Home',
            expectedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
          },
          {
            press: 'End',
            expectedStarCounts: { emptyStars: 0, fullStars: 5, halfStars: 0 }
          }
        ].forEach(({ press, expectedStarCounts }) => {
          test(`should render component as expected ${press}`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating value="2" aria-label="Feedback"></gux-rating>'
            );

            await page.locator('gux-rating').press(press);

            await assertStarCounts(page, expectedStarCounts);
          });
        });
      });

      test.describe('half', () => {
        [
          {
            press: 'ArrowDown',
            expectedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
          },
          {
            press: 'ArrowRight',
            expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
          },
          {
            press: 'ArrowUp',
            expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
          },
          {
            press: 'ArrowLeft',
            expectedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
          },
          {
            press: 'Home',
            expectedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
          },
          {
            press: 'End',
            expectedStarCounts: { emptyStars: 0, fullStars: 5, halfStars: 0 }
          }
        ].forEach(({ press, expectedStarCounts }) => {
          test(`should render component as expected ${press}`, async ({
            page
          }) => {
            await setContent(
              page,
              '<gux-rating increment="half" value="2.5" aria-label="Feedback"></gux-rating>'
            );

            const rating = page.locator('gux-rating');

            await rating.press(press);

            await assertStarCounts(page, expectedStarCounts);
          });
        });
      });
    });
  });

  test.describe('events', () => {
    test('should emit input and change events on value change', async ({
      page
    }) => {
      await setContent(page, '<gux-rating aria-label="Feedback"></gux-rating>');

      await page.evaluate(() => {
        window['inputEvents'] = [];
        window['changeEvents'] = [];

        const rating = document.querySelector('gux-rating');
        rating.addEventListener('input', e =>
          window['inputEvents'].push((e.target as HTMLGuxRatingElement).value)
        );
        rating.addEventListener('change', e =>
          window['changeEvents'].push((e.target as HTMLGuxRatingElement).value)
        );

        window['inputEvents'] = [];
        window['changeEvents'] = [];
      });

      await clickStar(page, 3);

      const events = await page.evaluate(() => ({
        input: window['inputEvents'],
        change: window['changeEvents']
      }));

      expect(events.input).toHaveLength(1);
      expect(events.change).toHaveLength(1);

      await page.evaluate(() => {
        delete window['inputEvents'];
        delete window['changeEvents'];
      });
    });
  });

  test.describe('# accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      await setContent(
        page,
        '<gux-rating value="3" max-value="10" aria-label="Rating"></gux-rating>'
      );

      const rating = page.locator('gux-rating');

      await expect(rating).toHaveAttribute('role', 'spinbutton');
      await expect(rating).toHaveAttribute('aria-valuenow', '3');
      await expect(rating).toHaveAttribute('aria-valuemin', '0');
      await expect(rating).toHaveAttribute('aria-valuemax', '10');
      await expect(rating).toHaveAttribute('aria-readonly', 'false');
    });

    test('should update aria-valuenow on value change', async ({ page }) => {
      await setContent(page, '<gux-rating aria-label="Rating"></gux-rating>');

      const rating = page.locator('gux-rating');
      await clickStar(page, 4);

      await expect(rating).toHaveAttribute('aria-valuenow', '4');
    });
  });

  test.describe('# focus', () => {
    test('should be focusable when not disabled', async ({ page }) => {
      await setContent(page, '<gux-rating aria-label="Rating"></gux-rating>');

      const rating = page.locator('gux-rating');
      await rating.focus();

      await expect(rating).toBeFocused();
    });

    test('should not be focusable when disabled', async ({ page }) => {
      await setContent(
        page,
        '<gux-rating disabled aria-label="Rating"></gux-rating>'
      );

      const rating = page.locator('gux-rating');

      await expect(rating).toHaveAttribute('tabindex', '-1');
    });
  });
});
