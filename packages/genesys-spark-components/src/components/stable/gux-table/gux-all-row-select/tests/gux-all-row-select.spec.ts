import { newSpecPage } from '@test/specTestUtils';
import { GuxAllRowSelect } from '../gux-all-row-select';

const components = [GuxAllRowSelect];
const language = 'en';

describe('gux-all-row-select', () => {
  it('should build', async () => {
    const html = '<gux-all-row-select></gux-all-row-select>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxAllRowSelect);
  });

  it('should handle the setIndeterminate method', async () => {
    const html = '<gux-all-row-select></gux-all-row-select>';
    const page = await newSpecPage({ components, html, language });

    const component = page.rootInstance;
    const inputElement = page.root.shadowRoot.querySelector('input');

    expect(inputElement.indeterminate).toBe(undefined);

    await component.setIndeterminate(true);
    expect(inputElement.indeterminate).toBe(true);

    await component.setIndeterminate(false);
    expect(inputElement.indeterminate).toBe(false);
  });

  it('should handle the setChecked method', async () => {
    const html = '<gux-all-row-select></gux-all-row-select>';
    const page = await newSpecPage({ components, html, language });

    const component = page.rootInstance;
    const inputElement = page.root.shadowRoot.querySelector('input');

    expect(inputElement.checked).toBe(false);

    await component.setChecked(true);
    await page.waitForChanges();
    expect(inputElement.checked).toBe(true);

    await component.setChecked(false);
    await page.waitForChanges();
    expect(inputElement.checked).toBe(false);
  });
});
