import { getNewIndex } from '../gux-column-manager-item.service';

describe('gux-column-manager-item.service', () => {
  describe('#getOrderChange', () => {
    [
      {
        oldIndex: 0,
        dropIndex: 5,
        mouseOnTopHalfOfDropElement: true,
        expectedOutput: 4
      },
      {
        oldIndex: 0,
        dropIndex: 5,
        mouseOnTopHalfOfDropElement: false,
        expectedOutput: 5
      },
      {
        oldIndex: 5,
        dropIndex: 0,
        mouseOnTopHalfOfDropElement: true,
        expectedOutput: 0
      },
      {
        oldIndex: 5,
        dropIndex: 0,
        mouseOnTopHalfOfDropElement: false,
        expectedOutput: 1
      }
    ].forEach(
      (
        {
          oldIndex,
          dropIndex,
          mouseOnTopHalfOfDropElement,
          expectedOutput
        }: {
          oldIndex: number;
          dropIndex: number;
          mouseOnTopHalfOfDropElement: boolean;
          expectedOutput: number;
        },
        index
      ) => {
        it(`should work as expected ${index + 1}`, async () => {
          expect(
            getNewIndex(oldIndex, dropIndex, mouseOnTopHalfOfDropElement)
          ).toBe(expectedOutput);
        });
      }
    );
  });
});
