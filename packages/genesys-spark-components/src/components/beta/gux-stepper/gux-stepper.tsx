import {
  Component,
  Element,
  Prop,
  Listen,
  State,
  Watch,
  h
} from '@stencil/core';
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

  /**
   * stepId of the currently active step.
   */
  @Prop({ mutable: true })
  activeStep: string;

  @Prop()
  disabled: boolean = false;

  @State()
  stepList: HTMLGuxStepBetaElement[] = [];

  @Listen('internalactivatestep')
  onInternalActiveStepChange(event: CustomEvent): void {
    event.stopPropagation();
    const stepId = event?.detail as string;
    this.activateStep(stepId, this.stepList);
  }

  @Watch('activeStep')
  watchActiveStep(newStepId: string) {
    this.activateStep(newStepId, this.stepList);
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.activateStep(this.activeStep, this.stepList);
  }

  private activateStep(
    stepId: string,
    stepList: HTMLGuxStepBetaElement[]
  ): void {
    if (stepId) {
      this.activeStep = stepId;
    }

    stepList?.forEach(
      step => void step.guxSetActive(step.stepId === this.activeStep)
    );
  }

  private onSlotChange(): void {
    const slot = this.root.shadowRoot.querySelector('slot');
    this.stepList = slot.assignedElements() as HTMLGuxStepBetaElement[];
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-stepper': true,
          [`gux-stepper-${this.orientation}`]: true
        }}
        aria-orientation={this.orientation}
      >
        <slot onSlotchange={this.onSlotChange.bind(this)}></slot>
      </div>
    ) as JSX.Element;
  }
}
