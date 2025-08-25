/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Component,
  Element,
  h,
  JSX,
  Prop,
  Event,
  EventEmitter
} from '@stencil/core';
import embed, { EmbedOptions, VisualizationSpec, Result } from 'vega-embed';
import { Spec as VgSpec } from 'vega';
import { time } from '@redsift/d3-rs-intl';

import * as sparkIntl from '../../../genesys-spark-utils/intl';
// Remove with this ticket https://inindca.atlassian.net/browse/COMUI-2598

import { trackComponent } from '@utils/tracking/usage';

import * as VisualizationColorUtil from '../../../utils/theme/color-palette';

@Component({
  styleUrl: 'gux-visualization.scss',
  tag: 'gux-visualization-beta',
  shadow: true
})
export class GuxVisualization {
  private chartContainer: HTMLDivElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private defaultVisualizationSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: { type: 'bar' },
    config: {
      axis: {
        labelColor: VisualizationColorUtil.DEFAULT_LABEL_COLOR,
        domainColor: VisualizationColorUtil.DEFAULT_DOMAIN_COLOR
      }
    }
  };

  private defaultEmbedOptions: EmbedOptions = {
    actions: false,
    renderer: 'svg'
  };

  private vegaEmbedResult?: Result;

  @Event()
  chartComponentReady: EventEmitter;

  @Event()
  chartClicked: EventEmitter;

  @Element()
  root: HTMLElement;

  @Prop()
  visualizationSpec: VisualizationSpec;

  @Prop()
  embedOptions: EmbedOptions;

  // Adds an aria-label to the SVG element for screen readers
  @Prop()
  screenreaderDescription: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  handleChartClick(_name: string, value: unknown) {
    this.chartClicked.emit(value);
  }

  async componentDidRender(): Promise<void> {
    const { d3: timeFormatLocale } = time([
      sparkIntl.determineDisplayLocale(this.root)
    ]);
    const patchOption = {
      patch: (visSpec: VgSpec): VgSpec => {
        if (!visSpec?.signals) {
          visSpec.signals = [];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        visSpec.signals.push({
          name: 'chartClick',
          value: 0,
          on: [{ events: '*:mousedown', update: 'datum' }]
        });
        return visSpec;
      }
    };

    await embed(
      this.chartContainer,
      Object.assign({}, this.defaultVisualizationSpec, this.visualizationSpec),
      Object.assign(
        { timeFormatLocale },
        this.defaultEmbedOptions,
        this.embedOptions,
        patchOption
      )
    ).then(result => {
      // Finalize any previous embed, which will remove event listeners and other items to prevent memory leaks
      this.vegaEmbedResult?.finalize();
      this.vegaEmbedResult = result;

      result.view.addSignalListener('chartClick', (name, value) =>
        this.handleChartClick(name, value)
      );

      // Set aria-label on the SVG if screenreaderDescription is provided
      if (this.screenreaderDescription) {
        const svgElement = this.chartContainer.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('aria-label', this.screenreaderDescription);
        }
      }
    });
  }

  disconnectedCallback(): void {
    this.vegaEmbedResult?.finalize();
    this.vegaEmbedResult = undefined;
  }

  componentDidLoad() {
    this.chartComponentReady.emit();
  }

  render(): JSX.Element {
    return (
      <div
        class="gux-chart-container"
        ref={el => (this.chartContainer = el)}
      ></div>
    ) as JSX.Element;
  }
}
