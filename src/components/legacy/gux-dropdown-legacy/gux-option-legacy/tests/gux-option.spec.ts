import { newSpecPage } from '@stencil/core/testing';
import { GuxOptionLegacy } from '../gux-option';

describe('gux-option', () => {
  let component: GuxOptionLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxOptionLegacy],
      html: `<gux-option-legacy>TestsAreAwesome</gux-option-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxOptionLegacy);
  });

  describe('Class Logic', () => {
    describe('shouldFilter', () => {
      it('should not filter if no search string is provided', async () => {
        const result = await component.shouldFilter('');
        expect(result).toBeFalsy();
      });

      it('should not filter if search string starts with Case-sensitive Match', async () => {
        const result = await component.shouldFilter('TestsAre');
        expect(result).toBeFalsy();
      });

      it('should not filter if search string starts with Case-Insensitive Match', async () => {
        const result = await component.shouldFilter('testsAre');
        expect(result).toBeFalsy();
      });

      it(`should filter if string doesn't startWith`, async () => {
        const result = await component.shouldFilter('Are');
        expect(result).toBeTruthy();
      });

      it(`should filter if case-insensitive string string doesn't startWith`, async () => {
        const result = await component.shouldFilter('are');
        expect(result).toBeTruthy();
      });
    });
  });
});
