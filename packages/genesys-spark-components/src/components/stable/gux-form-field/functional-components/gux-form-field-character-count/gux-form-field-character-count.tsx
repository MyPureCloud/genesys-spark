import { FunctionalComponent, h, VNode } from '@stencil/core';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import { GetI18nValue } from '../../../../../i18n';

interface GuxFormFieldCharacterCountProps {
  characterLimit: number;
  characterCount: number;
  labelPosition: GuxFormFieldLabelPosition;
  i18n: GetI18nValue;
}

export const GuxFormFieldCharacterCount: FunctionalComponent<
  GuxFormFieldCharacterCountProps
> = ({ characterLimit, characterCount, labelPosition, i18n }): VNode => {
  const getI18nText = (key: string) => {
    if (i18n) {
      return i18n(key);
    }
  };

  return (
    <div
      class={{
        'gux-form-field-character-count': true,
        'gux-label-above': labelPosition === 'above',
        'gux-exceeded': characterCount > characterLimit
      }}
    >
      <span aria-hidden="true">{characterCount + '/' + characterLimit}</span>
      <gux-screen-reader-beta aria-live="polite">
        {characterCount} {getI18nText('of')} {characterLimit}
        {getI18nText('charactersRemaining')}
      </gux-screen-reader-beta>
    </div>
  ) as VNode;
};
