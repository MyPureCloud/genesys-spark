import { newSpecPage } from '@stencil/core/testing';
import { GuxAccordion } from '../gux-accordion';
import { GuxAccordionSection } from '../gux-accordion-section/gux-accordion-section';

const components = [GuxAccordion, GuxAccordionSection];
const html = `
<gux-accordion>
  <gux-accordion-section>
    <h2 slot="header">First Section</h2>
    <div slot="content">Sample Content</div>
  </gux-accordion-section>
  <gux-accordion-section>
    <h2 slot="header">Second Section</h2>
    <div slot="content">Sample Content</div>
  </gux-accordion-section>
  <gux-accordion-section>
    <h2 slot="header">Third Section</h2>
    <div slot="content">Sample Content</div>
  </gux-accordion-section>
</gux-accordion>
`;
const language = 'en';

describe('gux-accordion', () => {
  it('should build', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxAccordion);
  });

  it('renders', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.root).toMatchSnapshot();
  });
});
