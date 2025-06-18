import { FunctionalComponent, h, VNode } from '@stencil/core';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldCharacterCountProps {
  showCharacterCount: boolean;
  characterLimit: number;
  characterCount: number;
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldCharacterCount: FunctionalComponent<
  GuxFormFieldCharacterCountProps
> = ({
  showCharacterCount,
  characterLimit,
  characterCount,
  labelPosition
}): VNode => {
  return (
    <div
      class={{
        'gux-form-field-character-count': true,
        'gux-show-character-count': showCharacterCount,
        'gux-label-above': labelPosition === 'above'
      }}
    >
      {characterCount + '/' + characterLimit}
    </div>
  ) as VNode;
};
