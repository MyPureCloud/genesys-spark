export const renderConfigs = ['', 'disabled'].map(modifier => ({
  html: `
    <gux-rich-text-editor-beta>
      <gux-rich-text-editor-action-group slot="text-styling">
        <gux-rich-text-editor-action-text-highlight ${modifier}>
          <gux-rich-highlight-list-item
            highlight="tomato"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="coral"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="pear"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="mango"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="raspberry"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="blueberry"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="mineral"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            highlight="islandaqua"
          ></gux-rich-highlight-list-item>
          <gux-rich-highlight-list-item
            class="custom-highlight"
            highlight="inherit"
          ></gux-rich-highlight-list-item>
        </gux-rich-text-editor-action-text-highlight>
      </gux-rich-text-editor-action-group>
      <div class="editorElement" slot="editor"></div>
    </gux-rich-text-editor-beta>
  `
}));
