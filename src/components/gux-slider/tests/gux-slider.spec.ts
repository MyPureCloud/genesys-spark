import { newSpecPage } from '@stencil/core/testing';
import { GuxSlider } from '../gux-slider';

describe('gux-slider', () => {
  let component: GuxSlider;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSlider],
      html: `<gux-slider></gux-slider>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSlider);
  });

  it('when event value is within range set value', async () => {
    component.updateValue({ target: { value: 50 } });
    expect(component.value).toEqual(50);
  });

  it('when event value is bigger than max set value to max', async () => {
    component.updateValue({ target: { value: 120 } });
    expect(component.value).toEqual(100);
  });

  it('when event value is smaller than min set value to min', async () => {
    component.updateValue({ target: { value: -10 } });
    expect(component.value).toEqual(0);
  });

  it('when event value is negative and within range then set value', async () => {
    component.min = -10;
    component.updateValue({ target: { value: -5 } });
    expect(component.value).toEqual(-5);
  });

  it('when event value is not number set value to 0', async () => {
    component.updateValue({ target: { value: 'aabb' } });
    expect(component.value).toEqual(0);
  });
});
