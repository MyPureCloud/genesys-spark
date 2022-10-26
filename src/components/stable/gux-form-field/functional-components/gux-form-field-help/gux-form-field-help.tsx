import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldHelpProps {
  show: boolean;
}

export const GuxFormFieldHelp: FunctionalComponent<GuxFormFieldHelpProps> = (
  { show },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-help': true,
        'gux-show': show
      }}
    >
      <div class="gux-message">{children}</div>
    </div>
  ) as VNode;
};
