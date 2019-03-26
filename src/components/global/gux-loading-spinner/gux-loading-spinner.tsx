import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-loading-spinner.less',
  tag: 'gux-loading-spinner'
})
export class GuxLoadingSpinner {

  render() {
    return (
      <div class="loading-spinner gux-loading-animation"/>
    );
  }
}
