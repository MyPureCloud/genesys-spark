import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';

import { GuxFormFieldIndicatorMark } from '../../gux-form-field.types';

import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-form-field-label-indicator.scss',
  tag: 'gux-form-field-label-indicator'
})
export class GuxFormFieldLabelIndicator {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxFormFieldIndicatorMark = 'required';

  @Prop()
  required: boolean = false;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.variant });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    if (this.variant === 'optional' && !this.required) {
      return (
        <span class="gux-form-field-label-indicator-optional">
          ({this.i18n('optional')})
        </span>
      ) as JSX.Element;
    } else if (this.variant === 'required' && this.required) {
      return (
        <span
          class="gux-form-field-label-indicator-required"
          aria-hidden="true"
        >
          *
        </span>
      ) as JSX.Element;
    } else {
      return null;
    }
  }
}
