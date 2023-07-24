jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logError: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';

import { GuxBreadcrumbs } from '../gux-breadcrumbs';
import { GuxBreadcrumbItem } from '../breadcrumb-item/gux-breadcrumb-item';

import { logError } from '../../../../utils/error/log-error';

const components = [GuxBreadcrumbs, GuxBreadcrumbItem];
const language = 'en';

describe('gux-breadcrumbs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    [
      `<gux-breadcrumbs></gux-breadcrumbs>`,
      `
        <gux-breadcrumbs>
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs>
      `,
      `
        <gux-breadcrumbs>
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Current</gux-breadcrumb-item>
        </gux-breadcrumbs>
      `,
      `
        <gux-breadcrumbs accent="primary">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs>
      `,
      `
        <gux-breadcrumbs accent="secondary">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs>
      `,
      `
        <gux-breadcrumbs accent="invalid">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxBreadcrumbs);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('valid slotting', () => {
    it('should not log an error if a gux-breadcrumb-item component is slotted in a gux-breadcrumb component', async () => {
      await newSpecPage({
        components,
        html: `
          <gux-breadcrumbs>
            <gux-breadcrumb-item>Grandparent</gux-breadcrumb-item>
            <gux-breadcrumb-item>Parent</gux-breadcrumb-item>
            <gux-breadcrumb-item>Child</gux-breadcrumb-item>
          </gux-breadcrumbs>
        `,
        language
      });

      expect(logError).not.toHaveBeenCalled();
    });

    it('should log an error if a gux-breadcrumb-item component is slotted in an element other than a gux-breadcrumb component', async () => {
      await newSpecPage({
        components,
        html: `
          <div>
            <gux-breadcrumb-item>Grandparent</gux-breadcrumb-item>
            <gux-breadcrumb-item>Parent</gux-breadcrumb-item>
            <gux-breadcrumb-item>Child</gux-breadcrumb-item>
          </div>
        `,
        language
      });

      expect(logError).toHaveBeenCalledTimes(3);
    });
  });
});
