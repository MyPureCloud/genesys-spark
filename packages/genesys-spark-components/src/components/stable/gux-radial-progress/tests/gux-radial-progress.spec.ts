jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxRadialProgress } from '../gux-radial-progress';

import { logWarn } from '../../../../utils/error/log-error';

const components = [GuxRadialProgress];
const language = 'en';

describe('gux-radial-progress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-radial-progress></gux-radial-progress>`,
      language
    });

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

  describe('Screenreader text requirements', () => {
    it('should log a warning message if displaying progress and no screenreader text is passed in', async () => {
      await newSpecPage({
        components,
        html: '<gux-radial-progress value="10" max="10"></gux-radial-progress>',
        language
      });

      expect(logWarn).toHaveBeenCalled();
    });

    it('should not log a warning message if displaying progress and screenreader text is passed in', async () => {
      await newSpecPage({
        components,
        html: '<gux-radial-progress value="10" max="10" screenreader-text="Uploading file"></gux-radial-progress>',
        language
      });

      expect(logWarn).not.toHaveBeenCalled();
    });
  });
});
