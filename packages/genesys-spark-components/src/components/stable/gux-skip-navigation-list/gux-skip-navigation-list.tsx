import { Component, Element, h, JSX } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import translationResources from './i18n/en.json';

/**
 * @slot - collection of gux-navigation-list-item elements
 */

@Component({
  styleUrl: 'gux-skip-navigation-list.scss',
  tag: 'gux-skip-navigation-list',
  shadow: { delegatesFocus: true }
})
export class GuxSkipNavigationList {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <div class="gux-container">
        <nav aria-label={this.i18n('navigationName')}>
          <ul role="list">
            <slot />
          </ul>
        </nav>
      </div>
    ) as JSX.Element;
  }
}
