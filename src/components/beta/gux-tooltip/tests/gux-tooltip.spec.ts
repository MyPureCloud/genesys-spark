import { newSpecPage } from '@stencil/core/testing';
import * as Utils from '../../../common-utils';
import { GuxTooltip } from '../gux-tooltip';

describe('gux-tooltip', () => {
  let component: GuxTooltip;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTooltip],
      html: `<gux-tooltip></gux-tooltip>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTooltip);
  });

  describe('Class Logic', () => {
    describe('methods', () => {
      it('resize', () => {
        spyOn(Utils, 'getPositionRelativeToTarget');
        component.onWindowEvent();
        expect(Utils.getPositionRelativeToTarget).toHaveBeenCalled();
      });
    });
  });
});
