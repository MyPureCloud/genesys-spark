import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { spritesheetDataUrl } from './sprite-utils/sprites.generated';

@Component({
  styleUrl: 'gux-flag-icon.scss',
  tag: 'gux-flag-icon-beta',
  shadow: true
})
export class GuxFlagIconBeta {
  @Element()
  root: HTMLElement;

  @Prop()
  flag: string;

  @Prop()
  screenreaderText: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <span
        role={this.screenreaderText ? 'img' : ''}
        class={'gux-flag-' + this.flag?.toLowerCase()}
        style={{ backgroundImage: `url(${spritesheetDataUrl})` }}
        aria-label={this.screenreaderText}
      />
    ) as JSX.Element;
  }
}
