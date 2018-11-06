import { EventSpy } from '@stencil/core/dist/declarations';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('genesys-pagination-items-per-page', () => {
  it('renders', async () => {
    const component = await buildComponent('');
    expect(await component.root).toHaveClass('hydrated');
  });

  it('should display the default options properly', async () => {
    const component = await buildComponent('');

    const select = await component.select;
    expect(select).toBeTruthy();
    expect(await select.getProperty('value')).toEqual('25');

    const selectOptions = await component.selectOptions;
    expect(selectOptions.length).toBe(3);
    expect(await selectOptions[0].textContent).toEqual('25');
    expect(await selectOptions[1].textContent).toEqual('50');
    expect(await selectOptions[2].textContent).toEqual('100');
  });

  it('should update the selected items per page properly', async () => {
    const component = await buildComponent('itemsPerPageChanged=');

    const select = await component.select;

    await component.selectOption('50');
    expect(await select.getProperty('value')).toEqual('50');
    expect(await component.itemsPerPageChangedSpy).toHaveReceivedEventDetail(
      50
    );
  });

  it('should respect the items-per-page settings', async () => {
    const component = await buildComponent(
      'items-per-page="40" items-per-page-options="[20, 30, 40]"'
    );

    // TODO: I think iPPO isn't properly being coerced into an array, so the
    // property is actually just being set as the string value

    const select = await component.select;
    expect(await select.getProperty('value')).toEqual('40');

    const selectOptions = await component.selectOptions;
    expect(selectOptions.length).toBe(3);
    expect(await selectOptions[0].textContent).toEqual('20');
    expect(await selectOptions[1].textContent).toEqual('30');
    expect(await selectOptions[2].textContent).toEqual('40');
  });
});

const buildComponent = async (props: string) => {
  const page = await newE2EPage();
  await page.setContent(
    `<genesys-pagination-items-per-page ${props}></genesys-pagination-items-per-page>`
  );

  return new ItemsPerPageComponent(page);
};

class ItemsPerPageComponent {
  itemsPerPageChangedSpy: Promise<EventSpy>;

  constructor(public page: E2EPage) {
    this.itemsPerPageChangedSpy = this.page.spyOnEvent('itemsPerPageChanged');
  }

  get root(): Promise<E2EElement> {
    return this.page.find('genesys-pagination-items-per-page');
  }

  get select(): Promise<E2EElement> {
    return this.page.find('select');
  }

  get selectOptions(): Promise<E2EElement[]> {
    return this.select.then(s => s.findAll('option'));
  }

  async selectOption(value: string): Promise<void> {
    await this.page.select('select', value);
  }
}
