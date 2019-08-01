import { Component, h, Prop } from '@stencil/core';
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
  strategy: HighlightStrategy = HighlightStrategy.Start;

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

  private renderContains(): any[] | string {
    const parts = this.text.split(this.highlight);
    if (parts.length === 1) {
      return this.text;
    }

    const retVal = [];
    parts.forEach((part, index) => {
      const ind = this.text.indexOf(part);
      const start = this.text.startsWith(this.highlight);

      if (ind === 0 && start && parts.length !== 2) {
        return;
      }

      if (ind === 0 && start) {
        retVal.push(<strong>{this.highlight}</strong>);
      } else if (ind === 1) {
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

  private renderPrefixHighlight(): HTMLElement {
    return (
      <span>
        <strong>{this.highlight}</strong>
        {this.text.replace(this.highlight, '')}
      </span>
    );
  }
}
