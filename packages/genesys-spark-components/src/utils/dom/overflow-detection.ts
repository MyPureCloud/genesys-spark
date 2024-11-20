import { detectOverflow } from '@floating-ui/dom';

export function overflowDetection() {
  return {
    name: 'overflowDetection',
    async fn(state) {
      const overflowData = await detectOverflow(state, {
        boundary: 'clippingAncestors',
        elementContext: 'reference'
      });

      if (state.placement.includes('bottom') && overflowData.bottom > 0) {
        return {
          y: state.y - overflowData.bottom
        };
      }

      if (state.placement.includes('top') && overflowData.top > 0) {
        return {
          y: state.y + overflowData.top
        };
      }

      return {};
    }
  };
}
