import { newSpecPage } from '@stencil/core/testing';
import { GuxDisclosureButton } from '../gux-disclosure-button';

const components = [GuxDisclosureButton];
const language = 'en';

describe('gux-disclosure-button', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: '<gux-disclosure-button></gux-disclosure-button>',
      language
    });
    expect(page.rootInstance).toBeInstanceOf(GuxDisclosureButton);
  });

  describe('#render', () => {
    [
      '<gux-disclosure-button></gux-disclosure-button>',
      '<gux-disclosure-button is-open></gux-disclosure-button>',
      '<gux-disclosure-button position="left"></gux-disclosure-button>',
      '<gux-disclosure-button is-open position="left"></gux-disclosure-button>',
      '<gux-disclosure-button position="right"></gux-disclosure-button>',
      '<gux-disclosure-button is-open position="right"></gux-disclosure-button>',
      '<gux-disclosure-button label="More Info"></gux-disclosure-button>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('events', () => {
    describe('active', () => {
      it('should open when clicked', async () => {
        const page = await newSpecPage({
          components,
          html: '<gux-disclosure-button></gux-disclosure-button>',
          language
        });
        const element = page.root as HTMLGuxDisclosureButtonElement;
        const button = element.shadowRoot.querySelector(
          '.gux-disclosure-button'
        );
        const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
        const icon = element.shadowRoot.querySelector('gux-icon');

        const activeEventSpy = jest.fn();
        element.addEventListener('active', activeEventSpy);

        expect(element.isOpen).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-right');

        button.click();

        await page.waitForChanges();

        expect(element.isOpen).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-left');
        expect(activeEventSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: true
          })
        );
      });

      it('should close when clicked', async () => {
        const page = await newSpecPage({
          components,
          html: '<gux-disclosure-button is-open></gux-disclosure-button>',
          language
        });
        const element = page.root as HTMLGuxDisclosureButtonElement;
        const button = element.shadowRoot.querySelector(
          '.gux-disclosure-button'
        );
        const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
        const icon = element.shadowRoot.querySelector('gux-icon');

        const activeEventSpy = jest.fn();
        element.addEventListener('active', activeEventSpy);

        expect(element.isOpen).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-left');

        button.click();

        await page.waitForChanges();

        expect(element.isOpen).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-right');
        expect(activeEventSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: false
          })
        );
      });
    });
  });
});
