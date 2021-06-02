import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import { trackComponent } from '../../../usage-tracking';

import { GuxRadialLoadingContext } from './gux-radial-loading.types';

import modalComponentResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-radial-loading.less',
  tag: 'gux-radial-loading'
})
export class GuxRadialLoading {
  @Element()
  private root: HTMLElement;
  private getI18nValue: GetI18nValue;

  /**
   * The display context the component is in.
   */
  @Prop()
  context: GuxRadialLoadingContext = 'modal';

  /**
   * Localized text to provide an accessible label for the component.
   * If no screenreader text is provided, the localized string "Loading" will be used by default.
   */
  @Prop()
  screenreaderText: string = '';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.context });

    this.getI18nValue = await buildI18nForComponent(
      this.root,
      modalComponentResources
    );

    if (!this.screenreaderText) {
      this.screenreaderText = this.getI18nValue('loading');
    }
  }

  render(): JSX.Element {
    return (
      <div
        role="progressbar"
        aria-label={this.screenreaderText}
        class={`gux-spinner-container gux-${this.context}`}
      >
        <div role="presentation" class="gux-spin-circle" />
      </div>
    );
  }
}
