import { Component, h, Prop } from '@stencil/core';
import { getFuzzyReplacements, matchesFuzzy } from '../../../search';
import { HighlightStrategy } from './highlight-enums';

@Component({
  tag: 'gux-text-highlight'
})
export class GuxTextHighlight {
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
  strategy: string = HighlightStrategy.Start;

  render() {
    if (this.highlight && this.text) {
      return this.renderHighlight();
    } else {
      return this.text;
    }
  }

  private renderHighlight(): any {
    switch (this.strategy) {
      case HighlightStrategy.Start:
        return this.renderStartsWith();
      case HighlightStrategy.Contains:
        return this.renderContains();
      case HighlightStrategy.Fuzzy:
        return this.renderFuzzy();
      default:
        return this.text;
    }
  }

  private renderStartsWith(): HTMLElement | string {
    if (this.text.startsWith(this.highlight)) {
      return this.renderPrefixHighlight();
    }

    return this.text;
  }

  private renderContains(): HTMLElement[] | string {
    const parts = this.text.split(this.highlight);
    if (parts.length === 1) {
      return this.text;
    }

    const start = this.text.startsWith(this.highlight);

    if (parts.length === 2 && start) {
      return [<strong>{this.highlight}</strong>, parts[1]];
    }

    const retVal = [];

    parts.forEach((part, index) => {
      if (index === 0 && start) {
        return;
      }

      if (index === 0) {
        retVal.push(part);
      } else if (index === 1) {
        retVal.push(<strong>{this.highlight}</strong>);
        retVal.push(part);
        if (index !== parts.length - 1) {
          retVal.push(<strong>{this.highlight}</strong>);
        }
      } else {
        retVal.push(part);

        if (index !== parts.length - 1) {
          retVal.push(<strong>{this.highlight}</strong>);
        }
      }
    });

    return retVal;
  }

  private renderFuzzy(): HTMLElement | string {
    if (!matchesFuzzy(this.highlight, this.text)) {
      return this.text;
    }

    const result = getFuzzyReplacements(this.highlight);
    let retVal = this.text;

    result.forEach(replacement => {
      const found = this.text.match(replacement);
      retVal = retVal.replace(replacement, `<strong>${found[0]}</strong>`);
    });

    return <span innerHTML={retVal} />;
  }

  private renderPrefixHighlight(): HTMLElement {
    return (
      <span>
        <strong>{this.highlight}</strong>
        {this.text.replace(this.highlight, '')}
      </span>
    );
  }
}
