import { newSpecPage } from '@test/specTestUtils';
import { GuxDisclosureButtonLegacy } from '../gux-disclosure-button';

const components = [GuxDisclosureButtonLegacy];
const language = 'en';

describe('gux-disclosure-button', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: '<gux-disclosure-button-legacy></gux-disclosure-button-legacy>',
      language
    });
    expect(page.rootInstance).toBeInstanceOf(GuxDisclosureButtonLegacy);
  });

  describe('#render', () => {
    [
      '<gux-disclosure-button-legacy></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy is-open></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy position="left"></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy is-open position="left"></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy position="right"></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy is-open position="right"></gux-disclosure-button-legacy>',
      '<gux-disclosure-button-legacy label="More Info"></gux-disclosure-button-legacy>'
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
          html: '<gux-disclosure-button-legacy></gux-disclosure-button-legacy>',
          language
        });
        const element = page.root as HTMLGuxDisclosureButtonLegacyElement;
        const button: HTMLButtonElement = element.shadowRoot.querySelector(
          '.gux-disclosure-button'
        );
        const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
        const icon = element.shadowRoot.querySelector('gux-icon');

        const activeEventSpy = jest.fn();
        element.addEventListener('active', activeEventSpy);

        expect(element.isOpen).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'fa/caret-right-solid');

        button.click();

        await page.waitForChanges();

        expect(element.isOpen).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'fa/caret-left-solid');
        expect(activeEventSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: true
          })
        );
      });

      it('should close when clicked', async () => {
        const page = await newSpecPage({
          components,
          html: '<gux-disclosure-button-legacy is-open></gux-disclosure-button-legacy>',
          language
        });
        const element = page.root as HTMLGuxDisclosureButtonLegacyElement;
        const button: HTMLButtonElement = element.shadowRoot.querySelector(
          '.gux-disclosure-button'
        );
        const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
        const icon = element.shadowRoot.querySelector('gux-icon');

        const activeEventSpy = jest.fn();
        element.addEventListener('active', activeEventSpy);

        expect(element.isOpen).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'fa/caret-left-solid');

        button.click();

        await page.waitForChanges();

        expect(element.isOpen).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'fa/caret-right-solid');
        expect(activeEventSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: false
          })
        );
      });
    });
  });
});
