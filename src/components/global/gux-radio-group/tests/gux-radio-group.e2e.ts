import { newE2EPage } from '@stencil/core/testing';

describe('gux-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radio-group></gux-radio-group>');
    const element = await page.find('gux-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('switches between states when clicking different radios', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <gux-radio-group name="test-group">
        <gux-radio id="r1" label="radio 1" value="first"></gux-radio>
        <gux-radio id="r2" label="radio 2" value="second"></gux-radio>
      </gux-radio-group>
      `);

    const radio1 = await page.find('#r1');
    const radio2 = await page.find('#r2');

    const label1 = await radio1.find('label');
    const label2 = await radio2.find('label');

    expect(await radio1.getProperty('checked')).toEqual(false);

    await label1.click();
    await page.waitForChanges();
    await(page.waitFor(1000))

    expect(await radio1.getProperty('checked')).toEqual(true);

    await label2.click();
    console.log(await page.evaluate(() => document.querySelector('#r1').querySelector('input').checked))
    await page.waitForChanges();
    await(page.waitFor(1000))
    expect(await radio1.getProperty('checked')).toEqual(false);
  });

  // it('should propagate its name to child radios', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent(`
  //     <gux-radio-group name="group-name">
  //       <gux-radio id="r1" label="radio 1"></gux-radio>
  //       <gux-radio id="r2" label="radio 2" name="not-group-name"></gux-radio>
  //     </gux-radio-group>
  //     `);

  //   const radio1 = await page.find('#r1');
  //   const radio2 = await page.find('#r2');
  //   expect(await radio1.getProperty('name')).toEqual('group-name');
  //   expect(await radio2.getProperty('name')).toEqual('group-name');
  // });
});
