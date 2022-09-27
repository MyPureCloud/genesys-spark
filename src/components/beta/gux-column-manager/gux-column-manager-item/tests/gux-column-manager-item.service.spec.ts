import { getNewIndex } from '../gux-column-manager-item.service';

describe('gux-column-manager-item.service', () => {
  describe('#getOrderChange', () => {
    [
      { oldIndex: 0, dropIndex: 5, topOnTop: true, expectedOutput: 4 },
      { oldIndex: 0, dropIndex: 5, topOnTop: false, expectedOutput: 5 },
      { oldIndex: 5, dropIndex: 0, topOnTop: true, expectedOutput: 0 },
      { oldIndex: 5, dropIndex: 0, topOnTop: false, expectedOutput: 1 }
    ].forEach(
      (
        {
          oldIndex,
          dropIndex,
          topOnTop,
          expectedOutput
        }: {
          oldIndex: number;
          dropIndex: number;
          topOnTop: boolean;
          expectedOutput: number;
        },
        index
      ) => {
        it(`should work as expected ${index + 1}`, async () => {
          expect(getNewIndex(oldIndex, dropIndex, topOnTop)).toBe(
            expectedOutput
          );
        });
      }
    );
  });
});
