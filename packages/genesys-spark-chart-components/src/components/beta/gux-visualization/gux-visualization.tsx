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
    actions: true,
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
          on: [
            { events: 'rect:mousedown', update: 'datum' },
            { events: 'arc:mousedown', update: 'datum' },
            { events: 'line:mousedown', update: 'datum' },
            { events: 'symbol:mousedown', update: 'datum' }
          ]
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
