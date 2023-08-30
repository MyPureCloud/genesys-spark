import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  getFuzzyReplacements,
  matchesFuzzy
} from '../../../utils/string/search';

import { trackComponent } from '@utils/tracking/usage';

import { GuxTextHighlightStrategy } from './gux-text-highlight.types';

@Component({
  styleUrl: 'gux-text-highlight.scss',
  tag: 'gux-text-highlight',
  shadow: true
})
export class GuxTextHighlight {
  @Element()
  private root: HTMLElement;

  /**
   * The value to display.
   */
  @Prop()
  text: string;

  /**
   * The text to highlight.
   */
  @Prop()
  highlight: string;

  /**
   * The way the text should be highlighted.
   */
  @Prop()
  strategy: GuxTextHighlightStrategy = 'start';

  /**
   * The highlight color should be dimmed
   */
  @Prop()
  dimmed: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    if (this.highlight && this.text) {
      switch (this.strategy) {
        case 'start':
          return this.renderStartsWith();
        case 'contains':
          return this.renderContains();
        case 'fuzzy':
          return this.renderFuzzy();
      }
    }

    return (
      <span class={{ 'gux-dimmed': this.dimmed }}>{this.text}</span>
    ) as JSX.Element;
  }

  private renderStartsWith(): HTMLSpanElement {
    if (this.text.toLowerCase().startsWith(this.highlight.toLowerCase())) {
      const highlight = this.text.substring(0, this.highlight.length);
      const after = this.text.substring(this.highlight.length);

      return (
        <span class={{ 'gux-dimmed': this.dimmed }}>
          <mark>{highlight}</mark>
          {after}
        </span>
      ) as HTMLSpanElement;
    }

    return (
      <span class={{ 'gux-dimmed': this.dimmed }}>{this.text}</span>
    ) as HTMLSpanElement;
  }

  private renderContains(): HTMLSpanElement {
    const html = {
      highlighted: '',
      remaining: this.text
    };

    while (
      html.remaining.toLowerCase().includes(this.highlight.toLowerCase())
    ) {
      const index = html.remaining
        .toLowerCase()
        .indexOf(this.highlight.toLowerCase());
      const before = html.remaining.substring(0, index);
      const highlight = html.remaining.substring(
        index,
        index + this.highlight.length
      );
      html.highlighted += before + `<mark>${highlight}</mark>`;
      html.remaining = html.remaining.substring(index + highlight.length);
    }

    return (
      <span
        class={{ 'gux-dimmed': this.dimmed }}
        innerHTML={html.highlighted + html.remaining}
      />
    ) as HTMLSpanElement;
  }

  private renderFuzzy(): HTMLSpanElement {
    if (matchesFuzzy(this.highlight, this.text)) {
      const html: { highlighted: string; remaining: string } =
        getFuzzyReplacements(this.highlight).reduce(
          (acc, needle) => {
            const { 0: highlight, index, input } = acc.remaining.match(needle);
            const before = input.substring(0, index);
            const highlighted = `${
              acc.highlighted + before
            }<mark>${highlight}</mark>`;
            const remaining = input.substring(index + highlight.length);

            return { highlighted, remaining };
          },
          {
            highlighted: '',
            remaining: this.text
          }
        );

      return (
        <span
          class={{ 'gux-dimmed': this.dimmed }}
          innerHTML={html.highlighted + html.remaining}
        />
      ) as HTMLSpanElement;
    }

    return (
      <span class={{ 'gux-dimmed': this.dimmed }}>{this.text}</span>
    ) as HTMLSpanElement;
  }
}
