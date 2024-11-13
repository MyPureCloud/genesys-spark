import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [];

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-avatar-group', () => {
  describe('#render', () => {
    [
      `<gux-avatar-group-beta>
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
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Daragh King">
          </gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Gavin Everett"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Jason Evans"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="JR Stith"
          ></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Katie Bobbe"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Thomas Dillon"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Dorka Hajnal"></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Memo Lopez"
          ></gux-avatar-beta>
      </a>
      <a href="www.google.com" target="_blank">
        <gux-avatar-beta name="Monse Garcia Limon"></gux-avatar-beta>
      </a>
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
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-avatar-group-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
