import { GuxDropdownOption } from '../gux-dropdown-option';

describe('gux-advanced-dropdown', () => {
  describe('shouldFilter', () => {
    it('Should not filter if no search string is provided', async () => {
      const option = new GuxDropdownOption();
      const result = await option.shouldFilter('');
      expect(result).toBeFalsy();
    });

    it('Should not filter if string is in the text', async () => {
      const option = new GuxDropdownOption();
      option.text = 'TestsAreAwesome';
      const result = await option.shouldFilter('Are');
      expect(result).toBeFalsy();

      expect(option.highlight).toBe('Are');
      expect(option.highlightIndex).toBe(5);
    });

    it('Should not filter if case-insensitive string is in the text', async () => {
      const option = new GuxDropdownOption();
      option.text = 'TestsAreAwesome';
      const result = await option.shouldFilter('are');
      expect(result).toBeFalsy();

      expect(option.highlight).toBe('are');
      expect(option.highlightIndex).toBe(5);
    });

    it('Should filter if string is not in the text', async () => {
      const option = new GuxDropdownOption();
      option.text = 'TestsAreAwesome';
      const result = await option.shouldFilter('Not');
      expect(result).toBeTruthy();
    });
  });
});
