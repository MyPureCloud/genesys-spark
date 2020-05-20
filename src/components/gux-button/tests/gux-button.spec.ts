import { newSpecPage } from '@stencil/core/testing';
import { ButtonAccents } from '../../../common-enums';
import { GuxButton } from '../gux-button';

describe('gux-button', () => {
  let component: GuxButton;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxButton],
      html: `<gux-button></gux-button>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxButton);
  });

  describe('Class Logic', () => {
    describe('getAccent', () => {
      it('returns secondary string for no accent defined', () => {
        expect((component as any).accentClass).toEqual(
          `gux-${ButtonAccents.Secondary}`
        );
      });

      it('returns primary if accent equals to primary', () => {
        component.accent = ButtonAccents.Primary;

        expect((component as any).accentClass).toEqual(
          `gux-${ButtonAccents.Primary}`
        );
      });

      it('returns secondary string for other accents defined', () => {
        component.accent = 'sss' as ButtonAccents;

        expect((component as any).accentClass).toEqual(
          `gux-${ButtonAccents.Secondary}`
        );
      });
    });
  });
});
