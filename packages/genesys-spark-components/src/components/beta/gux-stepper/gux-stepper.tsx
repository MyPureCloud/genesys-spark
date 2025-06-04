import {
  Component,
  Element,
  Prop,
  Listen,
  State,
  Watch,
  h,
  EventEmitter,
  Event
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
  activeStepId: string;

  @Prop()
  disabled: boolean = false;

  @State()
  stepList: HTMLGuxStepElement[] = [];

  @Event()
  guxactivestepchange: EventEmitter<string>;

  @Listen('internalactivatestep')
  onInternalActiveStepChange(event: CustomEvent): void {
    event.stopPropagation();
    const stepId = event?.detail as string;
    this.activateStep(stepId, this.stepList);
  }

  @Watch('activeStepId')
  watchActiveStep(newStepId: string) {
    this.activateStep(newStepId, this.stepList);
    this.guxactivestepchange.emit(newStepId);
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.activateStep(this.activeStepId, this.stepList);

    if (this.activeStepId) {
      this.guxactivestepchange.emit(this.activeStepId);
    }
  }

  private activateStep(stepId: string, stepList: HTMLGuxStepElement[]): void {
    if (stepId) {
      this.activeStepId = stepId;
    }

    stepList?.forEach(
      step => void step.guxSetActive(step.stepId === this.activeStepId)
    );
  }

  private onSlotChange(): void {
    const slot = this.root.shadowRoot.querySelector('slot');
    this.stepList = slot.assignedElements() as HTMLGuxStepElement[];
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-stepper': true,
          [`gux-stepper-${this.orientation}`]: true
        }}
      >
        <slot onSlotchange={this.onSlotChange.bind(this)}></slot>
      </div>
    ) as JSX.Element;
  }
}
