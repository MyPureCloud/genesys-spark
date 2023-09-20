import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import { trackComponent } from '@utils/tracking/usage';

import { GuxRadialLoadingContext } from './gux-radial-loading.types';
import { GuxSpinnerState } from './gux-radial-loading.functional';

import modalComponentResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-radial-loading.scss',
  tag: 'gux-radial-loading',
  shadow: true
})
export class GuxRadialLoading {
  private getI18nValue: GetI18nValue;

  @Element()
  private root: HTMLElement;

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
  }

  render(): JSX.Element {
    return (
      <GuxSpinnerState
        context={this.context}
        screenreaderText={this.screenreaderText || this.getI18nValue('loading')}
      />
    ) as JSX.Element;
  }
}
