jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxAvatarGroup } from '../gux-avatar-group';
import { logWarn } from '../../../../utils/error/log-error';

const components = [GuxAvatarGroup];
const language = 'en';

describe('gux-avatar-group', () => {
  it('should build', async () => {
    const html = `
      <gux-avatar-group-beta avatar-limit="4">
          <button>
            <gux-avatar-beta name="Monse Garcia Limon"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Daragh King">
            </gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Gavin Everett"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Jason Evans"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="JR Stith"
              ></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Katie Bobbe"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Thomas Dillon"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Dorka Hajnal"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Memo Lopez"
              ></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Monse Garcia Limon"></gux-avatar-beta>
          </button>
    </gux-avatar-group-beta>
      `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxAvatarGroup);
  });

  describe('#render', () => {
    [
      `<gux-avatar-group-beta avatar-limit="4">
          <button>
            <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Daragh King">
            </gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Gavin Everett"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Jason Evans"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="JR Stith"
              ></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Katie Bobbe"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Thomas Dillon"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Dorka Hajnal"></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Memo Lopez"
              ></gux-avatar-beta>
          </button>
          <button>
            <gux-avatar-beta name="Monse Garcia Limon"></gux-avatar-beta>
          </button>
    </gux-avatar-group-beta>`,
      `
      <gux-avatar-group-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Daragh King">
            </gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Gavin Everett"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Jason Evans"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="JR Stith"
            ></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Katie Bobbe"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Thomas Dillon"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Dorka Hajnal"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Memo Lopez"
            ></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
      <gux-avatar-focusable-beta>
        <a href="www.google.com" target="_blank">
          <gux-avatar-beta name="Monse Garcia Limon"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>
    </gux-avatar-group-beta>`,
      `<gux-avatar-group-beta>
  <gux-avatar-beta name="Alan Butler"></gux-avatar-beta>
  <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
  <gux-avatar-beta name="Elliot Fitzgerald"></gux-avatar-beta>
  <gux-avatar-beta name="Greg Hayes"></gux-avatar-beta>
  <gux-avatar-beta name="Iseult Jones"></gux-avatar-beta>
  <gux-avatar-beta name="John King"></gux-avatar-beta>
</gux-avatar-group-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('warnings', () => {
    it(`should log warning for group without gux-avatar`, async () => {
      const html = `<gux-avatar-group-beta></gux-avatar-group-beta>`;
      await newSpecPage({ components: [GuxAvatarGroup], html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});
