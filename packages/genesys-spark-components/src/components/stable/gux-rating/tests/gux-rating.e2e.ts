import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-rating', () => {
  async function getStarCounts(
    e2ePage: E2EPage
  ): Promise<{ emptyStars: number; halfStars: number; fullStars: number }> {
    const element = await e2ePage.find('gux-rating');

    return {
      emptyStars: element.shadowRoot.querySelectorAll(
        'gux-icon[icon-name="rating"]'
      ).length,
      halfStars: element.shadowRoot.querySelectorAll(
        'gux-icon[icon-name="rating-partial"]'
      ).length,
      fullStars: element.shadowRoot.querySelectorAll(
        'gux-icon[icon-name="rating-active"]'
      ).length
    };
  }

  describe('#render', () => {
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
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('gux-rating');
        await a11yCheck(page);

        expect(element).toBeDefined();
        expect(await getStarCounts(page)).toEqual(expectedStarCounts);
      });
    });
  });

  describe('interactions', () => {
    describe('click', () => {
      async function clickStar(
        e2ePage: E2EPage,
        position: number
      ): Promise<void> {
        await e2ePage.evaluate(ratingElementIndex => {
          const element = document.querySelector('gux-rating');
          const starContainer = element.shadowRoot.querySelector(
            '.gux-rating-star-container'
          );
          const starElements = starContainer.children;
          const ratingElement = starElements[
            ratingElementIndex
          ].shadowRoot.querySelector<HTMLElement>('.gux-icon-container');

          ratingElement.click();
        }, position - 1);

        await e2ePage.waitForChanges();
      }

      describe('increment', () => {
        describe('default', () => {
          let page: E2EPage;

          beforeEach(async () => {
            page = await newSparkE2EPage({
              html: '<gux-rating aria-label="Feedback"></gux-rating>'
            });
          });

          [
            { starToClick: 1 },
            { starToClick: 2 },
            { starToClick: 3 },
            { starToClick: 4 },
            { starToClick: 5 }
          ].forEach(({ starToClick }) => {
            it(`should render 0 if star ${starToClick} is clicked but the component is disabled`, async () => {
              page = await newSparkE2EPage({
                html: '<gux-rating disabled aria-label="Feedback"></gux-rating>'
              });

              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });

            it(`should render 0 if star ${starToClick} is clicked but the component is readonly`, async () => {
              page = await newSparkE2EPage({
                html: '<gux-rating readonly aria-label="Feedback"></gux-rating>'
              });

              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });

            it(`should render ${starToClick} if star ${starToClick} is clicked`, async () => {
              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5 - starToClick,
                fullStars: starToClick,
                halfStars: 0
              });
            });

            it(`should render 0 if star ${starToClick} is clicked twice times`, async () => {
              await clickStar(page, starToClick);
              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });
          });
        });

        describe('half', () => {
          let page: E2EPage;

          beforeEach(async () => {
            page = await newSparkE2EPage({
              html: '<gux-rating increment="half" aria-label="Feedback"></gux-rating>'
            });
          });

          [
            { starToClick: 1 },
            { starToClick: 2 },
            { starToClick: 3 },
            { starToClick: 4 },
            { starToClick: 5 }
          ].forEach(({ starToClick }) => {
            it(`should render 0 if star ${starToClick} is clicked but the component is disabled`, async () => {
              page = await newSparkE2EPage({
                html: ' <gux-rating increment="half" disabled aria-label="Feedback"></gux-rating>'
              });

              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });

            it(`should render 0 if star ${starToClick} is clicked but the component is readonly`, async () => {
              page = await newSparkE2EPage({
                html: ' <gux-rating increment="half" readonly aria-label="Feedback"></gux-rating>'
              });

              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });

            it(`should render ${
              starToClick - 0.5
            } if star ${starToClick} is clicked`, async () => {
              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5 - starToClick,
                fullStars: starToClick - 1,
                halfStars: 1
              });
            });

            it(`should render ${starToClick} if star ${starToClick} is clicked twice`, async () => {
              await clickStar(page, starToClick);
              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5 - starToClick,
                fullStars: starToClick,
                halfStars: 0
              });
            });

            it(`should render 0 if star ${starToClick} is clicked three times`, async () => {
              await clickStar(page, starToClick);
              await clickStar(page, starToClick);
              await clickStar(page, starToClick);

              expect(await getStarCounts(page)).toEqual({
                emptyStars: 5,
                fullStars: 0,
                halfStars: 0
              });
            });
          });
        });
      });
    });

    describe('keyboard', () => {
      describe('increment', () => {
        describe('default', () => {
          let page: E2EPage;

          beforeEach(async () => {
            page = await newSparkE2EPage({
              html: '<gux-rating value="2" aria-label="Feedback"></gux-rating>'
            });
          });

          [
            {
              press: 'ArrowDown',
              expectedStarCounts: { emptyStars: 4, fullStars: 1, halfStars: 0 }
            },
            {
              press: 'ArrowRight',
              expectedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
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
            it(`should render component as expected ${press}`, async () => {
              const element = await page.find('gux-rating');

              await element.press(press);

              expect(await getStarCounts(page)).toEqual(expectedStarCounts);
            });
          });
        });

        describe('half', () => {
          let page: E2EPage;

          beforeEach(async () => {
            page = await newSparkE2EPage({
              html: '<gux-rating increment="half" value="2.5" aria-label="Feedback"></gux-rating>'
            });
          });

          [
            {
              press: 'ArrowDown',
              expectedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
            },
            {
              press: 'ArrowRight',
              expectedStarCounts: { emptyStars: 2, fullStars: 2, halfStars: 1 }
            },
            {
              press: 'ArrowUp',
              expectedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
            },
            {
              press: 'ArrowLeft',
              expectedStarCounts: { emptyStars: 2, fullStars: 2, halfStars: 1 }
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
            it(`should render component as expected ${press}`, async () => {
              const element = await page.find('gux-rating');

              await element.press(press);

              expect(await getStarCounts(page)).toEqual(expectedStarCounts);
            });
          });
        });
      });
    });
  });
});
