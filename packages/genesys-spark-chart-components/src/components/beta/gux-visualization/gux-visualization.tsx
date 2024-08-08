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
import embed, { EmbedOptions, VisualizationSpec } from 'vega-embed';
import { Spec as VgSpec } from 'vega';

import { getDesiredLocale } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import { timeFormatLocale } from './gux-visualization.locale';

@Component({
  styleUrl: 'gux-visualization.scss',
  tag: 'gux-visualization-beta',
  shadow: true
})
export class GuxVisualization {
  private chartContainer: HTMLDivElement;
  private defaultVisualizationSpec: VisualizationSpec = {};

  private defaultEmbedOptions: EmbedOptions = {
    actions: false,
    renderer: 'svg'
  };

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

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  handleChartClick(_name: string, value: unknown) {
    this.chartClicked.emit(value);
  }

  async componentDidRender(): Promise<void> {
    const locale = getDesiredLocale(this.root);

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
        {
          timeFormatLocale: timeFormatLocale[locale]
        },
        this.defaultEmbedOptions,
        this.embedOptions,
        patchOption
      )
    ).then(result => {
      result.view.addSignalListener('chartClick', (name, value) =>
        this.handleChartClick(name, value)
      );
    });
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
