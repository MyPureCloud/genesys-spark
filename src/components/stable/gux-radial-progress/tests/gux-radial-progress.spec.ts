import { newSpecPage } from '@stencil/core/testing';
import { GuxRadialProgress } from '../gux-radial-progress';

const components = [GuxRadialProgress];
const language = 'en';

describe('gux-radial-progress', () => {
  let component: GuxRadialProgress;

  beforeEach(async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-radial-progress></gux-radial-progress>`,
      language
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    const html = `<gux-radial-progress></gux-radial-progress>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRadialProgress);
  });

  describe('#render', () => {
    [
      '<gux-radial-progress screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="0" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="10" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="100" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="123" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="200" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="10" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="10" max="10" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="test" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="-123" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="200" max="100" screenreader-text="Uploading file"></gux-radial-progress>',
      '<gux-radial-progress value="10" max="test" screenreader-text="Uploading file"></gux-radial-progress>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
