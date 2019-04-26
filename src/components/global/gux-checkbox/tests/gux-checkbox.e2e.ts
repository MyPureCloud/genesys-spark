import { newE2EPage } from '@stencil/core/testing'

describe('gux-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-checkbox></gux-checkbox>');
    const element = await page.find('gux-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the three checkbox states', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-checkbox></gux-checkbox>');
    const component = await page.find('gux-checkbox');
    const label = await component.find('label');

    expect(label.className).toContain('gux-unchecked');

    await component.setAttribute('checked', 'true');
    await page.waitForChanges();
    expect(label.className).toContain('gux-checked');

    await component.setAttribute('checked', 'false');
    await page.waitForChanges();
    expect(label.className).toContain('gux-unchecked');

    await component.setAttribute('indeterminate', 'true');
    await page.waitForChanges();
    expect(label.className).toContain('gux-mixed');
  });

  it('switches between the three states when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-checkbox label="test" indeterminate></gux-checkbox>');
    const component = await page.find('gux-checkbox');
    const label = await component.find('label');


    expect(label.className).toContain('gux-mixed');

    await label.click();
    await page.waitForChanges();
    expect(label.className).toContain('gux-checked');

    await label.click();
    await page.waitForChanges();
    expect(label.className).toContain('gux-unchecked');

    await label.click();
    await page.waitForChanges();
    expect(label.className).toContain('gux-checked');
  });

  it('should render the assigned label', async () =>{
    const page = await newE2EPage();

    await page.setContent('<gux-checkbox label="my label is so cool"></gux-checkbox>');
    const component = await page.find('gux-checkbox');
    const label = await component.find('label');

    expect(label.textContent).toContain('my label is so cool');
  });
});
