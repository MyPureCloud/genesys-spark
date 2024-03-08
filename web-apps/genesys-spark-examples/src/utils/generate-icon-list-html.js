const { globSync } = require('glob');

exports.generateIconListHTML = function generateIconListHTML(paths) {
  const iconNames = globSync(paths)
    .map(file => {
      return file.split('gux-icon/icons/').pop().replace('.svg', '');
    })
    .sort();

  let output = '';

  output += '<div class="icons-container">';
  iconNames.forEach(iconName => {
    output += `<div class="icon-example">
  <gux-icon size="large" icon-name="${iconName}" decorative="true"></gux-icon>
  <div class="icon-name">${iconName}</div>
</div>`;
  });
  output += '</div>';

  return output;
};
