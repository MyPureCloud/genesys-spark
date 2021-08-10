import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import embed, { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { getDesiredLocale } from '../../../i18n';
import { trackComponent } from '../../../usage-tracking';

import { timeFormatLocale } from './gux-visualization.locale';

@Component({
  styleUrl: 'gux-visualization.less',
  tag: 'gux-visualization-beta'
})
export class GuxVisualization {
  // private defaultVisualizationSpec: VisualizationSpec = {};

  private defaultEmbedOptions: EmbedOptions = {
    actions: false,
    renderer: 'svg'
  };

  @Element()
  root: HTMLElement;

  @Prop()
  chartId: string;

  @Prop()
  visualizationSpec: string;

  @Prop({ mutable: true })
  spec: VisualizationSpec;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('visualizationSpec')
  parseSpec() {
    if (this.visualizationSpec) {
      this.spec = JSON.parse(this.visualizationSpec);
    }
  }
  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    const locale = getDesiredLocale(this.root);
    this.parseSpec();
    embed(
      this.root,
      Object.assign({}, this.spec),
      Object.assign(
        {
          timeFormatLocale: timeFormatLocale[locale]
        },
        this.defaultEmbedOptions,
        this.embedOptions
      )
    );
  }

  render(): JSX.Element {
    return (
      <Host id={this.chartId}>
        <div id={this.chartId}></div>
      </Host>
    );
  }
}
