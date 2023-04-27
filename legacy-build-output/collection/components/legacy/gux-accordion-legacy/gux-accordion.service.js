function getSectionByName(slotName, sections) {
  return sections.find(section => section.slotName === slotName);
}
function getPreviousSection(slot, sections) {
  const currentIndex = sections.findIndex(section => section.slotName === slot);
  if (currentIndex <= 0) {
    return sections[sections.length - 1].ref;
  }
  return sections[currentIndex - 1].ref;
}
function getNextSection(slot, sections) {
  const currentIndex = sections.findIndex(section => section.slotName === slot);
  if (currentIndex >= sections.length - 1) {
    return sections[0].ref;
  }
  return sections[currentIndex + 1].ref;
}
function getFirstSection(sections) {
  return sections[0].ref;
}
function getLastSection(sections) {
  return sections[this.sections.length - 1].ref;
}
function getToggleButton(section) {
  return section.querySelector('.gux-header-button');
}
export function getSections(root) {
  const children = Array.from(root.children);
  const sections = [];
  children.forEach(element => {
    const slotName = element.getAttribute('slot');
    element.hidden = !Boolean(slotName);
    if (slotName) {
      sections.push({
        slotName,
        ref: null
      });
    }
  });
  return sections;
}
export function modifyClassList(slotName, modification, sections) {
  const section = getSectionByName(slotName, sections);
  section === null || section === void 0 ? void 0 : section.ref.classList[modification]('gux-opened');
}
export function onKeyboardNavigation(event, slotName, sections) {
  let newSection;
  switch (event.key) {
    case 'ArrowUp':
      newSection = getPreviousSection(slotName, sections);
      break;
    case 'ArrowDown':
      newSection = getNextSection(slotName, sections);
      break;
    case 'End':
      newSection = getLastSection(sections);
      break;
    case 'Home':
      newSection = getFirstSection(sections);
      break;
  }
  if (newSection) {
    getToggleButton(newSection).focus();
  }
}
