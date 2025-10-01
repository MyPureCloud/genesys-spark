import clamp from './clamp';

describe('clamp', () => {
  it('should return the input when within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should return lower bound when input is below', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should return upper bound when input is above', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should use default bounds when not provided', () => {
    expect(clamp(5)).toBe(5);
    expect(clamp(5, 0)).toBe(5);
  });

  it('should handle negative bounds', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('should return NaN when input is NaN', () => {
    expect(clamp(NaN, 0, 10)).toBeNaN();
  });

  it('should handle edge case where lower equals upper', () => {
    expect(clamp(5, 3, 3)).toBe(3);
    expect(clamp(1, 3, 3)).toBe(3);
  });
});
