import {
  Component,
  Element,
  Prop,
  State,
  Event,
  EventEmitter,
  Listen,
  Method,
  h
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxStepStatus } from '../gux-stepper.types';

/**
 * @slot title - Slot for gux-step-title element.
 * @slot helper - Optional slot for help message.
 */

@Component({
  tag: 'gux-step',
  styleUrl: 'gux-step.scss',
  shadow: true
})
export class GuxStep {
  @Element()
  private root: HTMLElement;

  @Prop()
  status: GuxStepStatus = 'incomplete';

  /**
   * Step id for the step
   */
  @Prop()
  stepId: string;

  @Prop()
  disabled: boolean = false;

  @State()
  active: boolean = false;

  @Event()
  internalactivatestep: EventEmitter<string>;

  @Listen('internalactivestepchange')
  onClick() {
    if (!this.active && !this.disabled) {
      this.internalactivatestep.emit(this.stepId);
    }
  }

  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  private getStatusIcon(status: GuxStepStatus): string {
    switch (status) {
      case 'incomplete':
        return 'fa/circle-dashed-regular';
      case 'completed':
        return 'fa/circle-check-solid';
      case 'error':
        return 'fa/hexagon-exclamation-solid';
      default:
        return 'fa/circle-dashed-regular';
    }
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-stepper': true,
          [`gux-step-${this.status}`]: true,
          'gux-disabled': this.disabled,
          'gux-active': this.active
        }}
        aria-current={this.active.toString()}
        aria-disabled={this.disabled.toString()}
      >
        <gux-icon
          size="small"
          icon-name={
            this.active
              ? 'fa/circle-half-stroke-regular'
              : this.getStatusIcon(this.status)
          }
          decorative
        ></gux-icon>
        <div class="gux-step-information">
          <slot name="title"></slot>
          <gux-truncate maxLines={2}>
            <slot name="helper"></slot>
          </gux-truncate>
        </div>
      </div>
    ) as JSX.Element;
  }
}
