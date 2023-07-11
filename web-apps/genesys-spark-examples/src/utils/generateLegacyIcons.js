const fs = require('fs');

/* Dynamically generates a list of all icons present in the Gux Icons Iconset **/
function generateHTML(path) {
  const files = fs.readdirSync(path);
  let output = `<div class="icons-container">`;

  for (let icon of files) {
    if (!icon.endsWith('.svg')) continue;

    const iconName = icon.substring(0, icon.length - 4); // remove .svg suffix
    let mappedIconName = iconName;

    // if a legacy icon is added and there is already an icon in the legacy folder with the same name,
    // the newly added icon should be given a suffix following the pattern: "-alt-1"
    if (/-alt-\d$/.test(iconName)) {
      mappedIconName = iconName.substring(0, iconName.length - 6); //remove -alt-1 suffix
    }

    output += `<div class="icon-example-group">
  <div class="icon-example">
    <gux-icon icon-name="legacy/${iconName}" class="example" decorative="true"></gux-icon>
    <div class="icon-name">legacy/${iconName}</div>
  </div>
  <div class="icon-example">
    <gux-icon icon-name="${mappedIconName}" class="example" decorative="true"></gux-icon>
    <div class="icon-name">${mappedIconName} (mapped)</div>
  </div>
</div>
`;
  }

  output += '</div>';
  return output;
}

exports.generateHTML = generateHTML;
