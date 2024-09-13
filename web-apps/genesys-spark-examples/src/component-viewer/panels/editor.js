import * as monaco from 'monaco-editor';

const CONFIG = {
  fontSize: 14,
  lineNumbers: 'off',
  minimap: {
    enabled: false
  },
  language: 'html',
  automaticLayout: true,
  tabSize: 2
};

export const createEditor = (panel, changeHandler) => {
  const editor = monaco.editor.create(panel, CONFIG);
  const model = editor.getModel();

  model.onDidChangeContent(() => changeHandler(model.getValue()));
  return content => {
    model.setValue(content);
  };
};
