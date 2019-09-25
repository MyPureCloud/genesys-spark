window.webcomponentsDocsMain = (example = '', renderCallback = () => {}) =>
  require('./component-viewer/app.js').bootstrap(
    example.trim(),
    renderCallback
  );

window.frameManagerMain = () =>
  require('./component-listing/app.js').bootstrap();
