import { newSpecPage } from '@stencil/core/testing';
import { GuxDropdownOption } from '../gux-dropdown-option';

const components = [GuxDropdownOption];
const html = `<gux-dropdown-option text="TestsAreAwesome"></gux-dropdown-option>`;
const language = 'en';

describe('gux-dropdown-option', () => {
  it('should build', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.root).toMatchSnapshot();
  });

  describe('Class Logic', () => {
    describe('shouldFilter', () => {
      it('should not filter if no search string is provided', async () => {
        const page = await newSpecPage({ components, html, language });
        const component = page.root;
        const result = await component.shouldFilter('');

        await page.waitForChanges();

        expect(result).toBeFalsy();
        expect(page.root).toMatchSnapshot();
      });

      it('should not filter if string is in the text', async () => {
        const page = await newSpecPage({ components, html, language });
        const component = page.root;
        const result = await component.shouldFilter('Are');

        await page.waitForChanges();

        expect(result).toBeFalsy();
        expect(page.root).toMatchSnapshot();
      });

      it('should not filter if case-insensitive string is in the text', async () => {
        const page = await newSpecPage({ components, html, language });
        const component = page.root;
        const result = await component.shouldFilter('are');

        await page.waitForChanges();

        expect(result).toBeFalsy();
        expect(page.root).toMatchSnapshot();
      });

      it('should filter if string is not in the text', async () => {
        const page = await newSpecPage({ components, html, language });
        const component = page.root;
        const result = await component.shouldFilter('Not');

        await page.waitForChanges();

        expect(result).toBeTruthy();
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
