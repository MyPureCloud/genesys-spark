import { Component, Element, Prop, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxStepperOrientation } from './gux-stepper.types';

/**
 * @slot - for gux-step elements
 */

@Component({
  tag: 'gux-stepper-beta',
  styleUrl: 'gux-stepper.scss',
  shadow: true
})
export class GuxStepper {
  @Element()
  private root: HTMLElement;

  /**
   *  Specifies horizontal or vertical orientation of steps.
   */
  @Prop()
  orientation: GuxStepperOrientation = 'horizontal';

  @Prop()
  disabled: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-stepper': true,
          [`gux-stepper-${this.orientation}`]: true,
          'gux-disabled': this.disabled
        }}
      >
        <slot />
      </div>
    ) as JSX.Element;
  }
}
