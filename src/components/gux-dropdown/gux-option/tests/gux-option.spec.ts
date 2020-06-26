import { newSpecPage } from '@stencil/core/testing';
import { GuxOption } from '../gux-option';

describe('gux-option', () => {
  let component: GuxOption;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxOption],
      html: `<gux-option>TestsAreAwesome</gux-option>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxOption);
  });

  describe('Class Logic', () => {
    describe('shouldFilter', () => {
      it('should not filter if no search string is provided', async () => {
        const result = await component.shouldFilter('');
        expect(result).toBeFalsy();
      });

      it('should not filter if no search string starts with', async () => {
        const result = await component.shouldFilter('TestsAre');
        expect(result).toBeFalsy();
      });

      it('should filter if string is in the text', async () => {
        const result = await component.shouldFilter('Are');
        expect(result).toBeTruthy();
        expect(component.highlight).toBe('Are');
      });

      it('should filter if case-insensitive string is in the text', async () => {
        const result = await component.shouldFilter('are');
        expect(result).toBeTruthy();
        expect(component.highlight).toBe('are');
      });

      it('should filter if string is not in the text', async () => {
        const result = await component.shouldFilter('Not');
        expect(result).toBeTruthy();
      });
    });
  });
});
