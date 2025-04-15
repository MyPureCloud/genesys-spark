import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';
import {
  spritesheetDataUrl,
  GuxFlagCode
} from './sprite-utils/sprites.generated';

@Component({
  styleUrl: 'gux-flag-icon.scss',
  tag: 'gux-flag-icon-beta',
  shadow: true
})
export class GuxFlagIconBeta {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  flag: GuxFlagCode;

  @Prop()
  screenreaderText: string;

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <span
        role="img"
        class={'gux-flag-' + this.flag?.toLowerCase()}
        style={{ backgroundImage: `url(${spritesheetDataUrl})` }}
        aria-label={this.getLabel()}
      />
    ) as JSX.Element;
  }

  private getLabel(): string {
    return (
      this.screenreaderText ||
      this.i18n(this.flag) ||
      this.i18n('unknownRegion')
    );
  }
}
