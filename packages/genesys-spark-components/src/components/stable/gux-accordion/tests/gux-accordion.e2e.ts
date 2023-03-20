import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-accordion', () => {
  it('renders', async () => {
    const html = `
      <gux-accordion>
        <gux-accordion-section>
          <h2 slot="header">First Section</h2>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section arrow-position="beside-text">
          <h2 slot="header">Second Section</h2>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section arrow-position="before-text">
          <h2 slot="header">Third Section</h2>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section content-layout="custom">
          <h2 slot="header">Fourth Section</h2>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section content-layout="text">
          <h2 slot="header">Fifth Section</h2>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section disabled>
          <h2 slot="header">Sixth Section</h2>
          <h3 slot="subheader">This is the subheader</h3>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section>
          <h2 slot="header">Seventh Section</h2>
          <h3 slot="subheader">This is the subheader</h3>
          <gux-icon
            slot="icon"
            icon-name="add-user"
            screenreader-text="add John Smith to contact list"
          ></gux-icon>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
        <gux-accordion-section reverse-headings="true">
          <h2 slot="header">Eighth Section</h2>
          <h3 slot="subheader">This is the subheader</h3>
          <gux-icon
            slot="icon"
            icon-name="add-user"
            screenreader-text="add John Smith to contact list"
          ></gux-icon>
          <div slot="content">Sample Content</div>
        </gux-accordion-section>
      </gux-accordion>
      `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-accordion');

    await a11yCheck(page);

    expect(element.outerHTML).toMatchSnapshot();
  });
});
