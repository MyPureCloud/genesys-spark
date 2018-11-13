import { Component, Element, Listen, Method, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'genesys-tooltip.less',
  tag: 'genesys-tooltip'
})
export class GenesysTooltip {
  @Element() root: HTMLStencilElement;

  /**
   * Element's id.
   */
  @Prop()
  parent: string;
  /**
   * Tooltip text.
   */
  @Prop()
  text: string;
  /**
   * Delay before hide. (Set to 0 to none)
   */
  @Prop()
  timeout: number = 1000;

  @State()
  top: string;
  @State()
  right: string;
  @State()
  bottom: string;
  @State()
  left: string;
  @State()
  width: string;

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
    this.setPosition();
    this.tooltipEl.classList.add('shown');
  }

  /**
   * Hides the tooltip.
   */
  @Method()
  hide () {
    setTimeout(() => {
      this.tooltipEl.classList.remove('shown');
    }, this.timeout);
  }

  @Listen('window:resize')
  resize () {
    this.setPosition();
  }

  get computedStyle () {
    return {
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width
    }
  }

  setPosition () {
    const parentRect = this.parentNode.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    this.top = '';
    this.right = '';
    this.bottom = '';
    this.left = '';
    this.width = '';
    // Top behavior
    if ((parentRect.bottom + tooltipRect.height + 24) >= window.innerHeight) {
      this.bottom = `${window.innerHeight - parentRect.top + 24}px`;
    } else {
      this.top = `${parentRect.top + parentRect.height + 24}px`;
    }
    // Left behavior
    if (window.innerWidth <= tooltipRect.width) {
      this.left = `0px`;
      this.width = `${window.innerWidth}px`;
    } else if ((parentRect.left + tooltipRect.width) >= window.innerWidth) {
      this.right = `${window.innerWidth - parentRect.right}px`;
    } else {
      this.left = `${parentRect.left}px`;
    }
  }

  componentDidLoad () {
    this.parentNode = document.getElementById(this.parent) || this.root.parentElement;
    this.setPosition();

    this.mouseoverHandler = () => {
      this.show();
    };
    this.parentNode.addEventListener('mouseover', this.mouseoverHandler);

    if (this.timeout !== 0) {
      this.mouseoutHandler = () => {
        this.hide();
      };
      this.parentNode.addEventListener('mouseout', this.mouseoutHandler);
    }
  }

  componentDidUnload () {
    this.parentNode.removeEventListener('mouseover', this.mouseoverHandler);
    if (this.timeout !== 0) {
      this.parentNode.removeEventListener('mouseout', this.mouseoutHandler);
    }
  }

  render() {
    return (
      <div class="genesys-tooltip" ref={el => this.tooltipEl = el} style={this.computedStyle}>{this.text}</div>
    );
  }
}
