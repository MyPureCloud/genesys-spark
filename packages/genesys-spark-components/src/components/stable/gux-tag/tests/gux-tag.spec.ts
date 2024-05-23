import { newSpecPage } from '@test/specTestUtils';
import { GuxTag } from '../gux-tag';

const components = [GuxTag];
const language = 'en';

describe('gux-tag', () => {
  describe('#render', () => {
    [
      '<gux-tag>default</gux-tag>',
      '<gux-tag accent="default">default (explicit)</gux-tag>',
      '<gux-tag accent="1">Accent 1</gux-tag>',
      '<gux-tag accent="1"><gux-icon icon-name="bolt" decorative="true"></gux-icon>Accent 1</gux-tag>',
      '<gux-tag accent="1" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>Accent 1</gux-tag>',
      '<gux-tag accent="1" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>Accent 1</gux-tag>',
      '<gux-tag emphasis="subtle" accent="1">Subtle 1</gux-tag>',
      '<gux-tag emphasis="bold" accent="1">Bold 1</gux-tag>',
      '<gux-tag size="small" accent="1">Small 1</gux-tag>',
      '<gux-tag size="large" accent="1">Large 1</gux-tag>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('delete', () => {
    describe('click', () => {
      it('should not have a delete button if tag is not removable', async () => {
        const html = `
          <gux-tag accent="1">
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const deleteButton: HTMLButtonElement =
          element.shadowRoot.querySelector('.gux-tag-remove-button');

        expect(deleteButton).toBeNull();
      });

      it('should emit guxdelete if tag is removable and not disabled', async () => {
        const html = `
          <gux-tag accent="1" removable>
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const deleteButton: HTMLButtonElement =
          element.shadowRoot.querySelector('.gux-tag-remove-button');
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveBeenCalled();
      });

      it('should not emit guxdelete if tag is removable and disabled', async () => {
        const html = `
          <gux-tag accent="1" removable disabled>
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const deleteButton: HTMLButtonElement =
          element.shadowRoot.querySelector('.gux-tag-remove-button');
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveBeenCalled();
      });
    });

    describe('keypress', () => {
      it('should emit guxdelete if tag is focused and removable and "Delete" is pressed', async () => {
        const html = `
          <gux-tag accent="1" removable>
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }));
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveBeenCalled();
      });

      it('should emit guxdelete if tag is focused and removable and "Backspace" is pressed', async () => {
        const html = `
          <gux-tag accent="1" removable>
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>`;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Backspace' })
        );
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveBeenCalled();
      });

      it('should not emit guxdelete if tag is focused and not removable and "Delete" is pressed', async () => {
        const html = `
          <gux-tag accent="1">
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }));
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveBeenCalled();
      });

      it('should not emit guxdelete if tag is focused and not removable and "Backspace" is pressed', async () => {
        const html = `
          <gux-tag accent="1">
            <gux-icon icon-name="bolt" decorative="true"></gux-icon>
            navy
          </gux-tag>
        `;
        const page = await newSpecPage({ components, html, language });
        const element = page.root as HTMLElement;
        const guxdeleteSpy = jest.fn();

        page.win.addEventListener('guxdelete', guxdeleteSpy);

        element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Backspace' })
        );
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveBeenCalled();
      });
    });
  });
});
