import { Component, JSX, h, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';
import { GuxCloudLogomarkVariant } from './gux-cloud-logomark.types';

@Component({
  styleUrl: 'gux-cloud-logomark.scss',
  tag: 'gux-cloud-logomark-beta',
  shadow: true
})
export class GuxCloudLogomark {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  variant: GuxCloudLogomarkVariant = 'primary';

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    trackComponent(this.root, { variant: this.variant });
  }

  render(): JSX.Element {
    return (
      <svg
        class={`gux-${this.variant}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        aria-label={this.i18n('genesysCloudLogomark')}
        role="img"
      >
        <path class="gux-background" d="M50 0H0V50H50V0Z" />
        <path
          class="gux-foreground"
          d="M29.283 11.5234H20.6388C17.1517 11.5234 14.325 14.3502 14.325 17.8372V17.8967C14.325 21.3838 17.1517 24.2105 20.6388 24.2105H29.283C32.77 24.2105 35.5968 21.3838 35.5968 17.8967V17.8372C35.5968 14.3502 32.77 11.5234 29.283 11.5234Z"
        />
        <path
          class="gux-foreground"
          d="M23.4827 32.6137C23.4827 29.3995 26.0884 26.7937 29.3027 26.7937H39.878C43.0922 26.7937 45.698 29.3995 45.698 32.6137C45.698 35.828 43.0922 38.4337 39.878 38.4337H29.3027C26.0884 38.4337 23.4827 35.828 23.4827 32.6137Z"
        />
        <path
          class="gux-foreground"
          d="M4.29688 32.6137C4.29688 29.3995 6.90258 26.7937 10.1168 26.7937H15.0798C18.2942 26.7937 20.8999 29.3995 20.8999 32.6137C20.8999 35.828 18.2942 38.4337 15.0798 38.4337H10.1168C6.90258 38.4337 4.29688 35.828 4.29688 32.6137Z"
        />
      </svg>
    );
  }
}
