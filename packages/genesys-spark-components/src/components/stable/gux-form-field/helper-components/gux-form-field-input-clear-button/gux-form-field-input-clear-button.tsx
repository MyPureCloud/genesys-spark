import { Component, Element, h, JSX } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';

import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-form-field-input-clear-button.scss',
  tag: 'gux-form-field-input-clear-button',
  shadow: { delegatesFocus: true }
})
export class GuxFormFieldInputClearButton {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <button tabIndex={-1} type="button" aria-label={this.i18n('clear')}>
        <gux-icon
          icon-name="fa/xmark-large-regular"
          decorative
          size="small"
        ></gux-icon>
        <gux-tooltip-beta visual-only>
          <div slot="content">{this.i18n('clear')}</div>
        </gux-tooltip-beta>
      </button>
    ) as JSX.Element;
  }
}
