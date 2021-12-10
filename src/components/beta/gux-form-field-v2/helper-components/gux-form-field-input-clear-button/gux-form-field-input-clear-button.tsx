import { Component, Element, h, JSX } from '@stencil/core';

import { trackComponent } from '../../../../../usage-tracking';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';

import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-form-field-input-clear-button.less',
  tag: 'gux-form-field-input-clear-button',
  shadow: { delegatesFocus: true }
})
export class Gux {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <button type="button" title={this.i18n('clear')}>
        <gux-icon icon-name="close" decorative></gux-icon>
      </button>
    ) as JSX.Element;
  }
}
