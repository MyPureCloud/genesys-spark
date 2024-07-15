import { Component, Element, h, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxSideSheetHeadingLevel,
  GuxSideHeadingTag
} from './gux-side-sheet.types';

@Component({
  tag: 'gux-side-sheet-heading-beta',
  styleUrl: 'gux-side-sheet-heading.scss',
  shadow: true
})
export class GuxSideSheetHeading {
  @Element()
  private root: HTMLElement;
  /**
   * Heading level, 1-6.
   */
  @Prop()
  level: GuxSideSheetHeadingLevel = 1;

  @Prop()
  text: string;

  private HeadingTag: GuxSideHeadingTag;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.HeadingTag = `h${this.level}` as GuxSideHeadingTag;
  }

  render(): JSX.Element {
    return (
      <this.HeadingTag>
        <slot />
      </this.HeadingTag>
    ) as JSX.Element;
  }
}
