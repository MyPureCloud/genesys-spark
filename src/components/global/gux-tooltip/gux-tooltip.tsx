import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';
import { getPositionRelativeToTarget } from '../../../common-utils';

@Component({
  styleUrl: 'gux-tooltip.less',
  tag: 'gux-tooltip'
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
    offsetX: 0,
    offsetY: 24,
    width: undefined
  };

  initialWidth: number;

  mouseenterHandler: () => void;
  mouseleaveHandler: () => void;
  scrollHandler: () => void;

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

  @Listen('window:resize,window:scroll', { capture: true })
  onWindowEvent () {
    this.tooltipRect = getPositionRelativeToTarget(this.tooltipEl, this.forNode, this.positionOptions);
  }

  get computedClass () {
    return `gux-tooltip ${this.isShown ? 'shown' : ''}`;
  }

  get computedStyle () {
    return {
      top: (this.tooltipRect && this.tooltipRect.hasOwnProperty('top')) ? (this.tooltipRect.top + 'px') : '',
      right: (this.tooltipRect && this.tooltipRect.hasOwnProperty('right')) ? (this.tooltipRect.right + 'px') : '',
      bottom: (this.tooltipRect && this.tooltipRect.hasOwnProperty('bottom')) ? (this.tooltipRect.bottom + 'px') : '',
      left: (this.tooltipRect && this.tooltipRect.hasOwnProperty('left')) ? (this.tooltipRect.left + 'px') : ''
    };
  }

  componentDidLoad () {
    this.forNode = document.getElementById(this.for) || this.root.parentElement;

    this.tooltipRect = getPositionRelativeToTarget(this.tooltipEl, this.forNode, this.positionOptions);

    this.mouseenterHandler = () => { this.show(); };
    this.mouseleaveHandler = () => { this.hide(); };

    this.forNode.addEventListener('mouseenter', this.mouseenterHandler);
    this.forNode.addEventListener('mouseleave', this.mouseleaveHandler);

    this.positionOptions.width = this.tooltipEl.getBoundingClientRect().width + 6;
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
