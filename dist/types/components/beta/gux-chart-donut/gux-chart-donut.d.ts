import { JSX } from '../../../stencil-public-runtime';
import { EmbedOptions } from 'vega-embed';
export declare class GuxDonutChart {
  root: HTMLElement;
  private visualizationSpec;
  private tooltipSpec;
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
  innerRadius: number;
  labelRadius: number;
  labelField: string;
  gauge: boolean;
  centerText: string;
  centerSubText: string;
  showTooltip: boolean;
  tooltipOptions: EmbedOptions;
  legendX: number;
  legendY: number;
  legendFontSize: number;
  legendSymbolSize: number;
  embedOptions: EmbedOptions;
  parseData(): void;
  componentWillLoad(): void;
  render(): JSX.Element;
}
