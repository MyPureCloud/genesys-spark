const fs = require('fs');

/* Dynamically generates a list of all icons present in the Gux Icons Iconset **/
function generateHTML(path) {
  const files = fs.readdirSync(path);
  let output = `<div class="icons-container">`;

  for (let icon of files) {
    if (!icon.endsWith('.svg')) continue;

    const iconName = icon.substring(0, icon.length - 4); // remove .svg suffix

    output += `<div class="icon-example">
  <gux-icon icon-name="legacy/${iconName}" class="example" decorative="true"></gux-icon>
  <div class="icon-name">${iconName} (original)</div>
  </div>
<div class="icon-example">
  <gux-icon icon-name="${iconName}" class="example" decorative="true"></gux-icon>
  <div class="icon-name">${iconName} (mapped)</div>
</div>
`;
  }

  output += '</div>';
  return output;
}

exports.generateHTML = generateHTML;
