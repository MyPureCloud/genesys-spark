/**
 * Global tooltip manager to enforce uniqueness of tooltips.
 * Ensures only one tooltip is visible at a time, similar to native title attribute behavior.
 */
class TooltipManager {
  private currentTooltip: HTMLElement | null = null;
  private hideCurrentTooltipCallback: (() => void) | null = null;

  /**
   * Register a tooltip as the currently active one.
   * If another tooltip is already active, it will be hidden first.
   */
  register(tooltipElement: HTMLElement, hideCallback: () => void): void {
    // If there's already a tooltip showing, hide it first
    if (this.currentTooltip && this.currentTooltip !== tooltipElement) {
      this.hideCurrent();
    }

    this.currentTooltip = tooltipElement;
    this.hideCurrentTooltipCallback = hideCallback;
  }

  /**
   * Hide the currently active tooltip if it matches the provided element.
   */
  unregister(tooltipElement: HTMLElement): void {
    if (this.currentTooltip === tooltipElement) {
      this.currentTooltip = null;
      this.hideCurrentTooltipCallback = null;
    }
  }

  /**
   * Force hide the current tooltip regardless of which element it is.
   */
  hideCurrent(): void {
    if (this.hideCurrentTooltipCallback) {
      this.hideCurrentTooltipCallback();
      this.currentTooltip = null;
      this.hideCurrentTooltipCallback = null;
    }
  }

  /**
   * Check if a specific tooltip is currently active.
   */
  isCurrent(tooltipElement: HTMLElement): boolean {
    return this.currentTooltip === tooltipElement;
  }
}

// Export a singleton instance
export const tooltipManager = new TooltipManager();
