import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-rating', () => {
  async function getStarCounts(
    page: E2EPage
  ): Promise<{ emptyStars: number; halfStars: number; fullStars: number }> {
    const element = await page.find('gux-rating');

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
        html: '<gux-rating></gux-rating>',
        expctedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0"></gux-rating>',
        expctedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0.5"></gux-rating>',
        expctedStarCounts: { emptyStars: 4, fullStars: 0, halfStars: 1 }
      },
      {
        html: '<gux-rating value="1"></gux-rating>',
        expctedStarCounts: { emptyStars: 4, fullStars: 1, halfStars: 0 }
      },
      {
        html: '<gux-rating value="1.5"></gux-rating>',
        expctedStarCounts: { emptyStars: 3, fullStars: 1, halfStars: 1 }
      },
      {
        html: '<gux-rating value="2"></gux-rating>',
        expctedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
      },
      {
        html: '<gux-rating value="2.5"></gux-rating>',
        expctedStarCounts: { emptyStars: 2, fullStars: 2, halfStars: 1 }
      },
      {
        html: '<gux-rating value="3"></gux-rating>',
        expctedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3.5"></gux-rating>',
        expctedStarCounts: { emptyStars: 1, fullStars: 3, halfStars: 1 }
      },
      {
        html: '<gux-rating value="4"></gux-rating>',
        expctedStarCounts: { emptyStars: 1, fullStars: 4, halfStars: 0 }
      },
      {
        html: '<gux-rating value="4.5"></gux-rating>',
        expctedStarCounts: { emptyStars: 0, fullStars: 4, halfStars: 1 }
      },
      {
        html: '<gux-rating value="5"></gux-rating>',
        expctedStarCounts: { emptyStars: 0, fullStars: 5, halfStars: 0 }
      },
      {
        html: '<gux-rating value="0" max-value=10></gux-rating>',
        expctedStarCounts: { emptyStars: 10, fullStars: 0, halfStars: 0 }
      },
      {
        html: '<gux-rating value="5" max-value=10></gux-rating>',
        expctedStarCounts: { emptyStars: 5, fullStars: 5, halfStars: 0 }
      },
      {
        html: '<gux-rating value="10" max-value=10></gux-rating>',
        expctedStarCounts: { emptyStars: 0, fullStars: 10, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3" disabled></gux-rating>',
        expctedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      },
      {
        html: '<gux-rating value="3" readonly></gux-rating>',
        expctedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
      }
    ].forEach(({ html, expctedStarCounts }, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage({ html });

        const element = await page.find('gux-rating');

        expect(element).toBeDefined();
        expect(await getStarCounts(page)).toEqual(expctedStarCounts);
      });
    });
  });

  describe('interactions', () => {
    describe('click', () => {
      async function clickStar(
        e2ePage: E2EPage,
        position: number
      ): Promise<void> {
        await page.evaluate(ratingElementIndex => {
          const element = document.querySelector('gux-rating');
          const ratingStarElements =
            element.shadowRoot.querySelectorAll('gux-icon');
          const ratingElement = ratingStarElements[
            ratingElementIndex
          ] as HTMLElement;

          ratingElement.click();
        }, position - 1);

        await e2ePage.waitForChanges();
      }

      let page: E2EPage;

      beforeEach(async () => {
        page = await newE2EPage({
          html: '<gux-rating></gux-rating>'
        });
      });

      [
        { starToClick: 1 },
        { starToClick: 2 },
        { starToClick: 3 },
        { starToClick: 4 },
        { starToClick: 5 }
      ].forEach(({ starToClick }, index) => {
        it(`should render 0 if star ${starToClick} is clicked but the component is disabled`, async () => {
          page = await newE2EPage({
            html: '<gux-rating disabled></gux-rating>'
          });

          await clickStar(page, starToClick);

          expect(await getStarCounts(page)).toEqual({
            emptyStars: 5,
            fullStars: 0,
            halfStars: 0
          });
        });

        it(`should render 0 if star ${starToClick} is clicked but the component is readonly`, async () => {
          page = await newE2EPage({
            html: '<gux-rating readonly></gux-rating>'
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

    describe('keyboard', () => {
      let page: E2EPage;

      beforeEach(async () => {
        page = await newE2EPage({
          html: '<gux-rating value="2.5"></gux-rating>'
        });
      });

      [
        {
          press: 'ArrowDown',
          expctedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
        },
        {
          press: 'ArrowRight',
          expctedStarCounts: { emptyStars: 2, fullStars: 3, halfStars: 0 }
        },
        {
          press: 'ArrowUp',
          expctedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
        },
        {
          press: 'ArrowLeft',
          expctedStarCounts: { emptyStars: 3, fullStars: 2, halfStars: 0 }
        },
        {
          press: 'Home',
          expctedStarCounts: { emptyStars: 5, fullStars: 0, halfStars: 0 }
        },
        {
          press: 'End',
          expctedStarCounts: { emptyStars: 0, fullStars: 5, halfStars: 0 }
        }
      ].forEach(({ press, expctedStarCounts }, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const element = await page.find('gux-rating');

          await element.press(press);

          expect(await getStarCounts(page)).toEqual(expctedStarCounts);
        });
      });
    });
  });
});
