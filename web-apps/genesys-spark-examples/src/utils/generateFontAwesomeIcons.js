const icons = [
  {
    iconNames: [
      'fa/1-regular',
      'fa/arrow-down-wide-short-regular',
      'fa/arrows-rotate-solid',
      'fa/ban-regular',
      'fa/book-regular',
      'fa/briefcase-regular',
      'fa/bullseye-regular',
      'fa/calendar-days-regular',
      'fa/circle-check-regular',
      'fa/circle-xmark-regular',
      'fa/clock-nine-regular',
      'fa/clock-rotate-left-regular',
      'fa/comments-regular',
      'fa/cube-regular',
      'fa/database-regular',
      'fa/diamond-regular',
      'fa/draw-circle-solid',
      'fa/file-chart-pie-regular',
      'fa/font-regular',
      'fa/gears-regular',
      'fa/gem-regular',
      'fa/hourglass-start-regular',
      'fa/infinity-regular',
      'fa/language-regular',
      'fa/life-ring-regular',
      'fa/link-horizontal-slash-regular',
      'fa/link-horizontal-solid',
      'fa/list-ol-regular',
      'fa/memo-circle-check-regular',
      'fa/message-regular',
      'fa/money-bill-regular',
      'fa/rectangle-list-regular',
      'fa/right-to-bracket-regular',
      'fa/road-regular',
      'fa/share-regular',
      'fa/shuffle-regular',
      'fa/sigma-regular',
      'fa/signs-post-regular',
      'fa/sitemap-regular',
      'fa/ticket-regular'
    ]
  }
];

function generateSection(iconNames) {
  let output = '';

  output += '<div class="icons-container">';
  iconNames.forEach(iconName => {
    output += `<div class="icon-example">
    <gux-icon icon-name="${iconName}" class="example" decorative="true"></gux-icon>
    <div class="icon-name">${iconName}</div>
  </div>`;
  });
  output += '</div>';

  return output;
}

function generateHTML() {
  return icons.reduce((acc, cv) => acc + generateSection(cv.iconNames), '');
}

exports.generateHTML = generateHTML;
