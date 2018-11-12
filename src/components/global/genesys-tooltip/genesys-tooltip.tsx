import { Component, Element, Method, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-tooltip.less',
  tag: 'genesys-tooltip'
})
export class GenesysTooltip {
  @Element() root: HTMLStencilElement;

  /**
   * Element selector.
   */
  @Prop()
  parent: string;
  /**
   * Tooltip text.
   */
  @Prop()
  text: string;

  parentNode: HTMLElement;
  tooltipEl: HTMLElement;

  mouseoverHandler: () => void;
  mouseoutHandler: () => void;

  /**
   * Shows the tooltip.
   * @param duration Time before
   */
  @Method()
  show () {
    const rect = this.parentNode.getBoundingClientRect();
    this.tooltipEl.style.top = `calc(${rect.top + rect.height}px + 24px)`;
    this.tooltipEl.style.left = `${rect.left}px`;
    this.tooltipEl.classList.add('shown');
  }

  /**
   * Hides the tooltip.
   */
  @Method()
  hide () {
    this.tooltipEl.classList.remove('shown');
  }



  componentDidLoad () {
    this.parentNode = document.querySelector(this.parent) || this.root.parentElement;
    this.mouseoverHandler = () => {
      this.show();
    };
    this.mouseoutHandler = () => {
      this.hide();
    };

    this.parentNode.addEventListener('mouseover', this.mouseoverHandler);
    this.parentNode.addEventListener('mouseout', this.mouseoutHandler);
  }

  componentDidUnload () {
    this.parentNode.removeEventListener('mouseover', this.mouseoverHandler);
    this.parentNode.removeEventListener('mouseout', this.mouseoutHandler);
  }

  render() {
    return (
      <div class="genesys-tooltip" ref={el => this.tooltipEl = el}>{this.text}</div>
    );
  }
}
