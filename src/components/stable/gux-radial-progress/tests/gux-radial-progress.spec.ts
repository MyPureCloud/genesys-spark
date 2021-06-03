import { newSpecPage } from '@stencil/core/testing';
import { GuxRadialProgress } from '../gux-radial-progress';

describe('gux-radial-progress', () => {
  let component: GuxRadialProgress;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxRadialProgress],
      html: `<gux-radial-progress></gux-radial-progress>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxRadialProgress);
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
    ].forEach((input, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({
          components: [GuxRadialProgress],
          html: input,
          language: 'en'
        });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
