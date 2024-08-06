import { newSpecPage } from '@test/specTestUtils';
import { GuxFormFieldLabelIndicator } from '../gux-form-field-label-indicator';

const components = [GuxFormFieldLabelIndicator];
const language = 'en';

describe('gux-form-field-label-indicator', () => {
  describe('#render', () => {
    [
      '<gux-form-field-label-indicator></gux-form-field-label-indicator>',
      '<gux-form-field-label-indicator variant="required" required="false"></gux-form-field-label-indicator>',
      '<gux-form-field-label-indicator variant="required" required="true"></gux-form-field-label-indicator>',
      '<gux-form-field-label-indicator variant="optional" required="false"></gux-form-field-label-indicator>',
      '<gux-form-field-label-indicator variant="optional" required="true"></gux-form-field-label-indicator>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
