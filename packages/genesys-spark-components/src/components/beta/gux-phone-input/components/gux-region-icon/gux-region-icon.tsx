import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { spritesheetDataUrl } from './sprite-utils/sprites.generated';

@Component({
  styleUrl: 'gux-region-icon.scss',
  tag: 'gux-region-icon',
  shadow: true
})
export class GuxRegionIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  region: string;

  @Prop()
  screenreaderText: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <span
        role={this.screenreaderText ? 'img' : ''}
        class={'gux-flag-' + this.region?.toLowerCase()}
        style={{ backgroundImage: `url(${spritesheetDataUrl})` }}
        aria-label={this.screenreaderText}
      />
    ) as JSX.Element;
  }
}
