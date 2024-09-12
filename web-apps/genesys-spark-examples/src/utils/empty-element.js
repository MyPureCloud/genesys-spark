export const emptyElement = element => {
  const clone = element.cloneNode(false);
  element.parentNode.replaceChild(clone, element);
  return clone;
};
