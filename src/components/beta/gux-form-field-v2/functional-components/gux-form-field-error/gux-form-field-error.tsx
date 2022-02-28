import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldErrorProps {
  hasError: boolean;
}

export const GuxFormFieldError: FunctionalComponent<GuxFormFieldErrorProps> = (
  { hasError },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-error': true,
        'gux-show': hasError
      }}
    >
      <gux-icon icon-name="alert-warning-octogon" decorative></gux-icon>
      <div class="gux-message">{children}</div>
    </div>
  ) as VNode;
};
