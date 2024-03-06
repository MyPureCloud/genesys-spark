const iconNames = [
  'restricted/fa/building-user-regular',
  'restricted/fa/calendar-circle-user-regular',
  'restricted/fa/compass-drafting-regular',
  'restricted/fa/grid-2-regular',
  'restricted/fa/headset-regular',
  'restricted/fa/screwdriver-wrench-regular'
];

function generateSection(iconNames) {
  let output = '';

  output += '<div class="icons-container">';
  iconNames.forEach(iconName => {
    output += `<div class="wide-icon-example">
    <gux-icon size="large" icon-name="${iconName}" decorative="true"></gux-icon>
    <div class="icon-name">${iconName}</div>
  </div>`;
  });
  output += '</div>';

  return output;
}

function generateHTML() {
  return generateSection(iconNames);
}

exports.generateHTML = generateHTML;
