import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldErrorProps {
  show: boolean;
}

export const GuxFormFieldError: FunctionalComponent<GuxFormFieldErrorProps> = (
  { show },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-error': true,
        'gux-show': show
      }}
    >
      <gux-icon icon-name="fa/hexagon-exclamation-solid" decorative></gux-icon>
      <div class="gux-message">{children}</div>
    </div>
  ) as VNode;
};
