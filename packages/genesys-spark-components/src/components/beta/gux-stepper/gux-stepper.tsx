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
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import stepperResources from './i18n/en.json';

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
  private i18n: GetI18nValue;

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
  stepList: HTMLGuxStepBetaElement[] = [];

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

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, stepperResources);
  }

  private activateStep(
    stepId: string,
    stepList: HTMLGuxStepBetaElement[]
  ): void {
    if (stepId) {
      this.activeStepId = stepId;
    }

    stepList?.forEach(
      step => void step.guxSetActive(step.stepId === this.activeStepId)
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
        aria-orientation={this.orientation.toString()}
        aria-label={this.i18n('stepper')}
        role="group"
      >
        <slot onSlotchange={this.onSlotChange.bind(this)}></slot>
      </div>
    ) as JSX.Element;
  }
}
