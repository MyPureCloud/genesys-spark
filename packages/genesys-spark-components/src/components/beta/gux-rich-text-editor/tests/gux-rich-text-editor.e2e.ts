import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-rich-text-editor', () => {
  describe('#render', () => {
    [
      `<gux-rich-text-editor-beta>
  <gux-rich-text-editor-action-group slot="typographical-emphasis">
    <gux-rich-text-editor-action action="bold"></gux-rich-text-editor-action>
    <gux-rich-text-editor-action action="italic"></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="underline"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action action="strike"></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="text-styling">
    <gux-rich-text-editor-action
      action="clearFormatting"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="lists-indentation">
    <gux-rich-text-editor-action
      action="bulletList"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="orderedList"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="inserting">
    <gux-rich-text-editor-action
      action="codeblock"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="blockQuote"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action
    slot="global-action"
    action="delete"
  ></gux-rich-text-editor-action>
  <div class="editorElement" slot="editor"></div>
</gux-rich-text-editor-beta>`,
      `<gux-rich-text-editor-beta disabled>
  <gux-rich-text-editor-action-group slot="typographical-emphasis">
    <gux-rich-text-editor-action action="bold"></gux-rich-text-editor-action>
    <gux-rich-text-editor-action action="italic"></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="underline"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action action="strike"></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="text-styling">
    <gux-rich-text-editor-action
      action="clearFormatting"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="lists-indentation">
    <gux-rich-text-editor-action
      action="bulletList"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="orderedList"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action-group slot="inserting">
    <gux-rich-text-editor-action
      action="codeblock"
    ></gux-rich-text-editor-action>
    <gux-rich-text-editor-action
      action="blockQuote"
    ></gux-rich-text-editor-action>
  </gux-rich-text-editor-action-group>
  <gux-rich-text-editor-action
    slot="global-action"
    action="delete"
  ></gux-rich-text-editor-action>
  <div class="editorElement" slot="editor"></div>
</gux-rich-text-editor-beta>`
    ].forEach((html, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('gux-rich-text-editor-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    ['disabled'].forEach(property => {
      it(`should be accessible when "${property}" is set`, async () => {
        const html = `<gux-rich-text-editor-beta ${property}"></gux-rich-text-editor-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
