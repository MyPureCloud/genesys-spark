import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';
import { GuxDismissButtonPosition } from './gux-dismiss-button.types';

@Component({
  styleUrl: 'gux-dismiss-button.scss',
  tag: 'gux-dismiss-button',
  shadow: { delegatesFocus: true }
})
export class GuxDismissButton {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  position: GuxDismissButtonPosition = 'absolute';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.position });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <gux-button-slot
        accent="ghost"
        class={this.position == 'inherit' ? 'gux-inherit' : undefined}
      >
        <button type="button" title={this.i18n('dismiss')}>
          <div class="gux-icon-container">
            <gux-icon icon-name="close" decorative></gux-icon>
          </div>
        </button>
      </gux-button-slot>
    ) as JSX.Element;
  }
}
