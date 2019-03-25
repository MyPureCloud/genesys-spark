import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-spinner.less',
  tag: 'gux-spinner'
})
export class GuxSpinner {

  render() {
    return (
      <div>
        <div class="shapeshifter play"/>
      </div>
    );
  }
}
