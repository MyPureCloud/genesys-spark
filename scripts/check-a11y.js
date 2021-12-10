const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

let componentName = '';
let componentStability = '';
let markdownContent = '';

let betaComponents = createComponentList('beta');
let stableComponents = createComponentList('stable');
let legacyComponents = createComponentList('legacy');

// The description of each success criterion is copied directly from the WCAG Understanding Success Criteria pages
const a11yRules = [
  {
    id: '211',
    title: '2.1.1 Keyboard',
    description:
      "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints",
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html'
  },
  {
    id: '212',
    title: '2.1.2 No Keyboard Trap',
    description:
      'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html'
  },
  {
    id: '243',
    title: '2.4.3 Focus Order',
    description:
      'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html'
  },
  {
    id: '247',
    title: '2.4.7 Focus Visible',
    description:
      'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html'
  },
  {
    id: '253',
    title: '2.5.3 Label in Name',
    description:
      'For user interface components with labels that include text or images of text, the name contains the text that is presented visually',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html#dfn-name'
  },
  {
    id: '321',
    title: '3.2.1 On Focus',
    description:
      'When any user interface component receives focus, it does not initiate a change of context',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html'
  },
  {
    id: '322',
    title: '3.2.2 On Input',
    description:
      'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html'
  },
  {
    id: '331',
    title: '3.3.1 Error Identification',
    description:
      'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html'
  },
  {
    id: '332',
    title: '3.2.2 Labels or Instructions',
    description:
      'Labels or instructions are provided when content requires user input',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html'
  }
];

const accessibilityChangeQuestion = [
  {
    name: 'isA11yChange',
    message: 'Could your change affect the accessibility of the component?',
    type: 'confirm'
  }
];

const componentStabilityQuestion = [
  {
    name: 'componentStability',
    message: 'Is the component stable, beta, or legacy?',
    type: 'list',
    choices: ['stable', 'beta', 'legacy']
  }
];

function getComponentNameList(answers) {
  const componentStability = answers.componentStability;
  let componentList = [];
  switch (componentStability) {
    case 'stable':
      componentList = stableComponents;
      break;
    case 'beta':
      componentList = betaComponents;
      break;
    case 'legacy':
      componentList = legacyComponents;
  }
  return [
    {
      name: 'componentName',
      message: 'What is the name of the component?',
      type: 'list',
      choices: componentList
    }
  ];
}

function getA11yRuleQuestions() {
  const a11yRuleQuestions = [];
  a11yRules.forEach(rule => {
    const a11yCheckId = rule.id;
    const a11yCheckTitle = rule.title;
    const a11yCheckDescripton = rule.description;

    a11yRuleQuestions.push(
      {
        name: `a11yCheck.${a11yCheckId}.success`,
        type: 'confirm',
        message: `${a11yCheckTitle}: \n${a11yCheckDescripton}`
      },
      {
        name: `a11yCheck.${a11yCheckId}.details`,
        message: `If needed, add a note with details about ${a11yCheckTitle} compliance for this component`,
        type: 'input',
        default: '-'
      }
    );
  });
  return a11yRuleQuestions;
}

function createComponentList(componentStability) {
  let list = fs.readdirSync(
    path.join(__dirname, `../src/components/${componentStability}`)
  );
  let componentList = [];
  list.forEach(result => {
    if (result.startsWith('gux')) {
      componentList.push(result);
    }
  });
  return componentList;
}

inquirer
  .prompt(accessibilityChangeQuestion)
  .then(accessibilityChangeAnswers => {
    if (!accessibilityChangeAnswers.isA11yChange) {
      console.log('Exiting...');
      return;
    }
    inquirer
      .prompt(componentStabilityQuestion)
      .then(componentStabilityAnswers => {
        componentStability = componentStabilityAnswers.componentStability;
        inquirer
          .prompt(getComponentNameList(componentStabilityAnswers))
          .then(componentNameAnswers => {
            componentName = componentNameAnswers.componentName;
            markdownContent = `# ${componentName} manual accessibility testing status\n**Last Updated:** ${new Date().toString()}\n| Pass | WCAG Success Criterion | Notes |\n| --- | --- | --- |`;
            inquirer.prompt(getA11yRuleQuestions()).then(a11yRuleAnswers => {
              a11yRules.forEach(rule => {
                const testSuccess = a11yRuleAnswers.a11yCheck[rule.id].success
                  ? '✅'
                  : '❌';
                const testDetails = a11yRuleAnswers.a11yCheck[rule.id].details;
                markdownContent += `\n| ${testSuccess} | [${rule.title}](${rule.link}) | ${testDetails} |`;
              });
              const targetPath = path.join(
                __dirname,
                `../src/components/${componentStability}/${componentName}/a11yManualChecklist.md`
              );
              fs.writeFileSync(targetPath, markdownContent);
              console.log(
                `A markdown file containing the manual testing results has been added to ../src/components/${componentStability}/${componentName}`
              );
            });
          });
      });
  });
