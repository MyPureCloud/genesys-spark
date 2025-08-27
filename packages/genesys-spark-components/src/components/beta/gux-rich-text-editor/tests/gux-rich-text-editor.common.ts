export const renderConfigs = ['', 'disabled'].map(modifier => ({
  html: `
    <gux-rich-text-editor-beta ${modifier}>
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
    </gux-rich-text-editor-beta>
  `
}));
