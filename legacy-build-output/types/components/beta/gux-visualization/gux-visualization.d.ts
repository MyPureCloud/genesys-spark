import { JSX, EventEmitter } from '../../../stencil-public-runtime';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';
export declare class GuxVisualization {
  private chartContainer;
  private defaultVisualizationSpec;
  private defaultEmbedOptions;
  chartComponentReady: EventEmitter;
  chartClicked: EventEmitter;
  root: HTMLElement;
  visualizationSpec: VisualizationSpec;
  embedOptions: EmbedOptions;
  componentWillLoad(): void;
  handleChartClick(_name: string, value: unknown): void;
  componentDidRender(): Promise<void>;
  componentDidLoad(): void;
  render(): JSX.Element;
}
