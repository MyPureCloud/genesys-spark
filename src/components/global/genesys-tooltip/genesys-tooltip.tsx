import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';
import { getPositionRelativeToTarget } from '../../../common-utils';

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
  for: string;
  /**
   * Tooltip text.
   */
  @Prop()
  text: string;
  /**
   * Delay before hide. (Set to 0 to none)
   */
  @Prop()
  delay: number = 1000;
  /**
   * Tooltip current state.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  isShown: boolean = false;

  @State()
  tooltipRect: { [s: string]: number; };

  forNode: HTMLElement;
  tooltipEl: HTMLElement;

  positionOptions = {
    offsetY: 24
  };

  mouseenterHandler: () => void;
  mouseleaveHandler: () => void;
  delayTimeout: NodeJS.Timer;

  /**
   * Triggered when the tooltip is shown
   */
  @Event() shown: EventEmitter;
  /**
   * Triggered when the tooltip is hidden
   */
  @Event() hidden: EventEmitter;

  emitEvent () {
    if (this.isShown) {
      this.shown.emit();
    } else {
      this.hidden.emit();
    }
  }

  /**
   * Shows the tooltip.
   * @param duration Time before
   */
  @Method()
  show () {
    this.delayTimeout = setTimeout(() => {
      this.tooltipRect = getPositionRelativeToTarget(this.tooltipEl, this.forNode, this.positionOptions);
      this.isShown = true;
      this.emitEvent();
    }, this.delay);
  }

  /**
   * Hides the tooltip.
   */
  @Method()
  hide () {
    clearTimeout(this.delayTimeout);
    this.isShown = false;
    this.emitEvent();
  }

  @Listen('window:resize')
  resize () {
    this.tooltipRect = getPositionRelativeToTarget(this.tooltipEl, this.forNode, this.positionOptions);
  }

  get computedClass () {
    return `genesys-tooltip ${this.isShown ? 'shown' : ''}`;
  }

  get computedStyle () {
    return {
      top: this.tooltipRect ? (this.tooltipRect.top + 'px') : '',
      right: this.tooltipRect ? (this.tooltipRect.right + 'px') : '',
      bottom: this.tooltipRect ? (this.tooltipRect.bottom + 'px') : '',
      left: this.tooltipRect ? (this.tooltipRect.left + 'px') : '',
      width: this.tooltipRect ? (this.tooltipRect.width + 'px') : '',
      height: this.tooltipRect ? (this.tooltipRect.height + 'px') : ''
    };
  }

  componentDidLoad () {
    this.forNode = document.getElementById(this.for) || this.root.parentElement;
    this.tooltipRect = getPositionRelativeToTarget(this.tooltipEl, this.forNode, this.positionOptions);

    this.mouseenterHandler = () => { this.show(); };
    this.mouseleaveHandler = () => { this.hide(); };

    this.forNode.addEventListener('mouseenter', this.mouseenterHandler);
    this.forNode.addEventListener('mouseleave', this.mouseleaveHandler);
  }

  componentDidUnload () {
    this.forNode.removeEventListener('mouseenter', this.mouseenterHandler);
    this.forNode.removeEventListener('mouseleave', this.mouseleaveHandler);
  }

  render() {
    return (
      <div class={this.computedClass} ref={el => this.tooltipEl = el} style={this.computedStyle}>{this.text}</div>
    );
  }
}
