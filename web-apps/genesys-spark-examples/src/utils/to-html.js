// warning: Only returns the first element in the created element list,
//          so make sure any complex structures are enclosed in a single
//          encapsulating element.
export function toHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}
