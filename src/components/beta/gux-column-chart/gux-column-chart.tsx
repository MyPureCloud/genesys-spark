import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import embed, { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { getDesiredLocale } from '../../../i18n';
import { trackComponent } from '../../../usage-tracking';

import { timeFormatLocale } from './gux-column-chart.locale';

@Component({
  styleUrl: 'gux-column-chart.less',
  tag: 'gux-column-chart'
})
export class GuxColumnChart {
  private defaultVisualizationSpec: VisualizationSpec = {};

  private defaultEmbedOptions: EmbedOptions = {
    actions: false,
    renderer: 'svg'
  };

  @Element()
  root: HTMLElement;

  @Prop()
  visualizationSpec: VisualizationSpec;

  @Prop()
  baseChartSpec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: 'bar',
    encoding: {
      x: { field: 'category', type: 'nominal' },
      y: { field: 'value', type: 'quantitative' },
      tooltip: { aggregate: 'count', type: 'quantitative' }
    }
  };

  @Prop()
  data: string;

  @Prop()
  embedOptions: EmbedOptions;

  columnChartSpec: string;

  @Watch('data')
  parseData() {
    if (this.data) {
      const data = JSON.parse(this.data);
      const chartSpec = Object.assign(this.baseChartSpec, { data });
      this.columnChartSpec = JSON.stringify(chartSpec);
    }
  }

  async componentWillRender(): Promise<void> {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <gux-visualization-beta
        visualization-spec={this.columnChartSpec}
      ></gux-visualization-beta>
    );
  }
}
