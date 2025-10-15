import { Component, JSX, h, Prop, Element, Watch, State } from '@stencil/core';
import {
  GuxIllustrationBackgroundShape,
  GuxIllustrationStatus,
  GuxIllustrationVariant
} from './gux-illustration.types';
import { getBaseSvgHtml } from './gux-illustration.service';
import { trackComponent } from '@utils/tracking/usage';

@Component({
  assetsDirs: ['illustrations'],
  styleUrl: 'gux-illustration.scss',
  tag: 'gux-illustration-beta',
  shadow: true
})
export class GuxIllustration {
  private variantSvgHtml: string;
  private statusSvgHtml: string;
  private backgroundShapeSvgHtml: string;

  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxIllustrationVariant;

  @Prop()
  status: GuxIllustrationStatus;

  @Prop()
  backgroundShape: GuxIllustrationBackgroundShape = 'solid-wide';

  @State()
  private variantHtml: string;

  @State()
  private statusHtml: string;

  @State()
  private backgroundShapeHtml: string;

  @Watch('variant')
  async prepVariant(variant: string): Promise<void> {
    if (variant) {
      this.variantSvgHtml = await getBaseSvgHtml(variant, 'variants');
      this.variantHtml = this.variantSvgHtml;
    }
  }

  @Watch('status')
  async prepStatus(status: string): Promise<void> {
    if (status) {
      this.statusSvgHtml = await getBaseSvgHtml(status, 'status');
      this.statusHtml = this.statusSvgHtml;
    }
  }

  @Watch('backgroundShape')
  async prepBackgroundShape(backgroundShape: string): Promise<void> {
    if (backgroundShape) {
      this.backgroundShapeSvgHtml = await getBaseSvgHtml(
        backgroundShape,
        'background-shapes'
      );
      this.backgroundShapeHtml = this.backgroundShapeSvgHtml;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.variant });

    await Promise.all([
      this.prepVariant(this.variant),
      this.prepStatus(this.status),
      this.prepBackgroundShape(this.backgroundShape)
    ]);
  }

  render(): JSX.Element {
    return (
      <div class="gux-illustration">
        {this.backgroundShapeHtml && (
          <div
            class={{
              'gux-background-shape': true,
              [`gux-background-shape-${this.backgroundShape}`]: true
            }}
            innerHTML={this.backgroundShapeHtml}
          ></div>
        )}
        {this.variantHtml && (
          <div
            class="gux-illustration-variant"
            innerHTML={this.variantHtml}
          ></div>
        )}
        {this.statusHtml && (
          <div
            class={{
              'gux-illustration-status': true,
              [`gux-illustration-status-${this.status}`]: true
            }}
            innerHTML={this.statusHtml}
          ></div>
        )}
      </div>
    ) as JSX.Element;
  }
}
