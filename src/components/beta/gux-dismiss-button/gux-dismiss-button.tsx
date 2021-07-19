import { Component, Element, h, JSX } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-dismiss-button.less',
  tag: 'gux-dismiss-button-beta',
  shadow: true
})
export class GuxDismissButton {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <button type="button" title={this.i18n('dismiss')}>
        <gux-icon
          icon-name="close"
          screenreader-text={this.i18n('dismiss')}
        ></gux-icon>
      </button>
    );
  }
}
