const fs = require('fs');

/* Dynamically generates a list of all icons present in the Gux Icons Iconset **/
function generateHTML(path) {
  const files = fs.readdirSync(path);
  let output = `
    <form
      onchange="(function () {
        const legacySelect = document.getElementById('legacy-select');
        const legacyDisplayIcon = document.getElementById('legacy-display-icon');
        const legacyDisplayIconName = document.getElementById('legacy-display-icon-name');

        legacyDisplayIcon.setAttribute('icon-name', legacySelect.value);
        legacyDisplayIconName.innerHTML = legacySelect.value;
      })()"
    >
      <gux-form-field-select>
        <select id="legacy-select" slot="input" name="icon-mane">
          <option value="unknown">unknown</option>
  `;

  for (let icon of files) {
    if (!icon.endsWith('.svg')) continue;

    const iconName = icon.substring(0, icon.length - 4); // remove .svg suffix

    output += `<option value="legacy/${iconName}">legacy/${iconName}</option>`;
  }

  output += `
        </select>
        <label slot="label">Select a legacy icon</label>
      </gux-form-field-select>
    </form>

    <div class="icon-example">
      <gux-icon size="large" id="legacy-display-icon" icon-name="unknown" decorative="true"></gux-icon>
      <div id="legacy-display-icon-name" class="icon-name">unknown</div>
    </div>
  `;
  return output;
}

exports.generateHTML = generateHTML;
