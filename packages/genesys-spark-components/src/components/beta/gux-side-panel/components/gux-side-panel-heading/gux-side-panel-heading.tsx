import { Component, Element, h, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxSidePanelHeadingLevel,
  GuxSidePanelHeadingTag
} from '../../gux-side-panel.types';

import { GuxIconIconName } from '../../../../stable/gux-icon/gux-icon.types';

/**
 * @slot - The heading text
 */

@Component({
  tag: 'gux-side-panel-heading',
  styleUrl: 'gux-side-panel-heading.scss',
  shadow: true
})
export class GuxSidePanelHeading {
  @Element()
  private root: HTMLElement;
  /**
   * Heading level, 1-6.
   */
  @Prop()
  level: GuxSidePanelHeadingLevel = 1;

  @Prop()
  iconName: GuxIconIconName;

  private headingTag: GuxSidePanelHeadingTag;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.headingTag = `h${this.level}` as GuxSidePanelHeadingTag;
  }

  render(): JSX.Element {
    return (
      <this.headingTag>
        {this.iconName && (
          <gux-icon decorative size="medium" icon-name={this.iconName} />
        )}
        <gux-truncate>
          <slot />
        </gux-truncate>
      </this.headingTag>
    ) as JSX.Element;
  }
}
