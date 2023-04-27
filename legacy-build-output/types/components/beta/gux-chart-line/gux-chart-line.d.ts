import { JSX } from '../../../stencil-public-runtime';
import { EmbedOptions } from 'vega-embed';
export declare class GuxLineChart {
  root: HTMLElement;
  private visualizationSpec;
  private baseChartSpec;
  /**
   * Data to be rendered in the chart.
   * Data field names must match the values you set in xFieldName and yFieldName
   */
  chartData: Record<string, any>;
  /**
   * If true, then make Axis tick label 45 degrees
   */
  xTickLabelSlant: boolean;
  includeLegend: boolean;
  legendPosition: 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none';
  includeDataPointMarkers: boolean;
  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. xFieldName of "category" will map any "category" fields in chartData to the x-axis
   */
  xFieldName: string;
  /**
   * Title to display along the x-axis
   */
  xAxisTitle: string;
  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. yFieldName of "value" will map any "value" fields in chartData to the y-axis
   */
  yFieldName: string;
  /**
   * Title to display along the y-axis
   */
  yAxisTitle: string;
  /**
   * Title to display above the optional legend
   */
  legendTitle: string;
  colorFieldName: string;
  strokeDash: boolean;
  interpolation: string;
  embedOptions: EmbedOptions;
  parseData(): void;
  componentWillLoad(): void;
  render(): JSX.Element;
}
