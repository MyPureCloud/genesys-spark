export const getActionMap = editor => ({
  bold: {
    action: () => editor.chain().focus().toggleBold().run(),
    icon: 'fa/bold-regular'
  },
  italic: {
    action: () => editor.chain().focus().toggleItalic().run(),
    icon: 'fa/italic-regular'
  },
  underline: {
    action: () => editor.chain().focus().toggleUnderline().run(),
    icon: 'fa/underline-regular'
  },
  strike: {
    action: () => editor.chain().focus().toggleStrike().run(),
    icon: 'fa/strikethrough-regular'
  },
  codeBlock: {
    action: () => editor.chain().focus().toggleCodeBlock().run(),
    icon: 'fa/code-regular'
  },
  clearFormatting: {
    action: () => editor.chain().focus().unsetAllMarks().run(),
    icon: 'fa/eraser-regular'
  }
});
