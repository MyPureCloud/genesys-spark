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
  //Editor theme change
  var element = document.documentElement;
  monaco.editor.defineTheme('dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {}
  });
  var observer = new MutationObserver(function () {
    monaco.editor.setTheme(element.getAttribute('flare-mode'));
  });
  observer.observe(element, {
    attributes: true,
    attributeFilter: ['flare-mode']
  });

  const editor = monaco.editor.create(panel, CONFIG);
  const model = editor.getModel();

  //Set initial mode
  monaco.editor.setTheme(element.getAttribute('flare-mode'));

  model.onDidChangeContent(() => changeHandler(model.getValue()));
  return content => {
    model.setValue(content);
  };
};
