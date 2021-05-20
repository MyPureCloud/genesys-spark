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

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.context });

    this.getI18nValue = await buildI18nForComponent(
      this.root,
      modalComponentResources
    );
  }

  render(): JSX.Element {
    return (
      <div
        role="alert"
        aria-live="assertive"
        class={`gux-spinner-container gux-${this.context}`}
      >
        <div class="gux-spin-circle" />
        <span class="gux-loading-alert">{this.getI18nValue('loading')}</span>
      </div>
    );
  }
}
