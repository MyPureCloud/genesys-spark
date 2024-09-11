global.beforeEach(() => {
  expect.extend({
    toHaveNoViolations(axeViolations, axeScanDetails) {
      return toHaveNoViolations(axeViolations, axeScanDetails);
    }
  });
});

function toHaveNoViolations(axeViolations, axeScanDetails) {
  const violations = [];

  axeViolations.forEach(violation => {
    const violationTargets = [];
    violation.nodes.forEach(violationInstance => {
      let excludedElement = false;
      axeScanDetails.axeExclusions.forEach(exclusion => {
        if (
          exclusion.issueId === violation.id &&
          (!exclusion.target ||
            exclusion.target === violationInstance.target[0].toString())
        ) {
          excludedElement = true;
        }
      });
      if (excludedElement === false) {
        violationTargets.push(violationInstance);
        violation.violationInstance = violationTargets;
      }
    });
    if (violation.violationInstance) {
      violations.push(violation);
    }
  });
  const violationMessage = createViolationMessage(violations, axeScanDetails);
  return returnPassOrFail(violations, violationMessage);
}

function createViolationMessage(violations, axeScanDetails) {
  let violationMessage = '';
  let elementMessage = '';
  const axeContextMessage = axeScanDetails.axeScanContext
    ? `Axe scan context:\n${axeScanDetails.axeScanContext}\n`
    : '';
  violations.forEach(violation => {
    violation.violationInstance.forEach(element => {
      elementMessage += `\n${element.target}\n${element.failureSummary}`;
    });
    violationMessage += `${axeContextMessage}Violation id:\n${violation.id}\nViolation description:\n${violation.description}
    \nAffected Elements (${violation.violationInstance.length}):${elementMessage}\n
    `;
  });
  return violationMessage;
}

function returnPassOrFail(violations, violationMessage) {
  if (violations.length === 0) {
    return {
      message: () => `No violations found`,
      pass: true
    };
  } else {
    return {
      message: () => violationMessage,
      pass: false
    };
  }
}
