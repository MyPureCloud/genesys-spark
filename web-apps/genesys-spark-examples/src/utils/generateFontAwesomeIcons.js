const icons = [
  {
    iconNames: [
      'fa/00-solid',
      'fa/1-regular',
      'fa/align-center-regular',
      'fa/align-justify-regular',
      'fa/align-left-regular',
      'fa/align-right-regular',
      'fa/arrow-down-wide-short-regular',
      'fa/arrow-turn-down-right-regular',
      'fa/arrows-rotate-solid',
      'fa/asterix-regular',
      'fa/ban-regular',
      'fa/binoculars-regular',
      'fa/bold-regular',
      'custom/binoculars-slash-regular',
      'fa/book-regular',
      'fa/briefcase-regular',
      'fa/bullseye-regular',
      'fa/calculator-regular',
      'fa/calendar-days-regular',
      'fa/circle-check-regular',
      'fa/circle-check-solid',
      'fa/circle-info-solid',
      'fa/circle-play-regular',
      'fa/circle-xmark-regular',
      'fa/clipboard-list-regular',
      'custom/clipboard-list-slash-regular',
      'fa/clock-nine-regular',
      'fa/clock-rotate-left-regular',
      'fa/comments-regular',
      'fa/code-regular',
      'fa/code-branch-regular',
      'fa/crop-simple-regular',
      'fa/cube-regular',
      'fa/database-regular',
      'fa/diagram-project-gear-regular',
      'fa/diagram-project-regular',
      'fa/diamond-regular',
      'fa/draw-circle-solid',
      'fa/file-chart-pie-regular',
      'fa/film-solid',
      'fa/filter-solid',
      'fa/font-regular',
      'fa/gears-regular',
      'fa/gem-regular',
      'fa/hand-pointer-regular',
      'fa/hashtag-regular',
      'fa/hexagon-exclamation-solid',
      'fa/highlighter-line-regular',
      'fa/hourglass-start-regular',
      'fa/indent-regular',
      'fa/infinity-regular',
      'fa/italic-regular',
      'fa/language-regular',
      'fa/life-ring-regular',
      'fa/link-horizontal-slash-regular',
      'fa/link-horizontal-solid',
      'fa/list-ol-regular',
      'fa/list-radio-regular',
      'fa/list-regular',
      'fa/list-ul-regular',
      'fa/map-regular',
      'fa/map-solid',
      'fa/memo-circle-check-regular',
      'fa/message-regular',
      'fa/microchip-solid',
      'fa/money-bill-regular',
      'fa/outdent-regular',
      'fa/puzzle-piece-regular',
      'fa/question-solid',
      'fa/ranking-star-regular',
      'fa/rectangle-list-regular',
      'fa/reply-regular',
      'fa/right-to-bracket-regular',
      'fa/road-regular',
      'fa/rocket-regular',
      'fa/route-regular',
      'fa/share-regular',
      'fa/shuffle-regular',
      'fa/sigma-regular',
      'fa/signs-post-regular',
      'fa/sitemap-regular',
      'fa/sliders-solid',
      'fa/strikethrough-regular',
      'fa/text-size-regular',
      'fa/text-slash-regular',
      'fa/ticket-regular',
      'fa/triangle-exclamation-solid',
      'fa/underline-regular'
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
