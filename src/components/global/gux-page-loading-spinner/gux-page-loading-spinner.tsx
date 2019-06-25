import { Component, h } from '@stencil/core';

@Component({
  styleUrl: 'gux-page-loading-spinner.less',
  tag: 'gux-page-loading-spinner'
})
export class GuxPageLoadingSpinner {
  render() {
    return <div class="page-loading-spinner gux-page-loading-animation" />;
  }
}
