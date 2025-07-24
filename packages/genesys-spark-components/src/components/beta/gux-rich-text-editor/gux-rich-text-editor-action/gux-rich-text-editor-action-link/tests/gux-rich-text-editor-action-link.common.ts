export const renderConfigs = ['', 'disabled'].map(modifier => ({
  html: `
    <gux-rich-text-editor-beta>
      <gux-rich-text-editor-action-group slot="inserting">
        <gux-rich-text-editor-action-link ${modifier}></gux-rich-text-editor-action-link>
      </gux-rich-text-editor-action-group>
      <div class="editorElement" slot="editor"></div>
    </gux-rich-text-editor-beta>
  `
}));
