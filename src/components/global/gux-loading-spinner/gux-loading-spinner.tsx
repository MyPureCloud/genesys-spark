import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-loading-spinner.less',
  tag: 'gux-loading-spinner'
})
export class GuxLoadingSpinner {

  render() {
    return (
      <div>
        <div class="shapeshifter play"/>
      </div>
    );
  }
}
