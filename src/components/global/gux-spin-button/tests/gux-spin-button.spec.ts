import { GuxSpinButton } from '../gux-spin-button';

describe('gux-spin-button', () => {
  let element: GuxSpinButton;
  beforeEach(async () => {
    element = new GuxSpinButton();
    await element.componentWillLoad();
    element.min = 15;
    element.max = 60;
    element.step = 15;
  });
  it('should build', () => {
    expect(element).toBeTruthy();
  });
  it('incrementing should change value by step', () => {
    element.value = 30;
    element.incrementValue(true);
    expect(element.value).toEqual(45);
  });
  it('incrementing should change value by step', () => {
    element.value = 30;
    element.incrementValue(false);
    expect(element.value).toEqual(15);
  });
  it('incrementing should not go above max value', () => {
    element.value = 60;
    element.incrementValue(true);
    expect(element.value).toEqual(60);
  });
  it('incrementing values not in step should not go above max value', () => {
    element.value = 55;
    element.incrementValue(true);
    expect(element.value).toEqual(60);
  });
  it('decrementing should change value by step', () => {
    element.value = 30;
    element.incrementValue(false);
    expect(element.value).toEqual(15);
  });
  it('decrementing should not go below mmin value', () => {
    element.value = 15;
    element.incrementValue(false);
    expect(element.value).toEqual(15);
  });
  it('decrementing values not in step should not go below min value', () => {
    element.value = 17;
    element.incrementValue(false);
    expect(element.value).toEqual(15);
  });
  it('setting a value too low and incrementing goes to min', () => {
    element.value = 0;
    element.incrementValue(true);
    expect(element.value).toEqual(15);
  });
  it('setting a value too low and decrementing goes to min', () => {
    element.value = 0;
    element.incrementValue(false);
    expect(element.value).toEqual(15);
  });
  it('setting a value too high and incrementing goes to max', () => {
    element.value = 90;
    element.incrementValue(true);
    expect(element.value).toEqual(60);
  });
  it('setting a value too high and decrementing goes to max', () => {
    element.value = 90;
    element.incrementValue(false);
    expect(element.value).toEqual(60);
  });
  it('validate fails if value is NaN', async () => {
    element.value = NaN;
    const valid = await element.validate();
    expect(valid).toBeFalsy();
  });
  it('validate fails if value is greater than max', async () => {
    element.value = 90;
    const valid = await element.validate();
    expect(valid).toBeFalsy();
  });
  it('validate fails if value is less than min', async () => {
    element.value = 5;
    const valid = await element.validate();
    expect(valid).toBeFalsy();
  });
  it('validate fails if value is not valid increment of step', async () => {
    element.value = 25;
    const valid = await element.validate();
    expect(valid).toBeFalsy();
  });
  it('validate passes for happy path', () => {
    element.value = 30;
    const valid = element.validate();
    expect(valid).toBeTruthy();
  });
  it('validate does not set error message if ignoreValidation set', async () => {
    element.value = NaN;
    element.ignoreValidation = true;
    const valid = await element.validate();
    expect(valid).toBeFalsy();
    expect(element.errorMessage).toBeFalsy();
  });
});
