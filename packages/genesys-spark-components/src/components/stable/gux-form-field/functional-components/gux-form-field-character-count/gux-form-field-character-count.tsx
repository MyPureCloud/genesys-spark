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
      aria-live="polite"
      class={{
        'gux-form-field-character-count': true,
        'gux-label-above': labelPosition === 'above',
        'gux-exceeded': characterCount > characterLimit
      }}
    >
      <span>{characterCount + '/' + characterLimit}</span>
    </div>
  ) as VNode;
};
