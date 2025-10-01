import { asyncFilter } from './async-filter';

describe('asyncFilter', () => {
  it('should filter array based on async predicate', async () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = async (item: number) => item % 2 === 0;

    const result = await asyncFilter(array, predicate);

    expect(result).toEqual([2, 4]);
  });

  it('should return empty array when no items match', async () => {
    const array = [1, 3, 5];
    const predicate = async (item: number) => item % 2 === 0;

    const result = await asyncFilter(array, predicate);

    expect(result).toEqual([]);
  });

  it('should return all items when all match', async () => {
    const array = [2, 4, 6];
    const predicate = async (item: number) => item % 2 === 0;

    const result = await asyncFilter(array, predicate);

    expect(result).toEqual([2, 4, 6]);
  });

  it('should handle empty array', async () => {
    const array: number[] = [];
    const predicate = async (item: number) => item % 2 === 0;

    const result = await asyncFilter(array, predicate);

    expect(result).toEqual([]);
  });

  it('should work with string array', async () => {
    const array = ['apple', 'banana', 'cherry'];
    const predicate = async (item: string) => item.length > 5;

    const result = await asyncFilter(array, predicate);

    expect(result).toEqual(['banana', 'cherry']);
  });
});
