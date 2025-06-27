import { FunctionalComponent, h, VNode } from '@stencil/core';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldCharacterCountProps {
  characterLimit: number;
  characterCount: number;
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldCharacterCount: FunctionalComponent<
  GuxFormFieldCharacterCountProps
> = ({ characterLimit, characterCount, labelPosition }): VNode => {
  return (
    <div
      class={{
        'gux-form-field-character-count': true,
        'gux-label-above': labelPosition === 'above',
        'gux-exceeded': characterCount > characterLimit
      }}
    >
      {characterCount + '/' + characterLimit}
    </div>
  ) as VNode;
};
