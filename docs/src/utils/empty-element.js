export const emptyElement = element => {
  let clone = element.cloneNode(false);
  element.parentNode.replaceChild(clone, element);
  return clone;
};
