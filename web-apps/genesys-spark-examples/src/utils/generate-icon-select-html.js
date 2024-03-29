const { globSync } = require('glob');

exports.generateIconSelectHTML = function generateIconSelectHTML(paths) {
  const iconNames = globSync(paths)
    .map(file => {
      return file.split('gux-icon/icons/').pop().replace('.svg', '');
    })
    .sort();

  const hash = (Math.random() + 1).toString(36).substring(7);

  let output = `
    <form
      onchange="(function () {
        const select = document.getElementById('${hash}-select');
        const displayIcon = document.getElementById('${hash}-display-icon');
        const displayIconName = document.getElementById('${hash}-display-icon-name');

        displayIcon.setAttribute('icon-name', select.value);
        displayIconName.innerHTML = select.value;
      })()"
    >
      <gux-form-field-select>
        <select id="${hash}-select" slot="input" name="icon-mane">
          <option value="unknown">unknown</option>
  `;

  for (let iconName of iconNames) {
    output += `<option value="${iconName}">${iconName}</option>`;
  }

  output += `
        </select>
        <label slot="label">Select a legacy icon</label>
      </gux-form-field-select>
    </form>

    <div class="icon-example">
      <gux-icon size="large" id="${hash}-display-icon" icon-name="unknown" decorative="true"></gux-icon>
      <div id="${hash}-display-icon-name" class="icon-name">unknown</div>
    </div>
  `;

  return output;
};
