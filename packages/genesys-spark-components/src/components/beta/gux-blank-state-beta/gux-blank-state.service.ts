import { JSX } from '@stencil/core';
import {
  GuxBlankStateBackgroundShape,
  GuxBlankStateVariant
} from './gux-blank-state.types';
import * as svgUtils from './svg-utils';

const illustrationVariantMap: Record<
  GuxBlankStateVariant,
  (() => JSX.Element) | null
> = {
  add: svgUtils.renderAddSVG,
  'face-smile': svgUtils.renderFaceSmileSVG,
  success: svgUtils.renderSuccessSVG,
  calendar: svgUtils.renderCalendarSVG,
  access: svgUtils.renderAccessSVG,
  recording: svgUtils.renderRecordingSVG,
  data: svgUtils.renderDataSVG,
  comments: svgUtils.renderCommentsSVG,
  comment: svgUtils.renderCommentSVG,
  'comment-question': svgUtils.renderCommentQuestionSVG,
  eye: svgUtils.renderEyeSVG,
  'magnifying-glass': svgUtils.renderMagnifyingGlassSVG,
  'magnifying-glass-question': null, // awaiting confirmation on svg.
  sparkles: svgUtils.renderSparklesSVG,
  'triangle-exclamation': svgUtils.renderTriangleExclamation,
  'face-disappointed': svgUtils.renderFaceDisappointedSVG,
  'folder-magnifying-glass': svgUtils.renderFolderMagnifyingGlassSVG,
  'folder-open': svgUtils.renderFolderOpenSVG,
  file: svgUtils.renderFileSVG,
  lock: svgUtils.renderLockSVG,
  'message-bot': svgUtils.renderMessageBotSVG,
  robot: svgUtils.renderRobotSVG,
  message: svgUtils.renderMessageSVG,
  messages: svgUtils.renderMessagesSVG,
  cloud: svgUtils.renderCloudSVG,
  article: svgUtils.renderArticleSVG,
  edit: svgUtils.renderEditSVG,
  connection: svgUtils.renderConnectionSVG,
  'rectangle-history': svgUtils.renderRectangleHistorySVG,
  setting: svgUtils.renderSettingSVG,
  'square-dashed': svgUtils.renderSquareDashedSVG,
  'square-plus': svgUtils.renderSquarePlusSVG,
  transcription: svgUtils.renderTranscriptionSVG,
  table: svgUtils.renderTableSVG,
  user: svgUtils.renderUserSVG,
  'user-message': svgUtils.renderUserMessageSVG,
  users: svgUtils.renderUsersSVG
};

const backgroundShapeMap: Record<
  GuxBlankStateBackgroundShape,
  (() => JSX.Element) | null
> = {
  'solid-wide': svgUtils.renderSolidWideSVG,
  'solid-narrow': svgUtils.renderSolidNarrowSVG,
  'gradient-wide': svgUtils.renderGradientWideSVG,
  'gradient-narrow': svgUtils.renderGradientNarrowSVG
};

export function renderVariantIllustration(
  variant: GuxBlankStateVariant
): JSX.Element | null {
  const renderIllustration = illustrationVariantMap[variant];
  return renderIllustration ? renderIllustration() : null;
}

export function renderBackgroundShape(
  shape: GuxBlankStateBackgroundShape
): JSX.Element | null {
  const renderShape = backgroundShapeMap[shape];
  return renderShape ? renderShape() : null;
}
