import { Result, NodeResult } from 'axe-core';

export type AxeExclusion = {
  issueId: string;
  target?: string;
  exclusionReason: string;
};

export type AxeScanDetails = {
  axeExclusions: AxeExclusion[];
  axeScanContext?: string;
};

export function toHaveNoViolations(
  axeViolations: Result[],
  axeScanDetails: AxeScanDetails
) {
  const violations = axeViolations.reduce((violationsAcc, violation) => {
    violation.nodes = violation.nodes.reduce((nodesAcc, node) => {
      const excluded = axeScanDetails.axeExclusions.some(exclusion => {
        return (
          exclusion.issueId === violation.id &&
          (!exclusion.target || exclusion.target === node.target[0].toString())
        );
      });

      return excluded ? nodesAcc : nodesAcc.concat(node);
    }, [] as NodeResult[]);

    return violation.nodes.length === 0
      ? violationsAcc
      : violationsAcc.concat(violation);
  }, [] as Result[]);

  if (violations.length === 0) {
    return {
      message: () => `No violations found`,
      pass: true
    };
  } else {
    const violationMessage = createViolationMessage(
      violations,
      axeScanDetails.axeScanContext
    );

    return {
      message: () => violationMessage,
      pass: false
    };
  }
}

function createViolationMessage(
  axeViolations: Result[],
  axeScanContext?: string
) {
  let violationMessage = '';
  let elementMessage = '';
  const axeContextMessage = axeScanContext
    ? `Axe scan context:\n${axeScanContext}\n`
    : '';
  axeViolations.forEach(violation => {
    violation.nodes.forEach(element => {
      elementMessage += `\n\n${element.target}\n${element.failureSummary}`;
    });
    violationMessage += `${axeContextMessage}Violation id: ${violation.id}\nViolation description: ${violation.description}
    \nAffected Elements (${violation.nodes.length}):${elementMessage}\n
    `;
  });
  return violationMessage;
}
