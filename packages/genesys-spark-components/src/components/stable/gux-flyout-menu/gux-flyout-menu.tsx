import { Component, Element, h, Host, JSX, Listen, State } from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  arrow,
  flip,
  offset,
  shift
} from '@floating-ui/dom';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { trackComponent } from '@utils/tracking/usage';

import { HTMLGuxMenuItemElement, hideDelay } from './gux-menu/gux-menu.common';
import translationResources from './i18n/en.json';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

/**
 * @slot target - target element
 * @slot menu - gux-menu element
 */

@Component({
  styleUrl: 'gux-flyout-menu.scss',
  tag: 'gux-flyout-menu',
  shadow: true
})
export class GuxFlyoutMenu {
  private hideDelayTimeout: ReturnType<typeof setTimeout>;
  private targetElement: HTMLSpanElement;
  private arrowElement: HTMLDivElement;
  private menuContentElement: HTMLDivElement;
  private announceElement: HTMLGuxAnnounceBetaElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;
  i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @State()
  private isShown: boolean = false;
  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    event.stopPropagation();

    if (this.isShown) {
      switch (event.key) {
        case 'Escape':
        case 'ArrowLeft':
        case 'ArrowUp':
          this.root.focus();
          return;

        case 'ArrowDown':
          event.preventDefault();
          this.focusOnMenu();
          return;

        case 'Enter':
          this.hideDelayTimeout = afterNextRenderTimeout(() => {
            this.focusOnMenu();
          });
          return;
      }
    }
  }

  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    event.stopPropagation();
    switch (event.key) {
      case ' ':
        if (this.root === event.target) {
          this.focusOnMenu();
        } else {
          this.hideDelayTimeout = afterNextRenderTimeout(() => {
            this.root.focus();
          });
        }
        return;
    }
  }

  @Listen('mouseenter')
  onmouseenter() {
    this.show();
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hide();
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    if (event.detail !== 0) {
      this.hide();
    }
    this.root.focus();
  }

  @Listen('focusin')
  onFocusin() {
    if (!this.isShown) {
      void this.announceElement.guxAnnounce(this.i18n('onTargetFocus'));
    }

    this.show();
  }

  @Listen('focusout')
  onFocusout() {
    this.hide();
  }

  private show(): void {
    clearTimeout(this.hideDelayTimeout);
    this.isShown = true;
  }

  private hide(): void {
    if (this.isShown) {
      this.hideDelayTimeout = setTimeout(() => {
        this.isShown = false;
      }, hideDelay);
    }
  }

  private runUpdatePosition(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }

    if (this.root.isConnected) {
      this.cleanupUpdatePosition = autoUpdate(
        this.targetElement,
        this.menuContentElement,
        () => this.updatePosition(),
        {
          ancestorScroll: true,
          elementResize: true,
          animationFrame: true,
          ancestorResize: true
        }
      );
    } else {
      this.disconnectedCallback();
    }
  }

  private updatePosition(): void {
    // This is 12 because this makes the arrow look aligned
    const arrowLen = 12;

    if (this.root) {
      void computePosition(this.targetElement, this.menuContentElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [
          offset(16),
          flip(),
          shift(),
          arrow({
            element: this.arrowElement,
            padding: 16
          })
        ]
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.menuContentElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });

        const side = placement.split('-')[0];

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[side];

        const arrowRotation = {
          top: 0,
          right: 90,
          bottom: 180,
          left: -90
        }[side];

        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow;

          Object.assign(this.arrowElement?.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen}px`,
            transform: `rotate(${arrowRotation}deg)`
          });
        }
      });
    }
  }

  private focusOnMenu(): void {
    if (this.menuContentElement.contains(document.activeElement)) {
      return;
    }

    this.hideDelayTimeout = afterNextRenderTimeout(() => {
      void this.announceElement.guxAnnounce(this.i18n('onMenuFocus'));
    });

    const menu = this.root.querySelector('gux-menu');
    const menuItems = Array.from(menu.children);
    const nextFocusableElement = menuItems[0] as HTMLGuxMenuItemElement;

    void nextFocusableElement.guxFocus();
  }

  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  componentDidLoad(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    } else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  render(): JSX.Element {
    return (
      <Host tabIndex={0} aria-haspopup="true">
        <gux-announce-beta
          ref={el => (this.announceElement = el)}
        ></gux-announce-beta>

        <span ref={el => (this.targetElement = el)}>
          <slot name="target" />
        </span>
        <div
          class={{
            'gux-flyout-menu-content': true,
            'gux-shown': this.isShown
          }}
          ref={el => (this.menuContentElement = el)}
        >
          <div
            ref={(el: HTMLDivElement) => (this.arrowElement = el)}
            class="gux-arrow"
          >
            <div class="gux-arrow-caret"></div>
          </div>
          <slot name="menu" />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
