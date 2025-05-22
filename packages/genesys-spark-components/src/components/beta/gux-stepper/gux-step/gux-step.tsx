import { Component, Element, Prop, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxStepStatus } from '../gux-stepper.types';
import { getAttributeFromParent } from '@utils/dom/get-attribute-from-parent';

/**
 * @slot title - Slot for gux-step-title element.
 * @slot helper - Optional slot for help message.
 */

@Component({
  tag: 'gux-step-beta',
  styleUrl: 'gux-step.scss',
  shadow: true
})
export class GuxStep {
  @Element()
  private root: HTMLElement;

  @Prop()
  status: GuxStepStatus = 'incomplete';

  @Prop()
  disabled: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  private getStatusIcon(status: GuxStepStatus): string {
    switch (status) {
      case 'incomplete':
        return 'fa/circle-check-solid';
      case 'completed':
        return 'fa/circle-check-solid';
      case 'active':
        return 'fa/circle-check-solid'; // to be changed to fa/circle-half-stroke-regular
      case 'error':
        return 'fa/hexagon-exclamation-solid';
      default:
        return 'fa/circle-check-solid'; // to be changed to fa/circle-dashed-regular
    }
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          [`gux-step-${getAttributeFromParent('gux-stepper-beta', this.root, 'orientation') ?? 'horizontal'}`]:
            true,
          [`gux-step-${this.status}`]: true,
          'gux-disabled': this.disabled
        }}
        aria-current={this.status.toString() === 'active'}
        aria-disabled={this.disabled.toString()}
      >
        <gux-icon
          size="small"
          icon-name={this.getStatusIcon(this.status)}
          decorative
        ></gux-icon>
        <div class="gux-step-information">
          <slot name="title"></slot>
          <gux-truncate maxLines={1}>
            <slot name="helper"></slot>
          </gux-truncate>
        </div>
      </div>
    ) as JSX.Element;
  }
}
