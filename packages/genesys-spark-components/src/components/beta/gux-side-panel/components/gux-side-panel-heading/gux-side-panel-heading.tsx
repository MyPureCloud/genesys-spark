import { Component, Element, h, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxSidePanelHeadingLevel,
  GuxSidePanelHeadingTag
} from '../../gux-side-panel.types';

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
  size: 'default' | 'large' = 'default';

  private headingTag: GuxSidePanelHeadingTag;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.headingTag = `h${this.level}` as GuxSidePanelHeadingTag;
  }

  render(): JSX.Element {
    return (
      <this.headingTag class={this.size}>
        <gux-truncate>
          <slot />
        </gux-truncate>
      </this.headingTag>
    ) as JSX.Element;
  }
}
