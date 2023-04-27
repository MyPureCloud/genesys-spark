export function addClassToElements(elements, className) {
  manipulateElementsClasses(elements, 'add', className);
}
export function removeClassToElements(elements, className) {
  manipulateElementsClasses(elements, 'remove', className);
}
function manipulateElementsClasses(elements = [], action, className) {
  const arr = [].concat(elements);
  for (const el of arr) {
    el.classList[action](className);
  }
}
