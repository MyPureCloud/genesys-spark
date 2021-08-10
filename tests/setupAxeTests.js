global.beforeEach(() => {
  expect.extend({
    toHaveNoViolations(axeViolations, exclusions) {
      return toHaveNoViolations(axeViolations, exclusions);
    }
  });
});

function toHaveNoViolations(axeViolations, exclusions) {
  let violations = [];

  axeViolations.forEach(violation => {
    let violationTargets = [];
    violation.nodes.forEach(violationInstance => {
      let excludedElement = false;
      exclusions.forEach(exclusion => {
        if (
          exclusion.issueId === violation.id &&
          (!exclusion.target ||
            exclusion.target === violationInstance.target[0])
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
  const violationMessage = createViolationMessage(violations);
  return returnPassOrFail(violations, violationMessage);
}

function createViolationMessage(violations) {
  let violationMessage = '';
  let elementMessage = '';
  violations.forEach(violation => {
    violation.violationInstance.forEach(element => {
      elementMessage += `\n${element.target}\n${element.failureSummary}`;
    });
    violationMessage += `Violation id:\n${violation.id}\nViolation description:\n${violation.description}
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
