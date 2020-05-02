import { newSpecPage } from '@stencil/core/testing';
import { GuxDropdownOption } from '../gux-dropdown-option';

describe('gux-dropdown-option', () => {
  describe('Class Logic', () => {
    let component: GuxDropdownOption;

    beforeEach(async () => {
      const page = await newSpecPage({
        components: [GuxDropdownOption],
        html: `<gux-dropdown-option></gux-dropdown-option>`
      });

      component = page.rootInstance;
    });

    describe('shouldFilter', () => {
      it('Should not filter if no search string is provided', async () => {
        const result = await component.shouldFilter('');

        expect(result).toBeFalsy();
      });

      it('Should not filter if string is in the text', async () => {
        component.text = 'TestsAreAwesome';

        const result = await component.shouldFilter('Are');

        expect(result).toBeFalsy();
        expect(component.highlight).toBe('Are');
        expect(component.highlightIndex).toBe(5);
      });

      it('Should not filter if case-insensitive string is in the text', async () => {
        component.text = 'TestsAreAwesome';

        const result = await component.shouldFilter('are');

        expect(result).toBeFalsy();
        expect(component.highlight).toBe('are');
        expect(component.highlightIndex).toBe(5);
      });

      it('Should filter if string is not in the text', async () => {
        component.text = 'TestsAreAwesome';

        const result = await component.shouldFilter('Not');

        expect(result).toBeTruthy();
      });
    });
  });
});
