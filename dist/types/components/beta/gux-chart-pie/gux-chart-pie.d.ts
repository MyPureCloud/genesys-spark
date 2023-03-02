import { JSX } from '../../../stencil-public-runtime';
import { EmbedOptions } from 'vega-embed';
export declare class GuxPieChart {
  root: HTMLElement;
  private visualizationSpec;
  private baseChartSpec;
  /**
   * Data to be rendered in the chart.
   * Data field names must match the values you set in xFieldName and yFieldName
   */
  chartData: Record<string, any>;
  includeLegend: boolean;
  legendPosition: 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none';
  legendTitle: string;
  colorFieldName: string;
  outerRadius: number;
  labelRadius: number;
  labelField: string;
  embedOptions: EmbedOptions;
  parseData(): void;
  componentWillLoad(): void;
  render(): JSX.Element;
}
